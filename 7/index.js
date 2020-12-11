const { readFileSync } = require("fs");

function parseRule(rule) {
  let [_, color, contentRule] = rule.match(/(.+) bags? contain (.+)./);
  let contentStrings = contentRule.split(",");
  let children;
  if (contentStrings[0] === "no other bags") {
    children = [];
  } else {
    children = contentStrings.map((s) => s.trim()).map(parseContent);
  }
  return { color, children };
}

function parseContent(s) {
  match = s.trim().match(/\s*(\d+) (.+) bags?/);
  // console.log("s: "+s+" -- match: "+match)
  let [_, number, contentColor] = match;

  return { color: contentColor, number };
}

function findParents(color, rules) {
  return rules
    .filter((r) => r.children.some((child) => child.color === color))
    .map((p) => p.color);
}

function numInnerBags(color, rules) {
  let rule = rules.find((r) => r.color === color);
  if (rule.children.length === 0) return 1;

  let numInner = rule.children.reduce((acc, child) => {
    return acc + child.number * numInnerBags(child.color, rules);
  }, 1);
  return numInner;
}

function run(inputFile) {
  const input = readFileSync(inputFile, "utf-8");
  const rulesStrings = input.split("\n");
  rulesStrings.pop();

  let rules = rulesStrings.map(parseRule);

  //// Part 1 ////
  let newAncestors = findParents("shiny gold", rules);
  let ancestors = new Set(newAncestors);

  while (newAncestors.length !== 0) {
    let currAncestors = [...newAncestors];
    newAncestors = [];
    currAncestors.forEach((p) => {
      let grandParents = findParents(p, rules);

      grandParents.forEach((gp) => {
        if (!ancestors.has(gp)) newAncestors.push(gp);
        ancestors.add(gp);
      });
    });
  }

  // console.log(JSON.stringify([...ancestors], null, 2));
  // return ancestors.size;
  //// END Part 1 ////

  // Part 2
  return numInnerBags("shiny gold", rules) - 1;
}

console.log(run("./7-sample.txt"));
