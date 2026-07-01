import { Search } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="mt-10 rounded-3xl border border-dashed border-zinc-700 p-12 text-center">

      <Search
        size={60}
        className="mx-auto text-zinc-600"
      />

      <h2 className="mt-5 text-2xl font-bold">
        Ask your database anything
      </h2>

      <p className="text-zinc-500 mt-3">
        Examples:
      </p>

      <div className="mt-5 space-y-2 text-zinc-400">
        <p>Show all students</p>
        <p>Average CGPA department wise</p>
        <p>Show attendance below 75%</p>
        <p>Who teaches Operating Systems?</p>
      </div>

    </div>
  );
}