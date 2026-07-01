type Props = {
  history: string[];
  onSelect: (query: string) => void;
};

export default function QueryHistory({
  history,
  onSelect,
}: Props) {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Queries
      </h2>

      <div className="space-y-3">

        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item)}
            className="w-full text-left rounded-xl border border-zinc-800 px-4 py-3 hover:bg-zinc-800 transition"
          >
            {item}
          </button>
        ))}

      </div>

    </div>
  );
}