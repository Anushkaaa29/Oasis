
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
    const totalTasks = document.getElementById('totalTasks');
    const completedTasks = document.getElementById('completedTasks');
    const pendingTasks = document.getElementById('pendingTasks');
    
    let tasks = [];
    
    // Update statistics
    function updateStats() {
      const total = tasks.length;
      const completed = tasks.filter(task => task.completed).length;
      const pending = total - completed;
      
      totalTasks.textContent = total;
      completedTasks.textContent = completed;
      pendingTasks.textContent = pending;
      
      // Smooth number animation
      [totalTasks, completedTasks, pendingTasks].forEach(el => {
        el.classList.add('fade-in');
        setTimeout(() => el.classList.remove('fade-in'), 500);
      });
    }
    
    // Add task function
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === '') {
        taskInput.classList.add('shake');
        setTimeout(() => taskInput.classList.remove('shake'), 500);
        return;
      }
      
      const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        timestamp: new Date().toLocaleString()
      };
      
      tasks.push(task);
      renderTasks();
      taskInput.value = '';
      taskInput.focus();
    }
    
    // Toggle task completion
    function toggleTask(id) {
      tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      renderTasks();
    }
    
    // Delete task
    function deleteTask(id) {
      tasks = tasks.filter(task => task.id !== id);
      renderTasks();
    }
    
    // Render all tasks
    function renderTasks() {
      updateStats();
      
      if (tasks.length === 0) {
        taskList.innerHTML = '';
        taskList.appendChild(emptyState);
        emptyState.style.display = 'block';
        return;
      }
      
      emptyState.style.display = 'none';
      taskList.innerHTML = '';
      
      tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item fade-in';
        taskItem.innerHTML = `
          <div class="task-content">
            <p class="task-text ${task.completed ? 'completed' : ''}">
              ${task.text}
              <br>
              <small class="text-muted">${task.timestamp}</small>
            </p>
          </div>
          <div class="task-actions">
            <button class="btn-action btn-complete" onclick="toggleTask(${task.id})">
              <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
            </button>
            <button class="btn-action btn-delete" onclick="deleteTask(${task.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `;
        taskList.appendChild(taskItem);
      });
    }
    
    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTask();
      }
    });
    
    // Focus input on page load
    document.addEventListener('DOMContentLoaded', () => {
      taskInput.focus();
      updateStats();
    });
  