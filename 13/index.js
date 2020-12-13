const { readFileSync } = require("fs");

function run(inputFile) {
  let [earliest, busIds] = readFileSync(inputFile, "utf-8").split("\n");
  busIds = busIds.split(",").filter((s) => s !== "x");

  function part1() {
    const earliestBus = getEarliestBus(earliest, busIds);
    return (earliestBus.timestamp - earliest) * earliestBus.id;
  }
  return part1();
}

function getEarliestBus(earliestTime, busIds) {
  let departures = busIds.map((id) => {
    return Math.floor(earliestTime / id + 1) * id;
  });
  let earliestDeparture = Math.min(...departures);
  return {
    timestamp: earliestDeparture,
    id: busIds[departures.findIndex((t) => t === earliestDeparture)],
  };
}

console.log(run("13-input.txt"));
