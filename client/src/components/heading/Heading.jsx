import React from "react";

export default function Heading({item}) {
  return (
    <div>
      {" "}
      <div class="relative inline-flex">
        <span className="absolute inset-x-0 bottom-0 border-b-[40px] border-green-500 border-opacity-35  -rotate-2"></span>
        <h1 className="relative text-2xl font-bold  sm:text-6xl lg:text-7xl bg-gradient-to-r from-lime-500 via-lime-400 to-white inline-block text-transparent bg-clip-text ">
          {item}
        </h1>
      </div>
    </div>
  );
}
