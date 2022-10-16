import { Link } from "react-router-dom";

import { useDispatch } from 'react-redux'; 
import { cartRoute } from "../../Redux/Reducers/AddToCartReducer";
import { useTelegram } from "../Hooks/useTelegram";


const Item = ({item}) => {
    const dispatch = useDispatch(); 

    const {user} = useTelegram();

    const addToCart = (item) => dispatch(cartRoute({item, userId: user?.id}));

    return (
        <div className='col col-md-6 col-6'>
            <div className="card mb-4">
                <img src={item.img} className="card-img-top img-fluid" alt="..."/>
                <div className="card-body">
                    <Link to={`/product/${item.id}`}>
                        <h6 className="card-title">{item.name}</h6>
                    </Link>
                    <p className="card-text">{item.price}<small>₽</small></p>
                    <button
                        onClick={() => addToCart(item)}
                        className="btn btn-warning" 
                        style={{width: "100%"}}>
                        Купить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Item;