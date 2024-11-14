import {conmysql} from '../db.js'
export const getConsumos=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from tb_consumo ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar consumos"})
        }
    }
    


export const getconsumosxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from tb_consumo where con_id=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Consumo no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}
export const postConsumo=
async (req,res)=>{
    try {
        //console.log(req.body)
        const {med_id, mes, anio, consumo, longitudToma, latitudToma}=req.body
        //console.log(cli_nombre)
        const [rows]=await conmysql.query('insert into tb_consumo (med_id, mes, anio, consumo, longitudToma, latitudToma) values(?,?,?,?,?,?)',
            [med_id, mes, anio, consumo, longitudToma, latitudToma])

        res.send({
            id:rows.insertId
        })
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}
export const putConsumo=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {med_id, mes, anio, consumo, longitudToma, latitudToma}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update tb_consumo set med_id=?, mes=?, anio=?, consumo=?, longitudToma=?, latitudToma=? where con_id=?',
            [med_id, mes, anio, consumo, longitudToma, latitudToma, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Consumo no encontrado'
        })
        const[rows]=await conmysql.query('select * from tb_consumo where con_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchConsumo=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {med_id, mes, anio, consumo, longitudToma, latitudToma}=req.body
        console.log(cli_nombre)
        const [result]=await conmysql.query('update tb_consumo set med_id=IFNULL(?,med_id), mes=IFNULL(?,mes), anio=IFNULL(?,anio), consumo=IFNULL(?,consumo), longitudToma=IFNULL(?,longitudToma), latitudToma=IFNULL(?,latitudToma) where con_id=?',
            [med_id, mes, anio, consumo, longitudToma, latitudToma, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Consumo no encontrado'
        })
        const[rows]=await conmysql.query('select * from tb_consumo where con_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteConsumo=
async(req,res)=>{
    try {
        //const {miid}=req.params
        const [rows]=await conmysql.query(' delete from tb_consumo where con_id=?',[req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message: "No pudo eliminar el consumo"
        })
        //res.sendStatus(202) ----el que tenia
        return res.status(200).json({
          message: "Consumo eliminado correctamente"
        });  // Agregado
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
    }
}