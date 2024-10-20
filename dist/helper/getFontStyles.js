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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFontStyles = void 0;
const getFontStyles = (page) => __awaiter(void 0, void 0, void 0, function* () {
    return page.evaluate(() => {
        const fonts = [];
        // Get all elements in the document
        const elements = document.querySelectorAll('*');
        const foundFontUrls = new Set();
        elements.forEach((element) => {
            const computedStyle = window.getComputedStyle(element);
            const fontFamily = computedStyle.fontFamily;
            const fontWeight = computedStyle.fontWeight;
            const letterSpacing = computedStyle.letterSpacing;
            // Add fonts to the array
            if (fontFamily) {
                const fontObj = {
                    family: fontFamily.replace(/['"]/g, ''), // Clean up quotes
                    fontWeight: fontWeight || 'normal',
                    letterSpacing: letterSpacing || 'normal',
                };
                if (!fonts.some(f => f.family === fontObj.family && f.fontWeight === fontObj.fontWeight)) {
                    fonts.push(fontObj);
                }
            }
        });
        const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'));
        linkTags.forEach((link) => {
            const fontUrl = link.getAttribute('href') || '';
            if (fontUrl.includes('fonts.googleapis.com')) {
                foundFontUrls.add(fontUrl);
            }
        });
        return fonts.map((font) => (Object.assign(Object.assign({}, font), { url: Array.from(foundFontUrls).join(', ') || " " })));
    });
});
exports.getFontStyles = getFontStyles;
