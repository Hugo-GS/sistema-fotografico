import { Request, Response, Router } from 'express';
import { GestorServicio } from '../../capa_logica_negocio/GestorServicio';
import { GestorPersona } from '../../capa_logica_negocio/GestorPersona';
import { GestorImpresion } from '../../capa_logica_negocio/GestorImpresion';

const router: Router = Router();
const gestorServicio = new GestorServicio();
const gestorPersona = new GestorPersona();
const gestorImpresion = new GestorImpresion();

function vista(nombreVista: string): string{
  return `vistas_admin/${nombreVista}`
}
function componente(nombreComponente: string): string{
  return `vistas_admin/componentes_html/${nombreComponente}`
}

router.get('/', 
async (req: Request, res: Response) => {
  return  res.render(vista('index'));
});

router.get('/view_panel_principal', 
async (req: Request, res: Response) => {
  return  res.render(componente('panel-principal'));
});

router.get('/view_cargar_fotos', 
async (req: Request, res: Response) => {
  return  res.render(componente('cargar-foto'));
});

router.get('/view_cargar_fotos', 
async (req: Request, res: Response) => {
  return  res.render(componente('cargar-foto'));
});

router.get('/view_buscador_fotos', 
async (req: Request, res: Response) => {
  const impresion = await gestorImpresion.obtenerImpresionesConValor();
      
  return  res.render(componente('gestor-busqueda-fotos'), {impresion});
});

router.get('/registrar_servicio_fotografico', async (req: Request, res: Response) => {
  return res.render(componente('registroserviciofotografico'));
});

router.post('/registrar_servicio_fotografico', async (req: Request, res: Response) => {
  const estado = 'A';
  const { nombre, descripcionDetalleProducto , precio } = req.body;
  
  try {
    await gestorImpresion.crearImpresion(nombre, descripcionDetalleProducto, estado, precio);
    return res.redirect('/sistemaAdmin/?estado=ok');
  } catch (error) {
    console.error("Error al crear servicio fotográfico: ", error);
    return res.redirect('/sistemaAdmin/?estado=error');
  }
});

router.get('/registrar_servicio_fotografico', async (req: Request, res: Response) => {
  return res.render(componente('registroserviciofotografico'));
});

router.post('/registrar_servicio_fotografico', async (req: Request, res: Response) => {
  const estado = 'A';
  const { nombre, descripcionDetalleProducto , precio } = req.body;

  try {
    await gestorImpresion.crearImpresion(nombre, descripcionDetalleProducto, estado, precio);
    return res.redirect('/sistemaAdmin/?estado=ok');
  } catch (error) {
    console.error("Error al crear servicio fotográfico: ", error);
    return res.redirect('/sistemaAdmin/?estado=error');
  }
});

router.get('/registrar_servicio', async (req: Request, res: Response) => {
  return res.render(componente('registroservicio'));
});

router.post('/registrar_servicio', async (req: Request, res: Response) => {
  const { concepto, valor } = req.body;

  try {
    await gestorServicio.crearServicio(concepto, parseFloat(valor));
    return res.redirect('/sistemaAdmin/?estado=ok');
  } catch (error) {
    console.error("Error al crear servicio: ", error);
    return res.redirect('/sistemaAdmin/?estado=error');
  }

});

router.get('/registrar_cliente', 
async (req: Request, res: Response) => {
  return  res.render(componente('registrocliente'));
});

router.post('/registrar_cliente', async (req: Request, res: Response) => {
  const { nombre, apellido_paterno, apellido_materno,ci } = req.body;
  
  try {
    await gestorPersona.crearPersona(nombre, apellido_paterno, apellido_materno,ci);
    return res.redirect('/sistemaAdmin/?estado=ok');
  } catch (error) {
    console.error("Error al crear cliente: ", error);
    return res.redirect('/sistemaAdmin/?estado=error');
  }

});

router.get('/verImpresiones', async (req: Request, res: Response) => {
  try {
      const impresion = await gestorImpresion.obtenerImpresionesConValor();

      res.render(componente('listaImpresiones'), { impresion });      
  } catch (error) {
      console.error('Error al obtener las impresiones: ', error);
      res.status(500).send('Error al obtener las impresiones');
  }
});

router.get('/verClientes', async (req: Request, res: Response) => {
  try {
      const cliente = await gestorPersona.obtenerTodosLosClientes(); 
      
      res.render(componente('listaClientes'), { cliente });
  } catch (error) {
      console.error('Error al obtener los clientes: ', error);
      res.status(500).send('Error al obtener los clientes');
  }
});

router.get('/editar_impresion/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const datosEditar = await gestorImpresion.obtenerImpresionporId(Number(id));
    if (!datosEditar) {
      return res.status(404).send('Impresión no encontrada');
    }
    res.render(componente('modificarimpresion'), { datosEditar: datosEditar[0] });
  } catch (error) {
    console.error('Error al obtener la impresión para editar:', error);
    return res.status(500).send('Error interno del servidor');
  }
});

router.post('/editar_impresion/:id', async (req: Request, res: Response) => {
  const { id,nombre, descripcionDetalleProducto, estado, valor } = req.body;
  const idimpresion = req.params.id;
  try {
    await gestorImpresion.actualizarDatosImpresion(Number(id), nombre, descripcionDetalleProducto, estado, valor);
    return res.redirect('/sistemaAdmin/#/GestorServicios/verImpresiones');
  } catch (error) {
    console.error("Error al actualizar impresión:", error);
    return res.redirect('/sistemaAdmin/verImpresiones?estado=error');
  }
});

router.get('/editar_cliente/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const datosEditar = await gestorPersona.obtenerPersonaporId(Number(id));

    if (!datosEditar) {
      return res.status(404).send('Cliente no encontrada');
    }

    res.render(componente('modificarcliente'), { datosEditar: datosEditar[0] });
  } catch (error) {
    console.error('Error al obtener la impresión para editar:', error);
    return res.status(500).send('Error interno del servidor');
  }
});

router.post('/editar_cliente/:id', async (req: Request, res: Response) => {
  const { id,nombre, apellido_paterno, apellido_materno,ci } = req.body;
  const idcliente = req.params.id;
  try {
    await gestorPersona.actualizardatosPersona(Number(id),nombre, apellido_paterno, apellido_materno,ci);
    return res.redirect('/sistemaAdmin/#/GestorClientes/verClientes');
  } catch (error) {
    console.error("Error al actualizar impresión:", error);
    return res.redirect('/sistemaAdmin/verClientes/?estado=error');
  }
});

export default router;
