import { useForm } from "react-hook-form";
import CustomInput from "./ui/CustomInput";
import useAuthStore from "@/store/AuthStore";
import { useRouter } from "next/router";
import Button from "./ui/Button";
import AuthLink from "./ui/AuthLink";
import { useToast } from "@/hooks/useToast";
import axios from "axios";

interface AuthValues {
  email: string;
  password: string;
  name?: string;
  phoneNumbr?: string;
}

const LoginForm = () => {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    clearErrors,
  } = useForm<AuthValues>({
    mode: "onSubmit",
  });

  const { login } = useAuthStore();

  const onSubmit = async (data: AuthValues) => {
    try {
      const token = await login(data.email, data.password);
      router.push("/");
      showSuccess("로그인에 성공했습니다.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showError(error.response?.data.message);
      } else {
        const msg = "알 수 없는 오류가 발생했습니다.";

        showError(msg);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-10">로그인</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            type="text"
            id="email"
            label="이메일"
            placeholder="이메일을 입력해주세요"
            register={register("email", {
              required: "이메일은 필수입니다.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            })}
            onChange={(e) => {
              clearErrors("email");
              register("email").onChange(e);
            }}
          />
          {errors.email && (
            <p className="text-red-600 inline-block mb-4">
              {errors.email.message}
            </p>
          )}

          <CustomInput
            type="password"
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            register={register("password", {
              required: "비밀번호는 필수입니다.",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 4자 이상이어야 합니다.",
              },
            })}
            onChange={(e) => {
              clearErrors("password");
              register("password").onChange(e);
            }}
          />
          {errors.password && (
            <p className="text-red-600 inline-block mb-4">
              {errors.password.message}
            </p>
          )}
          <Button type="submit" disabled={isSubmitting}>
            로그인
          </Button>
        </form>
        <AuthLink
          link="/signup"
          descripton="아직 회원이 아니신가요?"
          linkTitle="회원가입"
        />
      </div>
    </div>
  );
};

export default LoginForm;
