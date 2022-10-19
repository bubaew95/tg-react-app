import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartAddRoute } from "../../Redux/Reducers/CartReducer";
 

const Item = ({item}) => {
    const dispatch      = useDispatch(); 
    const {totalSum = 0, quantity = 1}  = useSelector((state) => state.cart);

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