import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Spinner from "./Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router";

export default function Slider() {
  const navigate = useNavigate();
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    //fetch first 5 listings
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      let listings = [];
      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <p>No listings found</p>;
  }

  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() =>
                navigate(`/category/${data.type}
          /${id}`)
              }
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-96 overflow-hidden"
              ></div>
              <p className="text-[#f1faee] absolute left-1 top-3
              font-medium max-w-[90%] bg-red-400 shadow-lg opacity-90
              p-2 rounded-br-2xl rounded-tl-2xl">{data.name}</p>
              <p className="text-[#f1faee] absolute left-1 bottom-1
              font-semibold max-w-[90%] bg-[#457b9d] shadow-lg opacity-90
              p-2 rounded-tr-2xl rounded-bl-2xl">
                ${data.discountPrice ?? data.regularPrice}
                {data.type === "rent" && "/month" }
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
