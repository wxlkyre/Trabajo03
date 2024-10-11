document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const errorMessage = document.getElementById('error-message');

    // Cargar tareas desde el localStorage
    loadTasks();

    // Manejar el envío del formulario
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();

        // Validar que la tarea no esté vacía
        if (taskText === "") {
            showError("Por favor, escribe una tarea.");
            return;
        }

        // Crear nueva tarea
        addTask(taskText);

        // Limpiar campo de entrada
        taskInput.value = "";
        errorMessage.textContent = '';
    });

    // Función para agregar tarea
    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        // Botón de eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Eliminar";
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        // Marcar tarea como completada
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        saveTasks();
    }

    // Función para mostrar mensaje de error
    function showError(message) {
        errorMessage.textContent = message;
    }

    // Función para guardar tareas en localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskItem => {
            tasks.push({
                text: taskItem.firstChild.textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Función para cargar tareas desde localStorage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            savedTasks.forEach(task => {
                addTask(task.text);
                if (task.completed) {
                    const lastTask = taskList.lastChild;
                    lastTask.classList.add('completed');
                }
            });
        }
    }
});
