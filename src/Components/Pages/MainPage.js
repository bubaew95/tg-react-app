import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../Hooks/useTelegram";
import Item from "../Item/Item"

import { useSelector, useDispatch } from 'react-redux'; 
import { productRoute } from "../../Redux/Reducers/ProductsReducer";
import { cartAddRoute } from "../../Redux/Reducers/CartReducer"; 
import { useLocalStorage } from "../Hooks/useStorage";

import { Spinner } from "../Spinner";

const MainPage = () => {
    const {error,isLoading, products}   = useSelector((state) => state.products);
    const {totalSum = 0, quantity = 1}  = useSelector((state) => state.cart);

    const dispatch      = useDispatch(); 
    const navigate      = useNavigate();
    const {tg}          = useTelegram(); 
    const {storedValue} = useLocalStorage('owner_id');

    useEffect(() => {
      dispatch(productRoute());
    }, [])

    const onSendData = useCallback(() => {
        navigate('/cart');
        // tg.sendData(JSON.stringify(addedItems));
    }, [])
    
    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])
 
    if(error) {
        return <div>{error}</div>
    }

    if(isLoading) {
        return <Spinner />
    }

    const addToCart = (item) => { 
        console.log({totalSum, quantity})
        dispatch(cartAddRoute({
            totalSum: parseFloat(totalSum) + parseFloat(item.price),
            quantity: quantity + 1,
            item, 
            userId: storedValue
        }));
    }

    return (
        <div className='row mt-2'> 
            {
              products.map(item => {
                return <Item
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                />
              })
            }
        </div>
    )
}

export default MainPage;