import React, {useContext, useEffect} from 'react'
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from '../context/RestaurantContext';

export default function RestaurantList(props) {
    const {restaurants, setRestaurants } = useContext(RestaurantsContext)
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await RestaurantFinder.get("/");
            console.log(response.data.data);
            setRestaurants(response.data.data.restaurants);
          } catch (err) {}
        };
        fetchData();
      }, [ ]);
      
      const handleDelete = async (id) => {
            try {
                const response = await RestaurantFinder.delete(`/${id}`);
                setRestaurants(restaurants.filter(restaurant => {
                    return restaurant.id !== id
                }))
                //console.log(response)
            } catch (err) {
            console.log(err)
            }
        };

        /*const handleDelete = async (id) => {
        try{
            const response = await RestaurantFinder.delete(`/${id}`)
            console.log(response);
        } catch(err){}
        }*/
    return (
        <div className="list-groups">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurants</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants &&  restaurants.map(restaurant => {
                        return (
                            <tr key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>reviews</td>
                                <td><button className="btn btn-warning">Update</button></td>
                                <td><button onClick={ () => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button></td>
                            </tr>

                        )
                        
                    })}
                    
                </tbody>
               
            </table>
        </div>
    )
}
