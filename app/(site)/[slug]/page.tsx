import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity.fetch';
import { PortableText } from '@portabletext/react';
import { Page, Post } from '@/types';
import { pageBySlugQuery, postBySlugQuery } from '@/lib/sanity.queries';

type Props = {
  params: { slug: string };
};

export default async function SimplePage({ params }: Props) {
  const page = await sanityFetch<Page>({
    query: pageBySlugQuery,
    params: { slug: params.slug },
    tags: [`page:${params.slug}`],
  });

  if (!page) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold">{page.title}</h1>
      <pre>{page._updatedAt}</pre>
      <PortableText value={page.content} />
    </div>
  );
}
