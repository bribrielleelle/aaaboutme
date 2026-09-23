# Project overview

This is a React 19 and TypeScript portfolio site built with Vite and Tailwind CSS.

## Running on Replit

- The `Start application` workflow runs `npm run dev`.
- Replit web previews require port `5000`. Do not change the Replit workflow or `.replit` port mapping away from `5000`.
- Vite uses the platform-provided `PORT` environment variable when one exists and defaults to `5000` otherwise. This allows other platforms, including Google AI Studio, to supply their required preview port without code changes.
- Do not hardcode a platform-specific port in `package.json` or pass a `--port` flag in a workflow. Keep port selection centralized in `vite.config.ts`.
- Vite listens on `0.0.0.0`, uses strict port binding, and accepts proxied preview hosts.
- Run `npm run build` to create a production build.
- Run `npm run lint` to type-check the project without emitting files.

No external services or application secrets are currently required.