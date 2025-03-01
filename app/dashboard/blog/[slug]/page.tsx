"use client";

import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useState, useEffect } from "react";
import {
  FaClock,
  FaUser,
  FaTag,
  FaShare,
  FaBookmark,
  FaThumbsUp,
} from "react-icons/fa";
import Link from "next/link";
import { POSTS } from "@/mock/resourcesData";
import LoadingPage from "@/app/(loading)/loading";
import { useParams } from "next/navigation";
import { MarkdownContent } from "@/components/shared/markdown-content";

interface RelatedPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
}

export default function BlogPostPage() {
  const params = useParams() as unknown as { slug: string };
  const [post, setPost] = useState<(typeof POSTS)[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  console.log(params);

  useEffect(() => {
    // Simulate API call - replace with actual data fetch
    const foundPost = POSTS.find((post) => post.id === Number(params.slug));
    setPost(foundPost);

    setRelatedPosts([POSTS[2]]);

    setLoading(false);
  }, [params.slug]);

  if (loading || !post) {
    return <LoadingPage />;
  }

  return (
    <DashboardLayout>
      <article className="max-w-4xl mx-auto space-y-6">
        <Link
          href="/dashboard/blog"
          className="text-primary-100 hover:text-primary-200 mb-6 inline-block"
        >
          ← Back to Blog
        </Link>

        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src={post?.image}
            alt={post?.title}
            className="object-cover"
            fill
            priority
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-sm">
            <div className="flex items-center gap-2">
              <FaUser className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTag className="h-4 w-4" />
              <span>{post.category}</span>
            </div>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
              <FaThumbsUp className="h-4 w-4" />
              <span>Like</span>
            </button>
            <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <FaBookmark className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
              <FaShare className="h-4 w-4" />
            </button>
          </div>
        </div>

        <MarkdownContent content={post.content || ""} />

        <div className="border-t border-zinc-800 pt-8 mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost: any) => (
              <Link
                key={relatedPost.id}
                href={`/dashboard/blog/${relatedPost.id}`}
                className="block bg-zinc-800/60 p-4 rounded-lg hover:bg-zinc-700/60 transition-colors"
              >
                <h4 className="text-white font-medium">{relatedPost.title}</h4>
                <p className="text-zinc-400 text-sm mt-2">
                  {relatedPost.excerpt}
                </p>
                <div className="text-zinc-500 text-sm mt-2">
                  {new Date(relatedPost.date).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </DashboardLayout>
  );
}
