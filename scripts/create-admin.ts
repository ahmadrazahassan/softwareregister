/**
 * Creates (or promotes) the admin user.
 *
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a long passphrase' npm run create-admin
 *
 * or set both in .env.local. The role lives in app_metadata, which can only be
 * written with the service role key, so no signed in user can grant it to
 * themselves. The admin area checks it on the server for every request.
 */
import { serviceClientOrExit } from "./_client";

async function main() {
  const sb = serviceClientOrExit();
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD.");
    process.exit(1);
  }
  if (password.length < 12) {
    console.error("Use a password of at least 12 characters.");
    process.exit(1);
  }

  const created = await sb.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role: "admin" },
  });

  if (!created.error) {
    console.log(`Created admin ${email}.`);
    return;
  }

  // Already exists: promote it and reset the password.
  const list = await sb.auth.admin.listUsers({ perPage: 1000 });
  const existing = list.data?.users.find((u) => u.email?.toLowerCase() === email);
  if (!existing) {
    console.error(`Could not create or find ${email}: ${created.error.message}`);
    process.exit(1);
  }
  const updated = await sb.auth.admin.updateUserById(existing.id, { password, app_metadata: { ...existing.app_metadata, role: "admin" } });
  if (updated.error) {
    console.error(updated.error.message);
    process.exit(1);
  }
  console.log(`Promoted ${email} to admin and reset the password.`);
}

main();
