const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');

const renderReadme = async templatePath => {
  const template = fs.readFileSync(templatePath, { encoding: 'UTF-8' });
  const renderReadme = await jsdoc2md.render({
    files: './packages/js-utils/src/**/*.ts',
    configure: './jsdoc2md.json',
    helper: ["./scripts/jsdoc2md/helpers/groupStart.js"],
    partial: ["./scripts/jsdoc2md/partials/global-index-dl.hbs"],
  });
  const renderedReadme = template.replace('{%body%}', renderReadme);
  fs.writeFileSync('./packages/js-utils/README.md', renderedReadme, { encoding: 'UTF-8' });
};

renderReadme('./packages/js-utils/README.template.md');
