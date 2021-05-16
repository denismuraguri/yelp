//TO USE ENVIRONMENT VARIABLE
require("dotenv").config();
const express = require("express")
const morgan = require("morgan");
const app = express()

const db = require("./db")
const cors = require("cors");

//app.use(morgan("dev"));

/*Middle ware are function that help to perform certain action and then sent it to  route handler. Middle ware are sequential
app.use((req, res, next) =>{
    res.status(404).json({
        status: "fail",
    })
})*/



//The below code belongs to package.json under the title script
//"start": "node server.js"*/




//http://localhost:4554/getrestaurant


//define express json middle ware
app.use(express.json())

//To use cors
app.use(cors())

//Create a Restaurants
app.post("/api/v1/restaurants", async(req, res) => {
    console.log(req.body);

    try{
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES($1, $2, $3) returning * ", [req.body.name, req.body.location, req.body.price_range]
        )            
        console.log(results.rows[0]);
        res.status(201).json({
            status: "success",
            data: {
                restaurants: results.rows[0],
            }
        });

        /*res.status(201).json({
            status: "success",
            data: {
                restaurants: "mcdonalds"
            }
        });*/
    } catch(err){
        console.log(err)
    }
    
});


//GET ALL RESTAURANTS
app.get("/api/v1/restaurants", async (req, res) => {
    //    console.log("route handler ran");

    try{
        const results = await db.query("select * from restaurants");
        //console.log(results.rows);

        res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
            restaurants: results.rows
        },
        
    })

    } catch(err) {
        console.log(err)
    }
    /*
    res.status(200).json({
        status: "success",
        data: {
            restaurants: ["mcdonalds", "wendy"]
        }
    })
    //res.send("this are the restaurants")
    //console.log("get all restaurant")
    **/
})

//Get a restaurants
app.get("/api/v1/restaurants/:id", async(req, res) => {
    console.log(req.params.id);  
    try{
        //Bello code ie string interpulation is prone to sql injection
        //const results = await db.query(`select * from restaurants where id = ${req.params.id}`);
                
        //using parameterized query to avoid sql injection
        const restaurant = await db.query("select * from restaurants where id = $1", [req.params.id]);
        console.log(restaurant.rows[0]);
        //const results = await db.query("select $2 from restaurants where id = $1", [req.params.id, "name"]);


        const reviews = await db.query(
            "select * from reviews where restaurant_id = $1",
            [req.params.id]
          );
          console.log(reviews);

        res.status(200).json({ 
            status: "success",
            data: {
                restaurants: restaurant.rows[0],
                reviews: reviews.rows,
            }
        }) 
        
    } 
    catch(err){
        console.log(err)
    }
    //console.log(req.params.id);
    //console.log(req.body)

    //console.log(req.body)     
       
})


//Update  restaurants
app.put("/api/v1/restaurants/:id", async(req, res) => {
    try{
        const results = await db.query(
            "UPDATE restaurants  SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        );
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurants: results.rows[0],
            }
        });
    } catch(err){
        console.log(err)
    }

    //console.log(req.params.id);
    console.log(req.body)     
})





//Delete restaurant
app.delete("/api/v1/restaurants/:id", async(req, res) => {
    try{
        const results = await db.query(
            "DELETE FROM restaurants WHERE id = $1",
            [req.params.id]
        );
        res.status(204).json({
            status: "success"
        });
    } catch(err){
        console.log(err)
    }
  
    
})


app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
      const newReview = await db.query(
        "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
        [req.params.id, req.body.name, req.body.review, req.body.rating]
      );
      console.log(newReview);
      res.status(201).json({
        status: "success",
        data: {
          review: newReview.rows[0],
        },
      });
    } catch (err) {
      console.log(err);
    }
});

const port = process.env.PORT|| 3002;;


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})


/**
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})


/*
const port = 5002
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
*/

/**
app.listen(500, () => {
    console.log("server is up on port 500")
});
**/