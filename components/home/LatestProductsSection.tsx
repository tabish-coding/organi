import { ProductsSectionProps } from "@/types/props.types";
import GridProductsSlider from "../ui/GridProductsSlider";
import { Product } from "@/sanity.types";

interface SectionProp {
  featuredProducts: Product[] | null;
  topSellingProducts: Product[] | null;
  latestProducts: Product[] | null;
}

export default function LatestProductsSection({
  featuredProducts,
  topSellingProducts,
  latestProducts,
}: SectionProp) {
  return (
    <section className="latest-product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="latest-product__text">
              <h4>Latest Products</h4>
              <GridProductsSlider products={latestProducts} />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="latest-product__text">
              <h4>Top Rated Products</h4>
              <GridProductsSlider products={topSellingProducts} />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="latest-product__text">
              <h4>Review Products</h4>
              <GridProductsSlider products={featuredProducts} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
