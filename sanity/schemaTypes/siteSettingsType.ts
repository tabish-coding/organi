// schemas/siteSettings.ts
import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bannerImageSecondary",
      title: "Banner Image For Other Pages",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "openTiming",
      title: "Open Timing",
      type: "string",
    }),
    defineField({
      name: "socialHandles",
      title: "Social Handles",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialHandle",
          title: "Social Handle",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "icon",
              title: "Icon (e.g., fa-twitter)",
              type: "string",
              description:
                "Use FontAwesome icon class name (e.g., fa-facebook, fa-twitter)",
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "url",
            }),
          ],
        },
      ],
    }),
  ],
});
