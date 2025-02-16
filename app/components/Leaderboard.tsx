import React from "react";

interface LeaderboardProps {
  scores: { name: string; score: number }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ scores }) => {
  return (
    <div className="absolute top-0 right-0 m-4 p-4 bg-white bg-opacity-50 rounded shadow w-64 select-none">
      <h2 className="text-2xl font-bold text-center mb-4 text-black">Leaderboard</h2>
      <ul>
        {scores.map((player, index) => (
          <li key={index} className="flex justify-between py-1 text-black">
            <span className="font-semibold">{player.name}</span>
            <span>{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
