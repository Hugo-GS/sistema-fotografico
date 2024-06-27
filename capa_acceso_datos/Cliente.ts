import { configuracion } from "./configuracion_global";
import * as mysql from "mysql2/promise";
import { Persona } from "./Persona";

export class Cliente {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class ClienteDBContext {
  private config: typeof configuracion;

  constructor() {
    this.config = configuracion;
  }

  async seleccionarClientePorId(idPersona: number): Promise<Persona | null> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
        SELECT 
            persona.id, 
            persona.nombre, 
            persona.apellido_paterno, 
            persona.apellido_materno, 
            persona.ci 
        FROM persona 
        WHERE id = ? 
        AND persona.id = cliente.id;`;
      const [filas]: any[] = await connection.execute(querySql, [idPersona]);

      await connection.end();

      if (filas.length > 0) {
        const [fila] = filas;
        return new Persona(
          fila.id,
          fila.nombre,
          fila.apellido_paterno,
          fila.apellido_materno,
          fila.ci
        );
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al seleccionar persona:", error);
      return null;
    }
  }

  async seleccionarClientePorCi(ciPersona: number): Promise<Persona | null> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
          SELECT 
            persona.id, 
            persona.nombre, 
            persona.apellido_paterno, 
            persona.apellido_materno, 
            persona.ci  
          FROM persona, cliente 
          WHERE persona.ci = ? AND persona.id=cliente.id;`;
      const [filas]: any[] = await connection.execute(querySql, [ciPersona]);

      await connection.end();

      if (filas.length > 0) {
        const [fila] = filas;
        return new Persona(
          fila.id,
          fila.nombre,
          fila.apellido_paterno,
          fila.apellido_materno,
          fila.ci
        );
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al seleccionar persona:", error);
      return null;
    }
  }

  /*Clever */

  async crearCliente(cliente: Cliente): Promise<void> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
          INSERT INTO cliente (id)
          VALUES (?)`;
      await connection.execute(querySql, [cliente.id]);
      await connection.end();
    } catch (error) {
      console.error("Error al crear cliente: ", error);
    }
  }
  async seleccionarClientes(): Promise<Cliente[]> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
          SELECT id_persona
          FROM cliente`;
      const [rows]: any[] = await connection.execute(querySql);
      await connection.end();

      return rows.map((row: any) => new Cliente(row.id_persona));
    } catch (error) {
      console.error("Error al seleccionar clientes: ", error);
      return [];
    }
  }
}
