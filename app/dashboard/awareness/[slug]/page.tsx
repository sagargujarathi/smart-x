"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { FaClock, FaShare, FaBookmark } from "react-icons/fa";
import { useParams } from "next/navigation";
import Head from "next/head";
import { AwarenessProgram } from "@/types/resources";
import Image from "next/image";
import { mockProgramDetail } from "@/mock/resourcesData";

interface ProgramDetail extends AwarenessProgram {
  content: string;
  author: string;
  date: string;
}

interface IProgramDetailType {
  image: string;
  title: string;
  category: string;
  author: string;
  readTime: string;
  content: string;
  description: string;
}

export default function AwarenessProgramPage() {
  const params = useParams();
  const [program, setProgram] = useState<IProgramDetailType>(mockProgramDetail);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-400 p-8">
          <h2 className="text-xl font-bold">Error</h2>
          <p>{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading program details...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Head>
        <title>{program?.title} - Smart-X</title>
        <meta name="description" content={program?.description} />
      </Head>
      <DashboardLayout>
        <article className="max-w-4xl mx-auto space-y-6">
          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image
              fill
              src={program?.image}
              alt={program?.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <div className="inline-block px-3 py-1 bg-primary-100 text-white text-sm rounded-full mb-3">
                {program.category}
              </div>
              <h1 className="text-3xl font-bold text-white">{program.title}</h1>
            </div>
          </div>

          <div className="flex items-center justify-between text-zinc-400 text-sm">
            <div className="flex items-center gap-4">
              <span>{program.author}</span>
              <span>{new Date(program.date || "").toLocaleDateString()}</span>
              <span className="flex items-center gap-1">
                <FaClock className="h-4 w-4" />
                {program.readTime || ""} read
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                <FaBookmark className="h-4 w-4" />
              </button>
              <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                <FaShare className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="text-zinc-300 leading-relaxed" />
          {program.content || ""}

          <div className="bg-zinc-800/60 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-medium text-white mb-4">Take Action</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="w-full px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 transition-colors">
                Join Program
              </button>
              <button className="w-full px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors">
                Download Resources
              </button>
            </div>
          </div>
        </article>
      </DashboardLayout>
    </>
  );
}
