import { prisma } from "./lib/prisma.js";
import type { Appointment, Prisma } from "../generated/prisma/client.js";

export type BookAppointmentInput = {
  patientId: number;
  doctorId: number;
  appointmentDate: Date;
  notes?: string | null;
};

export type AppointmentWithRelations = Prisma.AppointmentGetPayload<{
  include: {
    patient: true;
    doctor: true;
  };
}>;

export type AppointmentWithPatient = Prisma.AppointmentGetPayload<{
  include: {
    patient: true;
  };
}>;

export async function bookAppointment(
  data: BookAppointmentInput,
): Promise<AppointmentWithRelations> {
  const appointmentData: Prisma.AppointmentCreateInput = {
    appointmentDate: data.appointmentDate,
    ...(data.notes !== undefined && { notes: data.notes }),
    patient: {
      connect: { id: data.patientId },
    },
    doctor: {
      connect: { id: data.doctorId },
    },
  };

  return prisma.appointment.create({
    data: appointmentData,
    include: {
      patient: true,
      doctor: true,
    },
  });
}

export async function getAppointmentFull(
  id: number,
): Promise<AppointmentWithRelations | null> {
  return prisma.appointment.findUnique({
    where: { id },
    include: {
      patient: true,
      doctor: true,
    },
  });
}

export async function getDoctorUpcomingAppointments(
  doctorId: number,
): Promise<AppointmentWithPatient[]> {
  return prisma.appointment.findMany({
    where: {
      doctorId,
      appointmentDate: { gte: new Date() },
      status: "scheduled",
    },
    include: {
      patient: true,
    },
    orderBy: { appointmentDate: "asc" },
  });
}

export async function setAppointmentStatus(
  id: number,
  status: string,
): Promise<Appointment> {
  return prisma.appointment.update({
    where: { id },
    data: { status },
  });
}

export async function cancelAllPatientAppointments(
  patientId: number,
): Promise<Prisma.BatchPayload> {
  return prisma.appointment.updateMany({
    where: {
      patientId,
      status: "scheduled",
    },
    data: {
      status: "cancelled",
    },
  });
}

export async function deleteAppointment(id: number): Promise<Appointment> {
  return prisma.appointment.delete({
    where: { id },
  });
}
