import Link from 'next/link';
import { getAllChapters } from '@/lib/contentful';

export default async function Home() {
  const chapters = await getAllChapters();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Economics Tutor</h1>
      <ul className="space-y-2">
        {chapters.map((chapter: any) => {
          const rawTitle = chapter.fields?.Title || 'Untitled';
          const slug = rawTitle.replace(/\s+/g, '-').toLowerCase();

          return (
            <li key={chapter.sys.id}>
              <Link
                href={`/chapter/${slug}`}
                className="text-blue-600 hover:underline"
              >
                {rawTitle}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
