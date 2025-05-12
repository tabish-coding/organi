import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("ORAGNI")
    .items([
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("banner").title("Sales Banners"),
      S.documentTypeListItem("order").title("Orders"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("siteSettings").title("Site Settings"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !["category", "product", "banner", "order", "testimonial", "siteSettings"].includes(item.getId()!)
      ),
    ]);
