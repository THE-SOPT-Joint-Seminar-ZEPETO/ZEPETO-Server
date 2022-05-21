//router index file
import { Router } from "express";
import FeedRouter from "./FeedRouter";
import ImageRouter from "./ImageRouter";

const router: Router = Router();

router.use("/feed", FeedRouter);
router.use("/images", ImageRouter);

export default router;
