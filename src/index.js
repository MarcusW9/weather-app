import _ from "lodash";
import "./style.css";

console.log("hello world");

const name = "James";

const person = { first: name };

console.log(person);

const sayHelloLinting = (fName) => {
  console.log(`Hello linting, ${fName}`);
};

function component() {
  const element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());
