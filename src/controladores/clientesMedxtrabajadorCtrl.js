import { getClientesMed, getclientesMedxid } from '../controladores/clientesMedCtrl.js';  // Modelo de cliente
import Medidor from '../controladores/medidoresCtrl.js';  // Modelo de medidor
import RutaAsignada from '../controladores/rutaasignadaCtrl.js';  // Modelo de ruta asignada


export const getclientesxtrabajador = 
async (req, res) => {
  try {
    const { tra_cedula } = req.params;

    // Obtener los medidores asignados a este trabajador
    const rutaAsignada = await RutaAsignada.findAll({
      where: { tra_cedula }
    });

    if (rutaAsignada.length === 0) {
      return res.status(404).json({ mensaje: 'Este trabajador no tiene medidores asignados.' });
    }

    // Obtener las cédulas de los clientes asociados a esos medidores
    const medidores = await Medidor.findAll({
      where: { med_id: rutaAsignada.map(r => r.med_id) }
    });

    const clientes = await Cliente.findAll({
      where: { cli_cedula: medidores.map(m => m.cli_cedula), cli_estado: 'A' }
    });

    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los clientes.', error });
  }
};
