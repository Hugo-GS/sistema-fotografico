import { Usuario, UsuarioDBContext } from "../capa_acceso_datos/Usuario";

export class GestorUsuario {
  private usuarioDBContext: UsuarioDBContext;

  constructor() {
    this.usuarioDBContext = new UsuarioDBContext();
  }

  async autenticarUsuario(
    nombreUsuario: string,
    contrasena: string
  ): Promise<Usuario | null> {
    const usuario = new Usuario(0, nombreUsuario, contrasena, "");
    return await this.usuarioDBContext.seleccionarNombreClave(usuario);
  }
}
