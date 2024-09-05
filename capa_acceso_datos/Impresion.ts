import { configuracion } from "./configuracion_global";
import * as mysql from "mysql2/promise";

export class Venta {
  id: number;
  estado: string;
  fecha_hr: string;
  total_general: number;
  id_encargado: number;
  id_cliente: number;

  constructor(id: number, estado: string, fecha_hr: string, total_general: number, id_encargado: number, id_cliente: number) {
    this.id = id;
    this.estado = estado;
    this.fecha_hr = fecha_hr;
    this.total_general = total_general;
    this.id_encargado = id_encargado;
    this.id_cliente = id_cliente;
  }
}


export class DetalleVenta {
  id_venta: number;
  id_impresion: number;
  cantidad: number;
  precio_impresion: number;
  precio_servicio: number;
  id_foto: number;

  constructor(id_venta: number, id_impresion: number, cantidad: number, precio_impresion: number, precio_servicio: number, id_foto: number) {
    this.id_venta = id_venta;
    this.id_impresion = id_impresion;
    this.cantidad = cantidad;
    this.precio_impresion = precio_impresion;
    this.precio_servicio = precio_servicio;
    this.id_foto = id_foto;
  }
}



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
        INSERT INTO precio (fecha_hr_inicio, fecha_hr_fin, valor, id_impresion)
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
  async insertVenta(venta: Venta): Promise<number> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(this.config);
      const querySql: string = `INSERT INTO venta (estado, fecha_hr, total_general, id_encargado, id_cliente) VALUES (?, ?, ?, ?, ?)`;
      const [result]: any = await connection.execute(querySql, [
        venta.estado,
        venta.fecha_hr,
        venta.total_general,
        venta.id_encargado,
        venta.id_cliente
      ]);
      await connection.end();
      return result.insertId;
    } catch (error) {
      console.error("Error al insertar registro en Venta: ", error);
      throw error;
    }
  }

  async insertDetalleVenta(detalleVenta: DetalleVenta) {
    try {
      const connection: mysql.Connection = await mysql.createConnection(this.config);
      const querySql: string = `INSERT INTO detalleventa (id_venta, id_impresion, cantidad, precio_impresion, precio_servicio, id_foto) VALUES (?, ?, ?, ?, ?, ?)`;
      await connection.execute(querySql, [
        detalleVenta.id_venta,
        detalleVenta.id_impresion,
        detalleVenta.cantidad,
        detalleVenta.precio_impresion,
        detalleVenta.precio_servicio,
        detalleVenta.id_foto
      ]);
      await connection.end();
    } catch (error) {
      console.error("Error al insertar registro en DetalleVenta: ", error);
      throw error;
    }
  }


}