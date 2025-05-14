// Import CSS
import styles from './Dashboard.module.css'

// Import component
import {Link} from 'react-router-dom'

// Import Hooks
import {useAuthValue} from "../../context/AuthContext"
import {useFetchDocuments} from "../../hooks/useFetchDocuments"
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

const Dashboard = () => {

  // Shows all posts created by one user and your tools

  // Authenticate the user
  const {user} = useAuthValue()
  const uid = user.div

  // Fetches all posts for specific user
  const {documents: posts, loading} = useFetchDocuments("posts", null, uid)

  // Call the hook what possibilite delete one specific post
  const {deleteDocument} = useDeleteDocument("posts")
  
  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <p>Gerencie os seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className='btn'>Criar primeiro post</Link>
          </div>
        ) : (
          <>
            <div className={styles.post_header}>
              <span>Título</span>
              <span>Ações</span>
            </div>

            {posts && posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div>
                  <Link to = {`/posts/${post.id}`} className='btn btn-outline'>Ver</Link>
                  <Link to = {`/posts/edit/${post.id}`} className='btn btn-outline'>Editar</Link>
                  <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">Excluir</button>
                </div>

              </div>
            ))}
          </>
        )}

    </div>
  )
}

export default Dashboard