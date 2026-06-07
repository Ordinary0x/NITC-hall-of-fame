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
        <div className="min-h-screen">
          <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
              <a href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-maroon-600 text-maroon-100">
                  <span aria-hidden="true" className="text-sm">
                    ★
                  </span>
                </div>
                <div>
                  <p className="font-[var(--font-display)] text-lg font-semibold tracking-wide text-[var(--text)]">
                    Hall of Fame
                  </p>
                  <p className="-mt-1 text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
                    NIT Calicut
                  </p>
                </div>
              </a>
              <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <a
                  href="/submit/"
                  className="rounded-lg border border-[var(--border)] px-3 py-1.5 transition hover:border-maroon-500/40 hover:text-[var(--text)]"
                >
                  Submit Guide
                </a>
                <a
                  href="https://github.com/simonMat21/NITC-hall-of-fame"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden rounded-lg border border-[var(--border)] px-3 py-1.5 transition hover:border-maroon-500/40 hover:text-[var(--text)] sm:inline-block"
                >
                  GitHub
                </a>
              </nav>
            </div>
          </header>
          <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="border-t border-[var(--border)]">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-[var(--muted)] sm:px-6 lg:px-8">
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
