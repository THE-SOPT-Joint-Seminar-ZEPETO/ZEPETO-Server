import { Router } from "express";
import { ImageController } from "../controllers";

const router: Router = Router();

router.get("/", ImageController.getImages);

export default router;
