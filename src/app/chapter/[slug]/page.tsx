import { getChapter } from '@/lib/contentful';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

type Props = {
  params: { slug: string };
};

export default async function ChapterPage({ params }: Props) {


  const getTextContent = (node: any): string => {
    if (!node) return '';
    if (node.nodeType === 'text') return node.value;
    if (node.content) return node.content.map(getTextContent).join('');
    return '';
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{chapter.fields.title}</h1>
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
