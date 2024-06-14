import { Request, Response, Router } from 'express';
import { GestorPersona } from "../../capa_logica_negocio/GestorPersona";
import { Persona } from '../../capa_acceso_datos/Persona';

const router: Router = Router();
const gestorPersona: GestorPersona = new GestorPersona();

router.get('/persona/:id', 
async (req: Request, res: Response) => {
  try {
    const personaId: number = parseInt(req.params.id, 10);
    const persona: Persona | null = await gestorPersona.obtenerPersonaPorId(personaId);

    if (persona) {
      return res.json(persona);
    } else {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la persona:', error);
    return res.status(500).json({ message: 'Error al obtener la persona' });
  }
});


export default router;