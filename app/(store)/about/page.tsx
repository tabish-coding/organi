import { client } from "@/sanity/lib/client";

export default async function AboutPage() {
  const siteDetails = await client.fetch(
    `*[_type == "siteSettings"][0]{email, phone}`
  );

  return (
    <div className="about">
      <div className="about__header">
        <h1>About Organi</h1>
        <p>100% Organic | Trusted by Families | Naturally Grown</p>
      </div>

      <div className="about__content container">
        <div className="about__section">
          <h2>Our Mission</h2>
          <p>
            At Organi, we’re committed to providing high-quality organic
            products that promote a healthier lifestyle. From farm to table, we
            ensure every item is naturally grown, ethically sourced, and
            sustainably packaged.
          </p>
        </div>

        <div className="about__section">
          <h2>What We Offer</h2>
          <ul>
            <li>Fresh Fruits & Vegetables</li>
            <li>Dairy, Eggs & Organic Meat</li>
            <li>Cold-Pressed Juices</li>
            <li>Dried Fruits & Grains</li>
            <li>Zero-waste packaging</li>
          </ul>
        </div>

        <div className="about__section">
          <h2>Why Choose Us?</h2>
          <p>
            With free delivery, premium support, and handpicked farms, Organi
            has become a trusted name in thousands of homes. We focus on
            transparency, nutrition, and convenience so you can shop with
            confidence.
          </p>
        </div>

        <div className="about__contact">
          <h2>Get in Touch</h2>
          <p>
            Email us at:&nbsp;
            <a href={`mailto:${siteDetails.email}`}>{siteDetails.email}</a>
          </p>
          <p>Call us: {siteDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
