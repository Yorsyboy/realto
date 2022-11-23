import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

export default function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnapshot = await getDocs(q);
        // get last listing
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastFetchedListing(lastVisible);
        // set listings
        const listings = [];
        querySnapshot.forEach((doc) => {
          return listings.push({ 
            id: doc.id,
            data: doc.data()
           });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching Offers");
      }
    };
    fetchListings();
  }, []);

  const fetchMoreListings = async () => {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(4)
      );
      const querySnapshot = await getDocs(q);
      // get last listing
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastFetchedListing(lastVisible);
      // set listings
      const listings = [];
      querySnapshot.forEach((doc) => {
        return listings.push({ 
          id: doc.id,
          data: doc.data()
         });
      });
      setListings((prevState)=>[...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching Offers");
    }
  };

  return <div className="max-w-6xl mx-auto px-3">
    <h1 className="text-3xl text-center mt-6 font-bold mb-6">Offers</h1>
    {loading ? (
      <Spinner />
    ) : listings && listings.length > 0 ? (
      <>
      <main>
        <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4 2xl:grid-cols-5">
          {listings.map((listing) => (
            <ListingItem key={listing.id} 
            listing={listing.data} 
            id={listing.id} />
          ))}
        </ul>
      </main>
      {lastFetchedListing && (
        <div className="flex justify-center items-center">
          <button 
          onClick={fetchMoreListings}
          className="bg-white px-3 py-1.5 text-gray-700 border
          border-gray-300 mb-6 mt-6 hover:border-gray-700
          rounded transition duration-100 ease-in-out">
            Load More
          </button>
        </div>
      )}
      </>
    ) : (
      <p>No offers available</p>
    )}
  </div>;
}
