# InvestRO - HYIP Investment Platform

## Project Overview
High-Yield Investment Program (HYIP) web application for investRO.online featuring investment plans, calculator for returns, and user account management. The platform allows users to invest money and earn returns according to different investment plans.

## Recent Changes
- **2025-01-10**: Project replaced with user's comprehensive InvestRoTracker codebase
- **2025-01-10**: Added prominent "Hello World" header to dashboard as requested
- **2025-01-10**: Complete Supabase database integration implemented
- **2025-01-10**: Created comprehensive database schema with users, plans, investments, transactions, referrals tables
- **2025-01-10**: Implemented Supabase authentication system with AuthProvider component
- **2025-01-10**: Updated all storage operations to use Supabase PostgreSQL backend
- **2025-01-10**: Added comprehensive API endpoints for all database operations
- **2025-01-10**: User provided Supabase credentials via Replit Secrets
- **2025-01-10**: Fixed authentication flow issues: disabled email verification for easier registration and corrected login redirect to dashboard
- **2025-01-10**: Updated all components from Firebase to Supabase authentication system with proper state management
- **2025-01-10**: Implemented newsletter subscription functionality with database integration
- **2025-01-10**: Added dark/light theme switcher with ThemeContext and toggle button in header
- **2025-01-10**: Updated "Invest Now" buttons to use yellow color (#fac219) with proper theme separation
- **2025-01-10**: Fixed InvestRO logo styling with "Invest" in black/white and "RO" in blue for both themes
- **2025-01-10**: Created comprehensive admin system with login page and dashboard
- **2025-01-10**: Added admin authentication with localStorage-based session management
- **2025-01-10**: Built admin dashboard with user management, investment tracking, transaction history, and newsletter management

## Project Architecture
- **Frontend**: React with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Node.js with Express.js
- **Database**: Supabase (PostgreSQL) - Fully integrated with complete schema
- **Authentication**: Supabase Auth with AuthProvider context
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **Forms**: React Hook Form with Zod validation
- **API**: RESTful endpoints for all database operations

## User Preferences
- Focus on modern web design principles
- Responsive design for mobile, tablet, and desktop
- Professional appearance suitable for financial platform
- PKR (Pakistani Rupee) currency formatting

## Features Implemented
- **Landing Page**: Hero section with professional design
- **Investment Plans**: 6 tiers stored in database (Starter, Silver, Gold, Platinum, Diamond, VIP)
- **Investment Calculator**: Real-time calculations using database-stored plan data
- **Database Operations**: Complete CRUD operations for all entities
- **User Authentication**: Supabase Auth with login/register functionality
- **API Endpoints**: RESTful API for plans, stats, users, investments, transactions, referrals
- **Features Showcase**: Dynamic content presentation
- **Community Integration**: WhatsApp/Telegram links
- **Professional UI**: Header, footer, and responsive design

## Database Schema
- **Users**: Authentication, profile, balance, referral system
- **Plans**: Investment plans with ROI, duration, limits, features
- **Investments**: User investments with tracking and status
- **Transactions**: Deposits, withdrawals, profits, bonuses
- **Referrals**: Multi-level referral system with commissions

## Investment Plans
1. **Starter Plan**: 1.5% daily ROI, 10 days, PKR 50-500
2. **Silver Plan**: 2.2% daily ROI, 20 days, PKR 500-2000
3. **Gold Plan**: 3.0% daily ROI, 30 days, PKR 2000-5000 (Popular)
4. **Platinum Plan**: 3.8% daily ROI, 45 days, PKR 5000-10000
5. **Diamond Plan**: 4.5% daily ROI, 60 days, PKR 10000-25000
6. **VIP Plan**: 5.5% daily ROI, 90 days, PKR 25000+

## Authentication Flow Status
- **Registration**: Users can register without email verification (immediate account creation)
- **Login**: Proper authentication with redirect to dashboard
- **Dashboard**: Protected route with user authentication state management
- **Logout**: Secure signout with proper state cleanup

## Next Steps
- Implement payment gateway integration (Stripe, PayPal, JazzCash)
- Add user investment management (create, track, calculate returns)
- Implement referral system with commissions
- Add transaction history and wallet management
- Multi-language support (English, Urdu)
- Admin panel for platform management