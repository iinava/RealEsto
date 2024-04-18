import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

import "react-quill/dist/quill.snow.css";

export default function AddPost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    const parsedValue = isNaN(value) ? value : parseInt(value); // Parse to integer if value is a number
    setFormData({ ...formData, [id]: parsedValue });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let FinalData = {
      PostData: {
        title: formData.title,
        price: formData.price,
        bedroom: formData.bedroom,
        bathroom: formData.bathroom,
        address: formData.address,
        city: formData.city,
        latitude: formData.latitude,
        longitude: formData.longitude,
        // img: formData.img,
        type: formData.type,
        property: formData.property,
      },
      PostDetail: {
        description: description,
        utilities: formData.utilities,
        petpolicy: formData.petPolicy,
        size: formData.size,
        school: formData.school,
        bus: formData.bus,
        restaurent: formData.restaurent,
      },
    };

    console.log(FinalData);
    try {
      setLoading(true);
      axios.post("/api/v1/post/addpost", FinalData).then((res) => {
        console.log(res.data, "updating user");

        setLoading(false);

        navigate("/profile");
      });
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-row flex-wrap-reverse text-white">
        <div className="w-[auto] lg:w-[70%] md-[65%] px-[3vw] lg:px-[20px]">
          <h1 className="text-2xl">Add new listing</h1>
          <span className="text-red-500">
            {error && "Something went wrong"}
          </span>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="title" className="text-base font-medium">
                    Information
                  </label>
                </div>
                <div className="mt-2 flex gap-[3.3%]">
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[33%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Title"
                    id="title"
                  />
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[30%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Price"
                    id="price"
                  />
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[30%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Address"
                    id="address"
                  />
                </div>
              </div>
              <div>
                <h1>Description</h1>
                <ReactQuill
                  theme="snow"
                  onChange={setDescription}
                  value={description}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="bathroom" className="text-base font-medium">
                    Number of rooms
                  </label>
                </div>
                <div className="mt-2  gap-[10%] flex-wrap flex">
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[45%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="Number"
                    placeholder="Number of bathrooms"
                    id="bathroom"
                  />
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[45%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="Number"
                    placeholder="Number of bedrooms"
                    id="bedroom"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="propertyType"
                    className="text-base font-medium"
                  >
                    Property Type
                  </label>
                </div>
                <div className="mt-2 flex gap-[10%] flex-wrap">
                  <select
                    onChange={handleChange}
                    className="flex h-10 w-[45%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="property"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Condo">Condo</option>
                    <option value="Land">Land</option>
                  </select>
                  <select
                    onChange={handleChange}
                    className="flex h-10 w-[45%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="type"
                  >
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="city" className="text-base font-medium">
                    Coordinates
                  </label>
                </div>
                <div className="mt-2 flex gap-[3.3%]">
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[33%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="City"
                    id="city"
                  />
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[30%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Latitude"
                    id="latitude"
                  />
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[30%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Longitude"
                    id="longitude"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="utilities" className="text-base font-medium">
                    General
                  </label>
                </div>
                <div className="mt-2 flex gap-[3.3%]">
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[33%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Utilities"
                    id="utilities"
                  />
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[30%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Pet Policy"
                    id="petPolicy"
                  />
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[30%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    placeholder="Size"
                    id="size"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="school" className="text-base font-medium">
                    Nearby Facilities Distances (in km)
                  </label>
                </div>
                <div className="mt-2 flex gap-[3.3%]">
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[33%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    placeholder="School"
                    id="school"
                  />
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[30%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    placeholder="Bus"
                    id="bus"
                  />
                  <input
                    onChange={handleChange}
                    className="flex h-10 w-[30%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="number"
                    placeholder="restaurent"
                    id="restaurent"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  {loading ? "Loading..." : "Update"}
                  <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="h-0 lg:h-screen md:h-auto  bg-[#ffffff60] w-[1px]  mx-2"></div>

        <div className="">
          <h1 className="text-3xl text-white">Add photos</h1>
        
        </div>
      </div>
    </div>
  );
}
