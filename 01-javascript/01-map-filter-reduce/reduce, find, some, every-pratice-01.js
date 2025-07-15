const products = [
  { name: "Laptop", price: 1200 },
  { name: "Phone", price: 800 },
  { name: "Tablet", price: 600 },
  { name: "Monitor", price: 300 },
];

const expensive = products.find((item) => item.price > 800);
console.log(expensive);

const hasExpensive = products.some((item) => item.price > 1000);
console.log(hasExpensive);

const allAbove200 = products.every((item) => item.price > 200);
console.log(allAbove200);
