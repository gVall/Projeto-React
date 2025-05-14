// Import CSS
import styles from './PostDetail.module.css';

import { Link } from 'react-router-dom';


const PostDetail = ({post}) => {
  // Show a summary of the specific post
  return (
    <div className={styles.post_detail}>
        <img src={post.image} alt={post.title} /> 
        <h2>{post.title}</h2>
        <p className={styles.createdBy}>Escrito por: {post.createdBy}</p>

        <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>
        {/*Link to redirect to the post page*/}
        <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>
    </div>
  )
}

export default PostDetail;