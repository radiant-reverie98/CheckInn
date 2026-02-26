import express from "express"
import { ownerRegister,ownerLogin,ownerLogout, checkSession, guestRegister } from "../controllers/owner/auth.controllers.js";
import verifyToken from "../middlewares/verifyToken.middlewares.js";
import verifyRole from "../middlewares/verifyRole.middlewares.js";
const router = express.Router();


router.post("/registerOwner",ownerRegister)
router.post("/loginOwner",ownerLogin)
router.post("/logoutOwner",verifyToken,verifyRole('OWNER'),ownerLogout)
router.post(`/registerGuest`,guestRegister)
router.get('/checkSession',checkSession)
export default router;