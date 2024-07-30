let db;
const request = indexedDB.open("usuariosDB", 1);

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Base de datos abierta con éxito");
};

request.onerror = function(event) {
    console.log("Error al abrir la base de datos:", event.target.error);
};

function iniciarSesion(event) {
    event.preventDefault();

    if (!db) {
        alert("Base de datos no está lista");
        return;
    }

    const email = document.getElementById('emailInicio').value;
    const password = document.getElementById('passwordInicio').value;

    const transaction = db.transaction(["usuarios"], "readonly");
    const objectStore = transaction.objectStore("usuarios");
    const request = objectStore.get(email);

    request.onsuccess = function(event) {
        const usuario = event.target.result;
        if (usuario && usuario.password === password) {
            swal({
                title: "Bienvenido " + usuario.nombre,
                text: "Inicio de sesión exitoso",
                icon: "success"
            }).then(() => {
                setTimeout(function() {
                    window.location.href = "calculadora.html";
                }, 500);
            });
        } else {
            swal({
                title: "Error",
                text: "Credenciales incorrectas",
                icon: "error",
                button: "Intentar de nuevo"
            });
        }
    };

    request.onerror = function(event) {
        alert("Error al iniciar sesión:", event.target.error);
    };
}

document.getElementById('inicioSesionForm').addEventListener('submit', iniciarSesion);
