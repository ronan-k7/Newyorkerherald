import newsData from '@/data/news.json';
import categoriesData from '@/data/categories.json';
import authorsData from '@/data/authors.json';

export interface Category {
  category_id: number;
  category_name: string;
  slug: string;
  category_banner: string;
  meta_title: string;
  meta_keyword: string;
  meta_description: string;
  lang_id: number;
  type: string;
}

export interface Author {
  author_id: number;
  slug: string;
  name: string;
  image: string;
  designation: string;
  bio: string;
  joined_year?: string;
  location?: string;
  social?: string;
}

export interface NewsItem {
  news_id: number;
  news_title: string;
  news_content: string;
  news_content_short: string;
  news_date: string;
  published_at?: string | null;
  photo: string;
  banner: string;
  category_id: number;
  author_id?: number | null;
  comment: string;
  meta_title: string;
  meta_keyword: string;
  meta_description: string;
  lang_id: number;
  stitle: string;
  title: string;
  img_alt: string;
  domain_id: number;
  encode_title: string;
  type: string;
  created_at?: string | null;
  updated_at?: string | null;
  category?: Category;
  author?: Author;
}

const categories: Category[] = categoriesData as Category[];
const authors: Author[] = authorsData as Author[];

// Enrich news items with category & author
const enrichedNews: NewsItem[] = (newsData as any[]).map(item => {
  const cat = categories.find(c => c.category_id === item.category_id);
  const aut = authors.find(a => a.author_id === item.author_id);
  return {
    ...item,
    category: cat,
    author: aut
  };
});

// Ordering logic mirroring Laravel's latestFirst
export function getLatestNews(): NewsItem[] {
  return [...enrichedNews].sort((a, b) => {
    const timeA = new Date(a.published_at || a.created_at || a.news_date).getTime() || 0;
    const timeB = new Date(b.published_at || b.created_at || b.news_date).getTime() || 0;
    if (timeB !== timeA) return timeB - timeA;
    return b.news_id - a.news_id;
  });
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug.toLowerCase() === slug.toLowerCase());
}

export function getAuthors(): Author[] {
  return authors;
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find(a => a.slug.toLowerCase() === slug.toLowerCase());
}

export function getNewsBySlug(categorySlug: string, encodedTitle: string): NewsItem | undefined {
  return enrichedNews.find(
    n => n.encode_title === encodedTitle || n.encode_title === decodeURIComponent(encodedTitle)
  );
}

export function getHomePageData() {
  const allNews = getLatestNews();

  const pick = (startIndex: number, count: number): NewsItem[] => {
    const result: NewsItem[] = [];
    for (let i = 0; i < count; i++) {
      const idx = (startIndex + i) % allNews.length;
      result.push(allNews[idx]);
    }
    return result;
  };

  const mainNews = allNews[0];
  const relatedNews = pick(1, 3);
  const latestNews = pick(4, 3);
  const headlineNews = pick(7, 5);
  const popularNews = pick(12, 5);
  const featuredNews = pick(17, 4);
  const techNews = pick(21, 6);

  const postMainNews = allNews[2] || allNews[0];
  const postListNews = pick(5, 4);
  const postGridNews = pick(9, 4);
  const tripleLatestNews = pick(15, 3);
  const hotNews = allNews[1] || allNews[0];

  return {
    mainNews,
    relatedNews,
    latestNews,
    headlineNews,
    popularNews,
    featuredNews,
    techNews,
    postMainNews,
    postListNews,
    postGridNews,
    tripleLatestNews,
    hotNews
  };
}

export function getNewsByCategory(categoryId: number): NewsItem[] {
  return getLatestNews().filter(n => n.category_id === categoryId);
}

export function getNewsByAuthor(authorId: number): NewsItem[] {
  return getLatestNews().filter(n => n.author_id === authorId);
}
