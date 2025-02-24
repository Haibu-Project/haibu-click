interface LeaderboardProps {
  scores: { walletAddress: string; score: number }[];
}

export default function Leaderboard({ scores }: LeaderboardProps) {
  return (
    <div className="absolute top-10 right-10 bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-2">Leaderboard</h2>
      <ul>
        {scores.length === 0 ? (
          <li className="text-gray-500">Loading...</li>
        ) : (
          scores.map((entry, index) => (
            <li key={entry.walletAddress} className="text-sm">
              {index + 1}. {entry.walletAddress.substring(0, 6)}... - {entry.score} pts
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
