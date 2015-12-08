'use strict';

const CrawlKit = require('crawlkit');
const A11yDeveloperToolsRunner = require('crawlkit-runner-accessibility-developer-tools');

const crawler = new CrawlKit('http://www.google.com');
crawler.addRunner('a11y-dev-tools', new A11yDeveloperToolsRunner());

/* eslint-disable no-console */
crawler.crawl()
    .then((data) => {
        console.log(JSON.stringify(data.results, true, 2));
    }, (err) => console.error(err));
