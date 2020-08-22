const container = document.querySelector(".container");
let input = document.querySelector(".input");
const addButton = document.querySelector(".add");

if (window.localStorage.getItem("todos") == undefined) {
  let todos = [];
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

let todosEX = window.localStorage.getItem("todos");
let todos = JSON.parse(todosEX);

class item {
  constructor(itemName) {
    this.createItem(itemName);
  }
  createItem(itemName) {
    let itemBox = document.createElement("div");
    itemBox.classList.add("item");

    let input = document.createElement("input");
    input.type = "text";
    input.disabled = true;
    input.value = itemName;
    input.classList.add("item_input");

    let editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.innerHTML = "EDIT";
    editButton.addEventListener("click", () => this.edit(input, itemName));

    let removeButton = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.innerHTML = "REMOVE";
    removeButton.addEventListener("click", () =>
      this.remove(itemBox, itemName)
    );

    container.appendChild(itemBox);

    itemBox.appendChild(input);
    itemBox.appendChild(editButton);
    itemBox.appendChild(removeButton);
  }

  edit(input, itemName) {
    if (input.disabled == true) {
      input.disabled = !input.disabled;
    } else {
      input.disabled = !input.disabled;
      let indexof = todos.indexOf(itemName);
      todos[indexof] = input.value;
      window.localStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  remove(itemBox, itemName) {
    itemBox.parentNode.removeChild(itemBox);
    let index = todos.indexOf(itemName);
    todos.splice(index, 1);
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }
}

addButton.addEventListener("click", check);
window.addEventListener("keydown", (e) => {
  if (e.which == 13) {
    check();
  }
});

function check() {
  if (input.value != "") {
    new item(input.value);
    todos.push(input.value);
    window.localStorage.setItem("todos", JSON.stringify(todos));
    input.value = "";
  }
}

for (let v = 0; v < todos.length; v++) {
  new item(todos[v]);
}

new item("Estudiar");
