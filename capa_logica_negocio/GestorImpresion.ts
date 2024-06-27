import { ImpresionDBContext, Impresion } from "../capa_acceso_datos/Impresion";
import {PrecioDBContext, Precio} from "../capa_acceso_datos/Precio"

export class GestorImpresion {
  private impresionDBContext: ImpresionDBContext;
  private precioDBContext: PrecioDBContext;

  constructor() {
    this.impresionDBContext = new ImpresionDBContext();
    this.precioDBContext = new PrecioDBContext();
  }

  async crearImpresion(
    nombre: string,
    descripcionDetalleProducto: string,
    estado: string,
    valor: number
  ): Promise<number | null> {
    try {
      const nuevaImpresion = new Impresion(
        0,
        nombre,
        descripcionDetalleProducto,
        estado
      );
      const idUltimoServicio = await this.impresionDBContext.crearImpresion(
        nuevaImpresion
      );

      if (idUltimoServicio !== null) {
        await this.crearPrecio(idUltimoServicio, valor);
      }

      return idUltimoServicio;
    } catch (error) {
      console.error("Error al crear impresion: ", error);
      return null;
    }
  }

  async crearPrecio(idImpresion: number, valor: number): Promise<void> {
    const fechaHrInicio = new Date(); // Fecha y hora actuales
    const fechaHrFin = null; // Fecha y hora de fin vacía

    const nuevoPrecio = new Precio(
      0,
      fechaHrInicio,
      fechaHrFin,
      valor,
      idImpresion
    );
    await this.precioDBContext.crearPrecio(nuevoPrecio);
  }

  async obtenerImpresionesConValor(): Promise<
    {
      id: number;
      nombre: string;
      descripciondetalleproducto: string;
      estado: string;
      valor: number;
    }[]
  > {
    try {
      const impresionesConValor =
        await this.impresionDBContext.seleccionarImpresionesConValor();
      console.log("Impresiones con valor:", impresionesConValor);
      return impresionesConValor;
    } catch (error) {
      console.error("Error al obtener impresiones con valor: ", error);
      return [];
    }
  }

  async obtenerImpresionporId(
    id: number
  ): Promise<
    {
      id: number;
      nombre: string;
      descripciondetalleproducto: string;
      estado: string;
      valor: number;
    }[]
  > {
    try {
      const impresionobtenida =
        await this.impresionDBContext.obtenerImpresionPorId(id);
      console.log("Impresiones con valor:", impresionobtenida);
      return impresionobtenida;
    } catch (error) {
      console.error("Error al obtener impresiones con valor: ", error);
      return [];
    }
  }

  async actualizarDatosImpresion(
    id: number,
    nombre: string,
    descripcionDetalleProducto: string,
    estado: string,
    valor: number
  ): Promise<void> {
    try {
      await this.impresionDBContext.actualizarDatosImpresion(
        id,
        nombre,
        descripcionDetalleProducto,
        estado,
        valor
      );
    } catch (error) {
      console.error("Error al actualizar datos de impresión: ", error);
      throw error;
    }
  }
}
