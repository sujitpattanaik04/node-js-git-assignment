const fs = require("fs");

const readAndMergeFiles = function () {
  let file1 = JSON.parse(fs.readFileSync("./a.json", "utf-8"));
  let file2 = JSON.parse(fs.readFileSync("./b.json", "utf-8"));
  let file3 = JSON.parse(fs.readFileSync("./c.json", "utf-8"));

  let mergedFile = JSON.stringify([file1, ...file2, file3]);

  fs.writeFileSync("mergedFile.json", mergedFile);
};

readAndMergeFiles();
