import { Page } from 'puppeteer';

export const getFontStyles = async (page: Page) => {
    return page.evaluate(() => {
      const fonts: any[] = [];
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
            } catch (err) {
              console.error(err);
            }
          }
        }
      });
      return fonts;
    });
  };