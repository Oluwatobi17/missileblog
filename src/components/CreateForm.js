import { useState, useRef } from 'react';

import styles from '../styles/Write.module.css';
import Tag from './Tag';

const CreateForm = (props) =>{
    const [tags, setTags] = useState([]);
    const [imageUpload, setImageUpload] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const categoriesRef = useRef();
    const titleRef = useRef();
    const bodyRef = useRef();
    
    const tagHandler = (e) => {
        setTags(e.target.value.split(','));
    }
    const deleteTag = (title) =>{
        const newtags = tags.filter(tag => tag !== title);
        setTags(newtags);
        categoriesRef.current.value = newtags.toString();
    }
    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let categories = categoriesRef.current.value;
        categories = categories.replace(' ', '');
        if(categories.endsWith(',')){
            categories = categories.slice(0, -1);
        }
        props.onSubmit({
            title: titleRef.current.value,
            body: bodyRef.current.value,
            img: imageUpload,
            categories: categories.split(',')
        });
    }
    return <form className={styles.createform} onSubmit={submitHandler}>
        <label>Title</label>
        <input type='text' placeholder='Title' required ref={titleRef}/>

        <label>Body</label>
        <textarea rows={10} placeholder='Body' ref={bodyRef} required></textarea>

        <label>Post Image</label>
        <input type='file' onChange={(e)=> setImageUpload(e.target.files[0])} required />

        <label>Categories</label>
        <input type='text' placeholder='Technology, Fashion' onChange={tagHandler} ref={categoriesRef} required />
        <div>
            {tags.map(tag => <Tag key={tag} title={tag} onClick={deleteTag} />)}
        </div>

        <input type='submit' value={isLoading ? 'Loading...': 'Publish'}
         className={styles.submit} disabled={isLoading ? true: false}/>
    </form>
}

export default CreateForm;