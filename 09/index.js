const { readFileSync } = require("fs");

function run(inputFile) {
  const input = readFileSync(inputFile, "utf-8");
  const nums = input.split("\n").map((n) => parseInt(n, 10));
  nums.pop();

  function findNonSumNum(nums, preambleLen) {
    return nums.find((n, i) => {
      if (i<preambleLen) return false
      return !isSumOfTwo(n, nums.slice(i - preambleLen, i));
    });
  }

  function isSumOfTwo(num, numArray) {
    for (let i = 0; i < numArray.length; i++) {
      for (let j = i + 1; j < numArray.length; j++) {
        if (numArray[i] + numArray[j] === num) return true;
      }
    }
    return false;
  }

  let nonSumNum = findNonSumNum(nums,25);
  console.log(nonSumNum);
  //// PART 1 ////
  // return nonSumNum
  let start, end;
  for (start=0; start<nums.length-1; start++) {
    end = start + 1;
    let sum = nums[start];
    let found = false;
    while (sum < nonSumNum) {
      sum += nums[end];
      if (sum === nonSumNum) {
        found = true;
        break;
      }
      end++;
    }
    if (found) break;
  }

  console.log(nums[start], nums[end])
  let range = nums.slice(start, end+1)
  return Math.min(...range) + Math.max(...range)

}

console.log(run("9-input.txt"));
