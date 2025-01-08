const addTaskBtn = document.getElementById("add-task-btn");
const taskFormContainer = document.getElementById("task-form-container");
const taskForm = document.getElementById("task-form");
const submitTaskBtn = document.getElementById("submit-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const tasksContainer = document.getElementById("tasks-container");

let taskData = JSON.parse(localStorage.getItem("tasks")) || [];
let currentTask = null;

// Function to render tasks in the UI
const renderTasks = () => {
    tasksContainer.innerHTML = "";
    taskData.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-item");
        taskElement.setAttribute("data-id", task.id);
        
        taskElement.innerHTML = `
            <div class="task-header">
                <p>${task.title}</p>
                <p>${task.date}</p>
            </div>
            <p>${task.description}</p>
            <div>
                <button onclick="editTask('${task.id}')">Edit</button>
                <button onclick="deleteTask('${task.id}')">Delete</button>
            </div>
        `;
        
        tasksContainer.appendChild(taskElement);
    });
};

// Function to add or update task
const saveTask = (e) => {
    e.preventDefault();
    
    const title = document.getElementById("task-title").value;
    const date = document.getElementById("task-date").value;
    const description = document.getElementById("task-description").value;

    if (!title || !date) {
        alert("Please fill out the task title and date.");
        return;
    }

    const task = {
        id: currentTask ? currentTask.id : Date.now().toString(),
        title,
        date,
        description
    };

    if (currentTask) {
        taskData = taskData.map(item => (item.id === task.id ? task : item));
        currentTask = null;
    } else {
        taskData.push(task);
    }

    localStorage.setItem("tasks", JSON.stringify(taskData));
    resetForm();
    renderTasks();
};

// Function to reset the form and hide it
const resetForm = () => {
    taskForm.reset();
    taskFormContainer.classList.add("hidden");
    submitTaskBtn.textContent = "Add Task";
};

// Function to cancel the form and hide it
const cancelForm = () => {
    resetForm();
};

// Function to edit a task
const editTask = (id) => {
    currentTask = taskData.find(task => task.id === id);
    document.getElementById("task-title").value = currentTask.title;
    document.getElementById("task-date").value = currentTask.date;
    document.getElementById("task-description").value = currentTask.description;
    
    taskFormContainer.classList.remove("hidden");
    submitTaskBtn.textContent = "Update Task";
};

// Function to delete a task
const deleteTask = (id) => {
    taskData = taskData.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(taskData));
    renderTasks();
};

// Event listeners
addTaskBtn.addEventListener("click", () => {
    taskFormContainer.classList.remove("hidden");
    currentTask = null;
});

taskForm.addEventListener("submit", saveTask);
cancelBtn.addEventListener("click", cancelForm);

// Initialize the app
renderTasks();
/*
// Elements
const taskForm = document.getElementById("task-form");
const openTaskFormBtn = document.getElementById("open-task-form");
const closeFormBtn = document.getElementById("close-form");
const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");
const taskDateInput = document.getElementById("task-date");
const taskFormBody = document.getElementById("task-form-body");
const tasksContainer = document.getElementById("tasks-container");
const formTitle = document.getElementById("form-title");

// Task data array (localStorage)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentTask = null;

// Open and Close Form Logic
openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.remove("hidden");
  formTitle.innerText = "Add Task";
  taskFormBody.reset();
  currentTask = null;
});

closeFormBtn.addEventListener("click", () => {
  taskForm.classList.add("hidden");
});

// Save or Update Task Logic
taskFormBody.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const description = taskDescriptionInput.value.trim();
  const date = taskDateInput.value;

  if (title && description && date) {
    const task = {
      id: currentTask ? currentTask.id : Date.now(),
      title,
      description,
      date,
    };

    if (currentTask) {
      // Update task
      tasks = tasks.map((t) => (t.id === currentTask.id ? task : t));
    } else {
      // Add new task
      tasks.push(task);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskForm.classList.add("hidden");
  }
});

// Edit Task Logic
function editTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    taskTitleInput.value = task.title;
    taskDescriptionInput.value = task.description;
    taskDateInput.value = task.date;
    taskForm.classList.remove("hidden");
    formTitle.innerText = "Edit Task";
    currentTask = task;
  }
}

// Delete Task Logic
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Render Tasks on Page
function renderTasks() {
  tasksContainer.innerHTML = "";
  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
      <p class="task-title">${task.title}</p>
      <p class="task-date">${task.date}</p>
      <p>${task.description}</p>
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    tasksContainer.appendChild(taskElement);
  });
}

// Initial Render
renderTasks();
*/