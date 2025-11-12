# NetworkPro

A modern professional networking platform built with Next.js 14, TypeScript, and Supabase. Connect with professionals worldwide, discover events, and explore career opportunities.

![NetworkPro](https://img.shields.io/badge/Next.js-14.2.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-2.0-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-cyan)

## 🌟 Features

- **Professional Profiles**: Create and browse detailed professional profiles with skills, experience, and certifications
- **Job Opportunities**: Discover and apply for job openings from companies worldwide
- **Networking Events**: Find and register for professional events, conferences, and workshops
- **Real-time Connections**: Send and manage connection requests with other professionals
- **Messaging System**: Communicate directly with your connections (coming soon)
- **Favorites**: Save interesting profiles, jobs, and events for later
- **Dark Mode**: Built-in dark mode support with next-themes
- **Responsive Design**: Fully responsive UI that works on all devices
- **Authentication**: Secure authentication with Supabase Auth (Google & GitHub providers)

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun
- A Supabase account ([Sign up here](https://supabase.com))

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/networkpro.git
cd networkpro
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up Supabase**

   - Create a new project in [Supabase](https://app.supabase.com)
   - Go to Project Settings > API
   - Copy your project URL and anon/public key

4. **Configure environment variables**

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. **Set up the database**

   a. Open the Supabase SQL Editor

   b. Run the schema file:
   ```bash
   # Copy and paste the contents of supabase/schema.sql into the SQL Editor
   ```

   c. (Optional) Add seed data:
   ```bash
   # Copy and paste the contents of supabase/seed.sql into the SQL Editor
   ```

6. **Configure Authentication Providers** (Optional)

   In your Supabase dashboard:
   - Go to Authentication > Providers
   - Enable Google and/or GitHub authentication
   - Add the OAuth credentials from your Google/GitHub apps

7. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

8. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
networkpro/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── about/             # About page
│   │   ├── auth/              # Authentication page
│   │   ├── events/            # Events listing and detail pages
│   │   ├── jobs/              # Jobs listing and detail pages
│   │   ├── privacy/           # Privacy policy page
│   │   ├── professionals/     # Professionals listing and detail pages
│   │   ├── profile/           # User profile page
│   │   ├── terms/             # Terms of service page
│   │   ├── layout.tsx         # Root layout with theme provider
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── Auth.tsx          # Authentication component
│   │   ├── EventCard.tsx     # Event card component
│   │   ├── Footer.tsx        # Footer component
│   │   ├── JobCard.tsx       # Job card component
│   │   ├── NavBar.tsx        # Navigation bar
│   │   └── ProfessionalCard.tsx # Professional card component
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.ts        # Authentication hook
│   │   ├── useEvents.ts      # Events data hook
│   │   ├── useJobs.ts        # Jobs data hook
│   │   └── useProfessionals.ts # Professionals data hook
│   ├── lib/                   # Utility functions
│   │   ├── api.ts            # API functions for data fetching
│   │   ├── supabase.ts       # Supabase client configuration
│   │   └── utils.ts          # Utility functions
│   └── types/                 # TypeScript type definitions
│       └── index.ts          # All type definitions
├── supabase/                  # Supabase configuration
│   ├── schema.sql            # Database schema
│   └── seed.sql              # Sample data
├── public/                    # Static assets
├── .env.example              # Example environment variables
└── package.json              # Dependencies and scripts
```

## 🗄️ Database Schema

The application uses the following main tables:

- **users**: User profiles and information
- **professionals**: Professional profiles with skills and experience
- **events**: Networking events and conferences
- **jobs**: Job opportunities and listings
- **connections**: User connections and networking
- **messages**: Direct messages between users
- **favorites**: Saved items (professionals, jobs, events)
- **event_registrations**: Event attendance tracking

For detailed schema information, see `supabase/schema.sql`.

## 🔐 Authentication

NetworkPro uses Supabase Authentication with support for:

- Email/Password authentication
- Google OAuth
- GitHub OAuth

Row Level Security (RLS) policies ensure users can only access and modify their own data.

## 🎨 Customization

### Theme Colors

Modify theme colors in `src/app/globals.css`:

```css
:root {
  --primary: ...;
  --secondary: ...;
  /* Add your custom colors */
}
```

### Components

All UI components are built with [shadcn/ui](https://ui.shadcn.com/) and can be customized in `src/components/ui/`.

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

NetworkPro can be deployed to any platform that supports Next.js:

- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Email us at support@networkpro.com
- Check out our [documentation](https://docs.networkpro.com)

## 🗺️ Roadmap

- [x] User authentication
- [x] Professional profiles
- [x] Job listings
- [x] Event management
- [x] Connection requests
- [x] Favorites system
- [ ] Real-time messaging
- [ ] Advanced search filters
- [ ] Notifications system
- [ ] Video calls integration
- [ ] Mobile app (React Native)

---

Made with ❤️ by the NetworkPro team
