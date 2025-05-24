// matrixOperations.js
function addMatrices(A, B) {
  if (A.rows !== B.rows || A.cols !== B.cols) {
    throw new Error("Matrix dimensions must match for addition.");
  }
  const result = new A.constructor(A.rows, A.cols);
  for (const [row, col, val] of [...A.getAllEntries(), ...B.getAllEntries()]) {
    const current = result.getElement(row, col);
    result.setElement(row, col, current + val);
  }
  return result;
}

function subtractMatrices(A, B) {
  if (A.rows !== B.rows || A.cols !== B.cols) {
    throw new Error("Matrix dimensions must match for subtraction.");
  }
  const result = new A.constructor(A.rows, A.cols);
  for (const [row, col, val] of A.getAllEntries()) {
    result.setElement(row, col, val);
  }
  for (const [row, col, val] of B.getAllEntries()) {
    const current = result.getElement(row, col);
    result.setElement(row, col, current - val);
  }
  return result;
}

function multiplyMatrices(A, B) {
  if (A.cols !== B.rows) {
    throw new Error("A.cols must equal B.rows for multiplication.");
  }
  const result = new A.constructor(A.rows, B.cols);

  for (const [i, k, valA] of A.getAllEntries()) {
    const bRowEntries = B.getRowEntries(k); // only non-zero in B’s row k

    for (const [_, j, valB] of bRowEntries) {
      const existing = result.getElement(i, j);
      result.setElement(i, j, existing + valA * valB);
    }
  }
  return result;
}

module.exports = { addMatrices, subtractMatrices, multiplyMatrices };
