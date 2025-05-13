import ProductItem from "@/components/ui/ProductItem";
import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const fetchProducts = async (query: string): Promise<Product[]> => {
  const searchQuery = groq`
    *[_type == "product" && title match $term]{
      _id,
      title,
      price,
      mainImage,
      "slug": slug.current,
    }
  `;
  return await client.fetch(searchQuery, { term: `*${query}*` });
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const products = await fetchProducts(query);

  if (!products.length)
    return (
      <div className="container" style={{ margin: "30px auto 50px auto" }}>
        <p>No products found for: ${query}</p>
      </div>
    );

  return (
    <div className="container" style={{ margin: "100px auto" }}>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-lg-4 col-md-6 col-sm-6">
            <ProductItem {...product} />
          </div>
        ))}
      </div>
    </div>
  );
}
