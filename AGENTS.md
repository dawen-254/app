# Repository Guidelines

## Project Structure & Module Organization
This is a single-page React 19 product landing page template built with Vite and GSAP for cinematic animations. The architecture is configuration-driven to allow content updates without modifying component logic.

- **`src/config.ts`**: The single source of truth for all site content. Edit this file to customize navigation, hero sections, product showcases, and branding.
- **`src/sections/`**: Contains top-level page sections (Hero, ProductShowcase, ColorPalette, Finale, Footer). Components are designed to return `null` if their corresponding config is empty.
- **`src/components/`**: Houses global components like `Navigation` and `CustomCursor`, plus `ui/` for shadcn/ui primitives.
- **`src/lib/utils.ts`**: Standard Tailwind merge utility (`cn`).
- **`public/images/`**: All visual assets should be placed here and referenced by path in `config.ts`.

## Build, Test, and Development Commands
- **Install dependencies**: `npm install`
- **Start development server**: `npm run dev`
- **Production build**: `npm run build`
- **Linting**: `npm run lint`

## Coding Style & Naming Conventions
- **Frameworks**: React 19 with functional components and TypeScript.
- **Styling**: Tailwind CSS 3. Custom themes and accent colors (default pink `#ff73c3`) are defined in `tailwind.config.js` and `src/index.css`.
- **Animations**: GSAP 3 with ScrollTrigger. Avoid adding CSS animations for scroll-linked effects; use GSAP within the components.
- **Linting**: ESLint 9 with `typescript-eslint` and React Hooks plugins.

## Testing Guidelines
No formal test suite is currently configured. Manual verification of animations and responsive design is required.

## Commit & Pull Request Guidelines
Commit messages should be concise and descriptive of the change (e.g., "UX-Fix", "Update hero config").

## Agent Instructions
- **Primary Task**: Focus on editing `src/config.ts` for content changes.
- **Avoid Over-Engineering**: Do not modify files in `src/sections/` or `src/components/` unless fixing a bug or specifically asked to change the underlying design/animation logic.
- **Image Handling**: Ensure new images are placed in `public/images/` and follow the size recommendations in `info.md`.
- **Conditional Rendering**: Respect the pattern where sections hide if their config is empty.
