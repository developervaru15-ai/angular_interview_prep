import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';

interface Employee {
  id: number;
  name: string;
}
@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('interview-prep');

  destory$ = new Subject<void>();

  constructor() {

    let obj1 = {
      name: 'varun',
      age: 26
    }

    let obj2 = {
      name: 'varun-two',
      age: 27
    }

    //shallow copy
    obj2 = { ...obj1 };
    console.log(obj2);

    //deep copy 
    obj2 = JSON.parse(JSON.stringify(obj1));
    console.log(obj2);

    //spread operator 
    let arr1 = [1, 2, 3];
    let arr2 = [4];
    arr2 = [...arr1, ...arr2];
    console.log(arr2);

    //rest operator
    let [a, b, ...rest] = arr2;
    console.log(a, b, rest);


    //flatten array and Flatten array and find largest number
    const arr = [1, [2, 3], 4, 5, [6, 7], 8, [9, 10]];
    // const flattenedArr = arr.flat() as number[];
    const flat = arr.flat(Infinity) as number[];
    console.log(flat);

    const largest = Math.max(...flat);
    console.log(largest);

    //Remove duplicate elements in array
    const dupArr = [1, 2, 3, 4, 5, 5, 6, 7, 8, 8, 9, 10];
    const uniqueArr = [... new Set(dupArr)];
    console.log(uniqueArr);

    //OR

    const uniqueArr2 = dupArr.filter((item, index) => dupArr.indexOf(item) === index);
    console.log(uniqueArr2);

    //Destructuring with defaults
    const { a: varA = 10, b: varB = 20 } = { a: 5 };
    console.log(varA, varB);

    console.log(this.randomNumberGenerator(1, 100));

    this.randomUserGenerator();

    let users = Array.from({ length: 5 }).map((_, i) => ({
      name: `User ${i + 1}`,
      phone: `99999${1000 + i}`,
      email: `user${i + 1}@mail.com`
    }));
    console.log(users);

    // Destructuring Example with different variable names to avoid redeclaration
    const { a: varA2 = 10, b: varB2 = 20 } = { a: 5 };
    console.log(varA2, varB2); // 5 20

    const increment = this.counter();
    console.log(increment()); // 1




  }

  employees: Employee[] = [
    {
      id: 1,
      name: 'Rahul'
    },
    { id: 2, name: 'Amit' },
    { id: 1, name: 'Rahul Updated' },
    { id: 3, name: 'Priya' },
    { id: 2, name: 'Amit Updated' }
  ];


  removeDuplicates(employees: Employee[]): Employee[] {
    const seen = new Set<number>();

    return employees.filter(employee => {
      if (seen.has(employee.id)) {
        return false;
      }

      seen.add(employee.id);
      return true;
    });
  }

  findSecondLargest(numbers: number[]): number | null {

    let largest = -Infinity;
    let secondLargest = -Infinity;

    for (const num of numbers) {
      if (num > largest) {
        secondLargest = largest;
        largest = num
      } else if (num < largest && num > secondLargest) {
        secondLargest = num;
      }
    }

    return secondLargest === -Infinity ? null : secondLargest;

  }

  countCharacters(input: string): Record<string, number> {

    const frequency: Record<string, number> = {};

    for (const char of input) {
      frequency[char] = (frequency[char] || 0) + 1;
    }

    return frequency;
  }

  findDuplicatesPractise(arr: number[]): number[] {

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

  flattenNestedArray(arr1: number[], arr2: number[]): number[] {
    const nums = [...arr1, ...arr2].flat(Infinity);
    return nums;
  }

  flattenNestedArrayy(arr: number[]): number[] {
    return arr.flat(Infinity);
  }

  findMissingNumber(nums: number[]): number {
    const n = nums.length + 1;

    const expectedSum = (n * (n + 1)) / 2;

    const actualSum = nums.reduce((sum, num) => sum + num, 0);

    return expectedSum - actualSum;

  }


  counter() {
    let count = 0;
    return () => { count++; return count; };
  }

  //factory function to generate random numbers
  randomNumberGenerator(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //factory function to generate random users
  randomUserGenerator() {
    let users: any = {
      name: `User-${this.randomNumberGenerator(1, 100)}`,
      age: this.randomNumberGenerator(18, 60),
      email: `user${this.randomNumberGenerator(1, 100)}@example.com`,
    }

    let dummyusers = Array.from({ length: 100 }, (_, index) => {
      return { [`User${index + 1}`]: `User-${this.randomNumberGenerator(1, 100)}, Age: ${this.randomNumberGenerator(18, 60)}, Email: user${this.randomNumberGenerator(1, 100)}@example.com` };
    });
    console.log(dummyusers);


    users = JSON.parse(JSON.stringify(users));
    console.log(users);

    return users
  }

  reverseString(str: string): string {
    return str.split('').reverse().join('');
  }

  reverseStringWithRecursion(str: string): string {
    if (str === '') {
      return '';
    }
    return this.reverseStringWithRecursion(str.substr(1)) + str.charAt(0);
  }

  reverseWords(str: string): string {
    return str.split(' ').reverse().join(' ');
  }

  reverseWordsAndChars(str: string): string {
    return str
      .split(' ') // split into words
      .map(word => word.split('').reverse().join('')) // reverse each word
      .join(' '); // join back into a sentence
  }

  //logical way without using built in fucntions
  reverseStringLogical(str: string): string {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
      reversed += str[i];
    }
    return reversed;
  }

  reverseWordsLogical(str: string): string {
    let words = str.split(' ');
    let reversedWords = '';
    for (let i = words.length - 1; i >= 0; i--) {
      reversedWords += words[i] + ' ';
    }
    return reversedWords.trim();
  }

  reverseWordsAndCharacters(str: string): string {
    let words = str.split(' ');
    const reversedWords = words.map(word => {
      let reversedWord = '';
      for (let i = word.length - 1; i >= 0; i--) {
        reversedWord += word[i];
      };
      return reversedWord;
    });
    return reversedWords.join(' ');
  }

  findDuplicates(arr: Array<any>[]): any {
    return arr.filter((item, index) => arr.indexOf(item) !== index);
  }

  findDuplicatesWithSet(arr: Array<any>[]): any {
    const seen = new Set();
    const duplicates = new Set();

    for (const item of arr) {
      if (seen.has(item)) {
        duplicates.add(item);
      } else {
        seen.add(item);
      }
    }
    return Array.from(duplicates); // findDuplicates
    // return Array.from(seen); // findUnique or remove duplicates
  }

  isPalindrome(str: any) { return str === str.split('').reverse().join(''); }





  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }
}
