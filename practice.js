/* eslint-disable no-unused-vars */
//@ts-ignore
const obj = {
  name: "Zack",
  age: 22,
};

const newObj = {
  ...obj,
  isMarried: false,
};

console.log(obj);

console.log("newObj:", newObj);
