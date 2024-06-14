import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";

export default (app: express.Express) => {
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "capa_presentacion/views"));
  app.use(express.static(path.join(__dirname, "capa_presentacion/statics")));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors);
};