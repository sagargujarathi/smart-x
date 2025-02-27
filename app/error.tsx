"use client";

import Link from "next/link";

const Error = () => (
  <main className="min-h-screen bg-[#0e0c0c] flex items-center justify-center">
    <section className="text-center" aria-labelledby="error-heading">
      <p
        role="status"
        aria-label="Error code"
        className="text-8xl font-semibold text-white/90"
      >
        500
      </p>
      <h1
        id="error-heading"
        className="mt-4 text-3xl font-bold tracking-tight text-white/80 sm:text-5xl"
      >
        Internal Error
      </h1>
      <p className="mt-6 text-base leading-7 text-zinc-400">
        Something is wrong from our side
      </p>
      <nav className="mt-10" aria-label="Error page navigation">
        <Link
          href="/"
          className="rounded-lg bg-primary-100 px-4 py-2.5 text-sm font-medium"
        >
          Go back home
        </Link>
      </nav>
    </section>
  </main>
);

export default Error;
