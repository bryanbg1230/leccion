import {conmysql} from '../db.js'
export const getClientesMed=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from tb_cliente ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar clientes"})
        }
    }
    


export const getclientesMedxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from tb_cliente where cli_cedula=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Cliente no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}
export const postClienteMed=
async (req,res)=>{
    try {
        //console.log(req.body)
        const {cli_nombres, cli_apellidos, cli_estado}=req.body
        //console.log(cli_nombre)
        const [rows]=await conmysql.query('insert into tb_cliente (cli_nombres, cli_apellidos, cli_estado) values(?,?,?)',
            [cli_nombres, cli_apellidos, cli_estado])

        res.send({
            id:rows.insertId
        })
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}
export const putClienteMed=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {cli_nombres, cli_apellidos, cli_estado}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update tb_cliente set cli_nombres=?, cli_apellidos=?, cli_estado=? where cli_cedula=?',
            [cli_nombres, cli_apellidos, cli_estado, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Cliente no encontrado'
        })
        const[rows]=await conmysql.query('select * from tb_cliente where cli_cedula=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchClienteMed=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {cli_nombres, cli_apellidos, cli_estado}=req.body
        console.log(cli_nombre)
        const [result]=await conmysql.query('update tb_cliente set cli_nombres=IFNULL(?,cli_nombres), cli_apellidos=IFNULL(?,cli_apellidos), cli_estado=IFNULL(?,cli_estado) where cli_cedula=?',
            [cli_nombres, cli_apellidos, cli_estado, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Cliente no encontrado'
        })
        const[rows]=await conmysql.query('select * from tb_cliente where cli_cedula=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteClienteMed=
async(req,res)=>{
    try {
        //const {miid}=req.params
        const [rows]=await conmysql.query(' delete from tb_cliente where cli_cedula=?',[req.params.id])
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