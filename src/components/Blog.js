import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/Blog.module.css';

const Blog = ({data}) =>{
    const date = new Date(data.date).toDateString();
    const [userdata, setUserdata] = useState({authorimg: 'assets/user.png', username: 'Loading...'});
    useEffect(()=>{
        fetch(`https://missileblog-default-rtdb.firebaseio.com/users/${data.author}.json`)
        .then(res => res.json())
        .then(res => {
            setUserdata(res);
        }).catch(e => console.log('Error author details'));
    }, []);

    return <div className={styles.blog}>
        <img src={data.img} alt={data.title} />

        {data.categories.map(category => (
            <Link to={`/blog/tag/${category}`}>
                <span className="tag">{category}</span>
            </Link>
        ))}

        <h4>{data.title}</h4>

        <p className={styles.body}>{data.body}</p>

        <div>
            <div>
                <img src={userdata.profileImg} alt='Author' />
                <p>{userdata.username} <br/> {date}</p>
            </div>

            <Link to={`/blog/${data.id}`}>more</Link>
        </div>
    </div>
}

export default Blog;