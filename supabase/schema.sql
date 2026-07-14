-- ─────────────────────────────────────────────────────────────
-- Run this once in your Supabase project's SQL Editor
-- (Dashboard → SQL Editor → New query → paste all of this → Run)
--
-- Safe to re-run: every statement uses "if not exists" / "on conflict
-- do nothing", so running this again (e.g. after pulling an update)
-- won't duplicate data or error on tables you already have.
-- ─────────────────────────────────────────────────────────────

-- ═════════════════════════════════════════════════════════════
-- SINGLETON SECTIONS (one row each, id fixed to 1)
-- ═════════════════════════════════════════════════════════════

-- HERO SECTION
create table if not exists hero (
  id int primary key default 1,
  name text,
  certificate_name text,
  initials text,
  tagline text,
  roles text, -- comma-separated; split on the frontend
  photo_url text,
  reader_card_no text,
  programme text,
  institution text,
  status text,
  constraint hero_single_row check (id = 1)
);
insert into hero (id, name, certificate_name, initials, tagline, roles, photo_url, reader_card_no, programme, institution, status)
values (1, 'Ruman Jamadder Rabby', 'Md. Ruman', 'RJ',
  'Organizing knowledge for the people who need it.',
  'Documentation & Archiving Specialist,Digital Library Researcher,Information Specialist,Archival Systems Enthusiast',
  '', '2025.219', 'MA ISLM', 'University of Dhaka', 'Active')
on conflict (id) do nothing;

-- ABOUT ME
create table if not exists about (
  id int primary key default 1,
  paragraph_1 text,
  paragraph_2 text,
  based_in text,
  focus text,
  degree_status text,
  languages text,
  constraint about_single_row check (id = 1)
);
insert into about (id, paragraph_1, paragraph_2, based_in, focus, degree_status, languages)
values (1,
  'I''m Ruman Jamadder Rabby, a final-semester Master''s student in the Department of Information Science and Library Management at the University of Dhaka, building on the honours degree I completed in the same department in October 2025. My work moves between the reading room and the archive — I''ve spent the past year documenting and archiving materials for the July Massacre Archive, interned with BANSDOC on a government-funded documentation project, and served as a Library Assistant at the Central Library of the University of Dhaka.',
  'Outside coursework, I lead IT and archival operations at PIPRA — the Investigative Political Research Association — where I look after data systems and records for political research projects. I started down this path early, as a College Ambassador for Silswa during my HSC years, and it''s shaped how I think about libraries now: not just as places that store information, but as infrastructure that keeps memory, evidence, and public knowledge intact and accessible.',
  'Dhaka, Bangladesh', 'Archives & Documentation', 'MA ISLM, final semester', 'Bengali, English + 2')
on conflict (id) do nothing;

-- CONTACT INFORMATION (already existed if you ran the earlier schema — untouched)
create table if not exists contact (
  id int primary key default 1,
  heading text default 'Get in touch',
  blurb text,
  email text,
  phone text,
  location text,
  linkedin text,
  github text,
  scholar text,
  constraint contact_single_row check (id = 1)
);
insert into contact (id, heading, blurb, email, phone, location, linkedin, github, scholar)
values (1, 'Get in touch',
  'Open to research collaborations, archival and documentation work, and conversations about digital libraries in South Asia. I usually reply within a couple of days.',
  'ruman.rabby@example.com', '+880 1XXX-XXXXXX', 'Dhaka, Bangladesh',
  'https://linkedin.com/in/ruman-rabby', 'https://github.com/ruman-rabby',
  'https://scholar.google.com/citations?user=xxxxxx')
on conflict (id) do nothing;

-- WEBSITE SETTINGS + RESUME/CV + FOOTER
-- (grouped in one small settings row — each is just a couple of fields
-- with no repeating entries, so a single config table is cleaner than
-- three near-empty tables. Still edited from three separate admin tabs.)
create table if not exists site_settings (
  id int primary key default 1,
  site_title text,
  meta_description text,
  resume_url text,
  footer_tagline text,
  footer_note text default 'Built with React · Tailwind CSS',
  constraint site_settings_single_row check (id = 1)
);
insert into site_settings (id, site_title, meta_description, resume_url, footer_tagline, footer_note)
values (1, 'Ruman Jamadder Rabby — Information Science & Library Management',
  'Portfolio of Ruman Jamadder Rabby, Master''s researcher in Information Science and Library Management, University of Dhaka.',
  '', 'Catalogued and maintained by hand.', 'Built with React · Tailwind CSS')
on conflict (id) do nothing;

-- ═════════════════════════════════════════════════════════════
-- REPEATING SECTIONS (many rows each)
-- ═════════════════════════════════════════════════════════════

