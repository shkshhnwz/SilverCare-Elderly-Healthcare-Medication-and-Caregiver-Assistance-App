# Backend Architecture

## Request Flow

Route
→ Middleware
→ Controller
→ Service
→ Repository
→ Prisma
→ PostgreSQL

## Rules

1. Routes should only define endpoints.
2. Controllers handle HTTP requests and responses.
3. Services contain business logic.
4. Repositories handle database operations.
5. Validate all incoming requests on the backend.
6. Authentication is handled through middleware.
7. Authorization is handled through middleware.
8. Database access is done through Prisma.
9. Feature-specific code belongs inside `src/modules`.
10. Shared functionality belongs inside `services`, `utils`, or `config`.
11. Do not put business logic directly inside routes.
12. Do not access Prisma directly from controllers.
13. API routes should use `/api/v1/`.
14. Never commit `.env` files.