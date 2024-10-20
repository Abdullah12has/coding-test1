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
exports.getPrimaryButtonStyles = void 0;
const getPrimaryButtonStyles = (page) => __awaiter(void 0, void 0, void 0, function* () {
    return page.evaluate(() => {
        const button = document.querySelector('form[action*="/cart/add"] button');
        if (button) {
            const computedStyles = window.getComputedStyle(button);
            const styles = {};
            // Iterate through all properties in the computed styles
            for (let i = 0; i < computedStyles.length; i++) {
                const property = computedStyles[i];
                styles[property] = computedStyles.getPropertyValue(property);
            }
            return styles;
        }
        return null;
    });
});
exports.getPrimaryButtonStyles = getPrimaryButtonStyles;
