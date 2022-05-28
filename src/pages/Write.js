import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

import { AuthCtx } from '../store/Auth-context';
import CreateForm from '../components/CreateForm';

import styles from '../styles/Write.module.css';

const Write = () =>{
    const [error, setError] = useState({});
    const authCtx = useContext(AuthCtx);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (data.img == null){
            setError({type: 'error', msg: 'Image is required'});
            return;
        }
        if(!authCtx.token){
            navigate('/login'); // not logged in
            return;
        }
        const imageRef = ref(storage, `postImg/${data.title + v4()}`);
        uploadBytes(imageRef, data.img).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                
                fetch(`https://missileblog-default-rtdb.firebaseio.com/posts.json`, {
                    method: 'POST',
                    body: JSON.stringify({
                        ...data, img: url, date: new Date(), author: authCtx.token
                    })
                })
                .then(res => res.json())
                .then(res => {
                    setError({type: 'success', msg: 'Post Uploaded'});
                    setTimeout(()=> setError(null), 4000);
                    navigate('/myblogs');
                })
                .catch(error =>{
                    setError({type: 'error', msg: 'Error sending data'})
                });
            });
        });
    }
    return <section className={styles.writecontainer}>
        <h1>Create Post</h1>
        {error && <p className={error.type==='error'? 'danger':'success'}>{error.msg}</p>}
        <CreateForm onSubmit={onSubmit}/>
    </section>
}

export default Write;