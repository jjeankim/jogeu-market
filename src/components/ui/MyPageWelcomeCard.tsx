import { FiStar } from "react-icons/fi";
import { LuTicketPercent } from "react-icons/lu";


const MyPageWelcomeCard = () => {
  return (
    <div className="border rounded-2xl">
      <div className="p-10">
        <h3 className="text-2xl font-bold">
          <span className="text-[#B29977]">허영선</span> 님 환영합니다!
        </h3>
      </div>
      <div className="border-t flex ">
        <div className="flex-1 flex  p-10 justify-between items-center border-r ">
          <LuTicketPercent size={20}/>
          <span className="font-bold">쿠폰</span>
          <span className="font-bold">3개</span>
        </div>
        <div className="flex-1 flex  p-10 justify-between items-center">
          <FiStar size={20}  />
          <span className="font-bold">포인트</span>
          <span className="font-bold">30000 P</span>
        </div>
      </div>
    </div>
  );
};

export default MyPageWelcomeCard;
