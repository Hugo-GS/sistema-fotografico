import { ServicioDBContext, Servicio } from "../capa_acceso_datos/Servicio";

export class GestorServicio {
  private servicioDBContext: ServicioDBContext;

  constructor() {
    this.servicioDBContext = new ServicioDBContext();
  }

  async obtenerServicioPorId(id: number): Promise<Servicio | null> {
    const servicio = await this.servicioDBContext.seleccionarServicioPorId(id);
    return servicio;
  }

  async crearServicio(concepto: string, valor: number): Promise<void> {
    const nuevoServicio = new Servicio(0, concepto, valor);
    await this.servicioDBContext.crearServicio(nuevoServicio);
  }

  async actualizarServicio(
    id: number,
    concepto: string,
    valor: number
  ): Promise<void> {
    await this.servicioDBContext.actualizarDatoServicio(id, concepto, valor);
  }
}
