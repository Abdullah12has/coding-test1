# Shopify Scraper API

Thank you for taking out the time to check out my code.


### Testing if API is working properly
```python
GET  localhost:3000/test
# This endpoint will return the health status of the server.
```

### Scraper POST request
```python
POST  localhost:3000/scrape
#This endpoint scrapes font styles and primary button styles from a Shopify product page.
```


```python
Request Method: POST
URL: /scrape
Body: JSON object containing the Shopify product page URL.
Example request body:
```

```json
{
  "url": "https://growgrows.com/en-us/products/plentiful-planets-sleepsuit"
}
```

Response
The API will return a JSON object containing the scraped font styles and primary button styles. Example response:

```json
{
  "fonts": [{
    "family": "Helvetica",
    "variants": "400",
    "letterSpacings": "0.01em",
    "fontWeight": "400",
    "url": "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
  }],
  "primaryButton": {
    "fontFamily": "Helvetica",
    "fontSize": "16px",
    "lineHeight": "1.5",
    "letterSpacing": "0.01em",
    "textTransform": "uppercase",
    "textDecoration": "underline",
    "textAlign": "left",
    "backgroundColor": "#000",
    "color": "#fff",
    "borderColor": "#000",
    "borderWidth": "1px",
    "borderRadius": "4px"
  }
}
```
