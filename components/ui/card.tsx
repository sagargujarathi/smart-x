import { FC, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-zinc-800/60 rounded-lg ${className}`}>{children}</div>
  );
};
