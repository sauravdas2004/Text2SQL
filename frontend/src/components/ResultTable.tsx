import ExportButton from "./ExportButton";
import type { QueryResult } from "../types";

type Props = {
  result: QueryResult | null;
};

export default function ResultTable({ result }: Props) {
  if (!result) return null;

  return (
      <div className="px-6 py-5 border-b border-zinc-800 flex justify-between items-center">

        <h2 className="text-xl font-bold">
          Query Results
        </h2>

        <div className="flex items-center gap-3">

          <span className="rounded-full bg-blue-600 px-3 py-1 text-sm">
            {result.rows.length} Rows
          </span>

          <ExportButton
            columns={result.columns}
            rows={result.rows}
          />

      </div>

      <div className="overflow-auto max-h-[137.5]">

        <table className="w-full border-collapse">

          <thead className="sticky top-0 bg-zinc-950">
            <tr>
              <th className="px-5 py-4 text-left border-b border-zinc-800">#</th>

              {result.columns.map((column) => (
                <th
                  key={column}
                  className="px-5 py-4 text-left border-b border-zinc-800 font-semibold"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {result.rows.map((row, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"}
              >
                <td className="px-5 py-3 border-b border-zinc-800">
                  {i + 1}
                </td>

                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-5 py-3 border-b border-zinc-800"
                  >
                    {String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}