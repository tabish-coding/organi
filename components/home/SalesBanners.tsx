import { urlFor } from "@/sanity/lib/image";
import { BannersSectionProps } from "@/types/props.types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import Link from "next/link";

export default function SalesBanners({ banners }: BannersSectionProps) {
  return (
    <div className="banner">
      <div className="container">
        <div className="row">
          {banners?.map((banner) => (
            <div key={banner._id} className="col-lg-6 col-md-6 col-sm-6">
              <Link href={`${banner.href}`} className="banner__pic">
                <BannerImage image={banner.image} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BannerImage({ image }: { image: SanityImageSource | undefined }) {
  const imageUrl = image ? urlFor(image).height(250).url() : "";
  return <Image width={550} height={250} src={imageUrl} alt={"banner"} />;
}
