import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { RestaurantsContextProvider } from './context/RestaurantContext';
import Error from './routes/Error';
import Home from './routes/Home';
import RestaurantsDetailPage from './routes/RestaurantsDetailPage';
import UpdatePage from './routes/UpdatePage';
export default function App() {
    return (
        <RestaurantsContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/restaurants/:id/update" component={UpdatePage} />
                        <Route exact path="/restaurants/:id" component={RestaurantsDetailPage} />
                        <Route component={Error} />
                    </Switch>
                    
                </Router>
                
            </div>
        </RestaurantsContextProvider>
    )
}
