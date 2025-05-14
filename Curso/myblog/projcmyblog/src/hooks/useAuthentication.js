import {app} from '../firebase/config';

// Import functions firebase
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

// Import hooks 
import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    // Sets the initial error and loading values
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // Indicates whether the component has been disassembled
    // Prevent state updates after the component is unmounted
    const [cancelled, setCancelled] = useState(false);

    // Gets the Firebase authentication instance linked to the initialized app
    const auth = getAuth(app);

    // Function that checks if the "cancelled" flag is activated
    // If it is, it simply returns and prevents any further logic from being executed
    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        // Change status loading and error 
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {
            // Attempts to create a new user with the provided email and password
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

            // Updates the user's profile with the display name after account creation
            await updateProfile(user, { displayName: data.displayName });

            // Marks the end of the loading state
            setLoading(false);

            // Returns the created user object
            return user;

        } catch (error) {
            // Logs the raw error message for debugging purposes
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage;

            // Handles specific error messages returned by Firebase
            if (error.message.includes("Password should be at least 6 characters")) {
                // If the password is too short
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if (error.message.includes("email-already")) {
                // If the email is already registered
                systemErrorMessage = "E-mail já cadastrado.";
            } else {
                // Fallback error message
                systemErrorMessage = "Ocorreu um erro, tente mais tarde.";
            }

            // Stops the loading state
            setLoading(false);

            // Sets the user-friendly error message to be shown in the UI
            setError(systemErrorMessage);
        }
        

    }

    // Logout
    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    }

    // Login 
    const login = async(data) => {
        // Verifies whether the component has been unmounted before proceeding
        checkIfIsCancelled();

        // Initializes loading state and clears previous errors
        setLoading(true);
        setError(false);

        try {
            // Attempts to log the user in with the provided email and password
            await signInWithEmailAndPassword(auth, data.email, data.password);

            // If successful, stop the loading state
            setLoading(false);

        } catch (error) {
            let systemErrorMessage;

            // Handles specific Firebase authentication errors
            if (error.message.includes("user-not-found")) {
                // Email is not registered
                systemErrorMessage = "Usuário não encontrado.";
            } else if (error.message.includes("wrong-password")) {
                // Password is incorrect
                systemErrorMessage = "Senha incorreta.";
            } else {
                // Default message for unexpected errors
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
            }

            // Displays the user-friendly error message
            setError(systemErrorMessage);

            // Ends the loading state even after an error
            setLoading(false);
        }
    }

    useEffect(() => {
    // Cleanup function that runs when the component unmounts
    // It sets the "cancelled" flag to true, which is used to prevent state updates after unmount
    return () => setCancelled(true);
    }, []); // Runs only once, when the component mounts

    return {auth, createUser, error, loading, logout, login};

}