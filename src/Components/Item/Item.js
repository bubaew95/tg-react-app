

const Item = ({item, onAddToCart}) => {
    return (
        <div className='col col-md-6 col-6'>
            <div className="card mb-4">
                <img src={item.img} className="card-img-top img-fluid" alt="..."/>
                <div className="card-body">
                    <h6 className="card-title">{item.name}</h6>
                    <p className="card-text">{item.price}<small>₽</small></p>
                    <button
                        onClick={() => onAddToCart(item)}
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