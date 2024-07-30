let db;
const request = indexedDB.open("usuariosDB", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore("usuarios", { keyPath: "email" });
    objectStore.createIndex("nombre", "nombre", { unique: false });
    objectStore.createIndex("password", "password", { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Base de datos abierta con éxito");
};

request.onerror = function(event) {
    console.log("Error al abrir la base de datos:", event.target.error);
};

function registrarUsuario(event) {
    event.preventDefault();

    if (!db) {
        alert("Base de datos no está lista");
        return;
    }

    const nombre = document.getElementById('nombreRegistro').value;
    const email = document.getElementById('emailRegistro').value;
    const password = document.getElementById('passwordRegistro').value;

    const transaction = db.transaction(["usuarios"], "readwrite");
    const objectStore = transaction.objectStore("usuarios");
    const request = objectStore.add({ nombre, email, password });

    request.onsuccess = function() {
        alert("Usuario registrado con éxito.");
        window.location.href = "iniciar.html";  
    };

    request.onerror = function(event) {
        alert("Error al registrar el usuario:", event.target.error);
    };
}

document.getElementById('registroForm').addEventListener('submit', registrarUsuario);
