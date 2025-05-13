"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type BreadcrumbItem = {
  name: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  title: string;
};

export default function Breadcrumb({ items, title }: BreadcrumbProps) {
  const [breadcrumbImage, setBreadcrumbImage] = useState<string | null>(null);

  const fetchchImage = async () => {
    const image = await client.fetch(
      `*[_type == "siteSettings"][0]{bannerImageSecondary}`
    );
    setBreadcrumbImage(urlFor(image.bannerImageSecondary).height(150).url());
  };

  useEffect(() => {
    fetchchImage();
  }, []);

  return (
    <section
      className="breadcrumb-section set-bg"
      style={{
        backgroundImage: `url(${breadcrumbImage})`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb__text">
              <h2>{title}</h2>
              <div className="breadcrumb__option">
                {items.map((item, index) =>
                  item.href ? (
                    <Link key={index} href={item.href}>
                      {item.name}
                    </Link>
                  ) : (
                    <span key={index}>{item.name}</span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
