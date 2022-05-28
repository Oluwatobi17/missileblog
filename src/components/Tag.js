const Tag = ({title, onClick}) => {
    const deleteHandler = () =>{
        onClick(title);
    }
    
    return <span className="tag">
        {title} <span title="Click to delete" onClick={deleteHandler} style={{opacity:0.6}}>x</span>
    </span>
}

export default Tag;