import React from "react";
import { useNavigate } from "react-router-dom";
import { PageSkeleton } from "../../components/Skeleton";
import { useSiteData } from "../../hooks/useSiteData";
import { theme } from "../../theme";

function AboutPage() {
  const navigate = useNavigate();
  const { data, loading } = useSiteData();

  if (loading) return <PageSkeleton cards={2} />;

  return (
    <main className="bg-white pt-28 text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-10">
        <div>
          <span className={`rounded-full ${theme.bgSoft} px-4 py-1.5 text-sm font-black uppercase tracking-widest ${theme.text}`}>
            About {data.profile.brand}
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            {data.profile.aboutHeadline || "Developer-led delivery for businesses that need practical software."}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {data.profile.aboutIntro ||
              "This site works as both a consultancy website and a personal developer portfolio. The public pages are powered by the server, while the admin panel keeps projects, services, testimonials, leads, users, and orders current."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className={`rounded-2xl ${theme.bg} px-6 py-3 font-black text-white ${theme.bgHover}`} onClick={() => navigate("/projects")}>View work</button>
            <button className={`rounded-2xl border border-slate-300 px-6 py-3 font-black text-slate-950 ${theme.borderHover} ${theme.textHover}`} onClick={() => navigate("/contact")}>Contact</button>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-2xl shadow-slate-950/20">
          <div className="flex gap-2 border-b border-white/10 bg-slate-900 p-5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className={`grid gap-4 p-8 font-mono ${theme.textPale}`}>
            {normalizeLines(data.profile.heroCodeLines, [
              "services: web, app, backend",
              "portfolio: dynamic",
              "admin: jwt protected",
              "orders: client portal",
            ]).map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function normalizeLines(value, fallback) {
  if (Array.isArray(value)) return value.flatMap((line) => normalizeLines(line, [])).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return fallback;
}

export default AboutPage;
