import express from "express"
import verifyToken from "../middlewares/verifyToken.middlewares.js";
import verifyRole from "../middlewares/verifyRole.middlewares.js"
import { upload } from "../middlewares/multer.middlewares.js";
import { getHotelAmenities, getHotelTypes,createHotel } from "../controllers/owner/hotelCreate.controllers.js";
const router = express.Router();

router.get('/hotel-types',getHotelTypes)
router.get('/hotel-amenities',getHotelAmenities)
router.post('/hotel-create',verifyToken,verifyRole('OWNER'),upload.array("photos",10),createHotel)
export default router;