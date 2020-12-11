const { readFileSync } = require("fs");

function renderBoard(board) {
  let txt = "";
  board.forEach((row) => {
    row.forEach((cell) => {
      txt += cell;
    });
    txt += "\n";
  });
  return txt;
}

function isInBounds({ x, y }, board) {
  return y >= 0 && y < board.length && x >= 0 && x < board[0].length;
}

function updateCell(x, y, board) {
  const s = board[y][x];
  const neighbors = getNeighbors(x, y, board);

  var numOccupied = neighbors.reduce((sum, cell) => {
    return cell === "#" ? sum + 1 : sum;
  }, 0);

  if (s === "L" && numOccupied === 0) {
    return "#";
  } else if (s === "#" && numOccupied >= 4) {
    return "L";
  } else {
    return s;
  }
}

function getNeighbors(cx, cy, board) {
  let surroundingIdxs = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) continue;
      surroundingIdxs.push({ x: cx + i, y: cy + j });
    }
  }
  return surroundingIdxs
    .filter((idxs) => isInBounds(idxs, board))
    .map(({ x, y }) => board[y][x]);
}

function updateCell2(x, y, board) {
  const s = board[y][x];
  const neighbors = getVisible(x, y, board);

  var numOccupied = neighbors.reduce((sum, cell) => {
    return cell === "#" ? sum + 1 : sum;
  }, 0);

  if (s === "L" && numOccupied === 0) {
    return "#";
  } else if (s === "#" && numOccupied >= 5) {
    return "L";
  } else {
    return s;
  }
}

function getVisible(cx, cy, board) {
  let surroundingDirs = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) continue;
      surroundingDirs.push({ x: i, y: j });
    }
  }
  let validDirs = surroundingDirs.filter(({ x: dx, y: dy }) => {
    return isInBounds({ x: cx + dx, y: cy + dy }, board);
  });
  let visible = validDirs.map(({ x: dx, y: dy }) => {
    let x = cx + dx;
    let y = cy + dy;

    let seen;
    while (isInBounds({ x, y }, board) && seen !== "L" && seen !== "#") {
      seen = board[y][x];
      x += dx;
      y += dy;
    }
    return seen;
  });

  return visible;
}

function tick(board, updateCell) {
  let newBoard = board.map((row) => {
    return row.map((cell) => cell);
  });

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[0].length; x++) {
      let newState = updateCell(x, y, board);
      newBoard[y][x] = newState;
    }
  }

  return newBoard;
}

function run(inputFile) {
  let input = readFileSync(inputFile, "utf-8");

  let board = input.split("\n").map((line) => {
    let row = [...line].filter((c) => c !== "\r");
    return row;
  });
  board.pop();

  //// PART 1 ////
  // let renderedBoard = renderBoard(board);
  // let oldRenderedBoard = null;

  // let i = 0;
  // while (i < 10 || renderedBoard !== oldRenderedBoard) {
  //   console.log(renderedBoard);
  //   console.log("___________");
  //   oldRenderedBoard = renderedBoard;
  //   board = tick(board, updateCell);
  //   renderedBoard = renderBoard(board);
  //   i++;
  // }

  // console.log("done");

  ////////////////

  //// PART 2 ////
  let renderedBoard = renderBoard(board);
  let oldRenderedBoard = null;

  let i = 0;
  while (renderedBoard !== oldRenderedBoard) {
    console.log(renderedBoard);
    console.log("___________");
    oldRenderedBoard = renderedBoard;
    board = tick(board, updateCell2);
    renderedBoard = renderBoard(board);
    i++;
  }

  console.log("done");
  console.log(renderedBoard);
  /////////////////

  return [...renderedBoard].filter((c) => c === "#").length;
}

console.log(run("11-input.txt"));
