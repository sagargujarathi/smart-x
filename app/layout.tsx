import { ReactNode } from "react";
import "./globals.css";
import AuthProvider from "@/context/auth-context";
import QueryProvider from "@/context/query-provider";
interface IRootLayoutType {
  children: ReactNode;
}

const RootLayout = ({ children }: IRootLayoutType) => {
  return (
    <html>
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
