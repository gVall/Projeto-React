import { useContext, createContext } from "react";

// Creates a new context. AuthContext shares authentication data between components
const AuthContext = createContext()

// Provider component that makes the context value available to all child components
export function AuthProvider({children, value}) {
    // The component wrapped with <AuthProvider> will be able to access the data provided by value
    return <AuthContext.Provider value= {value}>{children}</AuthContext.Provider>;
}

// Custom hook to access context value more easily
export function useAuthValue() {
    return useContext(AuthContext);
}