# Ryan Steffan's Personal Website

![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.3-38b2ac)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-latest-336791)

A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS. Features include a dynamic homepage with animations, an about section, projects showcase integrated with GitHub, skills page, blog functionality, and a contact form.

## 🚀 Features

- **Interactive Homepage** - Animated background and modern UI
- **About Me Page** - Professional introduction with social links
- **Skills Showcase** - Expandable sections detailing technical expertise
- **Projects Gallery** - Dynamic integration with GitHub repositories
- **Contact Form** - Email functionality using Azure Communication Services
- **Blog System** - Content management (currently under development)
- **Admin Dashboard** - Protected management area for content updates
- **Authentication** - Secure access control using Clerk
- **Responsive Design** - Mobile-friendly interface

## 🛠️ Technologies

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk
- **Email**: Azure Communication Services
- **Deployment**: Fly.io with GitHub Actions CI/CD
- **Other**: GitHub API integration, React Hook Form, Zod validation

## 🔧 Setup & Installation

### Prerequisites

- Node.js (v20 or later recommended)
- npm (10.9.2 or later)
- PostgreSQL database

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourname/personal_website.git
   cd personal_website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   - Copy `.env.example` to `.env`

   ```bash
   cp .env.example .env
   ```

   - Fill in the required environment variables:
     - Database connection
     - Authentication credentials
     - Azure Communication Services connection string
     - GitHub token
     - Clerk API keys

4. **Start the database**

   ```bash
   ./start-database.sh
   ```

5. **Run migrations**

   ```bash
   npm run db:push
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```
7. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
personal_website/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (public)/         # Public routes
│   │   └── (private)/        # Protected routes
│   ├── components/           # React components
│   │   ├── client/           # Client-side components
│   │   └── ui/               # UI components
│   ├── lib/                  # Utility functions
│   ├── server/               # Server-side code
│   │   └── db/               # Database models and configuration
│   └── styles/               # Global styles
├── public/                   # Static assets
├── .github/                  # GitHub workflows
└── docker-compose.yaml       # Docker configuration
```

## 💻 Development

### Available Scripts

- **Development server**

  ```bash
  npm run dev
  ```

- **Build project**

  ```bash
  npm run build
  ```

- **Code linting**

  ```bash
  npm run lint
  ```

- **Type checking**

  ```bash
  npm run typecheck
  ```

- **Database management**
  ```bash
  npm run db:generate   # Generate Drizzle migrations
  npm run db:push      # Push schema to database
  npm run db:studio    # Open Drizzle Studio
  ```

## 🚢 Deployment

The project is configured for deployment to Fly.io using GitHub Actions:

1. Set up secrets in your GitHub repository:

   - `FLY_API_TOKEN`
   - `CLERK_PUBLISHABLE_KEY`

   The fly api token is used to push to fly, the clerk publishable key is needed in order to generate the pages.

2. Push to the main branch to trigger automatic deployment.

Alternatively, deploy manually:

```bash
flyctl deploy
```

## 🐳 Docker

The project includes Docker configuration for containerized deployment:

```bash
docker-compose up -d
```

## 🔐 Environment Variables

Required environment variables (see `.env.example` for full list):

- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Environment setting ("development", "test", or "production")
- `CONTACT_EMAIL` - Email to receive contact form submissions
- `COMMUNICATION_SERVICES_CONNECTION_STRING` - Azure Communication Services connection
- `GITHUB_TOKEN` - GitHub API token for repository integration
- `CLERK_SECRET_KEY` - Authentication secret for Clerk
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Public Clerk API key
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - Authentication sign-in URL
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` - Redirect URL after sign-in
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` - Redirect URL after sign-up

## 📄 License

This project is made source available under specific conditions - see the [LICENSE](LICENSE) file for details.

## 👤 Contact

- **Ryan Steffan**
- GitHub: [TheTurnnip](https://github.com/TheTurnnip/)
- Email: ryansteffan.biz@gmail.com

---

Built using the [T3 Stack](https://create.t3.gg/)
