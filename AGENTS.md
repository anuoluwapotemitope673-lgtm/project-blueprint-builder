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
- Portfolio entries are generated from typed data in src/data/portfolio.ts; real client work goes in REAL_PROJECTS with authenticity "client", because concept work must never be presented as client work.
- Contact form inserts into the contact_inquiries table (insert-only for visitors) — no read access from the browser.
