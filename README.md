# Google Chrome Accessibility Developer Tools runner for CrawlKit

This runner can be used with [CrawlKit]() in order to audit a website with the [Google Chrome Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools).

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
    });
```

This project is in no way affiliated with Google, Inc.
