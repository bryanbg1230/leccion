import { Router } from "express";
import {
    getclientesxtrabajador
} from '../controladores/clientesMedxtrabajadorCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/trabajadoresxced/:cedula',getclientesxtrabajador)  //select x id

export default router
