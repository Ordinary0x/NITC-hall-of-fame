import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { AuthorCard } from "@/components/AuthorCard";
import { Gallery } from "@/components/Gallery";
import { getProjectBySlug, getProjectsData } from "@/lib/projects";
import {
  formatUpdatedDate,
  parseRepoUrl,
  type ProjectRecord,
} from "@/lib/project-utils";

export const dynamicParams = false;

async function loadProject(params: { owner: string; repo: string }) {
  const projects = await getProjectsData();
  return getProjectBySlug(
    projects,
    decodeURIComponent(params.owner),
    decodeURIComponent(params.repo),
  );
}

export async function generateStaticParams() {
  const projects = await getProjectsData();

  return projects
    .map((project) => {
      const parts = parseRepoUrl(project.repoUrl);
      return parts ? { owner: parts.owner, repo: parts.repo } : null;
    })
    .filter((value): value is { owner: string; repo: string } =>
      Boolean(value),
    );
}

export async function generateMetadata({
  params,
}: {
  params: { owner: string; repo: string };
}): Promise<Metadata> {
  const project = await loadProject(params);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path d="M10 1.75l2.7 5.47 6.04.88-4.37 4.26 1.03 6.01L10 15.51 4.6 18.37l1.03-6.01L1.26 8.1l6.04-.88L10 1.75z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path d="M6 3a2 2 0 10-1.73-1A2 2 0 006 3zm8 0a2 2 0 10-1.73-1A2 2 0 0014 3zM6 7.5a3.5 3.5 0 003.25 3.48V13a2.75 2.75 0 11-1.5 0v-2.02A3.5 3.5 0 106 7.5zm8 0a3.5 3.5 0 00-3.25 3.48V13a2.75 2.75 0 101.5 0v-2.02A3.5 3.5 0 0014 7.5z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4 opacity-70"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.341-3.369-1.341-.454-1.15-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4 opacity-70"
      stroke="currentColor"
    >
      <path d="M12 21a9 9 0 100-18 9 9 0 000 18Z" strokeWidth="1.6" />
      <path d="M3.5 12h17" strokeWidth="1.6" />
      <path
        d="M12 3c2.5 2.2 4 5.2 4 9s-1.5 6.8-4 9c-2.5-2.2-4-5.2-4-9s1.5-6.8 4-9Z"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/50">
      {children}
    </span>
  );
}

function SidebarCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <div className="border-b border-[var(--border)] bg-[#141414] px-3 py-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
          {title}
        </span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const project = await loadProject(params);

  if (!project) {
    notFound();
  }

  const repoParts = parseRepoUrl(project.repoUrl);

  return (
    <div className="pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-white/50 transition-colors hover:border-white/20 hover:text-white/80"
        >
          <span className="transition-transform">←</span>
          All Projects
        </Link>
        <div className="flex items-center gap-2">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
          >
            <GithubIcon />
            Repository
          </a>
          {project.website ? (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
            >
              <GlobeIcon />
              Website
            </a>
          ) : null}
        </div>
      </div>

      {/* Hero */}
      <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          {/* Badges */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {project.language && (
              <Badge>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {project.language}
              </Badge>
            )}
            {project.license && <Badge>{project.license}</Badge>}
          </div>

          {/* Title */}
          <h1 className="mb-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h1>

          {/* Description */}
          <p className="max-w-xl text-base leading-relaxed text-white/50">
            {project.description}
          </p>

          {/* Slug */}
          {repoParts && (
            <p className="mt-2 font-mono text-xs text-white/25">
              {repoParts.owner} / {repoParts.repo}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="flex rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center gap-2 border-r border-[var(--border)] px-4 py-3">
            <span className="text-white/30">
              <StarIcon />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
              Stars
            </span>
            <span className="ml-2 font-mono text-lg font-medium text-white">
              {project.stars.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-3">
            <span className="text-white/30">
              <ForkIcon />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
              Forks
            </span>
            <span className="ml-2 font-mono text-lg font-medium text-white">
              {project.forks.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Updated timestamp */}
      <div className="mb-6 flex items-center gap-1.5 border-b border-[var(--border)] pb-4 text-xs text-white/25">
        <ClockIcon />
        Updated {formatUpdatedDate(project.lastUpdated)}
      </div>

      {/* Gallery (only show when there are images) */}
      {(project.screenshots && project.screenshots.length > 0) ||
      (project.thumbnail && !project.thumbnail.startsWith("data:")) ? (
        <div className="mb-8 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 lg:p-4">
          <Gallery
            title={project.title}
            screenshots={project.screenshots}
            thumbnail={project.thumbnail}
          />
        </div>
      ) : null}

      {/* Content + Sidebar */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_260px] lg:gap-8 overflow-hidden">
        {/* Main column */}
        <div className="space-y-6 min-w-0">
          {/* About */}
          <section>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">
              About
            </p>
            <p className="text-sm leading-relaxed text-white/60">
              {project.readmeDescription ?? project.description}
            </p>
          </section>

          <hr className="border-[var(--border)]" />

          {/* README */}
          {project.readmeMarkdown ? (
            <section>
              <div className="overflow-hidden rounded-lg border border-[var(--border)]">
                {/* File tab header */}
                <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[#141414] px-3 py-2">
                  <span className="text-white/30">
                    <FileTextIcon />
                  </span>
                  <span className="font-mono text-xs text-white/30">
                    README.md
                  </span>
                </div>

                {/* Markdown content */}
                <div className="markdown-wrapper p-5 sm:p-6">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="mb-4 mt-8 text-xl font-semibold tracking-tight text-white first:mt-0"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="mb-3 mt-6 text-lg font-semibold tracking-tight text-white"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="mb-2 mt-5 text-base font-semibold text-white"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="mb-3 text-sm leading-relaxed text-white/55 last:mb-0"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="mb-3 ml-4 list-outside list-disc space-y-1 text-sm text-white/55"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="mb-3 ml-4 list-outside list-decimal space-y-1 text-sm text-white/55"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="leading-relaxed" {...props} />
                      ),
                      code: ({ node, inline, ...props }: any) =>
                        inline ? (
                          <code
                            className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-xs text-white/70"
                            {...props}
                          />
                        ) : (
                          <code {...props} />
                        ),
                      pre: ({ node, ...props }) => (
                        <pre
                          className="mb-3 overflow-x-auto rounded-lg border border-[var(--border)] bg-[#0d0d0d] p-4 font-mono text-xs leading-relaxed"
                          {...props}
                        />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/50"
                          {...props}
                        />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="mb-3 border-l border-white/20 pl-4 italic text-white/40"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {project.readmeMarkdown}
                  </ReactMarkdown>
                </div>
              </div>
            </section>
          ) : (
            <section className="rounded-lg border border-[var(--border)] p-8 text-center">
              <p className="text-sm text-white/30">
                No README documentation available for this repository.
              </p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-3">
          {/* Authors */}
          <SidebarCard title={project.authors.length === 1 ? "Author" : "Authors"}>
            <AuthorCard authors={project.authors} />
          </SidebarCard>

          {/* Details */}
          <SidebarCard title="Details">
            <dl className="space-y-0 divide-y divide-white/5">
              {project.language && (
                <div className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                  <dt className="text-xs text-white/30">Language</dt>
                  <dd className="font-mono text-xs text-white/60">
                    {project.language}
                  </dd>
                </div>
              )}
              {project.license && (
                <div className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                  <dt className="text-xs text-white/30">License</dt>
                  <dd className="font-mono text-xs text-white/60">
                    {project.license}
                  </dd>
                </div>
              )}
              <div className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                <dt className="text-xs text-white/30">Updated</dt>
                <dd className="font-mono text-xs text-white/60">
                  {formatUpdatedDate(project.lastUpdated)}
                </dd>
              </div>
            </dl>
          </SidebarCard>

          {/* Topics */}
          {project.topics && project.topics.length > 0 && (
            <SidebarCard title="Topics">
              <div className="flex flex-wrap gap-1.5">
                {project.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/50"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </SidebarCard>
          )}
        </aside>
      </div>
    </div>
  );
}
