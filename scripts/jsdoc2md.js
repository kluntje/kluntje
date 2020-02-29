const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');

const renderReadme = async(templatePath) => {
  const template = fs.readFileSync(templatePath, {encoding: "UTF-8"});
  const renderReadme = await jsdoc2md.render({ files: './packages/js-utils/lib/**/*.js' });
  const rederedReadme =  template.replace("{%body%}", renderReadme);
  fs.writeFileSync("./packages/js-utils/README.md", rederedReadme, {encoding: "UTF-8"});
}

renderReadme("./packages/js-utils/README.template.md");