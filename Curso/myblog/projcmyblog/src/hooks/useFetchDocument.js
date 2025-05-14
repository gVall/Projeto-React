// Import hooks
import { useState, useEffect } from "react";

// Import database from firebase and other functions
import {db} from '../firebase/config';
import {doc, getDoc} from "firebase/firestore";

// Hook to search a specific document in database
export const useFetchDocument = (doCollection, id) => {

    // Store the document searched
    const [document, setDocument] = useState(null);

    // Stores error messages
    const [error, setError] = useState(null);

    // Indicate the status of loading
    const [loading, setLoading] = useState(null);

    // Deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadDocument() {
            // If document disassembled, break the execution
            if (cancelled) return;

            // Start loaading
            setLoading(true);

            try {
                // Create a reference to the document in the collection
                const docRef = await doc(db, doCollection, id);

                // Search the document in Firestore
                const docSnap = await getDoc(docRef);

                // Store the content of document
                setDocument(docSnap.data())

                // Finish loading
                setLoading(false)

            } catch (error) {
                // If error happens show the messages and start new loading
                console.log(error);
                setError(error.message);
                setLoading(true)
            }

          
        }

        // Execute the load function
        loadDocument();
    }, [doCollection, id, cancelled])

// Clean 
useEffect(()=> {
    return () => setCancelled(true);
}, [])

return {document, loading, error}

}