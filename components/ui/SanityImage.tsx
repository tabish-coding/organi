import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export default function SanityImage({
  image,
}: {
  image: SanityImageSource | null;
}) {
  const imageUrl = image ? urlFor(image).url() : "";

  return <div>SanityImage</div>;
}
