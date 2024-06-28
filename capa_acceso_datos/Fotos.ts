import { configuracion } from "./configuracion_global";
import * as mysql from "mysql2/promise";


export class Foto {
    id: number;
    imagen_bin: string;
    descripcion: string;
    fecha_hr: string;
    estado: string;
    id_cliente: number;
    constructor(
      id: number,
      imagen_bin: string,
      descripcion: string,
      fecha_hr: string,
      estado: string,
      id_cliente: number
    ) {
      this.id = id;
      this.imagen_bin = imagen_bin;
      this.descripcion = descripcion;
      this.fecha_hr = fecha_hr;
      this.estado = estado;
      this.id_cliente = id_cliente;
    }
}

export class FotosDBContext {
    private config: typeof configuracion;
    
    constructor() {
      this.config = configuracion;
    }

    async insertFoto(foto: Foto) {
        try {
            const connection: mysql.Connection = await mysql.createConnection(
              this.config
            );
            const querySql: string = `
            INSERT INTO fotos 
            (imagen_bin, descripcion, fecha_hr, estado, id_cliente)
            VALUES (?, ?, ?, ?, ?)`;
            await connection.execute(querySql, [
              foto.imagen_bin,
              foto.descripcion,
              foto.fecha_hr,
              foto.estado,
              foto.id_cliente
            ]);
            await connection.end();
          } catch (error) {
            console.error("Error al insertar registro en Fotos: ", error);
          }
    }

    async seleccionarFotosPorCiCliente(ciCliente: number): Promise<Foto[]> {
      try {
        const connection: mysql.Connection = await mysql.createConnection(
          this.config);
        const querySql: string = `
        SELECT  
          fotos.id, 
          fotos.imagen_bin,
          fotos.descripcion,
          fotos.fecha_hr,
          fotos.estado,
          fotos.id_cliente
        FROM 
          fotos, 
          persona
        WHERE fotos.id_cliente = persona.id
        AND persona.ci = ?
        AND fotos.estado = 'A';`;
        const [rows]: any[] = await connection.execute(querySql, [ciCliente]);
        await connection.end();
        return rows.map(row => (
          new Foto(
            row.id,
            row.imagen_bin,
            row.descripcion,
            row.fecha_hr,
            row.estado,
            row.id_cliente
          )
        ));
      } 
      catch (error) {
        console.error("Error al seleccionar fotos del cliente. Error:", error)
        return [];
      }
    }

}