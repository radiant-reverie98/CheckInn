import express from "express"

import {getTopThreeHotels} from "../../controllers/guest/fetchHotels.js"
const router = express.Router()

router.get(`/getTopHotels`,getTopThreeHotels)

export default router;