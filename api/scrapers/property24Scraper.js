import puppeteer from 'puppeteer';

export const scrapeProperty24 = async (agentId, pageNumber = 1) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    const url = `https://www.property24.com/for-sale/agency/keller-williams-jacaranda/lisa-aphane/${agentId}/p${pageNumber}`;

    console.log(`🔄 Scraping Property24: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Extract listings
    const listings = await page.evaluate(() => {
      const items = [];
      const listingElements = document.querySelectorAll('[data-testid="listing-card"]');

      listingElements.forEach((element) => {
        try {
          const property24Id = element.getAttribute('data-listing-id');
          const priceText = element.querySelector('[data-testid="listing-price"]')?.innerText || '';
          const titleText = element.querySelector('[data-testid="listing-title"]')?.innerText || '';
          const addressText = element.querySelector('[data-testid="listing-address"]')?.innerText || '';
          const bedroomsText = element.querySelector('[data-testid="listing-beds"]')?.innerText || '0';
          const bathroomsText = element.querySelector('[data-testid="listing-baths"]')?.innerText || '0';
          const parkingText = element.querySelector('[data-testid="listing-parking"]')?.innerText || '0';
          const imageUrl = element.querySelector('img')?.src || '';
          const linkElement = element.querySelector('a');
          const property24Url = linkElement?.href || '';

          if (property24Id && priceText) {
            items.push({
              property24Id,
              price: priceText.trim(),
              title: titleText.trim(),
              location: addressText.trim(),
              bedrooms: parseInt(bedroomsText) || 0,
              bathrooms: parseInt(bathroomsText) || 0,
              parkingSpaces: parseInt(parkingText) || 0,
              mainImage: imageUrl,
              property24Url,
              abbreviated: titleText.trim(),
            });
          }
        } catch (e) {
          console.error('Error parsing listing element:', e.message);
        }
      });

      return items;
    });

    // If no listings found with testid, try alternate selector
    if (listings.length === 0) {
      console.log('⚠️  Alternate scraping method...');
      const altListings = await page.evaluate(() => {
        const items = [];
        const containers = document.querySelectorAll('[role="link"]');

        containers.forEach((element) => {
          try {
            const priceText = element.querySelector('[class*="price"]')?.innerText || '';
            if (priceText && priceText.includes('R')) {
              items.push({
                property24Id: Math.random().toString(36).substr(2, 9),
                price: priceText.trim(),
                property24Url: element.href,
                abbreviated: element.innerText.split('\n')[0],
              });
            }
          } catch (e) {
            // Silent
          }
        });

        return items;
      });
      listings.push(...altListings);
    }

    console.log(`✅ Scraped ${listings.length} listings from page ${pageNumber}`);
    return listings;
  } catch (error) {
    console.error('❌ Scraping error:', error.message);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
};

// Get total pages (for pagination support)
export const getProperty24PageCount = async (agentId) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    const url = `https://www.property24.com/for-sale/agency/keller-williams-jacaranda/lisa-aphane/${agentId}/p1`;

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    const pageCount = await page.evaluate(() => {
      const pagination = document.querySelector('[data-testid="pagination"]');
      if (!pagination) return 1;

      const pageButtons = pagination.querySelectorAll('a');
      if (pageButtons.length === 0) return 1;

      const lastButton = pageButtons[pageButtons.length - 1];
      const pageNum = parseInt(lastButton.innerText);

      return isNaN(pageNum) ? 1 : pageNum;
    });

    return pageCount || 1;
  } catch (error) {
    console.error('Error getting page count:', error.message);
    return 1;
  } finally {
    if (browser) await browser.close();
  }
};
