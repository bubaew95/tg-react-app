import { useCallback, useEffect, useState } from "react"; 
import { useTelegram } from "../Hooks/useTelegram";
import { Input } from "../UI/Input";
import { Textarea } from "../UI/Textarea";


const CheckoutPage = ({cart}) => {

    const {tg} = useTelegram();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        comment: ''
    })

    useEffect(() => {
        const {name, phone, email} = formData;
        console.log({name, phone, email})
        if(name.length !== 0 && (phone.length > 7 || email.length > 3)) {
            tg.MainButton.show();
        }else {
            tg.MainButton.hide();
        }
    }, [formData])

    const onSendData = useCallback(() => {
        tg.sendData(JSON.stringify({cart, formData}));
    }, [cart, formData])
    
    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    return (
        <div className="row g-3">
            <form>
                <Input 
                    type="text" 
                    placeholder="ФИО"
                    onChange={({target}) => setFormData({
                        ...formData, 
                        name: target.value
                    })}
                    value={formData.name}
                />
                <Input 
                    type="phone" 
                    placeholder="Телефон" 
                    onChange={({target}) => setFormData({
                        ...formData, 
                        phone: target.value
                    })}
                    value={formData.phone}
                />
                <Input 
                    type="email" 
                    placeholder="E-mail" 
                    onChange={({target}) => setFormData({
                        ...formData, 
                        email: target.value
                    })}
                    value={formData.email}
                />
                <Input 
                    type="text" 
                    placeholder="Адрес доставки"
                    onChange={({target}) => setFormData({
                        ...formData, 
                        address: target.value
                    })}
                    value={formData.address} 
                />
                <Textarea
                    placeholder="Комментарий к заказу"
                    onChange={({target}) => setFormData({
                        ...formData, 
                        comment: target.value
                    })}
                    value={formData.comment} 
                />
            </form>
        </div>
    )

}

export default CheckoutPage;