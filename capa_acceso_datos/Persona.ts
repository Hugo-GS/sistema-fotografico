import { configuracion } from "./configuracion_global";
import * as mysql from "mysql2/promise";

export class Persona {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  ciPersona: string;
  constructor(
    id: number,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    ciPersona: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.ciPersona = ciPersona;
  }
}

export class PersonaDBContext {
  private config: typeof configuracion;

  constructor() {
    this.config = configuracion;
  }

  async actualizarDatoPersona(
    idPersona: number,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    ciPersona: string
  ): Promise<void> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
      UPDATE persona 
      SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, ci = ?
      WHERE id_persona = ?`;
      await connection.execute(querySql, [
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        idPersona,
        ciPersona,
      ]);
      await connection.end();
    } catch (error) {
      console.error("Error al actualizar datos de persona: ", error);
    }
  }

  async crearPersona(persona: Persona): Promise<number | null> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
      INSERT INTO persona (nombre, apellido_paterno, apellido_materno,ci)
      VALUES (?, ? ,?,?)`;
      const [result]: any = await connection.execute(querySql, [
        persona.nombre,
        persona.apellidoPaterno,
        persona.apellidoMaterno,
        persona.ciPersona,
      ]);
      await connection.end();
      return result.insertId;
    } catch (error) {
      console.error("Error al crear persona: ", error);
      return null;
    }
  }

  async seleccionarPersonaPorCliente(): Promise<
    {
      id: number;
      nombre: string;
      apellido_paterno: string;
      apellido_materno: string;
      ci: string;
    }[]
  > {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
      select p.id, p.nombre, p.apellido_paterno , p.apellido_materno , p.ci
      FROM persona p
      JOIN cliente c on p.id = c.id`;
      const [rows]: any[] = await connection.execute(querySql);
      await connection.end();

      return rows.map((row) => ({
        id: row.id,
        nombre: row.nombre,
        apellido_paterno: row.apellido_paterno,
        apellido_materno: row.apellido_materno,
        ci: row.ci,
      }));
    } catch (error) {
      console.error("Error al seleccionar impresiones con valor: ", error);
      return [];
    }
  }

  async actualizarDatosPersona(
    id: number,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    ciPersona: string
  ): Promise<void> {
    const connection = await mysql.createConnection(this.config);
    try {
      await connection.beginTransaction();

      const updateImpresionQuery = `
      UPDATE persona 
      SET nombre = ?, apellido_paterno = ?, apellido_materno = ? , ci = ?
      WHERE id = ?`;
      await connection.execute(updateImpresionQuery, [
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        ciPersona,
        id,
      ]);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error("Error al actualizar datos de Persona ", error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  async obtenerPersonaPorId(
    idPersona: number
  ): Promise<
    {
      id: number;
      nombre: string;
      apellido_paterno: string;
      apellido_materno: string;
      ciPersona: string;
    }[]
  > {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
        SELECT id, nombre, apellido_paterno, apellido_materno , ci
        FROM persona 
        WHERE id = ?`;
      const [rows]: any[] = await connection.execute(querySql, [idPersona]);
      await connection.end();

      return rows.map((row) => ({
        id: row.id,
        nombre: row.nombre,
        apellido_paterno: row.apellido_paterno,
        apellido_materno: row.apellido_materno,
        ciPersona: row.ci,
      }));
    } catch (error) {
      console.error("Error al seleccionar impresiones con valor: ", error);
      return [];
    }
  }

  async seleccionarPersonaPorId(id: number): Promise<Persona> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
        SELECT id, nombre, apellido_paterno, apellido_materno, ci
        FROM persona 
        WHERE id = ?`;
      const [filas]: any = await connection.execute(querySql, [id]);

      await connection.end();

      if (filas.length > 0) {
        const fila = filas[0];
        return new Persona(
          fila.id,
          fila.nombre,
          fila.apellido_paterno,
          fila.apellido_materno,
          "0"
        );
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al seleccionar precio:", error);
      return null;
    }
  }
}
