import { ReactNode } from "react";
import "./globals.css";
import AuthProvider from "@/context/auth-context";
import QueryProvider from "@/context/query-provider";
import AuthGuard from "@/context/auth-guard";
interface IRootLayoutType {
  children: ReactNode;
}

const RootLayout = ({ children }: IRootLayoutType) => {
  return (
    <html>
      <body>
        <QueryProvider>
          <AuthProvider>
            <AuthGuard>{children}</AuthGuard>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
