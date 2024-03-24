document.addEventListener('DOMContentLoaded', function () {
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const monthDisplay = document.querySelector('.month');
    const datesContainer = document.getElementById('datesContainer');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

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

    function displayMonth(month, year) {
        let firstDayOfMonth = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();

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
        }
    }

    function getMonthName(month) {
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return monthNames[month];
    }
});
