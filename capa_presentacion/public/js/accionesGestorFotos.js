function initComponenteCargarFoto() {
  const uploadContainer = document.getElementById("upload-container");
  const fileInput = document.getElementById("file-input");
  const fileList = document.getElementById("file-list");
  const btnGuardarFotos = document.getElementById("btnGuardarFotos");
  const descripicionFotos = document.getElementById("descripcionFoto");
  let buttonLimpiar = null;
  let selectedFiles = [];

  btnGuardarFotos.addEventListener("click", () => {
    if (
      idClienteSeleccionado === null ||
      checkSeleccion === null ||
      checkSeleccion.checked === false
    ) {
      alert("No hay cliente seleccionado");
      return;
    }
    if (selectedFiles.length > 0) {
      const confirmacion = confirm("Estas seguro de guardar estas fotos");
      if (confirmacion) {
        getFilesAsBinary(selectedFiles);
      } else {
      }
    } else {
      alert("No se ha cargado ninguna foto");
    }
  });

  uploadContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
    uploadContainer.classList.add("dragover");
  });

  uploadContainer.addEventListener("dragleave", () => {
    uploadContainer.classList.remove("dragover");
  });

  uploadContainer.addEventListener("drop", (event) => {
    event.preventDefault();
    uploadContainer.classList.remove("dragover");
    const files = event.dataTransfer.files;
    handleFiles(files);
  });

  fileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    handleFiles(files);
  });

  function handleFiles(files) {
    for (const file of files) {
      selectedFiles.push(file);
      const listItem = document.createElement("li");
      listItem.textContent = file.name;
      fileList.appendChild(listItem);
    }

    if (files.length > 0 && buttonLimpiar === null) {
      buttonLimpiar = document.createElement("button");
      buttonLimpiar.textContent = "Limpiar lista";
      buttonLimpiar.addEventListener("click", () => {
        fileList.innerHTML = "";
        selectedFiles = [];
        uploadContainer.removeChild(buttonLimpiar);
        buttonLimpiar = null;
      });
      uploadContainer.appendChild(buttonLimpiar);
    }
  }

  function getFilesAsBinary(files) {
    const promises = [];

    for (const file of files) {
      const promise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = () => {
          const arrayBuffer = reader.result;
          const byteArray = new Uint8Array(arrayBuffer);
          resolve({ byteArray, fileName: file.name });
        };

        reader.onerror = (error) => {
          reject(`Error al leer el archivo: ${error}`);
        };
      });

      promises.push(promise);
    }

    Promise.all(promises)
      .then((results) => {
        for (const result of results) {
          sendFileToServer(result.byteArray, result.fileName);
        }
        alert("Se han subido todas las fotos!");
        fileList.innerHTML = "";
        selectedFiles = [];
        uploadContainer.removeChild(buttonLimpiar);
        buttonLimpiar = null;
        descripicionFotos.value = "";
      })
      .catch((error) => {
        console.error("Error al procesar los archivos:", error);
      });
  }

  function sendFileToServer(byteArray, fileName) {
    fetch("/api_admin/subir_foto", {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "X-File-Name": fileName,
        "Id-ClienteSeleccionado": idClienteSeleccionado,
        "descripcion-foto": descripicionFotos.value,
      },
      body: byteArray,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Archivo subido exitosamente:", data);
      })
      .catch((error) => {
        console.error("Error al subir el archivo:", error);
      });
  }

  const btnBuscarcliente = document.getElementById("btnBuscarcliente");
  const ciClienteInput = document.getElementById("ci_cliente");
  const nombreCliente = document.getElementById("nombreCliente");
  const apellidosCliente = document.getElementById("apellidosCliente");
  const accionCliente = document.getElementById("accionCliente");
  let idClienteSeleccionado = null;
  let checkSeleccion = null;
  btnBuscarcliente.addEventListener("click", async () => {
    const ciCliente = ciClienteInput.value.trim();
    if (checkSeleccion !== null) {
      if (checkSeleccion.checked) {
        alert(
          "Tiene un cliente seleccionado, quite la seleccion para buscar otro cliente"
        );
        return;
      }
    }
    if (ciCliente) {
      try {
        const clienteData = await buscarCliente(ciCliente);
        idClienteSeleccionado = clienteData.id;

        mostrarDatosCliente(clienteData);
        checkSeleccion = document.getElementById("checkSeleccion");
      } catch (error) {
        console.error("Error al buscar el cliente:", error);
        nombreCliente.textContent = "Error al buscar el cliente";
        apellidosCliente.textContent = "";
      }
    } else {
      alert("Por favor, ingresa un CI válido.");
    }
  });

  function mostrarDatosCliente(clienteData) {
    nombreCliente.textContent = clienteData.nombre;
    apellidosCliente.textContent =
      clienteData.apellidoPaterno + clienteData.apellidoMaterno;
    accionCliente.innerHTML = `
    <input type="checkbox" id="checkSeleccion" name="idCliente" value="${clienteData.id}">
    <label for="idCliente">Seleccionar</label>
    `;
  }
}

async function buscarCliente(ciCliente) {
  const response = await fetch("/api_admin/buscar_cliente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ci: ciCliente }),
  });

  if (!response.ok) {
    throw new Error("Error en la respuesta del servidor");
  }

  const data = await response.json();
  return data;
}

async function obtenerFotosCliente(ciCliente, fecha = null) {
  const url = new URL(
    `/api_admin/fotosCliente/${ciCliente}`,
    window.location.origin
  );
  if (fecha) {
    url.searchParams.append("fecha", fecha);
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error en la respuesta del servidor");
  }

  const data = await response.json();
  return data;
}

