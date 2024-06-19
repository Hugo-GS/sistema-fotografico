import * as express from "express";
import { Request, Response } from "express";
import configuracionesExpress from "./configuracionesExpress";
import rutasApiAdministrador from "./capa_presentacion/rutasAPI/rutasApiAdministrador";
import rutasApiEncargado from "./capa_presentacion/rutasAPI/rutasApiEncargado";
import rutasWebAdministrador from "./capa_presentacion/rutasWeb/rutasWebAdministrador";

const app = express();
configuracionesExpress(app);
const port = parseInt(process.env.PORT) || process.argv[3] || 5050;

app.get('/', (req: Request, res: Response) => {
  res.render('index');
});

app.use('/admin', rutasApiAdministrador)
app.use('/encargado', rutasApiEncargado)
app.use('/sistemaAdmin', rutasWebAdministrador)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
