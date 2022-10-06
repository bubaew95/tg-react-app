import { useCallback, useEffect, useState } from 'react'; 
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import {useTelegram} from '../Hooks/useTelegram'
import MainPage from '../Pages/MainPage';
import ProductPage from '../Pages/ProductPage';

import './App.css';

const goods = [
  {
    "id": 1,
    "name": "Костюм Ailooge",
    "img": "https://ae01.alicdn.com/kf/HTB1RltMRVXXXXafXFXXq6xXFXXXY.jpg",
    "price": "2566"
  },
  {
    "id": 2,
   "name": "Nova Moda Dos Homens T De Manga",
    "img": "https://www.ofertaviva.com.br/photo/nova-moda-dos-homens-t-de-manga-longa-henley-camisas-militares-casuais-t-shirt-top-roupas-masculinas-camiseta-de-lycra-de-algoda.jpg",
    "price": "1599"
  },
  {
    "id": 3,
    "name": "Casuais Dois Botões Dos Homens",
    "img": "https://www.ofertaviva.com.br/photo/casuais-dois-botoes-dos-homens-stand-up-colarinho-terno-da-moda-plus-size-casaco-do-terno-de-negocio.jpg",
    "price": "5800"
  },
  {
    "id": 4,
    "name": "Ternos Jaqueta De Caminhadas",
    "img": "https://www.ofertaviva.com.br/photo/ternos-jaqueta-de-caminhadas-ao-ar-livre-homens-plus-size-blusao-de-secagem-rapida-a-prova-d-agua-mulheres-ternos-jaqueta-de-pes.jpg",
    "price": "7400"
  },
  {
    "id": 5,
    "name": "Moda Homem Respirável Apontou",
    "img": "https://www.ofertaviva.com.br/photo/moda-homem-respiravel-apontou-toe-sapatos-de-couro-homens-lace-up-oxfords-sapatos-para-homens-de-estilo-britanico-homens-sapatos.jpg",
    "price": "1500"
  },
  {
    "id": 6,
    "name": "Мужские повседневные туфли",
    "img": "https://ae04.alicdn.com/kf/H4c0a61040c5b49c2a71188258932a0925/-.jpg",
    "price": "2500"
  }
]

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
      return acc += parseInt(item.price)
  }, 0)
}

const App = () => {

  const [addedItems, setAddedItems] = useState([]);
  const {tg, user} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg])

  const onAddToCart = (product) => { 
    const alreadyAdded = addedItems.find(item => item.id === product.id);
    let newItems = [];

    if(alreadyAdded) {
        newItems = addedItems.filter(item => item.id !== product.id);
    } else {
        newItems = [...addedItems, product];
    }

    setAddedItems(newItems)

    if(newItems.length === 0) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.show();  
        tg.MainButton.setParams({
            text: `Купить ${getTotalPrice(newItems)}` 
        })
    }
  }

  const onSendData = useCallback(() => {
      tg.sendData(JSON.stringify({id: 1, text: 'text'}));
  }, [])

  useEffect(() => {
      tg.onEvent('mainButtonClicked', onSendData)
      return () => {
          tg.offEvent('mainButtonClicked', onSendData)
      }
  }, [onSendData])

  return (
    <div className="App">
        <div className='container'>
          
          <Header user={user}/>

          <Routes>
            <Route index path='/' element={
              <MainPage onAddToCart={onAddToCart} goods={goods}/>
            } />
            <Route path="/product/:id" element={
              <ProductPage goods={goods} onAddToCart={onAddToCart}/>
            } />
          </Routes>

          
        </div>
    </div>
  );
}

export default App;
