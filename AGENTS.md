# AGENTS.md

## Communication

- The user does not know coding or computer science terms.
- Explain everything in very simple, plain language.
- Avoid jargon when possible.
- If a technical term is necessary, define it in one short sentence.
- When describing a fix, focus on what changed, why it mattered, and what the user should expect now.

## Running This App

- This project uses Bun and Vite.
- Use `bun dev` from the project root: `/Users/mrinaljadhav/Documents/Portfolio /mrinal`.
- If the sandbox makes Vite think every port is busy, rerun `bun dev` with escalated permissions instead of assuming the app is broken.
- The intended local dev URL is usually `http://localhost:3003/`.
- After starting the dev server, verify important routes such as `/` and `/in-the-loop`.
- Before finishing app-run fixes, also run `bun run build` to catch production-only problems.

## Project-Specific Gotcha

- This project used to live in a folder with an apostrophe in the name.
- That old folder name could break TanStack route code-splitting by generating bad import paths.
- The project is now outside that folder, so this path issue should no longer affect local runs.
- The `vite.config.ts` workaround can stay for safety unless someone later confirms it is no longer needed.
