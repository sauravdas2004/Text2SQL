import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import api from "../services/api";

import Footer from "../components/Footer";
import QueryHistory from "../components/QueryHistory";
import EmptyState from "../components/EmptyState";
import StatsCards from "../components/StatsCards";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import QueryBox from "../components/QueryBox";
import SQLViewer from "../components/SQLViewer";
import ResultTable from "../components/ResultTable";

import type { QueryResult } from "../types";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [sql, setSql] = useState("");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  async function generateSQL() {
    if (!question.trim()) {
      toast.error("Please enter a question.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/text2sql", {
        question,
      });

      setSql(res.data.sql);

      setResult(res.data.result);

      setHistory((prev) => {
        const updated = [question, ...prev.filter((q) => q !== question)];
        return updated.slice(0, 10);
      });

      toast.success("SQL generated successfully!");
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.detail ??
            "The AI generated an invalid SQL query. Try rephrasing your question."
        );
      } else {
        toast.error("Something went wrong.");
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Navbar />
          <StatsCards />
        </motion.div>

        <QueryBox
          question={question}
          setQuestion={setQuestion}
          loading={loading}
          generateSQL={generateSQL}
        />

        {loading && <Loader />}

        {!sql ? (
            <EmptyState />
        ) : (
            <>
                <SQLViewer sql={sql} />
                <ResultTable result={result} />
                <QueryHistory
                  history={history}
                  onSelect={(query) => setQuestion(query)}
                />
            </>
        )}

        <Footer />

      </div>
    </div>
  );
}