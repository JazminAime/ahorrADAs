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
  alternarFiltros();
});

// VISIBILIDIDAD DE PANELES BALANCE - CATEGORIAS - EDITAR CATEGORIAS - REPORTES
// Referencias a los elementos de las secciones
const balance = document.getElementById("vista-balance");
const categoriasSec = document.getElementById("vista-categorias");
const reportes = document.getElementById("vista-reportes");
const editCategoria = document.getElementById("edit-categorias");
const vistaOperacion = document.getElementById("vista-operacion");
const editOperacion = document.getElementById("editar-operacion");

// Referencia a los botones del menú de escritorio
const mostrarBalance = document.getElementById("mostrar-balance");
const mostrarCategorias = document.getElementById("mostrar-categorias");
const mostrarReportes = document.getElementById("mostrar-reportes");
const mostrarEditar = document.getElementById("btn-editar");
const mostrarOperacion = document.getElementById("ver-operacion");
const cancelarOperacion = document.getElementById("cancelar-operacion");
const cancelarEdit = document.getElementById("cancelar-edit");
const cancelarEditOperacion = document.getElementById("cancelar-edit-op");

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
  editOperacion.classList.add("hidden");

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
cancelarEdit.addEventListener("click", function () {
  mostrarSeccion(categoriasSec);
});
cancelarEditOperacion.addEventListener("click", function () {
  mostrarSeccion(balance);
});
/* ----------------------------- CATEGORIAS --------------------------------- */

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

          // Actualizar las categorías en las operaciones
          let operaciones =
            JSON.parse(localStorage.getItem("operaciones")) || [];
          operaciones = operaciones.map((op) => {
            if (op.categoriaOperacion === nombreCategoriaExistente) {
              op.categoriaOperacion = nuevoNombre;
            }
            return op;
          });
          localStorage.setItem("operaciones", JSON.stringify(operaciones));

          mostrarCategoria();
          mostrarSeccion(categoriasSec);
          generarReporte();
          mostrarOperaciones();
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
      const categoriaAEliminar = categorias[i];

      // Mostrar ventana de confirmación
      const confirmacion = confirm(
        `¿Estás seguro de que quieres eliminar la categoría "${categoriaAEliminar}"?`
      );

      if (confirmacion) {
        // Eliminar la categoría
        categorias = categorias.filter(
          (categoria) => categoria !== categoriaAEliminar
        );
        localStorage.setItem("categorias", JSON.stringify(categorias));

        // Eliminar las operaciones relacionadas
        let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];
        operaciones = operaciones.filter(
          (operacion) => operacion.categoriaOperacion !== categoriaAEliminar
        );
        localStorage.setItem("operaciones", JSON.stringify(operaciones));

        mostrarOperaciones();
        mostrarCategoria();
      }
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

  // Añadir la opción TODAS al principio
  const optionTodas = document.createElement("option");
  optionTodas.textContent = "Todas";
  optionTodas.value = "TODAS";
  selectCategoria.appendChild(optionTodas);

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

/* ----------------------------------  OPERACIONES  --------------------------------- */

// Agregar, editar y eliminar operaciones
function agregarOperacion() {
  const idOperacion = `op-${new Date().getTime()}`; // Generar un ID único basado en la fecha y hora actuales
  const descripcionOperacion = document.getElementById(
    "descripcion-operacion"
  ).value;
  const categoriaOperacion = document.getElementById(
    "select-categoria-operacion"
  ).value;
  const fechaOperacion = document.getElementById("fecha-operacion").value;
  const montoOperacion = parseFloat(
    document.getElementById("monto-operacion").value
  ); // Convertir a número florante (valor monetario)
  const tipoOperacion = document.getElementById("tipo-operacion").value;

  const operacion = {
    id: idOperacion, // Asignar el ID único
    descripcionOperacion,
    categoriaOperacion,
    fechaOperacion,
    montoOperacion,
    tipoOperacion,
  };

  let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

  operaciones.push(operacion);

  localStorage.setItem("operaciones", JSON.stringify(operaciones));

  mostrarOperaciones();

  // Limpiar campos
  document.getElementById("descripcion-operacion").value = "";
  document.getElementById("monto-operacion").value = "";
  document.getElementById("tipo-operacion").value = "";
  document.getElementById("categoria-operacion").value = "";
  document.getElementById("fecha-operacion").value = "";
}

