const {join} = require('path');
// console.log('TRYING TO FETCH BROWSER')
// let revisionInfo = await browserFetcher.download('884014');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
 // cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  executablePath: '/tmp/hiteshkr759-starter-nestjs/.cache/puppeteer/chrome/linux-118.0.5993.70',
  headless: 'new',
 // downloadBaseUrl : 'https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing',
  //args:  ["--no-sandbox", "--disabled-setupid-sandbox"],
};