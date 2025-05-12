"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Logo() {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      const query = `*[_type == "siteSettings"][0]{logo}`;
      const data = await client.fetch(query);
      setLogo(data.logo);
    };

    fetchLogo();
  }, []);

  if (!logo) return null;

  return (
    <Link href="/" aria-label="Go to home page">
      <Image
        src={urlFor(logo).width(119).height(50).url()}
        height={50}
        width={119}
        alt="Logo"
      />
    </Link>
  );
}
