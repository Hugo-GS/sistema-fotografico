import { configuracion } from "./configuracion_global";
import * as mysql from "mysql2/promise";
import bcrypt from "bcrypt";

export class Usuario {
 id: number;
 nombre: string; 
 contrasena: string;
 tipoUsuario: string;
 idPersona?: number;
 idTipoUsuario?: number;

 constructor(
   id: number,
   nombre: string,
   contrasena: string,
   tipoUsuario: string,
   idPersona?: number,
   idTipoUsuario?: number
 ) {
   this.id = id;
   this.nombre = nombre;
   this.contrasena = contrasena;
   this.tipoUsuario = tipoUsuario;
   this.idPersona = idPersona;
   this.idTipoUsuario = idTipoUsuario;
 }
}

export class UsuarioDBContext {
 private config: typeof configuracion;

 constructor() {
   this.config = configuracion;
 }

 async obtenerUsuarioPorNombre(nombreUsuario: string): Promise<Usuario | null> {
   try {
     const connection = await mysql.createConnection(this.config);
     const query = `
       SELECT u.*, t.tipo 
       FROM usuario u 
       JOIN tipousuario t ON u.id_tipousuario = t.id 
       WHERE u.nombre_usuario = ?`;
       
     const [filas]: any = await connection.execute(query, [nombreUsuario]);
     await connection.end();

     if (filas.length === 0) return null;

     return new Usuario(
       filas[0].id,
       filas[0].nombre_usuario,
       filas[0].contrasena,
       filas[0].tipo,
       filas[0].id_persona,
       filas[0].id_tipousuario
     );
   } catch (error) {
     console.error("Error al obtener usuario:", error);
     return null;
   }
 }

 async seleccionarNombreClave(usuario: Usuario): Promise<Usuario | null> {
   try {
     const connection = await mysql.createConnection(this.config);
     const query = `
       SELECT u.id, u.nombre_usuario, t.tipo as tipo_usuario 
       FROM usuario u
       INNER JOIN tipousuario t ON u.id_tipousuario = t.id 
       WHERE u.nombre_usuario = ? AND u.contrasena = ?`;

     const [filas]: any = await connection.execute(query, [
       usuario.nombre,
       usuario.contrasena,
     ]);
     await connection.end();

     if (filas.length === 0) return null;

     return new Usuario(
       filas[0].id,
       filas[0].nombre_usuario,
       "",
       filas[0].tipo_usuario
     );
   } catch (error) {
     console.error("Error al seleccionar usuario:", error);
     return null;
   }
 }
}