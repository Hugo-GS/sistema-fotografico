import * as express from "express";
import { Request, Response } from "express";
import configuracionesExpress from "./configuracionesExpress";
import rutasApiAdministrador from "./capa_presentacion/rutasAPI/rutasApiAdministrador";
import rutasApiEncargado from "./capa_presentacion/rutasAPI/rutasApiEncargado";
import rutasWebAdministrador from "./capa_presentacion/rutasWeb/rutasWebAdministrador";
import rutasWebEncargado from "./capa_presentacion/rutasWeb/rutasWebEncargado";

const app = express();
configuracionesExpress(app);

const port = parseInt(process.env.PORT) || process.argv[3] || 5050;

app.get('/', (req: Request, res: Response) => {
  
  res.redirect('/ingreso');
});

app.get('/ingreso', (req: Request, res: Response) => {
  
  res.render('vistas_general/ingreso');
});

app.post('/ingreso', (req: Request, res: Response) => {
  const nombreUsuario = req.body.nombreUsuario;
  const contrasena = req.body.contraUsuario;

  res.json({mensaje: `${nombreUsuario} ${contrasena}`})
});


app.use('/api_admin', rutasApiAdministrador)
app.use('/encargado', rutasApiEncargado)
app.use('/sistemaAdmin', rutasWebAdministrador)
app.use('/sistemaEncar', rutasWebEncargado)


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
