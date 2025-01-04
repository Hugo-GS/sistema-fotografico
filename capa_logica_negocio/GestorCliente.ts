import { ClienteDBContext } from "../capa_acceso_datos/Cliente";
import { Persona } from "../capa_acceso_datos/Persona";

export class GestorCliente {
  private clienteDBContext: ClienteDBContext;
  constructor() {
    this.clienteDBContext = new ClienteDBContext();
  }

  async obtenerPersonaPorId(id: number): Promise<Persona | null> {
    const persona = await this.clienteDBContext.seleccionarClientePorId(id);
    return persona;
  }

  async obtenerPersonaPorCi(ciCliente: number): Promise<Persona | null> {
    const persona = await this.clienteDBContext.seleccionarClientePorCi(
      ciCliente
    );
    return persona;
  }
}
