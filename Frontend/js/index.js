import { Todos } from "./class/Todos.js"

const BACKEND_ROOT_URL = 'http://localhost:3001'

const todos = new Todos(BACKEND_ROOT_URL)

const list = document.querySelector('ul')
const input = document.querySelector('input')

input.disabled = false;

const addButton = document.querySelector('button')

const renderTask = (task) => {
  const li = document.createElement('li');
  li.setAttribute('class', 'list-group-item');
  li.setAttribute('data-key', task.getId().toString());
  renderSpan(li, task.getText());
  renderLink(li, task.getId());
  list.append(li)
}

const renderSpan = (li,text) => {
  const span = li.appendChild(document.createElement('span'));
  span.innerHTML = text;
}

const renderLink = (li, id) => {
  const a = li.appendChild(document.createElement('a'));
  a.innerHTML = '<i class="bi bi-trash"></i>';
  a.setAttribute('style', 'float: right');
  a.addEventListener('click', (event) => {
    todos.removeTask(id).then((removed_id) => {
    const li_to_remove = document.querySelector('[data-key="' + removed_id + '"]');
      li_to_remove.remove()
  })
  .catch ((error) => {
    alert(error.message)
  })
  })
}

const getTasks = () => {
    todos.getTasks().then((tasks) => {
      tasks.forEach(task => {
        renderTask(task)
      })
    })
    .catch((error) => {
      alert("Error saving task" + error.message)
    })
  }


input.addEventListener('keypress', (event) =>
{
  if (event.key === 'Enter') {
    event.preventDefault()
    const task = input.value.trim()
    if (task !== '') {
      todos.addTask(task).then((task) => {
        renderTask(task);
        input.value = '';
        input.focus()
      })
    }
  }
})

addButton.addEventListener('click', (event) => {
  event.preventDefault()
  const task = input.value.trim()
    if (task !== '') {
      todos.addTask(task).then((task) => {
        renderTask(task);
        input.value = '';
        input.focus()
      })
    }
})

getTasks()