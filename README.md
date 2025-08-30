# Nepa:Bhay - Poetry, Stories & Blogs Platform

A modern Next.js platform for sharing poems, stories, and blogs with robust user management features.

## Features

### 🔐 User Management

- **Username Support**: Unique usernames with email/username login
- **Soft Account Deletion**: 30-day grace period with auto-reactivation
- **Account Deactivation**: Temporary suspension with easy reactivation
- **Auto Cleanup**: Daily scheduled cleanup at 2 AM

### 🎨 Content Management

- Poetry, stories, and blog creation
- Rich text editor with formatting
- Categories and genres
- User reactions and comments

### 👤 User Features

- Profile management with username updates
- Email verification system
- Password reset functionality
- Role-based access control

## Quick Start

### 1. Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

```bash
# Database
MONGODB_URI=your-mongodb-uri

# Authentication
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Email Configuration (Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=nepabhay2025@gmail.com
MAIL_PASSWORD=your-gmail-app-password
MAIL_FROM=nepabhay2025@gmail.com

# Admin Setup
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure-admin-password

# Cleanup Scheduler
CLEANUP_API_KEY=your-secure-cleanup-key
ENABLE_SCHEDULER=true
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run setup-admin  # Create admin user
npm run cleanup      # Manual account cleanup
npm run test-email   # Test email configuration
```

## Admin Features

Access admin dashboard at `/admin` to:

- View platform statistics
- Manage users and content
- Monitor account cleanup status
- Run manual account cleanup

## Account Management

### Soft Deletion

- Users can request account deletion
- 30-day grace period before permanent deletion
- Automatic reactivation on login during grace period
- Scheduled cleanup runs daily at 2 AM

### Username System

- 3-20 characters (letters, numbers, underscores)
- Unique across platform
- Login with email OR username
- Changeable in profile settings

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Email**: SMTP (Gmail with App Passwords)
- **Scheduler**: node-cron for automated tasks

## Production Deployment

### Environment Variables (CRITICAL)

Set these in your deployment platform:

```bash
# Authentication (REQUIRED)
NEXTAUTH_SECRET=your-long-random-secret-minimum-32-characters
NEXTAUTH_URL=https://yourdomain.com  # Must match your deployed domain

# Database
MONGODB_URI=your-production-mongodb-uri

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# Email
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USER=your-email
MAIL_PASSWORD=your-email-password
MAIL_FROM=your-from-email

# Cleanup
CLEANUP_API_KEY=your-secure-cleanup-key
ENABLE_SCHEDULER=true
```

### Platform-Specific Setup

#### Vercel

1. Connect your GitHub repository
2. Add environment variables in Project Settings
3. Ensure `NEXTAUTH_URL` matches your domain
4. Deploy

#### Netlify/Railway/Render

1. Set build command: `npm run build`
2. Set start command: `npm run start`
3. Add all environment variables
4. Deploy

### OAuth Configuration

Update OAuth provider redirect URIs:

- Google: `https://yourdomain.com/api/auth/callback/google`
- Facebook: `https://yourdomain.com/api/auth/callback/facebook`

### Troubleshooting Deployment

If experiencing authentication issues, see [DEPLOYMENT_TROUBLESHOOTING.md](./DEPLOYMENT_TROUBLESHOOTING.md)

### Debugging Endpoints

- `/api/health` - Database connectivity
- `/api/auth/status` - Authentication status

## Support

For issues or questions:

1. Check console logs for errors
2. Verify environment configuration
3. Ensure database connectivity
4. Review API responses for detailed errors

Built with ❤️ using Next.js and modern web technologies.

# nepabhay-prototype
# nepabhay-prototype
