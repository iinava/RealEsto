// "use client";

import React, { useContext } from "react";
import { Menu, X } from "lucide-react";
import Limebutton from "./button/Button";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {usenotificationstore} from "../lib/notification.Store.js"

import userimage from "../assets/userimage.jpg";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "view ",
    href: "/list",
  },
  {
    name: "Contact",
    href: "#",
  },
  {
    name: "Agents",
    href: "#",
  },
];

export default function Navbar() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetch = usenotificationstore((state) => state.fetch);
  const number = usenotificationstore((state) => state.number);

  if (currentUser) fetch();
  console.log(number,"njnanan number");

  const handleLogout = async () => {
    try {
      // console.log("loggin out");
      const res = await axios.post("/api/v1/auth/logout").then((response) => {
        console.log(response);
        localStorage.removeItem("user");
        navigate("/login");
        updateUser("");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full pt-3 text-white h-20">
      <div className="mx-auto flex  items-center justify-between px-[3vw] py-2 ">
        <div className="inline-flex items-center space-x-2">
          <span>
            <img src={logo} className="w-8 filter invert" alt="" />
          </span>
          <a href="/" className="font-bold hover:text-lime-500">
            Realesto
          </a>
        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-9">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="text-md font-semibold hover:text-lime-500"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex gap-4 h-full align-middle justify-center">
          {currentUser ? (
            <>
              <div>
                <img
                  className="w-10 h-10 rounded-[50%] object-cover"
                  src={currentUser.avatar ? currentUser.avatar : userimage}
                  alt=""
                />
              </div>
              <span className="mx-3 mt-2">{currentUser.username}</span>
              <div className="gap-4 flex">
                <div className="flex">
                        <Limebutton
                    item={"Profile"}
                    onclick={() => navigate("/profile")}
                  />
                 {number >0 && <div className="w-5 h-5 text-center rounded shadow-lg shadow-lime-500 bg-rose-500 text-black font-bold relative right-2">{number}</div>} 
                </div>
                <Limebutton item={"👉 Logout"} onclick={handleLogout} />
              </div>
            </>
          ) : (
            <Limebutton item={"👉 Login"} onclick={() => navigate("/login")} />
          )}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-black shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <img src={logo} className="w-8" alt="" />
                    </span>
                    <span className="font-bold">Realesto</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50 hover:text-black"
                      >
                        <span className="ml-3 text-base font-medium ">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
