// Import CSS
import styles from "./Navbar.module.css"

// Import components
import {NavLink} from "react-router-dom"

// Import hooks
import { useAuthentication } from "../hooks/useAuthentication"
import { useAuthValue } from "../context/AuthContext"

const Navbar = () => {

    // Get user content with hook
    const {user} = useAuthValue();

    // Call hook to logout
    const {logout} = useAuthentication();

    // Navbar contains different tabs that the website user can use
    // The Link component is used to redirect the user to another page
  return <nav className={styles.navbar}>
    <NavLink to="/" className={styles.brand}>
     My <span>Blog</span>
    </NavLink>
    <ul className={styles.links_list}>
        <li>
            <NavLink to="/" className={({isActive}) => (isActive ? styles.active : "")}>Home</NavLink>
        </li>
        {!user && (
            <>
                <li>
                <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : "")}>Entrar</NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : "")}>Registrar</NavLink>
                </li>
            </>
        )}
        {user && (
            <>
                <li>
                    <NavLink to="/posts/create" className={({isActive}) => (isActive ? styles.active : "")}>Novo Post</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" className={({isActive}) => (isActive ? styles.active : "")}>Dashboard</NavLink>
                </li>
                <li>
                    <button onClick={logout}>Sair</button>
                </li>

            </>
        )}
        <li>
            <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : "")}>Sobre</NavLink>
        </li>
    </ul>
  </nav>
}

export default Navbar