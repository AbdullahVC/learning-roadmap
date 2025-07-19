// Goal: Use map() on an array of products to calculate discounted prices (20%) and add a category (ucuz, orta, pahalı) based on price ranges.

const products = [
  { name: "Kalem", price: 2.5, onSale: true },
  { name: "Defter", price: 15, onSale: false },
  { name: "Silgi", price: 1.2, onSale: true },
  { name: "Kitap", price: 25, onSale: false },
];

const newProductsList = products.map((product) => {
  const newPrice = product.onSale ? product.price * 0.8 : product.price;

  let category;
  if (newPrice < 5) {
    category = "ucuz";
  } else if (newPrice >= 5 && newPrice <= 20) {
    category = "orta";
  } else {
    category = "pahalı";
  }

  return {
    productName: product.name,
    discountedPrice: newPrice.toFixed(2),
    category,
  };
});

console.log(newProductsList);
