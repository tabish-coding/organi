import Breadcrumb from "@/components/Breadcrumb";
import ProductImagesManager from "@/components/ProductImagesManager";
import ProductQuantity from "@/components/ProductQuantity";
import { SOCIAL_LINKS } from "@/constants/constants";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function ProductRoute({
  params,
}: {
  params: { product: string };
}) {
  const param = await params
  const productSlug = param.product;
  const product = await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    price,
    description,
    mainImage,
    images,
    "slug": slug.current,
    "category": {
      "title": category->title,
      "slug": category->slug.current
    }
  }`,
    { slug: productSlug }
  );

  return (
    <>
      <Breadcrumb
        title={product.title}
        items={[
          { name: "Home", href: "/" },
          {
            name: product.category.title,
            href: `/shop/${product.category.slug}`,
          },
          { name: product.title },
        ]}
      />
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <ProductImagesManager
                images={product.images}
                mainImage={product.mainImage}
              />
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="product__details__text">
                <h3>{product.title}</h3>
                <div className="product__details__rating">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half-o"></i>
                  <span>&nbsp;(18 reviews)</span>
                </div>
                <div className="product__details__price">
                  ${product.price}.00
                </div>
                <p>{product.description}</p>
                <ProductQuantity price={product.price} slug={product.slug} />

                <ul>
                  <li>
                    <b>Availability</b> <span>In Stock</span>
                  </li>
                  <li>
                    <b>Shipping</b>
                    <span>
                      01 day shipping. <samp>Free pickup today</samp>
                    </span>
                  </li>
                  <li>
                    <b>Weight</b> <span>0.5 kg</span>
                  </li>
                  <li>
                    <b>Share on</b>

                    <div className="share">
                      {SOCIAL_LINKS.map(({ icon, link }) => (
                        <a key={icon} href={link}>
                          <i className={`fa-brands fa-${icon}`}></i>
                        </a>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
