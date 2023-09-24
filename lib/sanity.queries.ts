import { groq } from 'next-sanity';

export const pagePathsQuery = groq`
  *[_type == "page" && slug.current != null].slug.current
`;

export const postPathsQuery = groq`
  *[_type == "post" && slug.current != null].slug.current
`;

export const postSitemapQuery = groq`
  *[_type == "post"] | order(publishedAt desc, _updatedAt desc) {
    _updatedAt,
    publishedAt,
    "slug": slug.current
  }
`;

export const pagesSitemapQuery = groq`
  *[_type == "page"] | order(publishedAt desc, _updatedAt desc) {
    _updatedAt,
    publishedAt,
    "slug": slug.current
  }
`;

const postFields = `
  _id,
  title,
  publishedAt,
  "slug": slug.current,
  category->{title, slug},
  excerpt
`;

export const allPagesQuery = groq`
  *[_type == "page"] | order(publishedAt desc, _updatedAt desc) {
    _id,
    title,
    "slug": slug.current
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    content
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc, _updatedAt desc){
    _id,
    title,
    "slug": slug.current
  }
`;

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc, _updatedAt desc){
    ${postFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    ${postFields},
    content
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)] | order(publishedAt desc, _updatedAt desc){
    ${postFields}
  }
`;
