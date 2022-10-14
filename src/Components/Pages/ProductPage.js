import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'; 
import { cartRoute } from "../../Redux/Reducers/AddToCartReducer";
import { productByIdRoute } from "../../Redux/Reducers/ProductByIdReducer";
import { Spinner } from "../Spinner";

const ProductPage = () => {
    const params    = useParams()
    const dispatch  = useDispatch(); 
    const { 
        error, 
        isLoading, 
        product
    } = useSelector((state) => state.productById);

    const onAddToCart = (item) => dispatch(cartRoute(item));

    useEffect(() => {
        dispatch(productByIdRoute(params.id));
        return () => {

        }
    }, [])

    if(error) {
        return <div>{error}</div>
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div className="carsd mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                <img src={product.img} className="img-fluid rounded-start" style={{width: "100%"}}/>
                </div>
                <div className="col-md-8 mt-3">
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">
                            Цена: {product.price} <small>₽</small>
                        </p>
                        <button
                            onClick={() => onAddToCart(product)}
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