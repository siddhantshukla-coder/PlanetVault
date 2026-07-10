// self pinging every 14 min...
const url = `https://planetvault.onrender.com/`; 
const interval = 14*60*1000; // Interval in milliseconds (14 minutes)

//Reloader Function
function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

setInterval(reloadWebsite, interval);
const BASE_URL = import.meta.env.VITE_API_URL;

export async function signup(userData){
    const response = await fetch(`${BASE_URL}/signup` , {
        method:'POST',
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(userData)
    });
    const data=await response.json();
    if(!response.ok){
        throw new Error(data.message);
    }
    return data;
}

import axios from "axios"
const api=axios.create({
    baseURL: BASE_URL
})
export default api;

export async function login(userData){
    try{
        const response = await api.post(
            "/login",
            userData
        )
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
export async function addPlanet(planetData){
    try{
        const response=await api.post(
            "/planet",
            planetData
        )
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
export async function findPlanet(name){
    try{
        const response=await api.get(
            `/planet?name=${name}`,
        )
        return response.data;
    }
    catch(err){
        console.log(err);
       
    }
}
export async function userData(){
    try{
        const user=await api.get(
            "/profile"
        )
        return user.data;
    }
    catch(err){
        console.log(err);
        
    }
}
export async function getAddedSearched(){
    try{
        const data=await api.get(
            "/getAddedSearched"
        )
        console.log(data);
        return data.data;
    }
    catch(err){
        console.log(err);
        
    }
}
export async function changeAddedSearched(newData){
    try{
        const data=await api.put(
            "/changeAddedSearched",
            newData
        )
        return data.data;

    }
    catch(err){
        console.log(err);
    }
}
export async function editProfile(newUserData){
    try{
        const userData = await api.put(
            "/editProfile",
            newUserData
        )
        return userData.data
    }
    catch(err){
        console.log(err);
    }
}
export async function deleteProfile(){
    try{
        await api.delete(
            "/deleteProfile",
        )
        
    }
    catch(err){
        console.log(err);
    }
}
api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
})
api.interceptors.response.use(
    (response)=>response,
    (error) =>{
        if(error.response?.status===401){
            localStorage.removeItem("token")
            window.location.href="/login"

        }
        return Promise.reject(error);
    }
)