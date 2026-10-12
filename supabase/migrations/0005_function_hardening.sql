-- 0005: pin the search path of our two helper functions, and close a platform helper.
--
-- Supabase's linter warns when a function has a role mutable search_path, because
-- a signed in user could put a schema of their own first and change what the
-- function calls. Both helpers use only built in functions and fully named
-- ones (auth.jwt, now), so an empty search path costs nothing.

alter function public.is_admin() set search_path = '';
alter function public.touch_updated_at() set search_path = '';

-- Supabase adds an event trigger function, rls_auto_enable, to switch row level
-- security on for every new table. It is for the database itself, so readers and
-- signed in users have no reason to call it through the API. Present on projects
-- created by the platform, so this only runs where it exists.
do $$
begin
  if exists (
    select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'rls_auto_enable'
  ) then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end
$$;
