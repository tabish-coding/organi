import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-policy">
      <div className="privacy-policy__header">
        <h1>Privacy Policy</h1>
        <p>
          Your privacy is important to us. Here's how we handle your personal
          information.
        </p>
      </div>

      <div className="privacy-policy__content container">
        <section className="privacy-policy__section">
          <h2>Information We Collect</h2>
          <p>
            We collect personal information such as your name, email address,
            billing/shipping address, and payment details when you make a
            purchase or create an account.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2>How We Use Your Information</h2>
          <p>
            Your data is used to process orders, provide customer service, and
            send updates about your purchases. With your permission, we may also
            send occasional marketing emails.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2>Cookies</h2>
          <p>
            Our website uses cookies to improve your browsing experience,
            remember preferences, and gather anonymous analytics data. You can
            manage cookie settings in your browser.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2>Data Protection</h2>
          <p>
            We implement industry-standard security measures including SSL
            encryption and secure data storage. Your information is never sold
            or shared with third parties.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2>Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal
            information at any time. Please contact us via email to request
            changes.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2>Contact</h2>
          <p>
            If you have any questions about this privacy policy, you can contact
            us at: <Link href="/contact">Contact</Link>
            <br />
          </p>
        </section>
      </div>
    </div>
  );
}
