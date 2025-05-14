// Import react hooks
import { useState, useEffect, useReducer } from "react";

// Import the Firebase database 
import {db} from '../firebase/config';

// Import Firestore functions to reference and delete a document
import {doc, deleteDoc } from "firebase/firestore";

// Initial state for the reducer
const initialState = {
    loading: null,
    error: null
};

// Reducer function to manage deletion states
const deleteReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {loading: true, error: null};
        case "DELETED_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

// Custom hook to delete a document from db
export const useDeleteDocument = (docCollection) => {
    // Use reducer to manage loading and error state
    const [response, dispatch] = useReducer(deleteReducer, initialState);

    // Deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    // Helper to prevent dispatching actions if component is unmounted
    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    }

    // Async function to delete a document by ID
    const deleteDocument = async(id) => {
        checkCancelBeforeDispatch({
                type: "LOADING"
            });
        try {
            const deletedDocument = await deleteDoc(doc(db, docCollection, id))
            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDocument
            });

        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message
            });
        }
    }

    // Cleanup
    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {deleteDocument, response };
}