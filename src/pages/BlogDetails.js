import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { AuthCtx } from "../store/Auth-context";
import LoadingSpinner from "../components/LoadingSpinner";

const BlogDetails = () =>{
    const [data, setData] = useState({author: ''});
    const [author, setAuthor] = useState({profileImg: 'assets/user.png', username: ''});
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const authCtx = useContext(AuthCtx);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`https://missileblog-default-rtdb.firebaseio.com/posts/${id}.json`)
        .then(res => res.json())
        .then(res => {
            setIsLoading(false);
            const date = new Date(res.date).toDateString();
            setData({...res, date});
            fetch(`https://missileblog-default-rtdb.firebaseio.com/users/${res.author}.json`)
            .then(res => res.json())
            .then(res => {
                setAuthor(res);
            }).catch(e => console.log('Error loading author'));
        }).catch(e => console.log('Error loading post'));
        setIsLoading(false);
    }, [id]);

    if(isLoading) return <span style={{textAlign: 'center'}}> <LoadingSpinner/> </span>
    if(!isLoading && Object.keys(data).length===0) return <section  style={{textAlign: 'center'}} className="sectioncontainer">Error Loading Page, please refresh </section>


    const deletePost = () => {
        fetch(`https://missileblog-default-rtdb.firebaseio.com/posts/${id}.json`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(res  => {
            navigate('/myblogs');
        })
        .catch(e => console.log('Error deleting post'))
    }
    return <section className="blogdetails">
        <div className="titlecontainer">
            <p>Published {data.date} By {author.username}</p>
            <h1><q>{data.title}</q></h1>
            {Object.keys(data).length > 1 &&
                <div className="categories">
                    {data.categories.map(category => (
                        <Link to={`/blog/tag/${category}`}>
                            <span className="tag">{category}</span>
                        </Link>
                    ))}
                </div>
            }
        </div>
        <img src={data.img} alt="PostImg"/>

        <div className="author-action">
            <div>
                <img src={author.profileImg} alt="AuthorImg"/>
                <span>{author.username}</span>
            </div>
            { data.author===authCtx.token && <i className="fa fa-trash-o" aria-hidden="true" onClick={deletePost}></i> }
            
        </div>

        <p className="postbody">{data.body}</p>
    </section>
}

export default BlogDetails;