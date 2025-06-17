import axios from "axios";

const axiosIntance = axios.create({
    baseURL:"https://todo-1-chi.vercel.app/api/todo",
    headers:{
        "Content-Type":"application/json"
    }
})

export default axiosIntance