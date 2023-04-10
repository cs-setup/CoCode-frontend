import React, { useState, useEffect } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";
import EditorHeader from "../../components/EditorHeader";

const Editor = () => {
  const [vd, setVd] = useState(null);
  useEffect(() => {
    const vditor = new Vditor("vditor", {
      after: () => {
        setVd(vditor);
      },
      mode: "ir",
      width: "100%",
      height: "calc(100vh - 64px)",
      placeholder: "记录点什么吧...",
      cache: {
        enable: false,
      },
      preview: {
        actions: [],
        maxWidth: "900",
        mode: "both",
        hljs: {
          enable: true,
          style: "github",
          lineNumber: true,
        },
      },
      counter: {
        enable: true,
      },
      toolbar: [
        "emoji",
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "|",
        "list",
        "ordered-list",
        "check",
        "outdent",
        "indent",
        "|",
        "quote",
        "line",
        "code",
        "inline-code",
        "insert-before",
        "insert-after",
        "|",
        "table",
        "|",
        "undo",
        "redo",
        "|",
        "fullscreen",
        "edit-mode",
      ],
    });
  }, []);
  return (
    <>
      <EditorHeader></EditorHeader>
      <div id="vditor" className="vditor" />
    </>
  );
};

export default Editor;
