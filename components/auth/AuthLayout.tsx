import { ReactNode } from "react";
import Image from "next/image";
import { IMAGES } from "@/utils/images";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-zinc-900/40" />
        <Image
          src={IMAGES.auth.background}
          alt="Smart city background"
          className="object-cover"
          fill
          priority
        />
      </div>
    </div>
  );
}
