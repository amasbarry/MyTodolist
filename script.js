document.addEventListener("DOMContentLoaded", function() {
    
    const addBtn = document.getElementById("addBtn");
    const inputBox = document.getElementById("input-box");
    const duedate = document.getElementById("due-date");
    const priority = document.getElementById("priority");
    const status = document.getElementById("status");
    const listContainer = document.getElementById("list-container");

    // Fonction pour charger les tâches depuis le localStorage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        
        savedTasks.forEach(task => {
            const { name, date, status, priority, completed } = task;
            
            const listLi = createTaskElement(name, date, status, priority, completed);
            listContainer.appendChild(listLi);
        });
    }

    // Fonction pour enregistrer les tâches dans le localStorage
    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Créer un élément de tâche
    function createTaskElement(name, date, status, priority, completed) {
        const listLi = document.createElement("li");
        listLi.classList.add("lilist");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("taskCheckbox");
        if (completed) {
            checkbox.checked = true;
            listLi.classList.add("completed");
        }
        
        const taskNameSpan = document.createElement("span");
        taskNameSpan.textContent = name;

        const taskDateSpan = document.createElement("span");
        taskDateSpan.textContent = date;

        const taskStatusSpan = document.createElement("span");
        taskStatusSpan.textContent = status;

        const taskPrioritySpan = document.createElement("span");
        taskPrioritySpan.textContent = priority;


        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Supprimer";
        deleteBtn.classList.add("deleteBtn");

        listLi.appendChild(checkbox);
        listLi.appendChild(taskNameSpan);
        listLi.appendChild(taskDateSpan);
        listLi.appendChild(taskStatusSpan);
        listLi.appendChild(taskPrioritySpan);
        listLi.appendChild(deleteBtn);

        return listLi;
    }

    // Charger les tâches existantes au chargement de la page
    loadTasks();

    // Ajouter une tâche
    addBtn.addEventListener("click", function() {
        const taskName = inputBox.value.trim();
        const taskDate = duedate.value.trim();
        const taskStatus = status.value.trim();
        const taskPriority = priority.value.trim();

        // Vérifier si le nom de la tâche et la date sont saisis
        if (taskName === "") {
            alert("Veuillez saisir le nom de la tâche !");
            return;
        }
        
        if (taskDate === "") {
            alert("Veuillez saisir la date de la tâche !");
            return;
        }

        const newTask = { name: taskName, date: taskDate, status: taskStatus, priority: taskPriority, completed: false };
        const listLi = createTaskElement(taskName, taskDate, taskStatus, taskPriority, false);
        listContainer.appendChild(listLi);

        // Récupérer les tâches existantes depuis le localStorage
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.push(newTask);
        saveTasks(savedTasks);

        inputBox.value = "";
        duedate.value = "";
        status.value = "";
        priority.value = "";
    });

    // Supprimer une tâche ou marquer comme complétée
    listContainer.addEventListener("click", function(event) {
        const target = event.target;
        const taskLi = target.parentElement;
        const taskName = taskLi.querySelector("span").textContent;

        if (target.classList.contains("deleteBtn")) {
            taskLi.remove();
            // Supprimer la tâche du localStorage
            const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const updatedTasks = savedTasks.filter(task => task.name !== taskName);
            saveTasks(updatedTasks);
        } else if (target.classList.contains("taskCheckbox")) {
            taskLi.classList.toggle("completed");
            // Mettre à jour le statut de complétion dans le localStorage
            const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const updatedTasks = savedTasks.map(task => {
                if (task.name === taskName) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            });
            saveTasks(updatedTasks);
        }
    });

});

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });