import Link from "next/link";

const NotFound = () => (
  <div className="min-h-screen bg-[#0e0c0c] flex items-center justify-center">
    <div className="text-center">
      <p className="text-8xl font-semibold text-white/90">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white/80 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-6 text-base leading-7 text-zinc-400">
        {"Sorry, we couldn't find the page you're looking for."}
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="rounded-lg bg-primary-100 px-4 py-2.5 text-sm font-medium"
        >
          Go back home
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
