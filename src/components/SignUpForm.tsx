import React from "react";
import AuthFormLayout from "./ui/AuthFormLayout";
import CustomInput from "./ui/CustomInput";
import { useForm } from "react-hook-form";
import { AuthValues } from "./LoginForm";
import { useRouter } from "next/router";
import { useToast } from "@/hooks/useToast";
import axios from "axios";
import useAuthStore from "@/store/AuthStore";
import FormErrorText from "./FormErrorText";
import Button from "./ui/Button";
import AuthLink from "./ui/AuthLink";
import SocialLoginLink from "./SocialLoginLink";

const SignUpForm = () => {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    clearErrors,
    watch,
  } = useForm<AuthValues>({
    mode: "onSubmit",
  });

  const { signup } = useAuthStore();

  const password = watch("password");

  const onSubmit = async ({ email, password, name }: AuthValues) => {
    try {
      await signup({ email, password, name });
      showSuccess("회원가입에 성공했습니다.");
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) {
          showError("모든 필드를 입력해주세요.");
        } else if (status === 409) {
          showError("이미 존재하는 이메일입니다.");
        } else {
          showError("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
        showError(
          error?.response?.data.message || "회원가입 중 오류가 발생했습니다."
        );
      }
    }
  };

  return (
    <AuthFormLayout title="회원가입">
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
          onChange={() => clearErrors("email")}
        />
        {errors.email && <FormErrorText>{errors.email.message}</FormErrorText>}
        <CustomInput
          type="text"
          id="name"
          label="이름"
          placeholder="이름을 입력해주세요."
          register={register("name", {
            required: "이름은 필수입니다.",
            minLength: {
              value: 2,
              message: "이름은 최소 2자 이상이어야 합니다.",
            },
            maxLength: {
              value: 10,
              message: "이름은 최대 10자 이하여야 합니다.",
            },
          })}
        />
        {errors.name && <FormErrorText>{errors.name.message}</FormErrorText>}
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
          onChange={() => clearErrors("password")}
        />
        {errors.password && (
          <FormErrorText>{errors.password?.message}</FormErrorText>
        )}
        <CustomInput
          type="password"
          id="passwordConfirm"
          label="비밀번호 확인"
          placeholder="비밀번호 확인을 입력해주세요"
          register={register("passwordConfirm", {
            required: "비밀번호는 필수입니다.",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
          onChange={() => clearErrors("passwordConfirm")}
        />
        {errors.passwordConfirm && (
          <FormErrorText>{errors.passwordConfirm?.message}</FormErrorText>
        )}

        <Button type="submit" size="full" disabled={isSubmitting}>
          회원가입
        </Button>
      </form>
      <AuthLink
        link="/login"
        description="이미 회원이신가요?"
        linkTitle="로그인"
      />
      <SocialLoginLink />
    </AuthFormLayout>
  );
};

export default SignUpForm;
