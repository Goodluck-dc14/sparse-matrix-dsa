// utils.js
const fs = require("fs");

function readMatrixFromFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  return content;
}

function writeMatrixToFile(matrix, filePath) {
  const lines = [
    `rows=${matrix.rows}`,
    `cols=${matrix.cols}`,
    ...matrix.getAllEntries().map(([r, c, v]) => `(${r}, ${c}, ${v})`),
  ];
  fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
}

module.exports = { readMatrixFromFile, writeMatrixToFile };
