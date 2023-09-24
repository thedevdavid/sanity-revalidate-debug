import { PortableTextBlock, SanityDocument } from 'sanity';

export interface Category extends SanityDocument {
  _type: 'category';
  title: string;
  slug: {
    current: string;
    _type: 'slug';
  };
}
export interface Post extends SanityDocument {
  _type: 'post';
  title: string;
  publishedAt: Date;
  slug: string;
  excerpt: string;
  category: Category;
  content: PortableTextBlock[];
}

export interface Page extends SanityDocument {
  _type: 'page';
  title: string;
  slug: string;
  content: PortableTextBlock[];
}
