// Import hooks
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery() {
    // Hook that returns the URL search
    const {search} = useLocation()

    // Returns a memoized instance of URLSearchParams to parse the query string (search).
    // This ensures the object is only recreated when the 'search' value changes,
    // which improves performance and avoids unnecessary re-renders.
    return useMemo(() => new URLSearchParams(search), [search])
}