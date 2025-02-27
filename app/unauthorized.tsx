"use client";

import { ROUTER_LINKS } from "@/router-links";
import Link from "next/link";
import { HiLockClosed } from "react-icons/hi";

const UnAuthorized = () => {
  return (
    <main className="min-h-screen bg-[#0e0c0c] flex items-center justify-center">
      <section className="text-center" aria-labelledby="unauthorized-heading">
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-red-500/10">
            <HiLockClosed className="w-8 h-8 text-red-500" aria-hidden="true" />
          </div>
        </div>
        <p
          role="status"
          aria-label="Error code"
          className="mt-4 text-8xl font-semibold text-white/90"
        >
          401
        </p>
        <h1
          id="unauthorized-heading"
          className="mt-4 text-3xl font-bold tracking-tight text-white/80 sm:text-5xl"
        >
          Unauthorized Access
        </h1>
        <p className="mt-6 text-base leading-7 text-zinc-400">
          {"You don't have permission to access this page"}
        </p>
        <nav className="mt-10 space-x-4" aria-label="Error page navigation">
          <Link
            href={ROUTER_LINKS.SIGNIN}
            className="rounded-lg bg-primary-100 px-4 py-2.5 text-sm font-medium text-white 
            hover:bg-primary-200 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-300
            hover:bg-zinc-800/50 transition-colors"
          >
            Go back home
          </Link>
        </nav>
      </section>
    </main>
  );
};

export default UnAuthorized;
