import { NAV_PAGES } from "@/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const currentPath = usePathname();
  
  return (
    <nav className="mobile__nav">
      <ul>
        {NAV_PAGES.map((page, i) => (
          <li
            key={`Mobile-Nav-${i}`}
            className={page.link === currentPath ? "active" : ""}
          >
            <Link href={page.link}>{page.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
