import React, { useEffect, useState } from "react";
import { getAdsTxt } from "../../services/api";

function AdsTxtPage() {
  const [content, setContent] = useState("");

  useEffect(() => {
    getAdsTxt()
      .then(setContent)
      .catch(() => setContent(""));
  }, []);

  return (
    <pre className="m-0 min-h-screen whitespace-pre-wrap break-words bg-white p-0 font-mono text-sm leading-6 text-slate-950">
      {content}
    </pre>
  );
}

export default AdsTxtPage;
