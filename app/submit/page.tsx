import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Your Project",
  description:
    "How to add a student project to the Hall of Fame via pull request.",
};

const exampleEntry = `[
  {
    "project": "https://github.com/your-name/your-repo",
    "author": "https://github.com/your-name",
    "description": "A short description of what the project does."
  }
]`;

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      <section className="glass-panel-strong rounded-[2rem] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-maroon-100/80">
          Submission guide
        </p>
        <h1 className="mt-3 font-[var(--font-display)] text-5xl tracking-[-0.04em] text-[var(--text)]">
          Submit Your Project
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">
          Projects are added by pull request only. Keep your repository
          conventions simple, and the build pipeline will handle the metadata
          refresh automatically.
        </p>
      </section>

      <section className="grid gap-4">
        {[
          "Ensure your repo has a hof/readme.md file with a title (H1) and a description paragraph.",
          "Add a hof/ folder with a thumbnail image named thumbnail.* and any additional project images.",
          "Fork the Hall of Fame repository and branch from main.",
          "Add your entry to projects.json using the copy-paste ready format below, including a short description.",
          "Open a pull request. Once merged, your project appears on the site within 24 hours of the next rebuild.",
        ].map((step, index) => (
          <div key={step} className="glass-panel rounded-[1.5rem] p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-maroon-300/25 bg-maroon-500/15 font-[var(--font-mono)] text-sm text-[var(--text)]">
                {index + 1}
              </div>
              <p className="pt-1 text-sm leading-7 text-[var(--muted)]">
                {step}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="glass-panel rounded-[1.75rem] p-5 sm:p-6">
        <h2 className="font-[var(--font-display)] text-3xl text-[var(--text)]">
          projects.json entry
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Add one object per project. The build script will resolve live GitHub
          metadata from the repository URL and author profile URL, and it will
          use your short description as the project summary.
        </p>
        <pre className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
          <code>{exampleEntry}</code>
        </pre>
      </section>

      <section className="glass-panel rounded-[1.75rem] p-5 sm:p-6">
        <h2 className="font-[var(--font-display)] text-3xl text-[var(--text)]">
          Repository
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
          Fork the Hall of Fame repository, open a pull request, and wait for
          the next build to publish your project.
        </p>
        <a
          href="https://github.com/your-org/nitc-hall-of-fame"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-full border border-maroon-300/30 bg-maroon-500/15 px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-maroon-300/50 hover:bg-maroon-500/25"
        >
          Open the Hall of Fame repository
        </a>
      </section>
    </div>
  );
}
