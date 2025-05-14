// Import CSS
import styles from "./Search.module.css";

// Import hooks 
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from "react";

// Import component 
import PostDetail from '../../components/PostDetail';

const Search = () => {
    // Get the current URL query parameters using a custom hook
    const query = useQuery();
    console.log(query)
    // Extract the value of the "q" parameter from the URL
    const search = query.get("q");
    console.log(search)

    // Fetch documents (posts) from a data source, filtered by the search term
    const {documents: posts} = useFetchDocuments("posts", search);

    // Hook from React Router to programmatically navigate between routes
    const navigate = useNavigate();

    // State to store the search query entered by the user
    const [queryInput, setQueryInput] = useState("");

    useEffect(() => {
        setQueryInput(search);
    }, [search]);

    // Handles the form submission for the search
    const handleSubmit = (e) => {
        e.preventDefault();
        if (queryInput) {
        console.log(`/search?q=${queryInput}`)

        // Navigates to the search results page with the query as a URL parameter
        return navigate(`/search?q=${queryInput}`);}
    }

  return (
    <div className={styles.search_container}>
        <h2>Busca</h2>
        <form onSubmit={handleSubmit} className={styles.search_from}>
            <input type="text" placeholder="Busca por tags" onChange={(e) => setQueryInput(e.target.value)}/>
            <button className="btn btn-dark">Buscar</button>
        </form>
        <div>
            {/*If none posts has found then show a message and a button to redirect to home page */}
            {posts && posts.length === 0 && (
                <div className={styles.noposts}>
                    <p>Não foram encontrados posts a partir da busca -_-</p>
                    <Link to="/" className='btn btn-dark'>Voltar</Link>
                </div>
            )}
            {/*Shows details from each post */}
            {posts && posts.map((post) => 
                <PostDetail key={post.id} post={post}/>
                )}
        </div>
    </div>
  )
}

export default Search;