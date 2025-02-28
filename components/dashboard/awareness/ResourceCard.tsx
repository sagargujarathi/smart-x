import { AwarenessProgram, Scheme, BlogPost } from "@/types/awareness";
import { FaBookmark, FaClock, FaCalendar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface ResourceCardProps {
  type: "awareness" | "schemes" | "blog";
  data: AwarenessProgram | Scheme | BlogPost;
  onBookmark?: () => void;
}

export function ResourceCard({ type, data, onBookmark }: ResourceCardProps) {
  const isProgram = type === "awareness";
  const isScheme = type === "schemes";
  const isBlog = type === "blog";

  return (
    <div className="group relative bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
      {isProgram && "image" in data && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary-100/10 text-primary-100">
            {data.category}
          </span>
          {(isProgram || isBlog) && "readTime" in data && (
            <span className="flex items-center text-xs text-zinc-400">
              <FaClock className="mr-1 h-3 w-3" />
              {data.readTime}
            </span>
          )}
          {isScheme && "deadline" in data && (
            <span className="flex items-center text-xs text-zinc-400">
              <FaCalendar className="mr-1 h-3 w-3" />
              {new Date(data.deadline).toLocaleDateString()}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">{data.title}</h3>
        <p className="text-sm text-zinc-400 mb-4">
          {"description" in data ? data.description : data.excerpt}
        </p>

        <div className="flex items-center justify-between">
          {isProgram && "link" in data ? (
            <Link
              href={data.link}
              className="text-sm text-primary-100 hover:text-primary-200 transition-colors"
            >
              Learn more →
            </Link>
          ) : (
            <span className="text-sm text-zinc-500">
              {isBlog && "author" in data ? `By ${data.author}` : ""}
              {isScheme && "status" in data ? (
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    data.status === "active"
                      ? "bg-green-100/10 text-green-100"
                      : "bg-red-100/10 text-red-100"
                  }`}
                >
                  {data.status}
                </span>
              ) : null}
            </span>
          )}
          {onBookmark && (
            <button
              onClick={onBookmark}
              className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
            >
              <FaBookmark className="h-4 w-4 text-zinc-400 hover:text-primary-100" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
