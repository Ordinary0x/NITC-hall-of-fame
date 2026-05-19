import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
} from "next/font/google";
import "highlight.js/styles/github-dark.css";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "NITC Hall of Fame",
    template: "%s | NITC Hall of Fame",
  },
  description: "A static showcase of student projects from NIT Calicut.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="font-[var(--font-body)] text-[var(--text)] antialiased">
        <div className="relative isolate min-h-screen overflow-hidden">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-black/35 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <a
                href="/"
                className="group flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-white/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-maroon-300/30 bg-maroon-500/20 text-maroon-100 shadow-glow">
                  <span aria-hidden="true" className="text-lg">
                    ★
                  </span>
                </div>
                <div>
                  <p className="font-[var(--font-display)] text-xl font-semibold tracking-wide text-[var(--text)]">
                    Hall of Fame
                  </p>
                  <p className="-mt-1 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    NIT Calicut
                  </p>
                </div>
              </a>
              <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <a
                  href="/submit/"
                  className="rounded-full border border-white/10 px-4 py-2 transition hover:border-maroon-300/40 hover:bg-maroon-500/15 hover:text-[var(--text)]"
                >
                  Submit Guide
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden rounded-full border border-white/10 px-4 py-2 transition hover:border-maroon-300/40 hover:bg-maroon-500/15 hover:text-[var(--text)] sm:inline-flex"
                >
                  GitHub
                </a>
              </nav>
            </div>
          </header>
          <main className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="border-t border-white/10 bg-black/20">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-[var(--muted)] sm:px-6 lg:px-8">
              <p>
                Built as a static showcase for student projects at NIT Calicut.
              </p>
              <p>
                Data is refreshed at build time from GitHub metadata and
                repository files.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
