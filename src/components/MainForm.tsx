const Main = () => {
  return (
    <>
      <main className="m-15 mt-5 flex flex-col">
        <p className="h-[15rem] w-full mt-10 mb-30 bg-lime-50">
          여기가 배너이미지~~
        </p>

        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-5">BEST MD PICK!!</h2>
          <div className="flex flex-row gap-5 ">
            <div className="bg-yellow-50 w-[20rem] h-[20rem]">
              1번 제품 카드
            </div>
            <div className="bg-yellow-50 w-[20rem] h-[20rem]">
              2번 제품 카드
            </div>
            <div className="bg-yellow-50 w-[20rem] h-[20rem]">
              3번 제품 카드
            </div>
            <div className="bg-yellow-50 w-[20rem] h-[20rem]">
              4번 제품 카드
            </div>
          </div>
        </div>

        <div className="mb-15">
          <h2 className="text-2xl font-bold mb-5">NEW ARRIVAL</h2>
          <div className="flex flex-row gap-5 ">
            <div className="bg-blue-50 w-[20rem] h-[20rem]">1번 제품 카드</div>
            <div className="bg-blue-50 w-[20rem] h-[20rem]">2번 제품 카드</div>
            <div className="bg-blue-50 w-[20rem] h-[20rem]">3번 제품 카드</div>
            <div className="bg-blue-50 w-[20rem] h-[20rem]">4번 제품 카드</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
