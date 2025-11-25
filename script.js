
let tasks = [];

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function addTask() {
  const taskText = taskInput.value.trim();
  
  if (taskText === '') {
    alert('Veuillez entrer une tâche !');
    return;
  }
  
  tasks.push(taskText);
  taskInput.value = '';
  displayTasks();
}

function displayTasks() {
  taskList.innerHTML = '';
  
  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span onclick="toggleComplete(${i})">${tasks[i]}</span>
      <button class="delete-btn" onclick="deleteTask(${i})">Supprimer</button>
    `;
    taskList.appendChild(li);
  }
}

function toggleComplete(index) {
  const spans = taskList.querySelectorAll('span');
  spans[index].classList.toggle('completed');
}


function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}


addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
