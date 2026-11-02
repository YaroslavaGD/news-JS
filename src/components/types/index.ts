export type Category = 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology';

export type Callback<T> = (data: T) => void;

export enum Endpoint {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: Category;
    language: string;
    country: string;
}

export interface BaseResponse {
    status: 'ok';
}

export interface SourcesResponse extends BaseResponse {
    sources: Source[];
}

export interface EverythingResponse extends BaseResponse {
    totalResults: number;
    articles: Article[];
}

export interface LoadOptions {
    endpoint: Endpoint;
    options?: Record<string, string>;
}
