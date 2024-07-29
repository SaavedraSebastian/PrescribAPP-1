import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

document.getElementById('inicioSesionForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const email = document.getElementById('emailInicio').value;
  const password = document.getElementById('passwordInicio').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = doc(db, 'usuarios', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const usuario = docSnap.data();
      swal({
        title: 'Bienvenido ' + usuario.nombre,
        text: 'Inicio de sesión exitoso',
        icon: 'success'
      }).then(() => {
        setTimeout(() => {
          window.location.href = 'calculadora.html';
        }, 500);
      });
    } else {
      console.error('No se encontró el usuario en Firestore.');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    swal({
      title: 'Error',
      text: error.message,
      icon: 'error',
      button: 'Ok'
    });
  }
});
