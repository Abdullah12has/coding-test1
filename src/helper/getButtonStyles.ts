import { Page } from 'puppeteer';

export const getPrimaryButtonStyles = async (page: Page) => {
  return page.evaluate(() => {
    const button = document.querySelector('form[action*="/cart/add"] button');
    if (button) {
      const computedStyles = window.getComputedStyle(button);
      return {
        fontFamily: computedStyles.fontFamily,
        fontSize: computedStyles.fontSize,
        lineHeight: computedStyles.lineHeight,
        letterSpacing: computedStyles.letterSpacing,
        textTransform: computedStyles.textTransform,
        textDecoration: computedStyles.textDecoration,
        textAlign: computedStyles.textAlign,
        backgroundColor: computedStyles.backgroundColor,
        color: computedStyles.color,
        borderColor: computedStyles.borderColor,
        borderWidth: computedStyles.borderWidth,
        borderRadius: computedStyles.borderRadius,
      };
    }
    return null;
  });
};
