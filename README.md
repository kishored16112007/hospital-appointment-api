# Hospital Appointment API

A REST API backend project for managing patients, doctors, and hospital appointments using TypeScript, Node.js, Prisma ORM, and PostgreSQL.

## Features

- Create, retrieve, search, update, and delete patients.
- Create and list doctors by specialty.
- Book and retrieve appointments with Prisma relational connect and include.
- View upcoming scheduled appointments for a doctor.
- Update appointment status and cancel scheduled appointments in batch.
- Seed the database with sample doctors, patients, and appointments.

## Technologies Used

- Node.js (ES Modules)
- TypeScript
- Prisma ORM 7 (`@prisma/client`, `@prisma/adapter-pg`, `prisma`)
- PostgreSQL

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your database connection in `.env`:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hospital_api"
   ```

3. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```

4. Seed the database:
   ```bash
   npx prisma db seed
   ```

## Testing

Run the CRUD test script:
```bash
npx tsx src/test.ts
```

## Project Structure

- `src/lib/prisma.ts` — PrismaClient singleton with PrismaPg adapter
- `src/patients.ts` — Patient CRUD operations
- `src/doctors.ts` — Doctor CRUD operations
- `src/appointments.ts` — Appointment CRUD operations
- `src/seed.ts` — Seed script for initial records
- `src/test.ts` — Comprehensive test suite for all CRUD methods
- `prisma/schema.prisma` — Cleaned Prisma schema with mapped fields and models
- `prisma7.config.ts` — Prisma 7 configuration file

## Security

Database credentials are kept in `.env` and excluded via `.gitignore`.
