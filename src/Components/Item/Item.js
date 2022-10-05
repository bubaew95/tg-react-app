import { Link } from "react-router-dom";


const Item = ({item}) => {
    return (
        <div className='col col-md-6 col-6' key={item.id}>
            <div className="card mb-4">
                <img src={item.img} className="card-img-top img-fluid" alt="..."/>
                <div className="card-body">
                <h6 className="card-title">{item.name}</h6>
                <p className="card-text">{item.price}<small>₽</small></p>
                <Link to={() => console.log('test')} className="btn btn-warning" style={{width: "100%"}}>Купить</Link>
                </div>
            </div>
        </div>
    )
}

export default Item;