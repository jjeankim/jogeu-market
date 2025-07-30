import { ReactNode } from "react";

const FormErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-red-600 inline-block mb-4">{children}</p>;
};

export default FormErrorText;
