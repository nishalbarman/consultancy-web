import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicPage } from "../../services/api";
import { SkeletonBlock } from "../../components/Skeleton";

function CustomPageView() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getPublicPage(slug)
      .then(setPage)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white px-5 pt-32 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <SkeletonBlock className="h-10 w-64" />
          <SkeletonBlock className="mt-8 h-6 w-full" />
          <SkeletonBlock className="mt-3 h-6 w-5/6" />
          <SkeletonBlock className="mt-3 h-6 w-4/6" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-5">
        <div className="text-center">
          <h1 className="text-6xl font-black text-slate-200">404</h1>
          <p className="mt-4 text-lg text-slate-500">Page not found</p>
          <p className="text-sm text-slate-400">/{slug}</p>
        </div>
      </main>
    );
  }

  if (page.type === "plain-text") {
    return (
      <main className="min-h-screen bg-white">
        <pre className="m-0 whitespace-pre-wrap break-words px-5 py-28 font-mono text-sm leading-6 text-slate-950 sm:px-8 lg:px-10 mx-auto max-w-4xl">
          {page.content}
        </pre>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-28">
      <article className="prose prose-slate mx-auto max-w-3xl px-5 pb-20 sm:px-8 lg:px-10">
        <h1 className="text-4xl font-black text-slate-950">{page.title}</h1>
        <div
          className="mt-8 text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </article>
    </main>
  );
}

export default CustomPageView;
