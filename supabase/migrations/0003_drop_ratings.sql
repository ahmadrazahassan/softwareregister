-- 0003: remove ratings and review counts from the software table.
--
-- On 2026-10-11 every rating, review count and sub rating was taken off the
-- site, and the register is no longer ordered by a score. The per product rating
-- and review_count columns, and the sub ratings blob, held that data. Dropping
-- them keeps the table honest and lets the seed script write a product row
-- without them.
--
-- The reviews table is untouched: readers can still write a review of any
-- product, and an editor still approves it before it appears.

alter table public.software drop column if exists rating;
alter table public.software drop column if exists review_count;
alter table public.software drop column if exists subratings;
