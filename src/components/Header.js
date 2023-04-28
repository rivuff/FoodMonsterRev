import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {BsFillCartCheckFill} from "react-icons/bs"
import { FaBeer } from 'react-icons/fa';
import SignIn from "./SignIn.js";
import "../index.css"
import { UserState } from "../context/ContextProvider.js";
import Dropdown from "./DropDown.js";

const Title = ()=> (
    // <h2 id='title' key='h2'>Food Monster</h2>
    <a href='/'> 
        <img
        className='h-28'
        alt='logo' 
        src='https://user-images.githubusercontent.com/74763144/222722640-82f61afa-22f0-4967-a9f9-226447a76ff5.png'/>
     </a>
)



const HeaderComponent = ()=>{
    const {logged, setLogged, user} = UserState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const login = SignIn();

    // const {user}= useContext(UserContext);

    const cartItems = useSelector(store => store.cart.items)
    console.log(cartItems);

    

    return (
        <div className='flex justify-between bg-green-50 shadow-md p-3 mb-1' >
        <Title/>
        <div>
            <p className="py-12 text-yellow-500 font-bold text-lg italic">Delivering deliciousness to your doorstep !!</p>
        </div>
        <div className='nav-items'>
            <ul className="flex py-10 ">
                <li className="px-3 mx-2 py-2 hover:bg-yellow-400 rounded-lg"><Link to='/'> Home</Link></li>
                <li className="px-2 mx-2 py-2 hover:bg-yellow-400 rounded-lg"><Link to='/about'> About</Link></li>
                <li className="px-2 mx-2 py-2 hover:bg-yellow-400 rounded-lg"><Link to='/instamart'> instamrt</Link></li>
                <li 
                className="px-2 py-2 mx-2 hover:bg-yellow-400 rounded-lg">
                    <Link className="flex" to='/cart'>
                        <div className="m-1">
                        {<BsFillCartCheckFill/>}
                        </div>
                        <div>
                        {cartItems.length}
                        </div>
                   </Link>
                
                </li>

                {
                    logged ? <li>
                       <Dropdown name={user?.res}/>
                     </li>
                    : <li className="px-3 mx-2 py-2 hover:bg-yellow-400 rounded-lg bg-yellow-300"><Link to='/login'> log in</Link></li>

                   
                }
                
                {/* <li className="px-3 mx-2 py-2 hover:bg-yellow-400 rounded-lg bg-yellow-300"><Link to='/login'> log in</Link></li> */}

                {/* <li className="px-2 py-2 mx-2 hover:bg-yellow-400 rounded-lg bg-yellow-300">{isAuthenticated? <button onClick={()=>setIsAuthenticated(false)}>Log In</button> : <button onClick={()=>setIsAuthenticated(true)}>log Out</button>}
                </li> */}
            </ul>
        </div>   
        </div>
    );
};

export default HeaderComponent