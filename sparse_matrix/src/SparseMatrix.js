// SparseMatrix.js
class SparseMatrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = {}; // Use "row,col" as key, value as the number
  }

  static fromFileContent(content) {
    const lines = content.trim().split("\n").filter(Boolean);
    let rows = 0,
      cols = 0;
    const matrix = new SparseMatrix(0, 0);

    lines.forEach((line, index) => {
      line = line.trim();
      if (line.startsWith("rows=")) {
        rows = parseInt(line.split("=")[1]);
        matrix.rows = rows;
      } else if (line.startsWith("cols=")) {
        cols = parseInt(line.split("=")[1]);
        matrix.cols = cols;
      } else {
        if (!line.match(/^\(\d+,\s*\d+,\s*-?\d+\)$/)) {
          throw new Error("Input file has wrong format");
        }
        const [r, c, v] = line
          .slice(1, -1)
          .split(",")
          .map((s) => parseInt(s.trim()));
        matrix.setElement(r, c, v);
      }
    });

    return matrix;
  }

  getElement(row, col) {
    const key = `${row},${col}`;
    return this.data[key] ?? 0;
  }

  setElement(row, col, value) {
    const key = `${row},${col}`;
    if (value !== 0) {
      this.data[key] = value;
    } else {
      delete this.data[key];
    }
  }

  getAllEntries() {
    return Object.entries(this.data).map(([key, val]) => {
      const [row, col] = key.split(",").map(Number);
      return [row, col, val];
    });
  }
  getRowEntries(row) {
    return this.getAllEntries().filter(([r, c, v]) => r === row);
  }
}

module.exports = SparseMatrix;
