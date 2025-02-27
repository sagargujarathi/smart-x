interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export const StatsCard = ({
  title,
  value,
  description,
  icon,
}: StatsCardProps) => {
  return (
    <div className="p-6 rounded-xl bg-secondary-100">
      <div className="flex items-start justify-between">
        {icon && <div className="p-2 bg-primary-100/10 rounded-lg">{icon}</div>}
        <div className={icon ? "ml-4" : ""}>
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
          {description && (
            <p className="mt-1 text-sm text-zinc-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
