import { configuracion } from "./configuracion_global";
import * as mysql from "mysql2/promise";

export class Impresion {
    id: number;
    nombre: string;
    descripcionDetalleProducto: string;
    estado: string;
  
    constructor(id: number, nombre: string, descripcionDetalleProducto: string, estado: string) {
      this.id = id;
      this.nombre = nombre;
      this.descripcionDetalleProducto = descripcionDetalleProducto;
      this.estado = estado;
    }
  }

  export class ImpresionDBContext {
    private config: typeof configuracion;
    
    constructor() {
      this.config = configuracion;
    }
  
    async crearImpresion(impresion: Impresion): Promise<number | null> {
      try {
        const connection: mysql.Connection = await mysql.createConnection(this.config);
        const querySql: string = `
        INSERT INTO impresion (nombre, descripciondetalleproducto, estado)
        VALUES (?, ?, ?)`;
        const [result]: any = await connection.execute(querySql, [
          impresion.nombre,
          impresion.descripcionDetalleProducto,
          impresion.estado
        ]);
        await connection.end();
      return result.insertId;
    } catch (error) {
      console.error("Error al crear persona: ", error);
      return null;
    }
  }
  async seleccionarImpresionesConValor(): Promise<{ id: number, nombre: string, descripciondetalleproducto: string, estado: string, valor: number }[]> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(this.config);
      const querySql: string = `
      SELECT i.id, i.nombre, i.descripciondetalleproducto, i.estado, p.valor
      FROM impresion i
      JOIN precio p ON i.id = p.id_impresion
      Where p.fecha_hr_fin is NULL`;
      const [rows]: any[] = await connection.execute(querySql);
      await connection.end();
  
      return rows.map(row => ({
        id: row.id,
        nombre: row.nombre,
        descripciondetalleproducto: row.descripciondetalleproducto,
        estado: row.estado,
        valor: row.valor,
      }));
    } catch (error) {
      console.error("Error al seleccionar impresiones con valor: ", error);
      return [];
    }
  }

  async obtenerImpresionPorId(idImpresion: number): Promise<{ id: number, nombre: string, descripciondetalleproducto: string, estado: string, valor: number }[]> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(this.config);
      const querySql: string = `
        SELECT i.id, i.nombre, i.descripciondetalleproducto, i.estado, p.valor
        FROM impresion i
        JOIN precio p ON i.id = p.id_impresion
        WHERE i.id = ? and p.fecha_hr_fin is NULL`;
        const [rows]: any[] = await connection.execute(querySql,[idImpresion]);
      await connection.end();
  
      return rows.map(row => ({
        id: row.id,
        nombre: row.nombre,
        descripciondetalleproducto: row.descripciondetalleproducto,
        estado: row.estado,
        valor: row.valor,
      }));
    } catch (error) {
      console.error("Error al seleccionar impresiones con valor: ", error);
      return [];
    }
  }
    //actualizar impresion este sirve
  /*async actualizarDatosImpresion(id: number, nombre: string, descripcionDetalleProducto: string, estado: string, valor: number): Promise<void> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(this.config);
      const querySql: string = `
      UPDATE impresion 
      SET nombre = ?, descripciondetalleproducto = ?, estado = ?, valor = ?
      WHERE id = ?`;
      await connection.execute(querySql, [nombre, descripcionDetalleProducto, estado, valor, id]);
      await connection.end();
    } catch (error) {
      console.error("Error al actualizar datos de impresión: ", error);
      throw error;
    }
  }*/

  async actualizarDatosImpresion(id: number, nombre: string, descripcionDetalleProducto: string, estado: string, valor: number): Promise<void> {
    const connection = await mysql.createConnection(this.config);
    try {
      const fechaHrInicio = new Date(); // Fecha y hora actuales
      const fechaHrFin = null; // Fecha y hora de fin vacía

      await connection.beginTransaction();

      const updateImpresionQuery = `
        UPDATE impresion 
        SET nombre = ?, descripciondetalleproducto = ?, estado = ?
        WHERE id = ?`;

      const updatePrecioQuery = `
        UPDATE precio 
        SET fecha_hr_fin = ?
        WHERE id_impresion = ?`;



      const queryinsert: string = `
        INSERT INTO precio (fech_hr_inicio, fecha_hr_fin, valor, id_impresion)
        VALUES (?, ?, ?, ?)`;
        



      await connection.execute(updateImpresionQuery, [nombre, descripcionDetalleProducto, estado, id]);
      await connection.execute(updatePrecioQuery, [fechaHrInicio, id]);
      await connection.execute(queryinsert,[fechaHrInicio,fechaHrFin , valor , id])

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error("Error al actualizar datos de impresión y precio: ", error);
      throw error;
    } finally {
      await connection.end();
    }
  }
      
}