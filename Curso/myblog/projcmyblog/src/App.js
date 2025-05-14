// CSS
import './App.css';

// React Router libraries
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

// Firebase library authentication
import { onAuthStateChanged } from 'firebase/auth';

// Hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// Context
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EdiPost from './pages/EditPost/EditPost';


function App() {

  // State that stores the logged in user.
  // Initially it is "undefined" to indicate that the app is still checking if there is an authenticated user.
  const [user, setUser] = useState(undefined);

  // Gets the 'auth' object 
  const {auth} = useAuthentication();

  // Checks if the user state is still undefined, which usually means
  // that the authentication status is still being loaded (not yet known)
  const loadinguser = user === undefined;

  useEffect(() => {

    // Sets up a listener for Firebase Authentication state changes.
    // This runs when the component mounts and sets the user state accordingly.
    onAuthStateChanged(auth, (user) => {
      setUser(user); // Updates the state with the current user (or null if not logged in)
    }) 
  }, [auth])

  if (loadinguser) {
    // If the auth check is still in progress (user is undefined), show a loading message
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
    {/* AuthProvider provides the user state to the entire app through context */}
    <AuthProvider value={{ user }}>
      {/* BrowserRouter enables client-side routing */}
      <BrowserRouter>
        {/* Navbar appears on all pages */}
        <Navbar />

        <div className='container'>
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/search' element={<Search />} />
            <Route path='/posts/:id' element={<Post />} />

            {/* Only show login/register pages if user is not logged in */}
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />

            {/* Protected routes — only accessible if user is logged in */}
            <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />} />
            <Route path='/posts/edit/:id' element={user ? <EdiPost /> : <Navigate to="/login" />} />
            <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />} />
          </Routes>
        </div>

        {/* Footer appears on all pages */}
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </div>
  );
}

export default App;
