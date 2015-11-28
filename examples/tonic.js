/* eslint-disable no-console */
const CrawlKit = require('crawlkit');
const A11yDeveloperToolsRunner = require('crawlkit-runner-accessibility-developer-tools');

const crawler = new CrawlKit('http://www.google.com');
crawler.addRunner('a11y-dev-tools', new A11yDeveloperToolsRunner());

crawler.crawl()
    .then((data) => {
        console.log(JSON.stringify(data.results, true, 2));
    });
