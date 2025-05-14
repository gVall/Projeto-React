// Import CSS
import styles from './CreatePost.module.css'

// Import hooks
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {

  // Form state variables for post creation
  const [title, setTitle] = useState(""); 
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [fromError, setFromError] = useState("");

  // Call hook to create a document with user input
  const {insertDocument, response} = useInsertDocument("posts");

  // Authentication hook
  const {user} = useAuthValue();

  // Hook navigate to another url
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFromError("")

    // Validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFromError("A imagem precisa ser uma URL."); 
    }

    // Array Tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Check all values

    if (fromError) return;

    if (!title || !image || !tags || !body){
      setFromError("Por favor, preencha todos os campos!");
    }

    // Use the hook to create a document with user input
    insertDocument({
      title, 
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    });

    // Redirect home page
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser, compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input type="text" name="title" required placeholder="Pense em um bom título..." onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input type="text" name="image" required placeholder="Insirda uma imagem para o post" onChange={(e) => setImage(e.target.value)} value={image} />
        </label>
        <label>
          <span>Conteúdo</span>
          <textarea ame="body" required placeholder="Insirda o conteúdo do post" onChange={(e) => setBody(e.target.value)} value={body} ></textarea>
        </label>
        <label>
          <span>Tags</span>
          <input type="text" name="tags" required placeholder="Insire as tags separadas por vírgulas" onChange={(e) => setTags(e.target.value)} value={tags} />
        </label>
        
        {!response.loading && (<button className='btn'>Criar</button>)}
        {response.loading && (<button className='btn' disabled>Aguarde...</button>)}
        {response.error && <p className='error'>{response.error}</p>}
        {fromError && <p className='error'>{response.error}</p>}

      </form>
    </div>
    
  )
}

export default CreatePost;