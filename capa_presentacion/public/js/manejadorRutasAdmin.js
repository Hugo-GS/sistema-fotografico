const pageContent = document.getElementById("contenedorPrincipal");
const prefix = "/sistemaAdmin/";

document.addEventListener("DOMContentLoaded", function () {
  loadHTML();
});
window.addEventListener("hashchange", function () {
  loadHTML();
});

const subsidebarGestorfotos = document.getElementById("sub_sidebar_gestor_fotos");
const subsidebarGestorServicio = document.getElementById("sub_sidebar_gestor_servicio");
const subsidebarGestorCliente = document.getElementById("sub_sidebar_gestor_clientes");


function activarDesactivarSubSidebar(documentSubsidebar, estado) {
  if(estado==="activar"){
    documentSubsidebar.classList.remove("no-active");
    documentSubsidebar.classList.add("active");
  }
  if(estado==="desactivar"){
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
  if (rutasPagina[hash].contentHTML === null) {
    rutasPagina[hash].contentHTML = await loadPage(rutasPagina[hash].serverRoute);
  }
  pageContent.innerHTML = rutasPagina[hash].contentHTML;
  rutasPagina[hash].initComponent();
}

const rutasPagina = {
  "#/PanelPrincipal": {
    contentHTML:null,
    serverRoute:"/view_panel_principal",
    initComponent: () => {
      desactivarSubSidebars()
    }
  },
  "#/GestorFotos": {
    contentHTML:null,
    serverRoute:"/view_panel_principal",
    initComponent: () => {
      desactivarSubSidebars();
      activarDesactivarSubSidebar(subsidebarGestorfotos, "activar");}
  },
  "#/GestorFotos/buscador_fotos": {
    contentHTML: null,
    serverRoute: "/view_buscador_fotos",
    initComponent: () => initComponenteBuscadorFotos(),
  },
  "#/GestorFotos/cargar_fotos": {
    contentHTML: null,
    serverRoute: "/view_cargar_fotos",
    initComponent: () => initComponenteCargarFoto(),
  },
  "#/GestorServicios": {
    contentHTML: null,
    serverRoute: "/view_panel_principal",
    initComponent:() => {
      desactivarSubSidebars();
      activarDesactivarSubSidebar(subsidebarGestorServicio, "activar")
    },
  },
  "#/GestorServicios/registrar_servicio_fotografico": {
    contentHTML: null,
    serverRoute: "/registrar_servicio_fotografico",
    initComponent: () => {
    },
  },
  "#/GestorServicios/registrar_servicio": {
    contentHTML: null,
    serverRoute: "/registrar_servicio",
    initComponent: () => {},
  },
  "#/GestorServicios/verImpresiones": {
    contentHTML: null,
    serverRoute: "/verImpresiones",
    initComponent: () => {
    },
  },
  "#/GestorClientes": {
    contentHTML: null,
    serverRoute: "/view_panel_principal",
    initComponent:() => {
      desactivarSubSidebars();
      activarDesactivarSubSidebar(subsidebarGestorCliente, "activar")
    },
  },
  "#/GestorClientes/verClientes": {
    contentHTML: null,
    serverRoute: "/verClientes",
    initComponent: () => {},
  },
  "#/GestorClientes/registrar_cliente": {
    contentHTML: null,
    serverRoute: "/registrar_cliente",
    initComponent: () => {},
  },

};
