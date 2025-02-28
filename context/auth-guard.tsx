"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ROUTER_LINKS } from "@/router-links";
import { useAuthContext } from "./auth-context";

interface IAuthGuardType {
  children: ReactNode;
}

const GUEST_PAGES = [
  ROUTER_LINKS.SIGNIN,
  ROUTER_LINKS.SIGNUP,
  ROUTER_LINKS.FORGOT_PASSWORD,
  ROUTER_LINKS.NOT_FOUND,
];

const AuthGuard = ({ children }: IAuthGuardType) => {
  const { data } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      !data?.username &&
      !GUEST_PAGES.some((path) => {
        if (path === ROUTER_LINKS.ROOT) return pathname === path;
        return pathname.includes(path);
      })
    )
      router.push(ROUTER_LINKS.SIGNIN);
  }, [data, pathname, router]);

  return <>{children}</>;
};

export default AuthGuard;
