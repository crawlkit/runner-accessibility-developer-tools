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

    getRunnable() {
        /* global axs:false */
        /* eslint-disable no-var, vars-on-top */
        return function axsRunner() {
            var configuration = new axs.AuditConfiguration();
            configuration.showUnsupportedRulesWarning = false;
            var results = axs.Audit.run(configuration);
            window.callPhantom(null, axs.Audit.auditResults(results));
        };
    }
}
module.exports = A11yDeveloperToolsRunner;
