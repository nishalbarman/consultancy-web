import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function RichTextEditor({ value, onChange, placeholder }) {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  useEffect(() => {
    if (editorRef.current) return;

    const quill = new Quill(containerRef.current, {
      theme: "snow",
      placeholder: placeholder || "Write your page content...",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
      },
    });

    if (value) quill.root.innerHTML = value;

    quill.on("text-change", () => {
      onChangeRef.current(quill.root.innerHTML);
    });

    editorRef.current = quill;
  }, []);

  useEffect(() => {
    const quill = editorRef.current;
    if (!quill) return;
    const current = quill.root.innerHTML;
    if (value !== current) {
      quill.root.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <style>{`
        .quill-editor .ql-container { font-size: 14px; font-family: inherit; border: none !important; }
        .quill-editor .ql-editor { min-height: 300px; padding: 16px; }
        .quill-editor .ql-editor.ql-blank::before { font-style: normal; color: #94a3b8; }
        .quill-editor .ql-toolbar { border: none !important; border-bottom: 1px solid #e2e8f0 !important; background: #f8fafc; border-radius: 0; }
        .quill-editor .ql-toolbar button { color: #475569; }
        .quill-editor .ql-toolbar button:hover { color: #0f172a; }
        .quill-editor .ql-toolbar .ql-stroke { stroke: #475569; }
        .quill-editor .ql-toolbar .ql-fill { fill: #475569; }
        .quill-editor .ql-toolbar button:hover .ql-stroke { stroke: #0f172a; }
        .quill-editor .ql-toolbar button:hover .ql-fill { fill: #0f172a; }
        .quill-editor .ql-toolbar .ql-active .ql-stroke { stroke: #0f172a; }
        .quill-editor .ql-toolbar .ql-active .ql-fill { fill: #0f172a; }
      `}</style>
      <div className="quill-editor" ref={containerRef} />
    </div>
  );
}

export default RichTextEditor;
