// Part 1: Mastering JavaScript Basics
// Variables and data types
let tasks = []; // Array to store tasks
let showCompleted = false; // Boolean to toggle completed tasks visibility
const maxTasks = 10; // Constant for max tasks limit

// Conditional function to validate task input
function isValidTask(taskText) {
    if (taskText.trim() === "") {
        return false; // Empty input
    }
    if (tasks.length >= maxTasks) {
        return false; // Exceeds max tasks
    }
    return true;
}

// Part 2: JavaScript Functions
// Function to add a new task
function addTask(taskText) {
    if (!isValidTask(taskText)) {
        updateStatusMessage("Error: Task cannot be empty or list is full!");
        return;
    }
    
    const task = {
        id: Date.now(), // Unique ID based on timestamp
        text: taskText,
        completed: false
    };
    tasks.push(task);
    renderTasks();
    updateStatusMessage(`Task "${taskText}" added successfully!`);
}

// Function to toggle task completion status
function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
    updateStatusMessage("Task status updated!");
}

// Part 3: JavaScript Loops
// Loop to render tasks (using forEach)
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear existing list
    
    tasks.forEach(task => {
        if (showCompleted && !task.completed) return; // Skip non-completed if filter active
        
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            ${task.text}
            <button onclick="toggleTaskCompletion(${task.id})">
                ${task.completed ? "Undo" : "Complete"}
            </button>
        `;
        taskList.appendChild(li);
    });
    
    // While loop example: Count completed tasks
    let completedCount = 0;
    let i = 0;
    while (i < tasks.length) {
        if (tasks[i].completed) completedCount++;
        i++;
    }
    if (tasks.length === 0) {
        updateStatusMessage("No tasks yet. Add one above!");
    } else if (showCompleted) {
        updateStatusMessage(`Showing ${completedCount} completed task(s)`);
    } else {
        updateStatusMessage(`Total tasks: ${tasks.length}, Completed: ${completedCount}`);
    }
}

// Part 4: Mastering the DOM
// DOM interaction 1: Add task button click event
document.getElementById("addTaskBtn").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    addTask(taskInput.value);
    taskInput.value = ""; // Clear input
});

// DOM interaction 2: Filter completed tasks button
document.getElementById("filterBtn").addEventListener("click", () => {
    showCompleted = !showCompleted;
    document.getElementById("filterBtn").textContent = 
        showCompleted ? "Show All Tasks" : "Show Completed";
    renderTasks();
});

// DOM interaction 3: Update status message
function updateStatusMessage(message) {
    const status = document.getElementById("statusMessage");
    status.textContent = message;
    // Temporary highlight effect
    status.style.color = "#28a745";
    setTimeout(() => {
        status.style.color = "#555";
    }, 2000);
}

// Initialize the app
renderTasks();