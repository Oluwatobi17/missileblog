import { useState, useContext } from 'react';
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

import { AuthCtx } from '../store/Auth-context';

import styles from '../styles/ProfileImg.module.css';

const ProfileImg = () =>{
    const [imageUpload, setImageUpload] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthCtx);
    const updateChanges = (e) => {
        if(!e.target.files) return;
        setImageUpload(e.target.files[0]);
    }

    const updateHandler = () =>{
        setIsLoading(true);
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${authCtx.user.username + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const details = {...authCtx.user, profileImg: url};
                fetch(`https://missileblog-default-rtdb.firebaseio.com/users/${authCtx.token}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(details)
                })
                .then(res => res.json())
                .then(res => {
                    authCtx.setUser(res);
                    setError({type: 'success', msg: 'Image Updated'});
                    setIsLoading(false);
                    setTimeout(()=> setError(null), 4000);
                })
                .catch(error =>{
                    setError({type: 'error', msg: 'Error updating'})
                    setIsLoading(false);
                });
            });
        });
    }

    return <div className={styles.profileImg}>
        <div>
            <img src={authCtx.user.profileImg} alt="Profile" />
            {isLoading && 'Loading...'}
            <input type='file' onChange={updateChanges} />
        </div>
        {error && <p className={error.type==='error'? 'danger': 'success'}>{error.msg}</p>}
        <button onClick={updateHandler}>Update Image</button>
    </div>
}


export default ProfileImg;