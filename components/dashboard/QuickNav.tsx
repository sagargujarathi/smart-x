import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface QuickNavProps {
  links: {
    href: string;
    label: string;
    description?: string;
  }[];
}

export const QuickNav = ({ links }: QuickNavProps) => {
  return (
    <div className="bg-zinc-800/60 rounded-lg p-4">
      <nav className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-2 px-4 py-2 rounded-md hover:bg-zinc-700/60 transition-colors"
          >
            <div>
              <span className="text-white">{link.label}</span>
              {link.description && (
                <p className="text-xs text-zinc-400">{link.description}</p>
              )}
            </div>
            <FaArrowRight className="h-4 w-4 text-primary-100 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </nav>
    </div>
  );
};
