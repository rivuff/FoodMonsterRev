import { useState , useEffect} from "react"
import {FETCH_MENU_URL} from "../constants"

const useRestaurant = (resId) => {
    const [restaurant, setRestaurant ] = useState(null);

    useEffect(()=> {
        getResturantInfo();
    },[])

    const end = "&submitAction=ENTER";
    
    async function getResturantInfo(){
        
        const data = await fetch(
            FETCH_MENU_URL + resId + end
        )
        const json = await data.json();
        setRestaurant(json.data)
    }

    return restaurant;
}

export default useRestaurant;