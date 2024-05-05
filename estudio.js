document.getElementById('countdown-input').addEventListener('input', function () {
    var countdownDisplay = document.querySelector('.contador');
    countdownDisplay.textContent = this.value;
});

document.querySelector('.contador').addEventListener('click', function () {
    var countdownTime = parseInt(this.textContent);
    var countdownInterval = setInterval(function () {
        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            this.textContent = "¡TIEMPO AGOTADO!";
        } else {
            this.textContent = countdownTime;
            countdownTime--;
        }
    }.bind(this), 1000);
});

var alarma = new Audio('../assets/audio/alarma_2.mp3');

function actualizarContador() {
    var contador = document.querySelector('.contador');
    var tiempoRestante = parseInt(contador.textContent);

    if (tiempoRestante > 0) {
        tiempoRestante--;
        contador.textContent = tiempoRestante;
    } else {
        alarma.play();
    }
}

function activarContador() {

    var contenedorTitulos = document.querySelector('.contenedor__titulo');

    document.body.style.backgroundColor = "#222831";

    setInterval(actualizarContador, 1000); // Llama a la función 'actualizarContador' cada 1000 milisegundos (1 segundo)
}
