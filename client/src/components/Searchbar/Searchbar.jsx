import { useState } from "react";
import "./searchBar.scss";
import searchicon from "../../assets/images/search.png";
import { Link } from "react-router-dom";


const types = ["Buy", "Rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "",
    city:"",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handlechange = (e)=>{
    setQuery((prev) => ({ ...prev,[e.target.name]: e.target.value}));

    console.log(query);
  }

  return (
    <div className="searchBar text-black">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`${query.type === type ? "active" : ""}`}
          >
            {type}
          </button>
        ))}
      </div>
      <form action="">
      <div className="flex flex-wrap justify-start align-middle">
       
        <input name="city"  onChange={handlechange} placeholder="City location" class="bg-lime-950 text-lime-400 border border-lime-400 border-b-4 hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 h-[70px]  w-[150px] " />

        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          onChange={handlechange}
          placeholder="Min Price"
          class="bg-lime-950 text-lime-400 border border-lime-400 border-b-4  hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 h-[70px] w-[150px] "
        ></input>
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          onChange={handlechange}
          placeholder="Max Price"
          class="bg-lime-950 text-lime-400 border border-lime-400 border-b-4  hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300  h-[70px] w-[150px]"
        ></input>
     <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>   <button class="bg-lime-950 text-lime-400 border border-lime-400 border-b-4  hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300  h-[70px] w-[150px] ">
          <span className="text-center">🔍</span>
        </button></Link>
        
      </div></form>
    </div>
  );
}

export default SearchBar;
