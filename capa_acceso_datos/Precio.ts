import { configuracion } from "./configuracion_global";
import * as mysql from "mysql2/promise";

export class Precio {
  id: number;
  fechaHrInicio: Date;
  fechaHrFin: Date | null;
  valor: number;
  idImpresion: number;

  constructor(
    id: number,
    fechaHrInicio: Date,
    fechaHrFin: Date | null,
    valor: number,
    idImpresion: number
  ) {
    this.id = id;
    this.fechaHrInicio = fechaHrInicio;
    this.fechaHrFin = fechaHrFin;
    this.valor = valor;
    this.idImpresion = idImpresion;
  }
}

export class PrecioDBContext {
  private config: typeof configuracion;

  constructor() {
    this.config = configuracion;
  }

  async crearPrecio(precio: Precio): Promise<Precio> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(this.config);
      const querySql: string = `
      INSERT INTO precio (fech_hr_inicio, fecha_hr_fin, valor, id_impresion)
      VALUES (?, ?, ?, ?)`;
      const [result]: any = await connection.execute(querySql, [
        precio.fechaHrInicio,
        precio.fechaHrFin,
        precio.valor,
        precio.idImpresion,
      ]);
      await connection.end();
      return result.insertId;
    } catch (error) {
      console.error("Error al crear precio: ", error);
      return null;
    }
  }

  async seleccionarPrecioPorId(idPrecio: number): Promise<Precio | null> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(this.config);
      const querySql: string = `
      SELECT id, fech_hr_inicio, fecha_hr_fin, valor, id_impresion 
      FROM precio WHERE id = ?`;
      const [filas]: any = await connection.execute(querySql, [idPrecio]);
      
      await connection.end();

      if (filas.length > 0) {
        const fila = filas[0];
        return new Precio(
          fila.id,
          new Date(fila.fecha_hr_inicio),
          fila.fecha_hr_fin ? new Date(fila.fecha_hr_fin) : null,
          fila.valor,
          fila.id_impresion
        );
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al seleccionar precio:", error);
      return null;
    }
  }

  async actualizarDatoPrecio(
    idPrecio: number,
    fechaHrInicio: Date,
    fechaHrFin: Date | null,
    valor: number,
    idImpresion: number
  ): Promise<void> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(this.config);
      const querySql: string = `
      UPDATE precio 
      SET fecha_hr_inicio = ?, fecha_hr_fin = ?, valor = ?, id_impresion = ?
      WHERE id = ?`;
      await connection.execute(querySql, [
        fechaHrInicio,
        fechaHrFin,
        valor,
        idImpresion,
        idPrecio,
      ]);
      await connection.end();
    } catch (error) {
      console.error("Error al actualizar datos de precio: ", error);
    }
  }
}


/*import { configuracion } from "./configuracion_global";
import * as mysql from "mysql2/promise";

export class Precio {
  id: number;
  fechaHrInicio: Date;
  fechaHrFin: Date;
  valor: number;
  idImpresion: number;

  constructor(
    id: number,
    fechaHrInicio: Date,
    fechaHrFin: Date,
    valor: number,
    idImpresion: number
  ) {
    this.id = id;
    this.fechaHrInicio = fechaHrInicio;
    this.fechaHrFin = fechaHrFin;
    this.valor = valor;
    this.idImpresion = idImpresion;
  }
}

export class PrecioDBContext {
  private config: typeof configuracion;

  constructor() {
    this.config = configuracion;
  }

  async crearPrecio(precio: Precio): Promise<number | null> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(this.config);
      const querySql: string = `
      INSERT INTO precio (fecha_hr_inicio, fecha_hr_fin, valor, id_impresion)
      VALUES (?, ?, ?, ?)`;
      const [result]: any = await connection.execute(querySql, [
        precio.fechaHrInicio,
        precio.fechaHrFin,
        precio.valor,
        precio.idImpresion,
      ]);
      await connection.end();
      return result.insertId;
    } catch (error) {
      console.error("Error al crear precio: ", error);
      return null;
    }
  }

  async seleccionarPrecioPorId(idPrecio: number): Promise<Precio | null> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(this.config);
      const querySql: string = `
      SELECT id, fecha_hr_inicio, fecha_hr_fin, valor, id_impresion 
      FROM precio WHERE id = ?`;
      const [filas]: any[] = await connection.execute(querySql, [idPrecio]);
      
      await connection.end();

      if (filas.length > 0) {
        const [fila] = filas;
        return new Precio(
          fila.id,
          new Date(fila.fecha_hr_inicio),
          new Date(fila.fecha_hr_fin),
          fila.valor,
          fila.id_impresion
        );
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al seleccionar precio:", error);
      return null;
    }
  }

  async actualizarDatoPrecio(
    idPrecio: number,
    fechaHrInicio: Date,
    fechaHrFin: Date,
    valor: number,
    idImpresion: number
  ): Promise<void> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(this.config);
      const querySql: string = `
      UPDATE precio 
      SET fecha_hr_inicio = ?, fecha_hr_fin = ?, valor = ?, id_impresion = ?
      WHERE id = ?`;
      await connection.execute(querySql, [
        fechaHrInicio,
        fechaHrFin,
        valor,
        idImpresion,
        idPrecio,
      ]);
      await connection.end();
    } catch (error) {
      console.error("Error al actualizar datos de precio: ", error);
    }
  }
}
*/