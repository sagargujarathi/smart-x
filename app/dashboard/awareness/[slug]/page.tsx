"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useState } from "react";
import { FaClock, FaShare, FaBookmark } from "react-icons/fa";
import { useParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { mockProgramDetail } from "@/mock/resourcesData";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

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
  const [program] = useState<IProgramDetailType>(mockProgramDetail);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    table({ children }: any) {
      return (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-700">
            {children}
          </table>
        </div>
      );
    },
    th({ children }: any) {
      return (
        <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-300 bg-zinc-800/50">
          {children}
        </th>
      );
    },
    td({ children }: any) {
      return (
        <td className="px-4 py-3 text-sm border-t border-zinc-800">
          {children}
        </td>
      );
    },
    blockquote({ children }: any) {
      return (
        <blockquote className="border-l-4 border-primary-100/50 pl-4 my-4 italic bg-zinc-900/50 py-2 pr-4 rounded-sm">
          {children}
        </blockquote>
      );
    },
    ul({ children }: any) {
      return <ul className="my-6 space-y-2">{children}</ul>;
    },
    ol({ children }: any) {
      return <ol className="my-6 space-y-2 list-decimal">{children}</ol>;
    },
    li({ children }: any) {
      return (
        <li className="flex space-x-3">
          <span className="text-primary-100/60">•</span>
          <span>{children}</span>
        </li>
      );
    },
    a({ href, children }: any) {
      return (
        <a
          href={href}
          className="text-primary-100 hover:text-primary-200 underline-offset-4 decoration-primary-100/30 hover:decoration-primary-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  };

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

          <div
            className="text-zinc-300 leading-relaxed prose prose-invert prose-zinc max-w-none 
               prose-headings:text-zinc-100 prose-headings:font-semibold
               prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
               prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3
               prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-2
               prose-p:my-4 prose-p:leading-7
               prose-a:text-primary-100 prose-a:no-underline hover:prose-a:underline
               prose-strong:text-zinc-200 prose-strong:font-semibold
               prose-code:text-primary-100 prose-code:bg-zinc-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
               prose-pre:bg-zinc-900/80 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-lg
               prose-img:rounded-lg prose-img:shadow-lg
               prose-blockquote:border-primary-100/30 prose-blockquote:bg-zinc-900/30
               prose-li:marker:text-primary-100/60"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {program.content || ""}
            </ReactMarkdown>
          </div>

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
