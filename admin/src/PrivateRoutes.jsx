import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from './context/AuthContext';

const PrivateRoutes = () => {

    
    const { loggedIn } = useContext(AuthContext);

    return(
        <>
        {
                    loggedIn ===true && <Outlet/> 

        }
        {
            loggedIn === false && <Navigate to="/login" />
        }
        
        </>
    )
}

export default PrivateRoutes