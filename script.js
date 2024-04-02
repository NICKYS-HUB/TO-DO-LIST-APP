document.addEventListener('DOMContentLoaded', function() {
    loadTodoList();
});

function loadTodoList() {
    const todoList = document.getElementById('todo-list');
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    todoList.innerHTML = '';

    todos.forEach(function(todo, index) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <input type="checkbox" onchange="toggleComplete(${index})" ${todo.completed ? 'checked' : ''}>
            <span>${todo.text}</span>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    if (text !== '') {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text: text, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodoList();
        input.value = '';
    }
}

function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodoList();
}

function toggleComplete(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodoList();
}
