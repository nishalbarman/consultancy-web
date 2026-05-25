import React from "react";
import { FiArrowRight, FiExternalLink, FiPlayCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { PageSkeleton } from "../../components/Skeleton";
import { useSiteData } from "../../hooks/useSiteData";
import { theme } from "../../theme";

const buttonPrimary = `inline-flex items-center justify-center gap-2 rounded-xl ${theme.bg} px-5 py-3 text-sm font-bold text-white shadow-lg ${theme.shadow} transition ${theme.bgHover}`;
const buttonSecondary = `inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition ${theme.borderHover} ${theme.textHover}`;
const sectionClass = "mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10";

function HomePage() {
  const navigate = useNavigate();
  const { data, loading, error } = useSiteData();
  const { profile, services, projects, testimonials } = data;
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);
  const heroCodeLines = normalizeLines(profile.heroCodeLines, [
    'const studio = "portfolio + services";',
    "buildWebApp();",
    "publishMobileApp();",
    "secureAdminPanel();",
    "trackClientOrders();",
  ]);

  if (loading) return <PageSkeleton cards={3} />;

  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="relative isolate overflow-hidden bg-white pt-28">
        <div className={`absolute inset-0 -z-10 ${theme.heroWash}`} />
        <div className="mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
          <div className="flex flex-col gap-6">
            <span
              className={`w-fit rounded-full border ${theme.borderSoft} ${theme.bgPale} px-4 py-1.5 text-sm font-bold ${theme.text}`}>
              {profile.tagline}
            </span>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              {profile.headline}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {profile.intro}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className={buttonPrimary}
                onClick={() => navigate("/contact")}>
                Book a project <FiArrowRight />
              </button>
              <button
                className={buttonSecondary}
                onClick={() => navigate("/projects")}>
                View portfolio
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {profile.stats?.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
                  <strong className="block text-2xl font-black text-slate-950">
                    {stat.value}
                  </strong>
                  <span className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-2xl shadow-slate-950/20">
            <div className="flex gap-2 border-b border-white/10 bg-slate-900 p-5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div
              className={`space-y-4 p-7 font-mono text-sm ${theme.textPale} sm:p-9`}>
              {heroCodeLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="grid grid-cols-2 border-t border-white/10">
              <div className="p-6">
                <span className={`text-sm font-bold ${theme.textSoft}`}>
                  FAST
                </span>
              </div>
              <div className="border-l border-white/10 p-6">
                <span className={`text-sm font-bold ${theme.textSoft}`}>
                  BUDGET FRIENDLY
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="px-5 py-4 text-center font-semibold text-amber-700">
          Using fallback content until the API is online.
        </div>
      )}

      <section className={sectionClass} id="services">
        <SectionHeader
          eyebrow="Services"
          title="Development services clients can buy directly from this site"
          link="/services"
          linkText="See all services"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <article
              key={service.id}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div
                className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl ${theme.bgSoft} text-lg font-black ${theme.text}`}>
                {service.title.slice(0, 2)}
              </div>
              <h3 className="text-xl font-black text-slate-950">
                {service.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{service.summary}</p>
              <strong className={`mt-6 block ${theme.text}`}>
                {service.price}
              </strong>
            </article>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured work for website visitors, clients, and Play Store reviewers"
          link="/projects"
          linkText="Open portfolio"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto my-12 flex w-[calc(100%-40px)] max-w-7xl flex-col gap-6 rounded-3xl bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <FiPlayCircle className={`mb-4 h-11 w-11 ${theme.textSoft}`} />
          <h2 className="text-2xl font-black sm:text-3xl">
            {profile.processTitle || "From idea to launch build"}
          </h2>
          <p className="mt-3 leading-7 text-slate-300">
            {profile.processSummary ||
              "Share your requirements, approve the scope, track progress, and receive a deployable website, API, app build, or admin dashboard."}
          </p>
        </div>
        <button className={buttonPrimary} onClick={() => navigate("/contact")}>
          Start a consultation
        </button>
      </section>

      <section className={sectionClass}>
        <SectionHeader
          eyebrow="Client Notes"
          title="Trust signals you can update from the admin panel"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-lg leading-8 text-slate-600">"{item.quote}"</p>
              <strong className="mt-5 block text-slate-950">{item.name}</strong>
              <span className={`text-sm font-bold ${theme.text}`}>
                {item.role}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function normalizeLines(value, fallback) {
  if (Array.isArray(value)) {
    return value.flatMap((line) => normalizeLines(line, [])).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return fallback;
}

function SectionHeader({ eyebrow, title, link, linkText }) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span
          className={`text-sm font-black uppercase tracking-widest ${theme.text}`}>
          {eyebrow}
        </span>
        <h2 className="mt-2 max-w-3xl text-2xl font-black leading-tight text-slate-950 sm:text-4xl">
          {title}
        </h2>
      </div>
      {link && (
        <Link
          className={`font-black ${theme.text} ${theme.textHover}`}
          to={link}>
          {linkText}
        </Link>
      )}
    </div>
  );
}

export function ProjectCard({ project }) {
  return (
    <article className="flex min-h-80 flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <span
        className={`text-sm font-black uppercase tracking-widest ${theme.text}`}>
        {project.type}
      </span>
      <h3 className="mt-4 text-xl font-black text-slate-950">
        {project.title}
      </h3>
      <p className="mt-3 leading-7 text-slate-600">{project.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack?.map((item) => (
          <small
            key={item}
            className="rounded-full bg-slate-100 px-3 py-1 font-bold text-slate-600">
            {item}
          </small>
        ))}
      </div>
      {(project.url || project.playStoreUrl) && (
        <a
          className={`mt-auto inline-flex items-center gap-2 pt-6 font-black ${theme.text}`}
          href={project.playStoreUrl || project.url}
          target="_blank"
          rel="noreferrer">
          Open project <FiExternalLink />
        </a>
      )}
    </article>
  );
}

export default HomePage;
