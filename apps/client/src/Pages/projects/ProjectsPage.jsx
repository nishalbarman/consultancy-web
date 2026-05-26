import React from "react";
import { motion } from "framer-motion";
import { PageSkeleton } from "../../components/Skeleton";
import { useSiteData } from "../../hooks/useSiteData";
import { ProjectCard } from "../home/HomePage";

function ProjectsPage() {
  const { data, loading } = useSiteData();

  if (loading) return <PageSkeleton cards={3} />;

  return (
    <main className="bg-white pt-28 text-slate-950">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex w-fit rounded-full bg-slate-100 px-4 py-1.5 text-sm font-black uppercase tracking-widest text-slate-600">
            Portfolio
          </span>
          <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">
            Our project and works that wil help you understand us
          </h1>
        </motion.div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {data.projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProjectsPage;
