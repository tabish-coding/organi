// // app/(protected)/orders/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/sanity/lib/client";
// import OrderCard from "@/components/OrderCard";
import { Order, Product } from "@/sanity.types";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Breadcrumb from "@/components/Breadcrumb";

// export default async function OrdersPage() {
//   const user = await currentUser();

//   if (!user) {
//     return <div className="error">You must be logged in to view orders</div>;
//   }

//   const orders = await client.fetch(
//     `*[_type == "order" && userId == $userId] | order(createdAt desc) {
//       _id,
//       createdAt,
//       total,
//       products[] {
//         name,
//         price,
//         quantity,
//         slug
//       },
//       status
//     }`,
//     { userId: user.id }
//   );

//   return (
//     <div className="ordersContainer">
//       <h1 className="pageTitle">Your Orders</h1>

//       {orders.length === 0 ? (
//         <div className="emptyMessage">You haven't placed any orders yet.</div>
//       ) : (
//         <div className="ordersList">
//           {orders.map((order: Order) => (
//             <OrderCard key={order._id} order={order} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

export default async function OrdersPage() {
  const user = await currentUser();

  if (!user) {
    return <div className="error">You must be logged in to view orders</div>;
  }

  const orders = await client.fetch(
    `*[_type == "order" && userId == $userId] | order(createdAt desc) {
        _id,
        createdAt,
        total,
        products[] {
          name,
          price,
          quantity,
          slug
        },
        status
      }`,
    { userId: user.id }
  );

  if (orders.length === 0) {
    return (
      <div className="container m-auto">
        <div className="row">
          <div
            className="col-lg-12"
            style={{ width: "27rem", margin: "5rem auto" }}
          >
            <h1>No Orders Yet</h1>
            <p>
              You have not placed any order yet.&nbsp;
              <Link href="/shop" style={{ color: "green" }}>
                Continue Shopping
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const fetchProducts = () => {
    return Promise.all(
      orders.map(async (order: Order) => {
        const products = await Promise.all(
          (order.products || []).map(async (product) => {
            const productData = await client.fetch(
              `*[_type == "product" && slug.current == $slug][0] {
                _id,
                title,
                price,
                mainImage,
                slug
              }`,
              { slug: product.slug }
            );
            return {
              ...product,
              ...productData,
            };
          })
        );
        return {
          ...order,
          products,
        };
      })
    );
  };

  const updatedOrders = await fetchProducts();

  return (
    <>
      <Breadcrumb
        title="Your Orders"
        items={[{ name: "Home", href: "/" }, { name: "Orders" }]}
      />
      <div style={{ margin: "50px 0" }}>
        {updatedOrders.map((order: Order) => (
          <section
            key={order._id}
            className="shoping-cart"
            style={{ padding: "50px 0 0 0" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="orderCard">
                    <div className="orderHeader">
                      <div>
                        <h3 className="orderId">
                          Order # {order._id.slice(-6).toUpperCase()}
                        </h3>

                        <p className="orderDate">
                          {order.createdAt
                            ? formatDate(order.createdAt.toString())
                            : "Date not available"}
                        </p>
                      </div>
                      <div className="orderTotal">
                        <strong>Total Price: </strong>$
                        {(order.total || 0).toFixed(2)}
                      </div>
                    </div>

                    <div
                      className="orderStatus"
                      style={{ marginBottom: "30px" }}
                    >
                      <strong>Status: </strong>
                      <span
                        className="statusBadge"
                        style={{ color: "green", textTransform: "capitalize" }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="shoping__cart__table">
                    <table>
                      <thead>
                        <tr>
                          <th className="shoping__product">Products</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {(order.products || []).length > 0 &&
                          (order.products || []).map((product: any, index) => (
                            <tr key={index}>
                              <td className="shoping__cart__item">
                                <img
                                  src={
                                    product.mainImage
                                      ? urlFor(product.mainImage).url()
                                      : ""
                                  }
                                  alt=""
                                />
                                <h5>{product.title}</h5>
                              </td>
                              <td className="shoping__cart__price">
                                ${product.price ?? 0}.00
                              </td>
                              {/* Shopping Cart Quantity */}
                              <td className="shoping__cart__quantity">
                                <div className="quantity">
                                  <div className="pro-qty">
                                    <input
                                      type="number"
                                      value={product.quantity}
                                      disabled
                                      style={{ userSelect: "none" }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="shoping__cart__total">
                                ${product.quantity * product.price}.00
                              </td>
                              <td className="shoping__cart__item__close">
                                <span className="icon_close"></span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
