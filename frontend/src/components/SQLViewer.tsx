import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  sql: string;
};

export default function SQLViewer({ sql }: Props) {
  const [copied, setCopied] = useState(false);

  if (!sql) return null;

  const copySQL = async () => {
    await navigator.clipboard.writeText(sql);

    setCopied(true);
    toast.success("SQL copied!");

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/70 shadow-2xl overflow-hidden">

      <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">

        <h2 className="text-xl font-bold">
          Generated SQL
        </h2>

        <button
          onClick={copySQL}
          className="flex items-center gap-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-4 py-2 transition"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? "Copied" : "Copy"}
        </button>

      </div>

      <SyntaxHighlighter
        language="sql"
        style={oneDark}
        customStyle={{
          margin: 0,
          background: "#09090b",
          fontSize: "15px",
          padding: "20px",
        }}
      >
        {sql}
      </SyntaxHighlighter>

    </div>
  );
}