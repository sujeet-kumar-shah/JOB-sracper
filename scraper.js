const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
require('dotenv').config();

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

/**
 * Logs into LinkedIn using credentials from environment variables.
 * @param {object} page - Puppeteer page instance.
 */
async function loginLinkedIn(page) {
    console.log("🔑 Logging into LinkedIn...");
    await page.goto('https://www.linkedin.com/login', { waitUntil: 'networkidle2' });
    await page.type('#username', process.env.LINKEDIN_EMAIL);
    await page.type('#password', process.env.LINKEDIN_PASSWORD);
    await page.click('[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log("✅ Successfully logged in!");
}

/**
 * Scrolls through the LinkedIn feed to load more posts.
 * @param {object} page - Puppeteer page instance.
 * @param {number} scrollCount - Number of times to scroll.
 */
async function scrollFeed(page, scrollCount = 5) {
    console.log("📜 Scrolling through the LinkedIn feed...");
    for (let i = 0; i < scrollCount; i++) {
        await page.evaluate(() => window.scrollBy(0, 2000));
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
    console.log("✅ Scrolling completed.");
}

/**
 * Extracts job posts and HR contact details.
 * @param {object} page - Puppeteer page instance.
 */
async function extractJobPosts(page) {
    console.log("🔍 Extracting job posts...");
    const postElements = await page.$$('.feed-shared-update-v2');

    for (let i = 0; i < postElements.length; i++) {
        const post = postElements[i];

        try {
            // Expand post content if "See more" button exists
            const moreButton = await post.$('button[aria-label="See more"]');
            if (moreButton) {
                await moreButton.click();
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            // Take a screenshot
            const screenshotPath = `job_post_${i + 1}.png`;
            await post.screenshot({ path: screenshotPath });
            console.log(`📸 Screenshot saved: ${screenshotPath}`);

            // Extract text and find contact details
            const postText = await page.evaluate(el => el.innerText, post);
            const emailMatch = postText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
            const phoneMatch = postText.match(/\b\d{10}\b/);

            if (emailMatch) console.log(`📧 HR Email: ${emailMatch[0]}`);
            if (phoneMatch) console.log(`📞 HR Phone: ${phoneMatch[0]}`);

        } catch (err) {
            console.error(`⚠ Error processing post ${i + 1}:`, err);
        }
    }
    console.log("✅ All job posts extracted!");
}

/**
 * Main function to scrape LinkedIn job posts.
 */
async function scrapeLinkedInJobs() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

    await loginLinkedIn(page);
    await page.goto('https://www.linkedin.com/feed/hashtag/?keywords=mohalijobs', { waitUntil: 'domcontentloaded' });

    await page.waitForSelector('.feed-shared-update-v2', { timeout: 20000 });
    console.log("📢 Job posts page loaded!");

    await scrollFeed(page);
    await extractJobPosts(page);

    await browser.close();
    console.log("🚀 Scraper finished successfully!");
}

scrapeLinkedInJobs();
