import React from "react";
import { FiArrowRight, FiExternalLink, FiPlayCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HomePageSkeleton } from "../../components/Skeleton";
import { useSiteData } from "../../hooks/useSiteData";
import { theme } from "../../theme";

const buttonPrimary = `inline-flex items-center justify-center gap-2 rounded-2xl ${theme.gradientBtn} px-6 py-3.5 text-sm font-bold text-white shadow-sm ${theme.gradientBtnHover} transition-all duration-300`;
const buttonSecondary =
  "inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20";
const sectionClass =
  "mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-10";
const cardClass =
  "rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl";

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

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

  if (loading) return <HomePageSkeleton />;

  return (
    <main className="bg-white text-slate-950">
      {/* ─── Hero Section ─── */}
      <section className="relative isolate overflow-hidden pt-28">
        <div className={`absolute inset-0 -z-10 ${theme.heroWash}`} />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto grid min-h-[calc(100vh-112px)] w-full max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-fit rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-slate-300 backdrop-blur-sm"
            >
              {profile.tagline}
            </motion.span>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {profile.headline}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              {profile.intro}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={buttonSecondary}
                onClick={() => navigate("/contact")}
              >
                Book a project <FiArrowRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={buttonSecondary}
                onClick={() => navigate("/projects")}
              >
                View portfolio
              </motion.button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {profile.stats?.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <strong className="block text-2xl font-black text-white">
                    {stat.value}
                  </strong>
                  <span className="text-sm font-medium text-slate-400">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 shadow-2xl shadow-black/20 backdrop-blur-sm"
          >
            <div className="flex gap-2 border-b border-white/5 bg-slate-900 p-5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-4 p-7 font-mono text-sm text-slate-300 sm:p-9">
              {heroCodeLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="grid grid-cols-2 border-t border-white/5">
              <div className="p-6">
                <span className="text-sm font-bold text-slate-400">FAST</span>
              </div>
              <div className="border-l border-white/5 p-6">
                <span className="text-sm font-bold text-slate-400">
                  BUDGET FRIENDLY
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {error && (
        <div className="px-5 py-4 text-center font-semibold text-slate-600">
          Using fallback content until the API is online.
        </div>
      )}

      {/* ─── Services Section ─── */}
      <section className={sectionClass} id="services">
        <motion.div {...fadeIn}>
          <SectionHeader
            eyebrow="Services"
            title="Development services clients can buy directly from this site"
            link="/services"
            linkText="See all services"
          />
        </motion.div>
        <div className="grid gap-5 md:grid-cols-3">
          {services.slice(0, 3).map((service, i) => (
            <motion.article
              key={service.id}
              {...staggerItem}
              transition={{ delay: i * 0.1 }}
              className={cardClass}
            >
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-slate-900 text-lg font-black text-white">
                {service.title.slice(0, 2)}
              </div>
              <h3 className="text-xl font-black text-slate-950">
                {service.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {service.summary}
              </p>
              <strong className="mt-6 block text-slate-900">
                {service.price}
              </strong>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ─── Portfolio Section ─── */}
      <section className={sectionClass}>
        <motion.div {...fadeIn}>
          <SectionHeader
            eyebrow="Portfolio"
            title="Featured work"
            link="/projects"
            linkText="Open portfolio"
          />
        </motion.div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              {...staggerItem}
              transition={{ delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Process CTA Banner ─── */}
      <section className="mx-auto my-12 flex w-[calc(100%-40px)] max-w-7xl flex-col gap-6 rounded-3xl bg-slate-900 p-10 text-white shadow-2xl shadow-black/10 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <FiPlayCircle className="mb-4 h-12 w-12 text-slate-400" />
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            {profile.processTitle || "From idea to launch build"}
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-400">
            {profile.processSummary ||
              "Share your requirements, approve the scope, track progress, and receive a deployable website, API, app build, or admin dashboard."}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow transition hover:bg-slate-100"
          onClick={() => navigate("/contact")}
        >
          Start a consultation
        </motion.button>
      </section>

      {/* ─── Testimonials Section ─── */}
      <section className={sectionClass}>
        <motion.div {...fadeIn}>
          <SectionHeader
            eyebrow="Client Notes"
            title="Trust signals you can update from the admin panel"
          />
        </motion.div>
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <motion.article
              key={item.id}
              {...staggerItem}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-5 flex gap-1 text-amber-400">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="flex-1 text-base leading-7 italic text-slate-600">
                "{item.quote}"
              </p>
              <div className="mt-6 flex items-center gap-4 border-t border-slate-50 pt-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-900 text-sm font-bold text-white">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <strong className="block text-sm font-bold text-slate-900">{item.name}</strong>
                  <span className="text-xs font-medium text-slate-500">{item.role}</span>
                </div>
              </div>
              <span className="absolute -top-3 -right-3 select-none text-6xl leading-none text-slate-100">"</span>
            </motion.article>
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
    <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="text-sm font-black uppercase tracking-widest text-slate-400">
          {eyebrow}
        </span>
        <h2 className="mt-2 max-w-3xl text-2xl font-black leading-tight text-slate-950 sm:text-4xl">
          {title}
        </h2>
      </div>
      {link && (
        <Link
          className="font-black text-slate-600 transition hover:text-slate-950"
          to={link}
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}

export function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="flex min-h-80 flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      <span className="text-sm font-black uppercase tracking-widest text-slate-400">
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
            className="rounded-full bg-slate-100 px-3 py-1 font-bold text-slate-700"
          >
            {item}
          </small>
        ))}
      </div>
      {(project.url || project.playStoreUrl) && (
        <a
          className="mt-auto inline-flex items-center gap-2 pt-6 font-black text-slate-600 transition hover:text-slate-950"
          href={project.playStoreUrl || project.url}
          target="_blank"
          rel="noreferrer"
        >
          Open project <FiExternalLink />
        </a>
      )}
    </motion.article>
  );
}

export default HomePage;
