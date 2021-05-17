import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews"
import AddReview from '../components/AddReview';

export default function RestaurantsDetailPage() {
    const {id} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

    useEffect(() => {
        try{
            const fetchData = async () => {
                const response = await RestaurantFinder.get(`${id}`)
                console.log(response)
                setSelectedRestaurant(response.data.data)
            } 
            fetchData()

        } catch(err){
            console.log(err)
        }
           
    },[])
    return (
        <div>
            {/*{selectedRestaurant && <StarRating rating={4.5} /> }*/}
            {selectedRestaurant && (
                <>      
                <h1 className="text-center display-1">{selectedRestaurant.restaurants.name}
                </h1>
                <div className="text-center">
                    <StarRating rating={selectedRestaurant.restaurants.avarage_rating} />
                    <span className="text-warning ml-1">
                        {selectedRestaurant.restaurants.count ? `(${selectedRestaurant.restaurants.count})` : "(0)"}
                    </span>

                </div>  
                <div className="mt-3">
                    <Reviews reviews={selectedRestaurant.reviews} />
                </div>
                <AddReview />
                </>
            )}

        </div>
    )
}
