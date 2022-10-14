import { useEffect, useState } from 'react'; 
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import {useTelegram} from '../Hooks/useTelegram'
import CheckoutPage from '../Pages/CheckoutPage';
import MainPage from '../Pages/MainPage';
import ProductPage from '../Pages/ProductPage';
 
import './App.css';

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
      return acc += parseInt(item.price)
  }, 0)
}

const App = () => {
  const {tg, user} = useTelegram(); 
  const [addedItems, setAddedItems] = useState([]); 

  useEffect(() => {
    tg.ready();
  }, [tg])

  useEffect(() => {
    if(addedItems.length === 0) {
      tg.MainButton.hide();
    } else {
        tg.MainButton.show(); 
        tg.MainButton.setParams({
            text: `В корзине (${addedItems.length}) ${getTotalPrice(addedItems)}₽` 
        })
    }
  }, [addedItems])

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
              <Route path="/checkout" element={
                <CheckoutPage/>
              } />
            </Routes> 

        </div>
    </div> 
  );
}

export default App;
