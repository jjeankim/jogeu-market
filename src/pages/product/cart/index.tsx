const Index = () => {
  return (
    <div className="container mx-auto h-screen ">
      <h1 className="text-6xl text-center border-b-2 py-3 mb-3 border-gray-200">
        장바구니
      </h1>
      <div className="flex flex-col space-y-3">
        <div className="inline-flex rounded-xl bg-[#b29977]  px-6 py-1.5 w-fit text-lg">
          <span className="mr-1">일반 상품</span>
          <span>1</span>
        </div>
        <div className=" font-bold text-2xl">
          <div className="flex justify-between  ">
            <div>
              <input type="checkbox" className="mr-4 w-6 h-6 align-middle" />
              <span>전체 선택</span>
            </div>
            <span className="underline">선택 삭제</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 bg-blue-500 ">
          <div className=" bg-white rounded-lg h-64">상품 카드 자리</div>
          <div className="sticky  bg-white rounded-lg h-64">결제 자리</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
