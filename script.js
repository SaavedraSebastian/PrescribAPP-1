$(document).ready(function() {

  $('#hero-slider').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    items: 1,
    dots: false,
    smartSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {

      },
      600: {

      },
      1000: {

      }
    }
  })
});

document.addEventListener('DOMContentLoaded', function() {

  var heading = document.querySelector('.slider1 h1');

  setTimeout(function() {
    heading.classList.add('show');
  }, 700);
});
function updateProgressBar() {
  const { scrollTop, scrollHeight } = document.documentElement;
  const windowHeight = window.innerHeight;
  const scrollPercentage = (scrollTop / (scrollHeight - windowHeight)) * 100;
  document.getElementById('progressBar').style.width = scrollPercentage + '%';
}

window.addEventListener('scroll', updateProgressBar);
  document.addEventListener("DOMContentLoaded", function() {
    var textNosotros = document.querySelector(".text-nosotros p");

    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
    }

    function animateIfVisible() {
      if (isElementInViewport(textNosotros)) {
        textNosotros.classList.add("animate");
      }
    }

    animateIfVisible();

    window.addEventListener("scroll", function() {
      animateIfVisible();
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');


    function realizarBusqueda() {
      const searchTerm = searchInput.value.trim();
      
    }


    searchButton.addEventListener('click', function(event) {
      event.preventDefault();
      realizarBusqueda();
    });


    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        realizarBusqueda();
      }
    });
  });
document.addEventListener("DOMContentLoaded", function() {
  
    window.addEventListener("load", function() {
        var preloader = document.querySelector(".preloader");
        preloader.style.display = "none";
    });
});
AOS.init({
  duration: 1200,
})
document.addEventListener('DOMContentLoaded', function() {
  const searchWrapper = document.querySelector('.search-wrapper');
  const searchButton = document.getElementById('searchButton');

  searchButton.addEventListener('click', function() {
    if (!searchWrapper.classList.contains('active')) {
      searchWrapper.classList.add('active');
      document.getElementById('searchInput').focus();
    } else {
      
    }
  });

  document.addEventListener('click', function(event) {
    if (!searchWrapper.contains(event.target)) {
      searchWrapper.classList.remove('active');
    }
  });
});
const stripe = Stripe('pk_test_51Pgg93ECKNBXbUNueg5Fe5gErgd2tcwYN4AW8PNpEyya56IcoAPWL8CPfgK2z7p2dyRu7tvJqWVHdieXTDCzPENG00PCzQeltJ');

document.getElementById('subscribe-button').addEventListener('click', async () => {
    const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
        alert(result.error.message);
    }
});
// script.js

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
};

request.onerror = function(event) {
    console.log("Error al abrir la base de datos:", event.target.error);
};

// Función para registrar usuarios
function registrarUsuario(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombreRegistro').value;
    const email = document.getElementById('emailRegistro').value;
    const password = document.getElementById('passwordRegistro').value;

    const transaction = db.transaction(["usuarios"], "readwrite");
    const objectStore = transaction.objectStore("usuarios");
    const request = objectStore.add({ nombre, email, password });

    request.onsuccess = function() {
        alert("Usuario registrado con éxito.");
    };

    request.onerror = function(event) {
        alert("Error al registrar el usuario:", event.target.error);
    };
}

