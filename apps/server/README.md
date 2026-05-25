# Technira API

Separate backend repo for the Technira.Space portfolio and service website.

## Setup

1. Copy `.env.example` to `.env`.
2. Add your MongoDB connection string as `MONGODB_URL`.
3. Set `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
4. Run `yarn install`.
5. Run `yarn dev`.

Default local API URL: `http://localhost:8000/api`.

The API seeds default profile, services, projects, and testimonials into MongoDB when the
collections are empty.

It also seeds the first admin account from `ADMIN_EMAIL` and `ADMIN_PASSWORD` when that
admin email does not exist. After that, admin login uses the MongoDB admin user password
with bcrypt and JWT, not a hardcoded server token.

## Main routes

- `POST /api/auth/register` - register a client user.
- `POST /api/auth/login` - login a client user.
- `GET /api/dashboard` - client dashboard and orders, requires user JWT.
- `POST /api/dashboard/orders` - create a client order request, requires user JWT.
- `POST /api/admin/login` - admin login with MongoDB admin credentials.
- `GET /api/admin/orders` - list all client orders, requires admin JWT.
