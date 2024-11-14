import {conmysql} from '../db.js'
export const getRutas=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from tb_rutaasignada ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar rutas asignadas"})
        }
    }
    


export const getrutasxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from tb_rutaasignada where ruta_id=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Ruta asignada no encontrada"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}
export const postRuta=
async (req,res)=>{
    try {
        //console.log(req.body)
        const {med_id, tra_cedula}=req.body
        //console.log(cli_nombre)
        const [rows]=await conmysql.query('insert into tb_rutaasignada (med_id, tra_cedula) values(?,?)',
            [med_id, tra_cedula])

        res.send({
            id:rows.insertId
        })
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}
export const putRuta=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {med_id, tra_cedula}=req.body
        console.log(cli_nombre)
        const [result]=await conmysql.query('update tb_rutaasignada set med_id=?, tra_cedula=? where ruta_id=?',
            [med_id, tra_cedula, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Ruta asignada no encontrada'
        })
        const[rows]=await conmysql.query('select * from tb_rutaasignada where ruta_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchRuta=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {med_id, tra_cedula}=req.body
        console.log(cli_nombre)
        const [result]=await conmysql.query('update tb_rutaasignada set med_id=IFNULL(?,med_id), tra_cedula=IFNULL(?,tra_cedula) where ruta_id=?',
            [med_id, tra_cedula, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Ruta asignada no encontrada'
        })
        const[rows]=await conmysql.query('select * from tb_rutaasignada where ruta_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteRuta=
async(req,res)=>{
    try {
        //const {miid}=req.params
        const [rows]=await conmysql.query(' delete from tb_rutaasignada where ruta_id=?',[req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message: "No pudo eliminar la ruta asignada"
        })
        //res.sendStatus(202) ----el que tenia
        return res.status(200).json({
          message: "Ruta asignada eliminada correctamente"
        });  // Agregado
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
    }
}