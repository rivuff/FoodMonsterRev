import React, { useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { UserState } from '../context/ContextProvider';
import { Navigate } from 'react-router-dom';
import { clearCart } from "../utils/cartSlice";
import { useDispatch } from 'react-redux';

function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
    const { logged, setLogged} = UserState();
  const toggleDropdown = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();

  const removeAll = item =>{
      console.log(item);
      dispatch(clearCart(item))
  }


  const clicked = ()=>{
    if(logged===true){
        setLogged(false);
    }
    
    localStorage.removeItem('userInfo')

       
  }

  return (
    <div className="relative">
      <button
        type="button"
        className=" flex items-center justify-center w-full mx-2 p-2  hover:bg-yellow-400 rounded-lg bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 text-xs"
        onClick={toggleDropdown}
      >
        <span>{props.name}</span>
        <HiChevronDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
      </button>
      {isOpen && (
        <button className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" onClick={clicked}>
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem"> Log out</div>
            </div>
        </button>
      )}
    </div>
  );
}

export default Dropdown;





