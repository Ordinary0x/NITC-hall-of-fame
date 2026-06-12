import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Your Project",
  description:
    "How to add a student project to the Hall of Fame via pull request.",
};

const exampleEntry = `[
  {
    "title": "My Cool Project",
    "project": "https://github.com/your-name/your-repo",
    "authors": ["https://github.com/your-name"],
    "description": "A short description of what the project does.",
    "website": "https://myproject.example.com"
  }
]`;

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-12">
      <section className="panel-strong rounded-xl p-6 sm:p-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-maroon-200/80">
          Submission guide
        </p>
        <h1 className="mt-2 font-[var(--font-display)] text-4xl tracking-[-0.04em] text-[var(--text)]">
          Submit Your Project
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--muted)]">
          Projects are added by pull request only. Keep your repository
          conventions simple, and the build pipeline will handle the metadata
          refresh automatically.
        </p>
      </section>

      <section className="grid gap-3">
        {[
          [
            "Create a public/projects/<your-project-name>/ folder inside the Hall of Fame repo. Add a readme.md (optional), thumbnail.* image, and any screenshots.",
            true,
          ],
          ["Fork the Hall of Fame repository and branch from main.", false],
          [
            "Add your entry to projects.json — include title, project URL, author URL, description, and website (leave blank if you don't have one).",
            false,
          ],
          [
            "Open a pull request. Once merged, your project appears on the site within 24 hours of the next rebuild.",
            false,
          ],
        ].map(([step, hasSampleButton], index) => (
          <div key={step as string} className="panel rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-maroon-600/20 font-[var(--font-mono)] text-xs text-[var(--text)]">
                {index + 1}
              </div>
              <div className="pt-0.5 text-sm leading-6 text-[var(--muted)]">
                {step as string}
                {hasSampleButton && (
                  <>
                    <p className="mt-3 text-xs leading-5 text-maroon-300/60">
                      Folder name should match your project title in lowercase
                      with hyphens for spaces. For example, &quot;Visual
                      Learner&quot; → <code className="text-maroon-200/80">visual-learner</code>.
                      Don&apos;t have assets? No problem — we&apos;ll
                      auto-pull them from your GitHub repo.
                    </p>
                    <a
                      href="https://github.com/simonMat21/NITC-hall-of-fame/tree/main/public/projects"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex rounded-lg border border-maroon-500/30 bg-maroon-600/15 px-3.5 py-2 text-sm font-medium text-[var(--text)] transition hover:border-maroon-500/50"
                    >
                      View example assets
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="panel rounded-xl p-5 sm:p-6">
        <h2 className="font-[var(--font-display)] text-2xl text-[var(--text)]">
          projects.json entry
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Add one object per project. The title is the project name, the project
          URL is your GitHub repository, the author URL is your GitHub profile,
          the description is a short summary, and the website URL is optional
          (leave blank or omit if you don't have one).
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg border border-[var(--border)] bg-[#111] p-4 text-sm text-white/80">
          <code>{exampleEntry}</code>
        </pre>
      </section>

      <section className="panel rounded-xl p-5 sm:p-6">
        <h2 className="font-[var(--font-display)] text-2xl text-[var(--text)]">
          Repository
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Fork the Hall of Fame repository, open a pull request, and wait for
          the next build to publish your project.
        </p>
        <a
          href="https://github.com/simonMat21/NITC-hall-of-fame"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex rounded-lg border border-maroon-500/30 bg-maroon-600/15 px-3.5 py-2 text-sm font-medium text-[var(--text)] transition hover:border-maroon-500/50"
        >
          Open the Hall of Fame repository
        </a>
      </section>
    </div>
  );
}