const obtenerOperacion = (idOperacion, operaciones) => {
  return operaciones.find((operacion) => operacion.id === idOperacion);
};

function mostrarOperaciones(operaciones = null) {
  const sinOperaciones = document.getElementById("sin-operaciones");
  const imgOperacion = document.getElementById("img-operacion");
  const contenedorOperaciones = document.getElementById(
    "operaciones-agg-contenedor"
  );

  if (operaciones === null) {
    operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];
  }

  contenedorOperaciones.innerHTML = "";

  if (operaciones.length > 0) {
    imgOperacion.style.display = "none";
    sinOperaciones.style.display = "none";

    // Contenedor de la tabla de operaciones
    const tablaOperaciones = document.createElement("div");
    tablaOperaciones.className = "w-full flex flex-col mb-4";

    // Crear fila de títulos
    const filaTitulos = document.createElement("div");
    filaTitulos.className =
      "md:flex hidden text-center bg-purple-500 text-white p-2 font-semibold shadow-md rounded-md";

    const titulos = ["Descripción", "Categoría", "Fecha", "Monto", "Acciones"];
    titulos.forEach((titulo) => {
      const tituloElemento = document.createElement("div");
      tituloElemento.className = "text-center flex-none basis-1/5 px-1 py-1";
      tituloElemento.textContent = titulo;
      filaTitulos.appendChild(tituloElemento);
    });
    tablaOperaciones.appendChild(filaTitulos);

    // Crear filas de operaciones
    operaciones.forEach((operacion, index) => {
      const filaOperacion = document.createElement("div");
      filaOperacion.className = "md:flex p-2 border-b";

      // Agregar las celdas de la descripción, categoría, fecha y monto
      const campos = [
        "descripcionOperacion",
        "categoriaOperacion",
        "fechaOperacion",
        "montoOperacion",
      ];
      campos.forEach((campo) => {
        const celda = document.createElement("div");
        celda.className = "text-center flex-none basis-1/5 px-1 py-1";

        // Asignar clases adicionales dependiendo del campo
        if (campo === "categoriaOperacion") {
          celda.textContent = operacion[campo];
          celda.classList.add(
            "text-sm",
            "italic",
            "w-auto",
            "text-center",
            "font-medium",
            "text-purple-600"
          );
        } else if (campo === "fechaOperacion") {
          celda.textContent = operacion[campo];
          celda.classList.add("text-sm", "text-gray-500", "hidden", "md:flex");
        } else if (campo === "montoOperacion") {
          let montoConSigno = `$${operacion.montoOperacion}`;
          if (operacion.tipoOperacion === "GASTO") {
            montoConSigno = `-$${operacion.montoOperacion}`;
            celda.classList.add("text-red-600", "font-bold");
          } else if (operacion.tipoOperacion === "GANANCIA") {
            montoConSigno = `+$${operacion.montoOperacion}`;
            celda.classList.add("text-green-600", "font-bold");
          }
          celda.textContent = montoConSigno;
        } else {
          celda.textContent = operacion[campo];
        }
        filaOperacion.appendChild(celda);
      });

      // Crear contenedor de acciones
      const acciones = document.createElement("div");
      acciones.className = "ml-2 flex gap-2 justify-center";

      // Botón de editar
      const botonEditar = document.createElement("button");
      botonEditar.textContent = "Editar";
      botonEditar.className = "text-blue-500 hover:underline text-xs";
      botonEditar.addEventListener("click", function () {
        mostrarSeccion(editOperacion);

        document.getElementById("descripcion-edit-op").value =
          operacion.descripcionOperacion;
        document.getElementById("monto-edit-op").value =
          operacion.montoOperacion;
        document.getElementById("tipo-edit-op").value = operacion.tipoOperacion;

        const selectCatOp = document.getElementById("select-categoria-edit");
        selectCatOp.innerHTML = "";

        let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
        categorias.forEach((categoria) => {
          const optionEdit = document.createElement("option");
          optionEdit.textContent = categoria;
          selectCatOp.appendChild(optionEdit);
        });

        selectCatOp.value = operacion.categoriaOperacion;

        document.getElementById("fecha-edit-op").value =
          operacion.fechaOperacion;

        // Modificar valores
        const confirmarEditarOperacion =
          document.getElementById("editar-op-btn");

        confirmarEditarOperacion.addEventListener("click", function () {
          const nuevaDescripcion = document.getElementById(
            "descripcion-edit-op"
          ).value;
          const nuevoMonto = parseFloat(
            document.getElementById("monto-edit-op").value
          );
          const nuevoTipo = document.getElementById("tipo-edit-op").value;
          const nuevaCategoria = document.getElementById(
            "select-categoria-edit"
          ).value;
          const nuevaFecha = document.getElementById("fecha-edit-op").value;

          operaciones[index] = {
            descripcionOperacion: nuevaDescripcion,
            montoOperacion: nuevoMonto,
            tipoOperacion: nuevoTipo,
            categoriaOperacion: nuevaCategoria,
            fechaOperacion: nuevaFecha,
          };

          localStorage.setItem("operaciones", JSON.stringify(operaciones));
          mostrarOperaciones();
          mostrarSeccion(balance);
          generarReporte();
        });
      });

      // Botón de eliminar
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.className = "text-red-500 hover:underline text-xs";
      botonEliminar.addEventListener("click", function () {
        // Obtener la descripción y la categoría de la operación
        const descripcionOperacion = operaciones[index].descripcionOperacion;
        const categoriaOperacion = operaciones[index].categoriaOperacion;

        // Mostrar mensaje de confirmación con la descripción y la categoría
        const confirmar = confirm(
          `¿Estás seguro de que quieres eliminar la operación?\n\nDescripción: ${descripcionOperacion}\nCategoría: ${categoriaOperacion}`
        );

        if (confirmar) {
          // Si el usuario confirma, eliminar la operación
          operaciones.splice(index, 1);
          localStorage.setItem("operaciones", JSON.stringify(operaciones));
          mostrarOperaciones();
          generarReporte();
          actualizarResumen(operaciones);
        }
      });

      acciones.appendChild(botonEditar);
      acciones.appendChild(botonEliminar);

      // Añadir las acciones al final de la fila
      filaOperacion.appendChild(acciones);
      tablaOperaciones.appendChild(filaOperacion);
    });

    contenedorOperaciones.appendChild(tablaOperaciones);
    mostrarSeccion(balance);

    actualizarResumen(operaciones);
  } else {
    imgOperacion.style.display = "block";
    sinOperaciones.style.display = "block";
  }
}

