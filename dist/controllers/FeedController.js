"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const util_1 = __importDefault(require("../modules/util"));
const FeedService_1 = __importDefault(require("../services/FeedService"));
const uploadFileToS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file)
        return res.status(statusCode_1.default.BAD_REQUEST).send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.NULL_VALUE));
    const fileData = req.file;
    const { content } = req.body;
    try {
        const data = yield FeedService_1.default.uploadFileToS3(fileData, content);
        res.status(statusCode_1.default.CREATED).send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_FILE_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
/**
 * @route POST /feed
 * @desc Upload Feed
 */
const uploadFeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file)
        return res.status(statusCode_1.default.BAD_REQUEST).send(util_1.default.fail(statusCode_1.default.BAD_REQUEST, responseMessage_1.default.NULL_VALUE));
    const feedImage = req.file; // 이미지 파일
    const feedCreateDto = req.body; // 피드 내용
    try {
        const data = yield FeedService_1.default.uploadFeed(feedImage, feedCreateDto);
        res.status(statusCode_1.default.CREATED).send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.CREATE_FEED_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
/**
 * @route GET /feed
 * @desc GET Feed
 */
const getFeedByRandom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield FeedService_1.default.getFeedByRandom();
        if (!data) {
            res.status(statusCode_1.default.NOT_FOUND).send(util_1.default.fail(statusCode_1.default.NOT_FOUND, responseMessage_1.default.NOT_FOUND));
        }
        res.status(statusCode_1.default.CREATED).send(util_1.default.success(statusCode_1.default.CREATED, responseMessage_1.default.GET_FEED_SUCCESS, data));
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).send(util_1.default.fail(statusCode_1.default.INTERNAL_SERVER_ERROR, responseMessage_1.default.INTERNAL_SERVER_ERROR));
    }
});
exports.default = {
    uploadFileToS3,
    uploadFeed,
    getFeedByRandom
};
//# sourceMappingURL=FeedController.js.map