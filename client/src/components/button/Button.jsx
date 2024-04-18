import React from "react";

export default function Limebutton({ item, onclick }) {
  return (
    <div className="">
      <button
        onClick={onclick}
        className="relative px-4 py-2 overflow-hidden font-medium duration-300 border border-b-4 rounded-md outline-none bg-lime-950 text-lime-400 border-lime-400 hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 group"
      >
        <span className="bg-lime-400 shadow-lime-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
        {item}
      </button>
    </div>
  );
}
