import { useCart } from "@/hooks/useCart";
import { client } from "@/sanity/lib/client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartArea() {
  const { total, itemCount } = useCart();
  const { user } = useUser();
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    async function getTotal() {
      try {
        const total = await client.fetch(
          `count(*[_type == "order" && userId == $userId])`,
          { userId: user?.id }
        );

        setTotalOrders(total);
      } catch (error) {
        console.error("Failed to fetch order count:", error);
      }
    }

    if (user) {
      getTotal();
    }
  }, [user]);

  return (
    <>
      <ul>
        {user && (
          <li>
            <Link href="/orders">
              <i className="fa-solid fa-box-open"></i>{" "}
              <span>{totalOrders}</span>
            </Link>
          </li>
        )}
        <li>
          <Link href="/shopping-cart">
            <i className="fa fa-shopping-bag"></i> <span>{itemCount}</span>
          </Link>
        </li>
      </ul>
      <div className="header__cart__price">
        item: <span>${total}.00</span>
      </div>
    </>
  );
}
