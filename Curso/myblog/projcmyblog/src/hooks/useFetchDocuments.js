// Import hooks 
import { useState, useEffect } from "react";

// Import data from firebase
import { db } from '../firebase/config';

// Import functions from firebase
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

export const useFetchDocuments = (doCollection, search = null, uid = null) => {
    // State to store fetched documents
    const [documents, setDocuments] = useState(null);

    // State to handle possible error messages
    const [error, setError] = useState(null);

    // State to indicate  loading stats
    const [loading, setLoading] = useState(null);
    

  useEffect(() => {
    setLoading(true);
    const collectionRef = collection(db, doCollection);

    let q;

    // If search parameter is provided, filters documents where "tagsArray" contains the search term
    if (search) {
      q = query(collectionRef, where("tagsArray", "array-contains", search), orderBy("createdAt", "desc"));
    }
    // If UID is provided, filters documents created by that specific user 
    else if (uid) {
      q = query(collectionRef, where("uid", "==", uid), orderBy("createdAt", "desc"));
    }
    // Fetch all documents ordered by creation date
    else {
      q = query(collectionRef, orderBy("createdAt", "desc"));
    }

    // Realtime listener for the query
    const unsubscribe = onSnapshot(
      q, // Query
      (querySnapshot) => {
        // Map all documents returned by the query
        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Updates the status with the documents received
        setDocuments(results);

        // Sets the end of loading
        setLoading(false);
      },

      // Error callback
      (err) => {
        console.log(err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Cleanup
    return () => unsubscribe();

  }, [doCollection, search, uid]);

  return { documents, loading, error };
};
