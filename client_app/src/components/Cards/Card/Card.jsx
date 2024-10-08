import { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowUpLeftCircle, BsFillHeartFill, BsHeart } from "react-icons/bs";
import LoginModal from "../../Modals/LoginModal/LoginModal";
import AddToCartModal from "../../Modals/AddToCartModal/AddToCartModal";
import { formatPrice } from "../../../utils/formatPrice";
import useAuth from "../../../hooks/useAuth";
import useFavourite from "../../../hooks/useFavourite";

const Card = ({ product }) => {
  const { _id, title, sub_title, price, thumbnail, is_new } = product;
  const { user } = useAuth();
  const { favouriteItems, addToFavourite, deleteFavouriteItem } =
    useFavourite();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleModal = () => {
    if (!user) {
      return setIsOpen(true);
    }
    setIsOpen(true);
    setSelectedProduct(product);
  };

  const isFavourite = favouriteItems.some((item) => item.product_id === _id);

  const toggleFavourite = () => {
    if (isFavourite) {
      deleteFavouriteItem(_id, user?.email);
    } else {
      addToFavourite(_id, title, price, thumbnail);
    }
  };

  return (
    <>
      <div className="group relative flex h-full flex-col">
        <div className="relative h-[300px] w-full">
          <Link to={`/products/${_id}`}>
            <img
              className="h-full w-full object-cover object-center"
              src={thumbnail}
              alt={`image of ${title}`}
              loading="lazy"
            />
          </Link>
          {price.discount_percent || is_new ? (
            <p
              className={`text-white" absolute right-4 top-4 flex size-11 items-center justify-center rounded-full font-medium text-white md:right-6 md:top-6 md:size-12 ${is_new ? "bg-keppel" : "bg-lightCoral"}`}
            >
              <span>{is_new ? "New" : `-${price.discount_percent}%`}</span>
            </p>
          ) : null}
        </div>

        <div className="bg-lightGray flex-1 pb-7 pl-4 pr-5 pt-4">
          <Link
            to={`/products/${_id}`}
            className="text-xl font-semibold md:text-1xl "
          >
            {title}
          </Link>
          {/* <p className="text-steelGray my-2 md:font-medium">{sub_title}</p> */}

          <div
            className={`${price.discounted && "flex items-center justify-between"}`}
          >
            {price.discounted ? (
              <p className="text-lg font-semibold md:text-xl">
                {formatPrice(price.discounted)}
              </p>
            ) : (
              <p className="text-lg font-semibold md:text-xl mt-2">
                {formatPrice(price.original)}
              </p>
            )}

            {/* Original price of a discounted product  */}
            {price.discounted && (
              <p className="text-grayStone line-through">
                {formatPrice(price.original)}
              </p>
            )}
          </div>
        </div>

        {/* Hover Elements */}
        <Link
          to={`/products/${_id}`}
          className="bg-charcoal absolute bottom-0 left-0 h-0 w-full opacity-0 transition-all duration-300 ease-linear group-hover:z-10 group-hover:h-full group-hover:opacity-70"
        ></Link>
        <div className="absolute left-0 top-0 hidden h-full w-full flex-col items-center justify-center gap-6 px-4 group-hover:flex">
          <button
            onClick={() => handleModal(product)}
            className="z-20 w-4/5 bg-white py-3 font-medium text-primary transition-all hover:bg-primary hover:text-white"
          >
            Add to cart
          </button>
          <div className="z-20 flex w-4/5 flex-wrap items-center justify-between gap-1 text-center font-semibold text-white">
            <Link
              to={`/products/${_id}`}
              className="flex items-center gap-1 transition-all hover:text-primary"
            >
              <BsArrowUpLeftCircle size={17} />
              View Details
            </Link>
            <button
              onClick={toggleFavourite}
              className="flex items-center gap-1 transition-all hover:text-primary"
            >
              {isFavourite ? (
                <>
                  <BsFillHeartFill color="red" />{" "}
                  <span className="text-red-600">Liked</span>
                </>
              ) : (
                <>
                  <BsHeart />
                  Like
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && user ? (
        <AddToCartModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedProduct={selectedProduct}
        />
      ) : (
        <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default Card;
