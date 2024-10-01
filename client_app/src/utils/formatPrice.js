export const formatPrice = (price) => {
  const result = Number.isInteger(price) ? price : price.toFixed(2);
  return result.toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });
};
