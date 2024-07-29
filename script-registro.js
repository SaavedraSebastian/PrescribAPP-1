import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

document.getElementById('registroForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const nombre = document.getElementById('nombreRegistro').value;
  const email = document.getElementById('emailRegistro').value;
  const password = document.getElementById('passwordRegistro').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'usuarios', user.uid), {
      nombre: nombre,
      email: email
    });

    alert('Usuario registrado con éxito.');
    window.location.href = 'iniciar.html';
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    alert('Error al registrar el usuario: ' + error.message);
  }
});
