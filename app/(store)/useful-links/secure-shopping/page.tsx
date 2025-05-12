export default function SecureShoppingPage() {
  return (
    <div className="secure-shopping">
      <div className="secure-shopping__header">
        <h1>Secure Shopping</h1>
        <p>Shop with confidence — your privacy and protection are our top priority.</p>
      </div>

      <div className="secure-shopping__content container">
        <section className="secure-shopping__section">
          <h2>SSL Encryption</h2>
          <p>
            All transactions on Organi are secured using 256-bit SSL encryption.
            This ensures your payment and personal information is fully protected
            at every step of the checkout process.
          </p>
        </section>

        <section className="secure-shopping__section">
          <h2>Trusted Payment Gateways</h2>
          <p>
            We partner with leading payment providers like Stripe and PayPal
            to process transactions securely and efficiently. Your card details
            are never stored on our servers.
          </p>
        </section>

        <section className="secure-shopping__section">
          <h2>Privacy Commitment</h2>
          <p>
            We respect your privacy and never share your data with third parties.
            Our site complies with global data protection regulations including GDPR.
          </p>
        </section>

        <section className="secure-shopping__section">
          <h2>Safe Account Access</h2>
          <p>
            All user accounts are protected with secure authentication methods.
            We recommend using a strong password and enabling two-factor authentication
            where possible.
          </p>
        </section>
      </div>
    </div>
  );
}
