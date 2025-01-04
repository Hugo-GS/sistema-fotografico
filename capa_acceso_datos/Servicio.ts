import { configuracion } from "./configuracion_global";
import * as mysql from "mysql2/promise";

export class Servicio {
  id: number;
  concepto: string;
  valor: number;

  constructor(id: number, concepto: string, valor: number) {
    this.id = id;
    this.concepto = concepto;
    this.valor = valor;
  }
}

export class ServicioDBContext {
  private config: typeof configuracion;

  constructor() {
    this.config = configuracion;
  }

  async crearServicio(servicio: Servicio): Promise<void> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
      INSERT INTO conceptoservicio (concepto, valor)
      VALUES (?, ?)`;
      await connection.execute(querySql, [servicio.concepto, servicio.valor]);
      await connection.end();
    } catch (error) {
      console.error("Error al crear servicio: ", error);
    }
  }

  async seleccionarServicioPorId(idServicio: number): Promise<Servicio | null> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
      SELECT id, concepto, valor 
      FROM servicio WHERE id = ?`;
      const [filas]: any[] = await connection.execute(querySql, [idServicio]);

      await connection.end();

      if (filas.length > 0) {
        const [fila] = filas;
        return new Servicio(fila.id, fila.concepto, fila.valor);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al seleccionar servicio:", error);
      return null;
    }
  }

  async actualizarDatoServicio(
    idServicio: number,
    concepto: string,
    valor: number
  ): Promise<void> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
      UPDATE servicio 
      SET concepto = ?, valor = ?
      WHERE id = ?`;
      await connection.execute(querySql, [concepto, valor, idServicio]);
      await connection.end();
    } catch (error) {
      console.error("Error al actualizar datos de servicio: ", error);
      throw error;
    }
  }
}
