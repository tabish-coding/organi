"use client";

import { usePathname } from "next/navigation";
import CategoriesDropDown from "./CategoriesDropDown";
import HeroSearchForm from "./HeroSearchForm";
import HomeBackgroundImage from "./HomeBackgroundImage";
import { Category } from "@/sanity.types";

export default function Hero({
  categories,
  phone,
}: {
  categories: Category[] | null;
  phone: string;
}) {
  const pathname = usePathname();

  return (
    <section className={`hero ${pathname !== "/" && "hero-normal"}`}>
      <div className="container">
        <div className="row">
          <CategoriesDropDown categories={categories} />
          <div className="col-lg-9">
            <div className="hero__search">
              <HeroSearchForm />
              <div className="hero__search__phone">
                <div className="hero__search__phone__icon">
                  <i className="fa fa-phone"></i>
                </div>
                <div className="hero__search__phone__text">
                  <h5>{phone}</h5>
                  <span>support 24/7 time</span>
                </div>
              </div>
            </div>

            {/* BACKGROUND IMAGE FOR HOME PAGE ONLY */}
            {
              pathname == "/" && <HomeBackgroundImage />
            }
          </div>
        </div>
      </div>
    </section>
  );
}
