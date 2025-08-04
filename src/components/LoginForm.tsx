import { useForm } from "react-hook-form";
import CustomInput from "./ui/CustomInput";
import useAuthStore from "@/store/AuthStore";
import { useRouter } from "next/router";
import Button from "./ui/Button";
import AuthLink from "./ui/AuthLink";
import { useToast } from "@/hooks/useToast";
import axios from "axios";
import SocialLoginLink from "./SocialLoginLink";
import AuthFormLayout from "./ui/AuthFormLayout";
import FormErrorText from "./FormErrorText";

export interface AuthValues {
  email: string;
  password: string;
  name?: string;
  phoneNumber?: string;
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

  const onSubmit = async ({ email, password }: AuthValues) => {
    try {
      await login({ email, password });
      router.push("/");
      showSuccess("로그인에 성공했습니다.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showError(
          error.response?.data.message || "로그인 중 오류가 발생했습니다."
        );
      }
    }
  };

  return (
    <AuthFormLayout title="로그인">
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
            // register("email").onChange(e);
          }}
        />
        {errors.email && <FormErrorText>{errors.email.message}</FormErrorText>}
        <CustomInput
          type="password"
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          register={register("password", {
            required: "비밀번호는 필수입니다.",
            minLength: {
              value: 4,
              message: "비밀번호는 최소 4자 이상이어야 합니다.",
            },
          })}
          onChange={(e) => {
            clearErrors("password");
            // register("password").onChange(e);
          }}
        />
        {errors.password && (
          <FormErrorText>{errors.password.message}</FormErrorText>
        )}
        <Button type="submit" disabled={isSubmitting}>
          로그인
        </Button>
      </form>
      <AuthLink
        link="/signup"
        description="아직 회원이 아니신가요?"
        linkTitle="회원가입"
      />
      <SocialLoginLink />
    </AuthFormLayout>
  );
};

export default LoginForm;
