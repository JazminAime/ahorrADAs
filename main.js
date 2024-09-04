//Menu hamburguesa
const menuButton = document.getElementById("menu-button");
const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById("mobile-menu");

menuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");

  // Cambia el ícono entre barras y X
  if (mobileMenu.classList.contains("hidden")) {
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  } else {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  }
});

//ocultar y mostrar el panel de filtros
const filtros = document.getElementById("filtros");
const toggleFiltros = document.getElementById("toggle-filtros");

// Función para alternar la visibilidad de los filtros
function alternarFiltros() {
  if (filtros.classList.contains("hidden")) {
    toggleFiltros.innerText = "Ocultar filtros";
    filtros.classList.remove("hidden");
  } else {
    toggleFiltros.innerText = "Mostrar filtros";
    filtros.classList.add("hidden");
  }
}

toggleFiltros.addEventListener("click", function () {
  alternarFiltros(balance);
});

// VISIBILIDIDAD DE PANELES BALANCE - CATEGORIAS - EDITAR CATEGORIAS - REPORTES
// Referencias a los elementos de las secciones
const balance = document.getElementById("vista-balance");
const categoriasSec = document.getElementById("vista-categorias");
const reportes = document.getElementById("vista-reportes");
const editCategoria = document.getElementById("edit-categorias");
const vistaOperacion = document.getElementById("vista-operacion");

// Referencia a los botones del menú de escritorio
const mostrarBalance = document.getElementById("mostrar-balance");
const mostrarCategorias = document.getElementById("mostrar-categorias");
const mostrarReportes = document.getElementById("mostrar-reportes");
const mostrarEditar = document.getElementById("btn-editar");
const mostrarOperacion = document.getElementById("ver-operacion");
const cancelarOperacion = document.getElementById("cancelar-operacion");
const cancelarEdit = document.getElementById("cancelar-edit");

// Referencias a los botones del menú móvil
const mostrarBalanceMobile = document.getElementById("mostrar-balance-mobile");
const mostrarCategoriasMobile = document.getElementById(
  "mostrar-categorias-mobile"
);
const mostrarReportesMobile = document.getElementById(
  "mostrar-reportes-mobile"
);

function mostrarSeccion(section) {
  balance.classList.add("hidden");
  categoriasSec.classList.add("hidden");
  reportes.classList.add("hidden");
  editCategoria.classList.add("hidden");
  vistaOperacion.classList.add("hidden");

  section.classList.remove("hidden");
}

// Menu escritorio eventos

mostrarBalance.addEventListener("click", function () {
  mostrarSeccion(balance);
});
mostrarCategorias.addEventListener("click", function () {
  mostrarSeccion(categoriasSec);
});
mostrarReportes.addEventListener("click", function () {
  mostrarSeccion(reportes);
});
mostrarOperacion.addEventListener("click", function () {
  mostrarSeccion(vistaOperacion);
});

// Menu movil eventos

mostrarBalanceMobile.addEventListener("click", function () {
  mostrarSeccion(balance);
});
mostrarCategoriasMobile.addEventListener("click", function () {
  mostrarSeccion(categoriasSec);
});
mostrarReportesMobile.addEventListener("click", function () {
  mostrarSeccion(reportes);
});

// Cancelar operaciones

cancelarOperacion.addEventListener("click", function () {
  mostrarSeccion(balance);
});
mostrarCategoriasMobile.addEventListener("click", function () {
  mostrarSeccion(categoriasSec);
});
mostrarReportesMobile.addEventListener("click", function () {
  mostrarSeccion(reportes);
});

// Cancelar operaciones
cancelarOperacion.addEventListener("click", function () {
  mostrarSeccion(balance);
});
cancelarEdit.addEventListener("click", function () {
  mostrarSeccion(categoriasSec);
});

// Agregar, editar y eliminar categorias
const inputAggCategorias = document.getElementById("categoria-nombre");
const buttonAggCategorias = document.getElementById("btn-agg-categoria");
const divCategorias = document.getElementById("container-categorias");

function agregarCategorias() {
  const nombreCategoria = inputAggCategorias.value.trim();

  if (nombreCategoria === "") {
    alert("No puede estar vacio este campo.");
    return;
  }

  let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

  if (categorias.includes(nombreCategoria)) {
    alert("La categoría ya existe.");
    return;
  }

  categorias.push(nombreCategoria);
  localStorage.setItem("categorias", JSON.stringify(categorias));
  inputAggCategorias.value = "";
  mostrarCategoria();
}

function mostrarCategoria() {
  let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

  divCategorias.innerHTML = "";

  for (let i = 0; i < categorias.length; i++) {
    // Crear contenedor para cada categoria
    const categoriaContainer = document.createElement("div");
    categoriaContainer.className =
      "flex items-center justify-between p-2 mb-2 bg-purple-100 rounded-lg";

    // Crear elemento para cada nombre de categoria
    const categoriaElement = document.createElement("p");
    categoriaElement.className = "text-purple-600 flex-1";
    categoriaElement.textContent = categorias[i];
    categoriaContainer.appendChild(categoriaElement);

    // Crear el contenedor para los botones
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "flex gap-2";

    // Crear boton editar
    const editButton = document.createElement("a");
    editButton.className = "text-purple-600 hover:text-black";
    editButton.href = "#";
    editButton.textContent = "Editar";

    editButton.addEventListener("click", function () {
      mostrarSeccion(editCategoria);
      const nombreCategoriaExistente = categorias[i];
      const editarCategoriaInput = document.getElementById(
        "editar-categoria-nombre"
      );
      editarCategoriaInput.value = nombreCategoriaExistente;

      const confirmarEditar = document.getElementById("confirm-edit");
      confirmarEditar.addEventListener("click", function () {
        const nuevoNombre = editarCategoriaInput.value;

        if (nuevoNombre !== "") {
          categorias[i] = nuevoNombre;
          localStorage.setItem("categorias", JSON.stringify(categorias));
          mostrarCategoria();
          mostrarSeccion(categoriasSec);
        }
      });
    });

    buttonContainer.appendChild(editButton);

    // Crear boton eliminar
    const deleteButton = document.createElement("a");
    deleteButton.className = "text-purple-600 hover:text-black";
    deleteButton.href = "#";
    deleteButton.textContent = "Eliminar";
    buttonContainer.appendChild(deleteButton);

    deleteButton.addEventListener("click", function () {
      categorias.splice(i, 1);
      localStorage.setItem("categorias", JSON.stringify(categorias));
      mostrarCategoria();
    });

    // Añadir contenedor de botones al contenedor principal
    categoriaContainer.appendChild(buttonContainer);

    // Añadir el contenedor al contenedor principal de las categorias
    divCategorias.appendChild(categoriaContainer);
  }

  const selectCategoria = document.getElementById("select-categoria");
  const optionOperacion = document.getElementById("select-categoria-operacion");

  selectCategoria.innerHTML = "";
  optionOperacion.innerHTML = "";

  for (let i = 0; i < categorias.length; i++) {
    const option1 = document.createElement("option");
    option1.textContent = categorias[i];
    selectCategoria.appendChild(option1);

    const option2 = document.createElement("option");
    option2.textContent = categorias[i];
    optionOperacion.appendChild(option2);
  }
}

buttonAggCategorias.addEventListener("click", agregarCategorias);

window.onload = mostrarCategoria;
