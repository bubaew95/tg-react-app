import { useState } from "react";
import { firestore } from '../../Firebase/FirebaseConfig';



export const useFirebase = (callback) => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError]         = useState();

    const fetch = async () => {  
        try { 
            setIsLoading(true)
            await callback(firestore);
        } catch(e) {
            setError(e.message)
        } finally {
            setIsLoading(false);
        }
    }

    return {isLoading, error, fetch};

}