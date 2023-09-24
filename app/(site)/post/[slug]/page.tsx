import { readToken } from '@/lib/sanity.api';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity.fetch';
import { PortableText } from '@portabletext/react';
import { Post } from '@/types';
import { postBySlugQuery, postPathsQuery } from '@/lib/sanity.queries';
import { Metadata } from 'next';
import { defineMetadata } from '@/lib/utils.metadata';
import { client } from '@/lib/sanity.client';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await sanityFetch<Post | null>({
    query: postBySlugQuery,
    params: { slug: params.slug },
    tags: [`post:${params.slug}`],
  });

  return defineMetadata({
    title: page?.title,
  });
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(postPathsQuery, {}, { token: readToken, perspective: 'published' });
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: Props) {
  const post = await sanityFetch<Post>({
    query: postBySlugQuery,
    params: { slug: params.slug },
    tags: [`post:${params.slug}`],
  });

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold">{post.title}</h1>
      <pre>{post._updatedAt}</pre>
      <PortableText value={post.content} />
    </div>
  );
}
export const dynamic = 'auto';
