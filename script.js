document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const completedTaskList = document.getElementById('completedTaskList');
    const taskTab = document.getElementById('taskTab');
    const completedTab = document.getElementById('completedTab');
    const taskSection = document.getElementById('taskSection');
    const completedSection = document.getElementById('completedSection');
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const container = document.querySelector('.container');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        completedTaskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span class="task-text">${task}</span>
                <div>
                    <button class="completeTask bx bx-check-circle"></button>
                    <button class="deleteTask bx bx-trash"></button>
                </div>
            `;
            li.querySelector('.completeTask').addEventListener('click', () => completeTask(index));
            li.querySelector('.deleteTask').addEventListener('click', () => deleteTask(index));
            taskList.appendChild(li);
        });

        completedTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item completed';
            li.innerHTML = `
                <span class="task-text">${task}</span>
                <button class="deleteTask bx bx-trash"></button>
            `;
            li.querySelector('.deleteTask').addEventListener('click', () => deleteCompletedTask(index));
            completedTaskList.appendChild(li);
        });
    }

    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }

    function completeTask(index) {
        const completedTask = tasks.splice(index, 1)[0];
        completedTasks.push(completedTask);
        saveTasks();
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function deleteCompletedTask(index) {
        completedTasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function showLoader() {
        loaderWrapper.classList.remove('hidden');
        setTimeout(() => {
            loaderWrapper.style.display = 'none';
            container.classList.remove('hidden');
        }, 2000);
    }

    function switchTab(tab) {
        if (tab === 'tasks') {
            taskSection.classList.remove('hidden');
            completedSection.classList.add('hidden');
            taskTab.classList.add('active');
            completedTab.classList.remove('active');
            taskInput.parentElement.classList.remove('hidden');
        } else if (tab === 'completed') {
            completedSection.classList.remove('hidden');
            taskSection.classList.add('hidden');
            completedTab.classList.add('active');
            taskTab.classList.remove('active');
            taskInput.parentElement.classList.add('hidden');
        }
    }
    

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    taskTab.addEventListener('click', () => switchTab('tasks'));
    completedTab.addEventListener('click', () => switchTab('completed'));

    renderTasks();
    showLoader();
});
