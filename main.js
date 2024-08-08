//Menu hamburguesa
const menuButton = document.getElementById('menu-button');
const menuIcon = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');

    // Cambia el ícono entre barras y X
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    } else {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    }
});


//---------- DOM-----------------------------------
$ = (selector) => document.querySelector(selector)
$$ = (selector) => document.querySelectorAll(selector)
//------------------------------------------------------


// Mostrar y ocultar filtros
const alternarFiltros = () => {
  const toggle = $('#toggle-filtros');
  const filtros = $('#filtros');

  if (filtros.classList.contains('hidden')) {
      toggle.innerText = 'Ocultar filtros';
      filtros.classList.remove('hidden');
  } else {
      toggle.innerText = 'Mostrar filtros';
      filtros.classList.add('hidden');
  }
};

// Inicializador 
const inicializarfiltros = () => {
  $('#toggle-filtros').addEventListener('click', alternarFiltros);
};

// Muestra y oculta los paneles
const mostrarVista = (nombre) => {
  const vistas = $$('.vista')

  for (let vista of vistas) {
    vista.classList.add('hidden')
  }

  $(`#vista-${nombre}`).classList.remove('hidden')
}

// Inicializador vistas
const inicializarVistas = () => {
  $('#ver-operacion').addEventListener('click', () => mostrarVista('operacion'));
  $('#cancelar-operacion').addEventListener('click', () => mostrarVista('balance'))

  $('#mostrar-balance').addEventListener('click', () => mostrarVista('balance'))
};

// Inicializador de todos los eventos
const inicializar = () => {
  inicializarfiltros();
  inicializarVistas()
};

window.onload = inicializar;