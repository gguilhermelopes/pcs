import toast, { ToastOptions } from "react-hot-toast";

const notify = (
  message: string,
  type: "success" | "error" | "warning" | "info",
  options?: ToastOptions
) => {
  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "warning":
      toast(message, { icon: "⚠️", ...options });
      break;
    case "info":
      toast(message, { icon: "ℹ", ...options });
      break;
    default:
      toast.success(message, options);
  }
};

export default notify;
