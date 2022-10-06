import { useNavigate } from "react-router-dom";
import { useTelegram } from "../Hooks/useTelegram";


const CheckoutPage = ({cart}) => {

    const navigate = useNavigate();
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