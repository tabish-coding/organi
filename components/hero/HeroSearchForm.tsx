"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function HeroSearchForm() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    startTransition(() => {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    });
  };

  return (
    <div className="hero__search__form">
      <form onSubmit={handleSubmit}>
        <div className="hero__search__categories">
          All Categories
          <span className="arrow_carrot-down"></span>
        </div>
        <input
          name="query"
          type="text"
          placeholder="What do yo u need?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button name="Search" type="submit" className="site-btn">
          {isPending ? "SEARCHING..." : "SEARCH"}
        </button>
      </form>
    </div>
  );
}
