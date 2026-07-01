export interface QueryResult {
  columns: string[];
  rows: (string | number | boolean | null)[][];
}