import { ShimmerCard } from "./magicui/shimmer-button";
import { useAddress } from "@chopinframework/react";


interface LeaderboardProps {
  scores: { walletAddress: string; username: string; totalClicks: number; jarClicks: number; score: number }[];
}

export default function Leaderboard({ scores }: LeaderboardProps) {
  const { logout } = useAddress();

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0:
        return "bg-amber-400 text-white font-bold px-3 py-1 rounded-full shadow-sm";
      case 1:
        return "bg-gray-300 text-white font-bold px-3 py-1 rounded-full shadow-sm";
      case 2:
        return "bg-amber-700 text-white font-bold px-3 py-1 rounded-full shadow-sm";
      default:
        return "bg-blue-400/20 text-white font-bold px-3 py-1 rounded-full";
    }
  };

  return (
    <ShimmerCard className="absolute flex flex-col top-10 right-10 overflow-hidden rounded-2xl w-[25rem] h-[20rem] border border-white/20 shadow-lg">
        <h2 className="text-xl mb-3 font-bold text-white">Leaderboard</h2>
      <div className="bg-[#186CBD] rounded-xl flex-1 p-4">
        {scores.length === 0 ? (
          <div className="text-white/60">Loading...</div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <table className="w-full">
              <tbody>
                {scores.map((entry, index) => (
                  <tr key={entry.walletAddress} className="text-sm text-white">
                    <td className="py-1.5 pr-3 w-16">
                      <span className={getRankStyle(index)}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="py-1.5">{entry.username}</td>
                    <td className="py-1.5 text-right">
                      <span className="font-mono">{entry.score.toLocaleString()}</span>
                      <span className="text-yellow-300 ml-2">
                        ({entry.jarClicks} 🍯)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button className="" onClick={()=>logout}>logout</button>
      </div>
    </ShimmerCard>
  );
}
