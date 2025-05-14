// Import CSS
import styles from './Register.module.css';

// Import hooks
import { useAuthentication } from '../../hooks/useAuthentication';
import { useState, useEffect } from 'react';

const Register = () => {
  // Form state variables for user input
  const [displayName, setDisplayName] = useState("");     // User's name
  const [email, setEmail] = useState("");                 // User's email
  const [password, setPassword] = useState("");           // Password
  const [confirmPassword, setConfirmPassword] = useState(""); // Password confirmation
  const [error, setError] = useState("");                 // Local error message

  // Authentication hook
  const { createUser, error: authError, loading } = useAuthentication();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior 

    setError(""); // Clear any existing local error

    // Create a user object with form values
    const user = {
      displayName,
      email,
      password
    };

    // Validate if passwords match
    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais"); // Set local error if not
      return;
    }

    // Call createUser function to register the user
    const res = await createUser(user);

    console.log(user); // Debug: log user data
  };

  // Update local error state if authentication hook returns an error
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>

        <h1>Cadastra-se para publicar</h1>
        <p>Crie sua conta e compartilhe suas histórias</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input type="text" name='displayName' required placeholder='Nome do usuário' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </label>
          <label>
            <span>Email:</span>
            <input type="email" name='email' required placeholder='E-mail do usuário' value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <span>Senha:</span>
            <input type="password" name='userPassword' required placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}  />
          </label>
          <label>
            <span>Confirmação da senha:</span>
            <input type="password" name='confirmPassword' required placeholder='Confirme a sua senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
          {!loading && <button className='btn'>Cadastrar</button>}
          {loading && (<button className='btn' disabled>Aguarde...</button>)}
          {error && <p className='error'>{error}</p>}
        </form>

    </div>
  )
}

export default Register;