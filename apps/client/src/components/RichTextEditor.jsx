import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function RichTextEditor({ value, onChange, placeholder }) {
  const containerRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current || !containerRef.current) return;

    const editor = new Quill(containerRef.current, {
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

    if (value) {
      editor.clipboard.dangerouslyPasteHTML(value);
    }

    editor.on("text-change", () => {
      const html = editor.root.innerHTML;
      if (onChange) onChange(html);
    });

    editorRef.current = editor;

    return () => {
      editorRef.current = null;
    };
  }, []);

  return <div ref={containerRef} />;
}

export default RichTextEditor;
