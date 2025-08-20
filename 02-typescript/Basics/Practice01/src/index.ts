 // 1. Variables
 let age: number = 20;

 if(age< 50){
    age += 10;
 }
console.log(age);

// 2. Arrays
let user : [number, string] = [1, "John"];
console.log(user);

// 3. Functions
function calculateTax(income: number, taxYear: number = 2022): number {
    if(taxYear < 2022) {
        return income * 1.2;
    }
    return income * 1.3;
}

console.log(calculateTax(10000));

// 4. Objects
let employee: { 
  name: string;
  age: number;
  isActive: boolean;
} = {
  name: "John",
  age: 30,
  isActive: true,
};

console.log(employee);

// 5. Union Types
function kgToLbs(weight: number | string): number {
  if (typeof weight === "number") {
    return weight * 2.2;
  } else {
    return parseInt(weight) * 2.2;
  }
}

console.log(kgToLbs(10));
console.log(kgToLbs("10kg"));

// 6. Interfaces
type Draggable = {
  drag: () => void;
};

type Resizable = {
  resize: () => void;
};

type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
  drag: () => {},
  resize: () => {},
};

console.log(textBox);

// 7. Type Aliases
type Quantity = 50| 100;
let quantity: Quantity = 100;
console.log(quantity);
