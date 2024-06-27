import { Request, Response, Router } from 'express';
import { GestorPersona } from "../../capa_logica_negocio/GestorPersona";
import { GestorCliente } from "../../capa_logica_negocio/GestorCliente";
import { GestorFotos } from "../../capa_logica_negocio/GestorFotos";
import { Persona } from '../../capa_acceso_datos/Persona';

const router: Router = Router();
const gestorPersona: GestorPersona = new GestorPersona();
const gestorFotos: GestorFotos = new GestorFotos();
const gestorCliente: GestorCliente = new GestorCliente();


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

router.post('/subir_foto', 
async (req: Request, res: Response) => {
  try {
    const fileName: string = req.headers['x-file-name'] as string;
    const idCliente: string = req.headers['id-clienteseleccionado'] as string;
    const descripcionFoto: string = req.headers['descripcion-foto'] as string;

    const fileBuffer: Buffer = req.body as Buffer;
    const imagenBin = fileBuffer.toString('base64');
    await gestorFotos.guardarFotoEnDB(imagenBin, descripcionFoto, "A", Number(idCliente));


    res.json({ message: 'Archivo subido exitosamente', fileName });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    res.status(500).json({ message: 'Error al subir el archivo' });
  }
});

router.post('/buscar_cliente', async (req: Request, res: Response) => {
  try {
    const { ci } = req.body;
    const cliente = await gestorCliente.obtenerPersonaPorCi(ci);

    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    console.error('Error al buscar el cliente:', error);
    res.status(500).json({ message: 'Error al buscar el cliente' });
  }
});


export default router;