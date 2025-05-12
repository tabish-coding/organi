"use client";

import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useState } from "react";

export default function ProductImagesManager({
  images,
  mainImage,
}: {
  images: SanityImageSource[] | null;
  mainImage: SanityImageSource | null;
}) {
  const [displayImage, setDisplayImage] = useState<string>("");

  const getImageUrl = (image: SanityImageSource | null) => {
    if (!image) return "";
    return urlFor(image).height(300).url()
  };

  const imagesUrl = images?.map((image: SanityImageSource | null) => {
    return getImageUrl(image);
  });

  return (
    <div className="product__details__pic">
      <div className="product__details__pic__item">
        <img
          src={displayImage ? displayImage : getImageUrl(mainImage)}
          alt={"Product Image Main"}
        />
      </div>
      <div className="product__details__pic__slider owl-carousel">
        {imagesUrl?.map((image: string, index: number) => (
          <img
            key={"product-image-" + index}
            src={image}
            alt={"product-image-" + index}
            onClick={() => setDisplayImage(image)}
          />
        ))}
      </div>
    </div>
  );
}