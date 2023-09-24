import { sanityFetch } from '@/lib/sanity.fetch';
import { allPagesQuery, allPostsQuery } from '@/lib/sanity.queries';
import { Page, Post } from '@/types';
import Link from 'next/link';

export default async function Home() {
  const posts = await sanityFetch<Post[]>({
    query: allPostsQuery,
    tags: [`post`],
  });
  const pages = await sanityFetch<Page[]>({
    query: allPagesQuery,
    tags: [`page`],
  });
  return (
    <div>
      <h1 className="text-xl font-bold">All Pages</h1>
      <ul>
        {pages.length > 0 ? (
          pages.map((page) => (
            <li key={page._id}>
              <Link href={`/${page.slug}`}>{page.title}</Link>
            </li>
          ))
        ) : (
          <p>No pages</p>
        )}
      </ul>
      <h2 className="text-xl font-bold mt-6">All Posts</h2>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id}>
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
              <p className="line-clamp-2">{post.excerpt}</p>
              <pre>{post._updatedAt}</pre>
            </div>
          ))
        ) : (
          <p>No posts</p>
        )}
      </div>
    </div>
  );
}
