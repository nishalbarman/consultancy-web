import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AboutPageSkeleton } from "../../components/Skeleton";
import { useSiteData } from "../../hooks/useSiteData";

function AboutPage() {
  const navigate = useNavigate();
  const { data, loading } = useSiteData();
  if (loading) return <AboutPageSkeleton />;

  return (
    <main className="bg-white pt-28 text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-112px)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex w-fit rounded-full bg-slate-100 px-4 py-1.5 text-sm font-black uppercase tracking-widest text-slate-600">About {data.profile.brand}</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">{data.profile.aboutHeadline || "Developer-led delivery for businesses that need practical software."}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{data.profile.aboutIntro || "This site works as both a consultancy website and a personal developer portfolio..."}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 font-bold text-white shadow-sm hover:bg-slate-800" onClick={() => navigate("/projects")}>View work</motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex rounded-2xl border border-slate-300 px-6 py-3.5 font-bold text-slate-950 transition hover:border-slate-400 hover:text-slate-700" onClick={() => navigate("/contact")}>Contact</motion.button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-2xl shadow-black/10">
          <div className="flex gap-2 border-b border-white/10 bg-slate-900 p-5"><span className="h-3 w-3 rounded-full bg-red-400" /><span className="h-3 w-3 rounded-full bg-amber-400" /><span className="h-3 w-3 rounded-full bg-emerald-400" /></div>
          <div className="grid gap-4 p-8 font-mono text-slate-300">
            {normalizeLines(data.profile.heroCodeLines, ["services: web, app, backend", "portfolio: dynamic", "admin: jwt protected", "orders: client portal"]).map((line) => <p key={line}>{line}</p>)}
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function normalizeLines(value, fallback) {
  if (Array.isArray(value)) return value.flatMap((line) => normalizeLines(line, [])).filter(Boolean);
  if (typeof value === "string") return value.split(/\r?\n|,/).map((l) => l.trim()).filter(Boolean);
  return fallback;
}

export default AboutPage;
