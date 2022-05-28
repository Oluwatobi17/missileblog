import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import './App.css';
import { AuthCtx } from './store/Auth-context';

import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Write from "./pages/Write";
import MyBlogs from "./pages/MyBlogs";
import Home from "./pages/Home";
import BlogByTag from "./pages/BlogByTag";
import PageNotFound from "./pages/PageNotFound";
import About from "./pages/About";
import BlogDetails from "./pages/BlogDetails";

const App = () =>{
	const authCtx = useContext(AuthCtx);

	// useEffect(()=>{
	// 	let token = localStorage.getItem('token');
	// 	console.log(token);
	// 	console.log( token.length==0 );
	// 	if(token != null){
	// 		fetch(`https://missileblog-default-rtdb.firebaseio.com/users/${token}.json`)
	// 		.then(res => res.json())
	// 		.then(res => {
	// 			console.log(res);
	// 			authCtx.setUser(res);
	// 			authCtx.configToken(token);
	// 		}).catch(e => console.log('Error author details'));
	// 	}
	// }, []);
	return <Layout>
		<Routes>
			<Route path='/signup' element={<Signup />} />
			<Route path='/login' element={<Login />} />
			<Route path='/profile' element={authCtx.token ? <Profile />:<Login/>} />
			<Route path='/write' element={authCtx.token ? <Write />:<Login />} />
			<Route path='/myblogs' element={authCtx.token ? <MyBlogs />:<Login />} />
			<Route path='/' element={<Home />} />
			<Route path='/about' element={<About />} />
			<Route path='/blog/tag/:tag' element={<BlogByTag />} />
			<Route path='/blog/:id' element={<BlogDetails />} />
			<Route path='*' element={<PageNotFound />} />

			{/* <Route path='#' element={<Home />} /> */}
		</Routes>
	</Layout>
}

export default App;