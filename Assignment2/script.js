// Initialize tasks array and task status columns
let tasks = [];
const columns = ['backlog', 'todo', 'ongoing', 'done'];

// Render tasks on the page
function renderTasks() {
    document.querySelectorAll('.task-list').forEach(list => list.innerHTML = ''); // Clear existing tasks

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.id = task.id;
        taskElement.className = 'task';
        taskElement.innerHTML = `
            ${task.name}
            <div class="status">${task.status}</div>
            <div class="move-buttons">
                ${columns.indexOf(task.status) > 0 ? '<button onclick="moveTask(\'' + task.id + '\', \'left\')">←</button>' : ''}
                ${columns.indexOf(task.status) < columns.length - 1 ? '<button onclick="moveTask(\'' + task.id + '\', \'right\')">→</button>' : ''}
            </div>
        `;
        document.querySelector(`#${task.status} .task-list`).appendChild(taskElement); // Add task to the correct column
    });
}

// Add a new task
function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskStatus = document.getElementById('taskStatus').value;
    
    if (taskName.trim() === '') { // Ensure task name is not empty
        alert('Please enter a task name');
        return;
    }

    // Create and add the new task
    const newTask = {
        id: 'task-' + (tasks.length + 1),
        name: taskName,
        status: taskStatus
    };

    tasks.push(newTask);
    renderTasks();
    document.getElementById('taskName').value = ''; // Clear input field
}

// Move a task left or right
function moveTask(taskId, direction) {
    const task = tasks.find(t => t.id === taskId); // Find task by ID
    if (task) {
        const currentIndex = columns.indexOf(task.status);
        let newIndex;

        if (direction === 'left' && currentIndex > 0) {
            newIndex = currentIndex - 1;
        } else if (direction === 'right' && currentIndex < columns.length - 1) {
            newIndex = currentIndex + 1;
        }

        if (newIndex !== undefined) {
            task.status = columns[newIndex];
            renderTasks();
        }
    }
}
