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
const puppeteer_1 = __importDefault(require("puppeteer"));
const getFontStyles_1 = require("./helper/getFontStyles");
const getButtonStyles_1 = require("./helper/getButtonStyles");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/test", (req, res) => {
    res.status(200).json({ status: "Scraping Server is Working" });
});
app.post('/scrape', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        return res.status(400).send({ error: 'URL is required' });
    }
    try {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.goto(url, { waitUntil: 'networkidle2' });
        const fonts = yield (0, getFontStyles_1.getFontStyles)(page);
        const primaryButton = yield (0, getButtonStyles_1.getPrimaryButtonStyles)(page);
        yield browser.close();
        return res.json({ fonts, primaryButton });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Something went wrong' });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
