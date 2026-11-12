declare function require(name: string): {
  readFileSync(file: number, encoding: string): string;
};

const { readFileSync } = require('node:fs');

function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;

  let k = 1;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[j - 1]) {
      nums[k] = nums[j];
      k++;
    }
  }
  return k;
}

function secondLargest(arr: number[]): number | null {

  let largest = -Infinity;
  let secondLargest = -Infinity;

  for (const num of arr) {
    if (num > largest) {
      secondLargest = largest;
      largest = num
    } else if (num > secondLargest && num < largest) {
      secondLargest = num;
    }
  }

  return secondLargest === -Infinity ? null : secondLargest;
}
interface Employee {
  id: number;
  name: string;
}
const employees: Employee[] = [
  { id: 1, name: 'Varun' },
  { id: 2, name: 'rahul' },
  { id: 3, name: 'varun updated' },
  { id: 1, name: 'Varun' },
  { id: 2, name: 'rahul' },
  { id: 3, name: 'arun' }
];

function removeDuplicatesByID(employees: Employee[]): Employee[] {
  const seen = new Set<number>();

  return employees.filter(employee => {
    if (seen.has(employee.id)) {
      return false;
    }

    seen.add(employee.id);
    return true;
  });
}

function findDuplicates(arr: number[]): number[] {
  const seen = new Set<number>();
  const duplicates = new Set<number>();

  for (const num of arr) {
    if (seen.has(num)) {
      duplicates.add(num);
    } else {
      seen.add(num)
    }
  }

  return [...duplicates];
}

function twoSum(arr: number[], target: number): number[] {

  const map = new Map<number,number>();

  for (let i = 0; i < arr.length; i++) {

    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }

    map.set(nums[i], i);
  }

  return [];
}

function charFreq(str: string): Record<string, number> {

  const result : Record<string, number> = {};

  for (const s of str) {
    result[s] = (result[s] || 0) + 1;
  }

  return result;
}

function firstNonRepeatingChar(input: string): string | null {

  const map = new Map<string, number>();

  for(const char of input) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (const char of input) {
    if (map.get(char) === 1) {
      return char;
    }
  }

  return null;
}

function isAngram(input1: string, input2: string): boolean {

  const normalize = (str: string) => str.toLowerCase().split('').sort().join('');

  return normalize(input1) === normalize(input2);
}

function missingNumber(nums: number[]): number{

  const n = nums.length + 1;

  const expected = n * (n + 1) / 2;

  const actual = nums.reduce((sum, num) => sum + num, 0);

  return expected - actual;
}

function flattenArray(arr: any[]): number[] {
  const result : number[] = [];

  for (const item of arr) {

    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

function longestSubString(input: string): number {

  const set = new Set<string>();

  let left = 0;
  let maxLength = 0;

  for(let right = 0; right < input.length; right++){

    while(set.has(input[right])){
      set.delete(input[left]);
      left++;
    }

    set.add(input[right]);

    maxLength = Math.max(
      maxLength,
      right - left + 1
    );
  }

  return maxLength;
}



// Input: all whitespace-separated integers are the array.
// Example: 0 0 0 1 1 2 2 3 3 4 4 5 5
const nums = readFileSync(0, 'utf8').trim().split(/\s+/).filter(Boolean).map(Number);
if (nums.some(Number.isNaN)) {
  throw new Error('All array values must be integers');
}

const k = removeDuplicates(nums);
console.log(`k = ${k}`);
console.log(`unique values: ${nums.slice(0, k).join(' ')}`);
