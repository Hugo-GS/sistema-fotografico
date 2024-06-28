function initComponenteCargarFoto() {
  const uploadContainer = document.getElementById("upload-container");
  const fileInput = document.getElementById("file-input");
  const fileList = document.getElementById("file-list");
  const btnGuardarFotos = document.getElementById("btnGuardarFotos");
  const descripicionFotos = document.getElementById("descripcionFoto");
  let buttonLimpiar = null;
  let selectedFiles = [];

  btnGuardarFotos.addEventListener("click", () => {
    if(idClienteSeleccionado===null || checkSeleccion === null ||checkSeleccion.checked===false){
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
      console.log("No hay archivos para subir.");
    }
  });

  // Evento de arrastrar y soltar
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

  // Evento de selección de archivos
  fileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    handleFiles(files);
  });

  // Manejando los archivos seleccionados
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
    alert(idClienteSeleccionado);
    fetch("/api_admin/subir_foto", {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "X-File-Name": fileName,
        "Id-ClienteSeleccionado": idClienteSeleccionado,
        "descripcion-foto":descripicionFotos.value,
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
        if (checkSeleccion.checked){
            alert("Tiene un cliente seleccionado, quite la seleccion para buscar otro cliente");
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
        console.error('Error al buscar el cliente:', error);
        nombreCliente.textContent = 'Error al buscar el cliente';
        apellidosCliente.textContent = '';
      }
    } else {
      alert('Por favor, ingresa un CI válido.');
    }
  });



  function mostrarDatosCliente(clienteData) {
    nombreCliente.textContent = clienteData.nombre;
    apellidosCliente.textContent = clienteData.apellidoPaterno + clienteData.apellidoMaterno;
    accionCliente.innerHTML = `
    <input type="checkbox" id="checkSeleccion" name="idCliente" value="${clienteData.id}">
    <label for="idCliente">Seleccionar</label>
    `;
  }

}

async function buscarCliente(ciCliente) {
  const response = await fetch('/api_admin/buscar_cliente', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ci: ciCliente })
  });

  if (!response.ok) {
    throw new Error('Error en la respuesta del servidor');
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
  let ciClienteSeleccionado = null;

  btnBuscarCliente.addEventListener("click", async () => {
    const query = searchCliente.value;
    const clienteData = await buscarCliente(query);
    mostrarDatosCliente(clienteData);
  });

  function mostrarDatosCliente(clienteData) {

    clienteList.innerHTML = `
      <li style="padding:3px; border-radius:5px; background-color: #ececec; margin-top:5px;">${clienteData.nombre} ${clienteData.apellidoPaterno} ${clienteData.apellidoMaterno} 
      <button 
        style="margin:0; margin-left:5px; background-color: #fefefe; color:black; font-size:16px; padding:4px 0 0 4px;" 
        id="btnSeleccionarCliente">
        <i class='bx bx-user-check'></i>
      </button>
      </li>`;
    
      document.getElementById('btnSeleccionarCliente').addEventListener("click", ()=>{
        seleccionarClienteBusquedaFoto(`${clienteData.nombre} ${clienteData.apellidoPaterno} ${clienteData.apellidoMaterno}`);
      })
    
  }

  function seleccionarClienteBusquedaFoto(nombreCompleto) {
      ciClienteSeleccionado = searchCliente;
      const $option = $clienteSelect.querySelector("option");
      $option.textContent = nombreCompleto;
  }

listView.addEventListener("click", () => {
  photoTable.classList.remove("hidden");
  photoGrid.classList.add("hidden");
});
/*
gridView.addEventListener("click", () => {
  photoTable.classList.add("hidden");
  photoGrid.classList.remove("hidden");
});*/

//--------------------------------------------------


}