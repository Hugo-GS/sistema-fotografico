const pageContent = document.getElementById("contenedorPrincipal");
const prefix = "/sistemaAdmin/";

document.addEventListener("DOMContentLoaded", function () {
  loadHTML();
});
window.addEventListener("hashchange", function () {
  loadHTML();
});

const subsidebarGestorfotos = document.getElementById(
  "sub_sidebar_gestor_fotos"
);
const subsidebarGestorServicio = document.getElementById(
  "sub_sidebar_gestor_servicio"
);
const subsidebarGestorCliente = document.getElementById(
  "sub_sidebar_gestor_clientes"
);

function activarDesactivarSubSidebar(documentSubsidebar, estado) {
  if (estado === "activar") {
    documentSubsidebar.classList.remove("no-active");
    documentSubsidebar.classList.add("active");
  }
  if (estado === "desactivar") {
    if (documentSubsidebar.classList.contains("active")) {
      documentSubsidebar.classList.remove("active");
      documentSubsidebar.classList.add("no-active");
    }
  }
}

function desactivarSubSidebars() {
  subsidebarGestorfotos.classList.remove("active");
  subsidebarGestorfotos.classList.add("no-active");
  subsidebarGestorServicio.classList.remove("active");
  subsidebarGestorServicio.classList.add("no-active");
  subsidebarGestorCliente.classList.remove("active");
  subsidebarGestorCliente.classList.add("no-active");
  // Remove active from all cards
  document.querySelectorAll('.card-acceso_rapido.active').forEach(card => card.classList.remove('active'));
}

function setActiveTab(subsidebar, index) {
  const cards = subsidebar.querySelectorAll('.card-acceso_rapido');
  cards.forEach(card => card.classList.remove('active'));
  if (cards[index]) {
    cards[index].classList.add('active');
    updateSlider(subsidebar);
  }
}

function updateSlider(subsidebar) {
  const active = subsidebar.querySelector('.card-acceso_rapido.active');
  if (active) {
    const rect = active.getBoundingClientRect();
    const containerRect = subsidebar.getBoundingClientRect();
    const left = rect.left - containerRect.left;
    const width = rect.width;
    subsidebar.style.setProperty('--slider-left', left + 'px');
    subsidebar.style.setProperty('--slider-width', width + 'px');
  }
}

async function loadPage(href) {
  try {
    const response = await fetch(`${prefix}/${href}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const textHTML = await response.text();
    return textHTML;
  } catch (error) {
    console.error(`Error al cargar la página: ${error}`);
    return `<p>Error al cargar la página: ${error.message}</p>`;
  }
}

async function loadHTML() {
  let hash = window.location.hash;
  if (!rutasPagina[hash]) {
    console.error(`Ruta no encontrada: ${hash}`);
    pageContent.innerHTML = `<p>Ruta no encontrada: ${hash}</p>`;
    return;
  }
  if (rutasPagina[hash].contentHTML === null) {
    rutasPagina[hash].contentHTML = await loadPage(
      rutasPagina[hash].serverRoute
    );
  }
  pageContent.innerHTML = rutasPagina[hash].contentHTML;
  rutasPagina[hash].initComponent();
}

const rutasPagina = {
  "#/PanelPrincipal": {
    contentHTML: null,
    serverRoute: "/view_panel_principal",
    initComponent: () => {
      desactivarSubSidebars();
    },
  },
  "#/GestorFotos": {
    contentHTML: null,
    serverRoute: "/view_panel_principal",
    initComponent: () => {
      desactivarSubSidebars();
      activarDesactivarSubSidebar(subsidebarGestorfotos, "activar");
    },
  },
  "#/GestorFotos/buscador_fotos": {
    contentHTML: null,
    serverRoute: "/view_buscador_fotos",
    initComponent: () => { setActiveTab(subsidebarGestorfotos, 1); initComponenteBuscadorFotos(); },
  },
  "#/GestorFotos/cargar_fotos": {
    contentHTML: null,
    serverRoute: "/view_cargar_fotos",
    initComponent: () => { setActiveTab(subsidebarGestorfotos, 0); initComponenteCargarFoto(); },
  },
  "#/GestorServicios": {
    contentHTML: null,
    serverRoute: "/view_panel_principal",
    initComponent: () => {
      desactivarSubSidebars();
      activarDesactivarSubSidebar(subsidebarGestorServicio, "activar");
    },
  },
  "#/GestorServicios/registrar_servicio_fotografico": {
    contentHTML: null,
    serverRoute: "/registrar_servicio_fotografico",
    initComponent: () => { setActiveTab(subsidebarGestorServicio, 0); },
  },
  "#/GestorServicios/registrar_servicio": {
    contentHTML: null,
    serverRoute: "/registrar_servicio",
    initComponent: () => { setActiveTab(subsidebarGestorServicio, 1); },
  },
  "#/GestorServicios/verImpresiones": {
    contentHTML: null,
    serverRoute: "/verImpresiones",
    initComponent: () => { setActiveTab(subsidebarGestorServicio, 2); },
  },
  "#/GestorClientes": {
    contentHTML: null,
    serverRoute: "/view_panel_principal",
    initComponent: () => {
      desactivarSubSidebars();
      activarDesactivarSubSidebar(subsidebarGestorCliente, "activar");
    },
  },
  "#/GestorClientes/verClientes": {
    contentHTML: null,
    serverRoute: "/verClientes",
    initComponent: () => { setActiveTab(subsidebarGestorCliente, 0); },
  },
  "#/GestorClientes/registrar_cliente": {
    contentHTML: null,
    serverRoute: "/registrar_cliente",
    initComponent: () => { setActiveTab(subsidebarGestorCliente, 1); },
  },
};

// Función para cargar cliente para edición (disponible globalmente)
window.loadEditarCliente = async function(clienteId) {
  try {
    const response = await fetch(`${prefix}editar_cliente/${clienteId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const textHTML = await response.text();
    pageContent.innerHTML = textHTML;
  } catch (error) {
    console.error(`Error al cargar el cliente para edición: ${error}`);
    pageContent.innerHTML = `<p>Error al cargar el cliente: ${error.message}</p>`;
  }
}
