export const RestaurantCard =({name, cuisines, cloudinaryImageId, avgRating})=> {
    return (
        <div className="justify-between">
            <div className='max-w-sm w-80 m-8 rounded overflow-hidden shadow-lg p-4 flex flex-col transform transition duration-500 hover:scale-110'>
                <img className='w-full' alt='food' src={ 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/' + cloudinaryImageId}></img>
                <div className="px-6 py-4 h-50">
                    <div className="font-bold text-inherit mb-3 h-12 overflow-hidden">{name}</div>
                    <div className="text-gray-700 text-base h-12 overflow-hidden">{cuisines.join(", ")} </div>
                    <h4>{avgRating} stars </h4>
                </div>
            </div>
        </div>
    )
}

