export default function DeliveryInfoPage() {
  return (
    <div className="delivery-info">
      <div className="delivery-info__header">
        <h1>Delivery Information</h1>
        <p>
          Everything you need to know about how and when your organic products
          are delivered.
        </p>
      </div>

      <div className="delivery-info__content container">
        <section className="delivery-info__section">
          <h2>Delivery Areas</h2>
          <p>
            We currently deliver across major cities and rural regions
            nationwide. You can check delivery availability at checkout by
            entering your zip code.
          </p>
        </section>

        <section className="delivery-info__section">
          <h2>Delivery Time</h2>
          <p>
            Orders are typically delivered within{" "}
            <strong>1–3 business days</strong>. Fresh produce is prioritized and
            shipped daily to ensure top quality.
          </p>
        </section>

        <section className="delivery-info__section">
          <h2>Shipping Fees</h2>
          <p>
            We offer <strong>free shipping</strong> for orders over $99. A flat
            fee of $5.99 applies to smaller orders.
          </p>
        </section>

        <section className="delivery-info__section">
          <h2>Order Tracking</h2>
          <p>
            Once your order is shipped, you will receive a tracking link via
            email. You can also track it anytime through your account dashboard.
          </p>
        </section>

        <section className="delivery-info__section">
          <h2>Packaging</h2>
          <p>
            All items are carefully packed in eco-friendly, insulated boxes to
            maintain freshness and reduce environmental impact.
          </p>
        </section>
      </div>
    </div>
  );
}
