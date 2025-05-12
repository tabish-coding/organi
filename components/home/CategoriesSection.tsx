"use client";

import { JSX, useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Category } from "@/sanity.types";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { CategoriesSectionProps } from "@/types/props.types";

// Constants
const AUTOPLAY_DELAY_MS = 3000;
const SPACE_BETWEEN_SLIDES = 50;

// Breakpoint configuration
const BREAKPOINTS = {
  100: {
    slidesPerView: 1,
  },
  480: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 3,
  },
  992: {
    slidesPerView: 4,
  },
};

export default function CategoriesSection({
  categories,
}: CategoriesSectionProps) {
  const swiperRef = useRef<SwiperRef>(null);

  const handlePrevSlide = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.swiper.slideNext();
  };

  return (
    <section className="categories">
      <div className="container">
        <div className="row">
          <div className="categories__slider">
            <Swiper
              ref={swiperRef}
              modules={[Autoplay]}
              loop={true}
              autoplay={{
                delay: AUTOPLAY_DELAY_MS,
              }}
              breakpoints={BREAKPOINTS}
              spaceBetween={SPACE_BETWEEN_SLIDES}
              slidesPerView={4}
            >
              {categories &&
                categories.map((category: Category) => (
                  <SwiperSlide key={category._id}>
                    <CategoryItem {...category} />
                  </SwiperSlide>
                ))}
            </Swiper>

            <div className="swiper-nav">
              <button
                onClick={handlePrevSlide}
                className="slide-buttons slide-left"
                name="Slide left"
              >
                <i className="fa fa-angle-left"></i>
              </button>
              <button
                onClick={handleNextSlide}
                className="slide-buttons slide-right"
                name="Slide right"
              >
                <i className="fa fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryItem({ image, slug, title }: Category) {
  const imageUrl = image ? urlFor(image).width(186).url() : "";

  return (
    <div className="category-item-wrapper">
      <div
        className="categories__item"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "190px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#efefef",
        }}
      >
        <h5 className="category-title">
          <Link
            href={`/shop/${slug}`}
            className="category-link"
            aria-label={`View ${title} category`}
          >
            {title}
          </Link>
        </h5>
      </div>
    </div>
  );
}
