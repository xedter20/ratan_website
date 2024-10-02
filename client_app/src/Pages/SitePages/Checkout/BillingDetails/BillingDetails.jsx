import { useState } from "react";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentModal from "../../../../components/Modals/PaymentModal/PaymentModal";
import { calculateTotalPrice } from "../../../../utils/calculateTotalPrice";
import { formatPrice } from "../../../../utils/formatPrice";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const BillingDetails = () => {
  const { user } = useAuth();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [billingData, setBillingData] = useState({});
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  // Total price of the cart items
  const totalPrice = parseFloat(calculateTotalPrice(cart));

  // Handle billing details form
  const onSubmit = (data) => {
    if (data) {
      setIsOpen(true);
      setBillingData(data);
    }
  };

  // Trigger billing details form
  const triggerFormSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="mb-12 mt-16 px-[4%] md:px-[7%]">
      <div>
        <h1 className="my-9 pl-16 text-4xl font-semibold">Billing details</h1>
        <div className="flex flex-col gap-x-6 gap-y-16 md:flex-row">
          {/* User info form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-9 md:w-1/2 md:px-16"
          >
            <div className="">
              <div className="mb-3">
                <label
                  htmlFor="firstName"
                  className={`${errors.firstName && "text-red-600"} font-medium mb-5 inline-block`}
                >
                  First Name {errors.firstName && "*"}
                </label>
                <br />
                <input
                  className="border-cadetGray h-[50px] w-full rounded-[10px] border px-5 outline-none"
                  type="text"
                  id="firstName"
                  {...register("firstName", { required: true })}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="lastName"
                  className={`${errors.lastName && "text-red-600"} font-medium" mb-5 inline-block`}
                >
                  Last Name {errors.lastName && "*"}
                </label>
                <br />
                <input
                  className="border-cadetGray h-[50px] w-full rounded-[10px] border px-5 outline-none"
                  type="text"
                  id="lastName"
                  {...register("lastName", { required: true })}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="complete_address"
                  className={`${errors.complete_address && "text-red-600"} font-medium" mb-5 inline-block`}
                >
                  Complete Address {errors.complete_address && "*"}
                </label>
                <br />
                <input
                  className="border-cadetGray h-[50px] w-full rounded-[10px] border px-5 outline-none"
                  type="text"
                  id="complete_address"
                  {...register("complete_address", { required: true })}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="phone"
                  className={`${errors.phone && "text-red-600"} font-medium" mb-5 inline-block`}
                >
                  Phone {errors.phone && "*"}
                </label>
                <br />
                <input
                  className="border-cadetGray h-[50px] w-full rounded-[10px] border px-5 outline-none"
                  type="tel"
                  id="phone"
                  {...register("phone", { required: true })}
                />
              </div>
              <div className="mt-4">
                <textarea
                  rows="10"
                  className="border-cadetGray h-[50px] w-full rounded-[10px] border px-5 py-6 outline-none"
                  id="add_info"
                  placeholder="Additional information"
                  {...register("add_info")}
                ></textarea>
              </div>   </div>
          </form>

          {/* Cart Items and Price Details */}
          <div className="w-full md:w-1/2">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-2xl font-medium">Product</p>
              <p className="text-2xl font-medium">Subtotal</p>
            </div>
            <ul className="mb-6 space-y-2">
              {cart &&
                cart.length > 0 &&
                cart.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <p className="text-cadetGray">{item.title}</p>
                      <p className="text-xs font-medium">X</p>
                      <p className="text-xs font-medium">{item.quantity}</p>
                    </div>
                    <p className="font-light">
                      {formatPrice(item.quantity * item.price)}
                    </p>
                  </li>
                ))}
            </ul>
            <div className="mb-4 flex items-center justify-between">
              <p>Subtotal</p>
              <p className="font-light">
                {formatPrice(calculateTotalPrice(cart))}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Total</p>
              <p className="text-2xl font-bold text-primary">
                {formatPrice(totalPrice)}
              </p>
            </div>

            <p className="border-paleGray mt-8 border-t pt-6 font-light">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <span className="cursor-pointer font-semibold">
                privacy policy.
              </span>
            </p>

            <Elements stripe={stripePromise}>
              <PaymentModal
                {...{
                  isOpen,
                  setIsOpen,
                  user,
                  totalPrice,
                  billingData,
                  triggerFormSubmit,
                }}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
