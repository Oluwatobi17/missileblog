import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCtx } from '../store/Auth-context';

import styles from '../styles/Signup.module.css'

import LoadingSpinner from '../components/LoadingSpinner';


const Login = () =>{
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    const authCtx = useContext(AuthCtx);
    
    const navigate = useNavigate();
    
    const loginHandler = (e) =>{
        e.preventDefault();
        setIsLoading(true);
        
        const details = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        fetch('https://missileblog-default-rtdb.firebaseio.com/users.json')
        .then(res => res.json())
        .then(res => {
            const index = Object.values(res).findIndex(user => user.email===details.email && user.password===details.password);
            
            if(index !== -1){
                const usertoken = Object.keys(res)[index];
                authCtx.configToken(usertoken);
                authCtx.setUser({
                    ...Object.values(res)[index]
                });
                navigate('/');
            }else{
                setError('Invalid username or password');
                setIsLoading(false);
            }
        })
    }


    return <div className={styles.container} style={{backgroundImage: 'url(assets/login.jpg)'}}>
        <form onSubmit={loginHandler}>
            <h1>Login</h1>
            {error && <p className='danger'>{error}</p>}

            <label>Email</label>
            <input type='email' placeholder='Enter Email' required ref={emailRef} />

            <label>Password</label>
            <input type='password' placeholder='Enter Password' required ref={passwordRef}/>

            <button type='submit' className={styles.submit} disabled={isLoading ? true: false} >
                {isLoading ? <LoadingSpinner /> : 'Login'}
                
            </button>
        </form>
    </div>
}


export default Login;