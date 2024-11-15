import { conmysql } from '../db.js';

export const getclientesxtrabajador = async (req, res) => {
    try {
        const { cedula } = req.params;
        console.log("Cédula recibida:", cedula); // Aquí debería mostrar la cédula recibida, como "1"

        // Realizamos la consulta a la base de datos
        const [result] = await conmysql.query(`
            SELECT DISTINCT c.cli_cedula, c.cli_nombres, c.cli_apellidos, c.cli_estado
            FROM tb_cliente AS c
            JOIN tb_medidor AS m ON c.cli_cedula = m.cli_cedula
            JOIN tb_rutaasignada AS r ON m.med_id = r.med_id
            WHERE r.tra_cedula = ? AND c.cli_estado = 'A';
        `, [cedula]);

        // Log para ver qué está devolviendo la consulta
        console.log("Resultado de la consulta:", result); // Aquí debería mostrar los clientes si existen.

        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontraron clientes asignados a este trabajador." });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Error al consultar clientes por trabajador:", error);
        return res.status(500).json({ message: "Error del servidor.", error });
    }
};