const btnAggOperacion = document
  .getElementById("agregar-operacion")
  .addEventListener("click", agregarOperacion);

window.onload = mostrarOperaciones;
window.onload = mostrarCategoria;

// Función para aplicar filtros solo si hay filtros aplicados
function aplicarFiltros() {
  const tipoFiltro = document.getElementById("filtro-tipo").value;
  const categoriaFiltro = document.getElementById("select-categoria").value;
  const fechaDesde = document.getElementById("filtro-desde").value;
  const ordenarPor = document.getElementById("filtro-orden").value;

  let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

  // Comprobar si hay filtros aplicados
  const hayFiltrosAplicados =
    tipoFiltro !== "TODOS" || categoriaFiltro || fechaDesde || ordenarPor;

  if (hayFiltrosAplicados) {
    // Filtrar por tipo
    if (tipoFiltro !== "TODOS") {
      operaciones = operaciones.filter((op) => op.tipoOperacion === tipoFiltro);
    }

    // Filtrar por categoría
    if (categoriaFiltro && categoriaFiltro !== "TODAS") {
      operaciones = operaciones.filter(
        (op) => op.categoriaOperacion === categoriaFiltro
      );
    }

    // Filtrar por fecha
    if (fechaDesde) {
      const fechaDesdeDate = new Date(fechaDesde);
      operaciones = operaciones.filter(
        (op) => new Date(op.fechaOperacion) >= fechaDesdeDate
      );
    }

    // Ordenar
    switch (ordenarPor) {
      case "MAS_RECIENTES":
        operaciones.sort(
          (a, b) => new Date(b.fechaOperacion) - new Date(a.fechaOperacion)
        );
        break;
      case "MENOS_RECIENTES":
        operaciones.sort(
          (a, b) => new Date(a.fechaOperacion) - new Date(b.fechaOperacion)
        );
        break;
      case "MAYOR_MONTO":
        operaciones.sort((a, b) => b.montoOperacion - a.montoOperacion);
        break;
      case "MENOR_MONTO":
        operaciones.sort((a, b) => a.montoOperacion - b.montoOperacion);
        break;
      case "A/Z":
        operaciones.sort((a, b) =>
          a.descripcionOperacion.localeCompare(b.descripcionOperacion)
        );
        break;
      case "Z/A":
        operaciones.sort((a, b) =>
          b.descripcionOperacion.localeCompare(a.descripcionOperacion)
        );
        break;
      default:
        break;
    }

    mostrarOperaciones(operaciones);
  } else {
    mostrarOperacion();
  }
}

