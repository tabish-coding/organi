"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeBackgroundImage() {
  const [bannerImage, setBannerImage] = useState("");

  useEffect(() => {
    const fetchBannerImage = async () => {
      const image = await client.fetch(
        `*[_type == "siteSettings"][0]{bannerImage}`
      );
      setBannerImage(urlFor(image.bannerImage).height(280).url());
    };

    fetchBannerImage();
  }, []);

  return (
    <div
      className="hero__item"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center left",
      }}
    >
      <div className="hero__text">
        <span>FRUIT FRESH</span>
        <h2>
          Vegetable <br />
          100% Organic
        </h2>
        <p>Free Pickup and Delivery Available</p>
        <Link aria-label="Shop now" href="/shop" className="primary-btn">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
}
