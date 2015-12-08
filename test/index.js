'use strict'; // eslint-disable-line
const path = require('path');
const pkg = require('../package.json');
const A11yDeveloperToolsRunner = require(path.join(__dirname, '..', pkg.main));
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const CrawlKit = require('crawlkit');
const freeport = require('freeport');
const httpServer = require('http-server');

chai.should();
chai.use(chaiAsPromised);

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

    it('should be able to audit a website', () => {
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
        return crawler.crawl().should.eventually.deep.equal({ results });
    });

    it('should work on a website with require', () => {
        const amdUrl = `${url}/amd.html`;
        const crawler = new CrawlKit(amdUrl);
        crawler.addRunner('a11y-dev-tools', new A11yDeveloperToolsRunner());

        const results = {};
        results[amdUrl] = {
            runners: {
                'a11y-dev-tools': {
                    result: require(path.join(__dirname, 'fixtures/results/index.json')),
                },
            },
        };
        return crawler.crawl().should.eventually.deep.equal({ results });
    });
});
