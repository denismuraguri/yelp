import React from 'react'
import AddRestaurants from '../components/AddRestaurants'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'

export default function Home() {
    return (
        <div>
            <Header />
            <AddRestaurants />
            <RestaurantList />
        </div>
    )
}
