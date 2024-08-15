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

// Inicializador de todos los eventos
const inicializar = () => {
  inicializarfiltros();
};

window.onload = inicializar;

// VISIBILIDIDAD DE PANELES BALANCE - CATEGORIAS - EDITAR CATEGORIAS - REPORTES 
// Referencias a los elementos de las secciones
const balance = document.getElementById('vista-balance');
const categorias = document.getElementById('vista-categorias');
const reportes = document.getElementById('vista-reportes');
const editCategoria = document.getElementById('edit-categorias');
const vistaOperacion = document.getElementById('vista-operacion');

// Referencia a los botones del menú de escritorio
const mostrarBalance = document.getElementById('mostrar-balance');
const mostrarCategorias = document.getElementById('mostrar-categorias');
const mostrarReportes = document.getElementById('mostrar-reportes');
const mostrarEditar = document.getElementById('btn-editar');
const mostrarOperacion = document.getElementById('ver-operacion');
const cancelarOperacion = document.getElementById('cancelar-operacion');
const cancelarEdit = document.getElementById('cancelar-edit');

// Referencias a los botones del menú móvil
const mostrarBalanceMobile = document.getElementById('mostrar-balance-mobile');
const mostrarCategoriasMobile = document.getElementById('mostrar-categorias-mobile');
const mostrarReportesMobile = document.getElementById('mostrar-reportes-mobile');

function mostrarSeccion(section) {
  balance.classList.add('hidden');
  categorias.classList.add('hidden');
  reportes.classList.add('hidden');
  editCategoria.classList.add('hidden');
  vistaOperacion.classList.add('hidden');

  section.classList.remove('hidden');
}

// Menu escritorio eventos

mostrarBalance.addEventListener('click', function() {
  mostrarSeccion(balance);
});

mostrarCategorias.addEventListener('click', function() {
  mostrarSeccion(categorias);
});

mostrarReportes.addEventListener('click', function() {
  mostrarSeccion(reportes);
});

mostrarEditar.addEventListener('click', function(){
  mostrarSeccion(editCategoria);
});

mostrarOperacion.addEventListener('click', function(){
  mostrarSeccion(vistaOperacion);
});

// Menu movil eventos

mostrarBalanceMobile.addEventListener('click', function() {
  mostrarSeccion(balance);
});

mostrarCategoriasMobile.addEventListener('click', function() {
  mostrarSeccion(categorias);
});

mostrarReportesMobile.addEventListener('click', function() {
  mostrarSeccion(reportes);
});

// Cancelar operaciones

cancelarOperacion.addEventListener('click', function(){
  mostrarSeccion(balance);
});

cancelarEdit.addEventListener('click', function(){
  mostrarSeccion(categorias);
});


