import React, { useContext } from "react";
import bg from "../../assets/images/bg.png";
import SearchBar from "../../components/Searchbar/Searchbar";
import Team from "../../components/team/Team";
import { AuthContext } from "../../context/AuthContext";
import Heading from "../../components/heading/Heading";

export default function Hero() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser, "this is the current user");
  return (
    <div className=" flex flex-wrap w-auto justify-between px-[3vw] gap-3 text-white text-left">
      <div className=" w-[100vh] flex flex-col justify-start pt-8 gap-8 align-middle  ">
        <h1 className="text-[6vh] lg:text-[8vh] md:text-[8vh] font-bold text-wrap lg:w-[45vw] bg-gradient-to-r from-white via-lime-500 to-white inline-block text-transparent bg-clip-text ">
          Find Real Estate & Get Your Dream Place 🏠
        </h1>
        
        <div className="text-[15px]  opacity-75  font-semibold text-wrap lg:w-[45vw]">
          <p className="text-justify"> 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
        </div>
        <SearchBar />
        <div className="flex gap-[2vw] ">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-3xl font-bold">16 +</p>
            <p className="text-2xl opacity-80">Years of experience</p>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p className="text-3xl font-bold">200</p>
            <p className="text-2xl opacity-80">Awards Gained</p>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p className="text-3xl font-bold">200+</p>
            <p className="text-2xl opacity-80">Property Ready</p>
          </div>
        </div>
      </div>

      <div class="w-[30vw] rounded-lg hidden lg:block">
        <img className="" src={bg} alt="" />
      </div>
      <Team />
    </div>
  );
}
