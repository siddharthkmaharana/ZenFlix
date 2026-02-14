import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function NavigationTracker() {
    const location = useLocation();

    useEffect(() => {
        // Log navigation if needed, but no base44 logging
        console.log(`Navigated to: ${location.pathname}`);
    }, [location]);

    return null;
}