import { Request, Response, Router } from 'express';
import { GestorServicio } from '../../capa_logica_negocio/GestorServicio';

const router: Router = Router();

function vista(nombreVista: string): string {
  return `vistas_encargado/${nombreVista}`;
}

router.get('/', async (req: Request, res: Response) => {
  return res.render(vista('index'));
});

export default router;
