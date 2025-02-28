interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const Tabs = ({ value, onValueChange, children }: TabsProps) => {
  return <div>{children}</div>;
};

export const TabsList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex space-x-2 border-b border-zinc-700">{children}</div>
  );
};

export const TabsTrigger = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        value === "awareness"
          ? "text-white border-b-2 border-primary-100"
          : "text-zinc-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
};
