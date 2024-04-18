import React, { useContext, useEffect, useState } from "react";
import userimage from "../../assets/images/userimage.jpg";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
export default function UpdateProfile() {
  const { currentUser,updateUser } = useContext(AuthContext);

  const [first, setfirst] = useState({});
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(null);
  const [id, setid] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    setfirst(currentUser);
    console.log(currentUser);
    setid(currentUser.id)
    console.log(id,"frontis");
  }, [id]);
  const handlechange = (e) => {
    setfirst({ ...first, [e.target.id]: e.target.value });
    console.log(first);
  

    
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      axios.put(`/api/v1/user/updateuser/${id}`, first).then((res)=>{
        console.log(res.data,"updating user");
   
        setloading(false);
        updateUser(res.data)
        navigate("/profile");
      })
    } catch (error) {
      setloading(false);
      seterror(true)
      console.error("Error:", error);
    }
  };

 
  return (
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 text-white">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h1 className="text-2xl">Edit Details</h1>
        <span className="text-red-500">
          {error && "something went wrong "}
        </span>
        <form className="mt-8" onSubmit={HandleSubmit}>
          <div className="space-y-5">
            <img
              src={currentUser.avatar ? currentUser.avatar : userimage}
              className=" h-20 w-20 rounded-full"
            ></img>
            <div>
              <label htmlFor="name" className="text-base font-medium ">
                {" "}
                user Name{" "}
              </label>
              <div className="mt-2">
                <input
                  onChange={handlechange}
                  va
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Full Name"
                  id="username"
                  defaultValue={currentUser.username}
                ></input>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="text-base font-medium">
                {" "}
                Email address{" "}
              </label>
              <div className="mt-2">
                <input
                  onChange={handlechange}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  id="email"
                  defaultValue={currentUser.email}
                ></input>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-base font-medium">
                  {" "}
                  Password{" "}
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handlechange}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  id="password"
                ></input>
              </div>
            </div>
            <div>
              <button
                type="" onClick={HandleSubmit}
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              >
                {loading ? "Loading..." : "Update"}
                <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
