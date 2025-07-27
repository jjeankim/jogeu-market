import Image from "next/image";

const SocialLoginLink = () => {
  return (
    <div>
      <div className="flex items-center my-8">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-400 font-semibold whitespace-nowrap text-sm">
          SNS 계정으로 로그인하기
        </span>
        <div className="flex-grow border-t border-gray-300" />
      </div>
      <div className="flex justify-center gap-5">
        <Image
          width={80}
          height={80}
          src="/images/logo_google.svg"
          alt="구글 이미지 링크"
        />
        <Image
          width={80}
          height={80}
          src="/images/logo_kakao.svg"
          alt="카카오 이미지 링크"
        />
      </div>
    </div>
  );
};

export default SocialLoginLink;
