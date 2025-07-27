import { toast, ToastPosition } from "react-hot-toast";

export const useToast = () => {
  const baseOptions = {
    duration: 2000,
    position: "top-center" as ToastPosition,
    style: {
      padding: "1.2rem",
      borderRadius: "0.8rem",
      marginTop: "15rem",
      fontSize: "1rem",
    },
  };

  const showSuccess = (msg: string) => {
    toast.dismiss();
    toast.success(msg, {
      ...baseOptions,
      style: {
        ...baseOptions.style,
        border: "1px solid 405DE6",
        color: "#405DE6",
      },
      iconTheme: {
        primary: "#405DE6",
        secondary: "#ffffff",
      },
    });
  };

  const showError = (msg: string) => {
    toast.dismiss();
    toast.error(msg, {
      ...baseOptions,
      style: {
        ...baseOptions.style,
        border: "1px solid #ff472e",
        color: "#ff472e",
      },
    });
  };

  const notify = (msg: string) => {
    toast.dismiss();
    toast(msg, {
      ...baseOptions,
      icon: "🔔",
      style: {
        ...baseOptions.style,
        border: "1px solid #f89a05",
        color: "#f89a05",
      },
    });
  };

  return { showError, showSuccess, notify };
};
