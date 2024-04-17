import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export function CardFour({ item }) {
  console.log(item);
  return (
    <div className="flex flex-col items-center text-white border-2 rounded-md p border-lime-500 md:flex-row">
      <div className="h-full w-full md:h-[200px] md:w-[300px]">
        
        {item.images ? <img
          src={item.images[0]}
          alt="Laptop"
          className="object-cover h-full border-2 rounded-md aspect-video border-lime-500"
        /> : <span className="text-3xl ">image not available</span>}
       
      </div>
      <div>
        <div className="p-4">
          <Link className="inline-flex items-center text-lg font-semibold hover:text-lime-500" to={`/${item.id}`}>
            {item.title} <ArrowUpRight className="w-4 h-4 ml-2" />
          </Link>
         
          <p className="mt-3 text-sm">{item.address}</p>
          <p className="mt-3 text-sm">{item.price} 💵</p>
          <div className="mt-4">
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              {item.bedroom}
            </span>
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              {item.bathroom}
            </span>
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              🗃️save
            </span>
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              🗣️ message
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
