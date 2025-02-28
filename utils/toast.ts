import { toast } from "react-hot-toast";

export const Toast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast.custom(message),
};
