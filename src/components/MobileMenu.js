import { useContext } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';

import { AuthCtx } from '../store/Auth-context';

const MobileMenu = () =>{
    const authctx = useContext(AuthCtx);
    const navigate = useNavigate();

    const logoutHandler = (e) =>{
        e.preventDefault();
        authctx.configToken(null);

        navigate('/login');
    }
    return <ul className="mobile">
        <li> <NavLink to='/' activeclass='active'> Home </NavLink> </li>
        <li> <NavLink to='/about'> About </NavLink> </li>
        <li> <NavLink to='/myblogs'> My Posts </NavLink> </li>
        <li> <NavLink to='/write'> Write </NavLink> </li>
        {authctx.token && <li> <Link to='/logout' onClick={logoutHandler}> Logout </Link> </li>}
        {!authctx.token && <li> <NavLink to='/login'> Login </NavLink> </li>}
        {authctx.token ?
            <NavLink to='/profile'>Profile</NavLink>
            :
            <NavLink to='/signup'> Signup </NavLink>
        }
    </ul>
}

export default MobileMenu;