import { PersonaDBContext, Persona } from "../capa_acceso_datos/Persona"; 
import { ClienteDBContext, Cliente } from "../capa_acceso_datos/Cliente"; 

export class GestorPersona {
  private PersonaDBContext: PersonaDBContext;
  private ClienteDBContext: ClienteDBContext;
  constructor() {
    this.PersonaDBContext = new PersonaDBContext();
    this.ClienteDBContext = new ClienteDBContext();
  }
  
  async obtenerPersonaPorId(id: number): Promise<Persona | null> {
    const persona = await this.PersonaDBContext.seleccionarPersonaPorId(id);
    return persona;
  }

  /* Clever */

  async crearPersona(nombre: string, apellidoPaterno: string, apellidoMaterno: string): Promise<number | null> {
    try {
      // Crear nueva persona
      const nuevaPersona = new Persona(0, nombre, apellidoPaterno, apellidoMaterno, "0");
      const idUltimaPersona = await this.PersonaDBContext.crearPersona(nuevaPersona);

      if (idUltimaPersona !== null) {
        // Crear cliente asociado a la persona
        await this.crearCliente(idUltimaPersona);
      }

      return idUltimaPersona;
    } catch (error) {
      console.error("Error al crear persona y cliente:", error);
      return null;
    }
  }
  
  async crearCliente(idPersona: number): Promise<void> {
    try {
      const nuevoCliente = new Cliente(idPersona);
      await this.ClienteDBContext.crearCliente(nuevoCliente);
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }
  }

  async obtenerTodosLosClientes(): Promise<{ id: number, nombre: string, apellido_paterno: string, apellido_materno: string}[]> {
    try {
      const impresionesConValor = await this.PersonaDBContext.seleccionarPersonaPorCliente();
      console.log("Impresiones con valor:", impresionesConValor);
      return impresionesConValor;
    } catch (error) {
      console.error("Error al obtener impresiones con valor: ", error);
      return [];
    }
  }

  async obtenerPersonaporId(id: number): Promise<{ id: number, nombre: string, apellido_paterno: string, apellido_materno: string }[]> {
    try {
      const personaobtenida = await this.PersonaDBContext.obtenerPersonaPorId(id);
      //console.log("Impresiones con valor:", personaobtenida);
      console.log("persona: obtenida");
      console.log(personaobtenida)
      return personaobtenida;
    } catch (error) {
      //console.error("Error al obtener impresiones con valor: ", error);
      return [];
    }
  }

  
  async actualizardatosPersona(id: number,nombre:string, apellido_paterno: string,  apellido_materno: string): Promise<void> {
    try {
      await this.PersonaDBContext.actualizarDatosPersona(id, nombre,apellido_paterno,apellido_materno);
    } catch (error) {
      console.error("Error al actualizar datos de impresión: ", error);
      throw error;
    }
  }
  
}
