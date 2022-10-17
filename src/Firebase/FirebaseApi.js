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
    console.log(params)
    const {item, quantity, totalSum, userId = 1} = params
    const id = doc(collection(firestore, CART_TABLE)).id;

    const batch     = writeBatch(firestore);
    const items     = doc(firestore, CART_TABLE, `${userId}`, 'items', id);
    const total     = doc(firestore, CART_TABLE, `${userId}`);

    batch.set(items, item);
    batch.set(total, {
      totalSum: totalSum,
      quantity: quantity
    });

    return await batch.commit();
  },

  cart: async (params = {}) => {
    const lists = [];
      const cart = await getDoc(doc(firestore, CART_TABLE, '5005051'));
      const cartItems = await getDocs(collection(firestore, `cart/5005051/items`));
      cartItems.forEach(item => { 
        lists.push(item.data())
      })

      const cartData = cart.data();
      const nCartData = {
        quantity: !isNaN(cartData.quantity) ? cartData.quantity : 0,
        totalSum: !isNaN(cartData.totalSum) ? cartData.totalSum : 0, 
      };  
      return {...nCartData, items: lists}
  },

  addBatch: async(params = {}) => { 
  }

}