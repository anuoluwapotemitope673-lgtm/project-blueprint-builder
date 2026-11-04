<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Contact details live only in src/lib/site-config.ts; components read from it so details change in one place.
- Portfolio uses a single canonical published inventory in src/data/portfolio.ts, derived from independently authored briefs in src/data/portfolio-briefs.ts; replace concepts rather than appending when adding verified work so the global count stays governed by the inventory tests.
- Contact form inserts into the contact_inquiries table (insert-only for visitors) — no read access from the browser.
- Portfolio imagery is mapped by canonical project slug in src/data/portfolio-images.ts and rendered by ProjectImage for cards and dialogs; each project owns a separate original asset, with content-hash and perceptual audits rejecting duplicates.
- Interns use public active-only server reads and role-checked administration with RLS; private portrait uploads use expiring signed URLs so inactive profiles have no public read path.
- Authenticated administration lives under the pathless authenticated layout; account lifecycle triggers assign privileges only from verified account email, never editable profile metadata.