// Inicializar filtros al cargar la página
window.onload = function () {
  mostrarCategoria(); // Cargar categorías al iniciar

  // Obtener operaciones del localStorage
  const operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

  // Verificar si hay operaciones almacenadas y mostrarlas
  if (operaciones.length > 0) {
    mostrarOperaciones(operaciones);
  } else {
    // Mostrar pantalla de "sin operaciones" si no hay ninguna
    document.getElementById("sin-operaciones").style.display = "block";
    document.getElementById("img-operacion").style.display = "block";
  }
};

// Eventos de cambio en los filtros para aplicar la función
document
  .getElementById("filtro-tipo")
  .addEventListener("change", aplicarFiltros);
document
  .getElementById("select-categoria")
  .addEventListener("change", aplicarFiltros);
document
  .getElementById("filtro-desde")
  .addEventListener("change", aplicarFiltros);
document
  .getElementById("filtro-orden")
  .addEventListener("change", aplicarFiltros);

// -------------------------------  BALANCE   -------------------------------------------------
function actualizarResumen(operaciones) {
  let totalGanancias = 0;
  let totalGastos = 0;

  operaciones.forEach((operacion) => {
    if (operacion.tipoOperacion === "GANANCIA") {
      totalGanancias += operacion.montoOperacion;
    } else if (operacion.tipoOperacion === "GASTO") {
      totalGastos += operacion.montoOperacion;
    }
  });

  const total = totalGanancias - totalGastos;

  document.getElementById("total-ganancias").textContent = `$${totalGanancias}`;
  document.getElementById("total-gastos").textContent = `$${totalGastos}`;

  const totalGeneral = document.getElementById("total-general");

  let totalSigno;
  let totalColor;

  if (total > 0) {
    totalSigno = `+${total}`;
    totalColor = "text-green-600";
  } else if (total < 0) {
    totalSigno = `${total}`;
    totalColor = "text-red-600";
  } else {
    totalSigno = `${total}`;
    totalColor = "text-gray-600";
  }

  totalGeneral.textContent = `$${totalSigno}`;
  totalGeneral.className = `text-xl font-bold ${totalColor}`;
}

//----------------------------------  REPORTES --------------------------------------------------

