import Breadcrumb from "@/components/Breadcrumb";
import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutRoute() {
  return (
    <>
      <Breadcrumb
        title="Checkout"
        items={[{ name: "Home", href: "/" }, { name: "Checkout" }]}
      />
      <CheckoutForm />
    </>
  );
}
