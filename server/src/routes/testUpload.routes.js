import express from "express"
import { testUpload } from "../controllers/owner/testUpload.controllers.js"
import { upload } from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.post(
  "/test-upload",
  upload.array("photos", 10),
  testUpload
);

export default router;