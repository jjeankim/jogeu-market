import { ReactNode } from "react";

const AuthFormLayout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthFormLayout;
