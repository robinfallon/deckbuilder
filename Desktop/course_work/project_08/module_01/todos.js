const TODOS_URL = `https://jsonplace-univclone.herokuapp.com/todos`

function fetchTodos() {
  return fetch(TODOS_URL).then(function (result) {
    return result.json();
  }).catch(function (error) {
    console.error(error);
  });
}

function renderAllTodos(todos) {
  todos.filter(function (todo) {
    return todo.completed
  }).forEach(function (todo) {
    $('.complete').append(
      renderTodo(todo)
    )
  })

  todos.filter(function (todo) {
    return !todo.completed
  }).forEach(function (todo) {
    $('.incomplete').append(
      renderTodo(todo)
    )
  })
}

function renderTodo(todo) {
  return $(`
    <div class="todo">
      <h3>${ todo.title }</h3>
      <footer>${
        todo.completed
        ? `<button>UNDO</button>`
        : `<button>DONE</button>`
      }
      </footer>
    </div>
  `)
}

function bootstrap() {
  fetchTodos().then(renderAllTodos);
}

bootstrap();