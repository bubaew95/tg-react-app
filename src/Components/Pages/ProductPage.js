import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ProductPage = ({goods, onAddToCart}) => {
    const params = useParams()
    const [item, setItem] = useState();

    useEffect(() => {
        const filter = goods.filter(item => item.id === parseInt(params.id));
        if(!filter) {
            console.log('!', filter)
            return null;
        }

        setItem(filter[0])
    }, [goods])

    if(!item) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="carsd mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                <img src={item.img} className="img-fluid rounded-start" style={{width: "100%"}}/>
                </div>
                <div className="col-md-8 mt-3">
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">
                            Цена: {item.price} <small>₽</small>
                        </p>
                        <button
                            onClick={() => onAddToCart(item)}
                            className="btn btn-warning" 
                            style={{width: "100%"}}>
                            Купить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;