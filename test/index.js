'use strict'; // eslint-disable-line
const A11yDeveloperToolsRunner = require('../');
const chai = require('chai');
const CrawlKit = require('crawlkit');
const freeport = require('freeport');
const httpServer = require('http-server');
const path = require('path');

chai.should();

describe('Google Chrome Accessibility Developer Tools runner', function main() {
    this.timeout(60 * 1000); // auditing can take a while
    let server;
    let url;
    let port;
    const host = '0.0.0.0';

    before((done) => {
        freeport((err, p) => {
            if (err) {
                throw err;
            }
            port = p;
            server = httpServer.createServer({
                root: path.join(__dirname, 'fixtures', 'website'),
            });
            server.listen(port);
            url = `http://${host}:${port}`;
            done();
        });
    });

    after(() => {
        server.close();
    });

    it('should be able to audit a website', (done) => {
        const crawler = new CrawlKit(url);
        crawler.addRunner('a11y-dev-tools', new A11yDeveloperToolsRunner());

        const results = {};
        results[`${url}/`] = {
            runners: {
                'a11y-dev-tools': {
                    result: require(path.join(__dirname, 'fixtures/results/index.json')),
                },
            },
        };
        crawler.crawl().then((result) => {
            result.should.deep.equal({results});
            done();
        });
    });
});
