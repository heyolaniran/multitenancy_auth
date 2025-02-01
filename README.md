# Multi-Tenant API with JWT Authentication

A NestJS-based multi-tenant API that implements database-per-tenant architecture with JWT authentication.

## Features

- Multi-tenant architecture (database per tenant)
- JWT authentication with tenant-specific secrets
- User management
- Product management per tenant
- MongoDB integration
- Environment configuration
- Request middleware for tenant identification

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/master
ENCRYPTION_KEY=your_encryption_key

## Routes preview

```
POST   /api/tenants       - Create tenant
GET    /api/tenants      - List tenants
POST   /api/auth/login    - User login
POST   /api/auth/register - User registration

GET    /api/products     - List products
POST   /api/products     - Create product
PUT    /api/products/:id - Update product
DELETE /api/products/:id - Delete product```

## Project Strucutre 

```
src/
├── auth/          # Authentication
├── tenants/       # Tenant management
├── products/      # Product operations
├── users/         # User management
├── common/        # Shared resources
└── config/        # Configuration ```