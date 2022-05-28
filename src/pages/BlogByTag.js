import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Blog from "../components/Blog";
import LoadingSpinner from "../components/LoadingSpinner";

const BlogByTag = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { tag } = useParams();

    useEffect(()=>{
        setIsLoading(true);
        fetch('https://missileblog-default-rtdb.firebaseio.com/posts.json')
        .then(res => res.json())
        .then(res => {
            const mypostsWithid = [];
            for(let i=0; i<Object.values(res).length; i++){
                if(Object.values(res)[i].categories.findIndex(cat => cat === tag) !== -1){
                    const postwithId = {...Object.values(res)[i], id: Object.keys(res)[i]}
                    mypostsWithid.push(postwithId);
                }
            }
            setIsLoading(false);
            setBlogs(mypostsWithid);
        }).catch(e => console.log('Error loading your posts'));
        setIsLoading(false);
    }, [tag]);

    return <section className="sectioncontainer">
        <div className="titlecontainer">
            <h1>Inc. This Day</h1>
            <h1><q>{tag}</q></h1>
            <p>awesome place to make oneself exercise creativity, be productive and entertained through daily updates</p>
        </div>

        <div className="blog-container">
            {blogs.map(blog => <Blog data={blog} key={blog.id}/>)}

            {blogs.length===0 && <p style={{textAlign: 'center'}}>No Blog Posts</p>}

            {isLoading && <p style={{textAlign: 'center'}}><LoadingSpinner /></p>}
        </div>
    </section>
}

export default BlogByTag;