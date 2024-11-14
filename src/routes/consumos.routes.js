import { Router } from "express";
import {
    getConsumos, 
    getconsumosxid,
    postConsumo,
    putConsumo,
    patchConsumo,
    deleteConsumo
} from '../controladores/consumosCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/consumos', getConsumos)  //select
router.get('/consumos/:id',getconsumosxid)  //select x id
router.post('/consumos',postConsumo)  //insert
router.put('/consumos/:id',putConsumo)  //update
router.patch('/consumos/:id',patchConsumo)  //update
router.delete('/consumos/:id',deleteConsumo)  //delete

export default router