function generarReporte() {
  const operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];
  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

  const sinReportes = document.getElementById("sin-reportes");
  const contenedorReporte = document.getElementById("contenedor-reporte");

  // Si no hay operaciones, muestra el mensaje de "Operaciones insuficientes"
  if (operaciones.length === 0) {
    sinReportes.classList.remove("hidden");
    contenedorReporte.innerHTML = "";
    return;
  } else {
    sinReportes.classList.add("hidden");
  }

  let resumen = {
    categoriaMayorGanancia: { nombre: "", ganancia: 0 },
    categoriaMayorGasto: { nombre: "", gasto: 0 },
    categoriaMayorBalance: { nombre: "", balance: 0 },
    mesMayorGanancia: { nombre: "", ganancia: 0 },
    mesMayorGasto: { nombre: "", gasto: 0 },
  };

  const totalesPorCategoria = {};
  const totalesPorMes = {};

  // Inicializar los objetos para los totales por categoría y mes
  categorias.forEach((categoria) => {
    totalesPorCategoria[categoria] = { ganancia: 0, gasto: 0, balance: 0 };
  });

  operaciones.forEach((operacion) => {
    const {
      categoriaOperacion,
      fechaOperacion,
      montoOperacion,
      tipoOperacion,
    } = operacion;
    const [anio, mes] = fechaOperacion.split("-");

    if (!totalesPorMes[`${anio}-${mes}`]) {
      totalesPorMes[`${anio}-${mes}`] = { ganancia: 0, gasto: 0, balance: 0 };
    }

    if (tipoOperacion === "GANANCIA") {
      totalesPorCategoria[categoriaOperacion].ganancia += montoOperacion;
      totalesPorMes[`${anio}-${mes}`].ganancia += montoOperacion;
    } else if (tipoOperacion === "GASTO") {
      totalesPorCategoria[categoriaOperacion].gasto += montoOperacion;
      totalesPorMes[`${anio}-${mes}`].gasto += montoOperacion;
    }

    totalesPorCategoria[categoriaOperacion].balance =
      totalesPorCategoria[categoriaOperacion].ganancia -
      totalesPorCategoria[categoriaOperacion].gasto;

    totalesPorMes[`${anio}-${mes}`].balance =
      totalesPorMes[`${anio}-${mes}`].ganancia -
      totalesPorMes[`${anio}-${mes}`].gasto;
  });

  // Calcular los máximos para el resumen
  Object.entries(totalesPorCategoria).forEach(([categoria, totales]) => {
    if (totales.ganancia > resumen.categoriaMayorGanancia.ganancia) {
      resumen.categoriaMayorGanancia = {
        nombre: categoria,
        ganancia: totales.ganancia,
      };
    }
    if (totales.gasto > resumen.categoriaMayorGasto.gasto) {
      resumen.categoriaMayorGasto = { nombre: categoria, gasto: totales.gasto };
    }
    if (totales.balance > resumen.categoriaMayorBalance.balance) {
      resumen.categoriaMayorBalance = {
        nombre: categoria,
        balance: totales.balance,
      };
    }
  });

  Object.entries(totalesPorMes).forEach(([mes, totales]) => {
    if (totales.ganancia > resumen.mesMayorGanancia.ganancia) {
      resumen.mesMayorGanancia = { nombre: mes, ganancia: totales.ganancia };
    }
    if (totales.gasto > resumen.mesMayorGasto.gasto) {
      resumen.mesMayorGasto = { nombre: mes, gasto: totales.gasto };
    }
  });

  mostrarReporte(resumen, totalesPorCategoria, totalesPorMes);
}

