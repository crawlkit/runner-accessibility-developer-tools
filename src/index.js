'use strict'; // eslint-disable-line
const path = require('path');

class A11yDeveloperToolsRunner {
    getCompanionFiles() {
        return [
            // ah, the things your eyes have seen now...
            path.join(__dirname, 'amd.undefine.js'),
            require.resolve(path.join('accessibility-developer-tools', 'dist', 'js', 'axs_testing.js')),
            require.resolve(path.join('html-context', 'dist', 'index.js')),
            path.join(__dirname, 'amd.redefine.js'),
        ];
    }

    getRunnable() {
        /* global axs:false, htmlContext:false */
        /* eslint-disable no-var, vars-on-top, no-console, object-shorthand */
        return function axsRunner() {
            var configuration = new axs.AuditConfiguration();
            configuration.showUnsupportedRulesWarning = false;
            var results = axs.Audit.run(configuration);

            /**
            * @param line {!String} The error line, something like: "Warning: ERROR_CODE (Description) failed on the following element:\nhtml\nSee https://link for more information
            */
            function parseError(line) {
                var lines = line.split('\n');
                var matches = lines.shift().match(/^.+?: ([A-Z0-9_]+) \((.*)\) failed on the following element.+$/);
                var urlMatches = lines.pop().match(/^See (.*) for more information\.$/);

                var ret = {
                    code: matches[1],
                    elements: lines.map(function selectorToContext(selector) {
                        var context = null;
                        if (selector) {
                            var domElement = document.querySelector(selector);
                            if (domElement instanceof window.HTMLElement) {
                                try {
                                    context = htmlContext(domElement, { maxLength: 255 });
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        }
                        return {
                            selector: selector,
                            context: context,
                        };
                    }),
                    msg: matches[2],
                    helpUrl: urlMatches[1],
                };
                return ret;
            }

            function reformat(res) {
                if (!res) {
                    return res;
                }

                return {
                    errors: res.errors_.map(parseError),
                    warnings: res.warnings_.map(parseError),
                };
            }

            window.callPhantom(null, reformat(axs.Audit.auditResults(results)));
        };
    }
}
module.exports = A11yDeveloperToolsRunner;
