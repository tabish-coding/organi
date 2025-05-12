import Link from "next/link";
import "@/sass/not-found.scss";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found__content container">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>
          The page you’re looking for doesn’t exist or has been moved. Try going
          back to the homepage.
        </p>
        <Link href="/" className="not-found__button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
