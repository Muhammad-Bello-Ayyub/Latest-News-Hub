export interface NewsArticle {
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage?: string,
    publishedAt: string,
    content: string,
}

//This Article interface is an array of the News Article Above
export interface NewsResponse {
    articles: NewsArticle[],
}