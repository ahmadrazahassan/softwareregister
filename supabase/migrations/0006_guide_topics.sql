-- 0006: a third topic for guides.
--
-- Guides were either Pricing or Compliance. The buying guides (how to choose
-- accounting software, what to test in a trial, moving off Pastel, load
-- shedding) are neither, so they get their own topic. The check also keeps
-- Method, which the first schema allowed and nothing uses yet.

alter table public.briefings drop constraint if exists briefings_topic_check;
alter table public.briefings
  add constraint briefings_topic_check check (topic in ('Pricing', 'Buying', 'Compliance', 'Method'));
