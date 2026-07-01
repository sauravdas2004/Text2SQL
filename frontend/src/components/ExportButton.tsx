import type { QueryResult } from "../types";

type Props = {
  columns: QueryResult["columns"];
  rows: QueryResult["rows"];
};

export default function ExportButton({ columns, rows }: Props) {
  function exportCSV() {
    const csv = [
      columns.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "query_results.csv";

    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={exportCSV}
      className="rounded-lg bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-semibold"
    >
      Export CSV
    </button>
  );
}