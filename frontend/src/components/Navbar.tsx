import { Database, Cpu, Server, CheckCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl shadow-2xl p-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            AI Powered Text2SQL
          </h1>

          <p className="mt-3 text-zinc-400 text-lg">
            Convert natural language into SQL using AI.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="rounded-2xl bg-zinc-950 border border-zinc-800 px-5 py-4">

            <div className="flex items-center gap-3">

              <Database className="text-green-400" />

              <div>

                <p className="text-sm text-zinc-500">
                  Database
                </p>

                <div className="flex items-center gap-2">

                  <span className="font-semibold">
                    PostgreSQL
                  </span>

                  <CheckCircle2
                    size={18}
                    className="text-green-400"
                  />

                </div>

              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-zinc-950 border border-zinc-800 px-5 py-4">

            <div className="flex items-center gap-3">

              <Cpu className="text-blue-400" />

              <div>

                <p className="text-sm text-zinc-500">
                  AI Model
                </p>

                <div className="flex items-center gap-2">

                  <span className="font-semibold">
                    Qwen2.5
                  </span>

                  <CheckCircle2
                    size={18}
                    className="text-green-400"
                  />

                </div>

              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-zinc-950 border border-zinc-800 px-5 py-4">

            <div className="flex items-center gap-3">

              <Server className="text-purple-400" />

              <div>

                <p className="text-sm text-zinc-500">
                  Backend
                </p>

                <div className="flex items-center gap-2">

                  <span className="font-semibold">
                    FastAPI
                  </span>

                  <CheckCircle2
                    size={18}
                    className="text-green-400"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}