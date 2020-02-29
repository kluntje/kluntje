const jsdoc2md = require('jsdoc-to-markdown');

jsdoc2md.render({ files: 'packages/js-utils/lib/**/*.js' }).then(console.log);