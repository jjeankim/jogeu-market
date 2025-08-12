import { toast, ToastPosition } from "react-hot-toast";
import { useCallback, useMemo } from "react";

export const useToast = () => {
  const baseOptions = useMemo(
    () => ({
      duration: 2000,
      position: "top-center" as ToastPosition,
      style: {
        padding: "1.2rem",
        borderRadius: "0.8rem",
        marginTop: "15rem",
        fontSize: "1rem",
        textAlign: "center" as const,
      },
    }),
    []
  );

  const showSuccess = useCallback(
    (msg: string) => {
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
    },
    [baseOptions]
  );

  const showError = useCallback(
    (msg: string) => {
      toast.dismiss();
      toast.error(msg, {
        ...baseOptions,
        style: {
          ...baseOptions.style,
          border: "1px solid #ff472e",
          color: "#ff472e",
        },
      });
    },
    [baseOptions]
  );

  const notify = useCallback(
    (msg: string) => {
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
    },
    [baseOptions]
  );

  return { showError, showSuccess, notify };
};
