import Link from "next/link";

interface AuthLinkProps {
  link: string;
  descripton: string;
  linkTitle: string;
}

const AuthLink = ({ link, descripton, linkTitle }: AuthLinkProps) => {
  return (
    <div className="flex gap-4 justify-center m-5">
      <p className="text-gray-400">{descripton}</p>
      <Link href={link} className="text-[#405DE6] underline underline-offset-4 ">
        {linkTitle}
      </Link>
    </div>
  );
};

export default AuthLink;
