// main.js
const readline = require("readline");
const SparseMatrix = require("./SparseMatrix");
const { readMatrixFromFile, writeMatrixToFile } = require("./utils");
const {
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
} = require("./matrixOperations");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

(async () => {
  try {
    const operation = await prompt(
      "Choose operation (add, subtract, multiply): "
    );
    const file1 = await prompt("Enter path to first matrix file: ");
    const file2 = await prompt("Enter path to second matrix file: ");

    const matrix1 = SparseMatrix.fromFileContent(readMatrixFromFile(file1));
    const matrix2 = SparseMatrix.fromFileContent(readMatrixFromFile(file2));

    let result;
    if (operation === "add") {
      result = addMatrices(matrix1, matrix2);
      writeMatrixToFile(result, "./output/result_add.txt");
    } else if (operation === "subtract") {
      result = subtractMatrices(matrix1, matrix2);
      writeMatrixToFile(result, "./output/result_subtract.txt");
    } else if (operation === "multiply") {
      result = multiplyMatrices(matrix1, matrix2);
      writeMatrixToFile(result, "./output/result_multiply.txt");
    } else {
      console.log("Invalid operation.");
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    rl.close();
  }
})();
