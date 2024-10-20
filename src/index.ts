import puppeteer from 'puppeteer';
import { getFontStyles } from './helper/getFontStyles';
import { getPrimaryButtonStyles } from './helper/getButtonStyles';
import express, { Express, Request, Response } from "express";


const app: Express = express();
app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
    res.status(200).json({ status: "Scraping Server is Working" });
  });

app.post('/scrape', async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send({ error: 'URL is required' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    const fonts = await getFontStyles(page);
    const primaryButton = await getPrimaryButtonStyles(page);

    await browser.close();

    return res.json({ fonts, primaryButton });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
