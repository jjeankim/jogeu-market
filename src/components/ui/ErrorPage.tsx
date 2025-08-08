import Image from "next/image";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";

interface ErrorButton {
  text: string;
}

interface ErrorConfigItem {
  title: string;
  message: string;
  messageKo: string;
  button: ErrorButton;
}

interface ErrorPageProps {
  code: number;
}

const errorConfig: Record<number, ErrorConfigItem> = {
  401: {
    title: "401 ERROR",
    message: "Authorization Required",
    messageKo: "이 페이지를 보려면 로그인이 필요합니다.",
    button: {
      text: "로그인 페이지로 이동",
    },
  },
  404: {
    title: "404 ERROR",
    message: "PAGE NOT FOUND",
    messageKo: "찾으시는 페이지가 존재하지 않습니다.",
    button: {
      text: "메인 페이지로 이동",
    },
  },
  500: {
    title: "500 ERROR",
    message: "Internal Server Error",
    messageKo: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    button: { text: "다시 시도하기" },
  },
};

const defaultConfig: ErrorConfigItem = {
  title: "일시적인 오류",
  message: "",
  messageKo: "잠시 후에 다시 시도해 주세요.",
  button: { text: "다시 시도하기" },
};

const ErrorPage = ({ code }: ErrorPageProps) => {
  const router = useRouter();
  const config = errorConfig[code] ?? defaultConfig;

  const handleButtonClick = () => {
    if (code === 404) {
      router.push("/");
    } else if (code === 401) {
      router.push("/login");
    } else if (code === 500) {
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center p-10">
        <Image
          width={300}
          height={300}
          src={"/images/errorIcon.png"}
          alt="error"
        />
        <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
        <h3 className="text-2xl mb-10">{config.message}</h3>
        <p className="text-xl mb-10">{config.messageKo}</p>
        <Button
          className="mb-10"
          variant="filled"
          size="lg"
          color="gold"
          onClick={handleButtonClick}
        >
          {config.button.text}
        </Button>
      </div>
    </>
  );
};

export default ErrorPage;
