import express from "express"
import { ownerRegister,ownerLogin,ownerLogout, checkSession, guestRegister, isUser, guestLogin } from "../controllers/owner/auth.controllers.js";
import verifyToken from "../middlewares/verifyToken.middlewares.js";
import verifyRole from "../middlewares/verifyRole.middlewares.js";
const router = express.Router();


router.post("/registerOwner",ownerRegister)
router.post("/loginOwner",ownerLogin)
router.post("/logoutOwner",verifyToken,verifyRole('OWNER'),ownerLogout)
router.post(`/registerGuest`,guestRegister)
router.post('/loginGuest',guestLogin)
router.get('/checkSession',checkSession)
router.get('/auth/me',verifyToken,verifyRole('GUEST'),isUser)
export default router;