"use client";

import type { Testimonial } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { TestimonialsProps } from "@/types/props.types";
import Image from "next/image";
import { useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// Constants for better maintainability
const AUTOPLAY_DELAY_MS = 3000;
const SPACE_BETWEEN_SLIDES = 25;

// Breakpoint configuration
const BREAKPOINTS = {
  0: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 2,
  },
  992: {
    slidesPerView: 3,
  },
};

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const swiperRef = useRef<SwiperRef>(null);

  const handlePrevSlide = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.swiper.slideNext();
  };

  return (
    <section id="testimonials" className="testimonials spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Testimonials</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="testimonials__slider">
            <Swiper
              ref={swiperRef}
              modules={[Autoplay]}
              loop={true}
              autoplay={{
                delay: AUTOPLAY_DELAY_MS,
              }}
              breakpoints={BREAKPOINTS}
              spaceBetween={SPACE_BETWEEN_SLIDES}
              slidesPerView={3}
            >
              {testimonials?.map((testimonial: Testimonial) => (
                <SwiperSlide key={testimonial._id}>
                  <Testimonial {...testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-nav">
              <button
                onClick={handlePrevSlide}
                className="slide-buttons slide-left"
              >
                <i className="fa fa-angle-left"></i>
              </button>
              <button
                onClick={handleNextSlide}
                className="slide-buttons slide-right"
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
function Testimonial({ review, image, name, profession }: Testimonial) {
  const imageUrl = image ? urlFor(image).height(180).width(180).url() : "";

  return (
    <figure className="snip1157">
      <blockquote>
        {review}
        <div className="arrow"></div>
      </blockquote>
      <Image width={180} height={180} src={imageUrl} alt="sq-sample3" />
      <div className="author">
        <h5>
          {name} <span> {profession}</span>
        </h5>
      </div>
    </figure>
  );
}
