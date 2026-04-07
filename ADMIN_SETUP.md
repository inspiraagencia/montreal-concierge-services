# Admin Dashboard Setup Guide

## Overview

Phase 9A of the Montreal Concierge Services project implements a comprehensive admin dashboard with authentication, role-based access control, and full content management capabilities.

## Quick Start

### 0. Crear Super Admin Inicial

**Paso 1: Crear usuario en Supabase Auth**

1. Ir a [Dashboard de Supabase](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ir a **Authentication > Users**
4. Clic en **Add User**
5. Completar datos:
   - Email: `inspiraagencia@hotmail.com`
   - Password: `Abcde123450`
   - Marcar: ✅ "Auto Confirm Email"
6. Clic **Save**
7. **Copiar el UUID** del usuario creado (parte superior derecha)

**Paso 2: Registrar en tabla admin_users**

1. Ir a **SQL Editor**
2. Clic **New Query**
3. Copiar el contenido de `supabase/seed-super-admin.sql`
4. **Reemplazar `USER_UUID_HERE`** con el UUID copiado en paso anterior
5. Ejecutar query

Ejemplo:
```sql
INSERT INTO public.admin_users (id, email, full_name, role, is_active, created_at)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',  -- ← UUID copiado
  'inspiraagencia@hotmail.com',
  'Super Admin',
  'admin',
  true,
  NOW()
);
```

### 1. Run Supabase Migrations

Execute the SQL migrations to create the necessary database tables:

```bash
# Option A: Using Supabase Dashboard
1. Go to SQL Editor in your Supabase project
2. Create new query
3. Copy contents from: supabase/migrations/001_create_admin_tables.sql
4. Run the query
5. Repeat for: supabase/migrations/002_create_content_tables.sql

# Option B: Using Supabase CLI
supabase db push
```

### 2. Create Initial Admin User

After running migrations, create your first admin user:

```sql
-- Run this in Supabase SQL Editor
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'admin@example.com',
  crypt('your_secure_password', gen_salt('bf')),
  NOW(),
  '{}',
  NOW(),
  NOW()
);

-- Get the user ID from the above query, then run:
INSERT INTO public.admin_users (id, email, full_name, role, is_active)
VALUES (
  'USER_ID_FROM_ABOVE',
  'admin@example.com',
  'Admin User',
  'admin',
  true
);
```

### 3. Access the Admin Panel

1. Start your development server:
```bash
npm run dev
```

2. Navigate to: `http://localhost:3000/admin/login`

3. Sign in with your admin credentials

## Architecture

### Database Tables

#### admin_users
- Stores admin user accounts with roles (admin, editor, viewer)
- Row Level Security (RLS) policies ensure users can only access appropriate data
- Role hierarchy: admin > editor > viewer

#### contact_submissions (existing)
- Stores contact form submissions
- Dashboard displays all submissions with response tracking

#### services
- Bilingual service definitions (English/French)
- Icons, colors, ordering for frontend display
- Managed by editors and admins

#### blog_posts
- Full bilingual blog post management
- Supports draft/published states
- Featured images and SEO-friendly slugs

#### testimonials
- Client testimonials with ratings (1-5 stars)
- Avatar images and company information
- Draft/published states

#### images_gallery
- Centralized image management by category
- Categories: hero, services, testimonials, team, portfolio, other
- Alt text for accessibility (bilingual)

#### audit_logs
- Automatic tracking of all changes
- Captures action, table, changes, timestamp
- Admin-only visibility for security

### Authentication Flow

1. **Login Page** (`/admin/login`)
   - Email/password authentication via Supabase Auth
   - Validates admin status
   - Checks if account is active

2. **Protected Route** (`ProtectedRoute` component)
   - Client-side protection wrapper
   - Redirects to login if not authenticated
   - Enforces role-based access control
   - Required roles: admin, editor, viewer

3. **Admin Hook** (`useAdminAuth`)
   - Manages auth state and user info
   - Provides role helpers (isAdmin, isEditor, isViewer)
   - Handles logout

### Pages & Permissions

| Page | Path | Min Role | Purpose |
|------|------|----------|---------|
| Dashboard | `/admin` | viewer | Overview and navigation |
| Solicitudes | `/admin/solicitudes` | viewer | View contact submissions |
| Servicios | `/admin/servicios` | editor | Manage services |
| Blog | `/admin/blog` | editor | Create/edit posts |
| Testimonios | `/admin/testimonios` | editor | Manage testimonials |
| Galería | `/admin/galeria` | editor | Manage images |
| Usuarios | `/admin/usuarios` | admin | Manage admin users |
| Auditoría | `/admin/audit` | admin | View change logs |
| Reportes | `/admin/reportes` | viewer | Analytics & statistics |

## Environment Variables

Ensure your `.env.local` contains:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
DATABASE_URL=postgresql://user:password@host:port/database
```

## Features Implemented

### Phase 9A: Authentication & Security ✅
- [x] Supabase Auth integration
- [x] Role-based access control (RBAC)
- [x] Row Level Security (RLS) policies
- [x] Login page with email/password
- [x] useAdminAuth hook
- [x] Protected routes with role enforcement
- [x] Admin user management
- [x] Audit logging

### Phase 9B: Content Tables ✅
- [x] Services table (bilingual)
- [x] Blog posts table (bilingual with drafts)
- [x] Testimonials table (with ratings)
- [x] Images gallery table
- [x] Audit logs table
- [x] RLS policies for all tables

### Phase 9C: Dashboard Pages ✅
- [x] Admin dashboard with module grid
- [x] Solicitudes (contact submissions viewer)
- [x] Servicios (CRUD for services)
- [x] Blog (full post management)
- [x] Testimonios (testimonial management)
- [x] Galería (image gallery)
- [x] Usuarios (admin user management)
- [x] Auditoría (audit log viewer)
- [x] Reportes (analytics & insights)

## Gestión de Usuarios

### Crear Nuevos Usuarios (Super Admin)

1. Login como Super Admin
2. Navegar a **Usuarios**
3. Clic **+ Nuevo Usuario**
4. Completar formulario:
   - **Email**: correo del nuevo usuario
   - **Nombre Completo**: nombre visible
   - **Contraseña Temporal**: contraseña inicial (mín. 8 caracteres)
   - **Rol**: seleccionar rol (Visualizador/Editor/Admin)
5. Clic **Crear Usuario**

**Sistema de Roles:**

| Rol | Permisos |
|-----|----------|
| **Visualizador** | Solo ver solicitudes de cotización |
| **Editor** | Crear/editar servicios, posts, testimonios, imágenes |
| **Administrador** | Acceso completo + gestionar usuarios y auditoría |

### Cambiar Contraseña de Usuario

Cada usuario puede cambiar su contraseña después del primer login:

1. Ir a cualquier página del dashboard
2. En la esquina inferior izquierda (Sidebar)
3. Ver perfil → Cambiar contraseña (cuando se implemente)

### Desactivar/Reactivar Usuarios

En la página **Usuarios**, cada usuario tiene botón:
- **Desactivar**: Bloquea acceso a la cuenta
- **Activar**: Reactiva el acceso

### Eliminar Usuarios

⚠️ **Irreversible**: Elimina completamente el usuario
- El usuario ya no puede acceder
- Los cambios anteriores quedan en el audit log

## Usage Examples

### Creating a Service

1. Login as admin or editor
2. Navigate to Servicios
3. Click "+ Nuevo Servicio"
4. Fill in English and French versions
5. Upload emoji icon and select color
6. Save

### Publishing a Blog Post

1. Navigate to Blog
2. Click "+ Nuevo Post"
3. Fill in bilingual content, excerpt, slug
4. Upload featured image
5. Click "Crear Post" (creates as draft)
6. Click "Publicar" to publish

### Managing Users

1. Login as admin
2. Navigate to Usuarios
3. Add new admin users by email
4. Assign roles: admin, editor, viewer
5. Toggle active/inactive status

### Viewing Analytics

1. Navigate to Reportes
2. View key metrics:
   - Total solicitudes
   - Pending responses
   - Response rate
3. Filter by time range
4. See actionable insights

## Security Best Practices

1. **Always Use HTTPS** in production
2. **Keep Service Role Key Secret** - never expose in frontend
3. **Row Level Security** - all tables have RLS enabled
4. **Audit Logs** - track all changes automatically
5. **Role Enforcement** - client and server-side validation
6. **Active Status** - deactivate users instead of deleting

## Future Enhancements (Phase 9D+)

- [ ] TipTap rich text editor for blog posts
- [ ] PDF/Excel/CSV export functionality
- [ ] Recharts for advanced analytics
- [ ] Supabase Realtime notifications
- [ ] Zod schema validation
- [ ] Upstash rate limiting
- [ ] Dark mode support
- [ ] Email notifications for new submissions

## Troubleshooting

### "Admin user not found" error
- Ensure admin_users record exists for your auth user
- Check email matches exactly

### Can't upload images
- Verify /public/images/ directories exist
- Check file size is under 5MB
- Ensure file is valid image (jpg, png, webp, gif)

### RLS policy errors
- Verify Supabase Auth user exists
- Check admin_users record is_active = true
- Ensure user has correct role for operation

### Services not showing on homepage
- Verify services exist in database
- Check they are marked as active = true
- Clear browser cache

## Support

For issues or questions about the admin dashboard, refer to:
- Supabase documentation: https://supabase.com/docs
- Next.js documentation: https://nextjs.org/docs
- Project structure: See PROYECTO_STRUCTURE.md
