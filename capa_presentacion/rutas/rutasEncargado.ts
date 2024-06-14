import * as express from "express"
import { GestorPersona } from "../../capa_logica_negocio/GestorPersona";

const router = express.Router();
const gestorPersona = new GestorPersona();

router.get('/personas/:id', async (req, res) => {
  try {
    const personaId = parseInt(req.params.id);
    const persona = await gestorPersona.obtenerPersonaPorId(personaId);

    if (persona) {
      res.json(persona);
    } else {
      res.status(404).json({ message: 'Persona no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener la persona:', error);
    res.status(500).json({ message: 'Error al obtener la persona' });
  }
});

export default router;