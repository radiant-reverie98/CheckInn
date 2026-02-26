import express from "express"
import verifyToken from "../middlewares/verifyToken.middlewares.js"
import verifyRole from "../middlewares/verifyRole.middlewares.js"
import { updateLastSelectedHotel,hotelForNavbar, profileSettings,updateProfileSettings, hotelSettings,updateHotelSettings, updatePassword } from "../controllers/owner/hotelUtils.controllers.js";
const router = express.Router();

router.patch('/users/last-hotel',verifyToken,verifyRole('OWNER'),updateLastSelectedHotel)

router.get('/users/fetchHotels',verifyToken,verifyRole('OWNER'),hotelForNavbar)
router.get('/users/settings/profileInfo',verifyToken,verifyRole('OWNER'),profileSettings)
router.put('/users/settings/updateProfileInfo',verifyToken,verifyRole('OWNER'),updateProfileSettings)
router.get('/users/settings/hotelInfo/:hotelId',verifyToken,verifyRole('OWNER'),hotelSettings)
router.put('/users/settings/hotelUpdate/:hotelId',verifyToken,verifyRole('OWNER'),updateHotelSettings)
router.put('/users/settings/updatePassword',verifyToken,verifyRole('OWNER'),updatePassword)
export default router;
