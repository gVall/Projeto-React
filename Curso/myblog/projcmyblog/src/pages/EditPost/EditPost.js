// Import CSS
import styles from './EditPost.module.css'

// Import hooks
import { useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const EditPost = () => {
  // Gets id for post
  const {id} = useParams()

  // Fetches the specific post with your id
  const {document:post} = useFetchDocument("posts", id)

  // Form state variables for post editing
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [fromError, setFromError] = useState("");

  useEffect(() => {
    if (post) {
      // If the post exists, edit its details
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post])

  // Hook for update every content to the post
  const {updateDocument, response} = useUpdateDocument("posts");

  // Authenticates the user
  const {user} = useAuthValue();

  // Hook to navigate to another urls
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFromError("")

    // Validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFromError("A imagem precisa ser uma URL.")
      
    }

    // Array Tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Check all values

    if (fromError) return;

    if (!title || !image || !tags || !body){
      setFromError("Por favor, preencha todos os campos!");
    }

    const data = {
      title, 
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName

    }
    // Use the hook to update a document with user input
    updateDocument(id, data)

    // Redirect home page
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editar Post: {post.title}</h2>
          <p>Altere o conteúdo do post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input type="text" name="title" required placeholder="Pense em um bom título..." onChange={(e) => setTitle(e.target.value)} value={title} />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input type="text" name="image" required placeholder="Insirda uma imagem para o post" onChange={(e) => setImage(e.target.value)} value={image} />
            </label>
            <p className={styles.preview_tittle}>Preview da imagem atual:</p>
            <img className={styles.preview_image} src={post.image} alt={post.title}/>

            <label>
              <span>Conteúdo</span>
              <textarea ame="body" required placeholder="Insirda o conteúdo do post" onChange={(e) => setBody(e.target.value)} value={body} ></textarea>
            </label>
            <label>
              <span>Tags</span>
              <input type="text" name="tags" required placeholder="Insire as tags separadas por vírgulas" onChange={(e) => setTags(e.target.value)} value={tags} />
            </label>
            
            {!response.loading && (<button className='btn'>Editar</button>)}
            {response.loading && (<button className='btn' disabled>Aguarde...</button>)}
            {response.error && <p className='error'>{response.error}</p>}
            {fromError && <p className='error'>{response.error}</p>}

          </form>        
        </>
      )}
    </div>
    
  )
}

export default EditPost