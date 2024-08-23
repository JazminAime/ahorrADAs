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


// Agregar, editar y eliminar categorias
const inputAggCategorias = document.getElementById('categoria-nombre');
const buttonAggCategorias = document.getElementById('btn-agg-categoria');
const divCategorias =  document.getElementById('container-categorias');

function agregarCategorias () {
  const nombreCategoria = inputAggCategorias.value.trim();

  if (nombreCategoria === '') {
    alert ('No puede estar vacio este campo.')
    return;
  };

  let categorias = JSON.parse(localStorage.getItem('categorias')) || [];

  if (categorias.includes(nombreCategoria)) {
    alert('La categoría ya existe.');
    return;
  }

  categorias.push(nombreCategoria);
  localStorage.setItem('categorias', JSON.stringify(categorias));
  inputAggCategorias.value = '';
  mostrarCategoria();
};

function mostrarCategoria () {
  let categorias = JSON.parse(localStorage.getItem('categorias')) || [];

  divCategorias.innerHTML = '';

    for (let i = 0; i < categorias.length; i++){
      // Crear contenedor para cada categoria
      const categoriaContainer = document.createElement('div');
      categoriaContainer.className = 'flex items-center justify-between p-2 mb-2 bg-purple-100 rounded-lg';

      // Crear elemento para cada nombre de categoria
      const categoriaElement = document.createElement('p');
      categoriaElement.className = 'text-purple-600 flex-1';
      categoriaElement.textContent = categorias[i];
      categoriaContainer.appendChild(categoriaElement);

      // Crear el contenedor para los botones
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'flex gap-2';

      // Crear boton editar
      const editButton = document.createElement('a');
      editButton.className = 'text-purple-600 hover:text-black';
      editButton.href = '#';
      editButton.textContent = 'Editar';

      editButton.addEventListener('click', function(){
        mostrarSeccion(editCategoria);
        const editarCategoriaInput = document.getElementById('editar-categoria-nombre');
        editarCategoriaInput.value = categorias[i];

        const confirmarEditar = document.getElementById('confirm-edit');
        confirmarEditar.addEventListener('click', function(){
          const nuevaCategoria = editarCategoriaInput.value;
        })
      })

      buttonContainer.appendChild(editButton);

      // Crear boton eliminar
      const deleteButton = document.createElement('a');
      deleteButton.className = 'text-purple-600 hover:text-black';
      deleteButton.href = '#';
      deleteButton.textContent = 'Eliminar';
      buttonContainer.appendChild(deleteButton);

      // Añadir contenedor de botones al contenedor principal
      categoriaContainer.appendChild(buttonContainer);

      // Añadir el contenedor al contenedor principal de las categorias
      divCategorias.appendChild(categoriaContainer)
  }
};

buttonAggCategorias.addEventListener('click', agregarCategorias)

window.onload = mostrarCategoria;