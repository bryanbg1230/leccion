import { Router } from "express";
import {
    getRutas, 
    getrutasxid,
    postRuta,
    putRuta,
    patchRuta,
    deleteRuta
} from '../controladores/rutaasignadaCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/rutas', getRutas)  //select
router.get('/rutas/:id',getrutasxid)  //select x id
router.post('/rutas',postRuta)  //insert
router.put('/rutas/:id',putRuta)  //update
router.patch('/rutas/:id',patchRuta)  //update
router.delete('/rutas/:id',deleteRuta)  //delete

export default router