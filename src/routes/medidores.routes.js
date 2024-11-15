import { Router } from "express";
import {
    getMedidores, 
    getmedidoresxid,
    getmedidorxcedula,
    postMedidor,
    putMedidor,
    patchMedidor,
    deleteMedidor
} from '../controladores/medidoresCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/medidores', getMedidores)  //select
router.get('/medidores/:id',getmedidoresxid)  //select x id
router.get('/medidores/:cedula', getmedidorxcedula);  //select x cedula
router.post('/medidores',postMedidor)  //insert
router.put('/medidores/:id',putMedidor)  //update
router.patch('/medidores/:id',patchMedidor)  //update
router.delete('/medidores/:id',deleteMedidor)  //delete

export default router
