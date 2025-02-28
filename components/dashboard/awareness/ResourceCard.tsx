import { FaClock, FaCalendar, FaUser } from "react-icons/fa";
import Link from "next/link";

interface ResourceCardProps {
  type: "program" | "scheme" | "blog";
  data: any;
}

export const ResourceCard = ({ type, data }: ResourceCardProps) => {
  const getCardContent = () => {
    switch (type) {
      case "program":
        return (
          <>
            <div className="relative h-40 rounded-t-lg overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 bg-primary-100 text-white px-2 py-1 rounded text-xs">
                {data.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">{data.title}</h3>
              <p className="text-zinc-400 text-sm mt-2">{data.description}</p>
              <div className="flex items-center mt-4 text-zinc-500 text-sm">
                <FaClock className="mr-2" />
                {data.readTime} read
              </div>
            </div>
          </>
        );

      case "scheme":
        return (
          <div className="p-4">
            <div
              className={`text-xs inline-block px-2 py-1 rounded-full ${
                data.status === "active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {data.status}
            </div>
            <h3 className="text-lg font-semibold text-white mt-3">
              {data.title}
            </h3>
            <p className="text-zinc-400 text-sm mt-2">{data.description}</p>
            <div className="flex items-center mt-4 text-zinc-500 text-sm">
              <FaCalendar className="mr-2" />
              Deadline: {new Date(data.deadline).toLocaleDateString()}
            </div>
          </div>
        );

      case "blog":
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">{data.title}</h3>
            <p className="text-zinc-400 text-sm mt-2">{data.excerpt}</p>
            <div className="flex items-center justify-between mt-4 text-zinc-500 text-sm">
              <div className="flex items-center">
                <FaUser className="mr-2" />
                {data.author}
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2" />
                {data.readTime}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Link
      href={data.link || "#"}
      className="block bg-zinc-800/60 rounded-lg hover:bg-zinc-700/60 transition-colors"
    >
      {getCardContent()}
    </Link>
  );
};
