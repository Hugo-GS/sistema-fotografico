import * as express from "express";
import * as path from "path";
import configuracionesExpress from "./configuracionesExpress";

const app = express();
configuracionesExpress(app);
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;


app.get('/', (req, res) => {
  res.render('index');
});

/*
app.get('/api', (req, res) => {
  res.json({"msg": ""});
});
*/


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

