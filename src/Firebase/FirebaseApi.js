import { collection, getDocs, getDoc, doc } from "@firebase/firestore";
import { firestore } from "./FirebaseConfig";

const PRODUCTS_TABLE = 'products';

export const FirebaseApi = {
 
  products: async (params = {}) => {
      const querySnapshot = await getDocs(collection(firestore, PRODUCTS_TABLE));
      const list = [];
      querySnapshot.forEach(item => { 
        list.push({...item.data(), id: item.id})
      })
      return list;
  },

  productById: async (params = {}) => {  
    const {id} = params;
    const docSnap = await getDoc(
      doc(firestore, PRODUCTS_TABLE, id)
    );
    return docSnap.exists() ? docSnap.data() : null;
  }

}