import React from "react";

export function SkeletonBlock({ className = "" }) {
  return <div className={`animate-pulse rounded-2xl bg-slate-200 ${className}`} />;
}

export function PageSkeleton({ cards = 3 }) {
  return (
    <main className="min-h-screen bg-slate-50 px-5 pt-32 text-slate-950 sm:px-8 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <SkeletonBlock className="h-8 w-36" />
        <SkeletonBlock className="mt-6 h-12 w-full max-w-3xl" />
        <SkeletonBlock className="mt-4 h-12 w-full max-w-2xl" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {Array.from({ length: cards }).map((_, index) => (
            <div key={index} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <SkeletonBlock className="h-14 w-14" />
              <SkeletonBlock className="mt-6 h-7 w-3/4" />
              <SkeletonBlock className="mt-4 h-4 w-full" />
              <SkeletonBlock className="mt-3 h-4 w-5/6" />
              <SkeletonBlock className="mt-8 h-10 w-32" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export function DashboardSkeleton() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 pt-28 text-slate-950 sm:px-8 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-slate-950 p-8">
          <SkeletonBlock className="h-7 w-36 bg-white/20" />
          <SkeletonBlock className="mt-5 h-10 w-80 bg-white/20" />
          <SkeletonBlock className="mt-4 h-5 w-96 max-w-full bg-white/20" />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-white p-6">
              <SkeletonBlock className="h-10 w-16" />
              <SkeletonBlock className="mt-3 h-4 w-28" />
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <SkeletonBlock className="h-96" />
          <SkeletonBlock className="h-96" />
        </div>
      </section>
    </main>
  );
}
