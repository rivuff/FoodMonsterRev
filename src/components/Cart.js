import { useDispatch, useSelector } from "react-redux";

import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom"
import { UserState } from "../context/ContextProvider";

const Cart = ()=>{
    const {logged, user} = UserState();

    const cartItems = useSelector((store)=>(store.cart.items));
    const dispatch = useDispatch();


    let sum = 0;
    if(cartItems?.length>0){
        cartItems?.forEach(element => {
            sum += element?.qty*(element.card.info.price/100);
        });
    }
    

    const removeAll = item =>{
        console.log(item);
        dispatch(clearCart(item))
    }

    return(
        logged?<div className="flex justify-between p-10">
        <div className=" p-8 m-6 pr-20 ml-80 mt-10 rounded shadow-lg w-2xl h-96">
            <p className=" text-lg font-bold text-slate-700 p-2">Home</p>
            <p className=" px-2 text-sm font-bold text-slate-500 p-2 pb-4">You have a saved address in this location</p>
            <div className="border border-solid-50 p-4 w-96 h-52 text-left">
                <p className=" font-sans font-semibold ">Home</p>
                <p className="h-28 text-sm text-slate-400">{user.add}</p>
                <button className="flex justify-items-center items-center justify-center w-28 mx-2 p-2  hover:bg-yellow-400 rounded-lg bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm">Deliver Here</button>
            </div>
        </div>

        <div className=" max-w-md m-8 rounded overflow-hidden shadow-lg mb-16">

            <div  className="justify-between flex">
                <p className="p-4 justify-center w-60 font-bold">Items</p>   
                <button type="button" className="focus:outline-none text-white bg-red-700 text- hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-xs px-2 mr-1 mb-2.5 mt-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={()=>removeAll()}>clear cart</button>
            </div>
             
            <div>
            {
               cartItems.length>0 ?cartItems?.map((item)=>(
                <>
                    <div className="justify-between flex">
                        <p className="p-6 justify-center w-40">{item.card.info.name}</p>
                        <p className="p-6 justify-center w-20">{item.qty}</p>
                        <p className="px-3 py-6 justify-center w-20">₹ {item.card.info.price/100}</p>
                    </div>
                </>
                )): <></>
            }
            </div>  

            <hr className="my-4 border-1 border-black dark:bg-black"/>

            <div>
            <div  className="justify-between flex">
                <p className="p-4 justify-center w-40 font-bold">To Pay</p>   
                <p className="p-3  justify-center w-20 font-bold">₹ {sum}</p>
            </div>
            </div>
                    
        
        </div>
        </div>
    :<div className="flex justify-between">
            <div className=" p-8 m-6 pr-20 ml-80 mt-10 rounded shadow-lg w-2xl h-96">
                <p className=" p-2 text-lg font-bold text-slate-700">Account</p>
                <p className=" px-2 text-sm font-bold text-slate-500">To place your order now, log in to your existing account or sign up.</p>
                <div className="grid justify-items-center">
                    <p className="p-4 px-8 text-sm font-bold text-slate-400">Have an account already ?</p>
                    <button type="" className=" bg-white border border-yellow-400 focus:outline-none hover:bg-yellow-300 focus:ring-4 focus:ring-yellow-200 font-sm rounded-md text-sm p-4 mr-2 mb-2 "><Link to='/login'>LOG IN</Link></button>

                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-64 h-px my-6 ml-3 bg-gray-200 border-0 dark:bg-gray-700"/>
                    </div>
                    <p className="p-4 px-8 text-sm font-bold text-slate-400">new to foodMonster ?</p>
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-md text-sm p-4 mr-2 mb-2 dark:focus:ring-yellow-900"><Link to='/signup'>SIGN UP</Link></button>
                </div>
            </div>

            <div className=" max-w-md m-8 rounded overflow-hidden shadow-lg mb-16">

                <div  className="justify-between flex">
                    <p className="p-4 justify-center w-60 font-bold">Items</p>   
                    <button type="button" className="focus:outline-none text-white bg-red-700 text- hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-xs px-2 mr-1 mb-2.5 mt-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={()=>removeAll()}>clear cart</button>
                </div>
                 
                <div>
                {
                   cartItems.length>0 ?cartItems?.map((item)=>(
                    <>
                        <div className="justify-between flex">
                            <p className="p-6 justify-center w-40">{item.card.info.name}</p>
                            <p className="p-6 justify-center w-20">{item.qty}</p>
                            <p className="px-3 py-6 justify-center w-20">₹ {item.card.info.price/100}</p>
                        </div>
                    </>
                    )): <></>
                }
                </div>  

                <hr className="my-4 border-1 border-black dark:bg-black"/>

                <div>
                <div  className="justify-between flex">
                    <p className="p-4 justify-center w-40 font-bold">To Pay</p>   
                    <p className="p-3  justify-center w-20 font-bold">₹ {sum}</p>
                </div>
                </div>
                        
            
            </div>
            </div>
       
    )
}

export default Cart;