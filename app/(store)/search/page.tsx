"use client";

import ProductItem from "@/components/ui/ProductItem";
import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  if (!query) {
    return <div>No query</div>;
  }

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
    return await client.fetch(searchQuery, { term: query });
  };

  useEffect(() => {
    fetchProducts(query).then((products) => {
      setProducts(products);
    });
  }, [query]);

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
