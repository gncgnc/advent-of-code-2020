const { readFileSync } = require("fs");

function run(inputFile) {
  const input = readFileSync(inputFile, "utf-8");
  const nums = input.split("\n").map((n) => parseInt(n, 10));
  nums.pop();

  nums.push(0);
  nums.sort((a, b) => a - b);
  //nums.push(Math.max(...nums) + 3);

  let d1 = 0;
  let d3 = 0;
  nums.forEach((n, i) => {
    if (i === 0) return;

    let prev = nums[i - 1];
    let d = n - prev;

    if (d === 1) d1 += 1;
    else if (d === 3) d3 += 1;
  });

  //// PART 1 ////
  console.log(d1, d3);
  // return d1 * d3;
  ///////////////

  // let memo = {};
  // function countWays(nums, start, memo) {
  //   if (memo[start]) return memo[start];
  //   let ways = 0;

  //   if (start > nums.length - 3) {
  //     ways = 1;
  //   } else if (start === nums.length - 3) {
  //     let n0 = nums[start];
  //     // let n1 = nums[start+1];
  //     let n2 = nums[start + 2];
  //     if (n2 - n0 <= 3) ways = 2;
  //     else ways = 1;
  //   } else {
  //     let f = (s) => countWays(nums, s, memo);
  //     ways = f(start + 1) + f(start + 2) + f(start + 3);
  //   }

  //   memo[start] = ways;
  //   return ways;

  // let numWays = countWays(nums, 0, memo);
  // console.log(memo, nums)
  // return numWays

  let start = 0;
  let seq = [];
  let numWays = 0;

  function countWays2(idx, nums, seq) {
    if (idx > nums.length-3) {
      // console.log(...seq);
      if (numWays % 100_000_000 === 0) console.log(numWays) 
      numWays++;
      return true;
    }

    let n0 = nums[idx];
    let n1 = nums[idx + 1];
    let n2 = nums[idx + 2];
    let n3 = nums[idx + 3];

    // seq.push(n1);
    countWays2(idx + 1, nums, seq);
    // seq.pop();

    if (n2 - n0 <= 3) {
      // seq.push(n2);
      countWays2(idx + 2, nums, seq);
      // seq.pop();
    }

    if (n3 - n0 <= 3) {
      // seq.push(n3);
      countWays2(idx + 3, nums, seq);
      // seq.pop();
    }
  }

  countWays2(0, nums)
  return numWays
}

console.log(run("10-sample.txt"));
