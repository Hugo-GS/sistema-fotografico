import * as express from "express";
import configuracionesExpress from "./configuracionesExpress";
//import rutasAdministrador from "./capa_presentacion/rutas/rutasAdministrador";
//import rustasEncargado from "./capa_presentacion/rutas/rutasEncargado";


const app = express();
configuracionesExpress(app);
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.get('/', (req, res) => {
  res.render('index');
});

//app.use('/admin', rutasAdministrador)
//app.use('/encargado', rustasEncargado)

/*
app.get('/api', (req, res) => {
  res.json({"msg": ""});
});*/


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
