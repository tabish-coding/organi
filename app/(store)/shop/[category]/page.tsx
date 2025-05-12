import Breadcrumb from "@/components/Breadcrumb";
import ShopWrapper from "@/components/ShopWrapper";
import ProductItem from "@/components/ui/ProductItem";
import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export default async function page({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category;

  const query = groq`*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)]{
    _id,
    title,
    price,
    mainImage,
    "slug": slug.current,
    "category": category->title
  }`;

  const products = await client.fetch(query, { categorySlug: category });
  const categoryTitle = products[0].category;

  return (
    <>
      <Breadcrumb
        title={categoryTitle}
        items={[
          { name: "Home", href: "/" },
          { name: "Shop", href: `/shop` },
          { name: categoryTitle },
        ]}
      />
      <ShopWrapper>
        <div className="col-lg-9 col-md-7">
          <div className="row">
            {products?.map((product: Product) => (
              <div key={product._id} className="col-lg-4 col-md-6 col-sm-6">
                <ProductItem {...product} />
              </div>
            ))}
          </div>
        </div>
      </ShopWrapper>
    </>
  );
}
