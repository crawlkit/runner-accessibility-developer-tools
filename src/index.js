'use strict'; // eslint-disable-line
const path = require('path');

class A11yDeveloperToolsRunner {
    getCompanionFiles() {
        return [
            // ah, the things your eyes have seen now...
            path.join(__dirname, 'amd.undefine.js'),
            require.resolve(path.join('accessibility-developer-tools', 'dist', 'js', 'axs_testing.js')),
            path.join(__dirname, 'amd.redefine.js'),
        ];
    }

    /* global axs:false */
    getRunnable() {
        /*eslint-disable */
        return function axsRunner() {
            var results = axs.Audit.run();
            window.callPhantom(null, axs.Audit.auditResults(results));
        };
        /*eslint-enable */
    }
}
module.exports = A11yDeveloperToolsRunner;
