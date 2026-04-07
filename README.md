# Montreal Concierge Services

Professional concierge and commercial cleaning services for Montreal South Shore (Riviera Sud). Serving businesses, property owners, and Airbnb hosts with excellence and reliability.

## 🌐 Live Website

**Production:** https://montreal-concierge-services.vercel.app
**Status:** 🚀 Deploying to Vercel
**Languages:** English 🇬🇧 | Français 🇫🇷

## 🚀 Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS v4.2
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Email:** Resend
- **Deployment:** Vercel
- **Internationalization:** next-intl (EN/FR)
- **Forms:** React Hook Form + Zod

## 📋 Features

✅ Responsive design (mobile-first)
✅ SEO optimized (H1-H3 hierarchy, meta tags, Open Graph)
✅ Bilingual support (English/Français)
✅ Contact form with email notifications
✅ Professional blog (6 posts)
✅ Admin dashboard (CRUD services, analytics)
✅ Supabase integration
✅ Production-ready with CI/CD

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup

1. Clone the repository:
```bash
git clone https://github.com/inspiraagencia/montreal-concierge-services.git
cd montreal-concierge-services
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Then update `.env.local` with your actual values:
- Supabase credentials
- Resend API key
- Site URL
- Admin email

4. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 🌍 Localization

The site automatically detects language based on URL:
- `/en/` - English
- `/fr/` - Français (French)

Default language: English

## 📦 Build & Production

### Build
```bash
npm run build
```

### Start Production
```bash
npm run start
```

### Lint
```bash
npm run lint
```

## 🚢 Deployment to Vercel

This project is configured for automatic deployment to Vercel.

### First Time Setup

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Import project to Vercel:
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select the GitHub repository
   - Click "Import"

3. Configure environment variables in Vercel Dashboard:
   - Go to Settings → Environment Variables
   - Add all variables from `.env.example`
   - Required production variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY
     SUPABASE_SERVICE_ROLE_KEY
     DATABASE_URL
     RESEND_API_KEY
     NEXT_PUBLIC_SITE_URL
     ADMIN_EMAIL
     ```

4. Click "Deploy"

### Automatic Deployments

After initial setup, every push to `main` branch automatically deploys:
```bash
git push origin main  # Triggers Vercel deployment
```

### Preview Deployments

Each pull request gets a preview URL for testing before merging to production.

## 📊 Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   │   └── contact/         # Contact form API
│   └── [locale]/            # Localized routes (EN/FR)
│       ├── (home)/page.tsx
│       ├── services/
│       ├── blog/
│       ├── contact/
│       └── admin/           # Dashboard
├── components/              # React components
├── lib/                     # Utilities & helpers
├── middleware.ts            # i18n middleware
├── types/                   # TypeScript types
└── styles/                  # Global styles
```

## 🗄️ Database (Supabase)

### Tables
- `contact_submissions` - Contact form submissions
- `services` - Service offerings (CRUD via admin)
- `blog_posts` - Blog content

### Authentication
- Supabase Auth for admin dashboard
- Email/password authentication

## 📧 Email (Resend)

Contact form notifications are sent via Resend:
- Admin receives contact form submissions at `ADMIN_EMAIL`
- Client receives confirmation email
- Both can be customized in `src/app/api/contact/route.ts`

## 🔐 Security

- ✅ HTTPS enabled (Vercel automatic)
- ✅ Environment variables protected
- ✅ Secret keys never in code
- ✅ CORS configured
- ✅ Rate limiting on API endpoints
- ✅ Input validation (Zod schemas)

## 📱 Responsive Design

Tested on:
- ✅ Mobile (iPhone, Android)
- ✅ Tablet (iPad, Android tablets)
- ✅ Desktop (1920x1080+)

## ♿ Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Color contrast WCAG AA

## 🔍 SEO

- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Sitemap (if configured)
- ✅ robots.txt
- ✅ Structured data (schema.org)
- ✅ H1-H3 hierarchy

## 🧪 Testing

```bash
# Run linting
npm run lint

# Manual testing
npm run dev
# Visit http://localhost:3000 and test features
```

## 📞 Support

For questions or issues:
- Email: info@inspiracompany.com
- GitHub: [inspiraagencia/montreal-concierge-services](https://github.com/inspiraagencia/montreal-concierge-services)

## 📄 License

Private project. All rights reserved.

---

**Built with ❤️ by Inspira Agency**
