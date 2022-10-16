import { collection, getDocs, getDoc, doc, writeBatch, setDoc } from "@firebase/firestore";
import { firestore } from "./FirebaseConfig";

const PRODUCTS_TABLE  = 'products';
const CART_TABLE      = 'cart';

export const FirebaseApi = {

  fetch: async (table) => {
    const querySnapshot = await getDocs(collection(firestore, table));
    const list = [];
    querySnapshot.forEach(item => { 
      list.push({...item.data(), id: item.id})
    })
    return list;
  },
 
  products: async (params = {}) => {  
      return await FirebaseApi.fetch(PRODUCTS_TABLE);
  },

  productById: async (params = {}) => {  
    const {id} = params;
    const docSnap = await getDoc(
      doc(firestore, PRODUCTS_TABLE, id)
    );
    return docSnap.exists() ? docSnap.data() : null;
  },

  addToCart: async(params = {}) => { 
    const {item, userId = 1} = params
    const id = doc(collection(firestore, CART_TABLE)).id;

    const batch     = writeBatch(firestore);
    const items     = doc(firestore, CART_TABLE, `${userId}`, id, 'item');
    const totalSum  = doc(firestore, CART_TABLE, `${userId}`);

    batch.set(items, item);
    batch.set(totalSum, {
      totalSum: 1000,
      quantity: 2
    });

    // const querySnapshot = await getDoc(doc(firestore, `cart`, '1'));
 
    // console.log(querySnapshot.collections); 

    return await batch.commit();
  },

  cart: async (params = {}) => {
    const querySnapshot = await getDocs(collection(firestore, `cart/1/7JbmmSyVSwF9Mk8NoXlL`));
    const list = [];
    querySnapshot.forEach(item => { 
      list.push(item.data())
    })
    console.log(list); 
  },

  addBatch: async(params = {}) => { 
  }

}