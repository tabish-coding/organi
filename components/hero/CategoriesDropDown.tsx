import { Category } from "@/sanity.types";
import { usePathname } from "next/navigation";
import useDropdown from "@/hooks/useDropdown";
import { CategoriesSectionProps } from "@/types/props.types";
import Link from "next/link";

export default function CategoryDropdown({
  categories,
}: CategoriesSectionProps) {
  const pathname = usePathname();

  const { isOpen, toggle, contentRef } = useDropdown(pathname === "/");

  return (
    <div className="col-lg-3">
      <div className="hero__categories">
        <div
          onClick={toggle}
          aria-expanded={isOpen}
          className="hero__categories__all"
        >
          <i className="fa fa-bars"></i>
          <span>All departments</span>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        {categories && (
          <ul
            ref={contentRef}
            style={{
              overflow: "hidden",
              transition: "max-height 0.4s ease",
              display: pathname === "/" ? "block" : "none",
              maxHeight: pathname === "/" ? "initial" : "0",
            }}
          >
            {categories.map((category: Category) => (
              <li key={category._id}>
                <Link href={`/shop/${category.slug}`}>{category.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
