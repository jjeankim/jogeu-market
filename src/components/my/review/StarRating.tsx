import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface StarRatingProps {
  rating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating = 0 }) => {
  const stars = [];



  // rating - i <= 0.5  기준으로 별 상태 반영
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // 꽉찬별
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (rating >= i - 0.5) {
      // 반별
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      // 내림
      stars.push(<FaRegStar key={i} className="text-yellow-500" />);
    }
  }

  return (
    <>
      <div className="flex space-x-1">{stars}</div>
    </>
  );
};

export default StarRating;
