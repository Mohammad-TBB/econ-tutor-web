import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
});

export async function getAllChapters() {
  const entries = await client.getEntries({ content_type: 'Chapter' });
  return entries.items;
}

export async function getChapter(slug: string) {
  const entries = await client.getEntries({
    content_type: 'Chapter',
    'fields.Title': slug.replace(/-/g, ' '),
  });
  return entries.items[0];
}
