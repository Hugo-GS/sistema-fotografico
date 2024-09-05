import { Request, Response, Router } from 'express';
import { GestorPersona } from "../../capa_logica_negocio/GestorPersona";
import { GestorCliente } from "../../capa_logica_negocio/GestorCliente";
import { GestorFotos } from "../../capa_logica_negocio/GestorFotos";
import { Persona } from '../../capa_acceso_datos/Persona';
import { Foto } from '../../capa_acceso_datos/Fotos';
import { GestorImpresion } from '../../capa_logica_negocio/GestorImpresion';

const router: Router = Router();
const gestorPersona: GestorPersona = new GestorPersona();
const gestorFotos: GestorFotos = new GestorFotos();
const gestorCliente: GestorCliente = new GestorCliente();
const gestorImpresion = new GestorImpresion();


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

router.post('/buscar_cliente', 
async (req: Request, res: Response) => {
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

router.get('/fotosCliente/:ci', async (req: Request, res: Response) => {
  try {
    const ciCliente: string = req.params.ci;
    const fecha: string | undefined = req.query.fecha as string;
    console.log(fecha)
    let fotosCliente: Foto[];
    if (fecha) {
      const fechaDate = new Date(fecha);
      fotosCliente = await gestorFotos.obtenerFotosCliente(Number(ciCliente), fechaDate);
    } else {
      fotosCliente = await gestorFotos.obtenerFotosCliente(Number(ciCliente));
    }

    // Convertir las imágenes a Base64
    const fotosClienteFormatted = fotosCliente.map(foto => ({
      ...foto,
      imagen_bin: foto.imagen_bin.toString()
    }));

    res.json(fotosClienteFormatted);
  } catch (error) {
    console.error('Error al traer las fotos:', error);
    res.status(500).json({ message: 'Error al traer las fotos' });
  }
});

router.post('/realizarServicio', 
async (req: Request, res: Response) => {
  try {
    const { idServicio, idsFotos, idCliente, idEncargado, totalGeneral, precioServicio } = req.body;
    if (!idServicio || !idsFotos || !idCliente || !idEncargado || !totalGeneral) {
      return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    await gestorImpresion.realizarServicio(idServicio, idsFotos, idCliente, idEncargado, totalGeneral, precioServicio);
    res.json({ message: 'Servicio realizado exitosamente' });
  } catch (error) {
    console.error('Error al realizar el servicio:', error);
    res.status(500).json({ message: 'Error al realizar el servicio' });
  }
});



export default router;