-- EDUCATION TIMELINE
create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  degree text not null,
  institution text,
  faculty text,
  dorm text,
  period text,
  code text,
  status text,
  highlight boolean default false,
  details text,
  result text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- SKILLS (grouped catalogue cards)
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  group_name text not null,
  code text,
  items text, -- comma-separated; split on the frontend
  sort_order int default 0,
  created_at timestamptz default now()
);

-- PROJECTS (already existed if you ran the earlier schema — untouched)
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  code text,
  title text not null,
  period text,
  summary text,
  tags text,
  link text,
  link_label text default 'View',
  created_at timestamptz default now()
);

-- EXPERIENCE
create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  org text,
  period text,
  location text,
  code text,
  points text, -- one bullet per line; split on the frontend
  sort_order int default 0,
  created_at timestamptz default now()
);

-- RESEARCH INTERESTS (already existed if you ran the earlier schema — untouched)
create table if not exists research_interests (
  id uuid primary key default gen_random_uuid(),
  code text,
  title text not null,
  description text,
  created_at timestamptz default now()
);

-- GALLERY (already existed if you ran the earlier schema — adds sort_order)
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  src text not null,
  caption text,
  category text default 'Uncategorized',
  sort_order int default 0,
  created_at timestamptz default now()
);
alter table gallery add column if not exists sort_order int default 0;

-- CERTIFICATIONS
-- Note: there's no "Certifications" section on the public site today.
-- This table + its admin tab exist so you can manage the data, but
-- nothing changes visually until a display section is added — ask if
-- you'd like one.
create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  date text,
  credential_url text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- SOCIAL LINKS (drives the icon row in the Contact section)
create table if not exists social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null, -- one of: linkedin, github, scholar, twitter, orcid, researchgate, website
  url text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);
insert into social_links (platform, url, sort_order)
select 'linkedin', 'https://linkedin.com/in/ruman-rabby', 1
where not exists (select 1 from social_links);
insert into social_links (platform, url, sort_order)
select 'github', 'https://github.com/ruman-rabby', 2
where not exists (select 1 from social_links where platform = 'github');
insert into social_links (platform, url, sort_order)
select 'scholar', 'https://scholar.google.com/citations?user=xxxxxx', 3
where not exists (select 1 from social_links where platform = 'scholar');

-- BLOG POSTS (already existed if you ran the earlier schema — untouched)
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  category text default 'Notes',
  accent text default 'brass',
  date date default current_date,
  created_at timestamptz default now()
);

-- ═════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY: everyone can read, only logged-in admins can write
-- ═════════════════════════════════════════════════════════════
do $$
declare
  t text;
begin
  foreach t in array array[
    'hero','about','contact','site_settings','education','skills',
    'projects','experience','research_interests','gallery',
    'certifications','social_links','blog_posts'
  ]
  loop
    execute format('alter table %I enable row level security;', t);

    if not exists (
      select 1 from pg_policies where tablename = t and policyname = 'Public can read ' || t
    ) then
      execute format('create policy %I on %I for select using (true);', 'Public can read ' || t, t);
    end if;

    if not exists (
      select 1 from pg_policies where tablename = t and policyname = 'Authenticated users can write ' || t
    ) then
      execute format(
        'create policy %I on %I for all using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'');',
        'Authenticated users can write ' || t, t
      );
    end if;
  end loop;
end $$;

-- ═════════════════════════════════════════════════════════════
-- STORAGE: public buckets for uploaded files
-- ═════════════════════════════════════════════════════════════

-- gallery-photos: gallery images (already existed if you ran the earlier schema)
insert into storage.buckets (id, name, public)
values ('gallery-photos', 'gallery-photos', true)
on conflict (id) do nothing;

-- site-media: hero photo, certification images, and the résumé/CV PDF
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

do $$
declare
  b text;
begin
  foreach b in array array['gallery-photos', 'site-media']
  loop
    if not exists (
      select 1 from pg_policies where tablename = 'objects' and policyname = 'Public can view ' || b
    ) then
      execute format('create policy %I on storage.objects for select using (bucket_id = %L);', 'Public can view ' || b, b);
    end if;
    if not exists (
      select 1 from pg_policies where tablename = 'objects' and policyname = 'Authenticated can upload ' || b
    ) then
      execute format(
        'create policy %I on storage.objects for insert with check (bucket_id = %L and auth.role() = ''authenticated'');',
        'Authenticated can upload ' || b, b
      );
    end if;
    if not exists (
      select 1 from pg_policies where tablename = 'objects' and policyname = 'Authenticated can delete ' || b
    ) then
      execute format(
        'create policy %I on storage.objects for delete using (bucket_id = %L and auth.role() = ''authenticated'');',
        'Authenticated can delete ' || b, b
      );
    end if;
  end loop;
end $$;
