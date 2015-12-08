# Google Chrome Accessibility Developer Tools runner
[![Build status](https://img.shields.io/travis/crawlkit/runner-accessibility-developer-tools/master.svg)](https://travis-ci.org/crawlkit/runner-accessibility-developer-tools)
[![npm](https://img.shields.io/npm/v/crawlkit-runner-accessibility-developer-tools.svg)](https://www.npmjs.com/package/crawlkit-runner-accessibility-developer-tools)
[![npm](https://img.shields.io/npm/l/crawlkit-runner-accessibility-developer-tools.svg)]()
[![David](https://img.shields.io/david/crawlkit/runner-accessibility-developer-tools.svg)]()
[![node](https://img.shields.io/node/v/crawlkit-runner-accessibility-developer-tools.svg)]()

This runner can be used with [CrawlKit](https://github.com/crawlkit/crawlkit) in order to audit a website with the [Google Chrome Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools).

## Install
```console
npm install crawlkit-runner-accessibility-developer-tools --save
```

## Example
```javascript
const CrawlKit = require('crawlkit');
const A11yDeveloperToolsRunner = require('crawlkit-runner-accessibility-developer-tools');

const crawler = new CrawlKit('http://your/page');
// You could add a finder here in order to audit a whole network of pages
crawler.addRunner('a11y-dev-tools', new A11yDeveloperToolsRunner());

crawler.crawl()
    .then((data) => {
        console.log(JSON.stringify(data.results, true, 2));
    }, (err) => console.error(err));
```

This project is in no way affiliated with Google, Inc.
