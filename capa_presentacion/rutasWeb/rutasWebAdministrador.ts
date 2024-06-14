import { Request, Response, Router } from 'express';

const router: Router = Router();

function vista(nombreVista): string{
  return `vistas_admin/${nombreVista}`
}

router.get('/', 
async (req: Request, res: Response) => {
  return  res.render(vista('index'));
});

export default router;