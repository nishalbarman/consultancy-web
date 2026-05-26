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
        <pre className="m-0 whitespace-pre-wrap break-words p-5 pt-28 font-mono text-sm leading-6 text-slate-950 sm:px-8 lg:px-10 mx-auto max-w-4xl">
          {page.content}
        </pre>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-28">
      <article className="mx-auto max-w-3xl px-5 pb-20 sm:px-8 lg:px-10">
        <h1 className="text-4xl font-black text-slate-950">{page.title}</h1>
        <style>{`
          .ck-content { color: #374151; line-height: 1.75; }
          .ck-content h2 { font-size: 1.5rem; font-weight: 800; margin-top: 2rem; margin-bottom: 0.75rem; color: #0f172a; }
          .ck-content h3 { font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.5rem; color: #0f172a; }
          .ck-content p { margin: 0 0 1rem; }
          .ck-content ul, .ck-content ol { margin: 0 0 1rem; padding-left: 1.5rem; }
          .ck-content li { margin-bottom: 0.25rem; }
          .ck-content blockquote { border-left: 3px solid #e2e8f0; padding-left: 1rem; color: #64748b; margin: 1rem 0; }
          .ck-content pre { background: #f1f5f9; padding: 1rem; border-radius: 0.75rem; font-family: monospace; font-size: 0.875rem; overflow-x: auto; }
          .ck-content code { background: #f1f5f9; padding: 0.125rem 0.375rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.85em; }
          .ck-content table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
          .ck-content th, .ck-content td { border: 1px solid #e2e8f0; padding: 0.5rem 0.75rem; text-align: left; }
          .ck-content th { background: #f8fafc; font-weight: 600; }
          .ck-content a { color: #0f172a; text-decoration: underline; }
          .ck-content img { max-width: 100%; border-radius: 0.75rem; }
        `}</style>
        <div className="ck-content mt-8" dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>
    </main>
  );
}

export default CustomPageView;
