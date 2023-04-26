// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItem, removeItem,updateItem } from '../utils/cartSlice';
import useRestaurant from '../utils/useRestaurant';
import MenuShimmer from './Shimmer';


export const ResturantMenu = () => {
  const IMG_CDN_URL =
    'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/';
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(store => store.cart.items);
  console.log(cartItems[0]?.qty);

  const restaurant = useRestaurant(id);

  console.log(
    restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR
      ?.cards[1]?.card?.card.itemCards
  );


  const addFoodItem = item => {
    console.log(item?.card?.info?.id);

    const existingItem = cartItems?.find(
      (i) => i.card?.info?.id === item?.card?.info?.id
    );

    // console.log("item "+ {existingItem});

    if (existingItem) {
      dispatch(
        updateItem({
        //   id: existingItem.item?.data?.info?.id,
          id: existingItem.card.info.id,
          qty: existingItem.qty+1
        })
      );
    } else {
      dispatch(addItem({...item, qty: 1 }));
    }
    
  };

  const removeFoodItem = item => {
    console.log(item?.card?.info?.id);

    const existingItem = cartItems?.find(
      (i) => i.card?.info?.id === item?.card?.info?.id
    );

    // console.log("item "+ {existingItem});

    if (existingItem) {
      if(existingItem.qty>1){
        dispatch(
          updateItem({
          //   id: existingItem.item?.data?.info?.id,
            id: existingItem.card.info.id,
            qty: existingItem.qty-1
          })
        );
      }
      else{
        dispatch(removeItem({
          id: existingItem.card.info.id,
          }))
      } 
    } 
  };

  console.log({ cartItems });


  return !restaurant ? (
    <>
      (<MenuShimmer />)
    </>
  ) : (
    <div className="grid justify-center mb-10">
    <>
      <div className="bg-slate-50 p-2 px-6">
        <div className="text-2xl font-bold">
          {restaurant?.cards[0]?.card?.card?.info?.name}
        </div>
        <div className="pb-4">
          <div className="flex flex-row justify-between">
            <ul className="flex flex-col w-100">
              <li className="font-light text-sm">
                {restaurant?.cards[0]?.card?.card?.info?.city}
              </li>
              <li className="font-light text-sm mb-2">
                {restaurant?.cards[0]?.card?.card?.info?.cuisines?.join(
                  ', '
                )}
              </li>
              <li className="font-bold text-sm">
                {restaurant?.cards[0]?.card?.card?.info?.totalFee}
              </li>
              <li className="font-bold text-sm">
                cost for two ₹
                {restaurant?.cards[0]?.card?.card?.info?.costForTwo /
                  100}
              </li>
            </ul>
            <ul className="flex">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Rating star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-black">
                {restaurant?.cards[0]?.card?.card?.info.avgRating}
              </p>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h1 className="mb-2 text-base font-bold">
          Breakfast & All Day Meals {restaurant?.cards[2]?.length}
        </h1>

        {Object.values(
          restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card.itemCards
        ).map(item => (
          <>
            <div
              key={item?.data?.info?.id}
              className="max-w-sm w-full lg:max-w-full lg:flex m-4 divide-y-2"
            >
              <img
                className="h-36 lg:w-48 overflow-hidden rounded-md"
                key={item.card.info.imageId}
                src={
                  item.card.info.imageId.length === 0
                    ? 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800'
                    : IMG_CDN_URL + item.card.info.imageId
                }
              ></img>

              <div className="text-sm p-2 pl-4">
                <p className="mb-2 text-base font-bold text-gray-700">
                  {item.card.info.name}
                </p>

                <p className="text-xs text-gray-500 overflow-hidden mb-1">
                  {' '}
                  ₹{item.card.info.price / 100}
                </p>
                <p className="w-80 h-9 text-xs text-gray-500 overflow-hidden">
                  {item.card.info.description}
                </p>
                
                {cartItems.findIndex((i) => i.card?.info?.id === item?.card?.info?.id)===-1?  <button 
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mt-2"
                  onClick={() => addFoodItem(item)}
                >
                  Add
                </button>:<>

                <div className="flex border border-gray w-16 justify-around items-center rounded-md">
                    <button
                     onClick={() => removeFoodItem(item)}
                      className="text-xl"
                    >
                      -
                    </button>
                    <p className="text-green text-sm">{cartItems[cartItems?.findIndex((i) => i.card?.info?.id === item?.card?.info?.id)]?.qty}</p>
                    <button
                      className="hover:scale-110 delay-100 transition-all rounded-md"
                      onClick={()=> addFoodItem(item)}
                    >
                      +
                    </button>
                  </div>
                {/* <div className='flex'>
                <TfiMinus  onClick={() => removeFoodItem(item)} /> {cartItems[cartItems.findIndex((i) => i.card?.info?.id === item?.card?.info?.id)]?.qty}  <TfiPlus onClick={()=> addFoodItem(item)}/>
                </div> */}
                </> 
                }
              </div>
            </div>
          </>
        ))}
      </div>
      <div>
      
      </div>
    
    </>
    </div>

    //name of restaurants, image url, price, descrition, food items
  );
};
