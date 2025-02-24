import { useState, useEffect } from "react";

interface LeaderboardEntry {
  walletAddress: string;
  score: number;
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch("/api/clicks/leaderboard");
        if (!response.ok) throw new Error("Failed to fetch leaderboard");
        const data = await response.json();
        const leaderboardData = data.map((entry: any, index: number) => ({
          walletAddress: entry.walletAddress,
          score: entry._count.walletAddress,
        }));

        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return { leaderboard, loading };
}