function mostrarReporte(resumen, totalesPorCategoria, totalesPorMes) {
  const contenedorReporte = document.getElementById("contenedor-reporte");
  contenedorReporte.innerHTML = "";

  const resumenHtml = `
  <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-md mb-8 mt-6">
      <h3 class="text-xl font-semibold mb-4">Resumen</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
          <p class="font-semibold">Categoría con mayor ganancia</p>
          <div class="border-b border-gray-300 md:border-b-0 flex items-center justify-between space-x-2">
              <span class="italic w-auto text-center font-medium text-purple-600">${
                resumen.categoriaMayorGanancia.nombre
              }</span>
              <span class="text-green-600 font-bold ml-4">+$${
                resumen.categoriaMayorGanancia.ganancia
              }</span>
          </div>
          <p class="font-semibold">Categoría con mayor gasto</p>
          <div class="border-b border-gray-300 md:border-b-0 flex items-center justify-between space-x-2">
              <span class="italic w-auto text-center font-medium text-purple-600">${
                resumen.categoriaMayorGasto.nombre
              }</span>
              <span class="text-red-600 font-bold ml-4">-$${
                resumen.categoriaMayorGasto.gasto
              }</span>
          </div>
          <p class="font-semibold">Categoría con mayor balance</p>
          <div class="border-b border-gray-300 md:border-b-0 flex items-center justify-between space-x-2">
              <span class="italic w-auto text-center font-medium text-purple-600">${
                resumen.categoriaMayorBalance.nombre
              }</span>
              <span class="font-bold ml-4">$${
                resumen.categoriaMayorBalance.balance
              }</span>
          </div>
          <p class="font-semibold">Mes con mayor ganancia</p>
          <div class="border-b border-gray-300 md:border-b-0 flex items-center justify-between space-x-2">
              <span class="text-gray-500">${getMesAnio(
                resumen.mesMayorGanancia.nombre
              )}</span>
              <span class="text-green-600 font-bold ml-4">+$${
                resumen.mesMayorGanancia.ganancia
              }</span>
          </div>
          <p class="font-semibold">Mes con mayor gasto</p>
          <div class="border-b border-gray-300 md:border-b-0 flex items-center justify-between space-x-2">
              <span class="text-gray-500">${getMesAnio(
                resumen.mesMayorGasto.nombre
              )}</span>
              <span class="text-red-600 font-bold ml-4">-$${
                resumen.mesMayorGasto.gasto
              }</span>
          </div>
      </div>
  </div>
  `;
  // Filtrar las categorías que tienen operaciones (ganancias o gastos)
  const categoriasConOperaciones = Object.keys(totalesPorCategoria).filter(
    (categoria) =>
      totalesPorCategoria[categoria].ganancia > 0 ||
      totalesPorCategoria[categoria].gasto > 0
  );

  let totalesCategoriaHtml = `
  <h3 class="text-xl font-semibold mb-4">Totales por categorías</h3>
  <div class="overflow-x-auto mb-8">
      <table class="min-w-full border border-gray-200">
          <thead>
              <tr class="bg-purple-500 text-white">
                  <th class="border px-4 py-2 text-left">Categoría</th>
                  <th class="border px-4 py-2 text-left">Ganancias</th>
                  <th class="border px-4 py-2 text-left">Gastos</th>
                  <th class="border px-4 py-2 text-left">Balance</th>
              </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
  `;

  // Mostrar solo las categorías filtradas
  categoriasConOperaciones.forEach((categoria) => {
    const totales = totalesPorCategoria[categoria];
    totalesCategoriaHtml += `
      <tr>
          <td class="border px-4 py-2">${categoria}</td>
          <td class="border px-4 py-2 text-green-600">+$${totales.ganancia}</td>
          <td class="border px-4 py-2 text-red-600">-$${totales.gasto}</td>
          <td class="border px-4 py-2">${
            totales.balance >= 0
              ? "$" + totales.balance
              : "-$" + Math.abs(totales.balance)
          }</td>
      </tr>
    `;
  });

  totalesCategoriaHtml += `
          </tbody>
      </table>
  </div>
  `;

  let totalesMesHtml = `
  <h3 class="text-xl font-semibold mb-4">Totales por mes</h3>
  <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200">
          <thead>
              <tr class="bg-purple-500 text-white">
                  <th class="border px-4 py-2 text-left">Mes</th>
                  <th class="border px-4 py-2 text-left">Ganancias</th>
                  <th class="border px-4 py-2 text-left">Gastos</th>
                  <th class="border px-4 py-2 text-left">Balance</th>
              </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
  `;

  Object.entries(totalesPorMes).forEach(([mes, totales]) => {
    const mesAnio = getMesAnio(mes);

    totalesMesHtml += `
      <tr>
          <td class="border px-4 py-2">${mesAnio}</td>
          <td class="border px-4 py-2 text-green-600">+$${totales.ganancia}</td>
          <td class="border px-4 py-2 text-red-600">-$${totales.gasto}</td>
          <td class="border px-4 py-2">${
            totales.balance >= 0
              ? "$" + totales.balance
              : "-$" + Math.abs(totales.balance)
          }</td>
      </tr>
      `;
  });

  totalesMesHtml += `
          </tbody>
      </table>
  </div>
  `;

  contenedorReporte.innerHTML =
    resumenHtml + totalesCategoriaHtml + totalesMesHtml;
}

function getMesAnio(mes) {
  const [anio, mesNum] = mes.split("-");
  const mesNombre = new Date(anio, mesNum - 1).toLocaleString("es-ES", {
    month: "long",
  });
  return `${mesNombre} ${anio}`;
}

document.addEventListener("DOMContentLoaded", generarReporte);
