import express from "express"
import verifyToken from "../middlewares/verifyToken.middlewares.js"
import verifyRole from "../middlewares/verifyRole.middlewares.js"
import { createRoom, fetchAllRooms, fetchRoomInfo, updateRoom } from "../controllers/owner/room.controllers.js"
import {upload} from "../middlewares/multer.middlewares.js"

const router = express.Router();

router.post(`/users/rooms/create-room`,verifyToken,verifyRole('OWNER'),upload.array("photos",10),createRoom)
router.put(`/users/rooms/update-room`,verifyToken,verifyRole('OWNER'),upload.array("photos",10),updateRoom)
router.get(`/users/rooms/fetchRoom/:roomId`,verifyToken,verifyRole('OWNER'),fetchRoomInfo)
router.get(`/users/rooms/fetchAllRooms/:hotelId`,verifyToken,verifyRole('OWNER'),fetchAllRooms)
export default router
