"use client";

import Logo from "../ui/Logo";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import CartArea from "./CartArea";
import HeaderAuth from "./HeaderAuth";

export default function Header({ siteSettings }: { siteSettings: any }) {
  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="header__top__left">
                <ul>
                  <li>
                    <i className="fa fa-envelope"></i>
                    {siteSettings?.email}
                  </li>
                  <li>Free Shipping for all Order of $99</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="header__top__right">
                <div className="header__top__right__social">
                  {siteSettings?.socialHandles?.map(
                    (data: { link: string | undefined; icon: any }, i: any) => (
                      <a
                        aria-label={"Go to" + data.link}
                        key={`header-social-links-${i}`}
                        href={data.link}
                        target="_blank"
                      >
                        <i className={`fa-brands ${data.icon}`}></i>
                      </a>
                    )
                  )}
                </div>

                {/* LOGIN | USER AREA */}
                <HeaderAuth />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="container">
        <div className="row">
          {/* LOGO */}
          <div className="header__logo col-lg-3">
            <Logo />
          </div>

          {/* NAV MENU FOR DESKTOP */}
          <DesktopNav />

          {/* CART AREA */}
          <div className="col-lg-3">
            <div className="header__cart">
              <CartArea />
            </div>
          </div>
        </div>

        {/* SLIDE MENU FOR MOBILE */}
        <MobileMenu
          socialHandles={siteSettings?.socialHandles}
          email={siteSettings?.email}
        />
      </div>
    </header>
  );
}
