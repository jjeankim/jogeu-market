import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const AuthFormLayout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen m-8">
      <div className="w-full max-w-xl">
        <div className="flex justify-center mb-24">
          <Link href={"/"}>
            <Image
              width={180}
              height={0}
              style={{ height: "auto" }}
              src={"/images/logo_jogeuMarket.svg"}
              alt="조그마켓 로고"
              priority
            />
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthFormLayout;
