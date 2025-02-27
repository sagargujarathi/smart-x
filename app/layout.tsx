import { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
interface IRootLayoutType {
  children: ReactNode;
}

const RootLayout = ({ children }: IRootLayoutType) => {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
