import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { BsBagX, BsCart3 } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { formatPrice } from "../../utils/formatPrice";
import { calculateTotalPrice } from "../../utils/calculateTotalPrice";
import useCart from "../../hooks/useCart";

const SidebarCart = ({ user, isHomePage }) => {
  const { cart, handleCartItemDel } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isShowing, setIsShowing] = useState(true);

  // subtoatl price of all carted items
  const totalPrice = calculateTotalPrice(cart);

  return (
    <>
      <div className="relative">
        {user ? (
          <>
            <BsCart3
              onClick={() => {
                setIsOpen(true);
                setIsShowing(false);
                setTimeout(() => setIsShowing(true), 300);
              }}
              className={`${isHomePage && "text-white"} cursor-pointer text-2xl lg:text-[23px]`}
            />
            {cart && cart.length > 0 && (
              <p className="absolute -right-1 -top-1 flex size-[14px] items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cart.length}
              </p>
            )}
          </>
        ) : (
          <Link to="/login">
            <BsCart3 className="cursor-pointer text-2xl lg:text-[23px]" />
          </Link>
        )}
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 font-Poppins"
      >
        <div className="fixed inset-0 mx-auto flex w-full max-w-[1920px] items-start justify-end bg-black/20">
          <Transition
            show={isShowing}
            enter="transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="flex h-screen max-h-[1080px] min-h-fit w-full max-w-[417px] flex-col justify-between overflow-y-auto bg-white py-5">
              {/* products div */}
              <div className="pl-[30px] pr-10">
                {/* title */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Shopping Cart</h2>
                  <BsBagX
                    size={19}
                    onClick={() => setIsOpen(false)}
                    className="text-cadetGray cursor-pointer transition-all hover:text-[#8f8f8f]"
                  />
                </div>
                <div className="bg-paleGray mb-10 mt-6 h-[1px] w-5/6"></div>
                {/* Products container */}
                <div className="h-[60vh] max-h-[648px] space-y-5 overflow-y-auto">
                  {cart && cart.length > 0 ? (
                    cart.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-8">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(false)}
                          >
                            <Link to={`/products/${item.product_id}`}>
                              <img
                                className="size-24 rounded-[10px] object-cover object-center"
                                src={item.thumbnail}
                                alt={`${item.title} image`}
                                loading="lazy"
                              />
                            </Link>
                          </motion.button>
                          <div>
                            <motion.p
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setIsOpen(false)}
                            >
                              <Link to={`/products/${item.product_id}`}>
                                {item.title}
                              </Link>
                            </motion.p>
                            <p className="mt-2 font-light">
                              {item.quantity}
                              <span className="mx-4 text-xs">X</span>
                              <span className="text-xs font-medium text-primary">
                                {formatPrice(item.price)}
                              </span>
                            </p>
                          </div>
                        </div>
                        <IoCloseCircle
                          onClick={() => handleCartItemDel(item.product_id)}
                          size={24}
                          className="text-cadetGray cursor-pointer transition-all hover:text-[#888888]"
                        />
                      </div>
                    ))
                  ) : (
                    <p>You have not added any product yet! :(</p>
                  )}
                </div>
              </div>

              <div>
                <div className="mt-7 flex items-center justify-between pl-[30px] pr-24">
                  <p>Subtotal</p>
                  <p className="font-semibold text-primary">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
                <div className="bg-paleGray my-6 h-[1px]"></div>
                {/* buttons */}
                <div className="flex w-full justify-between gap-5 px-7 pb-7">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="w-full rounded-full border border-black text-center text-xs transition-all hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <Link
                      to="/cart"
                      className="inline-block w-full px-[30px] py-1.5"
                    >
                      Cart
                    </Link>
                  </motion.button>
                  {cart && cart.length > 0 ? (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsOpen(false)}
                      className="w-full rounded-full border border-black text-center text-xs transition-all hover:border-primary hover:bg-primary hover:text-white"
                    >
                      <Link
                        to="/checkout"
                        className="inline-block w-full px-[30px] py-1.5"
                      >
                        Checkout
                      </Link>
                    </motion.button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toast.error("Cart is empty!")}
                      className="w-full rounded-full border border-black px-[30px] py-1.5 text-center text-xs transition-all hover:border-primary hover:bg-primary hover:text-white"
                    >
                      Checkout
                    </motion.button>
                  )}
                </div>
              </div>
            </DialogPanel>
          </Transition>
        </div>
      </Dialog>
    </>
  );
};

export default SidebarCart;
