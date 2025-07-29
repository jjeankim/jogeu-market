import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="m-10 flex justify-center items-center flex-col">
      <div className="flex justify-center items-center">
        <Image width={150} height={1} src="/images/logo_jogeuMarket.svg" alt="로고"/>
      </div>
      <nav className="text-center m-5">
        <Link href="/"> Best |</Link>
        <Link href="/"> Brands |</Link>
        <Link href="/"> Products |</Link>
        <Link href="/"> Review</Link>
      </nav>
    </header>
  );
};

export default Header; 
