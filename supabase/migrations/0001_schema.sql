-- Software Register schema.
-- Column names match lib/types.ts one to one, so a row read from Supabase is
-- already a `Software` and needs no mapping.

create extension if not exists pgcrypto;

create table public.sectors (
  slug        text primary key,
  name        text not null,
  label       text not null,
  description text not null,
  sort        integer not null default 0
);

create table public.software (
  id               text primary key,
  slug             text not null unique,
  name             text not null,
  vendor           text not null,
  sector           text not null references public.sectors (slug) on update cascade,
  summary          text not null default '',
  website_url      text,
  vendor_website   text,
  affiliate_url    text,
  founded          integer check (founded between 1800 and 2100),
  rating           numeric(2, 1) not null check (rating between 0 and 5),
  review_count     integer not null default 0 check (review_count >= 0),
  -- null is Quoted. 0 is Free. They are different facts.
  starting_price   numeric(12, 2) check (starting_price >= 0),
  price_currency   text check (price_currency in ('ZAR', 'USD', 'GBP', 'EUR')),
  price_basis      text check (price_basis in ('mo', 'mo_incl_vat', 'mo_excl_vat', 'employee_mo', 'user_mo')),
  -- null renders as Unchecked and is never treated as fresh. A quote only product can be
  -- checked too: the date then means we confirmed on that day that it still publishes no price.
  price_checked_at date,
  pricing_plans    jsonb not null default '[]'::jsonb,
  pricing_note     text,
  free_trial       boolean,
  free_plan        boolean,
  demo             boolean,
  -- null means not yet checked. An array, even an empty one, means it was checked.
  compliance       text[],
  bank_feeds       text[],
  features         text[] not null default '{}',
  integrations     text[] not null default '{}',
  subratings       jsonb,
  assessment       text,
  logo             text,
  screenshots      text[] not null default '{}',
  status           text not null default 'active' check (status in ('active', 'withdrawn')),
  updated_at       timestamptz not null default now()
);

create index software_sector_idx on public.software (sector);
create index software_checked_idx on public.software (price_checked_at);

create table public.comparisons (
  slug      text primary key,
  a         text not null references public.software (slug) on update cascade on delete cascade,
  b         text not null references public.software (slug) on update cascade on delete cascade,
  published boolean not null default true,
  constraint comparisons_distinct check (a <> b),
  constraint comparisons_slug_matches check (slug = a || '-vs-' || b)
);

create table public.briefings (
  slug         text primary key,
  title        text not null,
  standfirst   text not null,
  topic        text not null check (topic in ('Pricing', 'Compliance', 'Method')),
  author       text not null,
  published_at date not null,
  read_minutes integer not null check (read_minutes > 0),
  body         jsonb not null default '[]'::jsonb,
  product_slugs text[] not null default '{}',
  published    boolean not null default true
);

create table public.reviews (
  id                uuid primary key default gen_random_uuid(),
  software_slug     text not null references public.software (slug) on update cascade on delete cascade,
  rating            smallint not null check (rating between 1 and 5),
  sub_ease          smallint check (sub_ease between 1 and 5),
  sub_value         smallint check (sub_value between 1 and 5),
  sub_support       smallint check (sub_support between 1 and 5),
  sub_functionality smallint check (sub_functionality between 1 and 5),
  title             text not null check (char_length(title) between 4 and 140),
  body              text not null check (char_length(body) between 30 and 4000),
  author_name       text not null check (char_length(author_name) between 2 and 100),
  author_role       text check (char_length(author_role) <= 100),
  company_size      text,
  industry          text,
  helpful           integer not null default 0 check (helpful >= 0),
  status            text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  -- POPIA: a salted hash, never a raw address.
  ip_hash           text,
  created_at        timestamptz not null default now()
);

create index reviews_software_status_idx on public.reviews (software_slug, status);

create table public.enquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 2 and 120),
  email      text not null check (char_length(email) <= 254),
  subject    text not null,
  message    text not null check (char_length(message) between 10 and 4000),
  handled    boolean not null default false,
  ip_hash    text,
  created_at timestamptz not null default now()
);

create table public.dispatch_subscribers (
  id              uuid primary key default gen_random_uuid(),
  email           text not null check (char_length(email) <= 254),
  interests       text[] not null default '{}',
  status          text not null default 'pending' check (status in ('pending', 'confirmed', 'unsubscribed')),
  token           text not null unique,
  consented_at    timestamptz not null default now(),
  confirmed_at    timestamptz,
  unsubscribed_at timestamptz,
  ip_hash         text,
  created_at      timestamptz not null default now()
);

create unique index dispatch_subscribers_email_idx on public.dispatch_subscribers (lower(email));

create table public.affiliate_clicks (
  id            bigint generated always as identity primary key,
  software_slug text not null,
  placement     text not null,
  host          text,
  affiliate     boolean not null default false,
  ip_hash       text,
  created_at    timestamptz not null default now()
);

create index affiliate_clicks_created_idx on public.affiliate_clicks (created_at desc);

-- Keep updated_at honest.
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger software_touch before update on public.software
  for each row execute function public.touch_updated_at();
