function iniciarSesion() {
    const emailLogin = document.getElementById("emailLogin").value;
    const contrasenaLogin = document.getElementById("contrasenaLogin").value;

    // Obtener los usuarios almacenados en el almacenamiento local
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar si el usuario existe
    const usuarioEncontrado = usuarios.find(user => user.email === emailLogin && user.contrasena === contrasenaLogin);

    if (usuarioEncontrado) {
        alert("¡Bienvenido de nuevo, " + usuarioEncontrado.nombre + "!");
    } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
}
