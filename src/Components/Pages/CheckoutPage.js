import { useCallback, useEffect } from "react"; 
import { useTelegram } from "../Hooks/useTelegram";


const CheckoutPage = ({cart}) => {

    const {tg} = useTelegram();


    const onSendData = useCallback(() => {
        tg.sendData(JSON.stringify(cart));
    }, [cart])
    
    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    return (
        <div>
            {JSON.stringify(cart)}
        </div>
    )

}

export default CheckoutPage;