import axios from "axios"

export const userLogin=(login)=>{
 return axios.post("https://dashboard-8rzu.onrender.com/api/login",login);
} 

export const userSignup=(signup)=>{
 return axios.post("https://dashboard-8rzu.onrender.com/api/signup",signup);
}

