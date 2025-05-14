// Import react hooks
import { useState, useEffect, useReducer } from "react";

// Import the Firebase database and Firestore functions
import {db,} from '../firebase/config';
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
}

// Reducer function to manage insertion states
const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {loading: true, error: null};
        case "INSERTED_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

// Custom hook to insert a document to db
export const useInsertDocument = (docCollection) => {
    // Use reducer to manage loading and error state
    const [response, dispatch] = useReducer(insertReducer, initialState);

    // Deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    // Helper to prevent dispatching actions if component is unmounted
    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    }

    // Async function to insert a document
    const insertDocument = async(document) => {
        // Dispatch loading state before starting the async operation
        checkCancelBeforeDispatch({
                type: "LOADING"
            });
        try {
             // Create a new document object with a timestamp of the current moment
            const newDoc = {...document, createdAt: Timestamp.now()};

            // Add the new document to the specified collection in Firestore
            const insertDocument = await addDoc(
                collection(db, docCollection), newDoc
            );

            // Dispatch success state with the inserted document reference
            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertDocument
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

    // Cleanup
    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {insertDocument, response };
}