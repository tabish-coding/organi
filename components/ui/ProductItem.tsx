import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import AddtoCart from "../AddtoCart";

export default function ProductItem({
  mainImage,
  price,
  title,
  slug,
}: Product) {
  const imageUrl = mainImage ? urlFor(mainImage).width(250).url() : "";

  return (
    <div className="featured__item">
      <div
        className="featured__item__pic set-bg"
        style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "250px" }}
      >
        <ul className="featured__item__pic__hover">
          <li>
            <AddtoCart
              itemsCount={1}
              slug={`${slug}`}
              price={price ? price : 0}
            >
              <i className="fa fa-shopping-cart"></i>
            </AddtoCart>
          </li>
        </ul>
      </div>
      <div className="featured__item__text">
        <h6>
          <Link href={`/shop/product/${slug}`}>{title}</Link>
        </h6>
        <h5>${price}.00</h5>
      </div>
    </div>
  );
}
