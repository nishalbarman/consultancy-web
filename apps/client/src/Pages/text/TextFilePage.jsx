import React, { useEffect, useState } from "react";

function TextFilePage({ loader }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    loader()
      .then(setContent)
      .catch(() => setContent(""));
  }, [loader]);

  return (
    <pre className="m-0 min-h-screen whitespace-pre-wrap break-words bg-white p-0 font-mono text-sm leading-6 text-slate-950">
      {content}
    </pre>
  );
}

export default TextFilePage;
