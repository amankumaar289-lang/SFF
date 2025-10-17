# Accounting Policy Generator

## Overview

The Accounting Policy Generator is a web-based wizard application designed to help government organizations in Moscow create standardized accounting policies. The application guides users through a multi-step process to select their organization, choose relevant policy sections, and generate customized accounting policy documents. Built for the "Лидеры цифровой трансформации 2025" hackathon by Team SPACE (Захар Кондратьев, Никита Мусиенко).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 19** with TypeScript for type-safe component development
- **Vite 7** as the build tool and development server
- **Wouter** for lightweight client-side routing instead of React Router
- **TailwindCSS 4** for utility-first styling with a custom design system

**State Management & Data Fetching**
- **TanStack Query (React Query)** for server state management, caching, and data synchronization
- **React Hook Form** with Zod validation for form state and validation
- Custom hooks pattern for reusable logic (e.g., `use-toast`)

**Component Architecture**
- Modular UI component library in `client/src/components/ui/` following shadcn/ui patterns
- Page-based routing with components in `client/src/pages/`
- Reusable form components leveraging react-hook-form context
- Class variance authority (CVA) for component variant management

**Design Decisions**
- Problem: Need consistent, accessible UI components
- Solution: Built custom component library with TailwindCSS and CVA
- Rationale: Provides flexibility while maintaining design consistency
- Trade-off: More initial setup vs. using a pre-built component library

### Backend Architecture

**Server Framework**
- **Express.js 5** as the HTTP server framework
- **TSX** for running TypeScript files directly without compilation
- Vite middleware integration for serving the SPA in development

**Data Layer**
- **Drizzle ORM** for type-safe database operations and schema definitions
- **drizzle-zod** for automatic validation schema generation from database schemas
- **In-memory storage** implementation (`MemStorage`) for development/demo purposes
- Database-agnostic schema design allowing future PostgreSQL integration

**API Design**
- RESTful API structure with resource-based endpoints
- Centralized routing through `createRouter` factory function
- JSON request/response format with proper error handling
- Zod schema validation for all incoming data

**Design Decisions**
- Problem: Need type safety across database, API, and frontend
- Solution: Shared schema definitions using Drizzle + Zod in `shared/schema.ts`
- Rationale: Single source of truth prevents type mismatches
- Trade-off: Tight coupling between layers vs. guaranteed type consistency

### Data Models

**Organizations**
- Stores government organization details (name, INN, KPP, accounting type, industry, centralized office)
- Supports both budget accounting and business accounting types

**Policy Sections**
- Reusable policy content blocks with section numbers and titles
- Tagged with applicability flags (budget/business accounting, industry-specific)
- Industry filtering for contextual section presentation

**Generated Policies**
- Links organizations to selected policy sections
- Tracks generation date and approval status
- Enables policy versioning and audit trail

**Design Decisions**
- Problem: Need flexible policy composition from reusable sections
- Solution: Many-to-many relationship between policies and sections
- Rationale: Allows section reuse across multiple organizations while maintaining customization
- Trade-off: More complex queries vs. flexibility and maintainability

### Application Flow

**Multi-Step Wizard Pattern**
1. Organization selection or creation
2. Automatic filtering of applicable policy sections based on organization attributes
3. User selection of specific sections to include
4. Preview and policy generation

**Design Decisions**
- Problem: Complex data collection process can overwhelm users
- Solution: Progressive disclosure through wizard steps
- Rationale: Breaks complexity into manageable chunks with clear progress indication
- Trade-off: More navigation vs. improved user experience

## External Dependencies

### Frontend Libraries
- **@tanstack/react-query**: Server state management with intelligent caching
- **react-hook-form**: Performant form handling with minimal re-renders
- **@hookform/resolvers**: Zod integration for form validation
- **zod**: Schema validation and type inference
- **lucide-react**: Icon library for consistent iconography
- **tailwind-merge & clsx**: Utility for merging Tailwind classes without conflicts
- **class-variance-authority**: Type-safe component variants

### Backend Libraries
- **express**: Web application framework
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-zod**: Automatic Zod schema generation from Drizzle schemas
- **tsx**: TypeScript execution engine for Node.js

### Development Tools
- **TypeScript**: Static type checking across the entire stack
- **Vite**: Fast build tool with HMR for development
- **TailwindCSS**: Utility-first CSS framework with PostCSS
- **Autoprefixer**: Automatic vendor prefixing for CSS

### Database
- Currently using in-memory storage (MemStorage class)
- Schema designed for PostgreSQL compatibility through Drizzle ORM
- Easy migration path to persistent database by swapping storage implementation

### Deployment Considerations
- Vite builds to `dist/public` directory
- Express serves both API routes and SPA
- Server runs on port 5000 with 0.0.0.0 binding for container compatibility
- No external API dependencies or third-party services currently integrated