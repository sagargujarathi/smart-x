import Link from "next/link";

interface AwarenessCardProps {
  title: string;
  description: string;
  link: string;
}

export const AwarenessCard = ({
  title,
  description,
  link,
}: AwarenessCardProps) => {
  return (
    <Link
      href={link}
      className="block bg-zinc-700/50 rounded-lg p-4 hover:bg-zinc-700/70 transition-colors"
    >
      <h3 className="text-white font-medium">{title}</h3>
      <p className="text-zinc-400 text-sm mt-1">{description}</p>
      <span className="text-primary-100 text-sm mt-2 inline-block">
        Learn more →
      </span>
    </Link>
  );
};
