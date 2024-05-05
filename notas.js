let calificaciones = [];
let porcentajes = [];

function agregarNota() {
    const divCalificaciones = document.getElementById("calificaciones");

    const nuevoCampo = document.createElement("div");
    nuevoCampo.innerHTML = `
        <label for="calificacion" >Calificación :</label>
        <input type="number" class="calificacion " step="0.1" min="0" max="5" placeholder="Ingrese su nota">
        <label for="porcentaje">Porcentaje (%):</label>
        <input type="number" class="porcentaje " step="1" min="0" max="100"  placeholder="Ingrese el porcentaje  ">
    `;

    divCalificaciones.appendChild(nuevoCampo);
}


const img1 = document.getElementById("img1");
img1.style.display = "block";
const img2 = document.getElementById("img2");
img2.style.display = "none";
const img3 = document.getElementById("img3");
img3.style.display= "none";

function calcularPromedio() {
    calificaciones = document.querySelectorAll(".calificacion");
    porcentajes = document.querySelectorAll(".porcentaje");

    let sumaPonderada = 0;
    let sumaPorcentajes = 0;

    for (let i = 0; i < calificaciones.length; i++) {
        const calificacion = parseFloat(calificaciones[i].value);
        const porcentaje = parseFloat(porcentajes[i].value);

        sumaPonderada += (calificacion * porcentaje) / 100;
        sumaPorcentajes += porcentaje;
    }

    const calificacionRestante = (3.0 - sumaPonderada) / ((100 - sumaPorcentajes) / 100);

    if (calificacionRestante <= 0) {
        document.getElementById("resultado").textContent = "¡Felicidades! Ya tienes un promedio ponderado de 3.0 o superior.";
    } else if (calificacionRestante === 5) {
        document.getElementById("resultado").textContent = "¡Ánimo! Necesitas sacar 5.0 para alcanzar un promedio ponderado de 3.0. ";
            img1.style.display = "none";
            img2.style.display = "block";
            img3.style.display = "none";
    }else {
        document.getElementById("resultado").textContent = `Para un promedio ponderado de 3.0, necesitas una calificación de al menos ${calificacionRestante.toFixed(2)}.`;
            img1.style.display = "none";
            img2.style.display = "none";
            img3.style.display = "block";
    }

}
