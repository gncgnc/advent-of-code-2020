const { readFileSync } = require("fs");

function run(inputFile) {
  const input = readFileSync(inputFile, "utf-8");
  const instructions = input.split("\n");
  instructions.pop();

  function parseInstruction(instruction) {
    return instruction.split(" ");
  }

  function runInstruction(program, [op, arg]) {
    let { pc, acc } = program;
    switch (op) {
      case "jmp":
        pc += parseInt(arg);
        break;
      case "acc":
        acc += parseInt(arg);
        pc++;
        break;
      case "nop":
        pc++;
      default:
    }

    program.pc = pc;
    program.acc = acc;
  }

  let prg = {
    pc: 0,
    acc: 0,
  };

  //// PART 1 ////
  let alreadyRan = new Set();
  while (true) {
    let { pc, acc } = prg;
    if (alreadyRan.has(pc)) break;
    alreadyRan.add(pc);

    console.log(`${pc}: ${instructions[pc]};    # acc = ${acc}`);
    runInstruction(prg, parseInstruction(instructions[pc]));
  }

  console.log(prg.acc);
  // return prg.acc;

//// Part 2 ////

  let finalAcc = 0;
  for (let i=0; i<instructions.length; i++) {
    let [op, arg] = parseInstruction(instructions[i]);
    if (op === "nop") continue;
    console.log(`switching inst. ${i}`);
    let prg = {
      pc: 0,
      acc: 0,
    };

    let alreadyRan = new Set();
    while (true) {
      let { pc, acc } = prg;
      if (alreadyRan.has(pc)) break;
      alreadyRan.add(pc);
      
      if (pc === instructions.length) {
        finalAcc = acc;
        break;
      }

      if (pc > instructions.length || pc < 0) break;
      let [op, arg] = parseInstruction(instructions[pc]);
      if (i === pc) {
        if (op === "jmp") op = "nop"
        else if (op === "nop") op = "jmp"
      }

      runInstruction(prg, [op, arg]);  
    }

    if (finalAcc) break;
  }

  return finalAcc
}

console.log(run("8-input.txt"));
