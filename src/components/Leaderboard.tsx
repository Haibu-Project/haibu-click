import { ShimmerCard } from "./magicui/shimmer-button";

interface LeaderboardProps {
  scores: { walletAddress: string; totalClicks: number; jarClicks: number; score: number }[];
}

export default function Leaderboard({ scores }: LeaderboardProps) {
  return (
    <ShimmerCard className="absolute flex flex-col top-10 right-10 bg-gradient-to-t from-[#F49000] to-[#F9B742] p-6 shadow-lg  w-72">
      <h2 className="text-xl font-bold mb-3 text-white">Leaderboard</h2>
      <ul>
        {scores.length === 0 ? (
          <li className="text-gray-200 text-lg">Loading...</li>
        ) : (
          scores.map((entry, index) => (
            <li key={entry.walletAddress} className="text-md text-white">
              {index + 1}. {entry.walletAddress.substring(0, 6)}... - {entry.score} pts
              <span className="text-yellow-300"> ({entry.jarClicks} 🍯)</span>
            </li>
          ))
        )}
      </ul>
    </ShimmerCard>
  );
}
