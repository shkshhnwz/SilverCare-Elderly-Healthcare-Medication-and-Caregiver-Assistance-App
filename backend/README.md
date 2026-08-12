# SilverCare Backend

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma

## Architecture

Route
→ Middleware
→ Controller
→ Service
→ Repository
→ Prisma
→ PostgreSQL

## Structure

### config
Application configuration and environment setup.

### database
Database-related utilities and initialization.

### middlewares
Authentication, authorization, validation and error handling.

### modules
Feature-specific business logic.

### services
Shared external/infrastructure services.

### utils
Reusable utility functions.

### prisma
Database schema and migrations.

### tests
Backend tests.