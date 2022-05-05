const path = require("path");
let lastGroupName = "";

// helper to find the first entry for each js-utils submodule
exports.groupStart = function groupStart(options) {
  // use always posix paths
  const filePath = this.meta.path.split(path.sep).join(path.posix.sep);
  // first directory name after js-utils/src
  const groupName = filePath.split("packages/js-utils/src/")[1].split("/")[0];

  if (groupName !== lastGroupName) {
    lastGroupName = groupName;

    return options.fn(groupName);
  }
  return options.inverse(this);;
}
