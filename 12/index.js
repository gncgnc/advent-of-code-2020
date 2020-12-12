const { readFileSync } = require("fs");

function run(inputFile) {
  let input = readFileSync(inputFile, "utf-8");
  let instructions = input.split("\n").map(parseInstruction);
  instructions.pop();

  let dirs = {
    N: { x: 0, y: 1 },
    S: { x: 0, y: -1 },
    E: { x: 1, y: 0 },
    W: { x: -1, y: 0 },
  };

  function part1() {
    let pos = { x: 0, y: 0 };
    let dir = "E";
    let dirsOrdered = ["E", "N", "W", "S"];

    instructions.forEach(([inst, num]) => {
      switch (inst) {
        case "N":
        case "S":
        case "E":
        case "W":
          pos.x += num * dirs[inst].x;
          pos.y += num * dirs[inst].y;
          break;
        case "F":
          pos.x += num * dirs[dir].x;
          pos.y += num * dirs[dir].y;
          break;
        case "L": {
          let idx = dirsOrdered.findIndex((d) => d === dir);
          let newIdx = (idx + num / 90) % 4;
          dir = dirsOrdered[newIdx];
          break;
        }
        case "R": {
          let idx = dirsOrdered.findIndex((d) => d === dir);
          let newIdx = (idx - num / 90 + 4) % 4;
          dir = dirsOrdered[newIdx];
          break;
        }
      }
      console.log(dir, pos, inst, num);
    });

    return Math.abs(pos.x) + Math.abs(pos.y);
  }
  // return part1();

  function part2() {
    let pos = { x: 0, y: 0 };
    let waypoint = { x: 10, y: 1 };

    const rotate90L = ({ x, y }) => ({ x: -y, y: x });
    const rotate90R = ({ x, y }) => ({ x: y, y: -x });

    instructions.forEach(([inst, num]) => {
      switch (inst) {
        case "N":
        case "S":
        case "E":
        case "W":
          waypoint.x += num * dirs[inst].x;
          waypoint.y += num * dirs[inst].y;
          break;
        case "F":
          pos.x += num * waypoint.x;
          pos.y += num * waypoint.y;
          break;
        case "L": {
          for (let i = 0; i < num / 90; i++) waypoint = rotate90L(waypoint);
          break;
        }
        case "R": {
          for (let i = 0; i < num / 90; i++) waypoint = rotate90R(waypoint);
          break;
        }
      }
      console.log(waypoint, pos, inst, num);
    });

    return Math.abs(pos.x) + Math.abs(pos.y);
  }

  return part2();
}

function parseInstruction(instruction) {
  return [instruction.substring(0, 1), instruction.substring(1)];
}

console.log(run("./12-input.txt"));
