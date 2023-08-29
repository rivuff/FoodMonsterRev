import { RestaurantCard } from './RestaurantCard';
import { restaurantList } from '../constants';
import { useState, useEffect } from 'react';
import MenuShimmer from './Shimmer';
import { Link } from 'react-router-dom';
import { filterData } from '../utils/helper';
import useOnline from '../utils/useOnline';
import styles from "../index.css"

const Body = () => {
  const [searchText, setSearchText] = useState('');
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    getResturants();
  }, []);

  const online = useOnline();

  if (online === false) {
    return (
      <h1>Seems you are offline, check your wifi connection</h1>
    );
  }

  async function getResturants() {
    const data = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&page_type=DESKTOP_WEB_LISTING'
    );

    const json = await data.json();

    console.log(json);
    setAllRestaurants(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurants(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }

  //Not rendered component (early return)
  if (!allRestaurants) return null;

  return allRestaurants.length == 0 ? (
    <MenuShimmer />
  ) : (
    <div>
      <div className='mb-16'>
      <div className="p-2 mb-2 shadow-md flex justify-center bg-gray-50">
        <div className="">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch border-solid">
            <input
              type="text"
              className="relative mx-1 flex-auto rounded-l border border-solid bg-white border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
              placeholder="Search"
              value={searchText}
              onChange={e => {
                setSearchText(e.target.value);
              }}
            />
            <button
              className=" relative z-[2] flex items-center rounded-r bg-gray-50 rounded-md px-6 py-1 font-medium uppercase leading-tight shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              onClick={() => {
                const data = filterData(allRestaurants, searchText);
                setFilteredRestaurants(data);
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredRestaurants.length == 0 ? (
          <h1>No restaurant found</h1>
        ) : (
          filteredRestaurants.map(restaurant => {
            return (
              <div>
                <Link
                  to={'/restaurant/' + restaurant.info.id}
                  key={restaurant.info.id}
                >
                  <RestaurantCard {...restaurant.info} />
                </Link>
              </div>
            );
          })
        )}
      </div>
      </div>
    </div>
  );
};

export default Body;
