import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useAuthStore from "@/store/AuthStore";
import { useToast } from "@/hooks/useToast";

const NaverCallback = () => {
  const router = useRouter();
  const { showError } = useToast();
  const setAuth = useAuthStore((s) => s.setAuth);
  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!router.isReady) return;
    const { code, state } = router.query as { code?: string; state?: string };
    if (!code) return;

    (async () => {
      try {
        const res = await axios.post(
          `${apiBase}/api/auth/naver`,
          { code, state },
          { withCredentials: true }
        );
        const { accessToken, user } = res.data;
        setAuth(accessToken, user?.name ?? null);
        router.replace("/");
      } catch (e) {
        console.error(e);
        showError("네이버 로그인 실패");
        router.replace("/login");
      }
    })();
  }, [router.isReady, router.query, apiBase, setAuth, showError, router]);

  return <p>네이버 로그인 처리 중...</p>;
};

export default NaverCallback;
