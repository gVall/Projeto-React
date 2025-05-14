// Import react hooks
import { useState, useEffect, useReducer } from "react";

// Import the Firebase database and Firestore functions
import {db} from '../firebase/config';
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

// Reducer function to manage update states
const updateReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {loading: true, error: null};
        case "UPDATED_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

// Custom hook to update a document from db
export const useUpdateDocument = (docCollection) => {
    // Use reducer to manage loading and error state
    const [response, dispatch] = useReducer(updateReducer, initialState);

    // Deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    // Helper to prevent dispatching actions if component is unmounted
    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    // Async function to update a document by ID amd your content
    const updateDocument = async(id, data) => {
        checkCancelBeforeDispatch({
                type: "LOADING"
            });
        try {
             // Create a reference to the specific document in the Firestore collection
            const docRef = await doc(db, docCollection, id);

            // Update the document with the new data
            const updatedDocument = await updateDoc(docRef, data);

            // Dispatch success state with the updated document reference
            checkCancelBeforeDispatch({
                type: "UPDATED_DOC",
                payload: updatedDocument
            });

        }
         // In case of error, dispatch an error state with the message
        catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message
            });
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {updateDocument, response };
}