import express, { Express } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import { config } from 'dotenv';

export default (app: Express): void => {
  config();

  app.disable('x-powered-by');
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.raw({
    type: 'application/octet-stream',
    limit: '10mb'
  }));
  app.use(cookieParser());
  
  // Sesión
  app.use(session({
    secret: process.env.SESSION_SECRET || "llavesecretoejemplo",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    }
  }));

  // Vistas
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "capa_presentacion/views"));
  app.use(express.static(path.join(__dirname, "capa_presentacion/public")));
};