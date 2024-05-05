document.addEventListener('DOMContentLoaded', function () {
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const monthDisplay = document.querySelector('.month');
    const datesContainer = document.getElementById('datesContainer');
    const modal = document.getElementById('modal');
    const eventDetailsElement = document.getElementById('eventDetails');
    const closeBtn = document.getElementsByClassName('close')[0];
    

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectedDate; // Variable para almacenar el día seleccionado
    let events = JSON.parse(localStorage.getItem('events')) || {}; // Recuperar los eventos del localStorage
    displayMonth(currentMonth, currentYear);

    prevMonthBtn.addEventListener('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        displayMonth(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        displayMonth(currentMonth, currentYear);
    });

    // Función para mostrar el modal con los detalles del evento
    function showModal(eventDetails) {
        eventDetailsElement.textContent = eventDetails;
        modal.style.display = 'block';
        
        // Agregar evento de clic para el botón de eliminación
        const deleteEventBtn = document.getElementById('deleteEventBtn');
        deleteEventBtn.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
                // Eliminar el evento del día seleccionado
                delete events[`${currentYear}-${currentMonth}`][selectedDate.textContent];
                localStorage.setItem('events', JSON.stringify(events)); // Guardar los eventos en el localStorage
                selectedDate.classList.remove('hasEvent');
                hideModal(); // Ocultar el modal después de eliminar el evento
            }
        });
    }

    // Función para ocultar el modal
    function hideModal() {
        modal.style.display = 'none';
    }

    // Cerrar el modal al hacer clic en la "X"
    closeBtn.addEventListener('click', hideModal);

    // Cerrar el modal si el usuario hace clic fuera del modal
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            hideModal();
        }
    });

    function displayMonth(month, year) {
        let key = `${year}-${month}`;
        if (!events[key]) {
            events[key] = {};
        }

        let firstDayOfMonth = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let todayDate = new Date(); // Fecha actual
        let todayYear = todayDate.getFullYear();
        let todayMonth = todayDate.getMonth();
        let todayDay = todayDate.getDate();
    
        monthDisplay.textContent = `${getMonthName(month)} ${year}`;
        datesContainer.innerHTML = '';
    
        // Ajustar para mostrar días comenzando desde el lunes (0 = Domingo, 1 = Lunes, ...)
        if (firstDayOfMonth === 0) firstDayOfMonth = 7; // Si es domingo, establecerlo como 7
    
        // Añadir días vacíos al principio del mes
        for (let i = 1; i < firstDayOfMonth; i++) {
            let emptyDiv = document.createElement('div');
            emptyDiv.classList.add('date', 'empty');
            datesContainer.appendChild(emptyDiv);
        }
    
        // Añadir los días del mes
        for (let i = 1; i <= daysInMonth; i++) {
            let dateDiv = document.createElement('div');
            dateDiv.classList.add('date');
            dateDiv.textContent = i;
            datesContainer.appendChild(dateDiv);
    
            // Aplicar un estilo diferente al día de hoy
            if (year === todayYear && month === todayMonth && i === todayDay) {
                dateDiv.classList.add('today');
            }
    
            // Verificar si hay detalles de eventos para este día
            if (events[key][i]) {
                dateDiv.classList.add('hasEvent');
            }
    
            // Añadir evento de clic a cada día
            dateDiv.addEventListener('click', function() {
                selectedDate = dateDiv; // Almacenar el día seleccionado
                let eventDetails = events[key][i];
                if (eventDetails) {
                    showModal(eventDetails);
                } else {
                    let newEventDetails = prompt('Ingrese los detalles del evento para el día ' + i + ':');
                    if (newEventDetails !== null && newEventDetails.trim() !== '') {
                        dateDiv.classList.add('hasEvent');
                        events[key][i] = newEventDetails;
                        localStorage.setItem('events', JSON.stringify(events)); // Guardar los eventos en el localStorage
                    }
                }
            })
        }
    }


    function getMonthName(month) {
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return monthNames[month];
    }
});
