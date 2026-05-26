import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PageSkeleton } from "../../components/Skeleton";
import { useSiteData } from "../../hooks/useSiteData";

function ServicesPage() {
  const navigate = useNavigate();
  const { data, loading } = useSiteData();
  if (loading) return <PageSkeleton cards={3} />;

  return (
    <main className="bg-slate-50 pt-28 text-slate-950">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex w-fit rounded-full bg-slate-100 px-4 py-1.5 text-sm font-black uppercase tracking-widest text-slate-600">Services</span>
          <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">Hire for a focused build, a full product, or ongoing support</h1>
        </motion.div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {data.services.map((service, i) => (
            <motion.article key={service.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -8 }}
              className="flex flex-col rounded-3xl border border-slate-100 bg-white p-7 pt-8 shadow-md transition-all duration-300 hover:shadow-xl">
              {/* <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-slate-900 text-lg font-black text-white">{service.title.slice(0, 2)}</div> */}
              <h2 className="text-xl font-black">{service.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{service.summary}</p>
              <div className="mt-5 grid gap-3">{service.features?.map((f) => <p key={f} className="flex items-center gap-2 font-bold text-slate-700"><FiCheckCircle className="text-slate-700" /> {f}</p>)}</div>
              <strong className="mt-6 block text-slate-900 text-lg">{service.price}</strong>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white shadow-sm hover:bg-slate-800" onClick={() => navigate("/contact")}>Enquire now</motion.button>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ServicesPage;
