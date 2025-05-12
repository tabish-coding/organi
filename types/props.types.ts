import { Banner, Category, Product, Testimonial } from "@/sanity.types";

export interface CategoriesSectionProps {
  categories: Category[] | null;
}

export interface TestimonialsProps {
  testimonials: Testimonial[] | null;
}

export interface ProductsSectionProps {
  products: Product[] | null;
}

export interface BannersSectionProps {
  banners: Banner[] | null;
}
