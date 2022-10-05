import { useEffect, useState } from 'react';
import {useTelegram} from '../Hooks/useTelegram'

import './App.css';

const goods = [
  {
    "name": "Костюм Ailooge",
    "img": "https://ae01.alicdn.com/kf/HTB1RltMRVXXXXafXFXXq6xXFXXXY.jpg",
    "price": "2566"
  },
  {
   "name": "Nova Moda Dos Homens T De Manga",
    "img": "https://www.ofertaviva.com.br/photo/nova-moda-dos-homens-t-de-manga-longa-henley-camisas-militares-casuais-t-shirt-top-roupas-masculinas-camiseta-de-lycra-de-algoda.jpg",
    "price": "1599"
  },
  {
    "name": "Casuais Dois Botões Dos Homens",
    "img": "https://www.ofertaviva.com.br/photo/casuais-dois-botoes-dos-homens-stand-up-colarinho-terno-da-moda-plus-size-casaco-do-terno-de-negocio.jpg",
    "price": "5800"
  },
  {
    "name": "Ternos Jaqueta De Caminhadas",
    "img": "https://www.ofertaviva.com.br/photo/ternos-jaqueta-de-caminhadas-ao-ar-livre-homens-plus-size-blusao-de-secagem-rapida-a-prova-d-agua-mulheres-ternos-jaqueta-de-pes.jpg",
    "price": "7400"
  },
  {
    "name": "Moda Homem Respirável Apontou",
    "img": "https://www.ofertaviva.com.br/photo/moda-homem-respiravel-apontou-toe-sapatos-de-couro-homens-lace-up-oxfords-sapatos-para-homens-de-estilo-britanico-homens-sapatos.jpg",
    "price": "1500"
  },
  {
    "name": "Мужские повседневные туфли",
    "img": "https://ae04.alicdn.com/kf/H4c0a61040c5b49c2a71188258932a0925/-.jpg",
    "price": "2500"
  }
]

const App = () => {

  const [name, setName] = useState();
  const {tg, user} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg])

  useEffect(() => {
    setName(
      JSON.stringify(user)
    )
  }, [user])

  return (
    <div className="App">
        <div className='container'>
          <div className='row'>
            {goods.map(item => {
                return (
                  <div className='col col-md-6'>
                    <div class="card mb-4">
                      <img src={item.img} class="card-img-top img-fluid" alt="..."/>
                      <div class="card-body">
                        <h6 class="card-title">{item.name}</h6>
                        <p class="card-text">{item.price} руб.</p>
                        <a href="#" class="btn btn-primary d-md-block">Купить</a>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
    </div>
  );
}

export default App;
