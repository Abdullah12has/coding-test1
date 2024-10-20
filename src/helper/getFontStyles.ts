import { Page } from 'puppeteer';

export const getFontStyles = async (page: Page) => {
  return page.evaluate(() => {
    const fonts: any[] = [];

    // Get all elements in the document
    const elements = document.querySelectorAll('*');
    const foundFontUrls: Set<string> = new Set();

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

    return fonts.map((font) => ({
      ...font,
      url: Array.from(foundFontUrls).join(', ') || " "
    }));
  });
};
