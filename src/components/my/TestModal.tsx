// import { useForm } from "react-hook-form";
// import CustomInput from "../ui/CustomInput";
// import TestModalLayout from "./TestModalLayout";
// import { ReactNode } from "react";


// interface TestModalLayoutProps {
//   onClose: () => void;
// }

// interface ChangePasswordValues {
//   currentPassword: string;
//   newPassword: string;
//   newPasswordConfirm: string;
// }

// const TestModal = ({onClose}: TestModalLayoutProps) => {

//   const {
//     register,
//     handleSubmit,
//     formState: { isSubmitting, errors },
//     clearErrors,
//   } = useForm<ChangePasswordValues>({
//     mode: "onSubmit",
//   });



//   const onSubmit = (data: ChangePasswordValues) => {
//     console.log("비밀번호 변경 요청", data);
//     // 여기서 비밀번호 변경 API 호출 등 처리
//     onClose();
//   };
//   return (
//     <TestModalLayout onClose={onClose} >
//       <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
//         <CustomInput
//           type="text"
//           id="currentPassword"
//           label="현재 비밀번호"
//           placeholder="현재 비밀번호"
//           register={register("currentPassword", {
//             required: "비밀번호는 필수입니다.",
//             minLength: {
//               value: 4,
//               message: "비밀번호는 최소 4자 이상이어야 합니다.",
//             },
//           })}
//           onChange={(e) => {
//             clearErrors("currentPassword");
//           }}
//         />
//         <CustomInput
//           type="text"
//           id="newPassword"
//           label="새 비밀번호"
//           placeholder="새 비밀번호"
//           register={register("newPassword", {
//             required: "비밀번호는 필수입니다.",
//             minLength: {
//               value: 4,
//               message: "비밀번호는 최소 4자 이상이어야 합니다.",
//             },
//           })}
//           onChange={(e) => {
//             clearErrors("newPassword");
//           }}
//         />
//         <CustomInput
//           type="text"
//           id="newPasswordConfirm"
//           label="새 비밀번호 확인"
//           placeholder="새 비밀번호 확인"
//           register={register("newPasswordConfirm", {
//             required: "비밀번호는 필수입니다.",
//             minLength: {
//               value: 4,
//               message: "비밀번호는 최소 4자 이상이어야 합니다.",
//             },
//           })}
//           onChange={(e) => {
//             clearErrors("newPasswordConfirm");
//           }}
//         />
//       </form>
//     </TestModalLayout>
//   );
// };

// export default TestModal;
