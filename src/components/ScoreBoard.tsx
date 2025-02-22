import React from "react";

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-white bg-opacity-50 p-2 rounded select-none">
      <h2 className="text-5xl font-bold text-black text-center">
        Score: {score}
      </h2>
    </div>
  );
};

export default ScoreBoard;
