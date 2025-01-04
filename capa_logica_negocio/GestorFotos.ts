import { FotosDBContext, Foto } from "../capa_acceso_datos/Fotos";

export class GestorFotos {
  private fotosDBContext: FotosDBContext;
  constructor() {
    this.fotosDBContext = new FotosDBContext();
  }

  async guardarFotoEnDB(
    imagen_bin: string,
    descripcion: string,
    estado: string,
    id_cliente: number
  ) {
    const now = new Date();
    const fecha_hora = now.toISOString().slice(0, 19).replace("T", " ");
    const foto = new Foto(
      0,
      imagen_bin,
      descripcion,
      fecha_hora,
      estado,
      id_cliente
    );
    await this.fotosDBContext.insertFoto(foto);
  }

  async obtenerFotosCliente(
    ciCliente: number,
    fecha: Date | null = null
  ): Promise<Foto[]> {
    return await this.fotosDBContext.seleccionarFotosPorCiCliente(
      ciCliente,
      fecha
    );
  }
}
