import {conmysql} from '../db.js'
export const getTrabajadores=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from tb_trabajador ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar trabajadores"})
        }
    }
    


export const gettrabajadoresxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from tb_trabajador where tra_cedula=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Trabajador no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}
export const postTrabajador=
async (req,res)=>{
    try {
        //console.log(req.body)
        const {tra_nombres, tra_apellidos, tra_estado}=req.body
        //console.log(cli_nombre)
        const [rows]=await conmysql.query('insert into tb_trabajador (tra_nombres, tra_apellidos, tra_estado) values(?,?,?)',
            [tra_nombres, tra_apellidos, tra_estado])

        res.send({
            id:rows.insertId
        })
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}
export const putTrabajador=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {tra_nombres, tra_apellidos, tra_estado}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update tb_trabajador set tra_nombres=?, tra_apellidos=?, tra_estado=? where tra_cedula=?',
            [tra_nombres, tra_apellidos, tra_estado, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Trabajador no encontrado'
        })
        const[rows]=await conmysql.query('select * from tb_trabajador where tra_cedula=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchTrabajador=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {tra_nombres, tra_apellidos, tra_estado}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update tb_trabajador set tra_nombres=IFNULL(?,tra_nombres), tra_apellidos=IFNULL(?,tra_apellidos), tra_estado=IFNULL(?,tra_estado) where tra_cedula=?',
            [tra_nombres, tra_apellidos, tra_estado, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Cliente no encontrado'
        })
        const[rows]=await conmysql.query('select * from tb_trabajador where tra_cedula=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteTrabajador=
async(req,res)=>{
    try {
        //const {miid}=req.params
        const [rows]=await conmysql.query(' delete from tb_trabajador where tra_cedula=?',[req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message: "No pudo eliminar el trabajador"
        })
        //res.sendStatus(202) ----el que tenia
        return res.status(200).json({
          message: "Trabajador eliminado correctamente"
        });  // Agregado
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
    }
}