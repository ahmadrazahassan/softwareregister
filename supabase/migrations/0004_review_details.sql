-- 0004: richer reader reviews.
--
-- A review used to be a headline, a body and who wrote it. Readers now also say
-- what the product does well and where it falls short, how long they have used
-- it, which plan they are on, what they use it for, what they used before, which
-- products they also looked at, and why they chose it.
--
-- None of this is a rating. Nothing in these columns is averaged, counted into a
-- score or used to rank a product; it is the reader's own account, shown under
-- their review once an editor has approved it.
--
-- Every column is nullable, so reviews written before this migration stay valid.

alter table public.reviews
  add column if not exists pros                    text check (char_length(pros) <= 600),
  add column if not exists cons                    text check (char_length(cons) <= 600),
  add column if not exists time_used               text check (time_used in ('Free trial only', 'Less than six months', 'Six to twelve months', 'One to two years', 'More than two years')),
  add column if not exists plan_used               text check (char_length(plan_used) <= 80),
  add column if not exists used_for                text check (char_length(used_for) <= 160),
  add column if not exists switched_from           text check (char_length(switched_from) <= 100),
  add column if not exists alternatives_considered text[] check (coalesce(array_length(alternatives_considered, 1), 0) <= 3),
  add column if not exists reasons                 text[] check (coalesce(array_length(reasons, 1), 0) <= 4);

-- Readers may read the new columns of an approved review, and still never the connection hash.
grant select (pros, cons, time_used, plan_used, used_for, switched_from, alternatives_considered, reasons)
  on public.reviews to anon;
