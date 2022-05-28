import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCtx } from '../store/Auth-context';

import styles from '../styles/Signup.module.css'

import LoadingSpinner from '../components/LoadingSpinner';


const Signup = () =>{
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();

    const authCtx = useContext(AuthCtx);
    
    const navigate = useNavigate();

    const confirmPassHandler = () =>{
        const password = passwordRef.current.value;
        const password2 = password2Ref.current.value;
        if(password !== password2 && password !== ''){
            setError("Passport Missmatch");
        }else{
            setError(null);
        }
    }
    
    const signupHandler = (e) =>{
        e.preventDefault();
        setIsLoading(true);
        
        const details = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            profileImg: 'assets/user.png'
        }

        fetch('https://missileblog-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify(details)
        })
        .then(res => res.json())
        .then(res => {
            if(res.name.length > 0){
                setIsLoading(false);
                authCtx.configToken(res.name);
                authCtx.setUser({
                    username: details.username,
                    email: details.email,
                    profileImg: details.profileImg
                });
                navigate('/profile');
            }
        })
    }


    return <div className={styles.container}>
        <form onSubmit={signupHandler}>
            <h1>Sign Up</h1>
            {error && <p className='danger'>{error}</p>}
            <label>Username</label>
            <input type='text' placeholder='Enter Username' required ref={usernameRef}/>

            <label>Email</label>
            <input type='email' placeholder='Enter Email' required ref={emailRef} />

            <label>Password</label>
            <input type='password' placeholder='Choose Password' required ref={passwordRef} onChange={confirmPassHandler}/>

            <label>Confirm Password</label>
            <input type='password' placeholder='Confirm Password' required ref={password2Ref} onChange={confirmPassHandler} />

            <button type='submit' className={styles.submit} disabled={isLoading ? true: false} >
                {isLoading ? <LoadingSpinner /> : 'Register'}
                
            </button>
        </form>
    </div>
}


export default Signup;