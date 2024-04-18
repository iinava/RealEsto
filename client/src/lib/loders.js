import axios from "axios";
import { defer } from "react-router-dom";



export const singlepageLoader = async({request,params})=>{

    const response = await axios.get(`/api/v1/post/getpost/${params.id}`)
    console.log(response);
    return response.data
}   
export const listloader = async({request,params})=>{
   const query = request.url.split('?')[1]
   const res=  axios.get("/api/v1/post/getposts?" + query)

//    console.log((await res).data);

    // const response = await axios.get('/api/v1/post/getposts')
    // console.log(response);
    return defer({
        PostResponse: res
    })
}  


export const ProfileLoader = async({request,params})=>{
   const response = axios.get("/api/v1/user/profileposts")
   const chatresponse = axios.get("/api/v1/chats/getchats")
   console.log(response);
   return defer({
    PostResponse: response,
    chatresponse: chatresponse
   })
}



