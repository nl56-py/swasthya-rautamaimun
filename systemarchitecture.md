# System Architecture

## Stack

- Framework: Next.js `16.2.10` with App Router.
- Language: TypeScript.
- Styling: Tailwind CSS.
- Auth: Supabase Auth using email/password.
- Database: Supabase Postgres.
- Deployment: Vercel.
- Assets: local public assets for emblem, Nepal flag, health chief photo, and captured references.

## Runtime Environment

Required production variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Optional server-side variables for future admin APIs:

```env
SUPABASE_SERVICE_ROLE_KEY=
```

The public site renders seed content if Supabase is not configured. In production, content reads from Supabase tables.

## Application Routes

- `/`: public health branch website with all major sections.
- `/admin/login`: Supabase email/password sign-in.
- `/admin`: authenticated admin dashboard and content editor.

## Data Model

The editable content is normalized around reusable section records and typed feature tables.

```sql
create table site_sections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  body text,
  metadata jsonb default '{}',
  updated_at timestamptz default now()
);

create table staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  email text,
  phone text,
  photo_url text,
  sort_order int default 0
);

create table health_institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  address text,
  phone text,
  service_time text,
  map_url text,
  sort_order int default 0
);

create table notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  body text,
  published_at date default current_date,
  file_url text,
  is_featured boolean default false
);

create table programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  icon text,
  sort_order int default 0
);

create table downloads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  file_url text,
  updated_at timestamptz default now()
);

create table emergency_contacts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  phone text not null,
  details text,
  sort_order int default 0
);

create table grievances (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  phone text,
  email text,
  category text,
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  service text not null,
  preferred_date date,
  message text,
  status text default 'requested',
  created_at timestamptz default now()
);
```

## Auth And Authorization

1. Admin signs in at `/admin/login` through Supabase Auth.
2. Client checks `supabase.auth.getSession()`.
3. Admin route redirects unauthenticated users back to `/admin/login`.
4. Row Level Security should be enabled in Supabase.
5. Public read policies apply to published content tables.
6. Insert/update/delete policies should be limited to authenticated admin users.

Recommended Supabase policy model:

- Public can select published public content.
- Authenticated admin can manage public content.
- Public can insert grievances and appointment requests.
- Only authenticated admin can select/update grievances and appointments.

## Content Flow

1. Admin edits data in `/admin`.
2. The app writes to Supabase tables.
3. Public pages read updated content from Supabase.
4. If Supabase is unavailable in local development, seed data renders and admin forms remain visible for UI testing.

## Deployment Plan

1. Create Supabase project.
2. Run schema SQL.
3. Create admin user in Supabase Auth.
4. Add environment variables in Vercel.
5. Deploy Next.js app to Vercel.
6. Verify public pages, admin login, section edits, appointment requests, and grievance submissions.

