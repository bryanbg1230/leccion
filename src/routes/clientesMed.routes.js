import { Router } from "express";
import {
    getClientesMed, 
    getclientesMedxid,
    postClienteMed,
    putClienteMed,
    patchClienteMed,
    deleteClienteMed
} from '../controladores/clientesMedCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/clientesmed', getClientesMed)  //select
router.get('/clientesmed/:id',getclientesMedxid)  //select x id
router.post('/clientesmed',postClienteMed)  //insert
router.put('/clientesmed/:id',putClienteMed)  //update
router.patch('/clientesmed/:id',patchClienteMed)  //update
router.delete('/clientesmed/:id',deleteClienteMed)  //delete

export default router