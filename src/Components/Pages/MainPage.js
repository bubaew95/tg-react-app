import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../Hooks/useTelegram";
import Item from "../Item/Item"

import { useSelector, useDispatch } from 'react-redux'; 
import { productRoute } from "../../Redux/Reducers/ProductsReducer";
import { useLocalStorage } from "../Hooks/useStorage";

import { Spinner } from "../Spinner";
import { telegramButton } from "../Hooks/useTelegramButton";

const MainPage = () => {
    const {error,isLoading, products}   = useSelector((state) => state.products);
    const {items, totalSum = 0, quantity = 1}  = useSelector((state) => state.cart);

    const dispatch      = useDispatch(); 
    const navigate      = useNavigate();
    const {tg}          = useTelegram(); 

    useEffect(() => {
      dispatch(productRoute());
    }, [])

    useEffect(() => {
        telegramButton(`В корзине (${quantity}) ${totalSum}₽`, tg, items.length === 0);
    }, [items])

    const onSendData = useCallback(() => {
        navigate('/cart');
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

    return (
        <div className='row mt-2'> 
            {
              products.map(item => {
                return <Item
                    key={item.id}
                    item={item}
                />
              })
            }
        </div>
    )
}

export default MainPage;