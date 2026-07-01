import { Sparkles, Send } from "lucide-react";

type Props = {
  question: string;
  setQuestion: (value: string) => void;
  loading: boolean;
  generateSQL: () => void;
};

const exampleQueries = [
  "Show all students",
  "Students with CGPA above 8.5",
  "Show all Computer Science students",
  "Count students in each department",
];

export default function QueryBox({
  question,
  setQuestion,
  loading,
  generateSQL,
}: Props) {
  return (
    <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl shadow-2xl p-8">

      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-yellow-400" size={24} />
        <h2 className="text-2xl font-bold">
          AI Query
        </h2>
      </div>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Example: Show students with CGPA above 8.5"
        className="w-full h-40 rounded-2xl border border-zinc-700 bg-zinc-950 p-5 text-white placeholder:text-zinc-500 resize-none outline-none focus:border-blue-500 transition"
      />

      <div className="mt-5 flex flex-wrap gap-3">
        {exampleQueries.map((query) => (
          <button
            key={query}
            type="button"
            onClick={() => setQuestion(query)}
            className="rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm hover:bg-zinc-800 transition"
          >
            {query}
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={generateSQL}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={18} />

          {loading ? "🤖 AI is generating SQL..." : "Generate SQL"}
        </button>
      </div>

    </div>
  );
}