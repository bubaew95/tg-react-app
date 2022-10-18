import { useEffect } from 'react'; 
import { Route, Routes,useSearchParams } from 'react-router-dom';
import {useTelegram} from '../Hooks/useTelegram'
import Header from '../Header/Header';
import CheckoutPage from '../Pages/CheckoutPage';
import MainPage from '../Pages/MainPage';
import ProductPage from '../Pages/ProductPage';
 
import { useDispatch, useSelector } from 'react-redux'; 

import './App.css';
import { useLocalStorage } from '../Hooks/useStorage';
import { cartRoute } from '../../Redux/Reducers/CartReducer';
import CartPage from '../Pages/CartPage';

const App = () => {
  const [searchParams]          = useSearchParams()
  const {tg, user}              = useTelegram();
  const {storedValue, setValue} = useLocalStorage('owner_id');

  const dispatch = useDispatch();
  const {items, totalSum, quantity, isLoading} = useSelector((state) => state.cart);

  useEffect(() => {
    tg.ready();

    if(searchParams.has('id')) { 
      setValue(searchParams.get('id'));
    }

    dispatch(cartRoute(storedValue));
  }, [tg])

  useEffect(() => {
    if(items.length === 0) {
      tg.MainButton.hide();
    } else {
        tg.MainButton.show(); 
        tg.MainButton.setParams({
            text: `В корзине (${quantity}) ${totalSum}₽` 
        })
    }
  }, [items])

  return ( 
    <div className="App">
        <div className='container'> 
            <Header user={user}/>
            <Routes>
              <Route index path='/' element={
                <MainPage />
              } />
              <Route path="/product/:id" element={
                <ProductPage />
              } />
              <Route path="/cart" element={
                <CartPage items={items} isLoading={isLoading}/>
              } />
              <Route path="/checkout" element={
                <CheckoutPage/>
              } />
            </Routes> 

        </div>
    </div> 
  );
}

export default App;
