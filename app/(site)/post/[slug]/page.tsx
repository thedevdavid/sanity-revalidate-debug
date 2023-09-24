import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity.fetch';
import { PortableText } from '@portabletext/react';
import { Post } from '@/types';
import { postBySlugQuery } from '@/lib/sanity.queries';

type Props = {
  params: { slug: string };
};

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
