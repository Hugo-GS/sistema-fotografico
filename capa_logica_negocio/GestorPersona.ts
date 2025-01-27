import { PersonaDBContext, Persona } from "../capa_acceso_datos/Persona";
import { ClienteDBContext, Cliente } from "../capa_acceso_datos/Cliente";

export class GestorPersona {
  private PersonaDBContext: PersonaDBContext;
  private ClienteDBContext: ClienteDBContext;
  constructor() {
    this.PersonaDBContext = new PersonaDBContext();
    this.ClienteDBContext = new ClienteDBContext();
  }

  async obtenerPersonaPorId(id: number): Promise<Persona> {
    const persona = await this.PersonaDBContext.seleccionarPersonaPorId(id);
    return persona;
  }

  async crearPersona(
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    ci: string
  ): Promise<number | null> {
    try {
      const nuevaPersona = new Persona(
        0,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        ci
      );
      const idUltimaPersona = await this.PersonaDBContext.crearPersona(
        nuevaPersona
      );

      if (idUltimaPersona !== null) {
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

  async obtenerTodosLosClientes(): Promise<
    {
      id: number;
      nombre: string;
      apellido_paterno: string;
      apellido_materno: string;
      ci: string;
    }[]
  > {
    try {
      const impresionesConValor =
        await this.PersonaDBContext.seleccionarPersonaPorCliente();
      return impresionesConValor;
    } catch (error) {
      console.error("Error al obtener impresiones con valor: ", error);
      return [];
    }
  }

  async obtenerPersonaporId(id: number): Promise<
    {
      id: number;
      nombre: string;
      apellido_paterno: string;
      apellido_materno: string;
      ciPersona: string;
    }[]
  > {
    try {
      const personaobtenida = await this.PersonaDBContext.obtenerPersonaPorId(
        id
      );
      return personaobtenida;
    } catch (error) {
      return [];
    }
  }

  async actualizardatosPersona(
    id: number,
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    ci: string
  ): Promise<void> {
    try {
      await this.PersonaDBContext.actualizarDatosPersona(
        id,
        nombre,
        apellido_paterno,
        apellido_materno,
        ci
      );
    } catch (error) {
      console.error("Error al actualizar datos de impresión: ", error);
      throw error;
    }
  }
}
