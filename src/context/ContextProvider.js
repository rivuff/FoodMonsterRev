import{ createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginContext = createContext();

const ContextProvider = ({children}) => {
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(login===true){
            navigate('/login')
        }
        console.log(login);
    }, [navigate, login])

    console.log("context",login);
    return <LoginContext.Provider value={{login,setLogin}}>{children} </LoginContext.Provider>

}

export const UserState = () => {
    return useContext(LoginContext);
}

export default ContextProvider
