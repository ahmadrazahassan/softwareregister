-- Row level security. Every table is locked by default and opened one policy at a time.
--
-- Roles:
--   anon           readers. Can read published content and approved reviews, and
--                  can submit a review, an enquiry, a subscription or a click.
--   authenticated  signed in users. Only those with app_metadata.role = 'admin'
--                  get any extra access, and app_metadata can only be written
--                  with the service role key, so a user cannot grant it to
--                  themselves.
--   service_role   bypasses RLS. Used by scripts and server only handlers.

create or replace function public.is_admin() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
$$;

alter table public.sectors              enable row level security;
alter table public.software             enable row level security;
alter table public.comparisons          enable row level security;
alter table public.briefings            enable row level security;
alter table public.reviews              enable row level security;
alter table public.enquiries            enable row level security;
alter table public.dispatch_subscribers enable row level security;
alter table public.affiliate_clicks     enable row level security;

-- Public content --------------------------------------------------------------

create policy sectors_read on public.sectors for select using (true);
create policy sectors_admin on public.sectors for all using (public.is_admin()) with check (public.is_admin());

create policy software_read on public.software for select using (status = 'active' or public.is_admin());
create policy software_admin on public.software for all using (public.is_admin()) with check (public.is_admin());

create policy comparisons_read on public.comparisons for select using (published or public.is_admin());
create policy comparisons_admin on public.comparisons for all using (public.is_admin()) with check (public.is_admin());

create policy briefings_read on public.briefings for select using (published or public.is_admin());
create policy briefings_admin on public.briefings for all using (public.is_admin()) with check (public.is_admin());

-- Reviews: readers see approved rows, and can only ever insert a pending one ----

create policy reviews_read on public.reviews for select using (status = 'approved' or public.is_admin());
create policy reviews_submit on public.reviews for insert to anon, authenticated
  with check (status = 'pending' and helpful = 0);
create policy reviews_admin on public.reviews for update using (public.is_admin()) with check (public.is_admin());
create policy reviews_admin_delete on public.reviews for delete using (public.is_admin());

-- A reader must never be able to read back the connection hash on an approved review.
revoke select on public.reviews from anon;
grant select (id, software_slug, rating, sub_ease, sub_value, sub_support, sub_functionality,
              title, body, author_name, author_role, company_size, industry, helpful, status, created_at)
  on public.reviews to anon;

-- Visitor submissions: write only, never readable by readers ------------------

create policy enquiries_submit on public.enquiries for insert to anon, authenticated with check (handled = false);
create policy enquiries_admin on public.enquiries for all using (public.is_admin()) with check (public.is_admin());

create policy subscribers_submit on public.dispatch_subscribers for insert to anon, authenticated
  with check (status in ('pending', 'confirmed') and unsubscribed_at is null);
create policy subscribers_admin on public.dispatch_subscribers for all using (public.is_admin()) with check (public.is_admin());

create policy clicks_submit on public.affiliate_clicks for insert to anon, authenticated with check (true);
create policy clicks_admin on public.affiliate_clicks for select using (public.is_admin());
