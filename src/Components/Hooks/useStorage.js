import { useState } from "react";


export const useLocalStorage = (key, initialValue = null) => {
    
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }

        try {
            return localStorage.getItem(key);
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, value);
        } catch(err) {
            console.error(e.message);
        }
    }
    
    return {storedValue, setValue};
}