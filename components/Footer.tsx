import Link from "next/link";
import Logo from "./ui/Logo";

export default function Footer({ siteSettings }: { siteSettings: any }) {
  return (
    <footer className="footer spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer__about">
              <div className="footer__about__logo">
                <Logo />
              </div>
              <ul>
                <li>Address: {siteSettings?.address}</li>
                <li>Phone: {siteSettings?.phone}</li>
                <li>Email: {siteSettings?.email}</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
            <div className="footer__widget">
              <h6>Useful Links</h6>
              <ul>
                {USEFUL_LINKS.slice(0, 7).map((link, index) => (
                  <li key={index}>
                    <Link href={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
              <ul>
                {USEFUL_LINKS.slice(7, 14).map((link, index) => (
                  <li key={index}>
                    <Link href={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="footer__widget">
              <h6>Join Our Newsletter Now</h6>
              <p>
                Get E-mail updates about our latest shop and special offers.
              </p>
              <form action="#">
                <input type="text" placeholder="Enter your mail" />
                <button
                  name="Subscribe to our newsletter"
                  type="submit"
                  className="site-btn"
                >
                  Subscribe
                </button>
              </form>
              <div className="footer__widget__social">
                {siteSettings?.socialHandles?.map(
                  (data: { link: string | undefined; icon: any }) => (
                    <a href={data.link} key={data.link}>
                      <i className={`fa-brands ${data.icon}`}></i>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="footer__copyright">
              <div className="footer__copyright__text">
                <p>
                  Copyright &copy;
                  {new Date().getFullYear()} &nbsp; All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

var USEFUL_LINKS = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Shop",
    link: "/shop",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "About Our Shop",
    link: "/about", // Assuming same page as "About Us"
  },
  {
    name: "Secure Shopping",
    link: "/useful-links/secure-shopping",
  },
  {
    name: "Delivery Information",
    link: "/useful-links/delivery-information",
  },
  {
    name: "Privacy Policy",
    link: "/useful-links/privacy-policy",
  },
  {
    name: "Our Sitemap",
    link: "/sitemap",
  },
  {
    name: "Who We Are",
    link: "/about", // Could be a section in /about or separate page if needed
  },
  {
    name: "Our Services",
    link: "/useful-links/our-services",
  },
  {
    name: "Projects",
    link: "/useful-links/projects",
  },
  {
    name: "Innovation",
    link: "/useful-links/innovation",
  },
  {
    name: "Testimonials",
    link: "/useful-links/testimonials",
  },
];
