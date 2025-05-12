import Breadcrumb from "@/components/Breadcrumb";
import PaginationControls from "@/components/PaginationControls";
import ShopWrapper from "@/components/ShopWrapper";
import ProductItem from "@/components/ui/ProductItem";
import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";

export const PRODUCTS_PER_PAGE = 12;

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const page = parseInt(await searchParams.page) || 1;
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;

  const products = await client.fetch(
    `*[_type == "product"] | order(publishedAt desc) [$start...$end] {
      _id,
    title,
    price,
    "category": category->slug,
    "slug": slug.current,
    mainImage, 
    isFeatured
    }`,
    { start, end }
  );
  const totalPosts = await client.fetch(`count(*[_type == "product"])`);

  return (
    <>
      <Breadcrumb
        title="Organi Shop"
        items={[{ name: "Home", href: "/" }, { name: "Shop" }]}
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

          <PaginationControls
            currentPage={page}
            totalItems={totalPosts}
            itemsPerPage={PRODUCTS_PER_PAGE}
          />
        </div>
      </ShopWrapper>
    </>
  );
}
