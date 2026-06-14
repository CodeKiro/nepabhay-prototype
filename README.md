# Nepa:Bhay - Language Learning Platform (Prototype)

> A personal prototype for a platform dedicated to preserving and celebrating the rich linguistic heritage of Nepal.

## About Nepa:Bhay

**"Nepa:Bhay"** means "Nepali Bhasa" (Nepali Language), representing not just one language but the entire spectrum of local Nepali languages. This platform is a prototype of my idea to celebrate the linguistic diversity that makes Nepal culturally rich and unique.

I started this as a **Newa language learning platform**, but my vision extends far beyond. I am building a comprehensive repository for all local Nepali languages, preserving their essence for future generations.

### 🎯 My Mission
To create a comprehensive digital repository for learning and preserving Nepali languages, starting with Newa language, while building a vibrant community of language enthusiasts and cultural heritage preservers.

### 👁️ My Vision
To become the leading online platform for all local Nepali languages, creating an interconnected community that celebrates, learns, and preserves the diverse linguistic and cultural heritage of Nepal for future generations.

## Features

### 📚 Learning Made Engaging
- **Articles:** Rich, informative articles about Newa language, culture, and heritage. (Available Now)
- **Interactive Lessons:** Structured, step-by-step lessons with interactive exercises to make learning engaging and effective. (Coming Soon)
- **Quizzes:** Test your knowledge with fun, interactive quizzes designed to reinforce your learning journey. (Coming Soon)

### 🤝 Community-Driven Approach
The idea is for this platform to thrive on the collective passion and contributions of community members:
- **Contributors:** Writers, educators, and language experts who create and curate educational content.
- **Culture Enthusiasts:** Passionate individuals dedicated to preserving and sharing cultural heritage.
- **Developers:** Technical contributors who help build and improve the platform's features.

### 🔐 Robust User Management
- **Username Support**: Unique usernames with email/username login.
- **Account Management**: Soft account deletion (30-day grace period), account deactivation, and daily automated cleanup.
- **Profile Management**: Profile updates, email verification, password reset functionality, and role-based access control.
- **Admin Dashboard**: Comprehensive admin tools for content and user management.

## Tech Stack

This codebase is a prototype built as a full-stack Next.js application to demonstrate the core concepts of the platform:

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS v4 & Lucide React
- **State Management**: Redux Toolkit
- **Rich Text Editor**: Tiptap
- **Forms & Validation**: React Hook Form + Zod
- **Email**: SMTP (Nodemailer)
- **Scheduler**: node-cron for automated background tasks

## Quick Start

### 1. Environment Setup

Clone the repository and set up your environment variables:

```bash
git clone https://github.com/CodeKiro/nepabhay-prototype.git
cd nepabhay-prototype
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database
MONGODB_URI=your-mongodb-uri

# Authentication
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Email Configuration (e.g., Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=your-email@gmail.com

# Admin Setup
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure-admin-password

# Cleanup Scheduler
CLEANUP_API_KEY=your-secure-cleanup-key
ENABLE_SCHEDULER=true
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run setup-admin  # Create an admin user from the CLI
npm run cleanup      # Trigger manual account cleanup
npm run test-email   # Test the configured email settings
```

## Admin Features

Access the admin dashboard at `/admin` to:
- View platform statistics.
- Manage users, articles, and other community content.
- Monitor account cleanup status.
- Run manual account cleanup procedures.
