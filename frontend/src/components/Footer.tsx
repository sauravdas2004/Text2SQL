export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800 py-10 text-center text-zinc-500">
      <p className="font-semibold">
        AI Powered Text2SQL
      </p>

      <p className="mt-2 text-sm">
        Built with React • TypeScript • FastAPI • PostgreSQL • Ollama
      </p>
    </footer>
  );
}