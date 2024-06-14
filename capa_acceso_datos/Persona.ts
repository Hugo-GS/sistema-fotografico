import { configuracion } from "./configuracion_global";
import * as mysql from "mysql2/promise";

export class Persona {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  constructor(
    id: number,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
  }
}

export class PersonaDBContext {
  private config: typeof configuracion;
  
  constructor() {
    this.config = configuracion;
  }

  async crearPersona(persona: Persona): Promise<void> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
      INSERT INTO persona 
      (nombre, apellido_paterno, apellido_materno)
      VALUES (?, ?, ?)`;
      await connection.execute(querySql, [
        persona.nombre,
        persona.apellidoPaterno,
        persona.apellidoMaterno,
      ]);
      await connection.end();
    } catch (error) {
      console.error("Error al crear persona: ", error);
    }
  }

  async seleccionarPersonaPorId(idPersona: number): Promise<Persona | null> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(this.config);
      const querySql: string = `
      SELECT id, nombre, apellido_paterno, apellido_materno 
      FROM persona WHERE id = ?`;
      const [filas]: any[] = await connection.execute(querySql, [idPersona]);
      
      await connection.end();

      if (filas.length > 0) {
        const [fila] = filas;
        return new Persona(
          fila.id,
          fila.nombre,
          fila.apellido_paterno,
          fila.apellido_materno
        );
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al seleccionar persona:", error);
      return null;
    }
  }

  async actualizarDatoPersona(
    idPersona: number,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string
  ): Promise<void> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
      UPDATE persona 
      SET nombre = ?, apellido_paterno = ?, apellido_materno = ?
      WHERE id_persona = ?`;
      await connection.execute(querySql, [
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        idPersona,
      ]);
      await connection.end();
    } catch (error) {
      console.error("Error al actualizar datos de persona: ", error);
    }
  }
}
