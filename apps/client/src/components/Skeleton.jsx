import React from "react";

export function SkeletonBlock({ className = "" }) {
  return <div className={`animate-pulse rounded-2xl bg-slate-100 ${className}`} />;
}

export function HomePageSkeleton() {
  return (
    <main>
      <section className="relative pt-28 bg-[#08090a]">
        <div className="mx-auto grid min-h-[calc(100vh-112px)] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
          <div className="flex flex-col gap-6">
            <SkeletonBlock className="h-8 w-44 rounded-full bg-white/10" />
            <SkeletonBlock className="h-14 w-full max-w-2xl bg-white/10" />
            <SkeletonBlock className="h-14 w-3/4 max-w-xl bg-white/10" />
            <SkeletonBlock className="h-6 w-full max-w-xl bg-white/10" />
            <SkeletonBlock className="h-6 w-2/3 max-w-lg bg-white/10" />
            <div className="flex gap-3">
              <SkeletonBlock className="h-12 w-40 rounded-2xl bg-white/10" />
              <SkeletonBlock className="h-12 w-36 rounded-2xl bg-white/10" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[0, 1, 2].map((i) => <div key={i} className="rounded-2xl border border-white/5 bg-white/5 p-5"><SkeletonBlock className="h-8 w-24 bg-white/10" /><SkeletonBlock className="mt-2 h-4 w-16 bg-white/10" /></div>)}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/5 bg-slate-800/60">
            <div className="flex gap-2 border-b border-white/5 p-5"><SkeletonBlock className="h-3 w-3 rounded-full" /><SkeletonBlock className="h-3 w-3 rounded-full" /><SkeletonBlock className="h-3 w-3 rounded-full" /></div>
            <div className="space-y-4 p-7 sm:p-9">{[0, 1, 2, 3, 4].map((i) => <SkeletonBlock key={i} className={`h-4 bg-white/10 ${i === 0 ? "w-3/4" : i === 1 ? "w-1/2" : "w-2/3"}`} />)}</div>
          </div>
        </div>
      </section>
      <section className="bg-white mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <SkeletonBlock className="h-5 w-20" /><SkeletonBlock className="mt-2 h-10 w-full max-w-xl" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"><SkeletonBlock className="h-14 w-14" /><SkeletonBlock className="mt-6 h-7 w-3/4" /><SkeletonBlock className="mt-4 h-4 w-full" /><SkeletonBlock className="mt-3 h-4 w-5/6" /><SkeletonBlock className="mt-8 h-6 w-28" /></div>)}</div>
      </section>
      <section className="bg-slate-50 mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <SkeletonBlock className="h-5 w-20" /><SkeletonBlock className="mt-2 h-10 w-full max-w-xl" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="flex min-h-80 flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"><SkeletonBlock className="h-5 w-16" /><SkeletonBlock className="mt-4 h-7 w-3/4" /><SkeletonBlock className="mt-3 h-4 w-full" /><SkeletonBlock className="mt-3 h-4 w-4/5" /><div className="mt-5 flex gap-2">{[0, 1].map((j) => <SkeletonBlock key={j} className="h-6 w-16 rounded-full" />)}</div><SkeletonBlock className="mt-auto h-5 w-28" /></div>)}</div>
      </section>
      <section className="mx-auto w-[calc(100%-40px)] max-w-7xl rounded-3xl bg-slate-900 p-10 sm:p-12">
        <SkeletonBlock className="h-12 w-12 bg-white/10" /><SkeletonBlock className="mt-4 h-8 w-3/4 max-w-lg bg-white/10" /><SkeletonBlock className="mt-3 h-4 w-full max-w-2xl bg-white/10" /><SkeletonBlock className="mt-3 h-4 w-2/3 max-w-xl bg-white/10" /><SkeletonBlock className="mt-6 h-12 w-44 rounded-2xl bg-white/10" />
      </section>
      <section className="bg-white mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <SkeletonBlock className="h-5 w-20" /><SkeletonBlock className="mt-2 h-10 w-full max-w-lg" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">{[0, 1].map((i) => <div key={i} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"><SkeletonBlock className="h-4 w-full" /><SkeletonBlock className="mt-3 h-4 w-5/6" /><SkeletonBlock className="mt-3 h-4 w-2/3" /><SkeletonBlock className="mt-5 h-5 w-32" /><SkeletonBlock className="mt-2 h-4 w-20" /></div>)}</div>
      </section>
    </main>
  );
}

export function PageSkeleton({ cards = 3, withEyebrow = true }) {
  return (
    <main className="min-h-screen bg-white px-5 pt-28 sm:px-8 lg:px-10">
      <section className="mx-auto max-w-7xl">
        {withEyebrow && <SkeletonBlock className="h-5 w-20" />}
        <SkeletonBlock className="mt-2 h-10 w-full max-w-2xl" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">{Array.from({ length: cards }).map((_, i) => <div key={i} className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"><SkeletonBlock className="h-14 w-14" /><SkeletonBlock className="mt-6 h-7 w-3/4" /><SkeletonBlock className="mt-4 h-4 w-full" /><SkeletonBlock className="mt-3 h-4 w-5/6" /><SkeletonBlock className="mt-8 h-10 w-32" /></div>)}</div>
      </section>
    </main>
  );
}

export function AboutPageSkeleton() {
  return (
    <main className="min-h-screen bg-white px-5 pt-28 sm:px-8 lg:px-10">
      <section className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div><SkeletonBlock className="h-8 w-40 rounded-full" /><SkeletonBlock className="mt-6 h-12 w-full max-w-xl" /><SkeletonBlock className="mt-3 h-12 w-4/5 max-w-lg" /><SkeletonBlock className="mt-6 h-4 w-full max-w-2xl" /><SkeletonBlock className="mt-3 h-4 w-full max-w-2xl" /><SkeletonBlock className="mt-3 h-4 w-2/3 max-w-lg" /><div className="mt-8 flex gap-3"><SkeletonBlock className="h-12 w-32 rounded-2xl" /><SkeletonBlock className="h-12 w-28 rounded-2xl" /></div></div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900"><div className="flex gap-2 border-b border-white/10 p-5"><SkeletonBlock className="h-3 w-3 rounded-full" /><SkeletonBlock className="h-3 w-3 rounded-full" /><SkeletonBlock className="h-3 w-3 rounded-full" /></div><div className="grid gap-4 p-8">{[0, 1, 2, 3].map((i) => <SkeletonBlock key={i} className={`h-4 bg-white/10 ${i === 0 ? "w-3/4" : i === 1 ? "w-1/2" : "w-2/3"}`} />)}</div></div>
      </section>
    </main>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8"><div className="flex items-center gap-3"><SkeletonBlock className="h-9 w-9 rounded-xl" /><div><SkeletonBlock className="h-4 w-28" /><SkeletonBlock className="mt-1 h-3 w-20" /></div></div><SkeletonBlock className="h-9 w-28 rounded-xl" /></div></header>
      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><SkeletonBlock className="h-10 w-10" /><SkeletonBlock className="mt-3 h-8 w-12" /><SkeletonBlock className="mt-1 h-4 w-20" /></div>)}</div>
        <div className="mt-8"><SkeletonBlock className="h-7 w-32" /><div className="mt-4 grid gap-4">{[0, 1, 2].map((i) => <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5"><SkeletonBlock className="h-6 w-48" /><SkeletonBlock className="mt-2 h-4 w-72" /><SkeletonBlock className="mt-3 h-4 w-full max-w-lg" /></div>)}</div></div>
      </main>
    </div>
  );
}
