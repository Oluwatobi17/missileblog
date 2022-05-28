import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Blog from "../components/Blog";
import { AuthCtx } from "../store/Auth-context";

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const authCtx = useContext(AuthCtx);
    useEffect(()=>{
        fetch('https://missileblog-default-rtdb.firebaseio.com/posts.json')
        .then(res => res.json())
        .then(res => {
            const myposts = Object.values(res).filter(post => post.author===authCtx.token);
            const mypostsWithid = [];
            for(let i=0; i<myposts.length; i++){
                const index = Object.values(res).findIndex(post => post.title===myposts[i].title);
                const postwithId = {...myposts[i], id: Object.keys(res)[index]}
                mypostsWithid.push(postwithId);
            }
            setBlogs(mypostsWithid);
        }).catch(e => console.log('Error loading your posts'));
    }, []);

    return <section className="sectioncontainer">
        <div className="titlecontainer">
            <h1>Inc. This Day</h1>
            <h1><q>My Posts</q></h1>
            <p>awesome place to make oneself exercise creativity, be productive and entertained through daily updates</p>
        </div>

        <div className="blog-container">
            {blogs.map(blog => <Blog data={blog} key={blog.id}/>)}

            {blogs.length===0 && <p style={{textAlign: 'center'}}>You do not have an active blog post
                <br/>
                <Link to='/write'>Start Writing</Link>
                </p>}
        </div>
    </section>
}

export default MyBlogs;