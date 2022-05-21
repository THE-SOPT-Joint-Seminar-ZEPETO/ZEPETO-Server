import { Router } from "express";
import { FeedController } from "../controllers";
import multer from "multer";
import { multerConfig } from "../config/multerConfig";

const router: Router = Router();

const upload = multer(multerConfig);

//router.post("/", upload.single("image"), FeedController.uploadFileToS3);
router.post("/", upload.single("image"), FeedController.uploadFeed);
router.get("/", FeedController.getFeedByRandom);

export default router;
