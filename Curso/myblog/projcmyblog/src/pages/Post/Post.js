// Import CSS
import styles from './Post.module.css';

// Import hooks
import {useParams} from "react-router-dom";
import { useFetchDocument } from '../../hooks/useFetchDocument';


const Post = () => { 
    // Get the specific post ID from the URL using the useParams hook
    const {id} = useParams();

    // Get all details of the post
    const {document: post} = useFetchDocument("posts", id);

  return (
    // Show all content from the post
    <div className={styles.post_container}>
        {post && (
            <>
                <h1>{post.title}</h1>
                <img src={post.image} alt={post.title} />
                <div className={styles.post_body}>
                    <p>{post.body.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                        ))}
                    </p>
                </div>
                <h3>Este post trata sobre:</h3>
                <div className={styles.tags}>
                     {post.tagsArray.map((tag) => (
                    <p key={tag}>
                        <span>#</span>
                        {tag}
                    </p>
                    ))}
                </div>
            </>
        )}
    </div>
  )
}

export default Post;