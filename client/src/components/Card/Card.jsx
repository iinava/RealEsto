import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";


export function CardFour({ item }) {
  console.log(item);
  return (
    <div className="flex flex-col items-center text-white  rounded-md  md:flex-row text-left bg-[#151515] py-4 md:py-0 ">
      <div className="h-full w-full md:h-[200px] md:w-[300px] ">
        {item.images ? (
          <img
            src={item.images[0]}
            alt="Laptop"
            className="object-cover h-full rounded-md aspect-video"
          />
        ) : (
          <span className="text-3xl ">image not available</span>
        )}
      </div>
      <div className="w-full md:w-auto lg:w-auto xl:w-auto ">
        <div className="px-4 ">
          <Link
            className="inline-flex items-center text-lg font-semibold hover:text-lime-500"
            to={`/${item.id}`}
          >
            {item.title} <ArrowUpRight className="w-4 h-4 ml-2" />
          </Link>

          <p className="mt-3 text-sm">{item.address}</p>
          <p className="mt-3 text-sm">{item.price} 💵</p>
          <div className="mt-4 flex gap-2 text-white">
            <span className=" px-4 py-2  inline-block rounded bg-lime-950 text-[10px] font-semibold ">
              {item.bedroom} Bedrooms
            </span>
            <span className=" px-4 py-2 inline-block rounded bg-lime-950  text-[10px] font-semibold ">
              {item.bathroom} BathRooms
            </span>

           
          </div>
        </div>
      </div>
    </div>
  );
}
