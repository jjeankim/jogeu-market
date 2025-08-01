import { useForm } from "react-hook-form";
import CustomInput from "../ui/CustomInput";
import TestModalLayout from "./TestModalLayout";
import { changePassword } from "@/lib/apis/user";
import { useToast } from "@/hooks/useToast";
import Button from "../ui/Button";

interface TestModalLayoutProps {
  onClose: () => void;
}

export interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const TestModal = ({ onClose }: TestModalLayoutProps) => {
  const { showSuccess, showError } = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    clearErrors,
  } = useForm<ChangePasswordValues>({
    mode: "onSubmit",
  });

  const onSubmit = async (data: ChangePasswordValues) => {
    if (data.currentPassword === data.newPassword) {
      showError("현재 비밀번호와 새 비밀번호가 같습니다. 다른 비밀번호를 입력해주세요.");
      return;
    }
    const success = await changePassword(data);

    if (success) {
      showSuccess("비밀번호가 성공적으로 변경되었습니다.");
      onClose();
    } else {
      showError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <TestModalLayout onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <CustomInput
          type="password"
          id="currentPassword"
          label="현재 비밀번호"
          placeholder="현재 비밀번호"
          register={register("currentPassword", {
            required: "비밀번호는 필수입니다.",
            minLength: {
              value: 4,
              message: "비밀번호는 최소 4자 이상이어야 합니다.",
            },
          })}
          onChange={(e) => {
            clearErrors("currentPassword");
          }}
        />
        <CustomInput
          type="password"
          id="newPassword"
          label="새 비밀번호"
          placeholder="새 비밀번호"
          register={register("newPassword", {
            required: "비밀번호는 필수입니다.",
            minLength: {
              value: 4,
              message: "비밀번호는 최소 4자 이상이어야 합니다.",
            },
          })}
          onChange={(e) => {
            clearErrors("newPassword");
          }}
        />
        <CustomInput
          type="password"
          id="newPasswordConfirm"
          label="새 비밀번호 확인"
          placeholder="새 비밀번호 확인"
          register={register("newPasswordConfirm", {
            required: "비밀번호는 필수입니다.",
            minLength: {
              value: 4,
              message: "비밀번호는 최소 4자 이상이어야 합니다.",
            },
          })}
          onChange={(e) => {
            clearErrors("newPasswordConfirm");
          }}
        />
        <Button>변경하기</Button>
      </form>
    </TestModalLayout>
  );
};

export default TestModal;
