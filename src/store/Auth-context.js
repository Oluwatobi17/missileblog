import { useState, createContext } from 'react';

export const AuthCtx = createContext({
    token: '',
    user: {},
    setUser: (user)=>{},
    configToken: (newtoken)=>{}
});

const AuthCtxProvider = (props) =>{
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({});

    const context = {
        token,
        user,
        setUser: (user) =>{
            setUser(user);
		    localStorage.setItem('user', JSON.stringify(user));
        },
        configToken: (newtoken) => {
            setToken(newtoken);
            localStorage.setItem('token', newtoken);
        }
    }

    return <AuthCtx.Provider value={context}>
        {props.children}
    </AuthCtx.Provider>
}

export default AuthCtxProvider;