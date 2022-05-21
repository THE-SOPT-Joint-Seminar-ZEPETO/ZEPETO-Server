"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//router index file
const express_1 = require("express");
const FeedRouter_1 = __importDefault(require("./FeedRouter"));
const ImageRouter_1 = __importDefault(require("./ImageRouter"));
const router = (0, express_1.Router)();
router.use("/feed", FeedRouter_1.default);
router.use("/images", ImageRouter_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map