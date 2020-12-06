let togglebtn = document.querySelector(".icon");
let bodyActive = document.querySelector(".body");
let inputform = document.querySelector(".js-todo-input");

let itemList = document.querySelector(".item");
let dynamic = document.querySelector(".dynamic-items");
let bottom = document.querySelector(".bottom");
let bottomText = document.querySelector(".bottom-text");
let todolist = document.querySelector(".todo-list");


togglebtn.addEventListener("click", () => {
    bodyActive.classList.toggle("body-light");
    inputform.classList.toggle("js-todo-input-light");
    itemList.classList.toggle("item-light");
    dynamic.classList.toggle("dynamic-light");
    bottom.classList.toggle("bottom-light")
    bottomText.classList.toggle("bottom-text-light");
    todoitem.classList.toggle("todo-list-light");


})



let todoItems = [];

function renderTodo(todo) {
    const list = document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        return
    }

    const isChecked = todo.checked ? 'done' : '';
    const node = document.createElement("li");
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <i class="fa fa-close"></i>
    </button>
  `;

    if (item) {
        list.replaceChild(node, item);
    } else {
        list.append(node);
    }
}

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(todo);
    renderTodo(todo);
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}

function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.js-todo-input');

    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});