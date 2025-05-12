"use client";

import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { ProductsSectionProps } from "@/types/props.types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Autoplay, Grid } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css/grid";

export default function GridProductsSlider({ products }: ProductsSectionProps) {
  const swiperRef = useRef<SwiperRef>(null);
  const displayProducts =
    products && products.length <= 4 && products.length < 6
      ? products.slice(0, 3)
      : products;
      
  const handleSlideNext = () => swiperRef.current?.swiper.slideNext();
  const handleSlidePrev = () => swiperRef.current?.swiper.slidePrev();

  return (
    <div className="latest-product__slider owl-carousel">
      {displayProducts && displayProducts.length > 4 && (
        <div className="owl-nav">
          <button name="Slide Left" onClick={handleSlidePrev} className="owl-prev">
            <i className="fa fa-angle-left"></i>
          </button>
          <button name="Slide Right" onClick={handleSlideNext} className="owl-next">
            <i className="fa fa-angle-right"></i>
          </button>
        </div>
      )}
      <div className="latest-prdouct__slider__item">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Grid]}
          autoplay={{ delay: 5000 }}
          grid={{ fill: "row", rows: 3 }}
          slidesPerView={1}
        >
          {displayProducts?.map((product: Product) => (
            <SwiperSlide key={"latest-" + product._id}>
              <Link href={`/shop/product/${product.slug}`} className="latest-product__item">
                <div
                  style={{
                    width: "110px",
                    height: "110px",
                    position: "relative",
                    backgroundColor: "#f2f7f9",
                  }}
                  className="latest-product__item__pic"
                >
                  <GenerateImage
                    image={product.mainImage}
                    alt={`${product.title}`}
                  />
                </div>
                <div className="latest-product__item__text">
                  <h6>{product.title}</h6>
                  <span>${product.price}.00</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function GenerateImage({
  image,
  alt,
}: {
  image: SanityImageSource | undefined;
  alt: string;
}) {
  const imageUrl = image ? urlFor(image).width(180).url() : "";

  return (
    <Image style={{ objectFit: "contain" }} width={180} height={146} src={imageUrl} alt={alt} />
  );
}
