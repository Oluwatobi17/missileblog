import { useRef, useState, useContext } from 'react';
import { AuthCtx } from '../store/Auth-context';

import styles from '../styles/Signup.module.css'

import LoadingSpinner from '../components/LoadingSpinner';


const EditProfileForm = () =>{
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const passwordRef = useRef();
    const password2Ref = useRef();

    const authCtx = useContext(AuthCtx);

    const confirmPassHandler = () =>{
        const password = passwordRef.current.value;
        if(password !== authCtx.user.password && password !== ''){
            setError({type: 'error', msg: 'Passport Missmatch'});
        }else{
            setError(null);
        }
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        setIsLoading(true);
        if(error) return;
        
        const oldpassword = passwordRef.current.value;
        const newpassword = password2Ref.current.value;
        if(oldpassword !== authCtx.user.password) return;
        const details = {...authCtx.user, password: newpassword};

        fetch(`https://missileblog-default-rtdb.firebaseio.com/users/${authCtx.token}.json`, {
            method: 'PUT',
            body: JSON.stringify(details)
        })
        .then(res => res.json())
        .then(res => {
            authCtx.setUser(res);
            setError({type: 'success', msg: 'Passport Updated'});
            setIsLoading(false);
            passwordRef.current.value = '';
            password2Ref.current.value = '';
            setTimeout(()=> setError(null), 4000);
        })
        .catch(error =>{
            setError({type: 'error', msg: 'Error updating'})
            setIsLoading(false);
        });
    }

    return <div className='formgroup'>
        <form onSubmit={submitHandler}>
            {error && <p className={error.type==='error'? 'danger': 'success'}>{error.msg}</p>}
            <label>Username</label>
            <input type='text' disabled={true} value={authCtx.user.username}/>

            <label>Email</label>
            <input type='email' disabled={true} value={authCtx.user.email} />

            <label>Old Password</label>
            <input type='password' placeholder='Old Password' required ref={passwordRef} onChange={confirmPassHandler}/>

            <label>New Password</label>
            <input type='password' placeholder='New Password' required ref={password2Ref} onChange={confirmPassHandler} />

            <button type='submit' className={styles.submit} disabled={isLoading ? true: false} >
                {isLoading ? <LoadingSpinner /> : 'Update'}
                
            </button>
        </form>
    </div>
}


export default EditProfileForm;