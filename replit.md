# Investment Portfolio Tracker

## Overview

This is a full-stack investment portfolio tracking application built with React frontend and Express backend. The application allows users to manage their investment portfolio by adding, viewing, updating, and deleting investment positions. It features a modern UI with dashboard analytics, portfolio overview, and detailed investment management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Management**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas for request/response validation
- **Development**: Hot reload with Vite integration

## Key Components

### Database Schema
- **Investments Table**: Stores investment positions with fields for symbol, company name, shares, purchase price, current price, and purchase date
- **Users Table**: Basic user management (prepared but not fully implemented)
- **Migrations**: Drizzle Kit handles database schema migrations

### API Endpoints
- `GET /api/investments` - Retrieve all investments
- `GET /api/investments/:id` - Retrieve specific investment
- `POST /api/investments` - Create new investment
- `PUT /api/investments/:id` - Update existing investment
- `DELETE /api/investments/:id` - Delete investment

### Frontend Components
- **Dashboard**: Main page with portfolio overview and investment management
- **Portfolio Overview**: Displays total portfolio value, gains/losses, and key metrics
- **Investment Form**: Add new investments with validation
- **Investment List**: Display and manage existing investments
- **Quick Stats**: Portfolio performance indicators
- **Recent Activity**: Mock activity feed

### UI Components
- Comprehensive Shadcn/UI component library
- Custom styling with CSS variables for consistent theming
- Responsive design with mobile-first approach
- Toast notifications for user feedback

## Data Flow

1. **Client Request**: React components make API calls using TanStack Query
2. **API Processing**: Express server validates requests with Zod schemas
3. **Database Operations**: Drizzle ORM executes SQL queries against PostgreSQL
4. **Response**: Data flows back through the API to update React Query cache
5. **UI Update**: Components re-render with fresh data automatically

## External Dependencies

### Backend Dependencies
- **@neondatabase/serverless**: Neon Database connection driver
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **drizzle-kit**: Database migration and introspection toolkit
- **express**: Web application framework
- **zod**: Schema validation library

### Frontend Dependencies
- **@tanstack/react-query**: Data fetching and caching
- **@radix-ui/***: Accessible UI component primitives
- **react-hook-form**: Form state management
- **wouter**: Lightweight routing
- **tailwindcss**: Utility-first CSS framework
- **date-fns**: Date manipulation utilities

## Deployment Strategy

### Development
- Vite dev server for frontend with hot module replacement
- Express server with TypeScript compilation via tsx
- Database migrations handled by Drizzle Kit
- Environment variables for database configuration

### Production Build
- Frontend: Vite builds optimized static assets
- Backend: esbuild bundles Express server for Node.js
- Database: Drizzle migrations applied via `db:push` command
- Static assets served by Express in production

### Configuration
- TypeScript configuration supports both client and server code
- Path aliases configured for clean imports
- PostCSS with Tailwind CSS processing
- ESM modules throughout the application

The application uses a modern monorepo structure with shared TypeScript types and schemas between frontend and backend, ensuring type safety across the entire stack.