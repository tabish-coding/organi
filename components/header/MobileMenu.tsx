"use client";
import { useNavMenu } from "@/hooks/useNavMenu";
import CartArea from "./CartArea";
import HeaderAuth from "./HeaderAuth";
import { MAIN_DETAILS } from "@/constants/constants";
import Logo from "../ui/Logo";
import MobileNav from "./MobileNav";

export default function MobileMenu({ socialHandles, email }: { socialHandles: any, email: string }) {
  useNavMenu();

  return (
    <>
      <div className="humberger__open">
        <i className="fa fa-bars"></i>
      </div>
      <div className="humberger__menu__overlay"></div>
      <div id="humberger__menu__wrapper" className="humberger__menu__wrapper">
        <div className="humberger__menu__logo">
          <Logo />
        </div>
        <div className="humberger__menu__cart">
          <CartArea />
        </div>
        <div className="humberger__menu__widget">
          <HeaderAuth />
        </div>
        <MobileNav />

        <div id="mobile-menu-wrap"></div>
        <div className="header__top__right__social">
          {socialHandles?.map(
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

        <div className="humberger__menu__contact">
          <ul>
            <li>
              <i className="fa fa-envelope"></i> {email}
            </li>
            <li>Free Shipping for all Order of $99</li>
          </ul>
        </div>
      </div>
    </>
  );
}
