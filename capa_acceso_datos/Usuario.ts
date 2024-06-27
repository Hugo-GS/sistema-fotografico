import { configuracion } from "./configuracion_global";
import * as mysql from "mysql2/promise";
import bcrypt from "bcrypt";

export class Usuario {
  id: number;
  nombre: string;
  contrasena: string;
  tipoUsuario: string;

  constructor(
    id: number,
    nombre: string,
    contrasena: string,
    tipoUsuario: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.contrasena = contrasena;
    this.tipoUsuario = tipoUsuario;
  }
}

export class UsuarioDBContext {
  private config: typeof configuracion;

  constructor() {
    this.config = configuracion;
  }

  async seleccionarNombreClave(usuario: Usuario): Promise<Usuario> {
    try {
      const connection: mysql.Connection = await mysql.createConnection(
        this.config
      );
      const querySql: string = `
      SELECT usuario.id, usuario.nombre_usuario, tipousuario.tipo as tipo_usuario 
      FROM usuario 
      INNER JOIN  tipousuario 
      ON usario.id_tipousuario = tipousuario.id 
      WHERE usuario.nombre_usuario = ? 
      AND usuario.contrasena = ?`;
      const [filas]: any = await connection.execute(querySql, [
        usuario.nombre,
        usuario.contrasena,
      ]);
      await connection.end();

      if (filas.length > 0) {
        const fila = filas[0];
        return new Usuario(
          fila.id,
          fila.nombre_usuario,
          "",
          fila.tipo_usuario
        );
      }
    } catch (error) {
      console.error("Error al seleccionar usuario:", error);
      return null;
    }
  }
}
