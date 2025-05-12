// schemas/product.js
import { defineType, defineField } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "shippingInfo",
      title: "Shipping Information",
      type: "object",
      fields: [
        defineField({
          name: "deliveryTime",
          title: "Delivery Time",
          type: "string",
          initialValue: "01 day shipping",
        }),
        defineField({
          name: "pickupOption",
          title: "Pickup Option",
          type: "string",
          initialValue: "Free pickup today",
        }),
      ],
    }),
    defineField({
      name: "weight",
      title: "Weight",
      type: "number",
      description: "Weight in kilograms (kg)",
      initialValue: 0.5,
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "images",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "salesCount",
      title: "Sales Count",
      type: "number",
      initialValue: 0,
    }),
  ],
});
