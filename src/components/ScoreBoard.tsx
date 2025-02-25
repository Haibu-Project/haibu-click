import { ShimmerCard } from "./magicui/shimmer-button";

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <ShimmerCard className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 bg- bg-opacity-50 p-2 rounded select-none">
      <h2 className="text-5xl font-bold text-white text-center">
        Score: {score}
      </h2>
    </ShimmerCard>
  );
};

export default ScoreBoard;
