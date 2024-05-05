let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let completedCount = parseInt(localStorage.getItem('completedCount')) || 0; // Cargar el contador desde localStorage
let progressBarWidth = 0;


window.onload = function () {
    const taskList = document.getElementById("taskList");
    let storedProgress = localStorage.getItem('progressBarWidth');
    let storedCount = localStorage.getItem('completedCount');
    let storedImage1Display = localStorage.getItem('image1Display');
    let storedImage2Display = localStorage.getItem('image2Display');
    let storedImage3Display = localStorage.getItem('image3Display');
    let storedProgressPercentage = localStorage.getItem('progressPercentage'); 

    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", updateComida);
        li.appendChild(checkbox);

        const taskText = document.createTextNode(tasks[i]);
        li.appendChild(taskText);

        // Crear campo de fecha de entrega
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        li.appendChild(dateInput);

        // Agregar a la lista
        taskList.appendChild(li);
    }

    if (storedCount) {
        completedCount = parseInt(storedCount);
        document.getElementById("completedCount").textContent = completedCount;
    }
    if (storedProgress) {
        progressBarWidth = parseFloat(storedProgress);
        document.getElementById("progressBar").style.width = progressBarWidth + "%";
    }
    if (storedProgressPercentage) { // Nueva línea
        document.getElementById("progressPercentage").textContent = storedProgressPercentage + "%"; // Nueva línea
    }
    if (storedImage1Display) {
        document.getElementById("image1").style.display = storedImage1Display;
    }
    if (storedImage2Display) {
        document.getElementById("image2").style.display = storedImage2Display;
    }
    if (storedImage3Display) {
        document.getElementById("image3").style.display = storedImage3Display;
    }
}

function addTask() {
    const taskInput = document.getElementById("newTask");
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Debes escribir algo en la tarea.");
        return;
    }

    // Crear elemento de lista
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", updateComida);
    li.appendChild(checkbox);

    const taskText = document.createTextNode(taskName);
    li.appendChild(taskText);

    // Crear campo de fecha de entrega
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    li.appendChild(dateInput);

    // Agregar a la lista
    const taskList = document.getElementById("taskList");
    taskList.appendChild(li);

    // Limpiar el campo de entrada
    taskInput.value = "";
    tasks.push(taskName);

    // Guardar tareas en localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}




function updateComida(event) {
    const checkbox = event.target;
    const li = checkbox.parentElement;

    if (checkbox.checked) {
        completedCount += 10; // Aumentar el contador de tareas completadas en 10

        // Eliminar la tarea de la lista
        li.remove();

        // Eliminar la tarea del array
        const taskName = li.childNodes[1].nodeValue.trim();
        tasks = tasks.filter(task => task !== taskName);

        // Actualizar el localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('completedCount', completedCount); // Guardar el contador en localStorage
    } else {
        completedCount -= 10; // Disminuir el contador de tareas completadas en 10
        localStorage.setItem('completedCount', completedCount); // Guardar el contador en localStorage
    }

    document.getElementById("completedCount").textContent = completedCount;
    document.getElementById("progressBar").style.width = progressBarWidth + "%";
}

const image1 = document.getElementById("image1");
image1.style.display = "block";

function alimentar() {
    if (completedCount >= 10) {
        completedCount -= 10;
        progressBarWidth += 12.5;

        // Si la barra de progreso ha alcanzado o superado el 100%, reiniciarla a 0
        // Si el ancho de la barra de progreso es mayor o igual a 100
        if (progressBarWidth >= 100) {
            // Se establece un intervalo que se ejecuta cada 200 milisegundos
            const decreaseInterval = setInterval(() => {
                // Si el ancho de la barra de progreso es menor o igual a 0
                if (progressBarWidth <= 0) {
                    // Se detiene el intervalo
                    clearInterval(decreaseInterval);
                } else {
                    // Se disminuye el ancho de la barra de progreso en 5
                    progressBarWidth -= 5;
                    // Se actualiza el ancho de la barra de progreso en el DOM
                    document.getElementById("progressBar").style.width = progressBarWidth + "%";
                    // Se actualiza el texto del porcentaje de progreso en el DOM
                    document.getElementById("progressPercentage").textContent = Math.round(progressBarWidth) + "%";
                    // Se guarda el ancho de la barra de progreso en localStorage
                    localStorage.setItem('progressBarWidth', progressBarWidth);
                    // Se guarda el porcentaje de progreso en localStorage
                    localStorage.setItem('progressPercentage', Math.round(progressBarWidth));
                }
            }, 200);
        } else {
            // Si el ancho de la barra de progreso es menor a 100
            // Se actualiza el texto del conteo completado en el DOM
            document.getElementById("completedCount").textContent = completedCount;
            // Se actualiza el ancho de la barra de progreso en el DOM
            document.getElementById("progressBar").style.width = progressBarWidth + "%";
            // Se actualiza el texto del porcentaje de progreso en el DOM
            document.getElementById("progressPercentage").textContent = Math.round(progressBarWidth) + "%";
            // Se guarda el conteo completado en localStorage
            localStorage.setItem('completedCount', completedCount);
            // Se guarda el ancho de la barra de progreso en localStorage
            localStorage.setItem('progressBarWidth', progressBarWidth);
            // Se guarda el porcentaje de progreso en localStorage
            localStorage.setItem('progressPercentage', Math.round(progressBarWidth));
        }

        // Actualizar el elemento HTML que muestra el contador
        document.getElementById("completedCount").textContent = completedCount;
        document.getElementById("progressBar").style.width = progressBarWidth + "%";
        document.getElementById("progressPercentage").textContent = Math.round(progressBarWidth) + "%";

        // Guardar el contador, el progreso de la barra de progreso y el porcentaje de progreso en el localStorage
        localStorage.setItem('completedCount', completedCount);
        localStorage.setItem('progressBarWidth', progressBarWidth);
        localStorage.setItem('progressPercentage', Math.round(progressBarWidth));

        if (progressBarWidth >= 0 && progressBarWidth < 25) {
            image1.style.display = "block";
            image2.style.display = "none";
            image3.style.display = "none";
        } else if (progressBarWidth >= 25 && progressBarWidth < 50) {
            image1.style.display = "none";
            image2.style.display = "block";
            image3.style.display = "none";
        } else if (progressBarWidth >= 50 && progressBarWidth < 75) {
            image1.style.display = "none";
            image2.style.display = "none";
            image3.style.display = "block";
        } else if (progressBarWidth >= 75) {
            image1.style.display = "block";
            image2.style.display = "none";
            image3.style.display = "none";
        }

        // Guardar el estado de visualización de las imágenes en el localStorage
        localStorage.setItem('image1Display', image1.style.display);
        localStorage.setItem('image2Display', image2.style.display);
        localStorage.setItem('image3Display', image3.style.display);
    }
}
