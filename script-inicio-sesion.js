let db;
const request = indexedDB.open("usuariosDB", 1);

request.onsuccess = function(event) {
    db = event.target.result;
};

request.onerror = function(event) {
    console.log("Error al abrir la base de datos:", event.target.error);
};

function iniciarSesion(event) {
    event.preventDefault();
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
              title: "Good job!",
              text: "You clicked the button!",
              icon: "error",
              button: "Aww yiss!",
            });
        }
    };

    request.onerror = function(event) {
        alert("Error al iniciar sesión:", event.target.error);
    };
}

document.getElementById('inicioSesionForm').addEventListener('submit', iniciarSesion);

