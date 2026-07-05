// ─── 10 Next.js / React Fix-the-Bug Questions ────────────────────────────────
// Difficulties: 3 EASY · 4 MEDIUM · 3 HARD
// Each question's buggyCode is shown in the editor on start.
// check() functions test the user's edited code as a string.

export const ALL_QUESTIONS = 
[
  // ─── EASY 1 ────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "The Vanishing Filter",
    difficulty: "EASY",
    timeLimit: 180,
    tags: ["Arrays", "Methods"],
    bugReport: "getEvenNumbers always returns undefined instead of the filtered array. The function runs without errors but produces no usable result.",
    description: "forEach does not return a new array — it returns undefined. The code tries to use forEach like filter, collecting even numbers but losing the result. Replace forEach with filter to return the filtered array.",
    buggyCode: `function getEvenNumbers(arr) {
  const result = arr.forEach((num) => {
    if (num % 2 === 0) {
      return num;
    }
  });
  return result;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(getEvenNumbers(numbers)); // Expected: [2, 4, 6, 8], Actual: undefined`,
    fixedCode: `function getEvenNumbers(arr) {
  const result = arr.filter((num) => {
    return num % 2 === 0;
  });
  return result;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(getEvenNumbers(numbers)); // [2, 4, 6, 8]`,
    tests: [
      { label: "Uses filter instead of forEach", check: (code) => code.includes(".filter(") && !code.includes(".forEach(") },
      { label: "filter callback returns a boolean condition", check: (code) => code.includes("num % 2 === 0") },
      { label: "The result is returned from the function", check: (code) => code.includes("return result") },
    ],
  },

  // ─── EASY 2 ────────────────────────────────────────────────────────────────
  {
    id: 2,
    title: "The Object Identity Crisis",
    difficulty: "EASY",
    timeLimit: 180,
    tags: ["Objects", "Comparison"],
    bugReport: "findUser always returns undefined even when the target user clearly exists in the array. The search never matches.",
    description: "Two objects with the same properties are never === equal because they are different references in memory. The find callback compares the whole object. Fix it by comparing a primitive value like id instead.",
    buggyCode: `function findUser(users, target) {
  return users.find((user) => user === target);
}

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const target = { id: 2, name: "Bob" };
console.log(findUser(users, target)); // Expected: { id: 2, name: "Bob" }, Actual: undefined`,
    fixedCode: `function findUser(users, target) {
  return users.find((user) => user.id === target.id);
}

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const target = { id: 2, name: "Bob" };
console.log(findUser(users, target)); // { id: 2, name: "Bob" }`,
    tests: [
      { label: "Compares by a primitive property (id), not the whole object", check: (code) => code.includes("user.id") && code.includes("target.id") },
      { label: "Does not use === to compare two objects directly", check: (code) => !code.includes("user === target") },
      { label: "Still uses find to search the array", check: (code) => code.includes(".find(") },
    ],
  },

  // ─── EASY 3 ────────────────────────────────────────────────────────────────
  {
    id: 3,
    title: "The Coercion Trap",
    difficulty: "EASY",
    timeLimit: 180,
    tags: ["Type Coercion", "Equality"],
    bugReport: "Passing the number 0 to checkAge returns 'Invalid age' instead of 'Age is 0'. The guard clause is incorrectly rejecting valid numeric input.",
    description: "The == operator performs type coercion: 0 == '0' is true because JavaScript converts the number to a string before comparing. Use === for strict equality so that 0 !== '0'.",
    buggyCode: `function checkAge(age) {
  if (age == "0") {
    return "Invalid age";
  }
  return "Age is " + age;
}

console.log(checkAge(0));      // Expected: "Age is 0",       Actual: "Invalid age"
console.log(checkAge("0"));    // Expected: "Invalid age",     Actual: "Invalid age"
console.log(checkAge(25));     // Expected: "Age is 25",      Actual: "Age is 25"`,
    fixedCode: `function checkAge(age) {
  if (age === "0") {
    return "Invalid age";
  }
  return "Age is " + age;
}

console.log(checkAge(0));      // "Age is 0"
console.log(checkAge("0"));    // "Invalid age"
console.log(checkAge(25));     // "Age is 25"`,
    tests: [
      { label: "Uses strict equality (===) instead of loose (==)", check: (code) => code.includes("===") && !code.includes("==") },
      { label: "The string \"0\" is still used in the comparison", check: (code) => code.includes('"0"') || code.includes("'0'") },
      { label: "Function still returns the age string for valid input", check: (code) => code.includes("Age is " + age) },
    ],
  },

  // ─── MEDIUM 1 ──────────────────────────────────────────────────────────────
  {
    id: 4,
    title: "The Closure Loop",
    difficulty: "MEDIUM",
    timeLimit: 300,
    tags: ["Closures", "Scoping"],
    bugReport: "All three functions returned by createCounters print 3 instead of 0, 1, and 2 respectively. Each closure captures the same final value of i.",
    description: "var is function-scoped, not block-scoped. All three closures share the same i variable which equals 3 after the loop ends. Change var to let so each iteration gets its own block-scoped copy of i.",
    buggyCode: `function createCounters() {
  const counters = [];
  for (var i = 0; i < 3; i++) {
    counters.push(function () {
      return i;
    });
  }
  return counters;
}

const c = createCounters();
console.log(c[0]()); // Expected: 0, Actual: 3
console.log(c[1]()); // Expected: 1, Actual: 3
console.log(c[2]()); // Expected: 2, Actual: 3`,
    fixedCode: `function createCounters() {
  const counters = [];
  for (let i = 0; i < 3; i++) {
    counters.push(function () {
      return i;
    });
  }
  return counters;
}

const c = createCounters();
console.log(c[0]()); // 0
console.log(c[1]()); // 1
console.log(c[2]()); // 2`,
    tests: [
      { label: "Uses let instead of var in the for loop", check: (code) => code.includes("for (let") && !code.includes("for (var") },
      { label: "Loop still iterates 3 times (i < 3)", check: (code) => code.includes("i < 3") },
      { label: "Closures still return i", check: (code) => code.includes("return i") },
    ],
  },

  // ─── MEDIUM 2 ──────────────────────────────────────────────────────────────
  {
    id: 5,
    title: "The Lost Context",
    difficulty: "MEDIUM",
    timeLimit: 300,
    tags: ["this", "Binding", "Callbacks"],
    bugReport: "After calling runThreeTimes, counter.count is still 0. The increment method fires but throws: 'Cannot read properties of undefined (reading count)'. this points to the wrong thing.",
    description: "In strict mode, passing a method as a plain callback makes 'this' undefined. this inside increment becomes undefined, causing the crash. Use .bind(counter) to permanently lock the context to the counter object.",
    buggyCode: `"use strict";

const counter = {
  count: 0,
  increment: function () {
    this.count += 1;
    return this.count;
  },
};

function runThreeTimes(fn) {
  fn();
  fn();
  fn();
}

runThreeTimes(counter.increment);
console.log(counter.count); // Expected: 3, Actual: Throws Error`,
    fixedCode: `"use strict";

const counter = {
  count: 0,
  increment: function () {
    this.count += 1;
    return this.count;
  },
};

function runThreeTimes(fn) {
  fn();
  fn();
  fn();
}

runThreeTimes(counter.increment.bind(counter));
console.log(counter.count); // 3`,
    tests: [
      { label: "Uses .bind() to preserve the context", check: (code) => code.includes(".bind(") },
      { label: "bind is called on the increment method", check: (code) => code.includes("increment.bind") || code.includes("counter.increment.bind") },
      { label: "counter object and count property are unchanged structurally", check: (code) => code.includes("counter.count") && code.includes("count: 0") },
    ],
  },

  // ─── MEDIUM 3 ──────────────────────────────────────────────────────────────
  {
    id: 6,
    title: "The Shallow Trap",
    difficulty: "MEDIUM",
    timeLimit: 300,
    tags: ["Objects", "References", "Immutability"],
    bugReport: "After calling updateNested, the original object's settings.theme has changed to 'dark' even though the function was supposed to return a copy. The original is mutated.",
    description: "Spread ({ ...obj }) creates a shallow copy. Nested objects like settings are still shared by reference. Deep-copy the nested object as well so the original stays untouched.",
    buggyCode: `function updateNested(obj) {
  const copy = { ...obj };
  copy.settings.theme = "dark";
  return copy;
}

const original = {
  name: "MyApp",
  settings: {
    theme: "light",
    fontSize: 14,
  },
};

const updated = updateNested(original);
console.log(original.settings.theme); // Expected: "light", Actual: "dark"
console.log(updated.settings.theme);  // "dark"`,
    fixedCode: `function updateNested(obj) {
  const copy = {
    ...obj,
    settings: { ...obj.settings },
  };
  copy.settings.theme = "dark";
  return copy;
}

const original = {
  name: "MyApp",
  settings: {
    theme: "light",
    fontSize: 14,
  },
};

const updated = updateNested(original);
console.log(original.settings.theme); // "light"
console.log(updated.settings.theme);  // "dark"`,
    tests: [
      { label: "Nested settings object is also spread", check: (code) => code.includes("settings: {") && code.includes("...obj.settings") },
      { label: "Top-level object still uses spread", check: (code) => code.includes("...obj") },
      { label: "The theme is assigned on the copy, not the original", check: (code) => code.includes("copy.settings.theme") && !code.includes("original.settings.theme =") },
    ],
  },

  // ─── MEDIUM 4 ──────────────────────────────────────────────────────────────
  {
    id: 7,
    title: "The Missing Await",
    difficulty: "MEDIUM",
    timeLimit: 300,
    tags: ["Async", "Promises", "Await"],
    bugReport: "fetchUserNames returns an array of Promise objects instead of the resolved user data. The console shows [Promise, Promise, Promise] instead of actual user objects.",
    description: "Calling an async function without await returns a pending Promise, not the resolved value. Each fetchUser(id) needs to be awaited so the loop collects the actual data, not promises.",
    buggyCode: `async function fetchUser(id) {
  const data = { 1: "Alice", 2: "Bob", 3: "Charlie" };
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: data[id] }), 100);
  });
}

async function fetchUserNames(ids) {
  const users = [];
  for (const id of ids) {
    const user = fetchUser(id);
    users.push(user);
  }
  return users;
}

fetchUserNames([1, 2, 3]).then(console.log);
// Expected: [{ id: 1, name: "Alice" }, ...]
// Actual: [Promise, Promise, Promise]`,
    fixedCode: `async function fetchUser(id) {
  const data = { 1: "Alice", 2: "Bob", 3: "Charlie" };
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: data[id] }), 100);
  });
}

async function fetchUserNames(ids) {
  const users = [];
  for (const id of ids) {
    const user = await fetchUser(id);
    users.push(user);
  }
  return users;
}

fetchUserNames([1, 2, 3]).then(console.log);
// [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]`,
    tests: [
      { label: "fetchUser call is prefixed with await", check: (code) => code.includes("await fetchUser") },
      { label: "fetchUserNames is still an async function", check: (code) => code.includes("async function fetchUserNames") },
      { label: "Results are still pushed into the users array", check: (code) => code.includes("users.push(user)") },
    ],
  },

  // ─── HARD 1 ────────────────────────────────────────────────────────────────
  {
    id: 8,
    title: "The Async Race",
    difficulty: "HARD",
    timeLimit: 480,
    tags: ["Async", "Race Condition", "Closures"],
    bugReport: "Calling search('apple') then quickly search('banana') sometimes shows apple's results under banana's label. The slower response overwrites the faster one.",
    description: "Both async calls run concurrently. If 'apple' takes longer than 'banana', its callback fires last and overwrites the correct result. Use a version counter — only update if the current version matches.",
    buggyCode: `const DB = {
  apple: ["Apple iPhone", "Apple MacBook"],
  banana: ["Banana Bread", "Banana Smoothie"],
};

function simulateFetch(query) {
  const delay = Math.random() * 200 + 50;
  return new Promise((resolve) => setTimeout(() => resolve(DB[query] || []), delay));
}

let currentQuery = "";
let currentResults = [];

async function search(query) {
  currentQuery = query;
  currentResults = [];
  const results = await simulateFetch(query);
  currentQuery = query;
  currentResults = results;
  console.log("Query:", currentQuery, "Results:", currentResults);
}

search("apple");
search("banana"); // Sometimes shows apple's results!`,
    fixedCode: `const DB = {
  apple: ["Apple iPhone", "Apple MacBook"],
  banana: ["Banana Bread", "Banana Smoothie"],
};

function simulateFetch(query) {
  const delay = Math.random() * 200 + 50;
  return new Promise((resolve) => setTimeout(() => resolve(DB[query] || []), delay));
}

let currentQuery = "";
let currentResults = [];
let version = 0;

async function search(query) {
  const myVersion = ++version;
  currentQuery = query;
  currentResults = [];
  const results = await simulateFetch(query);
  if (myVersion === version) {
    currentQuery = query;
    currentResults = results;
    console.log("Query:", currentQuery, "Results:", currentResults);
  }
}

search("apple");
search("banana"); // Always shows banana's results correctly`,
    tests: [
      { label: "A version counter is declared", check: (code) => code.includes("version") && code.includes("let version") },
      { label: "Version is incremented before the async call", check: (code) => code.includes("++version") || code.includes("version++") },
      { label: "Results are only set if version still matches", check: (code) => code.includes("myVersion === version") || code.includes("myVersion==version") },
    ],
  },

  // ─── HARD 2 ────────────────────────────────────────────────────────────────
  {
    id: 9,
    title: "The Listener Leak",
    difficulty: "HARD",
    timeLimit: 480,
    tags: ["DOM", "Events", "Memory"],
    bugReport: "Every time initCounter is called, a new click listener is added. After calling it 3 times, clicking the button fires the handler 3 times and the count jumps by 3 instead of 1.",
    description: "The event listener is added inside initCounter but never removed. The destroy method is empty. Store the handler in a variable and call removeEventListener in destroy to clean up.",
    buggyCode: `// Mock DOM element for testing context
function initCounter(buttonEl) {
  let count = 0;

  buttonEl.addEventListener("click", function () {
    count++;
    buttonEl.textContent = "Clicked: " + count;
  });

  return {
    getCount: function () { return count; },
    destroy: function () {
      // TODO: cleanup
    },
  };
}

// Simulated usage (Testing logic structure):
// initCounter(btn); initCounter(btn); initCounter(btn);
// Now clicking btn increments count 3 times per click!`,
    fixedCode: `// Mock DOM element for testing context
function initCounter(buttonEl) {
  let count = 0;

  function handleClick() {
    count++;
    buttonEl.textContent = "Clicked: " + count;
  }

  buttonEl.addEventListener("click", handleClick);

  return {
    getCount: function () { return count; },
    destroy: function () {
      buttonEl.removeEventListener("click", handleClick);
    },
  };
}

// Safe to call multiple times if destroy() is used between calls`,
    tests: [
      { label: "Handler is stored in a named variable", check: (code) => code.includes("function handleClick") || code.includes("const handleClick") },
      { label: "addEventListener uses the named handler reference", check: (code) => code.includes("addEventListener") && code.includes("handleClick") },
      { label: "removeEventListener is called in destroy with the same handler", check: (code) => code.includes("removeEventListener") && code.includes("handleClick") },
    ],
  },

  // ─── HARD 3 ────────────────────────────────────────────────────────────────
  {
    id: 10,
    title: "The Shared State Trap",
    difficulty: "HARD",
    timeLimit: 600,
    tags: ["Objects", "References", "Immutability"],
    bugReport: "After creating user1 with dark theme, user2 also has dark theme even though no overrides were passed. All users share and mutate the same default settings object.",
    description: "const defaultSettings is assigned by reference, not copied. Every call to createUserSettings mutates the same object. Create a fresh copy of defaultSettings for each user using spread.",
    buggyCode: `const defaultSettings = {
  theme: "light",
  language: "en",
  notifications: true,
};

function createUserSettings(username, overrides) {
  const settings = defaultSettings;
  if (overrides) {
    Object.keys(overrides).forEach(function (key) {
      settings[key] = overrides[key];
    });
  }
  return { username: username, settings: settings };
}

const user1 = createUserSettings("alice", { theme: "dark" });
const user2 = createUserSettings("bob");

console.log(user1.settings.theme); // Expected: "dark",  Actual: "dark" ✓
console.log(user2.settings.theme); // Expected: "light", Actual: "dark" ✗
console.log(defaultSettings.theme); // Expected: "light", Actual: "dark" ✗`,
    fixedCode: `const defaultSettings = {
  theme: "light",
  language: "en",
  notifications: true,
};

function createUserSettings(username, overrides) {
  const settings = { ...defaultSettings };
  if (overrides) {
    Object.keys(overrides).forEach(function (key) {
      settings[key] = overrides[key];
    });
  }
  return { username: username, settings: settings };
}

const user1 = createUserSettings("alice", { theme: "dark" });
const user2 = createUserSettings("bob");

console.log(user1.settings.theme); // "dark"
console.log(user2.settings.theme); // "light"
console.log(defaultSettings.theme); // "light"`,
    tests: [
      { label: "Settings is assigned as a new object, not the default reference", check: (code) => code.includes("{ ...defaultSettings }") && !code.match(/settings\s*=\s*defaultSettings/) },
      { label: "defaultSettings object itself is not modified in the function", check: (code) => !code.includes("defaultSettings.theme =") && !code.includes("defaultSettings[") },
      { label: "Overrides are still applied to the copy", check: (code) => code.includes("settings[key] = overrides[key]") },
    ],
  },
]

/** Pick one question from each difficulty tier */
export function pickRandomQuestions() {
  const easy = ALL_QUESTIONS.filter((q) => q.difficulty === "EASY");
  const medium = ALL_QUESTIONS.filter((q) => q.difficulty === "MEDIUM");
  const hard = ALL_QUESTIONS.filter((q) => q.difficulty === "HARD");
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  return [pick(easy), pick(medium), pick(hard)];
}

export const DIFFICULTY_STYLES = {
  EASY: {
    bg: "bg-green-500/15",
    text: "text-green-400",
    border: "border-green-500/30",
    dot: "bg-green-400",
    label: "EASY",
  },
  MEDIUM: {
    bg: "bg-amber-500/15",
    text: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
    label: "MEDIUM",
  },
  HARD: {
    bg: "bg-red-500/15",
    text: "text-red-400",
    border: "border-red-500/30",
    dot: "bg-red-400",
    label: "HARD",
  },
};