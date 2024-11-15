import {conmysql} from '../db.js'
export const getMedidores=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from tb_medidor ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar clientes"})
        }
    }
    


export const getmedidoresxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from tb_medidor where med_id=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Cliente no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}

export const getmedidorxcedula = 
async (req, res) => {
    try {
        const { cedula } = req.params;
        console.log("Buscando medidor para cliente con cédula:", cedula); // Log para verificar la cédula recibida
        const [result] = await conmysql.query('SELECT * FROM tb_medidor WHERE cli_cedula = ?', [cedula]);
        if (result.length === 0) {
            console.log("No se encontró medidor para la cédula:", cedula); // Log para casos sin resultados
            return res.status(404).json({ message: "No se encontró un medidor para el cliente con esa cédula" });
        }
        console.log("Medidor encontrado:", result[0]); // Log para verificar el resultado obtenido
        //res.json(result[0]);   devuelve un valor y es el primer valor que devuelve
        res.json(result);   //devuelve todo lo que este relacionado
    } catch (error) {
        console.error("Error al buscar medidor por cédula:", error); // Log para errores
        return res.status(500).json({ message: "Error del lado del servidor" });
    }
};

export const postMedidor=
async (req,res)=>{
    try {
        //console.log(req.body)
        const {cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado}=req.body
        //console.log(cli_nombre)
        const [rows]=await conmysql.query('insert into tb_medidor (cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado) values(?,?,?,?,?)',
            [cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado])

        res.send({
            id:rows.insertId
        })
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}
export const putMedidor=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update tb_medidor set cli_cedula=?, med_num_medidor=?, med_longitud=?, med_latitud=?, med_estado=? where med_id=?',
            [cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Cliente no encontrado'
        })
        const[rows]=await conmysql.query('select * from clientes where med_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchMedidor=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update tb_medidor set cli_cedula=IFNULL(?,cli_cedula), med_num_medidor=IFNULL(?,med_num_medidor), med_longitud=IFNULL(?,med_longitud), med_latitud=IFNULL(?,med_latitud), med_estado=IFNULL(?,med_estado) where med_id=?',
            [cli_cedula, med_num_medidor, med_longitud, med_latitud, med_estado, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Cliente no encontrado'
        })
        const[rows]=await conmysql.query('select * from tb_medidor where med_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteMedidor=
async(req,res)=>{
    try {
        //const {miid}=req.params
        const [rows]=await conmysql.query(' delete from tb_medidor where med_id=?',[req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message: "No pudo eliminar el cliente"
        })
        //res.sendStatus(202) ----el que tenia
        return res.status(200).json({
          message: "Cliente eliminado correctamente"
        });  // Agregado
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
    }
}