function initComponenteBuscadorFotos() {
  const btnBuscarCliente = document.getElementById("btnBuscarCliente");
  const searchCliente = document.getElementById("searchCliente");
  const clienteList = document.getElementById("clienteList");
  const clienteInput = document.getElementById("clienteInput");
  const listView = document.getElementById("listView");
  const gridView = document.getElementById("gridView");
  const photoTable = document.getElementById("photoTable");
  const photoGrid = document.getElementById("photoGrid");
  const $clienteSelect = document.getElementById("cliente");
  const btnBuscarFotos = document.getElementById("btnBuscarFotos");
  const fechaInput = document.getElementById("fechaInput");
  const btnRealizarServicio = document.getElementById("btnRealizarServicio");
  let ciClienteSeleccionado = null;

  btnBuscarCliente.addEventListener("click", async () => {
    const query = searchCliente.value;
    const clienteData = await buscarCliente(query);
    mostrarDatosCliente(clienteData);
  });

  function mostrarDatosCliente(clienteData) {
    ciClienteSeleccionado = searchCliente.value;
    clienteList.innerHTML = `
      <li style="padding:3px; border-radius:5px; background-color: #ececec; margin-top:5px;">${clienteData.nombre} ${clienteData.apellidoPaterno} ${clienteData.apellidoMaterno} 
      <button 
        style="margin:0; margin-left:5px; background-color: #fefefe; color:black; font-size:16px; padding:4px 0 0 4px;" 
        id="btnSeleccionarCliente">
        <i class='bx bx-user-check'></i>
      </button>
      </li>`;

    document
      .getElementById("btnSeleccionarCliente")
      .addEventListener("click", () => {
        seleccionarClienteBusquedaFoto(
          `${clienteData.nombre} ${clienteData.apellidoPaterno} ${clienteData.apellidoMaterno}`,
          clienteData.id
        );
      });
  }

  function mostrarFotos(fotos) {
    const tbody = photoTable.querySelector("tbody");
    tbody.innerHTML = "";

    fotos.forEach((foto) => {
      const row = document.createElement("tr");
      const imagenBin = foto.imagen_bin
        ? `data:image/png;base64,${foto.imagen_bin}`
        : "";
      row.innerHTML = `
        <td>${foto.id}</td>
        <td>${foto.descripcion}</td>
        <td>${foto.id_cliente}</td>
        <td>${foto.fecha_hr}</td>
        <td><img src="${imagenBin}" alt="Miniatura" width="80" height="80"/></td>
        <td>
          <label>
            <input type="checkbox" /> Seleccionar
          </label>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  function seleccionarClienteBusquedaFoto(nombreCompleto, idCliente) {
    const $option = $clienteSelect.querySelector("option");
    $option.textContent = nombreCompleto;
    $option.id = "idClienteOption";
    $option.value = idCliente;
  }

  listView.addEventListener("click", () => {
    photoTable.classList.remove("hidden");
    photoGrid.classList.add("hidden");
  });
  //---------------------------------------------
  btnBuscarFotos.addEventListener("click", async () => {
    if (ciClienteSeleccionado) {
      if (fechaInput.value != "") {
        const fotos = await obtenerFotosCliente(
          ciClienteSeleccionado,
          fechaInput.value
        );
        mostrarFotos(fotos);
      } else {
        const fotos = await obtenerFotosCliente(ciClienteSeleccionado);
        mostrarFotos(fotos);
      }
    } else {
      alert("Selecciona un cliente primero.");
    }
  });

  function obtenerFotosSeleccionadas() {
    const selectedIds = [];
    const rows = document.querySelectorAll("#photoTable tbody tr");

    rows.forEach((row) => {
      const checkbox = row.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
        const id = row.querySelector("td:first-child").textContent;
        selectedIds.push(id);
      }
    });

    return selectedIds;
  }

  btnRealizarServicio.addEventListener("click", () => {
    const selectedIds = obtenerFotosSeleccionadas();

    if (selectedIds.length <= 0) {
      alert("No se ha seleccionado ninguna foto");
      return;
    }
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
    overlay.style.display = "block";
    const serviciosCTN = document.getElementById("serviciosCTN");
    serviciosCTN.classList.remove("hidden-ctn");
  });
  const btnCerrarVentanaRealizarServicios = document.getElementById(
    "btnCerrarVentanaRealizarServicios"
  );
  btnCerrarVentanaRealizarServicios.addEventListener("click", () => {
    const serviciosCTN = document.getElementById("serviciosCTN");
    const overlay = document.getElementById("overlay");
    serviciosCTN.classList.add("hidden-ctn");
    overlay.classList.remove("active");
    overlay.style.display = "none";
  });
}

function seleccionarServicio(idServicio, precio) {
  const serviciosCTN = document.getElementById("serviciosCTN");
  serviciosCTN.classList.add("hidden-ctn");

  const selectedIds = obtenerFotosSeleccionadasG();
  console.log("IDs de fotos seleccionadas:", selectedIds);

  const idCliente = document.getElementById("cliente").value;
  const idEncargado = 6;
  const totalGeneral = Number(precio) * selectedIds.length;

  const payload = {
    idServicio: idServicio,
    idsFotos: selectedIds,
    idCliente: idCliente,
    idEncargado: idEncargado,
    totalGeneral: totalGeneral,
    precioServicio: Number(precio),
  };

  fetch("/api_admin/realizarServicio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al realizar el servicio");
      }
      return response.json();
    })
    .then((data) => {
      alert("La venta se ha realizado correctamente!");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function obtenerFotosSeleccionadasG() {
  const selectedIds = [];
  const rows = document.querySelectorAll("#photoTable tbody tr");

  rows.forEach((row) => {
    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      const id = row.querySelector("td:first-child").textContent;
      selectedIds.push(id);
    }
  });

  return selectedIds;
}
