import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const MarkdownComponents = {
    h1: ({ node, ...props }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-xl font-bold mt-4 mb-2" {...props} />
    ),
    p: ({ node, ...props }) => <p className="text-zinc-300 mb-4" {...props} />,
    a: ({ node, ...props }) => (
      <a
        className="text-primary-100 hover:text-primary-200 underline-offset-4 decoration-primary-100/30 hover:decoration-primary-200"
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="flex space-x-3">
        <span className="text-primary-100/60">•</span>
        <span>{props.children}</span>
      </li>
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-4 border-primary-100/50 pl-4 my-4 italic bg-zinc-900/50 py-2 pr-4 rounded-sm"
        {...props}
      />
    ),
    code: ({ node, inline, ...props }) =>
      inline ? (
        <code
          className="bg-zinc-800 px-1.5 py-0.5 rounded-md text-primary-100"
          {...props}
        />
      ) : (
        <code
          className="block bg-zinc-900/80 p-4 rounded-lg overflow-x-auto border border-zinc-800"
          {...props}
        />
      ),
    pre: ({ node, ...props }) => (
      <pre
        className="bg-zinc-900/80 p-4 rounded-lg overflow-x-auto my-4 border border-zinc-800"
        {...props}
      />
    ),
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-zinc-700" {...props} />
      </div>
    ),
    th: ({ node, ...props }) => (
      <th
        className="px-4 py-3 text-left text-sm font-semibold text-zinc-300 bg-zinc-800/50"
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td className="px-4 py-3 text-sm border-t border-zinc-800" {...props} />
    ),
  };

  return (
    <div className="prose prose-invert prose-zinc max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={MarkdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
