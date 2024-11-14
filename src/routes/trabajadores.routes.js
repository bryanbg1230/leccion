import { Router } from "express";
import {
    getTrabajadores, 
    gettrabajadoresxid,
    postTrabajador,
    putTrabajador,
    patchTrabajador,
    deleteTrabajador
} from '../controladores/trabajadoresCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/trabajadores', getTrabajadores)  //select
router.get('/trabajadores/:id',gettrabajadoresxid)  //select x id
router.post('/trabajadores',postTrabajador)  //insert
router.put('/trabajadores/:id',putTrabajador)  //update
router.patch('/trabajadores/:id',patchTrabajador)  //update
router.delete('/trabajadores/:id',deleteTrabajador)  //delete

export default router