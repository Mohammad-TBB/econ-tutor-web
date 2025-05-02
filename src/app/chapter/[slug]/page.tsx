import { getChapter } from '@/lib/contentful';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const chapter = await getChapter(params.slug);

  const title =
    typeof chapter?.fields?.Title === 'string'
      ? chapter.fields.Title
      : 'Untitled Chapter';

  // Ensure .content is a rich text object
  const contentBlocks =
    Array.isArray((chapter?.fields?.content as any)?.content)
      ? (chapter.fields.content as any).content
      : [];

  const getTextContent = (node: any): string => {
    if (!node) return '';
    if (node.nodeType === 'text') return node.value;
    if (node.content) return node.content.map(getTextContent).join('');
    return '';
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {contentBlocks.map((block: any, index: number) => (
        <ReactMarkdown
          key={index}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {getTextContent(block)}
        </ReactMarkdown>
      ))}
    </main>
  );
}
