"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";
import LoadingPage from "@/app/(loading)/loading";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";
import HTTPService from "@/services";
import { IUserDetailsType } from "@/types/auth";

interface IAuthProviderType {
  children: ReactNode;
}

interface IAuthContextType {
  data?: IUserDetailsType;
  isPending: boolean;
  removeCookie: (
    name: typeof ACCESS_TOKEN_KEY | typeof REFRESH_TOKEN_KEY,
    options?: CookieSetOptions
  ) => void;

  setCookie: (
    name: typeof ACCESS_TOKEN_KEY | typeof REFRESH_TOKEN_KEY,
    value: string,
    options?: CookieSetOptions
  ) => void;

  logout: () => void;
}

const DEFAULT_VALUE = {
  isPending: false,
  removeCookie: () => {},
  setCookie: () => {},
  logout: () => {},
};

const Context = createContext<IAuthContextType>(DEFAULT_VALUE);

export const useAuthContext = () => useContext(Context);

const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
  ]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["user", cookies[ACCESS_TOKEN_KEY]],
    queryFn: HTTPService.getUserDetails,
    enabled: !!cookies[ACCESS_TOKEN_KEY],
    staleTime: 5 * 60 * 1000,
  });

  const logout = () => {
    removeCookie(ACCESS_TOKEN_KEY, { path: "/" });
    removeCookie(REFRESH_TOKEN_KEY, { path: "/" });
  };

  useEffect(() => {
    if (isError) {
      removeCookie(ACCESS_TOKEN_KEY, { path: "/" });
      removeCookie(REFRESH_TOKEN_KEY, { path: "/" });
    }
  }, [isError, removeCookie]);

  if (cookies[ACCESS_TOKEN_KEY] && isPending) {
    return <LoadingPage />;
  }

  return (
    <Context.Provider
      value={{ data: data?.data, logout, isPending, removeCookie, setCookie }}
    >
      {children}
    </Context.Provider>
  );
};

const NoSSRClientProvider = dynamic(() => Promise.resolve(ClientProvider), {
  ssr: false,
});

const AuthProvider = ({ children }: IAuthProviderType) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <NoSSRClientProvider>{children}</NoSSRClientProvider>
    </Suspense>
  );
};

export default AuthProvider;
