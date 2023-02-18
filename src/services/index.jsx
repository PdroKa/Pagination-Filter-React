import axios from "axios";

export const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/"
})
export const getUsers= async()=>{
    return api.get('/comments')
}

