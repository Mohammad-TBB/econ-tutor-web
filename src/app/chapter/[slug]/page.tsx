import { getChapter, getAllChapters } from '@/lib/contentful';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const chapters = await getAllChapters();

  return chapters.map((chapter: any) => {
    const title = chapter.fields?.Title || 'untitled';
    const slug = title.replace(/\s+/g, '-').toLowerCase();
    return { slug };
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Chapter - ${params.slug}`,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: { slug: string };
}) {
  const chapter = await getChapter(params.slug);

  const title =
    typeof chapter?.fields?.Title === 'string'
      ? chapter.fields.Title
      : 'Untitled Chapter';

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
