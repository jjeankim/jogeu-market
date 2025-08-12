import React from "react";

const Spinner = () => {
  return (
    <div className="loader-wrapper relative h-10 my-10">
      <div className="loader-container absolute flex flex-col items-center m-0 -mr-[50%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transform">
        <div className="ball loader flex">
          <div
            className="w-[15px] h-[15px] mr-2 rounded-lg bg-[#fdc391] animate-spinBall1"
            style={{ animationDelay: "0.24s" }}
          ></div>
          <div
            className="w-[15px] h-[15px] mr-2 rounded-lg bg-[#cbe5cc] animate-spinBall2"
            style={{ animationDelay: "0.12s" }}
          ></div>
          <div
            className="w-[15px] h-[15px] rounded-lg bg-[#fdf0c7] animate-spinBall3"
            style={{ animationDelay: "0s" }}
          ></div>
        </div>
        <span className="text-logo font-medium mt-2">LOADING</span>
      </div>
    </div>
  );
};

export default Spinner;
