import React from "react";

const Header = () => {
  return (
    <header className="m-10 flex justify-center content-center flex-col">
      <img src="/images/logo_jogeuMarket.svg" alt="로고" className="w-40 mx-auto" />
      <nav className="text-center m-5">
        <a href="/"> Best |</a>
        <a href="/"> Brands |</a>
        <a href="/"> Products |</a>
        <a href="/"> Review</a>
      </nav>
    </header>
  );
};

export default Header; 
