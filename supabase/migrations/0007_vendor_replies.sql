-- 0007: a vendor's reply to a reader review.
--
-- A vendor cannot change or remove a review. It can ask, through the contact
-- form, for a reply to be shown beneath one. An editor reads the request,
-- checks that it comes from the vendor and that the reply follows the review
-- guidelines, and then saves it here. The reply appears under the review,
-- labelled as the vendor's, with the name of the person who sent it.
--
-- Only an admin can write these columns: the update policy on reviews already
-- limits updates to admins, and the insert policy still forces a new review to
-- arrive pending with helpful at zero. Readers may read them on approved reviews.

alter table public.reviews
  add column if not exists vendor_reply    text check (char_length(vendor_reply) <= 1500),
  add column if not exists vendor_reply_by text check (char_length(vendor_reply_by) <= 120),
  add column if not exists vendor_reply_at timestamptz;

grant select (vendor_reply, vendor_reply_by, vendor_reply_at) on public.reviews to anon;

-- A new review from a reader can never carry a reply. The insert policy checks status and helpful; this one adds the reply.
drop policy if exists reviews_submit on public.reviews;
create policy reviews_submit on public.reviews for insert to anon, authenticated
  with check (status = 'pending' and helpful = 0 and vendor_reply is null and vendor_reply_by is null and vendor_reply_at is null);
