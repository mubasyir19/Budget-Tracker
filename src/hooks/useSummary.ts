import { Summary } from "@/types/summary";
import { useEffect, useState } from "react";

export function useSummary() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //   const fetchSummary = async () => {
    async function fetchSummary() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BUDGET}/summary`,
          {
            credentials: "include",
          },
        );
        const data = await res.json();
        setSummary(data.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  return { summary, loading, error };
}
