// import NewsArticleEntry from '@/components/NewsArticleEntry';
import NewsArticlesGrid from '@/components/NewsArticleGrid';
import { NewsArticle, NewsResponse } from '@/models/NewsArticles';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Alert } from 'react-bootstrap';

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[],
}

//Definig the types as BreakingNewsPageProps Above (Interface)
export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  //This allows the page to load for 3sec before displaying
  // await new Promise(r => setTimeout(r, 3000));
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + process.env.NEWS_API_KEY);  
  const newsResponse: NewsResponse = await response.json(); //await is neccessary cuz response is async function
  
  return {
    //Normal syntax in GetserverSideProps using props object return type
    props: { newsArticles: newsResponse.articles }
  } 
  // let error go to 500 page
}

export default function BreakingNewsPage({ newsArticles }: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">Breaking News - Latest News App</title>
      </Head>
      <main>
        <h1>Breaking News:</h1>
        <Alert>
          This is a Nextjs page that uses <strong>getServerSideProps</strong> to fetch data server-side on every request.
          This allows search engines to crawl the page content and <strong>improves SEO</strong>.
        </Alert>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  )
}
