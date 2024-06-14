import * as express from "express";
import configuracionesExpress from "./configuracionesExpress";
import rutasApiAdministrador from "./capa_presentacion/rutasAPI/rutasApiAdministrador";
import rutasApiEncargado from "./capa_presentacion/rutasAPI/rutasApiEncargado";
import rutasWebAdministrador from "./capa_presentacion/rutasWeb/rutasWebAdministrador";

const app = express();
configuracionesExpress(app);
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/admin', rutasApiAdministrador)
app.use('/encargado', rutasApiEncargado)
app.use('/sistemaAdmin', rutasWebAdministrador)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
