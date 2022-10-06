import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../Hooks/useTelegram";
import Item from "../Item/Item"


const MainPage = ({goods, onAddToCart}) => {

    const navigate = useNavigate();
    const {tg} = useTelegram();

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

    return (
        <div className='row mt-2'>
            {
              goods.map(item => {
                return <Item
                  key={item.id}
                  onAddToCart={onAddToCart} 
                  item={item}/>
              })
            }
          </div>
    )
}

export default MainPage;