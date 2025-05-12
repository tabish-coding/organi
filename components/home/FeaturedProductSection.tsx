import ProductItem from "../ui/ProductItem";
import { ProductsSectionProps } from "@/types/props.types";

export default function FeaturedProductSection({
  products,
}: ProductsSectionProps) {
  return (
    <section className="featured spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Featured Products</h2>
            </div>
          </div>
        </div>
        <div className="row featured__filter">
          {products &&
            products.map((product) => (
              <div
                key={product._id}
                className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
              >
                <ProductItem {...product} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
