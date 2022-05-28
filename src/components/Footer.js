import { Link } from 'react-router-dom';

const Footer = (props) =>{
    return <footer>
        <div>
            <img src="assets/logoFooter.png" alt="Logo" />

            <div>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/myblogs'>My Posts</Link>
                <Link to='/write'>Write</Link>
            </div>
        </div>

        <p>Coded by <a href="https://portfolio-f576a.web.app/projects" target="_blank" rel="noreferrer">
            Ganiu Ibrahim Olalekan
            </a></p>
    </footer>
}


export default Footer;
