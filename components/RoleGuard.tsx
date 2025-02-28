import { USER_ROLE } from "@/constants/enums";
import { useAuthContext } from "@/context/auth-context";
import { ReactNode } from "react";

interface RoleGuardProps {
  allowedRoles: USER_ROLE;
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGuard({
  allowedRoles,
  children,
  fallback,
}: RoleGuardProps) {
  const { data } = useAuthContext();

  if (!data || !allowedRoles.includes(data.role_type)) {
    return fallback || null;
  }

  return <>{children}</>;
}
