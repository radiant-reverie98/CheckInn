import express from "express"
import { fetchRoomType } from "../controllers/owner/roomUtils.controllers.js";
const router = express.Router();

router.get('/users/fetch_room_type',fetchRoomType)

export default router;