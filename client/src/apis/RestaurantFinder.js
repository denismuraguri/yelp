import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:4554/api/v1/restaurants"
})

