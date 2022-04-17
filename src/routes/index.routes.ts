import { Router } from 'express'
import { createClient, getAllClients, getAverageClientsAge } from '../controllers/index.controller'

const router = Router();

router.route('/')
      .get(getAllClients)
      .post(createClient)

router.route('/avgAge')
      .get(getAverageClientsAge)

export default router;