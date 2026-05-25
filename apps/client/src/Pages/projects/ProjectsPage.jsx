import React from "react";
import { PageSkeleton } from "../../components/Skeleton";
import { useSiteData } from "../../hooks/useSiteData";
import { theme } from "../../theme";
import { ProjectCard } from "../home/HomePage";

function ProjectsPage() {
  const { data, loading } = useSiteData();

  if (loading) return <PageSkeleton cards={3} />;

  return (
    <main className="bg-slate-50 pt-28 text-slate-950">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <span className={`rounded-full ${theme.bgSoft} px-4 py-1.5 text-sm font-black uppercase tracking-widest ${theme.text}`}>Portfolio</span>
        <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">Work samples that make the site usable as a developer portfolio</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProjectsPage;
