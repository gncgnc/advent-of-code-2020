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
  return x >= 0 && x < board.length && y >= 0 && y < board[0].length;
}

function getNeighbors(cx, cy, board) {
  let surroundingIdxs = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) continue;
      surroundingIdxs.push({ x: cx + i, y: cy + j });
    }
  }
  return surroundingIdxs.filter(isInBounds).map(({ x, y }) => board[x][y]);
}

function updateCell(x, y, board) {
  const s = board[x][y];
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

function updateCell2(x, y, board) {
  const s = board[x][y];
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
  let visible = surroundingDirs.map(({ x: dx, y: dy }) => {
    let x = cx + dx;
    let y = cy + dy;

    let seen;
    while (isInBounds({ x, y }, board) && seen !== "L" && seen !== "#") {
      seen = board[x][y];
      x += dx;
      y += dy;
    }
    return { dx, dy, seen };
  });

  return visible;
}

function tick(board) {
  let newBoard = board.map((row) => {
    return row.map((cell) => cell);
  });

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      let newState = updateCell(i, j, board);
      newBoard[i][j] = newState;
    }
  }

  return newBoard;
}

function run(inputFile) {
  let input = readFileSync(inputFile, "utf-8");

  input = `.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....
`;
  let board = input.split("\n").map((line) => {
    let row = [...line];
    row.pop();
    return row;
  });
  board.pop();

  console.log(board);
  console.log("________");
  return getVisible(4, 3, board);

  //// PART 1 ////
  // let renderedBoard = renderBoard(board);
  // let oldRenderedBoard = null;

  // while (renderedBoard !== oldRenderedBoard) {
  //   console.log(renderedBoard);
  //   console.log("___________");
  //   oldRenderedBoard = renderedBoard;
  //   board = tick(board);
  //   renderedBoard = renderBoard(board);
  // }

  // console.log("done");

  // return [...renderedBoard].filter((c) => c === "#").length;
  ////////////////
}

console.log(run("11-input.txt"));
