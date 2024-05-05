function registrar() {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;

    // Obtener los usuarios almacenados en el almacenamiento local
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Agregar el nuevo usuario
    usuarios.push({ nombre, email, contrasena });

    // Guardar los usuarios actualizados en el almacenamiento local
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Opcional: mostrar un mensaje de éxito al usuario
    alert("¡Registro exitoso!");
}
