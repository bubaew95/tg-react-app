import { Link, useLocation, useNavigate } from "react-router-dom"


const Header = ({user}) => {

    const location = useLocation();
    const navigate  = useNavigate();

    return (
        <div className='row'>
            <div className='col my-3'> 
                <div className="d-flex flex-row justify-content-between align-items-center">
                    
                    {
                        location.pathname !== '/' && 
                            <Link onClick={() => navigate(-1)} className="text-decoration-none">
                                <i className='fa fa-arrow-left'></i> Назад
                            </Link>
                    }
                    <div className='name'>{user?.first_name}</div>
                </div>
            </div>
        </div>
    )

}

export default Header