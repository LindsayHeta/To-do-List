// Tableau pour stocker les sections
let sections = [];

// Images de champions League of Legends
const championImages = [
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ezreal_0.jpg',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Katarina_0.jpg',
  'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vayne_0.jpg'
];

// Fonction pour obtenir une image aléatoire
function getRandomChampion() {
  return championImages[Math.floor(Math.random() * championImages.length)];
}

// Récupération des éléments du DOM
const sectionInput = document.getElementById('sectionInput');
const imageInput = document.getElementById('imageInput');
const addSectionBtn = document.getElementById('addSectionBtn');
const board = document.getElementById('board');

// Charger les sections au démarrage
window.onload = function() {
  const saved = localStorage.getItem('sections');
  if (saved) {
    sections = JSON.parse(saved);
    displaySections();
  }
};

// Sauvegarder les sections
function saveSections() {
  localStorage.setItem('sections', JSON.stringify(sections));
}

// Ajouter une section
function addSection() {
  const sectionName = sectionInput.value.trim();
  if (sectionName === '') {
    alert('Entrez un nom de section !');
    return;
  }
  
  const imageUrl = imageInput.value.trim() || getRandomChampion();
  sections.push({ name: sectionName, image: imageUrl, tasks: [] });
  sectionInput.value = '';
  imageInput.value = '';
  saveSections();
  displaySections();
}

// Afficher toutes les sections
function displaySections() {
  board.innerHTML = '';
  
  sections.forEach((section, sectionIndex) => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'section';
    const imageHtml = section.image ? `<div class="section-image" style="background-image: url('${section.image}')"></div>` : '';
    sectionDiv.innerHTML = `
      ${imageHtml}
      <div class="section-header">
        <h3>${section.name}</h3>
        <button class="delete-section" onclick="deleteSection(${sectionIndex})">✕</button>
      </div>
      <div class="task-input">
        <input type="text" placeholder="Nouvelle tâche..." onkeypress="if(event.key==='Enter') addTask(${sectionIndex}, this)">
        <button onclick="addTask(${sectionIndex}, this.previousElementSibling)">+</button>
      </div>
      <ul class="task-list" id="section-${sectionIndex}"></ul>
    `;
    board.appendChild(sectionDiv);
    
    // Afficher les tâches de cette section
    displayTasks(sectionIndex);
  });
}

// Ajouter une tâche à une section
function addTask(sectionIndex, input) {
  const taskText = input.value.trim();
  if (taskText === '') {
    alert('Entrez une tâche !');
    return;
  }
  
  sections[sectionIndex].tasks.push({ text: taskText, completed: false });
  input.value = '';
  saveSections();
  displayTasks(sectionIndex);
}

// Afficher les tâches d'une section
function displayTasks(sectionIndex) {
  const taskList = document.getElementById(`section-${sectionIndex}`);
  taskList.innerHTML = '';
  
  sections[sectionIndex].tasks.forEach((task, taskIndex) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleComplete(${sectionIndex}, ${taskIndex})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${sectionIndex}, ${taskIndex})">✕</button>
    `;
    taskList.appendChild(li);
  });
}

// Marquer une tâche comme terminée
function toggleComplete(sectionIndex, taskIndex) {
  sections[sectionIndex].tasks[taskIndex].completed = !sections[sectionIndex].tasks[taskIndex].completed;
  saveSections();
  displayTasks(sectionIndex);
}

// Supprimer une tâche
function deleteTask(sectionIndex, taskIndex) {
  sections[sectionIndex].tasks.splice(taskIndex, 1);
  saveSections();
  displayTasks(sectionIndex);
}

// Supprimer une section
function deleteSection(sectionIndex) {
  sections.splice(sectionIndex, 1);
  saveSections();
  displaySections();
}

// Événements
addSectionBtn.addEventListener('click', addSection);
sectionInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addSection();
  }
});
