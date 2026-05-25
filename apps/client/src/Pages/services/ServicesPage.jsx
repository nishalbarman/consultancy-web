import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PageSkeleton } from "../../components/Skeleton";
import { useSiteData } from "../../hooks/useSiteData";
import { theme } from "../../theme";

function ServicesPage() {
  const navigate = useNavigate();
  const { data, loading } = useSiteData();

  if (loading) return <PageSkeleton cards={3} />;

  return (
    <main className="bg-slate-50 pt-28 text-slate-950">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <span className={`rounded-full ${theme.bgSoft} px-4 py-1.5 text-sm font-black uppercase tracking-widest ${theme.text}`}>Services</span>
        <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">Hire for a focused build, a full product, or ongoing support</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {data.services.map((service) => (
            <article className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl" key={service.id}>
              <div className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl ${theme.bgSoft} text-lg font-black ${theme.text}`}>{service.title.slice(0, 2)}</div>
              <h2 className="text-xl font-black">{service.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{service.summary}</p>
              <div className="mt-5 grid gap-3">
                {service.features?.map((feature) => (
                  <p className="flex items-center gap-2 font-bold text-slate-700" key={feature}>
                    <FiCheckCircle className={theme.text} /> {feature}
                  </p>
                ))}
              </div>
              <strong className={`mt-6 block ${theme.text}`}>{service.price}</strong>
              <button className={`mt-6 rounded-2xl bg-slate-950 px-5 py-3 font-black text-white ${theme.bgHover}`} onClick={() => navigate("/contact")}>
                Enquire now
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ServicesPage;
