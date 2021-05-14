import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';

export default function RestaurantsDetailPage() {
    const {id} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

    useEffect(() => {
        try{
            const fetchData = async () => {
                const response = await RestaurantFinder.get(`${id}`)
                console.log(response)
                setSelectedRestaurant(response.data.data.restaurants)
            } 
            fetchData()

        } catch(err){
            console.log(err)
        }
           
    },[])
    return (
        <div>
            {selectedRestaurant && selectedRestaurant.name}
        </div>
    )
}
