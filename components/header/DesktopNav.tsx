import { NAV_PAGES } from "@/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNav() {
  const currentPath = usePathname();

  return (
    <div className="col-lg-6">
      <nav className="header__menu">
        <ul>
          {NAV_PAGES.map((page, i) => (
            <li
              key={`Desktop-Nav-${i}`}
              className={page.link === currentPath ? "active" : ""}
            >
              <Link href={page.link}>{page.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
