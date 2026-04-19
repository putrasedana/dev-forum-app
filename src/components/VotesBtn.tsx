import { IconType } from "react-icons";

type VotesBtnProps = {
  handleClick: () => void;
  count: number;
  hasVoted: boolean;
  icon: IconType;
  votedColor: string;
};

const VotesBtn = ({ handleClick, count, hasVoted, icon: Icon, votedColor }: VotesBtnProps) => {
  const colorBase = votedColor.replace("text-", "").split("-")[0];

  const hoverTextColor = `hover:text-${colorBase}-400`;
  const hoverBgColor = `hover:bg-${colorBase}-500/10`;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center gap-1 rounded-full transition-all duration-200 cursor-pointer
        ${hasVoted ? `${votedColor} bg-${colorBase}-500/20` : `text-gray-400 ${hoverBgColor} ${hoverTextColor}`}
      `}
    >
      <Icon />
      <span className="text-sm">{count}</span>
    </button>
  );
};

export default VotesBtn;
