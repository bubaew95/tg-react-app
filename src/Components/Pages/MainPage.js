import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../Hooks/useTelegram";
import Item from "../Item/Item"

import { useSelector, useDispatch } from 'react-redux'; 
import { productRoute } from "../../Redux/Reducers/ProductsReducer";

const MainPage = () => {
    const { 
        error, 
        isLoading, 
        products 
    } = useSelector((state) => state.products);

    const navigate      = useNavigate();
    const {tg}          = useTelegram();
    const dispatch      = useDispatch(); 

    useEffect(() => {
      dispatch(productRoute());
    }, [])

    const onSendData = useCallback(() => {
        navigate('/checkout');
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
        return <div>Loading...</div>
    }

    return (
        <div className='row mt-2'>
            {
              products.map(item => {
                return <Item
                  key={item.id}
                  item={item}/>
              })
            }
        </div>
    )
}

export default MainPage;