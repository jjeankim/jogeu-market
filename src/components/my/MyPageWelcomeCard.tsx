import { FiStar } from "react-icons/fi";
import { LuTicketPercent } from "react-icons/lu";

const MyPageWelcomeCard = () => {
  return (
    <div className="border-2 rounded-2xl mb-30">
      <div className="p-16">
        <h3 className="text-4xl font-bold">
          <span className="text-[#B29977]">허영선</span> 님 환영합니다!
        </h3>
      </div>
      <div className="border-t-2 flex">
        <div className="flex-1 flex  p-16 justify-between items-center border-r-2">
          <LuTicketPercent size={30} />
          <span className="text-3xl font-bold">쿠폰</span>
          <span className="text-3xl font-bold">3개</span>
        </div>
        <div className="flex-1 flex p-16 justify-between items-center">
          <FiStar size={30} />
          <span className="text-3xl font-bold">포인트</span>
          <span className="text-3xl font-bold">30000 P</span>
        </div>
      </div>
    </div>
  );
};

export default MyPageWelcomeCard;
