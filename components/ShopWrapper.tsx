import GridProductsSlider from "@/components/ui/GridProductsSlider";
import { Category } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

export default async function ShopWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const featuredProducts = await client.fetch(`*[_type == "product" && isFeatured == true]{
    _id, title, price, "slug": slug.current, mainImage
  }[0...6]`);

  const categories = await client.fetch(`*[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
}`);

  return (
    <>
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5">
              <div className="sidebar">
                {/* SIDEBAR ITEM TO SHOW CATEGORIES */}
                <div className="sidebar__item">
                  <h4>Categories</h4>
                  <ul style={{ paddingLeft: 0 }}>
                    <li>
                      <Link href={`/shop/`}>All</Link>
                    </li>
                    {categories?.map((category: Category) => (
                      <li key={category._id}>
                        <Link href={`/shop/${category.slug}`}>
                          {category.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="sidebar__item">
                  <div className="latest-product__text">
                    <h4>Latest Products</h4>
                    <GridProductsSlider products={featuredProducts} />
                  </div>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
