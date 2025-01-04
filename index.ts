import express, { Request, Response } from "express";
import { verificarAdmin, verificarSesion } from './middleware/auth';
import configuracionesExpress from "./configuracionesExpress";
import rutasApiAdministrador from "./capa_presentacion/rutasAPI/rutasApiAdministrador";
import rutasApiEncargado from "./capa_presentacion/rutasAPI/rutasApiEncargado";
import rutasWebAdministrador from "./capa_presentacion/rutasWeb/rutasWebAdministrador";
import rutasWebEncargado from "./capa_presentacion/rutasWeb/rutasWebEncargado";
import { config } from 'dotenv';
import { GestorUsuario } from "./capa_logica_negocio/GestorUsuario";

config();
const app = express();
configuracionesExpress(app);

const port = Number(process.env.PORT) || Number(process.argv[3]) || 5050;

app.get("/", (_req: Request, res: Response) => res.redirect("/ingreso"));
app.get("/ingreso", (_req: Request, res: Response) => res.render("vistas_general/ingreso"));
app.post("/ingreso", async (req: Request, res: Response) => {
  const { nombreUsuario, contraUsuario } = req.body;
  try {
    const gestorUsuario = new GestorUsuario();
    const usuario = await gestorUsuario.autenticarUsuario(nombreUsuario, contraUsuario);
    
    if (usuario) {
      req.session.usuario = {
        id: usuario.id,
        nombre: usuario.nombre,
        tipoUsuario: usuario.tipoUsuario
      };
      
      const redireccion = usuario.tipoUsuario === 'A' ? '/sistemaAdmin' : '/sistemaEncar';
      res.json({ success: true, redireccion });
    } else {
      res.status(401).json({ success: false, mensaje: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, mensaje: 'Error del servidor' });
  }
});
app.get("/cerrar_sesion", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
    }
    res.redirect("/ingreso");
  });
 });

app.use("/api_admin", rutasApiAdministrador);
app.use("/encargado", rutasApiEncargado);
app.use("/sistemaAdmin", verificarAdmin,rutasWebAdministrador);
app.use("/sistemaEncar", verificarSesion,rutasWebEncargado);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));