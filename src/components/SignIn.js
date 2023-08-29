import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import {UserState } from "../context/ContextProvider";

function SignIn(){

    const {logged,setLogged} = UserState();
    //console.log(UserState());
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "" 
    });

    let id, value
        
    const handleInputs = (e)=>{
        id = e.target.id;
        value = e.target.value;
        setUser({...user, [id]: value});
        
    }

    const postData = async(e)=>{
        e.preventDefault();

        try {
            const res ={
                headers:{
                    "Content-type":"application/json",
                }
            }

            const {data} = await axios.post(`http://localhost:3000/api/v1/login`, {email, password},res)
           
            setLogged(true);
            localStorage.setItem('userInfo', JSON.stringify(data));
        
            
            // props.set(true);
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    const {email , password} = user;
    

    return (
        <>

        <div className="flex justify-center justify-items-center mt-20">
        <div className="w-full max-w-md p-4">
        <img className='h-28 m-6 ml-36'
        alt='logo' 
        src='https://user-images.githubusercontent.com/74763144/222722640-82f61afa-22f0-4967-a9f9-226447a76ff5.png'></img>   
        <form>
        <div className="mb-6">
            <label for="email" className="block mb-2 text-sm font-medium">Your email</label>
            <input type="email" id="email" className="border border-yellow-300 text-gray-900 text-sm rounded-md w-full p-2.5 focus:bg-yellow-white focus:border-yellow-500 focus:border-2 focus:outline-none"  placeholder="name@flowbite.com"
            value={user.email} onChange={handleInputs} required/>
        </div>
        <div className="mb-6">
            <label for="password" className="block mb-2 text-sm font-medium">Your password</label>
            <input type="password" id="password" className="border border-yellow-300 text-gray-900 text-sm rounded-md w-full p-2.5 focus:bg-yellow-white focus:border-yellow-500 focus:border-2 focus:outline-none" value={user.passworda} onChange={handleInputs} required/>
        </div>
        <div className="flex items-start mb-6 ml-36">
            <div className="flex items-center h-5">
            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
            </div>
            <label for="remember" className=" ml-2 text-sm font-medium text-gray-900">Remember me</label>
        </div>
        <button type="submit" className="text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-3 text-center  ml-36" onClick={postData}>Submit</button>
        </form>
        <p className="ml-20 p-2 text-gray-400 font-semibold">Don't have an account ?<Link to='/signup' 
            className="hover:text-yellow-500 hover:underline "> Sign up</Link></p>
    </div>
    </div>
    </>

    )
}

export default SignIn