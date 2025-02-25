import { useState, useEffect } from "react";

interface LeaderboardEntry {
  walletAddress: string;
  username: string;
  totalClicks: number;
  jarClicks: number;
  score: number;
  username: string;
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clicks/leaderboard`);
        if (!response.ok) throw new Error("Failed to fetch leaderboard");

        const data: LeaderboardEntry[] = await response.json();
        setLeaderboard(data);
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