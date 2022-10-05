import { Link } from "react-router-dom"


const Header = ({user}) => {

    return (
        <div className='row'>
            <div className='col my-3'> 
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <Link to={() => console.log('e')}>
                        <i className='fa fa-arrow-left'></i>
                    </Link>
                    <div className='name'>{user?.first_name}</div>
                </div>
            </div>
        </div>
    )

}

export default Header