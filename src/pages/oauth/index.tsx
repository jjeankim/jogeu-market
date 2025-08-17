import { useToast } from "@/hooks/useToast";
import { API_BASE_URL } from "@/lib/constants";
import useAuthStore from "@/store/AuthStore";
import axios from "axios";
import { useRouter } from "next/router"; // App Router 쓰시면 next/navigation
import { useEffect } from "react";

const KakaoCallback = () => {
  const router = useRouter();
  const { showError } = useToast();
  const setAuth = useAuthStore((s) => s.setAuth);
  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!router.isReady) return;
    const { code, state } = router.query as { code?: string; state?: string };
    if (!code) return;

    // (선택) CSRF 방지: state 검증
    const savedState =
      typeof window !== "undefined"
        ? sessionStorage.getItem("kakao_oauth_state")
        : null;
    if (savedState && state && savedState !== state) {
      showError("잘못된 인증 요청입니다. 다시 시도해주세요.");
      router.replace("/login");
      return;
    }

    (async () => {
      try {
        const res = await axios.post(
          `${API_BASE_URL}/api/auth/kakao`,
          { code },
          { withCredentials: true }
        );

        const { accessToken, user } = res.data;
        setAuth(accessToken, user?.name ?? null);

        router.replace("/");
      } catch (error) {
        console.error(error);
        showError("카카오 로그인 실패");
        router.replace("/login");
      }
    })();
  }, [router.isReady, router.query, router, setAuth, showError, apiBase]);

  return <p>카카오 로그인 처리 중...</p>;
};

export default KakaoCallback;