import React from "react";

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className="absolute top-0 right-0 m-4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Score: {score}</h2>
    </div>
  );
};

export default ScoreBoard;
