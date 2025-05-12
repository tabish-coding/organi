import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProductSection from "@/components/home/FeaturedProductSection";
import LatestProductsSection from "@/components/home/LatestProductsSection";
import SalesBanners from "@/components/home/SalesBanners";
import Testimonials from "@/components/home/Testimonials";
import { client } from "@/sanity/lib/client";

export default async function page() {
  const productCategories = await client.fetch(`*[_type == "category"] {
    _id,
    title,
    image,
    "slug": slug.current,
  }`);

  const testimonials = await client.fetch(`*[_type == "testimonial"] {
    _id,
    name,
    review,
    profession,
    image,
    "slug": slug.current,
  }`);  

  const banners = await client.fetch(`*[_type == "banner"] {
      _id,
      link,
      image  
    }`);

  const featuredQuery = `*[_type == "product" && isFeatured == true]{
    _id, title, price, "slug": slug.current, mainImage
  }[0...8]`;

  const latestQuery = `*[_type == "product"] | order(_createdAt desc) {
    _id, title, price, "slug": slug.current, mainImage
  }[0...6]`;

  const topSellingQuery = `*[_type == "product" && salesCount > 0] | order(salesCount desc){
    _id, title, price, "slug": slug.current, mainImage, salesCount
  }[0...6]`;

  const featuredProducts = await client.fetch(featuredQuery);
  const featuredProductsSix = featuredProducts.slice(0, 6);
  const latestProducts = await client.fetch(latestQuery);
  const topSellingProducts = await client.fetch(topSellingQuery);

  return (
    <main>
      <CategoriesSection categories={productCategories} />
      <FeaturedProductSection products={featuredProducts} />
      <SalesBanners banners={banners} />
      <LatestProductsSection
        featuredProducts={featuredProductsSix}
        latestProducts={latestProducts}
        topSellingProducts={topSellingProducts}
      />
      <Testimonials testimonials={testimonials} />
    </main>
  );
}
