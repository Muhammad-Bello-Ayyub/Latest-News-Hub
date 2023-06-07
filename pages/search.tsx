import NewsArticlesGrid from "@/components/NewsArticleGrid";
import { NewsArticle } from "@/models/NewsArticles";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";

// Here we'll implement Client Side data fetching
const SearchNewsPage = () => {
    //setting typescript with explicit type using angular brackets
    const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null); //SearchResults can be NewsArticle or Null(initialized with null)
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false);

    //This function is called when the submit function is clicked
    async function handleSubmit(e: FormEvent<HTMLFormElement>) { //FormEvent type with type argument
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const searchQuery = formData.get("searchQuery")?.toString().trim();

        if (searchQuery) {
            try {
                setSearchResults(null);
                setSearchResultsLoadingIsError(false);
                setSearchResultsLoading(true);

                //Making a request from our backend api
                const response = await fetch("/api/search-news?q=" + searchQuery);

                //Articles of type NewsArticles Array
                const articles: NewsArticle[] = await response.json();
                setSearchResults(articles);
            } catch (error) {
                console.error(error);
                setSearchResultsLoadingIsError(true);
            } finally {
                setSearchResultsLoading(false);
            }
        }
    }

    return (
        <>
            <Head>
                <title key="title">Search News - NextJS News App</title>
            </Head>
            <main>
                <h1>Search News</h1>
                <Alert>
                    This is a Nextjs page that <strong>client-side data fetching</strong> to show fresh data for every search.
                    Requests are handled by our backend via <strong>API routes</strong>.
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="search-input">
                        <Form.Label>Search query</Form.Label>
                        <Form.Control
                            name="searchQuery"
                            placeholder="E.g. politics, sports, ..."
                        />
                    </Form.Group>
                    <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
                        Search
                    </Button>
                </Form>
                <div className="d-flex flex-column align-items-center">
                    {searchResultsLoading && <Spinner animation="border" />}
                    {searchResultsLoadingIsError && <p>Something went wrong. Please try again.</p>}
                    {searchResults?.length === 0 && <p>Nothing found. Try a different query!</p>} {/*If it's null or empty after search*/}
                    {searchResults && <NewsArticlesGrid articles={searchResults} />}
                </div>
            </main>
        </>
    );
}

export default SearchNewsPage;