import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

export default (app: express.Express) => {
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "capa_presentacion/views"));
  app.use(express.static(path.join(__dirname, "capa_presentacion/public")));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
};