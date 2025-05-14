// Import CSS
import styles from "./Home.module.css";

// Import hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// Import components
import PostDetail from "../../components/PostDetail";

const Home = () => {
  // State to store the search query entered by the user
  const [query, setQuery] = useState("");

  // Custom hook to fetch all documents from the "posts" collection
  const {documents: posts, loading} = useFetchDocuments("posts");

  // Hook from React Router to programmatically navigate between routes
  const navigate = useNavigate();

  // Handles the form submission for the search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      // Navigates to the search results page with the query as a URL parameter
      return navigate(`/search?q=${query}`);
    }
  }

  return (
    <div className={styles.home}>
        <h1>Posts recentes</h1>
        <form onSubmit={handleSubmit} className={styles.search_from}>
          <input type="text" placeholder="Busca por tags" onChange={(e) => setQuery(e.target.value)}/>
          <button className="btn btn-dark">Buscar</button>
        </form>
        <div>
          {loading && <p>Carregando...</p>}
          {/*If there is a post, it is called by the PostDetail component*/}
          {posts && posts.map((post) => ( <PostDetail key={post.id} post={post}/>
          ))}
          {/*If there is no post,  will be redirected to a new page where you can create a new post*/}
          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <p>Não foram encontrados posts</p>
              <Link to="/posts/create" className="btn">Criar primeiro post</Link>
            </div>
          )}
        </div>
    </div>
  )
}

export default Home;