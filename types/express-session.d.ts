import 'express-session';

declare module 'express-session' {
 interface SessionData {
   usuario: {
     id: number;
     nombre: string;
     tipoUsuario: string;
   }
 }
}
