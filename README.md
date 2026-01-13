# Moondrae – Minimalist PDF Reader built with Next.js  

![Next.js](https://img.shields.io/badge/Next.js-16.0.5-black?logo=nextdotjs) ![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript) ![Zustand](https://img.shields.io/badge/Zustand-5.0.8-green) ![License](https://img.shields.io/badge/License-MIT-lightgrey)  

[Demo (Vercel)](https://moondrae.vercel.app) • [Report an Issue](https://github.com/xevrion/moondrae/issues) • [Pull Requests](https://github.com/xevrion/moondrae/pulls)

---

## Overview  

**Moondrae** is a lightweight, dark‑mode aware PDF reader built with **Next.js 16**, **React 19**, **Tailwind CSS**, and **Zustand** for state management. It showcases a clean UI, smooth page navigation, and a fully client‑side rendering pipeline powered by **pdfjs‑dist**.  

- **Fast** – Leverages Next.js' server‑side rendering for the shell and client‑side PDF rendering for instant page turns.  
- **Theme‑aware** – One‑click toggle between light and dark themes, persisted across sessions.  
- **Extensible** – Core rendering logic lives under `lib/renderers/pdf`, making it easy to add annotations, search, or custom UI controls.  

Target audience: developers who need a starter template for building PDF‑centric web applications or anyone looking for a simple, production‑ready PDF viewer.

Current version: **0.1.0** (development)

---

## Features  

| Feature | Description | Status |
|---------|-------------|--------|
| 📄 PDF rendering | Uses `pdfjs-dist` to decode and display PDF pages in a canvas. | ✅ Stable |
| ⏭️ Page navigation | Next / previous page helpers with progress tracking. | ✅ Stable |
| 🎚️ Slider control | Radix UI slider for quick jump to any page. | ✅ Stable |
| 🌗 Dark‑mode toggle | Persistent theme switch via Zustand store. | ✅ Stable |
| 📚 State management | Global reader state (page, progress, theme) with Zustand. | ✅ Stable |
| 📱 Responsive layout | Tailwind‑CSS powered layout works on desktop & mobile. | ✅ Stable |
| 🖼️ Customizable UI | Icons from `lucide-react`, easy to replace with your own components. | ✅ Stable |
| 🧩 Extensible renderer | `lib/renderers/pdf` folder ready for custom render pipelines. | 🚧 In progress |

---

## Tech Stack  

| Category | Technology | Reason |
|----------|------------|--------|
| Framework | **Next.js 16** (App Router) | File‑system routing, fast builds, built‑in image optimization |
| Language | **TypeScript 5** | Type safety across the whole stack |
| UI | **Tailwind CSS 4**, **Radix UI Slider**, **lucide-react** | Utility‑first styling, accessible components, lightweight icons |
| State | **Zustand 5** | Minimalist global store, no boilerplate |
| PDF Engine | **pdfjs-dist 5** | Industry‑standard PDF parsing/rendering in the browser |
| Linting | **ESLint 9** (Next.js config) | Consistent code quality |
| Build | **pnpm** (lockfile) | Fast, deterministic installs |

---

## Architecture  

```
moondrae/
├─ app/                     # Next.js App Router
│  ├─ layout.tsx           # Root layout (fonts, global styles)
│  ├─ page.tsx             # Landing page (placeholder)
│  └─ reader/              # PDF reader UI
│     ├─ ReaderShell.tsx   # Layout + theme toggle + nav bar
│     ├─ ReaderControls.tsx   # (future) controls & slider
│     ├─ ReaderViewport.tsx   # Canvas where PDF pages are drawn
│     └─ page.tsx          # Page that composes the reader
├─ lib/
│  ├─ renderers/
│  │   └─ pdf/             # Core pdfjs‑dist rendering logic
│  └─ store/
│      └─ useReaderStore.ts   # Zustand store (page, theme, progress)
├─ public/                  # Static assets (icons, test.pdf, pdf worker)
├─ styles/ (globals.css)   # Tailwind base + custom colors
├─ next.config.ts           # Next.js config (e.g., asset prefix)
└─ package.json
```

- **Root Layout** (`app/layout.tsx`) injects Google fonts and sets up the HTML skeleton.  
- **ReaderShell** provides a fixed navigation bar, theme toggle, and slots for the main viewport.  
- **Zustand Store** (`useReaderStore`) holds the current page, total pages, progress percentage, and dark‑mode flag.  
- **PDF Rendering** lives under `lib/renderers/pdf`; the worker (`public/pdf.worker.mjs`) is loaded automatically by `pdfjs-dist`.  

---

## Getting Started  

### Prerequisites  

| Tool | Minimum version |
|------|-----------------|
| **Node.js** | 20.x |
| **pnpm** | 8.x (or npm/yarn – adjust scripts accordingly) |
| **Git** | any recent version |

### Installation  

```bash
# Clone the repository
git clone https://github.com/xevrion/moondrae.git
cd moondrae

# Install dependencies (pnpm recommended)
pnpm install
```

### Development Server  

```bash
# Run the app in development mode
pnpm dev
```

Open <http://localhost:3000> in your browser. The reader UI is available at `/reader` (once the page component is added).

### Build for Production  

```bash
pnpm build   # Generates an optimized production build
pnpm start   # Starts the production server
```

### Linting  

```bash
pnpm lint
```

---

## Configuration  

The app uses environment‑agnostic defaults; however you can customise the following variables via a `.env.local` file at the project root:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_PDF_URL` | URL of the PDF to load on startup (used by the reader page) | `/test.pdf` (bundled in `public/`) |
| `NEXT_PUBLIC_THEME` | Initial theme (`light` or `dark`) | `light` |

Example `.env.local`:

```dotenv
NEXT_PUBLIC_PDF_URL=/my‑book.pdf
NEXT_PUBLIC_THEME=dark
```

---

## Usage  

### Basic PDF Viewer  

```tsx
// app/reader/page.tsx
import { ReaderShell } from "./ReaderShell";
import { ReaderViewport } from "./ReaderViewport";

export default function ReaderPage() {
  return (
    <ReaderShell>
      <ReaderViewport pdfUrl={process.env.NEXT_PUBLIC_PDF_URL!} />
    </ReaderShell>
  );
}
```

### Navigating Pages  

```tsx
import { useReaderStore } from "@/lib/store/useReaderStore";

function NavigationButtons() {
  const { currentPage, totalPages, nextPage, prevPage } = useReaderStore();

  return (
    <div className="flex items-center gap-4">
      <button onClick={prevPage} disabled={currentPage === 1}>
        Prev
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}
```

### Theme Toggle  

The theme toggle button lives in `ReaderShell`. It updates the `isDark` flag in the store and adds/removes the `dark` class on `<html>` – Tailwind’s dark mode utilities react automatically.

```tsx
import { useReaderStore } from "@/lib/store/useReaderStore";

function ThemeToggle() {
  const { isDark, toggleTheme } = useReaderStore();
  return (
    <button onClick={toggleTheme}>
      {isDark ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}
```

### Progress Bar (Radix Slider)  

```tsx
import * as Slider from "@radix-ui/react-slider";
import { useReaderStore } from "@/lib/store/useReaderStore";

function PageSlider() {
  const { currentPage, totalPages, setCurrentPage } = useReaderStore();

  return (
    <Slider.Root
      min={1}
      max={totalPages}
      value={[currentPage]}
      onValueChange={([value]) => setCurrentPage(value)}
      className="relative flex h-5 w-full items-center"
    >
      <Slider.Track className="relative h-1 flex-1 bg-gray-200 dark:bg-gray-700">
        <Slider.Range className="absolute h-full bg-indigo-600" />
      </Slider.Track>
      <Slider.Thumb className="block h-4 w-4 rounded-full bg-indigo-600" />
    </Slider.Root>
  );
}
```

---

## Development  

### Setting Up the Local Environment  

1. **Clone & install** (see *Installation* above).  
2. **Run the dev server** (`pnpm dev`).  
3. Open the reader page (`http://localhost:3000/reader`).  

### Testing  

The repository currently does **not** include automated tests. We recommend adding Jest + React Testing Library for component unit tests and Cypress for end‑to‑end PDF navigation scenarios.

### Code Style  

- **ESLint** (Next.js preset) is enforced via `pnpm lint`.  
- **Prettier** is not explicitly configured; you may add it if desired.  

### Debugging Tips  

- The Zustand store is globally accessible; you can inspect its state via the React DevTools → **Zustand** tab.  
- PDF rendering errors appear in the browser console; ensure the PDF worker (`public/pdf.worker.mjs`) is correctly referenced (default `pdfjs-dist` configuration works out‑of‑the‑box).  

---

## Deployment  

### Vercel (recommended)  

1. Push the repository to GitHub.  
2. Import the project in Vercel – it automatically detects a Next.js app.  
3. Set any required environment variables (`NEXT_PUBLIC_PDF_URL`, `NEXT_PUBLIC_THEME`).  

### Docker (optional)  

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile && pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.mjs ./
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]
```

```bash
docker build -t moondrae .
docker run -p 3000:3000 moondrae
```

### Performance Considerations  

- **Lazy‑load PDFs**: Load only the first few pages initially; fetch subsequent pages on demand.  
- **Cache PDF data**: Store the fetched `Uint8Array` in a client‑side cache (e.g., IndexedDB) for faster subsequent loads.  

---

## Contributing  

We welcome contributions! Follow these steps:

1. **Fork** the repository.  
2. **Create a feature branch**: `git checkout -b feat/your-feature`.  
3. **Install dependencies** (`pnpm install`).  
4. **Make your changes** – ensure they adhere to the existing code style.  
5. **Run lint** (`pnpm lint`) and fix any warnings.  
6. **Commit** with a clear message.  
7. **Push** to your fork and open a **Pull Request** against `main`.  

### Development Workflow  

- **Feature branches** should be short‑lived and focused.  
- **Pull requests** must pass linting and include a description of the change.  
- **Code reviews** will focus on readability, performance, and adherence to the project’s architecture.  

### Local Testing  

If you add new components or utilities, please include unit tests (Jest) and, where applicable, end‑to‑end tests (Cypress).  

---

## License & Credits  

**License:** MIT © 2024 xevrion  

### Credits  

- **Next.js** – React framework for production.  
- **pdfjs-dist** – Mozilla PDF rendering library.  
- **Zustand** – Simple state management.  
- **Radix UI** – Accessible UI primitives.  
- **Lucide React** – Open‑source icon set.  
- **Tailwind CSS** – Utility‑first CSS framework.  

Special thanks to the open‑source community for the libraries that make this project possible.  

---  

*Happy reading!*  