const SocialLoginLink = () => {
  const handleKakaoLogin = () => {
    const base = "https://kauth.kakao.com/oauth/authorize";
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
      response_type: "code",
      scope: "profile_nickname",
    });
    window.location.href = `${base}?${params.toString()}`;
  };

  const handleNaverLogin = () => {
    const base = "https://nid.naver.com/oauth2.0/authorize";
    const params = new URLSearchParams({
      response_type: "code",
      client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI!,
      state: crypto.randomUUID(), // CSRF 방지용
    });
    window.location.href = `${base}?${params.toString()}`;
  };
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
        <button
          type="button"
          className="rounded-[10px] w-50 h-12 bg-[url('/images/naver_logo.png')] bg-no-repeat bg-center bg-cover cursor-pointer"
          onClick={handleNaverLogin}
        />

        <button
          type="button"
          className="rounded-[10px] w-50 h-12 bg-[url('/images/kakao_logo.png')] bg-no-repeat bg-[position:1rem_center] bg-cover cursor-pointer"
          onClick={handleKakaoLogin}
        />
      </div>
    </div>
  );
};

export default SocialLoginLink;
