import { ACCESS_TOKEN_KEY } from "@/constants";
import { axiosInstance as instance } from "./instance";
import { AxiosRequestConfig } from "axios";

const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";");
  const cookie = cookies.find((c) => c.trim().startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
};

export const prepareHeader = () => {
  const token = getCookie(ACCESS_TOKEN_KEY);
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const HTTPClient = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const headers = prepareHeader();
    return instance.get(url, { headers, ...config });
  },

  post: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const headers = prepareHeader();
    return instance.post(url, config?.data, { headers, ...config });
  },

  put: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const headers = prepareHeader();
    return instance.put(url, config?.data, { headers, ...config });
  },

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const headers = prepareHeader();
    return instance.delete(url, { headers, ...config });
  },
};
