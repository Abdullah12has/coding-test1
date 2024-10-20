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
        const fontLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'));
        fontLinks.forEach((link) => {
            const fontUrl = link.getAttribute('href') || '';
            if (fontUrl.includes('fonts.googleapis.com')) {
                const styleSheet = document.styleSheets;
                for (let i = 0; i < styleSheet.length; i++) {
                    try {
                        const rules = styleSheet[i].cssRules;
                        for (let rule of rules) {
                            if (rule instanceof CSSFontFaceRule) {
                                fonts.push({
                                    family: rule.style.fontFamily,
                                    variants: rule.style.fontWeight || '400',
                                    letterSpacings: rule.style.letterSpacing || 'normal',
                                    fontWeight: rule.style.fontWeight,
                                    url: fontUrl,
                                });
                            }
                        }
                    }
                    catch (err) {
                        console.error(err);
                    }
                }
            }
        });
        return fonts;
    });
});
exports.getFontStyles = getFontStyles;
