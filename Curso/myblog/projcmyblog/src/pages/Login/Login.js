// Import CSS
import styles from './Login.module.css';

// Import hooks
import {useState, useEffect} from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {
  // Email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Local error state
  const [error, setError] = useState("");

  // Authentication hook
  const {login, error: authError, loading} = useAuthentication();
  
  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setError("");
    
    // Create a user object with email and password
    const user = {
      email,
      password
    };

    // Call login function from the authentication hook
    const res = await login(user);
  
    console.log(user);
  }
  
  // Sync authentication error to local error state, if it changes
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError])

  
  return (
    <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Faça o login para começar a usar o sistema</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email:</span>
            <input type="email" name='email' required placeholder='E-mail do usuário' value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <span>Senha:</span>
            <input type="password" name='userPassword' required placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}  />
          </label>

          {!loading && <button className='btn'>Entrar</button>}
          {loading && (<button className='btn' disabled>Aguarde...</button>)}
          {error && <p className='error'>{error}</p>}
        </form>
        
    </div>
  )
}

export default Login;