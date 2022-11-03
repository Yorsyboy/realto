import React, { useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
  });
  const { type, name, bedrooms, bathrooms, parking, furnished, address, description } =
    formData;
  const handleChange = (e) => {};
  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
      <form>
        <p className="text-lg mt-6 font-semibold">Sell or Rent</p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={handleChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded
            hover:shadow-lg focus:shadow-lg active:shadow-lg
            transition ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Sell
          </button>

          <button
            type="button"
            id="type"
            value="rent"
            onClick={handleChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded
            hover:shadow-lg focus:shadow-lg active:shadow-lg
            transition ease-in-out w-full ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          required
          onChange={handleChange}
          placeholder="Name"
          maxLength={32}
          minLength={10}
          className="w-full px-4 py-2 text-xl text-gray-700
           bg-white border-gray-300 rounded transition 
           ease-in-out duration-150 focus:text-gray-700
            focus:bg-white focus:border-slate-600 mb-6"
        />
        <div className="flex space-x-6 mb-6">
          <div className="">
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={handleChange}
              min={1}
              max={10}
              required
              className="w-full px-4 py-2 text-xl text-gray-700
               bg-white border-gray-300 rounded transition 
               ease-in-out duration-150 focus:text-gray-700
                focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          <div className="">
            <p className="text-lg font-semibold">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={handleChange}
              min={1}
              max={10}
              required
              className="w-full px-4 py-2 text-xl text-gray-700
               bg-white border-gray-300 rounded transition 
               ease-in-out duration-150 focus:text-gray-700
                focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold">Parking spot</p>
        <div className="flex">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={handleChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded
            hover:shadow-lg focus:shadow-lg active:shadow-lg
            transition ease-in-out w-full ${
              !parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>

          <button
            type="button"
            id="parking"
            value={false}
            onClick={handleChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded
            hover:shadow-lg focus:shadow-lg active:shadow-lg
            transition ease-in-out w-full ${
              parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="flex">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={handleChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded
            hover:shadow-lg focus:shadow-lg active:shadow-lg
            transition ease-in-out w-full ${
              !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>

          <button
            type="button"
            id="furnished"
            value={false}
            onClick={handleChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded
            hover:shadow-lg focus:shadow-lg active:shadow-lg
            transition ease-in-out w-full ${
              furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          required 
          onChange={handleChange}
          placeholder="Address"
          className="w-full px-4 py-2 text-xl text-gray-700
           bg-white border-gray-300 rounded transition 
           ease-in-out duration-150 focus:text-gray-700
            focus:bg-white focus:border-slate-600 mb-6"
        />
        <p className="text-lg  font-semibold">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          required 
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-4 py-2 text-xl text-gray-700
           bg-white border-gray-300 rounded transition 
           ease-in-out duration-150 focus:text-gray-700
            focus:bg-white focus:border-slate-600 mb-6"
        />
      </form>
    </main>
  );
}
