import { Router } from "express";
import { FeedController } from "../controllers";
import multer from "multer";
import { multerConfig } from "../config/multerConfig";

const router: Router = Router();

const upload = multer(multerConfig);

router.post("/", upload.single("image"), FeedController.uploadFileToS3);

export default router;
