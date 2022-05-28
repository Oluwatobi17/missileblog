import { useContext, useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';

import { AuthCtx } from '../store/Auth-context';

import MobileMenu from './MobileMenu';

import styles from '../styles/Header.module.css';

const Header = () =>{
    const authctx = useContext(AuthCtx);
    const [mobileMenu, setMobileMenu] = useState(false);
    const navigate = useNavigate();

    const logoutHandler = (e) =>{
        e.preventDefault();
        authctx.configToken(null);

        navigate('/login');
    }
    return <header>
        <nav>
            <Link to='/'>
                <img src='assets/logo.png' alt='logo' className={styles.logo}/>
            </Link>
            <ul className={styles.desktopMenu}>
                <li> <NavLink to='/' activeclass='active'> Home </NavLink> </li>
                <li> <NavLink to='/about'> About </NavLink> </li>
                <li> <NavLink to='/myblogs'> My Posts </NavLink> </li>
                <li> <NavLink to='/write'> Write </NavLink> </li>
                {authctx.token && <li> <Link to='/logout' onClick={logoutHandler}> Logout </Link> </li>}
                {!authctx.token && <li> <NavLink to='/login'> Login </NavLink> </li>}
            </ul>

            {authctx.token ?
                <Link to='/profile' className={styles.desktopMenu}>
                    <img src={authctx.user.profileImg} className={styles.profileimg} alt='profile-img' />
                </Link>
                :
                <NavLink to='/signup' className={styles.desktopMenu}> Signup </NavLink>
            }

            <img src='assets/icon-hamburger.svg' className='mobileMenu' alt='menu'
             onClick={()=> setMobileMenu(prev => !prev)}/>

            {mobileMenu && <MobileMenu /> }
        </nav>
    </header>
}


export default Header;