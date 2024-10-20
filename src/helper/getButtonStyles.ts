import { Page } from 'puppeteer';

export const getPrimaryButtonStyles = async (page: Page) => {
  return page.evaluate(() => {
    const button = document.querySelector('form[action*="/cart/add"] button');
    if (button) {
      const computedStyles = window.getComputedStyle(button);
      const styles: { [key: string]: string } = {};
      
      // Iterate through all properties in the computed styles
      for (let i = 0; i < computedStyles.length; i++) {
        const property = computedStyles[i];
        styles[property] = computedStyles.getPropertyValue(property);
      }

      return styles;
    }
    return null;
  });
};
