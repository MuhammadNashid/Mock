import { Router } from "express";

import * as rh from './requestHandler.js'
import Auth from "./middle/Auth.js";

const router=Router();

router.route('/adduser').post(rh.adduser)
router.route('/login').post(rh.login)
router.route('/home').get(Auth,rh.Home)
router.route('/get').get(Auth,rh.getdata)
router.route('/add').post(Auth,rh.adddata)
router.route('/edit').put(Auth,rh.editdata)
router.route('/delete').delete(Auth,rh.deleteData)
export default router;