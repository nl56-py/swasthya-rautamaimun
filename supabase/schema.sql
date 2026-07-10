create extension if not exists pgcrypto;

create table if not exists site_sections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  body text,
  metadata jsonb default '{}',
  updated_at timestamptz default now()
);

create table if not exists staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  email text,
  phone text,
  photo_url text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists health_institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  address text,
  phone text,
  service_time text,
  map_url text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  body text,
  published_at date default current_date,
  file_url text,
  is_featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  icon text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists downloads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  file_url text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists emergency_contacts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  phone text not null,
  details text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  media_type text default 'photo',
  media_url text,
  thumbnail_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists citizen_charter (
  id uuid primary key default gen_random_uuid(),
  service text not null,
  fee text not null,
  service_time text not null,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists grievances (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  phone text,
  email text,
  category text,
  message text not null,
  status text default 'new' check (status in ('new', 'in_review', 'resolved', 'closed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  service text not null,
  preferred_date date,
  message text,
  status text default 'requested' check (status in ('requested', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table site_sections enable row level security;
alter table staff enable row level security;
alter table health_institutions enable row level security;
alter table notices enable row level security;
alter table programs enable row level security;
alter table downloads enable row level security;
alter table emergency_contacts enable row level security;
alter table gallery_items enable row level security;
alter table citizen_charter enable row level security;
alter table grievances enable row level security;
alter table appointments enable row level security;

create policy "public read site sections" on site_sections for select using (true);
create policy "public read staff" on staff for select using (true);
create policy "public read health institutions" on health_institutions for select using (true);
create policy "public read notices" on notices for select using (true);
create policy "public read programs" on programs for select using (true);
create policy "public read downloads" on downloads for select using (true);
create policy "public read emergency contacts" on emergency_contacts for select using (true);
create policy "public read gallery items" on gallery_items for select using (true);
create policy "public read citizen charter" on citizen_charter for select using (true);

create policy "public create grievances" on grievances for insert with check (true);
create policy "public create appointments" on appointments for insert with check (true);

create policy "authenticated manage site sections" on site_sections for all to authenticated using (true) with check (true);
create policy "authenticated manage staff" on staff for all to authenticated using (true) with check (true);
create policy "authenticated manage health institutions" on health_institutions for all to authenticated using (true) with check (true);
create policy "authenticated manage notices" on notices for all to authenticated using (true) with check (true);
create policy "authenticated manage programs" on programs for all to authenticated using (true) with check (true);
create policy "authenticated manage downloads" on downloads for all to authenticated using (true) with check (true);
create policy "authenticated manage emergency contacts" on emergency_contacts for all to authenticated using (true) with check (true);
create policy "authenticated manage gallery items" on gallery_items for all to authenticated using (true) with check (true);
create policy "authenticated manage citizen charter" on citizen_charter for all to authenticated using (true) with check (true);
create policy "authenticated manage grievances" on grievances for all to authenticated using (true) with check (true);
create policy "authenticated manage appointments" on appointments for all to authenticated using (true) with check (true);

create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null, -- rich text HTML
  cover_image_url text,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  youtube_url text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table blogs enable row level security;
alter table videos enable row level security;

create policy "public read blogs" on blogs for select using (true);
create policy "public read videos" on videos for select using (true);

create policy "authenticated manage blogs" on blogs for all to authenticated using (true) with check (true);
create policy "authenticated manage videos" on videos for all to authenticated using (true) with check (true);

