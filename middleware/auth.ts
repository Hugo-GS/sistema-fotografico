import { Request, Response, NextFunction } from 'express';

export const verificarSesion = (req: Request, res: Response, next: NextFunction) => {
 req.session.usuario ? next() : res.redirect('/ingreso');
};

export const verificarAdmin = (req: Request, res: Response, next: NextFunction) => {
 req.session.usuario?.tipoUsuario === 'A' ? next() : res.redirect('/ingreso');
};
