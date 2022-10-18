import { useCallback, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { useTelegram } from "../Hooks/useTelegram";
import { Spinner } from "../Spinner";


const CartPage = ({items, isLoading}) => {

    const {tg} = useTelegram(); 

    const onSendData = useCallback(() => {
        navigate('/checkout');
    }, [])
    
    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        if(items.length === 0) {
          tg.MainButton.hide();
        } else {
            tg.MainButton.show(); 
            tg.MainButton.setParams({
                text: 'Оформить заказ' 
            })
        }
      }, [items])
    

    if(isLoading === true) {
        return <Spinner />
    }

    return (
        <div className="cart-page">
            {
                items.map(item => {
                    return (
                        <div className="card mb-3" >
                            <div className="row g-0">
                                <div className="col-md-4 col-sm-4 col-4">
                                    <img src={item.img} className="img-fluid rounded-start" />
                                </div>
                                <div className="col-md-8 col-sm-8 col-8">
                                    <div className="card-body">
                                        <Link to={`/product/${item.id}`}>
                                            <h6 className="card-title">{item.name}</h6>
                                        </Link>
                                        <p className="card-text">{item.price}<small>₽</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CartPage;