import express from "express"
import { fetchAvailableRooms, fetchHotelDetail, getHotelCards } from "../../controllers/guest/fetchHotels.js"

const router = express.Router()

router.get('/fetchHotels',getHotelCards)
router.get('/hotelInfo/:hotelId',fetchHotelDetail)
router.get('/roomDetails/:hotelId',fetchAvailableRooms)

export default router;