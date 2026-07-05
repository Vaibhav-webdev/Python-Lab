import {
  Layout,
  Compass,
  Cpu,
  RefreshCw,
  Zap,
  Network,
  Database,
  Shield,
  Code,
  Gauge,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Rocket,
} from "lucide-react";

export const DIFFICULTY_MAP = {
  Easy: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
    label: "Easy",
  },
  Medium: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
    label: "Medium",
  },
  Hard: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/20",
    dot: "bg-red-400",
    label: "Hard",
  },
  Beginner: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
    dot: "bg-blue-400",
    label: "Beginner",
  },
  Intermediate: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/20",
    dot: "bg-purple-400",
    label: "Intermediate",
  },
  Advanced: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/20",
    dot: "bg-red-400",
    label: "Advanced",
  },
};

// ═══════════════════════════════════════════════════════════════
// LEARNING TOPICS
// ═══════════════════════════════════════════════════════════════
export const learningTopics = [
  {
    "id": "01",
    "slug": "intro-js-architecture",
    "title": "Introduction to JavaScript",
    "icon": "BookOpen",
    "overview": "Understand the core nature of JS, its history, how engines compile code, and the foundational paradigm it follows.",
    "explanation": "## What is JavaScript?\n\nJavaScript is a high-level, dynamic, multi-paradigm programming language. Initially created to make web pages interactive, it has evolved into a universal language capable of running on servers (Node.js), desktops (Electron), and even embedded systems.\n\n## ECMAScript: The Standard\n\nJavaScript is an implementation of the ECMAScript (ES) specification. The TC39 committee governs this spec. When you hear \"ES6\" or \"ES2015\", it refers to a specific version of this specification that introduced massive upgrades like `let`, `const`, arrow functions, and classes.\n\n## How JavaScript Engines Work\n\nEngines like Google V8 (Chrome/Node.js), SpiderMonkey (Firefox), and JavaScriptCore (Safari) don't just 'read' your code. They use a Just-In-Time (JIT) compilation process:\n1. **Parsing:** Reads code and creates an Abstract Syntax Tree (AST).\n2. **Interpretation:** Quickly converts AST to byte code and runs it (fast startup).\n3. **Profiling & Compilation:** Identifies 'hot' code (run frequently) and compiles it to highly optimized machine code (fast execution).\n\n## Single-Threaded Nature\n\nJavaScript has a single call stack. It can only execute one piece of code at a time. It handles concurrency not via multiple threads, but via an Event Loop and asynchronous callbacks (which we will cover later).\n\n## Key Takeaway\n\nUnderstanding that JS is compiled just-in-time and runs on a single thread is crucial. It explains why long-running synchronous operations block the entire program, paving the way for understanding async patterns later.",
    "keyRules": [
      "ECMAScript (ES) is the standard specification; JavaScript is the implementation",
      "V8 uses JIT compilation: Parsing -> Bytecode -> Optimized Machine Code",
      "JavaScript is single-threaded with a single call stack",
      "It supports Object-Oriented, Functional, and Procedural paradigms"
    ],
    "task": "Write a script that logs your environment's JS engine info and uses typeof to check the data type of a number, a string, and a boolean.",
    "hint": "Use console.log() to print the values and typeof operator to check their types.",
    "learnings": [
      { "title": "ECMAScript Specifications", "desc": "Understanding the TC39 process, stage proposals, and how features become standard." },
      { "title": "Engine Internals (V8)", "desc": "Deep dive into Ignition (interpreter) and TurboFan (optimizing compiler)." },
      { "title": "JIT vs AOT Compilation", "desc": "Comparing Just-In-Time (JS) with Ahead-Of-Time (C++/Rust) compilation models." }
    ],
    "starterCode": `// Task: Log the environment info and check types\n\n// 1. Log a string describing the execution environment\n\n\n// 2. Define a number, a string, and a boolean\n\n\n// 3. Log the typeof each variable\n`,
    "solutionCode": `// Task: Log the environment info and check types\n\n// 1. Log a string describing the execution environment\nconsole.log("Running in a JavaScript Engine environment.");\n\n// 2. Define a number, a string, and a boolean\nconst age = 25;\nconst name = "JavaScript";\nconst isActive = true;\n\n// 3. Log the typeof each variable\nconsole.log(typeof age);      // "number"\nconsole.log(typeof name);     // "string"\nconsole.log(typeof isActive); // "boolean"`,
    "exampleCode": `// 🧠 JavaScript Engine Flow Example\n\n// 1. This code is parsed into an AST\nfunction calculateSum(a, b) {\n  return a + b;\n}\n\n// 2. Initially interpreted as bytecode (fast to start)\nlet result = calculateSum(5, 10);\nconsole.log("Sum:", result);\n\n// 3. If called repeatedly, V8's TurboFan compiler\n// will optimize this function into raw machine code.\nfor (let i = 0; i < 10000; i++) {\n  calculateSum(i, i + 1);\n}`,
    "tests": [
      { "id": "t1", "description": "Should use console.log", "check": "code => /console\\.log\\s*\\(/.test(code)" },
      { "id": "t2", "description": "Should use the typeof operator", "check": "code => /typeof\\s+/.test(code)" },
      { "id": "t3", "description": "Should define a number variable", "check": "code => /const\\s+\\w+\\s*=\\s*\\d+/.test(code) || /let\\s+\\w+\\s*=\\s*\\d+/.test(code)" },
      { "id": "t4", "description": "Should define a string variable", "check": "code => /=\\s*[\"'].*[\"']/.test(code)" }
    ]
  },
  {
    "id": "02",
    "slug": "variables-memory-scope",
    "title": "Variables & Memory Allocation",
    "icon": "Variable",
    "overview": "Master data declarations, modern keywords, scoping rules, and how the engine hoists variables in memory.",
    "explanation": "## The Problem with `var`\n\nHistorically, JavaScript only had `var`. It is **function-scoped**, meaning if you declare it inside an `if` block or a `for` loop, it leaks out and is accessible in the entire function. This leads to unexpected bugs and polluted global scopes.\n\n## The Modern Fix: `let` and `const`\n\nES6 introduced `let` and `const`, which are **block-scoped**. They are strictly confined to the nearest set of curly braces `{}`. \n- Use `const` when the variable reference will not change (arrays and objects included—just don't reassign the variable).\n- Use `let` when the variable reference *will* change (like a loop counter).\n\n## Hoisting Mechanism\n\nAll variables (`var`, `let`, `const`) are 'hoisted' to the top of their scope during the compilation phase. However, how they behave differs:\n- **`var`**: Hoisted and initialized with `undefined`. You can use it before declaration (bad practice).\n- **`let` / `const`**: Hoisted but **not initialized**. Accessing them before the declaration line throws a `ReferenceError`. This 'dead zone' between the scope start and the declaration line is called the **Temporal Dead Zone (TDZ)**.\n\n## Memory Allocation\n\nPrimitives (String, Number, Boolean, etc.) are stored directly in the 'Stack' memory where the variable lives. Non-primitives (Objects, Arrays) are stored in the 'Heap', and the variable in the Stack holds a pointer (reference) to that Heap memory.",
    "keyRules": [
      "Avoid var in modern JS; prefer let and const",
      "let and const are block-scoped (confined to {})",
      "var is function-scoped (leaks out of if/for blocks)",
      "let/const are hoisted but exist in the Temporal Dead Zone (TDZ) until declaration",
      "Primitives go to Stack, Objects/Arrays go to Heap (via reference)"
    ],
    "task": "Demonstrate the difference between var and let inside an if block. Try to log both outside the block to show how var leaks but let throws a TDZ error (comment out the let error to keep script running).",
    "hint": "Create an if(true) block. Declare a variable with var and another with let. Log them outside the block.",
    "learnings": [
      { "title": "Stack vs Heap Memory", "desc": "How primitives are copied by value and objects are copied by reference." },
      { "title": "Temporal Dead Zone Deep Dive", "desc": "Why TDZ exists and how it prevents accessing variables before initialization." },
      { "title": "Variable Shadowing", "desc": "Declaring a variable in an inner scope with the same name as an outer scope." }
    ],
    "starterCode": `// Task: Demonstrate var leaking vs let block scope\n\nfunction checkScope() {\n  if (true) {\n    var varVariable = "I am var";\n    let letVariable = "I am let";\n  }\n\n  // 1. Try logging varVariable (this will work)\n  \n\n  // 2. Try logging letVariable (this will throw ReferenceError)\n  // Comment it out after testing so the script finishes\n  \n}\n\ncheckScope();`,
    "solutionCode": `// Task: Demonstrate var leaking vs let block scope\n\nfunction checkScope() {\n  if (true) {\n    var varVariable = "I am var";\n    let letVariable = "I am let";\n  }\n\n  // 1. Try logging varVariable (this will work)\n  console.log("Outside block:", varVariable); // Works! var leaked.\n\n  // 2. Try logging letVariable (this will throw ReferenceError)\n  // Comment it out after testing so the script finishes\n  // console.log(letVariable); // ReferenceError: letVariable is not defined\n}\n\ncheckScope();`,
    "exampleCode": `// 🧠 Hoisting & TDZ in Action\n\n// --- VAR HOISTING ---\nconsole.log(myVar); // undefined (hoisted, initialized to undefined)\nvar myVar = 10;\n\n// --- LET/CONST TDZ ---\n// console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization\nlet myLet = 20;\n\n// --- BLOCK SCOPING ---\nlet x = 10;\n{\n  let x = 20; // Completely separate variable (shadows outer x)\n console.log("Inside block:", x); // 20\n}\nconsole.log("Outside block:", x); // 10\n\n// --- CONST RULES ---\nconst PI = 3.14;\n// PI = 3.15; // TypeError: Assignment to constant variable.\n\n// Note: const objects/arrays CAN be mutated internally!\nconst user = { name: "Ali" };\nuser.name = "Hamza"; // This is ALLOWED (mutating heap memory)\n// user = {}; // This is FORBIDDEN (reassigning stack reference)`,
    "tests": [
      { "id": "t1", "description": "Should use the var keyword", "check": "code => /var\\s+\\w+/.test(code)" },
      { "id": "t2", "description": "Should use the let keyword", "check": "code => /let\\s+\\w+/.test(code)" },
      { "id": "t3", "description": "Should have an if block", "check": "code => /if\\s*\\(/.test(code)" },
      { "id": "t4", "description": "Should log the var variable outside the block", "check": "code => /console\\.log\\s*\\(.*varVariable/.test(code)" }
    ]
  },
  {
    "id": "03",
    "slug": "data-types-foundations",
    "title": "Data Types Foundations",
    "icon": "Binary",
    "overview": "Deep dive into primitive and non-primitive value categories, understanding how JavaScript represents data under the hood.",
    "explanation": "## The 8 Data Types\n\nJavaScript has exactly 8 data types. 7 are **Primitives** (immutable, copied by value) and 1 is **Non-Primitive** (mutable, copied by reference).\n\n### The 7 Primitives:\n1. **String**: Text sequence (`\"Hello\"`, `'World'`, `` `Template` ``)\n2. **Number**: 64-bit double-precision floats. Includes `Infinity`, `-Infinity`, and `NaN`.\n3. **BigInt**: For integers larger than `Number.MAX_SAFE_INTEGER` (e.g., `9007199254740991n`)\n4. **Boolean**: Logical entity (`true` or `false`)\n5. **Undefined**: Default value for uninitialized variables.\n6. **Null**: Intentional absence of any object value.\n7. **Symbol**: Guaranteed unique identifier (e.g., `Symbol('id')`)\n\n### The 1 Non-Primitive:\n8. **Object**: Collections of properties (includes Arrays, Functions, Dates, Maps, Sets—everything else is an object).\n\n## The `typeof` Quirk\n\n`typeof null` returns `\"object\"`. This is a famous historical bug in JavaScript from its first implementation that was never fixed to maintain backward compatibility.\n\n## Mutability\n\nIf you change a primitive, JS creates a new value in memory. If you change a property of an object, JS modifies the existing memory in the Heap.",
    "keyRules": [
      "There are 7 primitive types and 1 object type",
      "Primitives are immutable and copied by value",
      "Objects (including Arrays/Functions) are mutable and copied by reference",
      "typeof null returns 'object' (historical bug)",
      "BigInt is created by appending 'n' to an integer (e.g., 10n)"
    ],
    "task": "Create a variable for each of the 7 primitive data types and use typeof to log their types. Also, specifically demonstrate the typeof null bug.",
    "hint": "Declare a string, number, bigint, boolean, undefined, null, and symbol. Log them with typeof.",
    "learnings": [
      { "title": "Primitive Immutability", "desc": "Why string methods return new strings instead of modifying the original." },
      { "title": "NaN is a Number", "desc": "Understanding why typeof NaN === 'number' and how to reliably check for NaN using Number.isNaN()." },
      { "title": "Symbol Use Cases", "desc": "Using Symbols as hidden object keys to avoid property collisions." }
    ],
    "starterCode": `// Task: Log the type of all 7 primitives\n\n// 1. String\n\n// 2. Number\n\n// 3. BigInt\n\n// 4. Boolean\n\n// 5. Undefined\n\n// 6. Null (Demonstrate the bug here)\n\n// 7. Symbol\n`,
    "solutionCode": `// Task: Log the type of all 7 primitives\n\n// 1. String\nconst str = "Hello";\nconsole.log(typeof str); // "string"\n\n// 2. Number\nconst num = 42;\nconsole.log(typeof num); // "number"\n\n// 3. BigInt\nconst big = 9007199254740991n;\nconsole.log(typeof big); // "bigint"\n\n// 4. Boolean\nconst bool = false;\nconsole.log(typeof bool); // "boolean"\n\n// 5. Undefined\nlet und;\nconsole.log(typeof und); // "undefined"\n\n// 6. Null (Demonstrate the bug here)\nconst nul = null;\nconsole.log(typeof nul); // "object" (The famous JS bug!)\n\n// 7. Symbol\nconst sym = Symbol("id");\nconsole.log(typeof sym); // "symbol"`,
    "exampleCode": `// 🧠 Primitives vs References\n\n// Primitives are copied by VALUE\nlet a = 10;\nlet b = a; // b gets a copy of the value 10\nb = 20;\nconsole.log(a); // 10 (a is unaffected)\n\n// Objects are copied by REFERENCE\nlet objA = { name: "Ali" };\nlet objB = objA; // objB gets the memory ADDRESS of objA\nobjB.name = "Hamza";\nconsole.log(objA.name); // "Hamza" (objA is affected!)\n\n// --- NaN Quirks ---\nconsole.log(typeof NaN);        // "number"\nconsole.log(NaN === NaN);       // false (NaN is not equal to itself!)\nconsole.log(Number.isNaN(NaN)); // true (The correct way to check)`,
    "tests": [
      { "id": "t1", "description": "Should define a BigInt variable", "check": "code => /\\d+n/.test(code)" },
      { "id": "t2", "description": "Should define a Symbol variable", "check": "code => /Symbol\\s*\\(/.test(code)" },
      { "id": "t3", "description": "Should define a null variable", "check": "code => /null/.test(code)" },
      { "id": "t4", "description": "Should log typeof for all variables", "check": "code => (code.match(/typeof\\s+/g) || []).length >= 7" }
    ]
  },
  {
    "id": "04",
    "slug": "operators-expressions",
    "title": "Operators & Expressions",
    "icon": "Calculator",
    "overview": "Utilize mathematics, logic gates, and modern short-circuit operators to build complex evaluations safely.",
    "explanation": "## Arithmetic & Assignment\n\nStandard math operators (`+`, `-`, `*`, `/`, `%`, `**`) combined with assignment (`=`, `+=`, `-=`).\n*Note:* The `%` (modulo) operator returns the remainder, heavily used for wrapping numbers (like array indexes or angles).\n\n## Comparison Operators\n\nAlways use **Strict Equality (`===`)**. It checks both value AND type.\n**Loose Equality (`==`)** performs type coercion before comparing, leading to unpredictable results (e.g., `\"5\" == 5` is `true`, `null == undefined` is `true`).\n\n## Logical Operators & Short-Circuiting\n\n- `&&` (AND): Returns the first **falsy** value. If all are truthy, returns the last value.\n- `||` (OR): Returns the first **truthy** value. If all are falsy, returns the last value.\n\n## Modern Safe Operators (ES2020)\n\n- **Nullish Coalescing (`??`)**: Returns the right side ONLY if the left side is exactly `null` or `undefined`. Unlike `||`, it treats `0` and `\"\"` as valid values.\n- **Optional Chaining (`?.`)**: Safely accesses deeply nested object properties. If a link in the chain is `null` or `undefined`, it short-circuits and returns `undefined` instead of throwing an error.\n\n## Ternary Operator\n\n`condition ? exprIfTrue : exprIfFalse`. The only operator that takes three operands. Keep it simple; don't nest ternaries.",
    "keyRules": [
      "Always use === instead of ==",
      "|| returns the first truthy value, && returns the first falsy value",
      "?? only checks for null/undefined (treats 0 and '' as valid)",
      "?. prevents 'Cannot read property of undefined' errors",
      "Do not nest ternary operators"
    ],
    "task": "Create an object representing a user configuration. Use optional chaining to safely read a nested property, and use ?? to provide a fallback if the value is null or undefined. Compare ?? with || to show the difference when the value is 0.",
    "hint": "Create an object like `config.theme.fontSize`. Set it to 0. Use `||` and `??` to fallback to 16, and log the difference.",
    "learnings": [
      { "title": "Short-Circuit Evaluation Logic", "desc": "How && and || decide which value to return without evaluating the rest." },
      { "title": "Bitwise Operators", "desc": "Using &, |, ^, ~ for low-level binary manipulations and fast math." },
      { "title": "Comma Operator", "desc": "Evaluating multiple expressions and returning the last one." }
    ],
    "starterCode": `// Task: Demonstrate ?? vs || and Optional Chaining\n\nconst config = {\n  theme: {\n    // fontSize is intentionally missing or 0\n    fontSize: 0 \n  }\n};\n\n// 1. Safely get fontSize using optional chaining\n\n\n// 2. Use || to fallback to 16 (Notice the bug with 0)\n\n\n// 3. Use ?? to fallback to 16 (Correct behavior with 0)\n`,
    "solutionCode": `// Task: Demonstrate ?? vs || and Optional Chaining\n\nconst config = {\n  theme: {\n    // fontSize is intentionally missing or 0\n    fontSize: 0 \n  }\n};\n\n// 1. Safely get fontSize using optional chaining\nconst size = config?.theme?.fontSize;\n\n// 2. Use || to fallback to 16 (Notice the bug with 0)\nconst sizeOr = size || 16; \nconsole.log("With ||:", sizeOr); // 16 (Incorrectly treats 0 as false)\n\n// 3. Use ?? to fallback to 16 (Correct behavior with 0)\nconst sizeNullish = size ?? 16; \nconsole.log("With ??:", sizeNullish); // 0 (Correctly keeps 0)`,
    "exampleCode": `// 🧠 Advanced Operator Magic\n\n// --- Logical Assignment Operators ---\nlet x = 10;\nx ||= 20; // x = x || 20 (assigns if falsy)\nx &&= 5;  // x = x && 5  (assigns if truthy)\nx ??= 99; // x = x ?? 99  (assigns if null/undefined)\n\n// --- Optional Chaining with Function Calls ---\nconst user = { name: "Ali" };\nconst id = user.getId?.(); // Returns undefined, doesn't crash\n\n// --- Ternary vs Short Circuit ---\n// Bad (nesting):\n// const val = a ? b ? c : d : e;\n\n// Good (early returns / variables):\nconst age = 20;\nconst status = age >= 18 ? "Adult" : "Minor";`,
    "tests": [
      { "id": "t1", "description": "Should use optional chaining operator", "check": "code => /\\?\\./.test(code)" },
      { "id": "t2", "description": "Should use nullish coalescing operator", "check": "code => /\\?\\?/.test(code)" },
      { "id": "t3", "description": "Should use logical OR operator", "check": "code => /\\|\\|/.test(code)" },
      { "id": "t4", "description": "Should have an object with nested properties", "check": "code => /\\{\\s*[\\w]+\\s*:\\s*\\{/.test(code)" }
    ]
  },
  {
    "id": "05",
    "slug": "type-coercion-mechanics",
    "title": "Type Conversion & Coercion",
    "icon": "Shuffle",
    "overview": "Understand implicit engine adjustments and forced explicit type casting to avoid hidden bugs.",
    "explanation": "## What is Coercion?\n\nType coercion is the automatic or manual conversion of values from one data type to another (e.g., String to Number).\n\n## Implicit Coercion (The Danger Zone)\n\nJavaScript automatically coerces types when operators encounter mismatched types.\n- **The `+` Trap**: If EITHER operand is a string, `+` does string concatenation. `\"5\" + 5` becomes `\"55\"`.\n- **The `-` Trick**: The `-` operator ONLY works with numbers. `\"5\" - 1` becomes `4` (JS implicitly converts \"5\" to 5).\n- **Boolean Coercion**: In logical contexts (if, &&, ||), JS coerces values to booleans based on **Truthy/Falsy** rules.\n\n## Truthy vs Falsy Values\n\nThere are exactly **7 falsy values** in JS:\n`false`, `0`, `-0`, `0n` (BigInt), `\"\"` (empty string), `null`, `undefined`, `NaN`.\n**Everything else is truthy** (including `\"0\"`, `[]` empty arrays, `{}` empty objects).\n\n## Explicit Conversion (The Safe Way)\n\nNever rely on implicit coercion for business logic. Use built-in wrappers:\n- `Number(\"42\")` -> `42` (Returns `NaN` if invalid)\n- `String(42)` -> `\"42\"`\n- `Boolean(1)` -> `true`\n- `parseInt(\"42px\", 10)` -> `42` (Parses from start until non-numeric char)",
    "keyRules": [
      "+ with a string triggers concatenation, not addition",
      "-, *, / automatically convert strings to numbers",
      "There are exactly 7 falsy values (false, 0, NaN, '', null, undefined, 0n)",
      "Empty arrays [] and objects {} are truthy!",
      "Always use Number(), String(), Boolean() for explicit casting"
    ],
    "task": "Create a function `analyzeType(value)` that explicitly converts the input to a Number, String, and Boolean, and returns an object logging these conversions. Then test it with a truthy value (e.g., \"Hello\") and a falsy value (e.g., \"\" or 0).",
    "hint": "Use the Number(), String(), and Boolean() wrapper functions inside your function and return them as an object.",
    "learnings": [
      { "title": "ToPrimitive & ToNumber Abstract Operations", "desc": "The internal ECMA spec algorithms JS uses to decide how to coerce objects." },
      { "title": "Loose Equality Coercion Algorithm", "desc": "Step-by-step what happens when you use == between different types." },
      { "title": "Edge Cases with +", "desc": "Why [] + [] is \"\" and {} + [] is 0." }
    ],
    "starterCode": `// Task: Create an explicit type converter function\n\nfunction analyzeType(value) {\n  // Return an object with num, str, and bool conversions\n  \n}\n\n// Test with a truthy value\nconsole.log(analyzeType("Hello"));\n\n// Test with a falsy value\nconsole.log(analyzeType(0));`,
    "solutionCode": `// Task: Create an explicit type converter function\n\nfunction analyzeType(value) {\n  // Return an object with num, str, and bool conversions\n  return {\n    original: value,\n    toNumber: Number(value),\n    toString: String(value),\n    toBoolean: Boolean(value)\n  };\n}\n\n// Test with a truthy value\nconsole.log(analyzeType("Hello")); \n// { original: 'Hello', toNumber: NaN, toString: 'Hello', toBoolean: true }\n\n// Test with a falsy value\nconsole.log(analyzeType(0));\n// { original: 0, toNumber: 0, toString: '0', toBoolean: false }`,
    "exampleCode": `// 🧠 Coercion Quirks & Rules\n\n// --- Implicit Coercion ---\nconsole.log(\"5\" + 3);     // "53" (String concat)\nconsole.log(\"5\" - 3);     // 2 (Math subtraction)\nconsole.log(true + 2);    // 3 (true becomes 1)\nconsole.log(false + 2);   // 2 (false becomes 0)\n\n// --- The Falsy Traps ---\nif ("") console.log("1"); // Won't run\nif (0) console.log("2");  // Won't run\nif ([]) console.log("3"); // RUNS! [] is truthy\nif ({}) console.log("4"); // RUNS! {} is truthy\n\n// --- Explicit Parsing ---\nconsole.log(parseInt("42px", 10)); // 42\nconsole.log(parseFloat("3.14abc")); // 3.14\nconsole.log(Number(""));            // 0\nconsole.log(Number(" "));           // 0\nconsole.log(Number(null));          // 0 (Weird!)\nconsole.log(Number(undefined));     // NaN`,
    "tests": [
      { "id": "t1", "description": "Should define analyzeType function", "check": "code => /function\\s+analyzeType/.test(code) || /const\\s+analyzeType\\s*=/.test(code)" },
      { "id": "t2", "description": "Should use Number() for conversion", "check": "code => /Number\\s*\\(/.test(code)" },
      { "id": "t3", "description": "Should use String() for conversion", "check": "code => /String\\s*\\(/.test(code)" },
      { "id": "t4", "description": "Should use Boolean() for conversion", "check": "code => /Boolean\\s*\\(/.test(code)" },
      { "id": "t5", "description": "Should return an object with the conversions", "check": "code => /return\\s*\\{/.test(code)" }
    ]
  },
  {
    "id": "06",
    "slug": "cli-io-primitives",
    "title": "Input & Output Primitives",
    "icon": "Monitor",
    "overview": "Manage standard CLI runtime logs, process arguments, and advanced terminal output formatting using core console methods.",
    "explanation": "## Standard Output in JS\n\nIn JavaScript, the primary way to interact with the runtime environment is through the `console` object. While browsers provide `alert()` or `prompt()`, pure JavaScript (like Node.js) relies entirely on `console` methods for standard I/O.\n\n## Core Console Methods\n\n- **`console.log()`**: Standard output for general telemetry and debugging.\n- **`console.error()`**: Prints to the standard error stream (`stderr`). Useful for logging failures separately from standard output.\n- **`console.warn()`**: Outputs a warning message (typically styled with yellow text in terminals).\n- **`console.table()`**: Takes an array or object and prints it as a beautifully formatted ASCII table in the terminal. Extremely useful for inspecting data structures.\n- **`console.time()` & `console.timeEnd()`**: Starts and stops a high-resolution timer to measure how long a block of code takes to execute.\n\n## CLI Input via `process.argv`\n\nSince we don't have browser `prompt()`, the standard way to pass input to a vanilla JS script running in a terminal is via command-line arguments. \n\nThe `process.argv` property returns an array where:\n- Element 0: The path to the Node executable\n- Element 1: The path to the script file\n- Elements 2+: The actual arguments passed by the user\n\nWe use `.slice(2)` to extract just the user-provided arguments.",
    "keyRules": [
      "Use console.log() for standard output and console.error() for failures",
      "console.table() is the best way to visualize arrays/objects in CLI",
      "Use console.time() and console.timeEnd() to benchmark performance",
      "process.argv contains execution paths in indexes 0 and 1, user args start at index 2",
      "Use process.argv.slice(2) to get an array of actual user inputs"
    ],
    "task": "Read a name from process.argv (fallback to 'Guest'). Greet the user. Then, define an array of user objects and log it using console.table. Finally, use console.time/timeEnd to measure a loop of 1 million iterations.",
    "hint": "Extract args using process.argv.slice(2)[0]. Create the array, pass it to console.table(). Wrap a for loop in console.time('loop') and console.timeEnd('loop').",
    "learnings": [
      { "title": "Standard Streams (stdin, stdout, stderr)", "desc": "Understanding how data flows into and out of a process at the OS level." },
      { "title": "Console Grouping", "desc": "Using console.group() and console.groupEnd() to indent nested logs." },
      { "title": "String Substitutions", "desc": "Using %s, %d, and %o placeholders in console.log()." }
    ],
    "starterCode": `// Task: CLI I/O and Benchmarking\n\n// 1. Get name from CLI args, fallback to "Guest"\nconst name = undefined; // Extract from process.argv here\n\n// 2. Greet the user\n\n\n// 3. Define an array of objects and log with console.table\n\n\n// 4. Benchmark a loop of 1,000,000 iterations\n`,
    "solutionCode": `// Task: CLI I/O and Benchmarking\n\n// 1. Get name from CLI args, fallback to "Guest"\nconst name = process.argv.slice(2)[0] || "Guest";\n\n// 2. Greet the user\nconsole.log(\`Hello, \${name}! Welcome to the CLI.\`);\n\n// 3. Define an array of objects and log with console.table\nconst users = [\n  { id: 1, name: "Ali", role: "Admin" },\n  { id: 2, name: "Bob", role: "User" },\n  { id: 3, name: "Charlie", role: "User" }\n];\nconsole.table(users);\n\n// 4. Benchmark a loop of 1,000,000 iterations\nconsole.time("loop_benchmark");\nfor (let i = 0; i < 1000000; i++) {\n  // Empty loop for benchmarking purposes\n}\nconsole.timeEnd("loop_benchmark");`,
    "exampleCode": `// 🧠 Advanced Console & Process Tricks\n\n// --- String Substitutions ---\nconsole.log("Name: %s, Age: %d", "Ali", 25);\nconsole.log("Object: %o", { key: "value" });\n\n// --- Grouping ---\nconsole.group("User Details");\nconsole.log("Name: Ali");\nconsole.log("Age: 25");\nconsole.groupEnd();\n\n// --- Error & Warn Streams ---\nconsole.warn("This is a warning!");\nconsole.error("This is an error!");\n\n// --- Process Arguments ---\n// Run: node script.js --port 3000 --env prod\nconst args = process.argv.slice(2);\n// args = ['--port', '3000', '--env', 'prod']`,
    "tests": [
      { "id": "t1", "description": "Should use process.argv", "check": "code => /process\\.argv/.test(code)" },
      { "id": "t2", "description": "Should use .slice(2) on argv", "check": "code => /process\\.argv\\.slice\\s*\\(\\s*2\\s*\\)/.test(code)" },
      { "id": "t3", "description": "Should use console.table", "check": "code => /console\\.table\\s*\\(/.test(code)" },
      { "id": "t4", "description": "Should use console.time and timeEnd", "check": "code => /console\\.time\\s*\\(/.test(code) && /console\\.timeEnd\\s*\\(/.test(code)" },
      { "id": "t5", "description": "Should have a fallback value for the name", "check": "code => /\\|\\|\\s*[\"']Guest[\"']/.test(code)" }
    ]
  },
  {
    "id": "07",
    "slug": "conditions-logical-paths",
    "title": "Conditions & Logical Paths",
    "icon": "GitFork",
    "overview": "Direct execution logic using structural evaluation paths, branching code based on dynamic values.",
    "explanation": "## Controlling Program Flow\n\nConditions allow your program to make decisions. Instead of executing every line top-to-bottom, you can create branches that only run when specific criteria are met.\n\n## `if / else if / else`\nThe most flexible form of conditionals. JavaScript evaluates the condition in parentheses. If it's truthy, the block executes. You can chain multiple conditions using `else if`.\n\n## The `switch` Statement\n\nA cleaner alternative when you are comparing a SINGLE value against multiple exact matches (not ranges, not complex logical evaluations).\n\n**How it works:**\n1. It evaluates the expression in `switch(expression)`.\n2. It looks for a `case` that strictly matches (`===`) the result.\n3. If found, it executes that block.\n4. **Crucial:** It uses \"fall-through\". If you don't write `break;` at the end of a case, it will continue executing the NEXT case's code even if the values don't match.\n\n## Nested Conditions\n\nYou can put `if` statements inside other `if` statements. While sometimes necessary, deep nesting makes code hard to read. It's often better to use early returns (guard clauses) or logical operators (`&&`, `||`) to flatten the structure.",
    "keyRules": [
      "Use if/else for complex logic or range checks (e.g., > 90)",
      "Use switch for strict equality matches against a single value",
      "ALWAYS use 'break;' inside switch cases to prevent fall-through",
      "Avoid deeply nested if statements; use early returns instead"
    ],
    "task": "Create two functions: 1) `getGrade(score)` using if/else if to return 'A', 'B', 'C', or 'F'. 2) `getDayType(day)` using a switch statement to return 'Weekend', 'Weekday', or 'Invalid'.",
    "hint": "In getGrade, check highest scores first (e.g., if score >= 90). In getDayType, group Saturday/Sunday for Weekend, Monday-Friday for Weekday, and default for Invalid.",
    "learnings": [
      { "title": "Guard Clauses", "desc": "Flattening nested if/else structures by returning early." },
      { "title": "Switch Fall-Through Intentionally", "desc": "Omitting break to group multiple cases to execute the same logic." },
      { "title": "Ternary Operator Nesting", "desc": "Why nesting ternaries is bad practice and how to avoid it." }
    ],
    "starterCode": `// Task: Implement If/Else and Switch logic\n\nfunction getGrade(score) {\n  // Return 'A' for >= 90, 'B' for >= 80, 'C' for >= 70, 'F' otherwise\n  \n}\n\nfunction getDayType(day) {\n  // Use switch to return 'Weekend', 'Weekday', or 'Invalid'\n  \n}\n\n// Test cases\nconsole.log(getGrade(95)); // Expect "A"\nconsole.log(getGrade(85)); // Expect "B"\nconsole.log(getDayType("Saturday")); // Expect "Weekend"\nconsole.log(getDayType("Tuesday")); // Expect "Weekday"\nconsole.log(getDayType("Funday")); // Expect "Invalid"`,
    "solutionCode": `// Task: Implement If/Else and Switch logic\n\nfunction getGrade(score) {\n  // Return 'A' for >= 90, 'B' for >= 80, 'C' for >= 70, 'F' otherwise\n  if (score >= 90) {\n    return "A";\n  } else if (score >= 80) {\n    return "B";\n  } else if (score >= 70) {\n    return "C";\n  } else {\n    return "F";\n  }\n}\n\nfunction getDayType(day) {\n  // Use switch to return 'Weekend', 'Weekday', or 'Invalid'\n  switch (day) {\n    case "Saturday":\n    case "Sunday":\n      return "Weekend";\n    case "Monday":\n    case "Tuesday":\n    case "Wednesday":\n    case "Thursday":\n    case "Friday":\n      return "Weekday";\n    default:\n      return "Invalid";\n  }\n}\n\n// Test cases\nconsole.log(getGrade(95)); // Expect "A"\nconsole.log(getGrade(85)); // Expect "B"\nconsole.log(getDayType("Saturday")); // Expect "Weekend"\nconsole.log(getDayType("Tuesday")); // Expect "Weekday"\nconsole.log(getDayType("Funday")); // Expect "Invalid"`,
    "exampleCode": `// 🧠 Flattening Nested Ifs (Guard Clauses)\n\n// BAD (Nested):\nfunction processUser(user) {\n  if (user) {\n    if (user.isActive) {\n      if (user.role === "admin") {\n        return "Admin Access";\n      }\n    }\n  }\n  return "No Access";\n}\n\n// GOOD (Guard Clauses):\nfunction processUserClean(user) {\n  if (!user) return "No Access";\n  if (!user.isActive) return "No Access";\n  if (user.role !== "admin") return "No Access";\n  \n  return "Admin Access";\n}`,
    "tests": [
      { "id": "t1", "description": "Should have an if/else if structure", "check": "code => /else\\s+if/.test(code)" },
      { "id": "t2", "description": "Should have a switch statement", "check": "code => /switch\\s*\\(/.test(code)" },
      { "id": "t3", "description": "Should use 'break' or implicit return in switch", "check": "code => /break;/.test(code) || /case.*return/.test(code)" },
      { "id": "t4", "description": "Should handle a default case in switch", "check": "code => /default\\s*:/.test(code)" },
      { "id": "t5", "description": "Should group Saturday and Sunday in switch", "check": "code => /case\\s*\"Saturday\"/.test(code) && /case\\s*\"Sunday\"/.test(code)" }
    ]
  },
  {
    "id": "08",
    "slug": "loops-iterations",
    "title": "Loops & Iterations",
    "icon": "Repeat",
    "overview": "Automate repetitive tasks using standard and specialized loop structures for arrays and objects.",
    "explanation": "## Why Loops?\n\nLoops allow you to execute a block of code multiple times without rewriting it. JavaScript provides several loop constructs, each suited for specific data structures.\n\n## Standard Loops\n- **`for`**: The classic loop. Best when you know exactly how many times you want to iterate, or when you need access to the index.\n- **`while`**: Runs as long as a condition is true. Best when the number of iterations is unknown.\n- **`do...while`**: Always executes the block AT LEAST ONCE, then checks the condition. Useful for input validation (though less common in pure JS than UI-based languages).\n\n## Specialized Iterators\n- **`for...of`**: Designed for **iterable objects** (Arrays, Strings, Maps, Sets). It gives you the VALUES directly. This is the modern, safest way to loop over arrays.\n- **`for...in`**: Designed for **enumerable properties of objects**. It gives you the KEYS (strings). \n\n### The `for...in` Trap\n**Never use `for...in` to loop over an Array.** It loops over all enumerable properties, including inherited prototype methods (like `Array.prototype.forEach` if someone modified it) and it returns string keys ('0', '1', '2') instead of numbers, which can cause weird type coercion bugs.",
    "keyRules": [
      "Use 'for' when you need the numeric index",
      "Use 'for...of' to iterate over Arrays, Strings, or Maps (gives values)",
      "Use 'for...in' ONLY for plain Objects to get keys",
      "NEVER use 'for...in' on Arrays",
      "Use 'while' when the number of iterations is dynamic/unknown"
    ],
    "task": "Create an array of colors and an object representing a car. Use 'for...of' to print the array values. Use 'for...in' to print the object keys and values. Finally, use a 'while' loop to count down from 3 to 1.",
    "hint": "Loop through the array with `for (const color of colors)`. Loop through the object with `for (const key in car)`. Set a counter to 3 for the while loop.",
    "learnings": [
      { "title": "Iterable Protocols", "desc": "How objects become iterable by defining a [Symbol.iterator] method." },
      { "title": "Loop Performance", "desc": "Micro-benchmarks of for vs for...of vs while in modern V8 engines." },
      { "title": "Breaking and Continuing", "desc": "Controlling loop flow (covered in detail in the next topic)." }
    ],
    "starterCode": `// Task: Demonstrate for...of, for...in, and while\n\nconst colors = ["Red", "Green", "Blue"];\nconst car = { brand: "Toyota", model: "Corolla", year: 2020 };\n\n// 1. Loop through colors using for...of\n\n\n// 2. Loop through car properties using for...in\n\n\n// 3. Count down from 3 to 1 using while\n`,
    "solutionCode": `// Task: Demonstrate for...of, for...in, and while\n\nconst colors = ["Red", "Green", "Blue"];\nconst car = { brand: "Toyota", model: "Corolla", year: 2020 };\n\n// 1. Loop through colors using for...of\nconsole.log("--- Colors ---");\nfor (const color of colors) {\n  console.log(color);\n}\n\n// 2. Loop through car properties using for...in\nconsole.log("--- Car Specs ---");\nfor (const key in car) {\n  console.log(\`\${key}: \${car[key]}\`);\n}\n\n// 3. Count down from 3 to 1 using while\nconsole.log("--- Countdown ---");\nlet count = 3;\nwhile (count > 0) {\n  console.log(count);\n  count--;\n}`,
    "exampleCode": `// 🧠 The for...in Array Trap\n\nconst arr = ["a", "b", "c"];\narr.customProp = "Oops!";\n\n// BAD: for...in loops over custom properties and uses string keys\nfor (const key in arr) {\n  console.log(typeof key); // "string" (not number!)\n  console.log(key);        // "0", "1", "2", "customProp"\n}\n\n// GOOD: for...of only loops over iterable values\nfor (const val of arr) {\n  console.log(val); // "a", "b", "c"\n}`,
    "tests": [
      { "id": "t1", "description": "Should use for...of loop", "check": "code => /for\\s*\\(\\s*const\\s+\\w+\\s+of\\s+/.test(code)" },
      { "id": "t2", "description": "Should use for...in loop", "check": "code => /for\\s*\\(\\s*const\\s+\\w+\\s+in\\s+/.test(code)" },
      { "id": "t3", "description": "Should use a while loop", "check": "code => /while\\s*\\(/.test(code)" },
      { "id": "t4", "description": "Should access object value using bracket notation in for...in", "check": "code => /car\\[key\\]/.test(code) || /\\w+\\[\\w+\\]/.test(code)" },
      { "id": "t5", "description": "Should decrement a counter in the while loop", "check": "code => /\\w+--/.test(code) || /--\\w+/.test(code)" }
    ]
  },
  {
    "id": "09",
    "slug": "control-keywords",
    "title": "Control Keywords",
    "icon": "CornerDownLeft",
    "overview": "Manipulate loop iterations and function execution instantly using break, continue, and return.",
    "explanation": "## Altering Default Flow\n\nBy default, loops run to completion and functions run to their final closing brace. Control keywords let you short-circuit this default behavior.\n\n## `break`\nCompletely terminates the loop or switch statement immediately. Execution continues on the line *after* the loop. \n*Use case:* Searching an array. Once you find the item you are looking for, there is no need to keep checking the rest of the array. `break` saves CPU cycles.\n\n## `continue`\nSkips the remaining code inside the current iteration and jumps straight to the next iteration of the loop.\n*Use case:* Filtering out unwanted values. If you encounter an invalid item, `continue` skips it without you having to wrap the entire loop body in a massive `if/else` block.\n\n## `return`\nImmediately exits the *entire function*, optionally passing a value back to the caller. If used inside a loop, it doesn't just break the loop—it kills the whole function.\n*Use case:* Guard clauses (early returns). If parameters are invalid, `return` immediately instead of wrapping all your logic in an `if` block.\n\n## Order of Operations\n\nThese keywords only affect their immediate enclosing block. If you have a nested loop, `break` only breaks out of the inner loop, not the outer one (unless you use labeled statements, which are rarely used).",
    "keyRules": [
      "break terminates the entire loop immediately",
      "continue skips the rest of the current iteration and moves to the next",
      "return exits the entire function, not just the loop",
      "Use break when searching to stop once found",
      "Use continue to skip unwanted items cleanly"
    ],
    "task": "Write a function `findFirstMultiple(arr, divisor)` that loops through an array and uses 'break' to return the first number divisible by the divisor. Write another function `logOdds(arr)` that uses 'continue' to skip even numbers and only log odd ones.",
    "hint": "In findFirstMultiple, use `if (num % divisor === 0) { break/return; }`. In logOdds, use `if (num % 2 === 0) { continue; }`.",
    "learnings": [
      { "title": "Labeled Statements", "desc": "Using outerLoop: and break outerLoop; to break out of nested loops." },
      { "title": "Return vs Break inside Loops", "desc": "How return inside a loop stops the function entirely, which can cause bugs if you intended to just skip an iteration." }
    ],
    "starterCode": "// Task: Demonstrate break and continue\n\nfunction findFirstMultiple(arr, divisor) {\n  // Loop through arr, return the first number divisible by divisor\n  // Hint: Use break or return when found\n}\n\nfunction logOdds(arr) {\n  // Loop through arr, use continue to skip even numbers\n  // Log only the odd numbers\n}\n\n// Tests\nconsole.log(findFirstMultiple([4, 5, 10, 12], 5)); // Expect 5\nconsole.log(logOdds([1, 2, 3, 4, 5])); // Expect to log 1, 3, 5",
    "solutionCode": "// Task: Demonstrate break and continue\n\nfunction findFirstMultiple(arr, divisor) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] % divisor === 0) {\n      return arr[i]; // Returns immediately, ending the function\n    }\n  }\n  return null; // Fallback if none found\n}\n\nfunction logOdds(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] % 2 === 0) {\n      continue; // Skips the console.log below and moves to next iteration\n    }\n    console.log(arr[i]);\n  }\n}\n\n// Tests\nconsole.log(\"Found:\", findFirstMultiple([4, 5, 10, 12], 5)); // 5\nconsole.log(\"Odds:\");\nlogOdds([1, 2, 3, 4, 5]); // Logs 1, 3, 5",
    "exampleCode": "// 🧠 Advanced Control Flow\n\n// --- Labeled Break for Nested Loops ---\nouterLoop: for (let i = 0; i < 3; i++) {\n  for (let j = 0; j < 3; j++) {\n    if (i === 1 && j === 1) {\n      console.log(`Breaking out at i=\${i}, j=\${j}`);\n      break outerLoop; // Breaks BOTH loops\n    }\n  }\n}\n\n// --- Return inside a Loop (Be Careful) ---\nfunction hasOddNumber(arr) {\n  arr.forEach(num => {\n    if (num % 2 !== 0) {\n      return true; // ⚠️ BUG: This only returns from the forEach callback, not the function!\n    }\n  });\n  return false;\n}",
    "tests": [
      { "id": "t1", "description": "Should use 'return' to exit the first function early", "check": "code => /return\\s+arr\\[i\\]/.test(code)" },
      { "id": "t2", "description": "Should use 'continue' in the second function", "check": "code => /continue;/.test(code)" },
      { "id": "t3", "description": "Should check for even numbers using modulo 2", "check": "code => /%\\s*2\\s*===\\s*0/.test(code)" },
      { "id": "t4", "description": "Should check for divisibility using modulo", "check": "code => /%\\s*divisor\\s*===\\s*0/.test(code)" }
    ]
  },
  {
    "id": "10",
    "slug": "functions-foundations",
    "title": "Functions Foundations",
    "icon": "Code2",
    "overview": "Master baseline declarations, syntax setups, and passing functions as data via callbacks.",
    "explanation": "## What is a Function?\n\nA function is a reusable block of code designed to perform a specific task. Functions are fundamental because they allow you to write DRY (Don't Repeat Yourself) code, encapsulate logic, and create scopes.\n\n## Declaration vs Expression\n\n1. **Function Declaration:** `function greet() {}`\n   - Fully hoisted. You can call it before it's defined in the file.\n   \n2. **Function Expression:** `const greet = function() {}`\n   - NOT hoisted (the variable is hoisted, but assigned `undefined` until the code executes that line).\n   - You can create anonymous functions or named function expressions.\n\n## Arrow Functions (ES6)\n\nSyntax: `const greet = () => {}` or `const add = (a, b) => a + b;`\n- Shorter syntax.\n- **Lexical `this` binding:** They do not have their own `this` context; they inherit `this` from the parent scope. (Crucial for objects/methods, though less relevant right now since we aren't doing DOM/OOP yet).\n- If the body is a single expression, the curly braces and `return` keyword are implicit.\n\n## Callbacks\n\nIn JavaScript, functions are \"first-class citizens.\" This means they can be assigned to variables, stored in arrays, and passed as arguments into other functions. \nA function passed into another function is called a **callback**.",
    "keyRules": [
      "Declarations are fully hoisted; expressions are not",
      "Arrow functions have implicit returns for single expressions",
      "Arrow functions do not have their own 'this' context",
      "Functions can be passed as arguments (callbacks)",
      "Always use parentheses () for arrow functions returning object literals: () => ({})"
    ],
    "task": "Create a standard function declaration `add(a, b)`, a function expression `subtract(a, b)`, and an arrow function `multiply(a, b)`. Then create a higher-order function `calculate(a, b, operationFn)` that takes two numbers and a callback function to execute.",
    "hint": "Define the three math functions. Define calculate to simply call `operationFn(a, b)` and return the result. Test it by passing `multiply` as the callback.",
    "learnings": [
      { "title": "First-Class Citizens", "desc": "Treating functions as values—assigning to vars, passing to funcs, returning from funcs." },
      { "title": "IIFE (Immediately Invoked Function Expression)", "desc": "Creating and executing a function instantly: (function(){ })();" },
      { "title": "Function Hoisting Quirks", "desc": "Why calling a function expression before its definition throws a TypeError." }
    ],
    "starterCode": `// Task: Declarations, Expressions, Arrows, and Callbacks\n\n// 1. Function Declaration\n\n// 2. Function Expression\n\n// 3. Arrow Function\n\n// 4. Higher-Order Function that accepts a callback\n\n\n// Tests\nconsole.log(calculate(10, 5, add));      // Expect 15\nconsole.log(calculate(10, 5, subtract)); // Expect 5\nconsole.log(calculate(10, 5, multiply)); // Expect 50",
    "solutionCode": "// Task: Declarations, Expressions, Arrows, and Callbacks\n\n// 1. Function Declaration\nfunction add(a, b) {\n  return a + b;\n}\n\n// 2. Function Expression\nconst subtract = function(a, b) {\n  return a - b;\n};\n\n// 3. Arrow Function\nconst multiply = (a, b) => a * b;\n\n// 4. Higher-Order Function that accepts a callback\nconst calculate = (a, b, operationFn) => {\n  return operationFn(a, b);\n};\n\n// Tests\nconsole.log(calculate(10, 5, add));      // Expect 15\nconsole.log(calculate(10, 5, subtract)); // Expect 5\nconsole.log(calculate(10, 5, multiply)); // Expect 50",
    "exampleCode": "// 🧠 Function Nuances\n\n// --- Implicit vs Explicit Return ---\n// Implicit (no braces needed)\nconst double = x => x * 2;\n\n// Explicit (braces required if multiple lines)\nconst processUser = user => {\n  user.name = user.name.toUpperCase();\n  return user;\n};\n\n// Arrow returning an Object (PITFALL!)\n// WRONG: const getUser = () => { name: \"Ali\" }; // Returns undefined\n// RIGHT:\nconst getUser = () => ({ name: "Ali" });\n\n// --- Callbacks in the wild ---\nconst numbers = [1, 2, 3];\nnumbers.forEach(function(num) { // Anonymous function as callback\n  console.log(num * 2);\n});`,
    "tests": [
      { "id": "t1", "description": "Should have a function declaration", "check": "code => /function\\s+add\\s*\\(/.test(code)" },
      { "id": "t2", "description": "Should have a function expression assigned to const", "check": "code => /const\\s+subtract\\s*=\\s*function/.test(code)" },
      { "id": "t3", "description": "Should have an arrow function", "check": "code => /const\\s+multiply\\s*=\\s*\\(.*\\)\\s*=>/.test(code)" },
      { "id": "t4", "description": "calculate function must accept a function as 3rd parameter", "check": "code => /calculate\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*,\\s*\\w+Fn\\s*\\)/.test(code) || /calculate\\s*\\(.*operation/.test(code)" },
      { "id": "t5", "description": "Must invoke the callback function inside calculate", "check": "code => /operationFn\\s*\\(/.test(code) || /\\w+Fn\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)/.test(code)" }
    ]
  },
  {
    "id": "11",
    "slug": "advanced-functions-design",
    "title": "Advanced Functions Design",
    "icon": "Cpu",
    "overview": "Transition into professional-grade declarative patterns, closures, and recursive problem solving.",
    "explanation": "## Higher-Order Functions (HOFs)\n\nA function is considered a \"Higher-Order Function\" if it does one of two things (or both):\n1. Takes another function as an argument (e.g., `Array.prototype.map`).\n2. Returns a function from within its body.\n\nHOFs are the backbone of functional programming in JavaScript.\n\n## Closures & Lexical Scope\n\nA **closure** is formed when a function is created inside another function. The inner function \"closes over\" (remembers) the variables of its outer function, even AFTER the outer function has finished executing and its execution context is destroyed.\n\n*Why does this matter?* It allows for **data privacy**. You can create variables that cannot be accessed from the outside world, only through the specific inner functions you expose.\n\n## Pure Functions & IIFE\n\n- **Pure Function:** Given the same inputs, always returns the same output, and causes no side effects (doesn't modify external variables). They make code predictable and easy to test.\n- **IIFE (Immediately Invoked Function Expression):** `(function() { ... })()`. A function that runs exactly once the moment it is defined. Historically used to create scoped variables before `let`/`const` existed.\n\n## Recursion\n\nA function that calls itself until it hits a **base case** (a condition to stop). Used for tree traversal, deep cloning, or solving mathematical sequences like factorials.",
    "keyRules": [
      "Closures allow inner functions to remember outer scope variables",
      "Use closures to create private variables and encapsulation",
      "Pure functions must not mutate external state or rely on external changing data",
      "Recursive functions MUST have a base case to prevent infinite call stack errors",
      "IIFEs run immediately and create their own scope"
    ],
    "task": "Create a function `createCounter(initialValue)` that returns an object with two methods: `increment()` and `getCount()`. Use a closure so the count variable is private and cannot be modified directly from the outside.",
    "hint": "Inside createCounter, declare `let count = initialValue`. Return an object containing `increment: () => count++` and `getCount: () => count`. The inner functions form a closure over `count`.",
    "learnings": [
      { "title": "Factory Functions", "desc": "Using closures to create multiple independent instances of state." },
      { "title": "Memoization", "desc": "Using closures to cache expensive function results." },
      { "title": "Recursion vs Iteration", "desc": "When to use recursion (e.g., deep nested objects) vs standard loops (better performance)." }
    ],
    "starterCode": "// Task: Create a closure-based private counter\n\nfunction createCounter(initialValue) {\n  // 1. Create a private variable\n  \n  // 2. Return an object with methods that access the private variable\n  \n}\n\nconst myCounter = createCounter(0);\nmyCounter.increment();\nmyCounter.increment();\nconsole.log(myCounter.getCount()); // Expect 2\n\n// Prove it's private:\nconsole.log(myCounter.count); // Expect undefined",
    "solutionCode": "// Task: Create a closure-based private counter\n\nfunction createCounter(initialValue) {\n  // 1. Create a private variable\n  let count = initialValue;\n\n  // 2. Return an object with methods that access the private variable\n  return {\n    increment: () => ++count,\n    getCount: () => count\n  };\n}\n\nconst myCounter = createCounter(0);\nmyCounter.increment();\nmyCounter.increment();\nconsole.log(myCounter.getCount()); // Expect 2\n\n// Prove it's private:\nconsole.log(myCounter.count); // Expect undefined",
    "exampleCode": "// 🧠 Advanced Patterns\n\n// --- IIFE ---\nconst result = (function() {\n  const secret = \"I am hidden\";\n  return secret.toUpperCase();\n})();\n// console.log(secret); // ReferenceError!\n\n// --- Pure Function ---\nfunction addPure(a, b) {\n  return a + b; // Always same output for same inputs, no side effects\n}\n\n// --- Recursive Factorial ---\nfunction factorial(n) {\n  if (n <= 1) return 1; // Base case!\n  return n * factorial(n - 1); // Recursive call\n}\nconsole.log(factorial(5)); // 120",
    "tests": [
      { "id": "t1", "description": "Should declare a variable using let or const inside the factory", "check": "code => /function createCounter[\\s\\S]*?let\\s+count|const\\s+count/.test(code)" },
      { "id": "t2", "description": "Should return an object literal", "check": "code => /return\\s*\\{/.test(code)" },
      { "id": "t3", "description": "Returned object should have an increment method", "check": "code => /increment\\s*:/.test(code)" },
      { "id": "t4", "description": "increment method should mutate the outer variable", "check": "code => /\\+\\+count|count\\+\\+/.test(code)" },
      { "id": "t5", "description": "Returned object should have a getCount method", "check": "code => /getCount\\s*:/.test(code)" }
    ]
  },
  {
    "id": "12",
    "slug": "execution-context-mechanics",
    "title": "Execution Context Mechanics",
    "icon": "Layers",
    "overview": "Study how the JS engine reads code, allocates memory, and builds the scope chain using practical tracing.",
    "explanation": "## What is an Execution Context?\n\nWhenever JavaScript runs a function or global script, it wraps it in an \"Execution Context\" (EC). You can think of it as an invisible box that holds the variables, the `this` binding, and a reference to its outer environment.\n\n## The Two Phases\n\nEvery EC is created in two phases:\n1. **Memory Creation Phase:** The engine scans the code for `var`, `let`, `const`, and `function` declarations. It allocates memory for them. `var` is initialized to `undefined`, while `let/const` remain uninitialized (TDZ). Function declarations are fully stored in memory.\n2. **Execution Phase:** The engine executes the code line-by-line, assigning actual values to variables and running function calls.\n\n## The Call Stack\n\nJavaScript is single-threaded and uses a Call Stack (Last-In, First-Out) to manage Execution Contexts.\n- When a script runs, a **Global EC** is pushed.\n- When a function is called, a new **Function EC** is pushed on top.\n- When the function finishes, its EC is popped off, and control returns to the EC below it.\n\n## The Scope Chain\n\nWhen code tries to access a variable, the engine looks:\n1. In the current local scope.\n2. In the outer (parent) scope.\n3. In the next outer scope... all the way up to the Global scope.\nIf it reaches Global scope and still can't find it, it throws a `ReferenceError`.",
    "keyRules": [
      "Var is hoisted and initialized to 'undefined'; let/const are hoisted but uninitialized (TDZ)",
      "Function declarations are fully hoisted with their body",
      "The Call Stack operates on a Last-In, First-Out (LIFO) basis",
      "Variable lookup follows the Scope Chain from local to global",
      "console.trace() visually prints the current Call Stack"
    ],
    "task": "Create three nested functions: `outer()`, `middle()`, and `inner()`. Declare a variable in `outer` and access it in `inner` to prove the Scope Chain. Inside `inner()`, call `console.trace()` to print the actual Call Stack to the terminal.",
    "hint": "Define `outer()` which defines `var outerVar = 'I am outer'`. Define `middle()` inside it. Define `inner()` inside `middle()`. In `inner`, log `outerVar` and run `console.trace()`. Call `outer()` at the end.",
    "learnings": [
      { "title": "Variable Environment vs Lexical Environment", "desc": "How the engine separates var declarations from let/const internally." },
      { "title": "Block Scope Contexts", "desc": "How let/const inside an if-statement create a new environment in the scope chain." },
      { "title": "Stack Overflow", "desc": "What happens when infinite recursion pushes too many contexts onto the call stack." }
    ],
    "starterCode": "// Task: Demonstrate Scope Chain and Call Stack\n\nfunction outer() {\n  // 1. Declare a variable here\n  \n  function middle() {\n    function inner() {\n      // 2. Access outer's variable here (proves scope chain)\n      \n      // 3. Print the Call Stack\n      \n    }\n    inner();\n  }\n  middle();\n}\n\n// 4. Execute outer\n",
    "solutionCode": "// Task: Demonstrate Scope Chain and Call Stack\n\nfunction outer() {\n  // 1. Declare a variable here\n  const outerVar = \"I am outer\";\n  \n  function middle() {\n    function inner() {\n      // 2. Access outer's variable here (proves scope chain)\n      console.log(\"Accessing:\", outerVar);\n      \n      // 3. Print the Call Stack\n      console.trace(\"Call Stack Trace:\");\n    }\n    inner();\n  }\n  middle();\n}\n\n// 4. Execute outer\nouter();",
    "exampleCode": "// 🧠 Execution Context in Action\n\n// --- Hoisting Demo ---\nconsole.log(myVar); // undefined (Memory phase set it)\n// console.log(myLet); // ReferenceError (TDZ)\nvar myVar = 10;\nlet myLet = 20;\n\nconsole.log(greet()); // \"Hello\" (Function fully hoisted)\nfunction greet() { return \"Hello\"; }\n\n// --- Scope Chain Lookup ---\nlet globalVar = \"Global\";\nfunction level1() {\n  let l1Var = \"Level 1\";\n  function level2() {\n    let l2Var = \"Level 2\";\n    console.log(globalVar, l1Var, l2Var); // All accessible!\n  }\n  level2();\n}\nlevel1();",
    "tests": [
      { "id": "t1", "description": "Should define three nested functions", "check": "code => /function\\s+outer/.test(code) && /function\\s+middle/.test(code) && /function\\s+inner/.test(code)" },
      { "id": "t2", "description": "Should declare a variable in the outer function", "check": "code => /function\\s+outer[\\s\\S]*?(let|const|var)\\s+\\w+/.test(code)" },
      { "id": "t3", "description": "Should log the outer variable inside the inner function", "check": "code => /function\\s+inner[\\s\\S]*?console\\.log.*outerVar/.test(code)" },
      { "id": "t4", "description": "Should use console.trace()", "check": "code => /console\\.trace\\s*\\(/.test(code)" },
      { "id": "t5", "description": "Should invoke the outer function at the end", "check": "code => /outer\\s*\\(\\s*\\)/.test(code)" }
    ]
  },
  {
    "id": "13",
    "slug": "arrays-basics",
    "title": "Arrays Basics",
    "icon": "List",
    "overview": "Create, index, and modify sequential memory collections efficiently using standard bracket notation.",
    "explanation": "## What is an Array?\n\nAn array is an ordered list of values. Unlike many languages where arrays are strictly fixed-size blocks of identical memory types, JavaScript arrays are dynamic, can hold mixed data types, and are technically special objects under the hood.\n\n## Creating Arrays\n- **Array Literal:** `const arr = [1, 2, 3];` (Preferred, faster)\n- **Array Constructor:** `const arr = new Array(3);` (Avoid for creating values, as `new Array(3)` creates an empty array of length 3, but `new Array(3, 4)` creates `[3, 4]`—too confusing).\n\n## Accessing Elements\nArrays are **zero-indexed**. The first element is at `arr[0]`, the second at `arr[1]`, and the last at `arr[arr.length - 1]`.\nIf you try to access an index that doesn't exist, JavaScript does NOT throw an error; it returns `undefined`.\n\n## Modifying Elements\nBecause arrays are mutable, you can change a value by directly assigning to an index: `arr[0] = 99;`.\nYou can even add an element to the end by assigning to an index equal to the length: `arr[arr.length] = 'new';` (though `push()` is better).",
    "keyRules": [
      "Always use literal notation [] to create arrays",
      "Arrays are zero-indexed; the last element is at arr.length - 1",
      "Accessing an out-of-bounds index returns undefined, no error",
      "Arrays can hold mixed types (e.g., [1, 'string', null, { id: 1 }])",
      "Modifying by index mutates the original array"
    ],
    "task": "Create an array of 3 student objects, each with `name` and `grade`. Log the first student. Then, change the grade of the second student to 'A+'. Finally, add a new student to the end of the array using index assignment.",
    "hint": "Access via `students[0]`. Modify via `students[1].grade = 'A+'`. Add via `students[students.length] = { name: 'New Student', grade: 'B' }`.",
    "learnings": [
      { "title": "Array-like Objects", "desc": "Objects with length and indexes (like strings or function arguments) that aren't true arrays." },
      { "title": "Sparse Arrays", "desc": "Arrays with empty slots (e.g., `[1, , 3]`) and how they behave differently with map/filter." },
      { "title": "Memory Structure", "desc": "How arrays store references for objects, meaning mutating an object in an array mutates the original object." }
    ],
    "starterCode": "// Task: Create, Access, and Modify Arrays\n\n// 1. Create an array of 3 student objects\n\n\n// 2. Log the first student\n\n\n// 3. Change the second student's grade to 'A+'\n\n\n// 4. Add a new student to the end using index assignment\n\n\n// 5. Log the final array\n",
    "solutionCode": "// Task: Create, Access, and Modify Arrays\n\n// 1. Create an array of 3 student objects\nconst students = [\n  { name: \"Ali\", grade: \"B\" },\n  { name: \"Bob\", grade: \"C\" },\n  { name: \"Charlie\", grade: \"A\" }\n];\n\n// 2. Log the first student\nconsole.log(\"First Student:\", students[0]);\n\n// 3. Change the second student's grade to 'A+'\nstudents[1].grade = \"A+\";\n\n// 4. Add a new student to the end using index assignment\nstudents[students.length] = { name: \"Diana\", grade: \"B+\" };\n\n// 5. Log the final array\nconsole.log(\"Final Array:\", students);",
    "exampleCode": "// 🧠 Array Quirks\n\n// --- Mixed Types ---\nconst weird = [1, \"two\", null, { id: 4 }, [5, 6]];\n\n// --- Out of bounds ---\nconst arr = [10, 20];\nconsole.log(arr[5]); // undefined (No error!)\n\n// --- Sparse Arrays (Avoid!) ---\nconst sparse = [1, , 3];\nconsole.log(sparse.length); // 3\nconsole.log(sparse[1]);    // undefined\n\n// --- Reference Mutation ---\nconst objArr = [{ a: 1 }];\nconst copy = objArr; // NOT a real copy, just a reference!\ncopy[0].a = 99;\nconsole.log(objArr[0].a); // 99 (Original affected)",
    "tests": [
      { "id": "t1", "description": "Should create an array using literal notation", "check": "code => /=\\s*\\[/.test(code)" },
      { "id": "t2", "description": "Should access index 0", "check": "code => /\\[\\s*0\\s*\\]/.test(code)" },
      { "id": "t3", "description": "Should modify index 1", "check": "code => /\\[\\s*1\\s*\\]/.test(code)" },
      { "id": "t4", "description": "Should use .length to add new item", "check": "code => /\\.length\\s*\\]/.test(code)" },
      { "id": "t5", "description": "Should have objects with name and grade properties", "check": "code => /name\\s*:/.test(code) && /grade\\s*:/.test(code)" }
    ]
  },
  {
    "id": "14",
    "slug": "array-mutators-slicing",
    "title": "Array Mutators & Slicing API",
    "icon": "Scissors",
    "overview": "Master standard boundary expansions, contractions, and segment splitting, understanding mutability.",
    "explanation": "## Mutator Methods\n\nThese methods change the **original** array in place.\n- **`push(...items)`**: Adds to the end. Returns new length.\n- **`pop()`**: Removes from the end. Returns removed item.\n- **`unshift(...items)`**: Adds to the beginning. Returns new length. (Slow on huge arrays because it re-indexes everything).\n- **`shift()`**: Removes from the beginning. Returns removed item.\n\n## The Crucial Difference: `slice` vs `splice`\n\nThis is the most common interview mix-up.\n- **`slice(start, end)`**: IMMUTABLE. Returns a NEW array containing elements from `start` up to (but NOT including) `end`. Original array is untouched. If no `end` is given, it goes to the end.\n- **`splice(start, deleteCount, item1, ...)`**: MUTABLE. Modifies the original array by removing items (based on `deleteCount`) and optionally inserting new items. Returns an array of the REMOVED items.\n\n## Concatenation\n- **`concat(arr2)`**: IMMUTABLE. Merges two or more arrays into a new array without changing the originals.",
    "keyRules": [
      "push/pop are fast (operate at end), shift/unshift are slow (re-index whole array)",
      "slice is IMMUTABLE (returns new array)",
      "splice is MUTABLE (alters original array, returns removed items)",
      "concat is IMMUTABLE (returns new merged array)",
      "Prefer slice/map/filter over splice for functional programming patterns"
    ],
    "task": "Write a function `processQueue()` that starts with an array `['A', 'B', 'C']`. Use `pop()` to remove the last item. Use `unshift()` to add 'Z' to the front. Then, make a safe copy of the first two elements using `slice()` WITHOUT mutating the array.",
    "hint": "Call `arr.pop()`. Call `arr.unshift('Z')`. To get the first two without mutating, use `arr.slice(0, 2)` and store it in a new variable.",
    "learnings": [
      { "title": "Array Destructuring with Mutators", "desc": "Using const [first, ...rest] = arr; as a modern alternative to shift()." },
      { "title": "Splice for Replacing", "desc": "Using splice(1, 1, 'new') to replace an element in place." },
      { "title": "Performance Implications", "desc": "Why pushing to the end of an array is O(1) but unshifting is O(n)." }
    ],
    "starterCode": "// Task: Demonstrate Mutators vs Immutable slice\n\nfunction processQueue() {\n  const queue = ['A', 'B', 'C'];\n  \n  // 1. Remove the last item using pop()\n  \n  // 2. Add 'Z' to the front using unshift()\n  \n  // 3. Create a copy of the first two elements safely (do NOT mutate queue)\n  const firstTwo = undefined; \n  \n  console.log(\"Original Queue:\", queue);\n  console.log(\"Safe Copy:\", firstTwo);\n}\n\nprocessQueue();",
    "solutionCode": "// Task: Demonstrate Mutators vs Immutable slice\n\nfunction processQueue() {\n  const queue = ['A', 'B', 'C'];\n  \n  // 1. Remove the last item using pop()\n  queue.pop();\n  \n  // 2. Add 'Z' to the front using unshift()\n  queue.unshift('Z');\n  \n  // 3. Create a copy of the first two elements safely (do NOT mutate queue)\n  const firstTwo = queue.slice(0, 2);\n  \n  console.log(\"Original Queue:\", queue);   // ['Z', 'A', 'B']\n  console.log(\"Safe Copy:\", firstTwo);     // ['Z', 'A']\n}\n\nprocessQueue();",
    "exampleCode": "// 🧠 Slice vs Splice Visualized\n\nconst original = [10, 20, 30, 40, 50];\n\n// --- SLICE (Immutable) ---\nconst copy = original.slice(1, 3);\nconsole.log(copy);     // [20, 30]\nconsole.log(original); // [10, 20, 30, 40, 50] (Unchanged!)\n\n// --- SPLICE (Mutable) ---\nconst removed = original.splice(1, 2, 99);\nconsole.log(removed);  // [20, 30] (The items removed)\nconsole.log(original); // [10, 99, 40, 50] (Changed!)\n\n// --- CONCAT (Immutable) ---\nconst merged = original.concat([60, 70]);\nconsole.log(original); // Still [10, 99, 40, 50]\nconsole.log(merged);   // [10, 99, 40, 50, 60, 70]",
    "tests": [
      { "id": "t1", "description": "Should use .pop() method", "check": "code => /\\.pop\\s*\\(\\s*\\)/.test(code)" },
      { "id": "t2", "description": "Should use .unshift() method", "check": "code => /\\.unshift\\s*\\(\\s*['\"]Z['\"]\\s*\\)/.test(code)" },
      { "id": "t3", "description": "Should use .slice() to extract items", "check": "code => /\\.slice\\s*\\(/.test(code)" },
      { "id": "t4", "description": "Should NOT use .splice()", "check": "code => !/\\.splice\\s*\\(/.test(code)" },
      { "id": "t5", "description": "slice should pass 0 as first argument", "check": "code => /\\.slice\\s*\\(\\s*0/.test(code)" }
    ]
  },
  {
    "id": "15",
    "slug": "advanced-array-processors",
    "title": "Advanced Array Processors",
    "icon": "Filter",
    "overview": "Orchestrate high-performance functional queries, transformations, and aggregations.",
    "explanation": "## The Holy Trinity: `map`, `filter`, `reduce`\n\nThese three methods form the core of functional programming in JavaScript. They do NOT mutate the original array; they return new arrays (or a final value in reduce's case).\n\n- **`map(callback)`**: Transforms data. It loops over every element, applies a function to it, and returns a **new array** of the exact same length with the transformed values.\n- **`filter(callback)`**: Selects data. It loops over every element, keeps only the ones where the callback returns `true`, and returns a **new array** (usually shorter).\n- **`reduce(callback, initialValue)`**: Aggregates data. It loops over every element, accumulating a single result (like a sum, a single object, or a string). The callback receives `(accumulator, currentValue)`.\n\n## Search Methods\n- **`find(callback)`**: Returns the **first element** that matches. Returns `undefined` if not found.\n- **`findIndex(callback)`**: Returns the **index** of the first match. Returns `-1` if not found.\n- **`some(callback)`**: Returns `true` if **AT LEAST ONE** element passes the test.\n- **`every(callback)`**: Returns `true` if **ALL** elements pass the test.\n\n## Utility Methods\n- **`sort(compareFn)`**: MUTATES the original array! Sorts alphabetically by default (so `10` comes before `2`). Always provide a compare function for numbers: `(a, b) => a - b`.\n- **`flat(depth)`**: Flattens nested arrays. `[[1, 2], [3, 4]].flat()` becomes `[1, 2, 3, 4]`.",
    "keyRules": [
      "map, filter, and reduce do NOT mutate the original array",
      "reduce requires an initialValue to prevent bugs on empty arrays",
      "find returns the element, findIndex returns the index",
      "sort() MUTATES the array; use .toSorted() for immutable sorting (ES2023)",
      "Always pass (a, b) => a - b to sort numbers numerically"
    ],
    "task": "Given an array of products `{ name, price, inStock }`, use `filter` to remove out-of-stock items. Then use `map` to extract just the prices. Finally, use `reduce` to calculate the total cost of all in-stock products.",
    "hint": "Chain the methods: `products.filter(...).map(...).reduce(...)`. In reduce, the accumulator starts at 0, and you add the current price to it.",
    "learnings": [
      { "title": "Method Chaining", "desc": "Why map/filter/reduce chain beautifully (they all return arrays)." },
      { "title": "reduce for Grouping", "desc": "Using reduce to transform an array of objects into a dictionary/object." },
      { "title": "Short-circuiting with some/every", "desc": "How some() and every() stop iterating as soon as the result is known." }
    ],
    "starterCode": "// Task: Calculate total price of in-stock items\n\nconst products = [\n  { name: \"Laptop\", price: 999, inStock: true },\n  { name: \"Phone\", price: 599, inStock: false },\n  { name: \"Tablet\", price: 300, inStock: true },\n  { name: \"Monitor\", price: 200, inStock: true }\n];\n\n// 1. Filter out items where inStock is false\n\n// 2. Map the filtered array to just their prices\n\n// 3. Reduce the prices to a single total sum\n\nconsole.log(\"Total Cost:\", totalCost); // Expect 1499",
    "solutionCode": "// Task: Calculate total price of in-stock items\n\nconst products = [\n  { name: \"Laptop\", price: 999, inStock: true },\n  { name: \"Phone\", price: 599, inStock: false },\n  { name: \"Tablet\", price: 300, inStock: true },\n  { name: \"Monitor\", price: 200, inStock: true }\n];\n\nconst totalCost = products\n  // 1. Filter out items where inStock is false\n  .filter(product => product.inStock)\n  // 2. Map the filtered array to just their prices\n  .map(product => product.price)\n  // 3. Reduce the prices to a single total sum\n  .reduce((total, currentPrice) => total + currentPrice, 0);\n\nconsole.log(\"Total Cost:\", totalCost); // Expect 1499",
    "exampleCode": "// 🧠 Advanced Processor Patterns\n\nconst users = [\n  { name: \"Ali\", age: 25, active: true },\n  { name: \"Bob\", age: 17, active: true },\n  { name: \"Charlie\", age: 30, active: false }\n];\n\n// --- some & every ---\nconst hasMinors = users.some(u => u.age < 18); // true\nconst allActive = users.every(u => u.active);   // false\n\n// --- find & findIndex ---\nconst bob = users.find(u => u.name === \"Bob\");\nconst bobIndex = users.findIndex(u => u.name === \"Bob\");\n\n// --- reduce to Group By ---\nconst grouped = users.reduce((acc, user) => {\n  const key = user.active ? \"active\" : \"inactive\";\n  if (!acc[key]) acc[key] = [];\n  acc[key].push(user.name);\n  return acc;\n}, {});\n// Result: { active: ['Ali', 'Bob'], inactive: ['Charlie'] }\n\n// --- Safe Number Sort ---\nconst nums = [10, 2, 30, 1];\nnums.sort((a, b) => a - b); // [1, 2, 10, 30]",
    "tests": [
      { "id": "t1", "description": "Should use .filter() method", "check": "code => /\\.filter\\s*\\(/.test(code)" },
      { "id": "t2", "description": "Should use .map() method", "check": "code => /\\.map\\s*\\(/.test(code)" },
      { "id": "t3", "description": "Should use .reduce() method", "check": "code => /\\.reduce\\s*\\(/.test(code)" },
      { "id": "t4", "description": "filter should check inStock property", "check": "code => /inStock/.test(code)" },
      { "id": "t5", "description": "reduce should have an initial value of 0", "check": "code => /reduce\\s*\\(\\s*\\([^,]+\\s*,\\s*[^,]+\\s*\\)\\s*,\\s*0\\s*\\)/.test(code)" }
    ]
  },
  {
    "id": "16",
    "slug": "iterators-generators",
    "title": "Iterators & Generators",
    "icon": "Workflow",
    "overview": "Design custom data traversals and manage lazy-evaluated streams without loading everything into memory.",
    "explanation": "## The Iteration Protocol\n\nUnder the hood, when you use `for...of` on an array or a string, JavaScript uses the **Iterator Protocol**. Any object is \"iterable\" if it has a special method at `Symbol.iterator`. This method returns an object with a `next()` function.\n\nEvery time `next()` is called, it returns an object: `{ value: <currentItem>, done: <boolean> }`. When `done` is `true`, the loop stops.\n\n## What are Generators?\n\nWriting custom iterators manually requires a lot of boilerplate. **Generators** are a special class of functions that automatically implement the iterator protocol for you.\n\n- Declared with `function*` (note the asterisk).\n- They can pause execution using the `yield` keyword.\n- When called, they don't run immediately. They return a **Generator Object**.\n- You manually step through them using `gen.next()`.\n\n## Why Generators? (Lazy Evaluation)\n\nIf you need to process a massive sequence (e.g., numbers from 1 to 1 billion), a standard array would crash your memory. A generator yields one number at a time, keeping memory usage flat at O(1). It only computes the next value when you ask for it.",
    "keyRules": [
      "Generators are declared with function* syntax",
      "Use 'yield' to pause execution and return a value",
      "Calling a generator doesn't run it; it returns an iterator object",
      "Use gen.next() to step through, which returns { value, done }",
      "Generators enable lazy evaluation for infinite or massive datasets"
    ],
    "task": "Create a generator function `range(start, end)` that yields numbers from start to end. Then, write a standard function `printRange(gen)` that uses a `while` loop and `.next()` to manually iterate through the generator and log the values until `done` is true.",
    "hint": "Inside `function* range`, use a `for` loop and `yield i`. In `printRange`, create a variable `res = gen.next()`, do `while(!res.done)`, log `res.value`, and call `res = gen.next()` again.",
    "learnings": [
      { "title": "Yielding Delegation (yield*)", "desc": "Using yield* to delegate to another generator or iterable inside a generator." },
      { "title": "Sending Values Back In", "desc": "Passing arguments into gen.next(val) to send data back into the generator scope." },
      { "title": "Async Generators", "desc": "Using async function* and for await...of to handle asynchronous streams." }
    ],
    "starterCode": "// Task: Create a custom range generator\n\n// 1. Define the generator function\nfunction range(start, end) {\n  \n}\n\n// 2. Define the manual iterator function\nfunction printRange(gen) {\n  \n}\n\n// 3. Execute and print numbers 3 to 7\nconst gen = range(3, 7);\nprintRange(gen);",
    "solutionCode": "// Task: Create a custom range generator\n\n// 1. Define the generator function\nfunction* range(start, end) {\n  for (let i = start; i <= end; i++) {\n    yield i;\n  }\n}\n\n// 2. Define the manual iterator function\nfunction printRange(gen) {\n  let res = gen.next();\n  while (!res.done) {\n    console.log(res.value);\n    res = gen.next();\n  }\n}\n\n// 3. Execute and print numbers 3 to 7\nconst gen = range(3, 7);\nprintRange(gen);",
    "exampleCode": "// 🧠 Generator Internals & Lazy Evaluation\n\n// --- Infinite Generator (Safe because it's lazy) ---\nfunction* infiniteIds() {\n  let id = 1;\n  while (true) {\n    yield id++;\n  }\n}\n\nconst idGen = infiniteIds();\nconsole.log(idGen.next().value); // 1\nconsole.log(idGen.next().value); // 2\n// Never crashes, because it only calculates one at a time!\n\n// --- Using for...of (Auto-handles next/done) ---\nfunction* colors() {\n  yield 'Red';\n  yield 'Green';\n  yield 'Blue';\n}\n\nfor (const color of colors()) {\n  console.log(color); // Automatically stops when done is true\n}",
    "tests": [
      { "id": "t1", "description": "Should declare a generator function", "check": "code => /function\\s*\\*\\s*range/.test(code)" },
      { "id": "t2", "description": "Should use the 'yield' keyword", "check": "code => /yield\\s+/.test(code)" },
      { "id": "t3", "description": "Should use .next() method", "check": "code => /\\.next\\s*\\(\\s*\\)/.test(code)" },
      { "id": "t4", "description": "Should check the 'done' property", "check": "code => /res\\.done|result\\.done/.test(code)" },
      { "id": "t5", "description": "Should access the 'value' property", "check": "code => /res\\.value|result\\.value/.test(code)" }
    ]
  },
  {
    "id": "17",
    "slug": "objects-basics",
    "title": "Objects Basics",
    "icon": "Box",
    "overview": "Construct, modify, and query data records structured as Key-Value schemas using dot and bracket notations.",
    "explanation": "## What is an Object?\n\nAn object is an unordered collection of key-value pairs. It is the foundational data structure in JavaScript. Arrays are objects, functions are objects, even classes are just syntactic sugar over objects.\n\n## Creating Objects\n- **Object Literal:** `const obj = { key: 'value' };` (Preferred)\n- **Object Constructor:** `const obj = new Object();` (Avoid, slower and less readable)\n\n## Accessing Properties\n1. **Dot Notation (`obj.name`)**: Cleaner, but the key must be a valid identifier (no spaces, can't start with a number).\n2. **Bracket Notation (`obj[\"name\"]` or `obj[myVar]`)**: Required for dynamic keys (variables), keys with spaces, or keys that are numbers/strings starting with numbers.\n\n## Modifying Objects\nObjects are mutable by default. You can add new properties, update existing ones, or delete them using the `delete` operator at any time.",
    "keyRules": [
      "Use object literals {} to create objects",
      "Use dot notation for static, known keys",
      "Use bracket notation [] for dynamic keys or keys with special characters",
      "Objects are mutable; you can add/update/delete properties anytime",
      "Keys are always converted to strings (or Symbols) under the hood"
    ],
    "task": "Create a `user` object with name 'Ali'. Add a dynamic property where the key is stored in a variable called `keyName` (set to 'role') and the value is 'Admin'. Then, delete the `name` property. Finally, log the object to prove the changes.",
    "hint": "Use `user[keyName] = 'Admin'` for dynamic addition. Use `delete user.name` to remove. Log `user` at the end.",
    "learnings": [
      { "title": "Computed Property Names", "desc": "Defining dynamic keys directly inside the literal: { [variable]: value }." },
      { "title": "Property Value Shorthand", "desc": "Writing { name } instead of { name: name } when key and variable match." },
      { "title": "Symbol as Keys", "desc": "Using Symbols to create hidden properties not exposed in Object.keys()." }
    ],
    "starterCode": "// Task: Dynamic Keys and Mutations\n\n// 1. Create the initial object\nconst user = {\n  \n};\n\n// 2. Define a dynamic key and add it using bracket notation\nconst keyName = \"role\";\n\n\n// 3. Delete a property\n\n\n// 4. Log the final object\n",
    "solutionCode": "// Task: Dynamic Keys and Mutations\n\n// 1. Create the initial object\nconst user = {\n  name: \"Ali\"\n};\n\n// 2. Define a dynamic key and add it using bracket notation\nconst keyName = \"role\";\nuser[keyName] = \"Admin\";\n\n// 3. Delete a property\ndelete user.name;\n\n// 4. Log the final object\nconsole.log(user); // { role: 'Admin' }",
    "exampleCode": "// 🧠 Object Nuances\n\n// --- Computed Property Names (ES6) ---\nconst dynamicKey = \"status\";\nconst config = {\n  [dynamicKey]: \"active\", // Evaluates to \"status\": \"active\"\n  id: 101\n};\n\n// --- Keys are Strings ---\nconst obj = {};\nobj[1] = \"Number one\";\nobj[\"1\"] = \"String one\";\nconsole.log(obj); // { '1': 'String one' } (1 became '1')\n\n// --- Dot vs Bracket limits ---\nconst data = { \"first name\": \"Ali\" };\n// data.first name // SYNTAX ERROR!\nconsole.log(data[\"first name\"]); // Works perfectly",
    "tests": [
      { "id": "t1", "description": "Should create an object using literal syntax", "check": "code => /const\\s+user\\s*=\\s*\\{/.test(code)" },
      { "id": "t2", "description": "Should add a property using bracket notation", "check": "code => /user\\[keyName\\]\\s*=/.test(code)" },
      { "id": "t3", "description": "Should use the delete operator", "check": "code => /delete\\s+user/.test(code)" },
      { "id": "t4", "description": "Should have a variable named keyName", "check": "code => /const\\s+keyName\\s*=/.test(code)" },
      { "id": "t5", "description": "Should log the final object", "check": "code => /console\\.log\\s*\\(\\s*user\\s*\\)/.test(code)" }
    ]
  },
  {
    "id": "18",
    "slug": "object-transformation-security",
    "title": "Object Transformation & Security",
    "icon": "Lock",
    "overview": "Extract data structures, clone configurations, and freeze object mutability settings to prevent accidental changes.",
    "explanation": "## Object Static Methods\n\nJavaScript provides built-in methods on the `Object` constructor to transform and extract data:\n- **`Object.keys(obj)`**: Returns an array of string keys.\n- **`Object.values(obj)`**: Returns an array of values.\n- **`Object.entries(obj)`**: Returns an array of `[key, value]` tuples. Perfect for looping with `for...of`.\n- **`Object.assign(target, source)`**: Copies enumerable own properties from source to target. **Shallow copy only.**\n\n## Object Immutability (Security)\n\nBy default, anyone can modify your objects. To prevent this:\n- **`Object.freeze(obj)`**: Makes the object completely immutable. You cannot add, delete, or modify properties. Any attempt silently fails (or throws in strict mode).\n- **`Object.seal(obj)`**: You can modify existing properties, but you cannot add new properties or delete existing ones.\n- **Important:** Both of these are **shallow**. If your object contains a nested array or object, that nested reference can still be mutated unless you deep freeze it.",
    "keyRules": [
      "Object.entries() is best for iterating key-value pairs",
      "Object.assign() or spread {...} only create SHALLOW copies",
      "Object.freeze() prevents add, delete, AND update operations",
      "Object.seal() prevents add and delete, but allows updates",
      "Freeze and Seal are shallow; nested objects are still mutable"
    ],
    "task": "Create a `config` object with `theme: 'dark'` and `fontSize: 14`. Use `Object.freeze()` on it. Attempt to change `theme` to 'light'. Use `Object.entries()` to log the key-value pairs to prove the mutation failed.",
    "hint": "Call `Object.freeze(config)`. Then do `config.theme = 'light'`. Finally, loop over `Object.entries(config)` and `console.log` each pair.",
    "learnings": [
      { "title": "Deep Cloning", "desc": "Using structuredClone() (modern) or JSON.parse(JSON.stringify()) for true deep copies." },
      { "title": "Object.is()", "desc": "A stricter equality check than === that handles NaN and -0 correctly." },
      { "title": "Shallow Freeze Danger", "desc": "Why Object.freeze({ nested: { arr: [] } }) still allows arr.push()." }
    ],
    "starterCode": "// Task: Freeze an object and prove it's immutable\n\n// 1. Create the config object\n\n\n// 2. Freeze it\n\n\n// 3. Attempt to mutate it\n\n\n// 4. Use Object.entries() to log and prove it failed\n",
    "solutionCode": "// Task: Freeze an object and prove it's immutable\n\n// 1. Create the config object\nconst config = {\n  theme: \"dark\",\n  fontSize: 14\n};\n\n// 2. Freeze it\nObject.freeze(config);\n\n// 3. Attempt to mutate it\nconfig.theme = \"light\";\nconfig.newProp = \"oops\";\n\n// 4. Use Object.entries() to log and prove it failed\nconsole.log(\"Mutation failed. Config is still:\");\nfor (const [key, value] of Object.entries(config)) {\n  console.log(\`\${key}: \${value}\`);\n}",
    "exampleCode": "// 🧠 Object Methods & Security\n\n// --- Transformation ---\nconst user = { name: \"Ali\", age: 25, role: \"Admin\" };\n\nconst keys = Object.keys(user);     // ['name', 'age', 'role']\nconst vals = Object.values(user);   // ['Ali', 25, 'Admin']\nconst entries = Object.entries(user); // [['name','Ali'], ...]\n\n// --- Shallow Copy Pitfall ---\nconst original = { data: [1, 2, 3] };\nconst clone = Object.assign({}, original);\nclone.data.push(4);\nconsole.log(original.data); // [1, 2, 3, 4] (Mutated!)\n\n// --- Seal vs Freeze ---\nconst sealed = { a: 1 };\nObject.seal(sealed);\nsealed.a = 2; // Allowed\n// sealed.b = 3; // Fails silently\n\ndelete sealed.a; // Fails silently",
    "tests": [
      { "id": "t1", "description": "Should use Object.freeze()", "check": "code => /Object\\.freeze\\s*\\(/.test(code)" },
      { "id": "t2", "description": "Should attempt to reassign a property", "check": "code => /config\\.theme\\s*=/.test(code)" },
      { "id": "t3", "description": "Should use Object.entries()", "check": "code => /Object\\.entries\\s*\\(/.test(code)" },
      { "id": "t4", "description": "Should destructure key and value from entries", "check": "code => /\\[\\s*key\\s*,\\s*value\\s*\\]/.test(code)" },
      { "id": "t5", "description": "Should use a for...of loop", "check": "code => /for\\s*\\(.*of\\s+Object/.test(code)" }
    ]
  },
  {
    "id": "19",
    "slug": "destructuring-syntaxes",
    "title": "Destructuring Syntaxes",
    "icon": "GitMerge",
    "overview": "Unpack variables smoothly from complex structural collections using elegant, concise syntax.",
    "explanation": "## What is Destructuring?\n\nDestructuring is a syntactic sugar introduced in ES6 that allows you to unpack values from arrays or properties from objects into distinct variables. It makes code much cleaner, especially when dealing with function parameters or complex data structures.\n\n## Array Destructuring\nBased on **position** (order matters).\n```javascript\nconst colors = ['Red', 'Green', 'Blue'];\nconst [first, second] = colors;\n```\nYou can skip elements using empty commas: `const [first, , third] = colors;`.\n\n## Object Destructuring\nBased on **property names** (order does NOT matter). The variable name must exactly match the object key.\n```javascript\nconst user = { name: 'Ali', age: 25 };\nconst { name, age } = user;\n```\n\n## Renaming & Defaults\n- **Renaming:** `const { name: userName } = user;` (Extracts `name` but puts it in `userName` variable).\n- **Defaults:** `const { role = 'User' } = user;` (If `role` is missing or undefined, it falls back to 'User').\n\n## Nested Destructuring\nYou can drill down into nested objects directly: `const { address: { city } } = user;`",
    "keyRules": [
      "Array destructuring relies on order/position",
      "Object destructuring relies on matching property names",
      "Use colon : to rename variables during object destructuring",
      "Use equals = to set default fallback values",
      "Destructuring in function parameters makes APIs much cleaner"
    ],
    "task": "Write a function `displayUser` that takes an object as a parameter. Destructure `name`, rename `age` to `userAge`, and give `country` a default value of 'Pakistan'. Log these variables. Then, swap two variables `x` and `y` using array destructuring.",
    "hint": "Function signature: `function displayUser({ name, age: userAge, country = 'Pakistan' })`. Swap: `[x, y] = [y, x]`.",
    "learnings": [
      { "title": "Nested Destructuring", "desc": "Extracting deeply nested data like `const { a: { b: { c } } } = obj;`." },
      { "title": "Mixed Destructuring", "desc": "Destructuring an array where one element is an object." },
      { "title": "Loop Destructuring", "desc": "Using `for (const [key, value] of Object.entries(obj))` cleanly." }
    ],
    "starterCode": "// Task: Object Destructuring with Renaming/Defaults & Array Swap\n\n// 1. Write the destructuring function\nfunction displayUser(user) {\n  \n}\n\nconst profile = { name: \"Hamza\", age: 22 };\ndisplayUser(profile);\n\n// 2. Swap two variables using array destructuring\nlet x = 10;\nlet y = 20;\n\nconsole.log(`x: ${x}, y: ${y}`); // Expect x: 20, y: 10",
    "solutionCode": "// Task: Object Destructuring with Renaming/Defaults & Array Swap\n\n// 1. Write the destructuring function\nfunction displayUser({ name, age: userAge, country = \"Pakistan\" }) {\n  console.log(\`Name: \${name}, Age: \${userAge}, Country: \${country}\`);\n}\n\nconst profile = { name: \"Hamza\", age: 22 };\ndisplayUser(profile);\n\n// 2. Swap two variables using array destructuring\nlet x = 10;\nlet y = 20;\n[x, y] = [y, x];\n\nconsole.log(`x: \${x}, y: \${y}`); // Expect x: 20, y: 10",
    "exampleCode": "// 🧠 Advanced Destructuring\n\n// --- Nested Object Destructuring ---\nconst response = {\n  data: { user: { id: 1, name: \"Ali\" } }\n};\n\nconst { data: { user: { name } } } = response;\nconsole.log(name); // \"Ali\"\n\n// --- Array Destructuring with Defaults ---\nconst numbers = [1];\nconst [a, b = 99] = numbers;\nconsole.log(b); // 99 (fallback used)\n\n// --- Mixed Destructuring ---\nconst mixed = [1, { status: \"ok\" }];\nconst [id, { status }] = mixed;\nconsole.log(status); // \"ok\"",
    "tests": [
      { "id": "t1", "description": "Should destructure in function parameters", "check": "code => /function\\s+displayUser\\s*\\(\\s*\\{/.test(code)" },
      { "id": "t2", "description": "Should rename 'age' to 'userAge'", "check": "code => /age\\s*:\\s*userAge/.test(code)" },
      { "id": "t3", "description": "Should provide a default value for 'country'", "check": "code => /country\\s*=\\s*[\"']Pakistan[\"']/.test(code)" },
      { "id": "t4", "description": "Should use array destructuring to swap x and y", "check": "code => /\\[\\s*x\\s*,\\s*y\\s*\\]\\s*=\\s*\\[\\s*y\\s*,\\s*x\\s*\\]/.test(code)" },
      { "id": "t5", "description": "Should use template literals for logging", "check": "code => /`.*\\$\\{/.test(code)" }
    ]
  },
  {
    "id": "20",
    "slug": "spread-rest-operators",
    "title": "Spread & Rest Operators",
    "icon": "MoreHorizontal",
    "overview": "Unpack elements and capture multi-argument parameters cleanly using the exact same ... syntax.",
    "explanation": "## The `...` Syntax Duality\n\nThe `...` syntax does two completely opposite things depending on WHERE you use it:\n\n### 1. The Spread Operator\n**Where:** In an array literal `[...]` or object literal `{...}`, or in function arguments `func(...arr)`.\n**What it does:** Unpacks/Expands an iterable into individual elements.\n- **Copying:** `const copy = [...arr];` or `const clone = {...obj};`\n- **Merging:** `const merged = [...arr1, ...arr2];`\n- **Applying Functions:** `Math.max(...nums)` (unpacks array so Math.max gets numbers, not an array).\n\n### 2. The Rest Parameter\n**Where:** In a function definition's parameter list `function func(...args) {}`.\n**What it does:** Condenses all remaining arguments into a single array.\n- Replaces the old, clunky `arguments` object (which isn't a real array).\n- Must be the LAST parameter: `function func(a, b, ...rest) {}`\n\n## Key Difference\n- Spread takes an array/object and turns it into comma-separated values.\n- Rest takes comma-separated values and packs them into an array.",
    "keyRules": [
      "Spread expands an array/object into individual elements",
      "Rest parameters pack individual function arguments into a single array",
      "Spread creates SHALLOW copies of arrays and objects",
      "Rest parameter MUST be the last parameter in a function definition",
      "Math.max() and Math.min() require spread to accept arrays"
    ],
    "task": "Create an object `defaults` with `theme: 'light'` and `lang: 'en'`. Create another object `userPrefs` with `theme: 'dark'`. Use spread to merge them into `settings`, ensuring `userPrefs` overrides `defaults`. Then, write a function `sum(...nums)` that sums all passed arguments using rest parameters.",
    "hint": "Merge: `const settings = { ...defaults, ...userPrefs }`. Rest function: `function sum(...nums) { return nums.reduce(...) }`. Call `sum(1,2,3,4)`.",
    "learnings": [
      { "title": "Overriding Keys", "desc": "Why order matters in spread: { ...a, ...b } means b's keys overwrite a's keys." },
      { "title": "Arguments vs Rest", "desc": "Why 'arguments' is array-like but 'rest' is a true array (has .map, .filter)." },
      { "title": "Spreading Strings", "desc": "Using [...'hello'] to quickly turn a string into an array of characters." }
    ],
    "starterCode": "// Task: Spread for Merging & Rest for Parameters\n\n// 1. Define defaults and userPrefs\n\n\n// 2. Merge them using spread (userPrefs should win)\nconst settings = undefined;\n\nconsole.log(settings); // Expect { theme: 'dark', lang: 'en' }\n\n// 3. Write a sum function using rest parameters\nfunction sum() {\n  \n}\n\nconsole.log(sum(10, 20, 30)); // Expect 60",
    "solutionCode": "// Task: Spread for Merging & Rest for Parameters\n\n// 1. Define defaults and userPrefs\nconst defaults = { theme: \"light\", lang: \"en\" };\nconst userPrefs = { theme: \"dark\" };\n\n// 2. Merge them using spread (userPrefs should win)\nconst settings = { ...defaults, ...userPrefs };\n\nconsole.log(settings); // Expect { theme: 'dark', lang: 'en' }\n\n// 3. Write a sum function using rest parameters\nfunction sum(...nums) {\n  return nums.reduce((total, n) => total + n, 0);\n}\n\nconsole.log(sum(10, 20, 30)); // Expect 60",
    "exampleCode": "// 🧠 Spread & Rest Magic\n\n// --- Spreading into Functions ---\nconst scores = [85, 92, 78];\nconst max = Math.max(...scores); // 92\n\n// --- Rest vs Arguments ---\nfunction oldWay() {\n  // console.log(arguments.map(x => x * 2)); // ERROR! arguments is not a real array\n  console.log(Array.from(arguments).map(x => x * 2)); // Clunky workaround\n}\n\nfunction newWay(...args) {\n  console.log(args.map(x => x * 2)); // Works perfectly!\n}\n\n// --- Immutable Array Updates ---\nconst original = [1, 2, 3];\n// Instead of original.push(4) (mutation)\nconst updated = [...original, 4]; // New array [1,2,3,4]\n\n// Instead of original.splice(1, 1) (mutation)\nconst filtered = original.filter(n => n !== 2);",
    "tests": [
      { "id": "t1", "description": "Should use spread operator to merge objects", "check": "code => /\\{\\s*\\.\\.\\.defaults\\s*,\\s*\\.\\.\\.userPrefs\\s*\\}/.test(code)" },
      { "id": "t2", "description": "Should use rest parameters in function definition", "check": "code => /function\\s+sum\\s*\\(\\s*\\.\\.\\.\\w+\\s*\\)/.test(code)" },
      { "id": "t3", "description": "Should use reduce to sum the rest array", "check": "code => /reduce\\s*\\(/.test(code)" },
      { "id": "t4", "description": "Should pass multiple arguments to sum()", "check": "code => /sum\\s*\\(\\s*10\\s*,\\s*20\\s*,\\s*30\\s*\\)/.test(code)" },
      { "id": "t5", "description": "Should define defaults and userPrefs objects", "check": "code => /const\\s+defaults/.test(code) && /const\\s+userPrefs/.test(code)" }
    ]
  },
  {
    "id": "21",
    "slug": "json-operations",
    "title": "JSON Operations",
    "icon": "FileJson",
    "overview": "Serialize internal objects to strings and parse external string data for storage or transmission.",
    "explanation": "## What is JSON?\n\nJSON (JavaScript Object Notation) is a lightweight, text-based format for storing and transporting data. It is language-independent but uses syntax heavily borrowed from JavaScript objects.\n\n**Key difference from JS Objects:** JSON requires double quotes `\"` around all keys and string values. It does NOT support comments, functions, `undefined`, or `Symbol`.\n\n## The Two Core Methods\n\n- **`JSON.stringify(value, replacer, space)`**: Converts a JS object/array into a JSON string.\n  - *Replacer*: A function or array to filter which properties get stringified.\n  - *Space*: A number or string used for white-space indentation to make the output readable.\n  - *Pitfall*: It ignores functions, `undefined`, and `Symbol` properties. It throws an error on circular references.\n\n- **`JSON.parse(text, reviver)`**: Converts a valid JSON string back into a live JavaScript object.\n  - *Reviver*: A transformation function that runs on every key-value pair as it's parsed. Great for automatically converting date strings back into Date objects.\n\n## Deep Cloning\n\n`JSON.parse(JSON.stringify(obj))` is a famous, quick-and-dirty way to deep clone simple data objects. However, it fails if your object contains functions, `Date` objects (they become strings), `RegExp`, `Map`/`Set`, or `undefined`.",
    "keyRules": [
      "JSON.stringify converts JS objects to strings; JSON.parse converts strings back",
      "JSON requires double quotes for keys and string values",
      "JSON cannot handle functions, undefined, or circular references",
      "Use the 'space' parameter in stringify for pretty-printing",
      "JSON parse/stringify is a quick but flawed way to deep clone data"
    ],
    "task": "Create a `config` object with `port: 3000`, `debug: true`, and a nested `db: { host: 'localhost' }`. Use `JSON.stringify` with a 2-space indentation to log it. Then, parse it back and prove it's a deep clone by modifying the parsed object's db.host and logging the original.",
    "hint": "Stringify: `JSON.stringify(config, null, 2)`. Parse: `const clone = JSON.parse(jsonStr)`. Modify `clone.db.host = 'remote'`. Log `config.db.host` to show it's still 'localhost'.",
    "learnings": [
      { "title": "The Reviver Function", "desc": "Using the second argument of JSON.parse to transform values during parsing (e.g., converting date strings to Date objects)." },
      { "title": "Handling Circular References", "desc": "Why JSON.stringify({ a: 1 }) { this.a = this } throws a TypeError." },
      { "title": "Custom toJSON()", "desc": "Adding a toJSON() method to your class to control exactly how it gets serialized." }
    ],
    "starterCode": "// Task: Stringify, Parse, and Prove Deep Clone\n\n// 1. Create the config object\n\n// 2. Stringify it with 2-space indentation and log\n\n// 3. Parse it back into a new variable\n\n// 4. Mutate the parsed object's nested property\n\n// 5. Log the original object to prove it's unaffected",
    "solutionCode": "// Task: Stringify, Parse, and Prove Deep Clone\n\n// 1. Create the config object\nconst config = {\n  port: 3000,\n  debug: true,\n  db: { host: 'localhost' }\n};\n\n// 2. Stringify it with 2-space indentation and log\nconst jsonStr = JSON.stringify(config, null, 2);\nconsole.log(\"JSON String:\\n\", jsonStr);\n\n// 3. Parse it back into a new variable\nconst clone = JSON.parse(jsonStr);\n\n// 4. Mutate the parsed object's nested property\nclone.db.host = 'remote';\n\n// 5. Log the original object to prove it's unaffected\nconsole.log(\"\\nOriginal db.host:\", config.db.host); // 'localhost'\nconsole.log(\"Cloned db.host:\", clone.db.host);   // 'remote'",
    "exampleCode": "// 🧠 Advanced JSON Tricks\n\n// --- The Replacer Function ---\nconst user = { name: \"Ali\", password: \"1234\", age: 25 };\nconst safeString = JSON.stringify(user, (key, value) => {\n  if (key === 'password') return undefined; // Hide password\n  return value;\n});\n// Result: '{\"name\":\"Ali\",\"age\":25}'\n\n// --- Parsing with a Reviver ---\nconst json = '{\"date\": \"2023-10-25T10:00:00Z\"}';\nconst obj = JSON.parse(json, (key, value) => {\n  if (key === 'date') return new Date(value);\n  return value;\n});\n// obj.date is now a real Date object!",
    "tests": [
      { "id": "t1", "description": "Should use JSON.stringify", "check": "code => /JSON\\.stringify\\s*\\(/.test(code)" },
      { "id": "t2", "description": "Should pass 2 as the space parameter", "check": "code => /JSON\\.stringify\\s*\\([^,]+,\\s*null\\s*,\\s*2\\s*\\)/.test(code)" },
      { "id": "t3", "description": "Should use JSON.parse", "check": "code => /JSON\\.parse\\s*\\(/.test(code)" },
      { "id": "t4", "description": "Should have a nested object property", "check": "code => /db\\s*:\\s*\\{/.test(code)" },
      { "id": "t5", "description": "Should mutate the cloned nested property", "check": "code => /clone\\.db\\.host\\s*=/.test(code)" }
    ]
  },
  {
    "id": "22",
    "slug": "dom-tree-architecture",
    "title": "DOM Tree Architecture",
    "icon": "Network",
    "overview": "Explore how the browser interprets document nodes and interfaces.",
    "showInApp": false,
    "explanation": "## What is the DOM?\n\nThe Document Object Model (DOM) is a programming interface provided by the browser that represents the structure of an HTML or XML document as a tree of objects. Each element, attribute, and piece of text becomes a **node** in this tree.\n\n**Key Point:** The DOM is NOT the HTML source code. The browser parses HTML, creates the DOM tree, and may fix/normalize invalid HTML in the process.\n\n## DOM Tree Structure\n\n- **Document Node**: The root of the tree, represented by `document`.\n- **Element Nodes**: HTML tags like `<div>`, `<p>`, `<h1>`.\n- **Text Nodes**: The actual text content inside elements.\n- **Attribute Nodes**: Attributes like `class`, `id`, `src`.\n- **Comment Nodes**: HTML comments `<!-- -->`.\n\n## Relational Hierarchies\n\n- **Parent**: The direct node one level above. `element.parentNode`\n- **Children**: All direct nodes one level below. `element.childNodes` (includes text nodes) vs `element.children` (only element nodes).\n- **Siblings**: Nodes at the same level. `element.nextSibling`, `element.previousSibling`, `element.nextElementSibling`, `element.previousElementSibling`.\n\n## Window vs Document\n\n- **`window`**: The global object representing the browser tab itself. It holds `setTimeout`, `alert`, `localStorage`, `location`, `history`, etc.\n- **`document`**: A property of `window` that specifically represents the loaded page's DOM tree. It holds methods like `querySelector`, `createElement`, `getElementById`.\n\n`window.document === document` evaluates to `true`.",
    "keyRules": [
      "DOM is a tree of objects, not the raw HTML source",
      "childNodes includes text/comment nodes; children only includes element nodes",
      "document is a property of window — window is the global browser scope",
      "Every DOM node inherits from the EventTarget prototype",
      "The DOM is live — changes you make are immediately reflected in the browser"
    ],
    "task": "Given a `ul#list` with 3 `li` items, write a script that logs the nodeName of the `ul`'s parent, counts only element children (not text nodes) of the `ul`, and logs whether `document === window.document`.",
    "hint": "Use `document.querySelector('#list').parentNode.nodeName`, `.children.length`, and a strict equality check.",
    "learnings": [
      { "title": "What is DOM", "desc": "Analyzing the Document Object Model programming interface structure." },
      { "title": "DOM Tree Model", "desc": "Tracking relational hierarchies across Parent, Child, and Sibling structures." },
      { "title": "Window vs Document", "desc": "Differentiating the global browser tab canvas from active page content frames." }
    ],
    "starterCode": "// Task: Explore DOM Tree Relationships\n\n// 1. Get the ul#list element\n\n// 2. Log the nodeName of its parent\n\n// 3. Count ONLY element children (not text nodes)\n\n// 4. Check if document === window.document",
    "solutionCode": "// Task: Explore DOM Tree Relationships\n\n// 1. Get the ul#list element\nconst list = document.querySelector('#list');\n\n// 2. Log the nodeName of its parent\nconsole.log('Parent nodeName:', list.parentNode.nodeName); // 'BODY' or 'DIV'\n\n// 3. Count ONLY element children (not text nodes)\nconsole.log('Element children count:', list.children.length); // 3\n\n// 4. Check if document === window.document\nconsole.log('document === window.document:', document === window.document); // true",
    "exampleCode": "// 🧠 DOM Tree Traversal Deep Dive\n\nconst ul = document.querySelector('#list');\n\n// childNodes vs children\nconsole.log(ul.childNodes.length); // 7 (includes whitespace text nodes!)\nconsole.log(ul.children.length);   // 3 (only <li> elements)\n\n// First and last element child\nconst first = ul.firstElementChild;\nconst last = ul.lastElementChild;\nconsole.log(first.textContent, last.textContent);\n\n// Walking up to the root\nlet node = ul;\nwhile (node.parentNode) {\n  console.log(node.nodeName);\n  node = node.parentNode;\n}\n// Outputs: UL -> BODY -> HTML -> DOCUMENT",
    "tests": [
      { "id": "t1", "description": "Should select #list", "check": "code => /querySelector\\s*\\(\\s*['\"]#list['\"]\\s*\\)/.test(code)" },
      { "id": "t2", "description": "Should access parentNode", "check": "code => /\\.parentNode/.test(code)" },
      { "id": "t3", "description": "Should use .children not .childNodes", "check": "code => /\\.children\\.length/.test(code)" },
      { "id": "t4", "description": "Should compare document and window.document", "check": "code => /document\\s*===\\s*window\\.document/.test(code)" }
    ]
  },
  {
    "id": "23",
    "slug": "dom-query-manipulation",
    "title": "DOM Query & Manipulation",
    "icon": "MousePointerClick",
    "overview": "Locate elements and update document structures at runtime.",
    "showInApp": false,
    "explanation": "## Selecting Nodes\n\nModern JavaScript provides two primary methods for querying the DOM:\n\n- **`querySelector(selector)`**: Returns the **first** element matching a CSS selector.\n- **`querySelectorAll(selector)`**: Returns a **static NodeList** of ALL matching elements.\n\n**Legacy methods** (avoid in new code): `getElementById`, `getElementsByClassName`, `getElementsByTagName`. These return **live** collections that update if the DOM changes.\n\n**NodeList vs HTMLCollection:** `querySelectorAll` returns a static NodeList (you can `forEach` it). Legacy methods return live HTMLCollections (no `forEach` natively, but they auto-update).\n\n## Modifying Content\n\n- **`textContent`**: Gets/sets the raw text of an element AND all descendants. Safest option — no XSS risk.\n- **`innerText`**: Similar to `textContent` but respects CSS styling (hidden elements return empty string). Triggers reflow — slower.\n- **`innerHTML`**: Gets/sets the HTML markup inside an element. **XSS risk** if inserting user input.\n\n## Attributes & Style Updates\n\n- **`element.setAttribute(name, value)`** / **`element.getAttribute(name)`**: Standard attribute API.\n- **`element.dataset`**: Access `data-*` attributes (`data-user-id` → `element.dataset.userId`).\n- **`element.classList`**: `.add()`, `.remove()`, `.toggle()`, `.contains()`, `.replace()`.\n- **`element.style`**: Direct inline styles. Properties are camelCase: `element.style.backgroundColor = 'red'`.\n\n## Creating & Inserting Elements\n\n- **`document.createElement(tag)`**: Creates a new element node.\n- **`parent.appendChild(child)`**: Appends as last child.\n- **`parent.insertBefore(newNode, referenceNode)`**: Inserts before a reference.\n- **`element.remove()`**: Removes the element from the DOM.",
    "keyRules": [
      "Always prefer querySelector/querySelectorAll over legacy methods",
      "Use textContent over innerHTML when setting plain text to prevent XSS",
      "classList.toggle is the cleanest way to add/remove a class",
      "querySelectorAll returns a static NodeList, not a live collection",
      "element.style sets inline styles — for multiple styles use classList instead"
    ],
    "task": "Select the `div.card` element. Change its text to 'Modified Card', add a class 'highlight' using classList, set a `data-status` attribute to 'active', and change its background color to yellow using the style object. Then append a new `<p>New Paragraph</p>` inside it.",
    "hint": "Chain `classList.add('highlight')`, `setAttribute('data-status', 'active')`, `style.backgroundColor = 'yellow'`, and `appendChild(document.createElement('p'))`.",
    "learnings": [
      { "title": "Selecting Nodes", "desc": "Querying targets using modern querySelector and querySelectorAll API methods." },
      { "title": "Modifying Content", "desc": "Updating UI views using textContent, innerText, and innerHTML properties." },
      { "title": "Attributes & Style updates", "desc": "Mutating element classes via classList and applying direct inline CSS adjustments." }
    ],
    "starterCode": "// Task: Query and Manipulate a DOM Element\n\n// 1. Select the div.card element\n\n// 2. Change its text to 'Modified Card'\n\n// 3. Add class 'highlight'\n\n// 4. Set data-status to 'active'\n\n// 5. Set background color to yellow via style\n\n// 6. Append a new <p>New Paragraph</p> inside it",
    "solutionCode": "// Task: Query and Manipulate a DOM Element\n\n// 1. Select the div.card element\nconst card = document.querySelector('div.card');\n\n// 2. Change its text to 'Modified Card'\ncard.textContent = 'Modified Card';\n\n// 3. Add class 'highlight'\ncard.classList.add('highlight');\n\n// 4. Set data-status to 'active'\ncard.setAttribute('data-status', 'active');\n\n// 5. Set background color to yellow via style\ncard.style.backgroundColor = 'yellow';\n\n// 6. Append a new <p>New Paragraph</p> inside it\nconst p = document.createElement('p');\np.textContent = 'New Paragraph';\ncard.appendChild(p);",
    "exampleCode": "// 🧠 Advanced Manipulation Patterns\n\n// querySelectorAll with forEach\ndocument.querySelectorAll('.item').forEach((item, i) => {\n  item.dataset.index = i;\n});\n\n// classList operations\ncard.classList.toggle('active');   // add if missing, remove if present\ncard.classList.replace('old', 'new'); // swap classes\nconsole.log(card.classList.contains('highlight')); // true/false\n\n// Safe HTML insertion (no XSS)\nfunction setSafeHTML(el, html) {\n  const temp = document.createElement('div');\n  temp.textContent = html; // escapes HTML\n  el.innerHTML = temp.innerHTML;\n}\n\n// Removing elements\ndocument.querySelector('.old-card')?.remove();",
    "tests": [
      { "id": "t1", "description": "Should select div.card", "check": "code => /querySelector\\s*\\(\\s*['\"]div\\.card['\"]\\s*\\)/.test(code)" },
      { "id": "t2", "description": "Should use textContent", "check": "code => /\\.textContent\\s*=/.test(code)" },
      { "id": "t3", "description": "Should use classList.add", "check": "code => /classList\\.add\\s*\\(/.test(code)" },
      { "id": "t4", "description": "Should set a data attribute", "check": "code => /setAttribute\\s*\\(\\s*['\"]data-/.test(code)" },
      { "id": "t5", "description": "Should use style object", "check": "code => /\\.style\\./.test(code)" },
      { "id": "t6", "description": "Should create and append element", "check": "code => /createElement\\s*\\(/.test(code) && /appendChild\\s*\\(/.test(code)" }
    ]
  },
  {
    "id": "24",
    "slug": "browser-event-mechanics",
    "title": "Browser Event Mechanics",
    "icon": "Zap",
    "overview": "Bind interactors to capture precise desktop and mouse events.",
    "showInApp": false,
    "explanation": "## Event Listeners\n\n**`addEventListener(event, handler, options)`** is the modern way to bind events. It replaces inline `onclick` attributes which mix HTML and JS.\n\n```js\nbtn.addEventListener('click', handleClick, { once: true, capture: false });\n```\n\n**Options object:**\n- `once: true` — auto-removes listener after first trigger.\n- `capture: true` — listen during capture phase (default is false = bubble phase).\n- `passive: true` — promises not to call `preventDefault()` (enables scroll performance).\n\n**Removing listeners:** You must pass the exact same function reference to `removeEventListener`. Anonymous functions cannot be removed.\n\n## Bubbling vs Capturing\n\nWhen an event occurs, it travels in **three phases**:\n\n1. **Capture Phase** (top → down): Event travels from `window` down to the target element.\n2. **Target Phase**: Event reaches the actual element that was clicked.\n3. **Bubble Phase** (bottom → up): Event bubbles back up from target to `window`.\n\n**Default is bubbling.** Most handlers listen during the bubble phase. Use `capture: true` to intercept during the downward pass.\n\n**Not all events bubble:** `focus`, `blur`, `mouseenter`, `mouseleave` do NOT bubble. Use `focusin`/`focusout` for bubbling versions.\n\n## The Event Object\n\nEvery handler receives an `Event` object with useful properties:\n\n- **`event.target`**: The actual element that triggered the event (may be a child).\n- **`event.currentTarget`**: The element the listener is attached to.\n- **`event.type`**: The event name (`'click'`, `'keydown'`, etc.).\n- **`event.timeStamp`**: Milliseconds since page load.\n- **Mouse events**: `clientX/Y` (viewport), `pageX/Y` (document), `button`.\n- **Keyboard events**: `key`, `code`, `ctrlKey`, `shiftKey`, `altKey`.",
    "keyRules": [
      "Always use addEventListener — never inline onclick handlers",
      "To remove a listener, you must store the function reference first",
      "Events travel down (capture) then up (bubble) — default listeners use bubble",
      "event.target is what was clicked; event.currentTarget is where the listener lives",
      "focus/blur don't bubble — use focusin/focusout instead"
    ],
    "task": "Attach a click listener to a `div.outer` that logs `event.target.tagName` and `event.currentTarget.id`. Then attach a click listener to a `div.inner` (inside outer) with `capture: true` that logs 'Capture phase hit'. Verify the capture log fires before the outer's bubble log.",
    "hint": "Add the outer listener normally (bubble phase). Add the inner listener with `{ capture: true }`. Click the inner div and observe the log order.",
    "learnings": [
      { "title": "Event Listeners", "desc": "Attaching structural action observers via modern addEventListener hooks." },
      { "title": "Bubbling vs Capturing", "desc": "Tracking propagation routes down capture nodes vs up to global frames." },
      { "title": "Event Object", "desc": "Extracting real-time telemetry like mouse coordinates and key triggers." }
    ],
    "starterCode": "// Task: Demonstrate Capture vs Bubble & Event Object\n\n// 1. Attach a bubble-phase click listener to div.outer\n//    Log target.tagName and currentTarget.id\n\n// 2. Attach a capture-phase click listener to div.inner\n//    Log 'Capture phase hit'\n\n// 3. (Test by clicking div.inner in the browser)",
    "solutionCode": "// Task: Demonstrate Capture vs Bubble & Event Object\n\n// 1. Attach a bubble-phase click listener to div.outer\nconst outer = document.querySelector('div.outer');\nouter.addEventListener('click', (e) => {\n  console.log('Bubble:', e.target.tagName, e.currentTarget.id);\n});\n\n// 2. Attach a capture-phase click listener to div.inner\nconst inner = document.querySelector('div.inner');\ninner.addEventListener('click', () => {\n  console.log('Capture phase hit');\n}, { capture: true });\n\n// When clicking div.inner:\n// 1st log: 'Capture phase hit' (capture phase, top-down)\n// 2nd log: 'Bubble: DIV inner' (target phase + bubble phase)",
    "exampleCode": "// 🧠 Advanced Event Patterns\n\n// Named function for removable listeners\nfunction handleClick(e) {\n  console.log('Clicked!', e.target);\n  btn.removeEventListener('click', handleClick);\n}\nconst btn = document.querySelector('#myBtn');\nbtn.addEventListener('click', handleClick);\n\n// once option — auto-removes after first fire\nbtn.addEventListener('click', () => {\n  console.log('This runs only once');\n}, { once: true });\n\n// Keyboard event details\ndocument.addEventListener('keydown', (e) => {\n  console.log(e.key);      // 'a', 'Enter', 'Shift'\n  console.log(e.code);     // 'KeyA', 'Enter', 'ShiftLeft'\n  console.log(e.ctrlKey);  // true if Ctrl is held\n});\n\n// Mouse position relative to element\nbox.addEventListener('mousemove', (e) => {\n  const rect = box.getBoundingClientRect();\n  const x = e.clientX - rect.left;\n  const y = e.clientY - rect.top;\n});",
    "tests": [
      { "id": "t1", "description": "Should select div.outer", "check": "code => /querySelector\\s*\\(\\s*['\"]div\\.outer['\"]\\s*\\)/.test(code)" },
      { "id": "t2", "description": "Should use event.target", "check": "code => /e\\.target/.test(code) || /event\\.target/.test(code)" },
      { "id": "t3", "description": "Should use event.currentTarget", "check": "code => /e\\.currentTarget/.test(code) || /event\\.currentTarget/.test(code)" },
      { "id": "t4", "description": "Should use capture: true", "check": "code => /capture\\s*:\\s*true/.test(code)" },
      { "id": "t5", "description": "Should use addEventListener", "check": "code => /addEventListener\\s*\\(/.test(code)" }
    ]
  },
  {
    "id": "25",
    "slug": "advanced-event-delegation",
    "title": "Advanced Event Delegation",
    "icon": "ShieldAlert",
    "overview": "Optimize application memory footprints by decoupling interaction handlers.",
    "showInApp": false,
    "explanation": "## Event Delegation\n\nInstead of attaching an event listener to every child element, you attach **one listener to a common parent** and use `event.target` to determine which child was interacted with.\n\n**Why delegate?**\n- Memory efficiency: 1 listener instead of 1000.\n- Dynamic elements: Works on elements added to the DOM after the listener was set.\n- Simpler teardown: Remove one listener, not hundreds.\n\n**Pattern:**\n```js\nparent.addEventListener('click', (e) => {\n  const btn = e.target.closest('.action-btn');\n  if (!btn) return; // clicked outside any button\n  console.log('Clicked:', btn.dataset.id);\n});\n```\n\n**`closest(selector)`** is critical here — it walks UP from `event.target` to find the nearest ancestor matching the selector. This handles cases where the user clicks a `<span>` inside a `<button>`.\n\n## preventDefault()\n\nStops the browser's default action for the event:\n- `<form>` submit → prevents page reload.\n- `<a href>` click → prevents navigation.\n- `contextmenu` → prevents right-click menu.\n- `keydown` for certain keys → prevents typing.\n\n**It does NOT stop propagation.** The event still bubbles.\n\n## stopPropagation()\n\nStops the event from propagating to parent elements (both capture and bubble). The event won't reach any other listeners on ancestor elements.\n\n**`stopImmediatePropagation()`** goes further — it also prevents other listeners on the SAME element from firing.\n\n**Caution:** Overusing `stopPropagation()` creates brittle, tightly-coupled code. Prefer `event.target` checks over stopping propagation.",
    "keyRules": [
      "Use event delegation for lists, tables, and dynamically added elements",
      "Always use closest() with delegation — event.target may be a child element",
      "preventDefault stops browser default action but does NOT stop propagation",
      "stopPropagation stops the event from reaching parent listeners",
      "stopImmediatePropagation also blocks other listeners on the same element"
    ],
    "task": "Given a `ul#items` with several `li[data-id]` elements, attach a SINGLE click listener to the `ul`. Use `closest('li')` to find the clicked item and log its `data-id`. Also, prevent a nested `<a>` tag inside any `li` from navigating using `preventDefault`.",
    "hint": "On the ul listener, check `e.target.closest('li')` and log `.dataset.id`. If `e.target.closest('a')` exists, call `e.preventDefault()`.",
    "learnings": [
      { "title": "Event Delegation", "desc": "Attaching a single parent handler to govern hundreds of dynamic children inputs." },
      { "title": "preventDefault", "desc": "Canceling native browser defaults like form posts and link navs." },
      { "title": "stopPropagation", "desc": "Halting active event propagation runs across parent bubble nodes." }
    ],
    "starterCode": "// Task: Event Delegation with preventDefault\n\n// 1. Select ul#items\n\n// 2. Attach a single click listener to it\n\n// 3. Use closest('li') to find the clicked item\n\n// 4. Log the data-id of the clicked li\n\n// 5. If an <a> was clicked inside, prevent default navigation",
    "solutionCode": "// Task: Event Delegation with preventDefault\n\n// 1. Select ul#items\nconst list = document.querySelector('ul#items');\n\n// 2. Attach a single click listener to it\nlist.addEventListener('click', (e) => {\n  // 5. If an <a> was clicked inside, prevent default navigation\n  const link = e.target.closest('a');\n  if (link) {\n    e.preventDefault();\n  }\n\n  // 3. Use closest('li') to find the clicked item\n  const li = e.target.closest('li');\n  if (!li) return;\n\n  // 4. Log the data-id of the clicked li\n  console.log('Clicked item ID:', li.dataset.id);\n});",
    "exampleCode": "// 🧠 Delegation with Dynamic Elements\n\nconst list = document.querySelector('#items');\n\n// This single listener handles ALL items, even future ones!\nlist.addEventListener('click', (e) => {\n  const item = e.target.closest('[data-action]');\n  if (!item) return;\n\n  const action = item.dataset.action;\n  \n  if (action === 'delete') {\n    item.closest('li').remove();\n  } else if (action === 'edit') {\n    console.log('Editing:', item.closest('li').dataset.id);\n  }\n});\n\n// Adding a new item AFTER the listener was set — still works!\nconst newLi = document.createElement('li');\nnewLi.dataset.id = '99';\nnewLi.innerHTML = '<button data-action=\"delete\">X</button> New Item';\nlist.appendChild(newLi);\n\n// stopPropagation vs stopImmediatePropagation\nparent.addEventListener('click', (e) => {\n  e.stopImmediatePropagation(); // blocks BOTH parent + sibling listeners\n  console.log('Listener 1');\n});\nparent.addEventListener('click', () => {\n  console.log('This will NOT fire');\n});",
    "tests": [
      { "id": "t1", "description": "Should select ul#items", "check": "code => /querySelector\\s*\\(\\s*['\"]ul#items['\"]\\s*\\)/.test(code)" },
      { "id": "t2", "description": "Should use closest('li')", "check": "code => /closest\\s*\\(\\s*['\"]li['\"]\\s*\\)/.test(code)" },
      { "id": "t3", "description": "Should access dataset.id", "check": "code => /dataset\\.id/.test(code)" },
      { "id": "t4", "description": "Should use preventDefault", "check": "code => /preventDefault\\s*\\(\\s*\\)/.test(code)" },
      { "id": "t5", "description": "Should only have ONE addEventListener on the parent", "check": "code => (code.match(/addEventListener\\s*\\(/g) || []).length <= 2" }
    ]
  },
  {
    "id": "26",
    "slug": "web-storage-mechanisms",
    "title": "Web Storage Mechanisms",
    "icon": "HardDrive",
    "showInApp": false,
    "overview": "Persist operational state variables locally within client environments.",
    "explanation": "## Web Storage API\n\nThe Web Storage API provides two mechanisms for storing key-value pairs in the browser:\n\n## LocalStorage\n\n- **Persists**: Data survives browser restarts, tab closes, and system reboots.\n- **Scope**: Shared across all tabs of the **same origin** (protocol + domain + port).\n- **Capacity**: ~5-10 MB per origin.\n- **Use cases**: User preferences, theme selection, saved form data, authentication tokens (with caution).\n\n## SessionStorage\n\n- **Persists**: Data is cleared when the **tab is closed**.\n- **Scope**: Isolated to the **specific tab**. Even same-origin tabs don't share it.\n- **Capacity**: ~5-10 MB per origin.\n- **Use cases**: Form step data, one-time session flags, temporary UI state.\n\n## API Methods (identical for both)\n\n```js\nlocalStorage.setItem('key', 'value');    // Store (value must be string)\nlocalStorage.getItem('key');               // Retrieve (returns null if missing)\nlocalStorage.removeItem('key');            // Delete one key\nlocalStorage.clear();                     // Delete ALL keys\nlocalStorage.length;                      // Number of stored items\nlocalStorage.key(0);                      // Get key name by index\n```\n\n## Critical: Only Strings!\n\nWeb Storage only stores **strings**. To store objects/arrays, you must `JSON.stringify` on save and `JSON.parse` on load.\n\n## Security Notes\n\n- Storage is accessible via JavaScript → vulnerable to XSS attacks.\n- Never store sensitive data (passwords, tokens) in localStorage without proper XSS protection.\n- Storage data is sent in headers for some requests but is NOT sent to the server automatically like cookies.",
    "keyRules": [
      "LocalStorage survives tab close; SessionStorage does not",
      "SessionStorage is isolated per tab, even for same origin",
      "Web Storage only stores strings — use JSON.stringify/parse for objects",
      "Never store sensitive data in localStorage (XSS accessible)",
      "Always check for null from getItem before parsing"
    ],
    "task": "Create a `user` object with `name` and `score`. Save it to localStorage as 'userData'. Then retrieve it, parse it back, increment the score by 10, and save it back. Log the updated score. Also save 'tempStep' to sessionStorage and verify it exists.",
    "hint": "Use `JSON.stringify` when setting and `JSON.parse` when getting. Retrieve, modify, then re-stringify and set again.",
    "learnings": [
      { "title": "LocalStorage API", "desc": "Storing persistent string records containing zero expiration configurations." },
      { "title": "SessionStorage API", "desc": "Managing distinct operational states tied strictly to isolated tab lifetimes." }
    ],
    "starterCode": "// Task: Store, Retrieve, and Update Data\n\n// 1. Create a user object { name: 'Player', score: 50 }\n\n// 2. Save it to localStorage as 'userData'\n\n// 3. Retrieve, parse, increment score by 10\n\n// 4. Save the updated object back to localStorage\n\n// 5. Log the updated score\n\n// 6. Save 'tempStep' = 'step2' to sessionStorage and verify it",
    "solutionCode": "// Task: Store, Retrieve, and Update Data\n\n// 1. Create a user object\nconst user = { name: 'Player', score: 50 };\n\n// 2. Save it to localStorage as 'userData'\nlocalStorage.setItem('userData', JSON.stringify(user));\n\n// 3. Retrieve, parse, increment score by 10\nconst retrieved = JSON.parse(localStorage.getItem('userData'));\nretrieved.score += 10;\n\n// 4. Save the updated object back to localStorage\nlocalStorage.setItem('userData', JSON.stringify(retrieved));\n\n// 5. Log the updated score\nconsole.log('Updated score:', retrieved.score); // 60\n\n// 6. Save 'tempStep' to sessionStorage and verify it\nsessionStorage.setItem('tempStep', 'step2');\nconsole.log('Session step:', sessionStorage.getItem('tempStep')); // 'step2'",
    "exampleCode": "// 🧠 Robust Storage Helper Pattern\n\nclass Storage {\n  constructor(storage) {\n    this.storage = storage;\n  }\n\n  get(key, fallback = null) {\n    try {\n      const item = this.storage.getItem(key);\n      return item ? JSON.parse(item) : fallback;\n    } catch {\n      return fallback;\n    }\n  }\n\n  set(key, value) {\n    this.storage.setItem(key, JSON.stringify(value));\n  }\n\n  remove(key) {\n    this.storage.removeItem(key);\n  }\n}\n\nconst local = new Storage(localStorage);\nconst session = new Storage(sessionStorage);\n\nlocal.set('theme', { dark: true, fontSize: 16 });\nconsole.log(local.get('theme')); // { dark: true, fontSize: 16 }\nconsole.log(local.get('missing', 'default')); // 'default'\n\n// Checking storage availability\nfunction isStorageAvailable(type) {\n  try {\n    const storage = window[type];\n    storage.setItem('__test__', '1');\n    storage.removeItem('__test__');\n    return true;\n  } catch {\n    return false;\n  }\n}",
    "tests": [
      { "id": "t1", "description": "Should create user object", "check": "code => /name\\s*:/ .test(code) && /score\\s*:/ .test(code)" },
      { "id": "t2", "description": "Should use localStorage.setItem", "check": "code => /localStorage\\.setItem\\s*\\(/.test(code)" },
      { "id": "t3", "description": "Should use JSON.stringify for saving", "check": "code => /JSON\\.stringify\\s*\\(/.test(code)" },
      { "id": "t4", "description": "Should use JSON.parse for reading", "check": "code => /JSON\\.parse\\s*\\(/.test(code)" },
      { "id": "t5", "description": "Should increment score", "check": "code => /score\\s*\\+\\s*10|score\\s*\\+=/.test(code)" },
      { "id": "t6", "description": "Should use sessionStorage", "check": "code => /sessionStorage\\.setItem\\s*\\(/.test(code)" }
    ]
  },
  {
    "id": "27",
    "slug": "cookies-client-storage-security",
    "title": "Cookies & Client Storage Security",
    "icon": "Cookie",
    "showInApp": false,
    "overview": "Manage persistent server cookies and protect application endpoints.",
    "explanation": "## What are Cookies?\n\nCookies are small pieces of data (max ~4KB each, ~50 per domain) that the server sends to the browser via the `Set-Cookie` header. The browser automatically includes them in subsequent requests to the same origin.\n\n**Unlike localStorage, cookies are sent to the server with every HTTP request.** This makes them ideal for authentication sessions but wasteful for large data.\n\n## Reading/Writing Cookies in JS\n\n```js\n// Read all cookies as a single string\nconsole.log(document.cookie); // \"name=ali; theme=dark\"\n\n// Write a cookie\ndocument.cookie = \"name=ali; max-age=3600; path=/\";\n```\n\n**Pain point:** `document.cookie` returns ALL cookies as one semicolon-separated string. You must parse it manually. There's no built-in `getCookie()` method.\n\n## Cookie Attributes\n\n- **`max-age=N`**: Expires in N seconds. **`max-age=0` deletes the cookie.**\n- **`expires=DATE`**: Absolute expiration date (GMT string).\n- **`path=/`**: Cookie is sent for all paths under this path.\n- **`domain=.example.com`**: Share cookie across subdomains.\n- **`Secure`**: Cookie only sent over HTTPS.\n- **`HttpOnly`**: Cookie is NOT accessible via `document.cookie` — only sent in HTTP headers.\n- **`SameSite=Strict|Lax|None`**: Controls cross-site request behavior.\n\n## Security: HttpOnly & Secure\n\n**The #1 defense against XSS cookie theft:** Set `HttpOnly` flag. JavaScript cannot read or modify HttpOnly cookies. Even if an attacker injects a script, they can't steal session cookies.\n\n```http\nSet-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict; Path=/\n\n**`Secure` flag** ensures the cookie is only transmitted over encrypted HTTPS connections.\n\n**`SameSite=Lax`** (default in modern browsers): Cookies are sent on top-level navigations (like clicking a link) but not on cross-site POST requests or iframe loads.\n\n## Cookies vs LocalStorage\n\n| Feature | Cookies | LocalStorage |\n|---|---|---|\n| Sent to server | Yes (every request) | No |\n| Max size | ~4KB | ~5-10MB |\n| Expiration | Configurable | Never (manual) |\n| JS access | No (if HttpOnly) | Always |",
    "keyRules": [
      "document.cookie returns all cookies as one string — you must parse it manually",
      "Cookies are automatically sent with every HTTP request to the server",
      "HttpOnly prevents JavaScript access — the #1 defense against cookie XSS theft",
      "Secure flag ensures cookies only travel over HTTPS",
      "Use max-age=0 or expires in the past to delete a cookie"
    ],
    "task": "Write a helper function `getCookie(name)` that parses `document.cookie` and returns the value for a given cookie name (or null if not found). Then write `setCookie(name, value, days)` that sets a cookie with the given name, value, and expiration in days. Test by setting 'theme=dark' for 7 days and reading it back.",
    "hint": "Split document.cookie by ';', trim each piece, split by '=' to get key-value pairs. For setCookie, calculate a new Date with `days * 86400000` and set `expires`.",
    "learnings": [
      { "title": "Cookie Management", "desc": "Parsing document.cookie values and passing small state markers." },
      { "title": "HttpOnly & Secure Flags", "desc": "Securing keys from scripts access to neutralize cross-site scripting risks." }
    ],
    "starterCode": "// Task: Build Cookie Helper Functions\n\n// 1. Create getCookie(name) function\n//    Parse document.cookie and return the value\n\n// 2. Create setCookie(name, value, days) function\n//    Set cookie with expiration in days\n\n// 3. Test: set 'theme' to 'dark' for 7 days\n\n// 4. Test: read 'theme' back and log it",
    "solutionCode": "// Task: Build Cookie Helper Functions\n\n// 1. Create getCookie(name) function\nfunction getCookie(name) {\n  const cookies = document.cookie.split(';');\n  for (let c of cookies) {\n    c = c.trim();\n    if (c.startsWith(name + '=')) {\n      return c.substring(name.length + 1);\n    }\n  }\n  return null;\n}\n\n// 2. Create setCookie(name, value, days) function\nfunction setCookie(name, value, days) {\n  const d = new Date();\n  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);\n  const expires = `expires=${d.toUTCString()}`;\n  document.cookie = `${name}=${value}; ${expires}; path=/`;\n}\n\n// 3. Test: set 'theme' to 'dark' for 7 days\nsetCookie('theme', 'dark', 7);\n\n// 4. Test: read 'theme' back and log it\nconsole.log('Theme:', getCookie('theme')); // 'dark'",
    "exampleCode": "// 🧠 Advanced Cookie Patterns\n\n// Delete a cookie\nfunction deleteCookie(name) {\n  document.cookie = `${name}=; max-age=0; path=/`;\n}\n\n// Batch parse all cookies into an object\nfunction parseAllCookies() {\n  return document.cookie\n    .split(';')\n    .reduce((obj, c) => {\n      const [key, ...val] = c.trim().split('=');\n      if (key) obj[key] = val.join('=');\n      return obj;\n    }, {});\n}\n\nconsole.log(parseAllCookies());\n// { theme: 'dark', lang: 'en' }\n\n// Security check: is this cookie HttpOnly?\n// You CANNOT check HttpOnly from JS — that's the point!\n// If document.cookie doesn't show it, it's likely HttpOnly.\n\n// Cookie consent helper\nfunction hasConsented() {\n  return getCookie('cookie_consent') === 'true';\n}\n\nfunction grantConsent() {\n  setCookie('cookie_consent', 'true', 365);\n}",
    "tests": [
      { "id": "t1", "description": "Should define getCookie function", "check": "code => /function\\s+getCookie\\s*\\(/.test(code)" },
      { "id": "t2", "description": "Should define setCookie function", "check": "code => /function\\s+setCookie\\s*\\(/.test(code)" },
      { "id": "t3", "description": "Should split document.cookie by semicolon", "check": "code => /document\\.cookie\\.split\\s*\\(\\s*['\";].*['\";]\\s*\\)/.test(code)" },
      { "id": "t4", "description": "Should use toUTCString for expires", "check": "code => /toUTCString\\s*\\(\\s*\\)/.test(code)" },
      { "id": "t5", "description": "Should set path=/", "check": "code => /path=\\//.test(code)" },
      { "id": "t6", "description": "Should test setting and reading a cookie", "check": "code => /setCookie\\s*\\(\\s*['\"]theme['\"]/.test(code) && /getCookie\\s*\\(\\s*['\"]theme['\"]/.test(code)" }
    ]
  },
  {
    "id": "28",
    "slug": "timers-execution-schedulers",
    "title": "Timers & Execution Schedulers",
    "icon": "Clock",
    "overview": "Manage asynchronous delay timelines and task schedules inside loops.",
    "explanation": "## setTimeout\n\nSchedules a function to run **once** after a specified delay in milliseconds.\n\n```js\nconst id = setTimeout(() => {\n  console.log('Fired after 1 second');\n}, 1000);\n```\n\n**Important:** The delay is a **minimum** guarantee, not exact. If the call stack is busy, the callback waits. A `setTimeout(fn, 0)` doesn't fire immediately — it goes to the task queue and waits for the stack to clear.\n\n## setInterval\n\nSchedules a function to run **repeatedly** at fixed intervals.\n\n```js\nconst id = setInterval(() => {\n  console.log('Every 500ms');\n}, 500);\n```\n\n**Pitfall:** If the callback takes longer than the interval, callbacks queue up and may fire back-to-back with no gap. `setInterval` does NOT guarantee exact timing.\n\n## Clearing Timers\n\nBoth `setTimeout` and `setInterval` return a numeric ID. Use this ID to cancel them:\n\n```js\nclearTimeout(id);  // Cancel a pending setTimeout\nclearInterval(id);  // Stop a running setInterval\n```\n\n**Best practice:** Always clear intervals when components unmount or when a condition is met. Uncleared intervals cause memory leaks and ghost executions.\n\n## Nested setTimeout Pattern\n\nFor reliable repeated execution, prefer recursive `setTimeout` over `setInterval`:\n\n```js\nfunction run() {\n  doWork();\n  setTimeout(run, 1000); // Next call only after current finishes\n}\n```\nThis guarantees at least 1 second between the END of one call and the START of the next, preventing queue buildup.\n\n## Timer Scope Issues\n\n```js\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100); // 3, 3, 3!\n}\n```\nUsing `var` creates one shared `i`. Fix with `let` (block-scoped) or IIFE closures.",
    "keyRules": [
      "setTimeout delay is a minimum, not a guarantee — the callback waits for the call stack",
      "setTimeout(fn, 0) does NOT run immediately — it goes to the task queue",
      "Always store and clear interval IDs to prevent memory leaks",
      "setInterval can stack up if callbacks take longer than the interval",
      "Prefer recursive setTimeout over setInterval for reliable repeated execution"
    ],
    "task": "Create a countdown timer that logs numbers from 5 to 1, one number per second. After reaching 1, log 'Go!' and stop. Use `setTimeout` recursively (NOT setInterval). Store each timeout ID and clear it if needed.",
    "hint": "Create a function `countdown(n)` that logs `n`, then calls `setTimeout(() => countdown(n-1), 1000)` if n > 1, else logs 'Go!'.",
    "learnings": [
      { "title": "setTimeout", "desc": "Scheduling non-blocking code executions once specified intervals elapse." },
      { "title": "setInterval", "desc": "Running infinite tracking operations repeatedly on locked time periods." },
      { "title": "Clearing Timers", "desc": "Canceling active intervals and timers using clearTimeout and clearInterval tools." }
    ],
    "starterCode": "// Task: Recursive setTimeout Countdown\n\n// 1. Create a countdown function that takes a number\n\n// 2. Log the current number\n\n// 3. If number > 1, schedule next call with 1 second delay\n\n// 4. If number === 1, log 'Go!' and stop\n\n// 5. Start the countdown from 5",
    "solutionCode": "// Task: Recursive setTimeout Countdown\n\n// 1-4. Create the countdown function\nlet timeoutId;\nfunction countdown(n) {\n  console.log(n);\n\n  if (n > 1) {\n    timeoutId = setTimeout(() => countdown(n - 1), 1000);\n  } else {\n    console.log('Go!');\n    clearTimeout(timeoutId); // Clean up\n  }\n}\n\n// 5. Start the countdown from 5\ncountdown(5);\n// Output: 5 (wait 1s) 4 (wait 1s) 3 (wait 1s) 2 (wait 1s) 1 Go!",
    "exampleCode": "// 🧠 Timer Patterns & Pitfalls\n\n// --- The var vs let trap ---\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log('var:', i), 100);\n}\n// Output: var: 3, var: 3, var: 3\n\nfor (let j = 0; j < 3; j++) {\n  setTimeout(() => console.log('let:', j), 100);\n}\n// Output: let: 0, let: 1, let: 2\n\n// --- Reliable repeated execution ---\nlet count = 0;\nfunction reliableTick() {\n  count++;\n  console.log('Tick:', count);\n  if (count < 5) {\n    setTimeout(reliableTick, 1000);\n  }\n}\nreliableTick();\n\n// --- Debounce with clearTimeout ---\nfunction debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\n\nconst search = debounce((query) => {\n  console.log('Searching:', query);\n}, 300);\n\ninput.addEventListener('input', (e) => search(e.target.value));",
    "tests": [
      { "id": "t1", "description": "Should define a countdown function", "check": "code => /function\\s+countdown|const\\s+countdown/.test(code)" },
      { "id": "t2", "description": "Should use setTimeout", "check": "code => /setTimeout\\s*\\(/.test(code)" },
      { "id": "t3", "description": "Should NOT use setInterval", "check": "code => !/setInterval\\s*\\(/.test(code)" },
      { "id": "t4", "description": "Should log 'Go!'", "check": "code => /Go!/.test(code)" },
      { "id": "t5", "description": "Should start from 5", "check": "code => /countdown\\s*\\(\\s*5\\s*\\)/.test(code)" }
    ]
  },
  {
    "id": "29",
    "slug": "async-concepts-event-loop",
    "title": "Async Concepts & The Event Loop",
    "icon": "InfinityIcon",
    "overview": "Deconstruct how single-threaded runtimes execute asynchronous tasks.",
    "explanation": "## JavaScript is Single-Threaded\n\nJavaScript has **one call stack**. It can only do one thing at a time. So how does it handle async operations without freezing?\n\n**Answer:** The browser/Node.js provides Web APIs (separate threads) for heavy work, and the **Event Loop** coordinates when their results get back onto the main thread.\n\n## Synchronous vs Asynchronous\n\n**Synchronous:** Code executes line by line. Each line blocks until complete.\n```js\nconsole.log('A'); // blocks until logged\nconsole.log('B'); // waits for A to finish\n```\n\n**Asynchronous:** Code initiates a task and moves on. The result is handled later via callback.\n```js\nsetTimeout(() => console.log('B'), 0); // registered, doesn't block\nconsole.log('A'); // runs immediately\n// Output: A, B (even with 0ms delay!)\n```\n\n## The Callback Queue (Task Queue)\n\nWhen a Web API operation completes (timer fires, HTTP response arrives), its callback is placed in the **Callback Queue** (also called the Task Queue or Macrotask Queue).\n\nThe Event Loop checks: **\"Is the call stack empty?\"** If yes, it takes the first callback from the queue and pushes it onto the stack.\n\n## Microtask Queue\n\nPromises (`.then`, `.catch`, `.finally`) use a **separate, higher-priority queue** called the Microtask Queue.\n\n**Critical rule:** The Event Loop drains the **entire** microtask queue before processing ANY callback from the macrotask queue. Microtasks always win.\n\n## Execution Order\n\n1. Synchronous code (call stack)\n2. All microtasks (Promise callbacks, queueMicrotask)\n3. One macrotask (setTimeout, setInterval, I/O)\n4. All microtasks again\n5. Next macrotask...\n\n## Classic Interview Question\n\n```js\nconsole.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');\n// Output: 1, 4, 3, 2",
    "keyRules": [
      "JavaScript is single-threaded — one call stack only",
      "setTimeout callbacks go to the macrotask queue, Promises go to the microtask queue",
      "Microtasks always execute before the next macrotask",
      "The event loop only pushes from queues when the call stack is empty",
      "setTimeout(fn, 0) does NOT mean 'run immediately' — it means 'next macrotask'"
    ],
    "task": "Predict and log (as comments) the output order of this code without running it, then verify by running:\n```\nconsole.log('start');\nsetTimeout(() => console.log('timeout'), 0);\nPromise.resolve().then(() => console.log('promise1'));\nPromise.resolve().then(() => console.log('promise2'));\nconsole.log('end');\n```",
    "hint": "Synchronous code first (start, end), then ALL microtasks (promise1, promise2), then macrotask (timeout).",
    "learnings": [
      { "title": "Synchronous vs Asynchronous", "desc": "Contrasting line-by-line blocked flows with unblocked background processing." },
      { "title": "Callback Queue", "desc": "Tracking execution entries for standard asynchronous macro-tasks." },
      { "title": "Event Loop Runtime", "desc": "Monitoring call stack states and fetching task references continuously." }
    ],
    "starterCode": "// Task: Predict the Execution Order\n\n// Write your predicted order as a comment first:\n// Predicted: ???\n\n// Then run this code and verify:\nconsole.log('start');\nsetTimeout(() => console.log('timeout'), 0);\nPromise.resolve().then(() => console.log('promise1'));\nPromise.resolve().then(() => console.log('promise2'));\nconsole.log('end');\n\n// Actual output: ???",
    "solutionCode": "// Task: Predict the Execution Order\n\n// Predicted: start, end, promise1, promise2, timeout\n\n// Then run this code and verify:\nconsole.log('start');\nsetTimeout(() => console.log('timeout'), 0);\nPromise.resolve().then(() => console.log('promise1'));\nPromise.resolve().then(() => console.log('promise2'));\nconsole.log('end');\n\n// Actual output:\n// start\n// end\n// promise1\n// promise2\n// timeout\n\n// Explanation:\n// 1. 'start' — synchronous, immediate\n// 2. setTimeout registered — callback goes to MACROTASK queue\n// 3. Promise.resolve().then — callback goes to MICROTASK queue\n// 4. Another .then — callback goes to MICROTASK queue\n// 5. 'end' — synchronous, immediate\n// 6. Call stack empty → drain ALL microtasks: 'promise1', 'promise2'\n// 7. Microtask queue empty → process one macrotask: 'timeout'",
    "exampleCode": "// 🧠 Deeper Event Loop Scenarios\n\n// Nested microtasks spawn more microtasks\nPromise.resolve().then(() => {\n  console.log('micro 1');\n  return Promise.resolve().then(() => {\n    console.log('micro 1.1'); // runs before micro 2!\n  });\n}).then(() => {\n  console.log('micro 1.2');\n});\nPromise.resolve().then(() => console.log('micro 2'));\n\n// Output: micro 1, micro 1.1, micro 2, micro 1.2\n\n// queueMicrotask — manual microtask scheduling\nconsole.log('sync');\nqueueMicrotask(() => console.log('micro'));\nsetTimeout(() => console.log('macro'), 0);\n// Output: sync, micro, macro\n\n// The 'infinite' microtask trap\nfunction infiniteMicrotasks() {\n  queueMicrotask(infiniteMicrotasks);\n}\n// ⚠️ This will freeze the page! Macrotasks never get a chance.\n// infiniteMicrotasks();",
    "tests": [
      { "id": "t1", "description": "Should include the prediction as a comment", "check": "code => /Predicted|predict|order/i.test(code)" },
      { "id": "t2", "description": "Should have console.log('start')", "check": "code => /console\\.log\\s*\\(\\s*['\"]start['\"]\\s*\\)/.test(code)" },
      { "id": "t3", "description": "Should have setTimeout with 0", "check": "code => /setTimeout\\s*\\([^)]*,\\s*0\\s*\\)/.test(code)" },
      { "id": "t4", "description": "Should have at least 2 Promise.resolve().then", "check": "code => (code.match(/Promise\\.resolve\\(\\)\\.then/g) || []).length >= 2" },
      { "id": "t5", "description": "Should explain the output", "check": "code => /microtask|macrotask|queue|stack|Explanation/i.test(code)" }
    ]
  },
  {
    "id": "30",
    "slug": "promises-ecosystem",
    "title": "Promises Ecosystem",
    "icon": "CheckSquare",
    "overview": "Govern clean async operations using object state resolutions.",
    "explanation": "## What is a Promise?\n\nA Promise is an object representing the eventual completion (or failure) of an asynchronous operation. It has three states:\n\n- **Pending**: Initial state — neither fulfilled nor rejected.\n- **Fulfilled**: Operation completed successfully. Has a value.\n- **Rejected**: Operation failed. Has a reason (error).\n\n**A promise can only transition once** — from Pending to either Fulfilled or Rejected. It's immutable after settling.\n\n## Creating Promises\n\n```js\nconst p = new Promise((resolve, reject) => {\n  const success = true;\n  if (success) {\n    resolve('Data loaded!'); // fulfills with value\n  } else {\n    reject(new Error('Failed!')); // rejects with error\n  }\n});\n```\n\n**The executor function runs SYNCHRONOUSLY** when you create the Promise. Only the `resolve`/`reject` callbacks trigger async behavior.\n\n## .then() / .catch() / .finally()\n\n- **`.then(onFulfilled, onRejected)`**: Called when promise fulfills (or rejects if second arg provided). Returns a NEW promise — enabling chaining.\n- **`.catch(onRejected)`**: Sugar for `.then(null, onRejected)`. Catches any error in the chain.\n- **`.finally(onFinally)`**: Runs regardless of fulfillment or rejection. Receives no arguments. Useful for cleanup (hide loaders, close connections).\n\n## Chaining\n\n```js\nfetchUser()\n  .then(user => fetchPosts(user.id))\n  .then(posts => renderPosts(posts))\n  .catch(err => showError(err))\n  .finally(() => hideSpinner());\n```\n\nEach `.then` returns a new promise. If you return a value, it wraps it in a fulfilled promise. If you return a Promise, it unwraps it. If you throw, it rejects.\n\n## Promise Static Methods\n\n- **`Promise.resolve(value)`**: Creates an already-fulfilled promise.\n- **`Promise.reject(reason)`**: Creates an already-rejected promise.\n- **`Promise.all([p1, p2, p3])`**: Waits for ALL to fulfill. Rejects on FIRST failure.\n- **`Promise.allSettled([...])`**: Waits for ALL to settle. Returns array of `{status, value/reason}`.\n- **`Promise.race([...])`**: Resolves/rejects with the FIRST settled promise.\n- **`Promise.any([...])`**: Resolves with the FIRST fulfilled promise. Rejects only if ALL reject.",
    "keyRules": [
      "A Promise has 3 states: Pending → Fulfilled or Rejected (one-way transition)",
      "The executor function runs synchronously — only resolve/reject trigger async flow",
      ".then returns a NEW promise — this is what enables chaining",
      ".catch catches errors from ANY previous step in the chain",
      "Promise.all fails fast on first rejection; use allSettled to wait for all"
    ],
    "task": "Create a function `delay(ms)` that returns a Promise resolving after `ms` milliseconds. Chain it: wait 300ms, log 'First', wait 200ms, log 'Second', then use `.finally` to log 'Done'. Wrap the chain in a try/catch equivalent using `.catch` to log any errors.",
    "hint": "`delay(ms)` returns `new Promise(resolve => setTimeout(resolve, ms))`. Chain: `delay(300).then(() => { console.log('First'); return delay(200); })...`",
    "learnings": [
      { "title": "Promise States", "desc": "Tracking active flows across Pending, Fulfilled, and Rejected conditions." },
      { "title": ".then & .catch", "desc": "Chaining functional resolution data and catching structural errors." },
      { "title": ".finally", "desc": "Executing absolute cleanup routines regardless of total execution paths." }
    ],
    "starterCode": "// Task: Build a Delay Function with Promise Chaining\n\n// 1. Create delay(ms) that returns a resolving Promise\n\n// 2. Chain: delay 300ms → log 'First'\n\n// 3. Chain: delay 200ms → log 'Second'\n\n// 4. Add .finally to log 'Done'\n\n// 5. Add .catch to log any errors",
    "solutionCode": "// Task: Build a Delay Function with Promise Chaining\n\n// 1. Create delay(ms)\nfunction delay(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\n\n// 2-5. Chain the delays\ndelay(300)\n  .then(() => {\n    console.log('First');\n    return delay(200);\n  })\n  .then(() => {\n    console.log('Second');\n  })\n  .finally(() => {\n    console.log('Done');\n  })\n  .catch((err) => {\n    console.error('Error:', err.message);\n  });\n\n// Output (after ~500ms total):\n// First\n// Second\n// Done",
    "exampleCode": "// 🧠 Promise Patterns\n\n// Promise.all — parallel execution\nconst urls = ['/api/users', '/api/posts', '/api/comments'];\nconst results = await Promise.all(urls.map(u => fetch(u).then(r => r.json())));\n\n// Promise.allSettled — safe parallel\nconst outcomes = await Promise.allSettled(urls.map(u => fetch(u)));\noutcomes.forEach(o => {\n  if (o.status === 'fulfilled') console.log('Success:', o.value.status);\n  else console.log('Failed:', o.reason.message);\n});\n\n// Promise.race — timeout pattern\nfunction fetchWithTimeout(url, ms) {\n  return Promise.race([\n    fetch(url),\n    new Promise((_, reject) => \n      setTimeout(() => reject(new Error('Timeout')), ms)\n    )\n  ]);\n}\n\n// Promise.any — first success wins\nconst fast = await Promise.any([\n  fetch(server1).catch(() => {}),\n  fetch(server2).catch(() => {}),\n  fetch(server3).catch(() => {}),\n]);\n\n// Returning vs throwing in .then\nfetch('/api/data')\n  .then(r => {\n    if (!r.ok) throw new Error(`HTTP ${r.status}`);\n    return r.json(); // returned value goes to next .then\n  })\n  .then(data => console.log(data))\n  .catch(err => console.error(err));",
    "tests": [
      { "id": "t1", "description": "Should define delay function", "check": "code => /function\\s+delay|const\\s+delay/.test(code)" },
      { "id": "t2", "description": "Should return a new Promise", "check": "code => /return\\s+new\\s+Promise/.test(code)" },
      { "id": "t3", "description": "Should use setTimeout inside Promise", "check": "code => /setTimeout\\s*\\(\\s*resolve/.test(code)" },
      { "id": "t4", "description": "Should chain at least 2 .then calls", "check": "code => (code.match(/\\.then\\s*\\(/g) || []).length >= 2" },
      { "id": "t5", "description": "Should use .finally", "check": "code => /\\.finally\\s*\\(/.test(code)" },
      { "id": "t6", "description": "Should use .catch", "check": "code => /\\.catch\\s*\\(/.test(code)" }
    ]
  },
  {
    "id": "31",
    "slug": "async-await-paradigms",
    "title": "Async / Await Paradigms",
    "icon": "Activity",
    "overview": "Write asynchronous execution lines mimicking standard clean procedural formats.",
    "explanation": "## Async Functions\n\nAn `async function` always returns a Promise. Even if you return a plain value, it's automatically wrapped in `Promise.resolve(value)`.\n\n```js\nasync function greet() {\n  return 'Hello'; // Equivalent to: return Promise.resolve('Hello')\n}\ngreet().then(msg => console.log(msg)); // 'Hello'\n```\n\n**Arrow syntax:** `const greet = async () => 'Hello';`\n\n## The Await Keyword\n\n`await` can only be used inside an `async function`. It pauses execution of that function until the Promise settles, then returns the resolved value (or throws if rejected).\n\n```js\nasync function getData() {\n  const response = await fetch('/api/data'); // pauses here\n  const data = await response.json();        // pauses here\n  return data; // data is the actual parsed object\n}\n```\n\n**Key insight:** `await` does NOT block the main thread. It only pauses the async function — the event loop continues processing other tasks.\n\n## Error Handling with try/catch\n\nSince `await` throws on rejection, use `try/catch` instead of `.catch()`:\n\n```js\nasync function safeFetch() {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n    return await res.json();\n  } catch (err) {\n    console.error('Failed:', err.message);\n    return null; // fallback value\n  } finally {\n    console.log('Request complete');\n  }\n}\n```\n\n## Parallel Execution with await\n\n**Sequential (slow):**\n```js\nconst a = await fetchA(); // waits 1s\nconst b = await fetchB(); // waits 1s\n// Total: 2s\n```\n\n**Parallel (fast):**\n```js\nconst [a, b] = await Promise.all([fetchA(), fetchB()]);\n// Total: 1s\n```\n\n## Top-Level Await\n\nIn ES Modules (`type=\"module\"`), you can use `await` at the top level without wrapping in an async function.\n\n## Common Pitfalls\n\n- Forgetting `await` — you get a Promise object instead of the value.\n- Using `await` in loops — causes sequential execution. Use `Promise.all` with `.map` for parallel.\n- `try/catch` inside a loop catches one failure but stops the rest. Use `Promise.allSettled` for resilience.",
    "keyRules": [
      "async functions always return a Promise, even if you return a plain value",
      "await only pauses the async function — it does NOT block the main thread",
      "Use try/catch/finally for error handling instead of .then/.catch",
      "Use Promise.all for parallel awaits — sequential await in loops is slow",
      "Forgetting await gives you a Promise object, not the resolved value"
    ],
    "task": "Create an async function `fetchUser(id)` that uses `await` to simulate fetching user data (use a `delay` promise that resolves with `{ id, name: 'User ' + id }` after 100ms). Create another async function `fetchPosts(userId)` that resolves with `['Post 1', 'Post 2']` after 100ms. Then write `loadDashboard(id)` that fetches both in PARALLEL using `Promise.all` with `await`, logs both results, and handles errors with try/catch.",
    "hint": "Make `delay` resolve with a value: `new Promise(r => setTimeout(() => r(value), ms))`. In `loadDashboard`, use `const [user, posts] = await Promise.all([fetchUser(id), fetchPosts(id)])`.",
    "learnings": [
      { "title": "Async functions", "desc": "Declaring clean wrappers that consistently deliver Promise outputs." },
      { "title": "Await keyword", "desc": "Pausing inline functional runs until target promises fully settle." },
      { "title": "Error handling", "desc": "Wrapping asynchronous runs inside robust structural try/catch enclosures." }
    ],
    "starterCode": "// Task: Async/Await with Parallel Execution\n\n// 1. Create a delay helper that resolves with a value\n\n// 2. Create async fetchUser(id) → { id, name: 'User N' } after 100ms\n\n// 3. Create async fetchPosts(userId) → ['Post 1', 'Post 2'] after 100ms\n\n// 4. Create async loadDashboard(id) that:\n//    - Fetches user and posts in PARALLEL\n//    - Logs both results\n//    - Handles errors with try/catch\n\n// 5. Call loadDashboard(42)",
    "solutionCode": "// Task: Async/Await with Parallel Execution\n\n// 1. Delay helper that resolves with a value\nfunction delay(ms, value) {\n  return new Promise(resolve => setTimeout(() => resolve(value), ms));\n}\n\n// 2. Async fetchUser\nasync function fetchUser(id) {\n  return await delay(100, { id, name: `User ${id}` });\n}\n\n// 3. Async fetchPosts\nasync function fetchPosts(userId) {\n  return await delay(100, ['Post 1', 'Post 2']);\n}\n\n// 4. Async loadDashboard with parallel execution\nasync function loadDashboard(id) {\n  try {\n    const [user, posts] = await Promise.all([\n      fetchUser(id),\n      fetchPosts(id)\n    ]);\n    console.log('User:', user);   // { id: 42, name: 'User 42' }\n    console.log('Posts:', posts);  // ['Post 1', 'Post 2']\n  } catch (err) {\n    console.error('Dashboard failed:', err.message);\n  }\n}\n\n// 5. Call it\nloadDashboard(42);",
    "exampleCode": "// 🧠 Advanced Async/Await Patterns\n\n// Sequential loop pitfall vs parallel\nasync function processItems(items) {\n  // ❌ Sequential — each waits for the previous\n  // for (const item of items) {\n  //   await processItem(item);\n  // }\n\n  // ✅ Parallel — all start at once\n  const results = await Promise.all(\n    items.map(item => processItem(item))\n  );\n  return results;\n}\n\n// Async IIFE (when top-level await isn't available)\n(async () => {\n  const data = await fetch('/api/data').then(r => r.json());\n  console.log(data);\n})();\n\n// Retry pattern\nasync function fetchWithRetry(url, retries = 3) {\n  for (let i = 0; i < retries; i++) {\n    try {\n      const res = await fetch(url);\n      if (!res.ok) throw new Error(`HTTP ${res.status}`);\n      return await res.json();\n    } catch (err) {\n      if (i === retries - 1) throw err;\n      console.log(`Retry ${i + 1}...`);\n    }\n  }\n}\n\n// For...await — processing async iterables one by one\nasync function* streamData() {\n  yield await delay(100, 'chunk1');\n  yield await delay(100, 'chunk2');\n  yield await delay(100, 'chunk3');\n}\n\nfor await (const chunk of streamData()) {\n  console.log(chunk);\n}",
    "tests": [
      { "id": "t1", "description": "Should define async functions", "check": "code => /async\\s+function|async\\s*\\(/.test(code)" },
      { "id": "t2", "description": "Should use await", "check": "code => /await\\s+/.test(code)" },
      { "id": "t3", "description": "Should use Promise.all for parallel execution", "check": "code => /Promise\\.all\\s*\\(\\s*\\[/.test(code)" },
      { "id": "t4", "description": "Should use try/catch", "check": "code => /try\\s*\\{/.test(code) && /catch\\s*\\(/.test(code)" },
      { "id": "t5", "description": "Should call loadDashboard", "check": "code => /loadDashboard\\s*\\(/.test(code)" },
      { "id": "t6", "description": "Should destructure results from Promise.all", "check": "code => /const\\s*\\[/.test(code) && /await\\s+Promise\\.all/.test(code)" }
    ]
  },
  {
    "id": "32",
    "slug": "fetch-api-content-handlers",
    "title": "Fetch API & Content Handlers",
    "icon": "CloudDownload",
    "overview": "Connect client runtimes out to external network endpoints seamlessly.",
    "explanation": "## The Fetch API\n\n`fetch()` is the modern replacement for `XMLHttpRequest`. It returns a Promise that resolves with a `Response` object.\n\n```js\nconst response = await fetch(url);\n```\n\n**Critical:** `fetch` does NOT reject on HTTP error statuses (404, 500, etc.). It only rejects on network failures. You MUST check `response.ok` or `response.status` manually.\n\n## GET Requests\n\n```js\nconst res = await fetch('/api/users');\nif (!res.ok) throw new Error(`HTTP ${res.status}`);\nconst data = await res.json(); // Parse JSON body\n```\n\n**Response body methods** (each returns a Promise — can only call ONE):\n- `.json()` — parse as JSON\n- `.text()` — get as plain text\n- `.blob()` — get as binary Blob (files, images)\n- `.formData()` — parse as FormData\n- `.arrayBuffer()` — get as raw ArrayBuffer\n\n## POST Requests\n\n```js\nconst res = await fetch('/api/users', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Ali', age: 25 })\n});\n```\n\n**Important:** When sending JSON, you MUST set the `Content-Type: application/json` header AND `JSON.stringify` the body. `fetch` does NOT auto-serialize.\n\n## Headers\n\n```js\nconst headers = new Headers({\n  'Content-Type': 'application/json',\n  'Authorization': `Bearer ${token}`\n});\n\nfetch(url, { headers });\n```\n\nReading response headers: `res.headers.get('Content-Type')`\n\n## Other Options\n\n- **`method`**: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS\n- **`mode`**: `'cors'` (default), `'no-cors'`, `'same-origin'`\n- **`credentials`**: `'same-origin'` (default), `'include'` (send cookies cross-origin), `'omit'`\n- **`cache`**: `'default'`, `'no-cache'`, `'force-cache'`, `'no-store'`\n- **`signal`**: Pass an `AbortController` signal to cancel the request.\n\n## AbortController\n\n```js\nconst controller = new AbortController();\nsetTimeout(() => controller.abort(), 5000); // 5s timeout\n\nfetch(url, { signal: controller.signal })\n  .catch(err => {\n    if (err.name === 'AbortError') console.log('Request canceled');\n  });\n```",
    "keyRules": [
      "fetch does NOT reject on 404/500 — always check response.ok manually",
      "Response body methods (.json, .text) can only be called ONCE per response",
      "POST with JSON requires Content-Type header AND JSON.stringify on body",
      "Use AbortController for request cancellation and timeouts",
      "fetch only rejects on network failures, never on HTTP error statuses"
    ],
    "task": "Write an async function `postUser(name, email)` that sends a POST request to `https://jsonplaceholder.typicode.com/users` with a JSON body containing the name and email. Set the correct Content-Type header. Parse the JSON response and return it. Wrap in try/catch and throw a descriptive error if `response.ok` is false.",
    "hint": "Use `fetch(url, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name, email}) })`. Check `!res.ok` and throw. Return `res.json()`.",
    "learnings": [
      { "title": "GET requests", "desc": "Fetching external data blocks and resolving parsing states." },
      { "title": "POST requests", "desc": "Submitting payload structures containing custom parameters or headers." },
      { "title": "Headers & JSON Handling", "desc": "Injecting authorization variables and running inline .json() operations." }
    ],
    "starterCode": "// Task: POST Request with Fetch API\n\n// 1. Create async postUser(name, email) function\n\n// 2. Send POST to https://jsonplaceholder.typicode.com/users\n\n// 3. Set Content-Type: application/json header\n\n// 4. Stringify the body with name and email\n\n// 5. Check response.ok — throw if false\n\n// 6. Parse and return the JSON response\n\n// 7. Test it: postUser('Ali', 'ali@test.com').then(console.log)",
    "solutionCode": "// Task: POST Request with Fetch API\n\nasync function postUser(name, email) {\n  try {\n    // 2-4. Send POST with JSON body and headers\n    const res = await fetch('https://jsonplaceholder.typicode.com/users', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ name, email })\n    });\n\n    // 5. Check response.ok\n    if (!res.ok) {\n      throw new Error(`POST failed: HTTP ${res.status}`);\n    }\n\n    // 6. Parse and return JSON\n    return await res.json();\n  } catch (err) {\n    console.error('Request error:', err.message);\n    throw err;\n  }\n}\n\n// 7. Test it\npostUser('Ali', 'ali@test.com').then(data => {\n  console.log('Created user:', data);\n});",
    "exampleCode": "// 🧠 Advanced Fetch Patterns\n\n// GET with error handling\nasync function safeGet(url) {\n  const res = await fetch(url);\n  if (!res.ok) {\n    throw new Error(`HTTP ${res.status}: ${res.statusText}`);\n  }\n  return res.json();\n}\n\n// PUT request (full update)\nawait fetch('/api/users/1', {\n  method: 'PUT',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Updated', email: 'new@test.com' })\n});\n\n// DELETE request\nawait fetch('/api/users/1', { method: 'DELETE' });\n\n// Fetch with timeout using AbortController\nasync function fetchWithTimeout(url, ms = 5000) {\n  const controller = new AbortController();\n  const id = setTimeout(() => controller.abort(), ms);\n  \n  try {\n    const res = await fetch(url, { signal: controller.signal });\n    clearTimeout(id);\n    return await res.json();\n  } catch (err) {\n    clearTimeout(id);\n    if (err.name === 'AbortError') throw new Error('Request timed out');\n    throw err;\n  }\n}\n\n// Bearer token auth\nconst res = await fetch('/api/protected', {\n  headers: {\n    'Authorization': `Bearer ${getToken()}`\n  }\n});",
    "tests": [
      { "id": "t1", "description": "Should define async postUser function", "check": "code => /async\\s+function\\s+postUser|const\\s+postUser\\s*=\\s*async/.test(code)" },
      { "id": "t2", "description": "Should use method: 'POST'", "check": "code => /method\\s*:\\s*['\"]POST['\"]/.test(code)" },
      { "id": "t3", "description": "Should set Content-Type header", "check": "code => /Content-Type\\s*:\\s*application\\/json/.test(code)" },
      { "id": "t4", "description": "Should JSON.stringify the body", "check": "code => /JSON\\.stringify\\s*\\(/.test(code)" },
      { "id": "t5", "description": "Should check response.ok", "check": "code => /!\\s*res\\.ok|res\\.ok\\s*===\\s*false/.test(code)" },
      { "id": "t6", "description": "Should use res.json()", "check": "code => /res\\.json\\s*\\(\\s*\\)|response\\.json\\s*\\(\\s*\\)/.test(code)" }
    ]
  },
  {
    "id": "33",
    "slug": "apis-http-architecture",
    "title": "APIs & HTTP Architecture",
    "icon": "Server",
    "showInApp": false,
    "overview": "Understand standard global API contracts and web response definitions.",
    "explanation": "## What is an API?\n\nAn API (Application Programming Interface) is a contract between a client and a server that defines how they communicate. In web development, this typically means a server exposing endpoints that return data (usually JSON) over HTTP.\n\n## REST APIs\n\nREST (Representational State Transfer) is an architectural style for APIs based on these principles:\n\n- **Stateless**: Each request contains all info needed. Server doesn't store session state.\n- **Resource-based**: URLs represent resources (`/users`, `/users/123`, `/users/123/posts`).\n- **Uniform Interface**: Use standard HTTP methods for CRUD operations.\n- **Cacheable**: Responses should indicate if they can be cached.\n\n**Resource naming conventions:**\n- ✅ `/users` (plural nouns)\n- ✅ `/users/42/posts` (nested resources)\n- ❌ `/getUsers` (verbs in URLs)\n- ❌ `/user` (singular)\n\n## HTTP Methods\n\n| Method | Purpose | Idempotent | Has Body |\n|---|---|---|---|\n| GET | Read a resource | ✅ Yes | ❌ No |\n| POST | Create a new resource | ❌ No | ✅ Yes |\n| PUT | Replace entire resource | ✅ Yes | ✅ Yes |\n| PATCH | Partial update | ❌ No | ✅ Yes |\n| DELETE | Remove a resource | ✅ Yes | ❌ No |\n\n**Idempotent:** Calling it once has the same effect as calling it multiple times. `PUT /users/42` with the same data always results in the same state. `POST /users` creates a new resource each time.\n\n## HTTP Status Codes\n\n**2xx Success:**\n- `200 OK` — Successful GET/PUT/PATCH\n- `201 Created` — Successful POST (new resource created)\n- `204 No Content` — Successful DELETE (no body returned)\n\n**3xx Redirection:**\n- `301 Moved Permanently` — Resource URL changed permanently\n- `302 Found` — Temporary redirect\n- `304 Not Modified` — Cached version is still valid\n\n**4xx Client Errors:**\n- `400 Bad Request` — Malformed request syntax\n- `401 Unauthorized` — Missing or invalid authentication\n- `403 Forbidden` — Authenticated but not authorized\n- `404 Not Found` — Resource doesn't exist\n- `409 Conflict` — Duplicate entry or version conflict\n- `422 Unprocessable Entity` — Valid syntax but semantic errors\n- `429 Too Many Requests` — Rate limited\n\n**5xx Server Errors:**\n- `500 Internal Server Error` — Unhandled server exception\n- `502 Bad Gateway` — Upstream server issue\n- `503 Service Unavailable` — Server overloaded or maintenance\n\n## Request/Response Structure\n\n**Request:** Method + URL + Headers + Body (optional)\n**Response:** Status Code + Status Text + Headers + Body (optional)",
    "keyRules": [
      "REST uses plural nouns for resources — never verbs in URLs",
      "GET and DELETE should NOT have a request body",
      "POST creates, PUT replaces, PATCH updates partially — know the difference",
      "200 for success, 201 for creation, 204 for successful delete with no body",
      "401 = not authenticated, 403 = authenticated but not authorized"
    ],
    "task": "Given a base URL `https://jsonplaceholder.typicode.com`, write four async functions: `getUsers()`, `getUser(id)`, `createUser(data)`, and `deleteUser(id)`. Each should use the correct HTTP method, log the status code, and handle errors. For `createUser`, pass `{ name: 'Ali', email: 'ali@test.com' }` as JSON.",
    "hint": "GET: `fetch(url)`. POST: `fetch(url, { method: 'POST', ... })`. DELETE: `fetch(url, { method: 'DELETE' })`. Log `res.status` before parsing.",
    "learnings": [
      { "title": "REST APIs", "desc": "Consuming structural stateless endpoints designed around resource targets." },
      { "title": "HTTP Methods", "desc": "Mapping explicit REST goals via standard GET, POST, PUT, and DELETE actions." },
      { "title": "Status Codes", "desc": "Decoding status codes across success (2xx), redirects (3xx), client bugs (4xx), and server crashes (5xx)." }
    ],
    "starterCode": "// Task: Implement Full CRUD with Correct HTTP Methods\n\nconst BASE = 'https://jsonplaceholder.typicode.com/users';\n\n// 1. getUsers() — GET all users, log status, return data\n\n// 2. getUser(id) — GET single user, log status, return data\n\n// 3. createUser(data) — POST new user, log status, return data\n\n// 4. deleteUser(id) — DELETE user, log status\n\n// 5. Test all four functions",
    "solutionCode": "// Task: Implement Full CRUD with Correct HTTP Methods\n\nconst BASE = 'https://jsonplaceholder.typicode.com/users';\n\n// 1. GET all users\nasync function getUsers() {\n  const res = await fetch(BASE);\n  console.log('GET /users:', res.status);\n  return res.json();\n}\n\n// 2. GET single user\nasync function getUser(id) {\n  const res = await fetch(`${BASE}/${id}`);\n  console.log(`GET /users/${id}:`, res.status);\n  return res.json();\n}\n\n// 3. POST new user\nasync function createUser(data) {\n  const res = await fetch(BASE, {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(data)\n  });\n  console.log('POST /users:', res.status);\n  return res.json();\n}\n\n// 4. DELETE user\nasync function deleteUser(id) {\n  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });\n  console.log(`DELETE /users/${id}:`, res.status);\n}\n\n// 5. Test all four\n(async () => {\n  await getUsers();\n  await getUser(1);\n  await createUser({ name: 'Ali', email: 'ali@test.com' });\n  await deleteUser(1);\n})();",
    "exampleCode": "// 🧠 HTTP Architecture Deep Dive\n\n// PUT vs PATCH\n// PUT — replaces the ENTIRE resource\nawait fetch('/users/1', {\n  method: 'PUT',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Ali', email: 'ali@test.com' })\n  // Missing fields will be REMOVED/overwritten\n});\n\n// PATCH — updates ONLY provided fields\nawait fetch('/users/1', {\n  method: 'PATCH',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Updated Name' })\n  // email remains unchanged\n});\n\n// Query parameters\nfunction buildURL(base, params) {\n  const query = new URLSearchParams(params).toString();\n  return query ? `${base}?${query}` : base;\n}\n\nconst url = buildURL('/api/users', {\n  page: 1,\n  limit: 10,\n  sort: 'name'\n});\n// '/api/users?page=1&limit=10&sort=name'\n\n// Handling different status codes\nasync function robustFetch(url, options = {}) {\n  const res = await fetch(url, options);\n  \n  switch (res.status) {\n    case 200: return res.json();\n    case 201: console.log('Created!'); return res.json();\n    case 204: return null;\n    case 401: throw new Error('Please log in');\n    case 403: throw new Error('No permission');\n    case 404: throw new Error('Not found');\n    case 429: throw new Error('Rate limited — slow down');\n    default: throw new Error(`HTTP ${res.status}`);\n  }\n}",
    "tests": [
      { "id": "t1", "description": "Should define getUsers with GET", "check": "code => /function\\s+getUsers|getUsers\\s*=/.test(code) && /fetch\\s*\\(\\s*BASE/.test(code)" },
      { "id": "t2", "description": "Should define createUser with POST", "check": "code => /function\\s+createUser|createUser\\s*=/.test(code) && /method\\s*:\\s*['\"]POST['\"]/.test(code)" },
      { "id": "t3", "description": "Should define deleteUser with DELETE", "check": "code => /function\\s+deleteUser|deleteUser\\s*=/.test(code) && /method\\s*:\\s*['\"]DELETE['\"]/.test(code)" },
      { "id": "t4", "description": "Should log res.status in each function", "check": "code => (code.match(/res\\.status/g) || []).length >= 3" },
      { "id": "t5", "description": "Should use JSON.stringify in POST", "check": "code => /JSON\\.stringify/.test(code)" }
    ]
  },
  {
    "id": "34",
    "slug": "oop-in-javascript",
    "title": "OOP in JavaScript",
    "icon": "Blocks",
    "overview": "Architect scalable code systems using classes and design methodologies.",
    "explanation": "## Classes & Constructors\n\nES6 classes are **syntactic sugar** over JavaScript's existing prototype-based inheritance. They provide a cleaner, more familiar syntax for creating objects.\n\n```js\nclass Animal {\n  constructor(name) {\n    this.name = name; // instance property\n  }\n\n  speak() {\n    console.log(`${this.name} makes a sound`);\n  }\n}\n```\n\n- **`constructor`**: Special method called automatically with `new`. Initializes instance properties.\n- **`new` keyword**: Creates a new object, sets `this` to it, calls constructor, returns the object.\n- **Methods**: Defined directly in the class body — they go on the prototype, not on each instance.\n\n## The 'this' Keyword\n\n`this` depends on HOW a function is called:\n\n- **Method call**: `obj.method()` → `this` = `obj`\n- **Constructor call**: `new MyClass()` → `this` = new instance\n- **Standalone call**: `func()` → `this` = `undefined` (strict mode) or `window` (sloppy)\n- **Arrow function**: Inherits `this` from enclosing scope (lexical `this`)\n- **Event listener**: `this` = the element the listener is attached to\n- **`call/apply/bind`**: Explicitly set `this`\n\n**Common pitfall:** Passing a method as a callback loses its `this` binding.\n```js\nclass Timer {\n  constructor() { this.seconds = 0; }\n  tick() { this.seconds++; }\n  startBad()  { setInterval(this.tick, 1000); }   // ❌ this = undefined\n  startGood() { setInterval(() => this.tick(), 1000); } // ✅ arrow preserves this\n}\n```\n\n## Encapsulation\n\nES2022 introduced **private class fields** using `#`:\n\n```js\nclass BankAccount {\n  #balance = 0; // private field\n\n  deposit(amount) { this.#balance += amount; }\n  getBalance() { return this.#balance; }\n}\n```\nPrivate fields cannot be accessed outside the class — not even by subclasses.\n\n## Inheritance\n\n```js\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name); // MUST call super() before using this\n    this.breed = breed;\n  }\n\n  speak() {\n    super.speak(); // call parent method\n    console.log(`${this.name} barks!`);\n  }\n}\n```\n\n**Rules:** `super()` must be called before accessing `this` in a subclass constructor.\n\n## Polymorphism\n\nSubclasses override parent methods to provide specific behavior:\n\n```js\nclass Cat extends Animal {\n  speak() { console.log(`${this.name} meows`); }\n}\n\nconst animals = [new Dog('Rex'), new Cat('Whiskers')];\nanimals.forEach(a => a.speak()); // Each speaks differently!\n```",
    "keyRules": [
      "Class methods live on the prototype — shared across all instances",
      "super() must be called before using 'this' in a subclass constructor",
      "Arrow functions preserve lexical 'this' — use them for callbacks in classes",
      "Private fields (#) are truly private — not accessible outside the class",
      "Polymorphism means same method name, different behavior per subclass"
    ],
    "task": "Create a `Vehicle` class with `#speed` (private), constructor setting `make` and `#speed = 0`, and methods `accelerate(amount)` that adds to `#speed`, `getSpeed()` that returns `#speed`, and `info()` that returns a string. Then create `ElectricCar` extending `Vehicle` with a `#battery` property, override `info()` to include battery level, and add `charge(amount)` method.",
    "hint": "Use `#speed = 0` in Vehicle constructor. In ElectricCar, call `super(make)` first, then set `#battery`. Override `info()` with `super.info()` + battery info.",
    "learnings": [
      { "title": "Classes & Constructors", "desc": "Creating standard reusable object factories containing initialized properties." },
      { "title": "The 'this' Keyword", "desc": "Evaluating binding targets dynamically based on execution points." },
      { "title": "Encapsulation & Inheritance", "desc": "Restricting internal states via private modifiers and extending class layers via super()." },
      { "title": "Polymorphism", "desc": "Overriding inherited methods to process distinct custom computations." }
    ],
    "starterCode": "// Task: OOP with Inheritance, Encapsulation & Polymorphism\n\n// 1. Create Vehicle class with private #speed\n//    - constructor(make): set make and #speed = 0\n//    - accelerate(amount): add to #speed\n//    - getSpeed(): return #speed\n//    - info(): return \"Make: {make}, Speed: {#speed}km/h\"\n\n// 2. Create ElectricCar extending Vehicle\n//    - constructor(make, battery): super(make), set #battery\n//    - charge(amount): add to #battery (max 100)\n//    - override info(): include battery %\n\n// 3. Test: create a Tesla, accelerate, charge, and log info",
    "solutionCode": "// Task: OOP with Inheritance, Encapsulation & Polymorphism\n\n// 1. Vehicle class\nclass Vehicle {\n  #speed = 0;\n\n  constructor(make) {\n    this.make = make;\n  }\n\n  accelerate(amount) {\n    this.#speed += amount;\n  }\n\n  getSpeed() {\n    return this.#speed;\n  }\n\n  info() {\n    return `${this.make}, Speed: ${this.#speed}km/h`;\n  }\n}\n\n// 2. ElectricCar class\nclass ElectricCar extends Vehicle {\n  #battery = 0;\n\n  constructor(make, battery) {\n    super(make);\n    this.#battery = battery;\n  }\n\n  charge(amount) {\n    this.#battery = Math.min(100, this.#battery + amount);\n  }\n\n  info() {\n    return `${super.info()}, Battery: ${this.#battery}%`;\n  }\n}\n\n// 3. Test\nconst tesla = new ElectricCar('Tesla Model 3', 50);\ntesla.accelerate(120);\ntesla.charge(30);\nconsole.log(tesla.info());\n// \"Tesla Model 3, Speed: 120km/h, Battery: 80%\"\n\nconsole.log(tesla.getSpeed()); // 120\n// tesla.#speed; // ❌ SyntaxError — private!\n// tesla.#battery; // ❌ SyntaxError — private!",
    "exampleCode": "// 🧠 Advanced OOP Patterns\n\n// Static methods and properties\nclass MathUtils {\n  static PI = 3.14159;\n\n  static circleArea(radius) {\n    return this.PI * radius * radius;\n  }\n}\nconsole.log(MathUtils.circleArea(5));\n\n// Getter / Setter\nclass Temperature {\n  #celsius = 0;\n\n  get fahrenheit() {\n    return this.#celsius * 9/5 + 32;\n  }\n\n  set fahrenheit(f) {\n    this.#celsius = (f - 32) * 5/9;\n  }\n}\n\nconst temp = new Temperature();\ntemp.fahrenheit = 212;\nconsole.log(temp.fahrenheit); // 212\n\n// 'this' pitfall and fix\nclass Button {\n  constructor(label) {\n    this.label = label;\n  }\n\n  // ❌ Loses 'this' when passed as callback\n  // clickHandler() { console.log(this.label); }\n\n  // ✅ Arrow function preserves 'this'\n  clickHandler = () => {\n    console.log(this.label);\n  };\n}\n\nconst btn = new Button('Submit');\nsetTimeout(btn.clickHandler, 100); // 'Submit'\n\n// instanceof check\nconsole.log(tesla instanceof ElectricCar); // true\nconsole.log(tesla instanceof Vehicle);    // true\nconsole.log(tesla instanceof Object);      // true",
    "tests": [
      { "id": "t1", "description": "Should define Vehicle class with private #speed", "check": "code => /class\\s+Vehicle/.test(code) && /#speed/.test(code)" },
      { "id": "t2", "description": "Should define ElectricCar extending Vehicle", "check": "code => /class\\s+ElectricCar\\s+extends\\s+Vehicle/.test(code)" },
      { "id": "t3", "description": "Should call super() in ElectricCar constructor", "check": "code => /super\\s*\\(/.test(code)" },
      { "id": "t4", "description": "Should have private #battery in ElectricCar", "check": "code => /#battery/.test(code)" },
      { "id": "t5", "description": "Should override info() and call super.info()", "check": "code => /super\\.info\\s*\\(\\s*\\)/.test(code)" },
      { "id": "t6", "description": "Should create an ElectricCar instance and call methods", "check": "code => /new\\s+ElectricCar/.test(code) && /\\.info\\s*\\(\\s*\\)/.test(code)" }
    ]
  },
  {
    "id": "35",
    "slug": "prototype-system",
    "title": "Prototype System",
    "icon": "Link2",
    "overview": "Deconstruct Javascript's native system of object link chains.",
    "explanation": "## The Prototype Chain\n\nEvery JavaScript object has an internal `[[Prototype]]` link to another object. When you access a property, JS first looks on the object itself, then its prototype, then the prototype's prototype, and so on until it reaches `null`.\n\n```js\nconst arr = [1, 2, 3];\narr.push(4); // 'push' is NOT on arr — it's on Array.prototype\narr.toString(); // 'toString' is on Object.prototype\narr.fakeMethod; // undefined — reached null, not found\n```\n\n**Chain:** `arr → Array.prototype → Object.prototype → null`\n\n## __proto__ vs prototype\n\nThese are the two most confusing concepts in JavaScript:\n\n- **`Function.prototype`**: A property on constructor functions. It's the object that will be used as the prototype for instances created by `new`.\n- **`__proto__`**: A getter/setter on ALL objects. It exposes the `[[Prototype]]` link. `obj.__proto__ === ConstructorFunction.prototype`.\n\n```js\nfunction Person(name) { this.name = name; }\nPerson.prototype.greet = function() { return `Hi, I'm ${this.name}`; };\n\nconst ali = new Person('Ali');\nconsole.log(ali.__proto__ === Person.prototype); // true\nconsole.log(ali.greet()); // 'Hi, I'm Ali'\n```\n\n**Key distinction:**\n- `Person.prototype` exists on the **constructor function**.\n- `ali.__proto__` exists on the **instance**. They point to the same object.\n- Regular objects don't have `.prototype` — only functions do.\n\n## Prototypal Inheritance\n\nObjects can share methods through the prototype chain without duplicating them:\n\n```js\nconst animal = {\n  speak() { console.log(`${this.name} speaks`); }\n};\n\nconst dog = Object.create(animal);\ndog.name = 'Rex';\ndog.speak(); // 'Rex speaks' — found via prototype chain\n```\n\n**`Object.create(proto)`** creates a new object with `proto` as its `[[Prototype]]`.\n\n## hasOwnProperty\n\nSince prototype properties are accessible as if they're own properties, use `hasOwnProperty` to check:\n\n```js\nali.hasOwnProperty('name');  // true — own property\nali.hasOwnProperty('greet'); // false — from prototype\n```\n\nOr use `Object.hasOwn(ali, 'name')` (ES2022, safer for objects that override it).\n\n## Performance Tip\n\nPutting methods on the prototype (instead of inside the constructor) means one copy is shared across all instances — not one copy per instance.",
    "keyRules": [
      "Every object has a [[Prototype]] link forming a chain ending at null",
      "prototype is a property on constructor functions; __proto__ is on instances",
      "obj.__proto__ === ConstructorFunction.prototype is always true for instances",
      "Methods on prototype are shared — one copy for all instances, not duplicated",
      "Use hasOwnProperty to distinguish own vs inherited properties"
    ],
    "task": "Create a constructor function `Hero(name)` that sets `this.name = name`. Add a `levelUp()` method to `Hero.prototype` that increments `this.level` (initialized to 1 in constructor). Create two heroes, call `levelUp()` on both, then prove the `levelUp` method is shared (not duplicated) by checking `hero1.levelUp === hero2.levelUp`. Also prove `levelUp` is NOT an own property using `hasOwnProperty`.",
    "hint": "Set `this.level = 1` in constructor. Add `Hero.prototype.levelUp = function() { this.level++; };`. Check method sharing with strict equality. Use `hero1.hasOwnProperty('levelUp')`.",
    "learnings": [
      { "title": "Prototype Chain", "desc": "Tracking properties up through chained structural fallbacks." },
      { "title": "__proto__ vs prototype", "desc": "Differentiating functional blueprint definitions from individual active pointers." },
      { "title": "Prototypal Inheritance", "desc": "Sharing shared parent methods across children arrays without duplicate storage allocations." }
    ],
    "starterCode": "// Task: Prototypes & Shared Methods\n\n// 1. Create Hero constructor function\n//    Set this.name and this.level = 1\n\n// 2. Add levelUp() to Hero.prototype\n//    It should increment this.level\n\n// 3. Create two Hero instances\n\n// 4. Call levelUp() on both heroes\n\n// 5. Prove levelUp is shared (same reference)\n\n// 6. Prove levelUp is NOT an own property",
    "solutionCode": "// Task: Prototypes & Shared Methods\n\n// 1. Hero constructor\nfunction Hero(name) {\n  this.name = name;\n  this.level = 1;\n}\n\n// 2. Add levelUp to prototype\nHero.prototype.levelUp = function() {\n  this.level++;\n};\n\n// 3. Create two instances\nconst hero1 = new Hero('Warrior');\nconst hero2 = new Hero('Mage');\n\n// 4. Call levelUp on both\nhero1.levelUp();\nhero1.levelUp();\nhero2.levelUp();\n\nconsole.log(hero1.level); // 3\nconsole.log(hero2.level); // 2\n\n// 5. Prove levelUp is shared (same reference)\nconsole.log(hero1.levelUp === hero2.levelUp); // true\n\n// 6. Prove levelUp is NOT an own property\nconsole.log(hero1.hasOwnProperty('levelUp')); // false\nconsole.log(hero1.hasOwnProperty('name'));    // true\nconsole.log(hero1.hasOwnProperty('level'));   // true\n\n// Bonus: Verify the prototype chain\nconsole.log(hero1.__proto__ === Hero.prototype);        // true\nconsole.log(Hero.prototype.__proto__ === Object.prototype); // true\nconsole.log(Object.prototype.__proto__);                    // null",
    "exampleCode": "// 🧠 Prototype Deep Dive\n\n// Object.create — clean prototypal inheritance\nconst vehicle = {\n  type: 'vehicle',\n  describe() { return `${this.name} is a ${this.type}`; }\n};\n\nconst car = Object.create(vehicle);\ncar.name = 'Toyota';\ncar.type = 'car';\nconsole.log(car.describe()); // 'Toyota is a car'\nconsole.log(car.__proto__ === vehicle); // true\n\n// Prototype chain lookup\nfunction A() {}\nfunction B() {}\nB.prototype = Object.create(A.prototype);\nB.prototype.constructor = B; // fix constructor reference\n\nconst b = new B();\nconsole.log(b instanceof B); // true\nconsole.log(b instanceof A); // true\n\n// Modifying built-in prototypes (⚠️ discouraged in production)\nArray.prototype.last = function() {\n  return this[this.length - 1];\n};\n[10, 20, 30].last(); // 30\n\n// Object.hasOwn (ES2022 — safer than hasOwnProperty)\nconst obj = Object.create({ inherited: true });\nobj.own = true;\nconsole.log(Object.hasOwn(obj, 'own'));       // true\nconsole.log(Object.hasOwn(obj, 'inherited')); // false\n\n// Getting all own properties\nconsole.log(Object.keys(obj));        // ['own']\nconsole.log(Object.getOwnPropertyNames(obj)); // ['own']",
    "tests": [
      { "id": "t1", "description": "Should create Hero constructor function", "check": "code => /function\\s+Hero\\s*\\(/.test(code)" },
      { "id": "t2", "description": "Should set this.level = 1 in constructor", "check": "code => /this\\.level\\s*=\\s*1/.test(code)" },
      { "id": "t3", "description": "Should add method to Hero.prototype", "check": "code => /Hero\\.prototype\\.levelUp\\s*=/.test(code)" },
      { "id": "t4", "description": "Should create at least 2 instances", "check": "code => (code.match(/new\\s+Hero/g) || []).length >= 2" },
      { "id": "t5", "description": "Should prove method is shared with === check", "check": "code => /levelUp\\s*===\\s*.*levelUp/.test(code)" },
      { "id": "t6", "description": "Should use hasOwnProperty", "check": "code => /hasOwnProperty\\s*\\(\\s*['\"]levelUp['\"]/.test(code)" }
    ]
  },
  {
    "id": "36",
    "slug": "modules-integration",
    "title": "Modules Integration",
    "icon": "Package",
    "showInApp": false,
    "overview": "Partition workspace scripts using professional import and export definitions.",
    "explanation": "## ES Modules (ESM)\n\nES Modules are the official standard for JavaScript modules, supported in browsers (via `<script type=\"module\">`) and Node.js.\n\n**Named Exports:**\n```js\n// math.js\nexport const PI = 3.14;\nexport function add(a, b) { return a + b; }\nexport default class Calculator { ... }\n```\n\n**Named Imports:**\n```js\n// app.js\nimport { PI, add } from './math.js';\nimport Calculator from './math.js'; // default import\nimport Calculator, { PI, add } from './math.js'; // combined\n```\n\n**Renaming imports/exports:**\n```js\nimport { add as sum } from './math.js';\nexport { add as sum, PI };\n```\n\n**Namespace import:**\n```js\nimport * as math from './math.js';\nmath.add(2, 3);\nmath.PI;\n```\n\n**Key ESM characteristics:**\n- **Static:** Imports are resolved at parse time (not runtime). You can't conditionally import.\n- **Strict mode:** All ESM code runs in strict mode automatically.\n- **Live bindings:** If the exporting module changes a value, the importing module sees the updated value.\n- **Single copy:** A module is only executed once, no matter how many times it's imported.\n- **`this` is `undefined`** at the top level (not `window`).\n\n## CommonJS (CJS)\n\nCommonJS is Node.js's original module system, still widely used in Node.js ecosystems.\n\n```js\n// math.js\nconst PI = 3.14;\nfunction add(a, b) { return a + b; }\nmodule.exports = { PI, add };\n// OR: exports.PI = PI;\n// OR: module.exports = add; // single export\n```\n\n```js\n// app.js\nconst { PI, add } = require('./math');\nconst math = require('./math');\n```\n\n**Key CJS characteristics:**\n- **Dynamic:** `require()` is a function call — can be used conditionally.\n- **Copied values:** Exports are copied, not live bindings.\n- **`this` is `module.exports`** (or `{}`) at the top level.\n- **Synchronous:** `require()` blocks until the module loads.\n\n## ESM vs CJS Comparison\n\n| Feature | ESM | CJS |\n|---|---|---|\n| Syntax | `import/export` | `require/module.exports` |\n| Resolution | Static (parse time) | Dynamic (runtime) |\n| Strict mode | Always | Optional |\n| Live bindings | Yes | No (copies) |\n| Top-level await | Yes | No |\n| Tree shaking | Possible | Not possible |\n| Conditional import | No (use dynamic import()) | Yes (`if (x) require()`) |\n\n## Dynamic Import\n\nESM supports runtime conditional imports via `import()`:\n```js\nif (user.isAdmin) {\n  const admin = await import('./admin.js');\n  admin.renderDashboard();\n}\n```\nReturns a Promise — works in both ESM and CJS contexts.",
    "keyRules": [
      "ESM imports are static and resolved at parse time — no conditional imports",
      "CommonJS require() is dynamic and synchronous — can be used conditionally",
      "ESM has live bindings; CJS copies values at export time",
      "Use default export for the main thing, named exports for everything else",
      "Use dynamic import() for code splitting and lazy loading"
    ],
    "task": "You're given two files conceptually. Write `utils.js` exports: a named export `clamp(value, min, max)` that constrains a number, a named export `MAX_SIZE = 100`, and a default export function `identity(x)` that returns x. Then write `app.js` that imports all three — the default without braces, the named ones with braces — and logs `clamp(150, 0, MAX_SIZE)` and `identity('hello')`.",
    "hint": "In utils: `export const MAX_SIZE = 100;`, `export function clamp(...) {...}`, `export default function identity(x) {...}`. In app: `import identity, { clamp, MAX_SIZE } from './utils.js'`.",
    "learnings": [
      { "title": "ES Modules (ESM)", "desc": "Utilizing modern static import and export commands across applications." },
      { "title": "CommonJS (CJS)", "desc": "Managing classic runtime module actions through require() and module.exports." }
    ],
    "starterCode": "// === utils.js ===\n// 1. Named export: MAX_SIZE = 100\n\n// 2. Named export: clamp(value, min, max) function\n\n// 3. Default export: identity(x) function\n\n\n// === app.js ===\n// 4. Import default and named exports\n\n// 5. Log clamp(150, 0, MAX_SIZE)\n\n// 6. Log identity('hello')",
    "solutionCode": "// === utils.js ===\n\n// 1. Named export: MAX_SIZE\nexport const MAX_SIZE = 100;\n\n// 2. Named export: clamp function\nexport function clamp(value, min, max) {\n  return Math.min(Math.max(value, min), max);\n}\n\n// 3. Default export: identity function\nexport default function identity(x) {\n  return x;\n}\n\n\n// === app.js ===\n\n// 4. Import default (no braces) and named (with braces)\nimport identity, { clamp, MAX_SIZE } from './utils.js';\n\n// 5. Log clamped value\nconsole.log(clamp(150, 0, MAX_SIZE)); // 100\n\n// 6. Log identity result\nconsole.log(identity('hello')); // 'hello'",
    "exampleCode": "// 🧠 Advanced Module Patterns\n\n// Re-exporting (barrel files)\n// index.js\nexport { User } from './User.js';\nexport { Post } from './Post.js';\nexport { Comment } from './Comment.js';\n\n// Now consumers can do:\n// import { User, Post, Comment } from './index.js';\n\n// Renaming on export\nexport { fetchUsers as getUsers } from './api.js';\n\n// Namespace re-export\nexport * as Utils from './utils.js';\n\n// Dynamic import for code splitting\nasync function loadChart() {\n  const { Chart } = await import('./chart.js');\n  new Chart(canvas, config);\n}\n\nbutton.addEventListener('click', loadChart);\n\n// CommonJS equivalents\n// --- utils.js (CJS) ---\nconst MAX_SIZE = 100;\nfunction clamp(value, min, max) {\n  return Math.min(Math.max(value, min), max);\n}\nfunction identity(x) { return x; }\nmodule.exports = { MAX_SIZE, clamp, identity };\n// OR: module.exports = { MAX_SIZE, clamp, default: identity };\n\n// --- app.js (CJS) ---\nconst { MAX_SIZE, clamp, default: identity } = require('./utils');\nconsole.log(clamp(150, 0, MAX_SIZE));\n\n// Detecting module system\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = { myFunc };\n} else {\n  export { myFunc };\n}",
    "tests": [
      { "id": "t1", "description": "Should use named export for MAX_SIZE", "check": "code => /export\\s+const\\s+MAX_SIZE/.test(code)" },
      { "id": "t2", "description": "Should use named export for clamp", "check": "code => /export\\s+function\\s+clamp/.test(code)" },
      { "id": "t3", "description": "Should use default export for identity", "check": "code => /export\\s+default\\s+function\\s+identity/.test(code)" },
      { "id": "t4", "description": "Should import default without braces", "check": "code => /import\\s+identity\\s*,/.test(code)" },
      { "id": "t5", "description": "Should import named exports with braces", "check": "code => /\\{\\s*clamp\\s*,\\s*MAX_SIZE\\s*\\}/.test(code)" },
      { "id": "t6", "description": "Should use clamp with MAX_SIZE", "check": "code => /clamp\\s*\\(\\s*150\\s*,\\s*0\\s*,\\s*MAX_SIZE/.test(code)" }
    ]
  },
  {
    "id": "37",
    "slug": "error-handling-diagnostics",
    "title": "Error Handling & Diagnostics",
    "icon": "AlertTriangle",
    "overview": "Protect production workloads against unexpected application failures.",
    "explanation": "## try / catch / finally\n\nThe `try/catch/finally` statement handles runtime errors gracefully:\n\n```js\ntry {\n  // Code that might throw\n  const data = JSON.parse(invalidJSON);\n} catch (error) {\n  // Handle the error\n  console.error(error.name);    // 'SyntaxError'\n  console.error(error.message); // 'Unexpected token...'\n  console.error(error.stack);   // Full call stack trace\n} finally {\n  // Always runs — even if try/catch returns\n  cleanup();\n}\n```\n\n**Key rules:**\n- `catch` only catches **synchronous** errors in the `try` block.\n- `finally` runs NO MATTER WHAT — even if `try` has a `return` statement.\n- If `finally` has a `return`, it OVERRIDES the `try`/`catch` return value.\n\n## try/catch Does NOT Catch Async Errors\n\n```js\ntry {\n  fetch('/api/data')          // This doesn't throw\n    .then(r => r.json())      // This might throw — but NOT caught here!\n    .catch(err => ...);       // This catches it\n} catch (err) {\n  // ❌ This never catches Promise rejections\n}\n```\n\n**Fix:** Use `async/await` with `try/catch`:\n```js\ntry {\n  const res = await fetch('/api/data');\n  const data = await res.json(); // ✅ Now catchable\n} catch (err) {\n  console.error(err); // ✅ Catches it\n}\n```\n\n## Custom Errors\n\nExtend the built-in `Error` class to create domain-specific errors:\n\n```js\nclass ValidationError extends Error {\n  constructor(field, message) {\n    super(message);\n    this.name = 'ValidationError';\n    this.field = field;\n  }\n}\n\nclass NotFoundError extends Error {\n  constructor(resource, id) {\n    super(`${resource} with id ${id} not found`);\n    this.name = 'NotFoundError';\n    this.statusCode = 404;\n  }\n}\n```\n\n**Why custom errors?**\n- You can `instanceof` check them: `if (err instanceof ValidationError)`\n- They carry extra context (field, statusCode)\n- They make error handling precise instead of generic.\n\n## Throwing Errors\n\n```js\nthrow new Error('Something went wrong');\nthrow new ValidationError('email', 'Invalid email format');\n```\n\n**Never throw strings:** `throw 'error'` loses the stack trace and can't be instanceof-checked.\n\n## Global Error Handlers\n\n```js\n// Uncaught synchronous errors\nwindow.onerror = (msg, url, line, col, error) => {\n  console.error('Global error:', error);\n};\n\n// Unhandled Promise rejections\nwindow.onunhandledrejection = (event) => {\n  console.error('Unhandled rejection:', event.reason);\n};\n```",
    "keyRules": [
      "try/catch only catches synchronous errors — use async/await for async errors",
      "finally always runs, even if try has a return — its return overrides try's return",
      "Always throw Error objects, never strings — strings lose stack traces",
      "Extend Error class for domain-specific errors with extra context",
      "Use window.onerror and onunhandledrejection as global safety nets"
    ],
    "task": "Create a `ValidationError` class extending `Error` that accepts `field` and `message`. Create a `validateAge(age)` function that throws `ValidationError` if age is not a number or is less than 0 or greater than 150. Write a `safeValidate(age)` function using try/catch/finally that calls `validateAge`, logs 'Validation complete' in `finally`, and returns `{ valid: true }` on success or `{ valid: false, error: err.message }` on failure.",
    "hint": "In `ValidationError` constructor, call `super(message)` then set `this.name = 'ValidationError'` and `this.field = field`. In `safeValidate`, wrap the call in try/catch and always run finally.",
    "learnings": [
      { "title": "try / catch blocks", "desc": "Isolating experimental logic inside safe, monitored runtime zones." },
      { "title": "Custom Errors", "desc": "Extending basic Error classes to dispatch application-specific debugging logs." }
    ],
    "starterCode": "// Task: Custom Errors with try/catch/finally\n\n// 1. Create ValidationError class extending Error\n//    Accept field and message, set name = 'ValidationError'\n\n// 2. Create validateAge(age) function\n//    Throw ValidationError if: not number, < 0, or > 150\n\n// 3. Create safeValidate(age) function\n//    try: call validateAge, return { valid: true }\n//    catch: return { valid: false, error: err.message }\n//    finally: log 'Validation complete'\n\n// 4. Test with valid and invalid ages",
    "solutionCode": "// Task: Custom Errors with try/catch/finally\n\n// 1. ValidationError class\nclass ValidationError extends Error {\n  constructor(field, message) {\n    super(message);\n    this.name = 'ValidationError';\n    this.field = field;\n  }\n}\n\n// 2. validateAge function\nfunction validateAge(age) {\n  if (typeof age !== 'number' || isNaN(age)) {\n    throw new ValidationError('age', 'Age must be a number');\n  }\n  if (age < 0) {\n    throw new ValidationError('age', 'Age cannot be negative');\n  }\n  if (age > 150) {\n    throw new ValidationError('age', 'Age cannot exceed 150');\n  }\n}\n\n// 3. safeValidate function\nfunction safeValidate(age) {\n  try {\n    validateAge(age);\n    return { valid: true };\n  } catch (err) {\n    return { valid: false, error: err.message };\n  } finally {\n    console.log('Validation complete');\n  }\n}\n\n// 4. Test\nconsole.log(safeValidate(25));     // { valid: true }\nconsole.log(safeValidate(-5));     // { valid: false, error: 'Age cannot be negative' }\nconsole.log(safeValidate('abc'));  // { valid: false, error: 'Age must be a number' }\nconsole.log(safeValidate(200));    // { valid: false, error: 'Age cannot exceed 150' }\n\n// 'Validation complete' logged 4 times (finally always runs)",
    "exampleCode": "// 🧠 Advanced Error Handling Patterns\n\n// Multiple error types with instanceof\nclass AuthError extends Error {\n  constructor(msg) { super(msg); this.name = 'AuthError'; this.status = 401; }\n}\n\nclass PermissionError extends Error {\n  constructor(msg) { super(msg); this.name = 'PermissionError'; this.status = 403; }\n}\n\nasync function adminAction() {\n  try {\n    // ... some logic that might throw\n  } catch (err) {\n    if (err instanceof AuthError) {\n      redirect('/login');\n    } else if (err instanceof PermissionError) {\n      showWarning('No access');\n    } else {\n      throw err; // re-throw unknown errors\n    }\n  }\n}\n\n// Error grouping with a base class\nclass AppError extends Error {\n  constructor(message, statusCode) {\n    super(message);\n    this.name = this.constructor.name;\n    this.statusCode = statusCode;\n  }\n}\n\nclass NotFoundError extends AppError {\n  constructor(resource) {\n    super(`${resource} not found`, 404);\n  }\n}\n\n// Retry with error handling\nasync function retry(fn, attempts = 3) {\n  for (let i = 0; i < attempts; i++) {\n    try {\n      return await fn();\n    } catch (err) {\n      if (i === attempts - 1) throw err;\n      console.warn(`Attempt ${i + 1} failed: ${err.message}`);\n    }\n  }\n}\n\n// Global safety net\nwindow.addEventListener('error', (e) => {\n  // e.error is the Error object\n  reportToService(e.error);\n});\n\nwindow.addEventListener('unhandledrejection', (e) => {\n  reportToService(e.reason);\n});",
    "tests": [
      { "id": "t1", "description": "Should define ValidationError extending Error", "check": "code => /class\\s+ValidationError\\s+extends\\s+Error/.test(code)" },
      { "id": "t2", "description": "Should call super(message) in constructor", "check": "code => /super\\s*\\(\\s*message\\s*\\)/.test(code)" },
      { "id": "t3", "description": "Should set this.name = 'ValidationError'", "check": "code => /this\\.name\\s*=\\s*['\"]ValidationError['\"]/.test(code)" },
      { "id": "t4", "description": "Should throw ValidationError in validateAge", "check": "code => /throw\\s+new\\s+ValidationError/.test(code)" },
      { "id": "t5", "description": "Should use try/catch/finally in safeValidate", "check": "code => /try\\s*\\{/.test(code) && /catch\\s*\\(/.test(code) && /finally\\s*\\{/.test(code)" },
      { "id": "t6", "description": "Should test with both valid and invalid inputs", "check": "code => /safeValidate\\s*\\(/.test(code) && (code.match(/safeValidate\\s*\\(/g) || []).length >= 2" }
    ]
  },
  {
    "id": "38",
    "slug": "regular-expressions",
    "title": "Regular Expressions",
    "icon": "Search",
    "overview": "Parse and validate text patterns using powerful token matching expressions.",
    "explanation": "## What are Regular Expressions?\n\nA RegEx (Regular Expression) is a pattern-matching language for searching, replacing, and validating strings. In JavaScript, you create them with literal syntax `/pattern/flags` or the constructor `new RegExp('pattern', 'flags')`.\n\n## Core Pattern Syntax\n\n**Character Classes:**\n- `[abc]` — any single character a, b, or c\n- `[a-z]` — any lowercase letter\n- `[^abc]` — NOT a, b, or c\n- `\\d` — digit [0-9]\n- `\\w` — word character [a-zA-Z0-9_]\n- `\\s` — whitespace (space, tab, newline)\n- `.` — any character (except newline)\n\n**Quantifiers:**\n- `*` — 0 or more\n- `+` — 1 or more\n- `?` — 0 or 1 (optional)\n- `{n}` — exactly n\n- `{n,m}` — between n and m\n- `{n,}` — n or more\n\n**Anchors:**\n- `^` — start of string\n- `$` — end of string\n- `\\b` — word boundary\n\n**Groups & Alternation:**\n- `(abc)` — capture group\n- `(?:abc)` — non-capturing group\n- `a|b` — alternation (a OR b)\n- `\\1`, `\\2` — backreferences to capture groups\n\n**Escaping:** `\\.` `\\*` `\\+` `\\?` `\\$` `\\^` `\\[` `\\]` `\\(` `\\)` `\\|` `\\\\`\n\n## Flags\n\n- **`g`** — global: find all matches (not just first)\n- **`i`** — case-insensitive\n- **`m`** — multiline: `^` and `$` match per line, not whole string\n- **`s`** — dotall: `.` matches newline too\n- **`u`** — unicode: full unicode support\n\n## RegExp Methods\n\n```js\nconst regex = /\\d+/g;\n\nregex.test('abc123');     // true — does it match?\n'abc123'.match(regex);   // ['123'] — get all matches\n'abc123'.search(regex);   // 3 — index of first match\n'abc123'.replace(regex, 'X'); // 'abcX' — replace\n'abc123'.split(regex);    // ['abc', ''] — split by pattern\n```\n\n**`match` with `g` flag** returns an array of all matches. Without `g`, it returns an array with extra info (index, input, groups).\n\n**`matchAll`** (ES2020): Returns an iterator of detailed match objects, requires `g` flag:\n```js\n[...'abc123def456'.matchAll(/(\\d+)/g)]\n// [{match: '123', index: 3, groups: {1: '123'}}, ...]\n```\n\n## Named Capture Groups\n\n```js\nconst dateRegex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;\nconst match = '2024-01-15'.match(dateRegex);\nconsole.log(match.groups.year);  // '2024'\nconsole.log(match.groups.month); // '01'\n```\n\n## Common Patterns\n\n```js\nconst email = /^[\\w.-]+@[\\w.-]+\\.\\w{2,}$/;\nconst phone = /^\\+?[\\d\\s-]{10,15}$/;\nconst url = /^https?:\\/\\/[\\w.-]+(?:\\.[\\w]{2,})(?:\\/\\S*)?$/;\nconst password = /^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%]).{8,}$/;\n```",
    "keyRules": [
      "Use ^ and $ anchors for full-string validation, not partial matches",
      "g flag makes match() return all matches; without it, you get extra details",
      "Use non-capturing groups (?:...) when you don't need backreferences",
      "Always escape special characters or use them inside character classes safely",
      "Named capture groups (?<name>...) are more readable than numbered \\1, \\2"
    ],
    "task": "Create a regex pattern that validates a simple email format: one or more word characters/dots/hyphens, followed by `@`, followed by one or more word characters/dots/hyphens, followed by `.`, followed by 2 or more word characters. Use it to validate `['ali@test.com', 'invalid-email', 'hello@world.io', '@missing.com', 'no@dot']`. Log each email and whether it's valid.",
    "hint": "Pattern: `/^[\\w.-]+@[\\w.-]+\\.\\w{2,}$/`. Use `.test(email)` in a loop or forEach.",
    "learnings": [
      { "title": "RegEx Patterns", "desc": "Constructing validation structures to check formats like emails and phone numbers." },
      { "title": "Flags", "desc": "Modifying global searches via global (g), case-insensitive (i), and multiline (m) parameters." }
    ],
    "starterCode": "// Task: Email Validation with Regular Expressions\n\n// 1. Create the email regex pattern\n\n// 2. Create test array with valid and invalid emails\n\n// 3. Loop through and log each email + validity\n\n// 4. Bonus: Extract the domain from each valid email using match()",
    "solutionCode": "// Task: Email Validation with Regular Expressions\n\n// 1. Create the email regex pattern\nconst emailRegex = /^[\\w.-]+@[\\w.-]+\\.\\w{2,}$/;\n\n// 2. Test array\nconst emails = [\n  'ali@test.com',\n  'invalid-email',\n  'hello@world.io',\n  '@missing.com',\n  'no@dot',\n  'user.name+tag@domain.co.uk'\n];\n\n// 3. Loop and validate\nemails.forEach(email => {\n  const isValid = emailRegex.test(email);\n  console.log(`${email}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);\n});\n\n// 4. Bonus: Extract domains from valid emails\nconst domainRegex = /@([\\w.-]+\\.\\w{2,})$/;\nemails.forEach(email => {\n  const match = email.match(domainRegex);\n  if (match) {\n    console.log(`Domain of ${email}: ${match[1]}`);\n  }\n});\n\n// Output:\n// ali@test.com: ✅ Valid\n// invalid-email: ❌ Invalid\n// hello@world.io: ✅ Valid\n// @missing.com: ❌ Invalid\n// no@dot: ❌ Invalid\n// user.name+tag@domain.co.uk: ✅ Valid\n// Domain of ali@test.com: test.com\n// Domain of hello@world.io: world.io",
    "exampleCode": "// 🧠 Advanced RegEx Techniques\n\n// Named capture groups for parsing\nconst urlRegex = /^(?<protocol>https?):\\/\\/(?<host>[\\w.-]+)(?<path>\\/\\S*)?$/;\nconst m = 'https://api.example.com/users?page=1'.match(urlRegex);\nconsole.log(m.groups.protocol); // 'https'\nconsole.log(m.groups.host);     // 'api.example.com'\nconsole.log(m.groups.path);     // '/users?page=1'\n\n// matchAll with capture groups\nconst text = 'Jan: 5, Feb: 12, Mar: 8';\nfor (const match of text.matchAll(/(\\w+):\\s*(\\d+)/g)) {\n  console.log(`${match[1]} = ${match[2]}`);\n}\n// 'Jan = 5', 'Feb = 12', 'Mar = 8'\n\n// replace with capture group references\nconst template = 'Hello {name}, you have {count} messages';\nconst result = template.replace(/\\{(\\w+)\\}/g, (match, key) => {\n  const data = { name: 'Ali', count: 5 };\n  return data[key] || match;\n});\nconsole.log(result); // 'Hello Ali, you have 5 messages'\n\n// Password strength checker\nfunction checkPasswordStrength(pwd) {\n  const checks = [\n    { name: 'length',     regex: /.{8,}/,           score: 1 },\n    { name: 'uppercase',  regex: /[A-Z]/,           score: 1 },\n    { name: 'lowercase',  regex: /[a-z]/,           score: 1 },\n    { name: 'digit',      regex: /\\d/,              score: 1 },\n    { name: 'special',    regex: /[!@#$%^&*(),.?\":{}|<>]/, score: 1 },\n  ];\n  return checks\n    .filter(c => c.regex.test(pwd))\n    .reduce((sum, c) => sum + c.score, 0);\n}\nconsole.log(checkPasswordStrength('Pass123!')); // 5",
    "tests": [
      { "id": "t1", "description": "Should create a regex pattern", "check": "code => /\\/[\\^\\w\\.\\[\\]-]+@[\\w\\.\\[\\]-]+\\/[a-z]*$/.test(code) || /new\\s+RegExp/.test(code)" },
      { "id": "t2", "description": "Should use anchors ^ and $", "check": "code => /\\^/.test(code) && /\\$/.test(code)" },
      { "id": "t3", "description": "Should have a test array of emails", "check": "code => /\\[\\s*['\"]/.test(code) && /@/.test(code)" },
      { "id": "t4", "description": "Should use .test() for validation", "check": "code => /\\.test\\s*\\(/.test(code)" },
      { "id": "t5", "description": "Should loop through emails", "check": "code => /\\.forEach|for\\s*\\(|for\\s+of/.test(code)" },
      { "id": "t6", "description": "Should have both valid and invalid test cases", "check": "code => (code.match(/['\"][^'\"]+@[^'\"]+['\"]/g) || []).length >= 3" }
    ]
  },
  {
    "id": "39",
    "slug": "dates-time-operations",
    "title": "Dates & Time Operations",
    "icon": "Calendar",
    "overview": "Instantiate, convert, and format real-world timestamps.",
    "explanation": "## The Date Object\n\nJavaScript has a built-in `Date` object for working with dates and times. It represents a single moment in time as the number of **milliseconds since January 1, 1970 UTC** (the Unix epoch).\n\n```js\nconst now = new Date();           // Current date & time\nconst specific = new Date(2024, 0, 15, 10, 30, 0); // Jan 15, 2024 10:30:00\nconst fromString = new Date('2024-01-15T10:30:00Z');\nconst fromMs = new Date(1705312200000);\n```\n\n**Critical gotcha:** Months are **0-indexed** (0 = January, 11 = December). Days are 1-indexed.\n\n## Getters & Setters\n\n```js\nconst d = new Date();\n\n// Getters (all local time)\nd.getFullYear();   // 2024\nd.getMonth();      // 0-11 (January = 0!)\nd.getDate();       // 1-31 (day of month)\nd.getDay();        // 0-6 (Sunday = 0!)\nd.getHours();      // 0-23\nd.getMinutes();    // 0-59\nd.getSeconds();    // 0-59\nd.getMilliseconds(); // 0-999\nd.getTime();       // Milliseconds since epoch\nd.getTimezoneOffset(); // Minutes offset from UTC\n\n// UTC versions\nd.getUTCFullYear(), d.getUTCHours(), etc.\n\n// Setters\nd.setFullYear(2025);\nd.setMonth(11); // December\nd.setDate(25);\nd.setHours(14);\n```\n\n**Setters mutate the original Date object and return the new timestamp.**\n\n## Date Arithmetic\n\n```js\nconst now = new Date();\nconst tomorrow = new Date(now);\ntomorrow.setDate(now.getDate() + 1);\n\nconst nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);\n\n// Difference between two dates\nconst diff = date2.getTime() - date1.getTime(); // milliseconds\nconst days = Math.floor(diff / (1000 * 60 * 60 * 24));\n```\n\n## Formatting\n\nJavaScript's native formatting is limited:\n```js\nd.toDateString();     // 'Mon Jan 15 2024'\nd.toTimeString();     // '10:30:00 GMT+0500'\nd.toISOString();      // '2024-01-15T05:30:00.000Z' (ALWAYS UTC!)\nd.toLocaleDateString('en-US', { \n  year: 'numeric', month: 'long', day: 'numeric' \n}); // 'January 15, 2024'\nd.toLocaleDateString('hi-IN'); // '१५/१/२०२४'\n```\n\n**`toISOString()` is the most reliable for APIs and storage** — it's always in UTC.\n\n## Parsing Pitfalls\n\n```js\nnew Date('2024-01-15');    // Treated as UTC midnight ✅\nnew Date('2024-01-15T00:00:00'); // Treated as LOCAL time ❌ confusion!\nnew Date('2024/01/15');    // Treated as LOCAL time ❌\nnew Date('01-15-2024');    // May parse differently across browsers ❌\n```\n\n**Rule:** Always use `YYYY-MM-DDTHH:mm:ss.sssZ` format or the `Date(year, month, day)` constructor for reliability.\n\n## Time Constants\n\n```js\nconst MINUTE = 60 * 1000;\nconst HOUR = 60 * MINUTE;\nconst DAY = 24 * HOUR;\nconst WEEK = 7 * DAY;\n```",
    "keyRules": [
      "Months are 0-indexed (January = 0) — this is the #1 Date bug source",
      "toISOString() always returns UTC — use it for API payloads and storage",
      'Date string parsing is inconsistent — prefer YYYY-MM-DD format or constructor arguments',
      "Setters mutate the original Date object — clone first if you need the original",
      "getTime() returns milliseconds since epoch — use it for date arithmetic and comparison"
    ],
    "task": "Create a function `formatDate(date)` that returns a string in `'DD/MM/YYYY'` format (padded with zeros). Create a function `daysBetween(d1, d2)` that returns the number of full days between two dates. Test by formatting today's date and calculating days between '2024-01-01' and '2024-12-31'.",
    "hint": "For padding: `String(date.getDate()).padStart(2, '0')`. For days: `Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)` and round down.",
    "learnings": [
      { "title": "Date Object", "desc": "Tracking system ticks since Unix epochs and extracting component structures." },
      { "title": "Time formatting", "desc": "Parsing international time zones and building clean, user-facing output templates." }
    ],
    "starterCode": "// Task: Date Formatting & Difference Calculation\n\n// 1. Create formatDate(date) → 'DD/MM/YYYY'\n//    Use padStart to ensure 2-digit day and month\n\n// 2. Create daysBetween(d1, d2) → number of full days\n//    Use getTime() and the DAY constant\n\n// 3. Format today's date and log it\n\n// 4. Calculate days between '2024-01-01' and '2024-12-31'\n\n// 5. Log both results",
    "solutionCode": "// Task: Date Formatting & Difference Calculation\n\n// 1. formatDate function\nfunction formatDate(date) {\n  const day = String(date.getDate()).padStart(2, '0');\n  const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because 0-indexed!\n  const year = date.getFullYear();\n  return `${day}/${month}/${year}`;\n}\n\n// 2. daysBetween function\nconst DAY = 24 * 60 * 60 * 1000;\nfunction daysBetween(d1, d2) {\n  const diffMs = Math.abs(d2.getTime() - d1.getTime());\n  return Math.floor(diffMs / DAY);\n}\n\n// 3. Format today\nconst today = new Date();\nconsole.log('Today:', formatDate(today)); // e.g., '15/06/2025'\n\n// 4. Calculate days between two dates\nconst start = new Date('2024-01-01');\nconst end = new Date('2024-12-31');\nconst days = daysBetween(start, end);\n\n// 5. Log results\nconsole.log(`Days between 2024-01-01 and 2024-12-31: ${days}`); // 365",
    "exampleCode": "// 🧠 Advanced Date Patterns\n\n// Add days/weeks/months safely\nfunction addDays(date, days) {\n  const result = new Date(date);\n  result.setDate(result.getDate() + days);\n  return result;\n}\n\nfunction addMonths(date, months) {\n  const result = new Date(date);\n  result.setMonth(result.getMonth() + months);\n  return result;\n}\n\n// Is today between two dates?\nfunction isBetween(date, start, end) {\n  const t = date.getTime();\n  return t >= start.getTime() && t <= end.getTime();\n}\n\n// Countdown formatter\nfunction timeUntil(targetDate) {\n  const now = new Date();\n  let diff = targetDate.getTime() - now.getTime();\n\n  if (diff <= 0) return 'Passed!';\n\n  const days = Math.floor(diff / (24 * 60 * 60 * 1000));\n  diff %= 24 * 60 * 60 * 1000;\n  const hours = Math.floor(diff / (60 * 60 * 1000));\n  diff %= 60 * 60 * 1000;\n  const mins = Math.floor(diff / (60 * 1000));\n\n  return `${days}d ${hours}h ${mins}m`;\n}\n\nconst newYear = new Date('2026-01-01T00:00:00');\nconsole.log(timeUntil(newYear));\n\n// Relative time formatter\nfunction relativeTime(date) {\n  const now = Date.now();\n  const diff = now - date.getTime();\n  const secs = Math.floor(diff / 1000);\n\n  if (secs < 60) return 'just now';\n  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;\n  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;\n  return `${Math.floor(secs / 86400)}d ago`;\n}\n\n// Performance timer\nconsole.time('operation');\n// ... heavy work\nconsole.timeEnd('operation'); // 'operation: 42.5ms'",
    "tests": [
      { "id": "t1", "description": "Should define formatDate function", "check": "code => /function\\s+formatDate|const\\s+formatDate/.test(code)" },
      { "id": "t2", "description": "Should use padStart for zero-padding", "check": "code => /padStart\\s*\\(\\s*2\\s*,\\s*['\"]0['\"]/.test(code)" },
      { "id": "t3", "description": "Should add 1 to getMonth (0-indexed fix)", "check": "code => /getMonth\\s*\\(\\s*\\)\\s*\\+\\s*1|getMonth\\s*\\(\\s*\\)\\s*\\+/.test(code)" },
      { "id": "t4", "description": "Should define daysBetween function", "check": "code => /function\\s+daysBetween|const\\s+daysBetween/.test(code)" },
      { "id": "t5", "description": "Should use getTime() for date arithmetic", "check": "code => /getTime\\s*\\(\\s*\\)/.test(code)" },
      { "id": "t6", "description": "Should test with specific dates", "check": "code => /2024-01-01|2024-12-31/.test(code)" }
    ]
  },
]

// ═══════════════════════════════════════════════════════════════
// BUG CHALLENGES
// ═══════════════════════════════════════════════════════════════
export const bugChallenges = [
  {
    id: "bug-01",
    slug: "bug-hoisting-tdz",
    title: "The Temporal Dead Zone",
    difficulty: "Easy",
    icon: "Bug",
    bugReport: "A script tries to print a user's role, but throws a ReferenceError: Cannot access 'role' before initialization, even though the variable is declared right below the console.log.",
    description: "Variables declared with 'let' and 'const' are hoisted to the top of their block but remain in a 'Temporal Dead Zone' (TDZ) until the line of declaration is executed. Accessing them before that line throws an error, unlike 'var' which would just return 'undefined'.",
    tags: ["Hoisting", "Temporal Dead Zone", "let/const"],
    buggyCode: `function showUser() {
  console.log("User Role:", role);
  let role = "Admin";
}

showUser();`,
    solutionCode: `function showUser() {
  let role = "Admin";
  console.log("User Role:", role);
}

showUser();`,
    tests: [
      { id: "bt1", description: "Should declare 'let role' before using it", check: "code => /let\\s+role\\s*=/.test(code) && !/console\\.log[\\s\\S]*?let\\s+role/.test(code)" },
      { id: "bt2", description: "Should still use 'let' or 'const'", check: "code => /let\\s+role|const\\s+role/.test(code)" },
      { id: "bt3", description: "Should NOT use 'var' as a lazy fix", check: "code => !/var\\s+role/.test(code)" },
    ],
  },
  {
    id: "bug-02",
    slug: "bug-var-block-scope",
    title: "The Leaky Loop Variable",
    difficulty: "Easy",
    icon: "Bug",
    bugReport: "A function processes an array of items and is supposed to return the total count. Instead, it also unexpectedly returns the loop counter variable, polluting the outer scope.",
    description: "The 'var' keyword is function-scoped, not block-scoped. When you declare 'var i' inside a for-loop, it leaks out of the loop block and becomes accessible in the entire function. This can accidentally overwrite outer variables or return unintended data.",
    tags: ["Scope", "Block Scope", "var vs let"],
    buggyCode: `function processItems() {
  const items = ["Apple", "Banana", "Cherry"];
  let count = 0;

  for (var i = 0; i < items.length; i++) {
    count++;
  }

  const result = { total: count, lastIndex: i };
  return result;
}

const data = processItems();
console.log("Total Items:", data.total);
console.log("Expected lastIndex to be undefined, got:", data.lastIndex);
if (data.lastIndex !== undefined) {
  console.log("BUG: Loop variable leaked out of the block!");
} else {
  console.log("SAFE: Scope is contained.");
}`,
    solutionCode: `function processItems() {
  const items = ["Apple", "Banana", "Cherry"];
  let count = 0;

  for (let i = 0; i < items.length; i++) {
    count++;
  }

  // If we try to access 'i' here, it would throw a ReferenceError
  const result = { total: count };
  return result;
}

const data = processItems();
console.log("Total Items:", data.total);
if (data.lastIndex !== undefined) {
  console.log("BUG: Loop variable leaked out of the block!");
} else {
  console.log("SAFE: Scope is contained.");
}`,
    tests: [
      { id: "bt1", description: "Should use 'let' inside the for loop", check: "code => /for\\s*\\(\\s*let\\s+/.test(code)" },
      { id: "bt2", description: "Should NOT use 'var' inside the for loop", check: "code => !/for\\s*\\(\\s*var\\s+/.test(code)" },
      { id: "bt3", description: "Should remove the leaked 'i' from the returned object", check: "code => !/lastIndex\\s*:\\s*i/.test(code)" },
    ],
  },
  {
    id: "bug-03",
    slug: "bug-closure-loop-sync",
    title: "The Synchronous Snapshot Failure",
    difficulty: "Medium",
    icon: "Bug",
    bugReport: "An array of 3 functions is created in a loop. Each function is supposed to return its loop index (0, 1, 2). But when executed, they all return 3.",
    description: "Using 'var' in a loop creates a single variable in the function scope. All closures created in the loop share the exact same reference to 'i'. By the time the functions are called, the loop has finished, and 'i' is left at its final value (3).",
    tags: ["Closures", "Loops", "var vs let"],
    buggyCode: `function createCounters() {
  const counters = [];

  for (var i = 0; i < 3; i++) {
    counters.push(function() {
      return i;
    });
  }

  return counters;
}

const myCounters = createCounters();
const results = myCounters.map(fn => fn());

console.log("Results:", results); // Expects [0, 1, 2]
if (results[0] === 0 && results[1] === 1) {
  console.log("SAFE: Counters work correctly.");
} else {
  console.log("BUG: All counters returned", results);
}`,
    solutionCode: `function createCounters() {
  const counters = [];

  for (let i = 0; i < 3; i++) {
    counters.push(function() {
      return i;
    });
  }

  return counters;
}

const myCounters = createCounters();
const results = myCounters.map(fn => fn());

console.log("Results:", results); // Expects [0, 1, 2]
if (results[0] === 0 && results[1] === 1) {
  console.log("SAFE: Counters work correctly.");
} else {
  console.log("BUG: All counters returned", results);
}`,
    tests: [
      { id: "bt1", description: "Should change loop variable to 'let'", check: "code => /for\\s*\\(\\s*let\\s+/.test(code)" },
      { id: "bt2", description: "Should keep the closure structure returning 'i'", check: "code => /return\\s+i;/.test(code)" },
      { id: "bt3", description: "Should NOT use 'var'", check: "code => !/var\\s+i/.test(code)" },
    ],
  },
  {
    id: "bug-04",
    slug: "bug-arrow-this",
    title: "The Vanishing Context",
    difficulty: "Medium",
    icon: "Bug",
    bugReport: "An object has a method that calls an inner arrow function to update a status. But 'this' is undefined inside the arrow function, causing a crash.",
    description: "Arrow functions do not have their own 'this' context; they inherit it from the lexical scope where they are written. When an object method itself is an arrow function, 'this' does not bind to the object, but to the surrounding scope (global/undefined in modules).",
    tags: ["this Context", "Arrow Functions", "Objects"],
    buggyCode: `const server = {
  status: "offline",
  start: () => {
    this.status = "online"; // Bug: 'this' is undefined here
    console.log("Server status:", this.status);
  }
};

try {
  server.start();
} catch (e) {
  console.log("BUG CRASHED:", e.message);
}`,
    solutionCode: `const server = {
  status: "offline",
  start() { // Fix: Use regular method shorthand to bind 'this' to 'server'
    this.status = "online";
    console.log("Server status:", this.status);
  }
};

try {
  server.start();
} catch (e) {
  console.log("BUG CRASHED:", e.message);
}`,
    tests: [
      { id: "bt1", description: "Should use a regular function or method shorthand", check: "code => /start\\s*\\(\\s*\\)\\s*\\{/.test(code)" },
      { id: "bt2", description: "Should NOT define 'start' as an arrow function", check: "code => !/start\\s*:\\s*\\(\\s*\\)\\s*=>/.test(code) && !/start\\s*\\(\\s*\\)\\s*=>/.test(code)" },
      { id: "bt3", description: "Should still use 'this.status'", check: "code => /this\\.status/.test(code)" },
    ],
  },
  {
    id: "bug-05",
    slug: "bug-type-coercion-math",
    title: "The Invisible String",
    difficulty: "Easy",
    icon: "Bug",
    bugReport: "A cart calculator adds a price string (50) and a tax number (5). Instead of 55, it returns 505 because of silent string concatenation.",
    description: "The '+' operator in JavaScript is overloaded for both addition and string concatenation. If either operand is a string, JavaScript implicitly coerces the other operand to a string and concatenates them instead of doing math.",
    tags: ["Type Coercion", "Operators", "Strings"],
    buggyCode: `function calculateTotal(priceStr, taxNum) {
  const total = priceStr + taxNum;
  return total;
}

const finalPrice = calculateTotal("50", 5);
console.log("Total Price:", finalPrice);

if (finalPrice === 55) {
  console.log("SAFE: Math is correct.");
} else {
  console.log("BUG: Got string concatenation instead of addition.");
}`,
    solutionCode: `function calculateTotal(priceStr, taxNum) {
  // Fix: Explicitly convert string to number using Number()
  const total = Number(priceStr) + taxNum;
  return total;
}

const finalPrice = calculateTotal("50", 5);
console.log("Total Price:", finalPrice);

if (finalPrice === 55) {
  console.log("SAFE: Math is correct.");
} else {
  console.log("BUG: Got string concatenation instead of addition.");
}`,
    tests: [
      { id: "bt1", description: "Should explicitly convert string to number", check: "code => /Number\\s*\\(\\s*priceStr\\s*\\)/.test(code) || /parseInt\\s*\\(\\s*priceStr/.test(code) || /\\+priceStr/.test(code)" },
      { id: "bt2", description: "Should NOT just add them directly", check: "code => !/total\\s*=\\s*priceStr\\s*\\+\\s*taxNum/.test(code)" },
      { id: "bt3", description: "Should keep the function parameters the same", check: "code => /calculateTotal\\s*\\(\\s*priceStr\\s*,\\s*taxNum/.test(code)" },
    ],
  },
  {
    id: "bug-06",
    slug: "bug-pass-by-reference",
    title: "The Severed Connection",
    difficulty: "Medium",
    icon: "Bug",
    bugReport: "A function is supposed to completely replace a user's profile object with a default one. But after calling the function, the original object remains unchanged.",
    description: "JavaScript passes objects by reference, but the reference itself is passed by value. If you reassign the parameter variable to a completely new object inside the function, you only break the link to the original object. You must mutate the existing object's properties instead of reassigning the variable.",
    tags: ["References", "Objects", "Mutation"],
    buggyCode: `function resetProfile(profile) {
  profile = { name: "Guest", role: "viewer", active: false };
}

let user = { name: "Ali", role: "admin", active: true };
resetProfile(user);

console.log("User after reset:", user);
if (user.name === "Guest") {
  console.log("SAFE: Profile was reset.");
} else {
  console.log("BUG: Reassignment inside function did not affect outer object.");
}`,
    solutionCode: `function resetProfile(profile) {
  // Fix: Mutate the existing object properties instead of reassigning the variable
  profile.name = "Guest";
  profile.role = "viewer";
  profile.active = false;
}

let user = { name: "Ali", role: "admin", active: true };
resetProfile(user);

console.log("User after reset:", user);
if (user.name === "Guest") {
  console.log("SAFE: Profile was reset.");
} else {
  console.log("BUG: Reassignment inside function did not affect outer object.");
}`,
    tests: [
      { id: "bt1", description: "Should mutate properties directly (e.g., profile.name = ...)", check: "code => /profile\\.name\\s*=/.test(code) && /profile\\.role\\s*=/.test(code)" },
      { id: "bt2", description: "Should NOT reassign the 'profile' parameter to a new object", check: "code => !/profile\\s*=\\s*\\{/.test(code)" },
      { id: "bt3", description: "Should still take profile as argument", check: "code => /resetProfile\\s*\\(\\s*profile\\s*\\)/.test(code)" },
    ],
  },
  {
    id: "bug-07",
    slug: "bug-foreach-return",
    title: "The Undefined Chain",
    difficulty: "Easy",
    icon: "Bug",
    bugReport: "An array of numbers is doubled using .forEach(). When trying to log the first element of the new array, it throws 'TypeError: Cannot read properties of undefined'.",
    description: "Array.prototype.forEach() always returns 'undefined'. It is meant for side effects (like logging), not for creating new arrays. When you try to chain methods or assign the result of forEach to a variable, you get undefined instead of the mapped array.",
    tags: ["Array Methods", "forEach vs map", "Return Values"],
    buggyCode: `function getDoubled(numbers) {
  const doubled = numbers.forEach(num => num * 2);
  return doubled;
}

const nums = [1, 2, 3];
const result = getDoubled(nums);

try {
  console.log("First doubled number:", result[0]);
} catch (e) {
  console.log("BUG CRASHED:", e.message);
}`,
    solutionCode: `function getDoubled(numbers) {
  // Fix: Use .map() which returns a new array
  const doubled = numbers.map(num => num * 2);
  return doubled;
}

const nums = [1, 2, 3];
const result = getDoubled(nums);

try {
  console.log("First doubled number:", result[0]);
} catch (e) {
  console.log("BUG CRASHED:", e.message);
}`,
    tests: [
      { id: "bt1", description: "Should use .map() instead of .forEach()", check: "code => /\\.map\\s*\\(/.test(code)" },
      { id: "bt2", description: "Should NOT use .forEach() for returning data", check: "code => !/\\.forEach\\s*\\(/.test(code)" },
      { id: "bt3", description: "Should return the new array", check: "code => /return\\s+doubled/.test(code)" },
    ],
  },
  {
    id: "bug-08",
    slug: "bug-destructure-defaults",
    title: "The Collapsed Config",
    difficulty: "Medium",
    icon: "Bug",
    bugReport: "A function tries to extract a nested 'timeout' value from a config object. If the config is missing the 'network' key, the app crashes with 'Cannot destructure property 'timeout' of undefined'.",
    description: "When destructuring deeply nested objects, if an intermediate property is missing or undefined, JavaScript throws a TypeError. You must provide default values (like `= {}`) at each nesting level to prevent the crash.",
    tags: ["Destructuring", "Defaults", "Nested Objects"],
    buggyCode: `function startService(config) {
  const { network: { timeout, retries } } = config;

  console.log(\`Starting with timeout: \${timeout}, retries: \${retries}\`);
}

const prodConfig = { network: { timeout: 5000, retries: 3 } };
const devConfig = { debug: true }; // Missing 'network' key

console.log("--- Prod ---");
startService(prodConfig);

console.log("--- Dev ---");
try {
  startService(devConfig);
} catch (e) {
  console.log("BUG CRASHED:", e.message);
}`,
    solutionCode: `function startService(config) {
  // Fix: Add default empty objects at each nesting level
  const { network: { timeout = 1000, retries = 0 } = {} } = config;

  console.log(\`Starting with timeout: \${timeout}, retries: \${retries}\`);
}

const prodConfig = { network: { timeout: 5000, retries: 3 } };
const devConfig = { debug: true }; // Missing 'network' key

console.log("--- Prod ---");
startService(prodConfig);

console.log("--- Dev ---");
try {
  startService(devConfig);
} catch (e) {
  console.log("BUG CRASHED:", e.message);
}`,
    tests: [
      { id: "bt1", description: "Should use default empty object assignment in destructuring", check: "code => /=\\s*\\{\\s*\\}/.test(code)" },
      { id: "bt2", description: "Should keep the nested destructuring syntax", check: "code => /network\\s*:\\s*\\{/.test(code)" },
      { id: "bt3", description: "Should NOT destructure without defaults", check: "code => !/network\\s*:\\s*\\{[^}]*\\}\\s*\\)/.test(code) || /=\\s*\\{\\s*\\}/.test(code)" },
    ],
  },
  {
    id: "bug-09",
    slug: "bug-async-try-catch",
    title: "The Escaped Rejection",
    difficulty: "Hard",
    icon: "Bug",
    bugReport: "An async function wraps a Promise inside a try...catch block. But when the Promise rejects, the catch block is completely ignored, and Node.js throws an UnhandledPromiseRejection warning/crash.",
    description: "If you call an async function without the 'await' keyword inside a try...catch block, the execution moves to the next line immediately. The rejected Promise floats away unhandled. The catch block only catches synchronous errors or errors from awaited Promises.",
    tags: ["Async/Await", "Error Handling", "Promises"],
    buggyCode: `const riskyTask = () => Promise.reject(new Error("Database connection failed"));

async function runPipeline() {
  try {
    console.log("Starting pipeline...");
    riskyTask(); // Bug: Missing 'await'
    console.log("Pipeline finished successfully!");
  } catch (err) {
    console.log("CAUGHT ERROR:", err.message);
  }
}

runPipeline();`,
    solutionCode: `const riskyTask = () => Promise.reject(new Error("Database connection failed"));

async function runPipeline() {
  try {
    console.log("Starting pipeline...");
    await riskyTask(); // Fix: Added 'await'
    console.log("Pipeline finished successfully!");
  } catch (err) {
    console.log("CAUGHT ERROR:", err.message);
  }
}

runPipeline();`,
    tests: [
      { id: "bt1", description: "Must use 'await' before riskyTask()", check: "code => /await\\s+riskyTask/.test(code)" },
      { id: "bt2", description: "Should keep the try...catch structure", check: "code => /try\\s*\\{/.test(code) && /catch\\s*\\(/.test(code)" },
      { id: "bt3", description: "Should NOT call riskyTask without await inside try", check: "code => !/riskyTask\\s*\\(\\s*\\)\\s*;/.test(code) || /await\\s+riskyTask/.test(code)" },
    ],
  },
  {
    id: "bug-10",
    slug: "bug-object-reference-equality",
    title: "The Identity Crisis",
    difficulty: "Medium",
    icon: "Bug",
    bugReport: "A function compares a user's current settings against default settings to check if they are identical. Even though both objects have the exact same keys and values, the check fails and resets the user's settings unnecessarily.",
    description: "In JavaScript, objects are compared by reference, not by value. Even if two objects look identical, `{ a: 1 } === { a: 1 }` is false because they live in different memory locations. To compare object values, you must compare their stringified versions or write a deep comparison.",
    tags: ["Object Equality", "References", "Comparison"],
    buggyCode: `function checkSettings(current, defaults) {
  if (current === defaults) {
    return "Match! Keeping current settings.";
  }
  return "Mismatch! Resetting to defaults...";
}

const defaultSettings = { theme: "dark", fontSize: 14 };
const userSettings = { theme: "dark", fontSize: 14 };

const result = checkSettings(userSettings, defaultSettings);
console.log("Result:", result);

if (result.includes("Mismatch")) {
  console.log("BUG: Objects have same values but reference check failed.");
} else {
  console.log("SAFE: Objects matched correctly.");
}`,
    solutionCode: `function checkSettings(current, defaults) {
  // Fix: Compare stringified objects to compare by value
  if (JSON.stringify(current) === JSON.stringify(defaults)) {
    return "Match! Keeping current settings.";
  }
  return "Mismatch! Resetting to defaults...";
}

const defaultSettings = { theme: "dark", fontSize: 14 };
const userSettings = { theme: "dark", fontSize: 14 };

const result = checkSettings(userSettings, defaultSettings);
console.log("Result:", result);

if (result.includes("Mismatch")) {
  console.log("BUG: Objects have same values but reference check failed.");
} else {
  console.log("SAFE: Objects matched correctly.");
}`,
    tests: [
      { id: "bt1", description: "Should use JSON.stringify for comparison", check: "code => /JSON\\.stringify\\s*\\(\\s*current\\s*\\)\\s*===\\s*JSON\\.stringify\\s*\\(\\s*defaults/.test(code)" },
      { id: "bt2", description: "Should NOT use strict equality (===) directly on objects", check: "code => !/current\\s*===\\s*defaults/.test(code)" },
      { id: "bt3", description: "Should keep the same function signature", check: "code => /checkSettings\\s*\\(\\s*current\\s*,\\s*defaults\\s*\\)/.test(code)" },
    ],
  }
]

// ═══════════════════════════════════════════════════════════════
// MINI PROJECTS
// ═══════════════════════════════════════════════════════════════
export const miniProjects = [
  {
    id: "proj-01",
    slug: "student-grade-analyzer",
    title: "Student Grade Analyzer",
    difficulty: "Beginner",
    description: "Build a student performance analyzer that processes a hardcoded dataset of 8 students. Calculate averages, find the topper, count pass/fail ratios, filter by attendance, and rank students — all using core array methods. Learn map, reduce, filter, sort, find, and template literals.",
    tags: ["Array Methods", "Objects", "Conditions", "Template Literals", "Destructuring"],
    hint: "Use .map() to add computed fields like average and passed status. Use .reduce() to find the topper by comparing averages. Use .filter() for pass/fail counting and low attendance. Finally use .sort() to rank.",
    starterCode: `// Task: Build a Student Grade Analyzer\n\n// 1. Define an array of 8 student objects\n//    Each student: { name, math, science, english, attendance }\n\n// 2. Use .map() to add average, passed (all scores >= 50), eligible (passed + attendance >= 75)\n\n// 3. Use .reduce() to find the class topper (highest average)\n\n// 4. Calculate subject-wise class averages using .reduce()\n\n// 5. Use .filter() to count passed vs failed students\n\n// 6. Use .filter() to find students with attendance below 75%\n\n// 7. Use [...array].sort() to rank students by average (descending)\n\n// 8. Log everything with formatted output`,
    solutionCode: `const analyzeStudents = () => {
  const students = [
    { name: "Aarav", math: 92, science: 85, english: 78, attendance: 95 },
    { name: "Priya", math: 76, science: 91, english: 88, attendance: 88 },
    { name: "Rohan", math: 45, science: 52, english: 60, attendance: 72 },
    { name: "Sneha", math: 98, science: 95, english: 92, attendance: 98 },
    { name: "Vikram", math: 67, science: 70, english: 65, attendance: 80 },
    { name: "Ananya", math: 55, science: 48, english: 62, attendance: 68 },
    { name: "Arjun", math: 88, science: 82, english: 90, attendance: 92 },
    { name: "Kavya", math: 73, science: 77, english: 80, attendance: 85 }
  ];

  const PASS_THRESHOLD = 50;
  const MIN_ATTENDANCE = 75;

  // 1. Add computed fields using .map()
  const withAverage = students.map(s => {
    const total = s.math + s.science + s.english;
    const average = Number((total / 3).toFixed(1));
    const passed = s.math >= PASS_THRESHOLD && s.science >= PASS_THRESHOLD && s.english >= PASS_THRESHOLD;
    const eligible = passed && s.attendance >= MIN_ATTENDANCE;
    return { ...s, average, passed, eligible };
  });

  // 2. Find topper using .reduce()
  const topper = withAverage.reduce((best, s) => s.average > best.average ? s : best);

  // 3. Subject averages using .reduce()
  const mathAvg = Number((students.reduce((sum, s) => sum + s.math, 0) / students.length).toFixed(1));
  const scienceAvg = Number((students.reduce((sum, s) => sum + s.science, 0) / students.length).toFixed(1));
  const englishAvg = Number((students.reduce((sum, s) => sum + s.english, 0) / students.length).toFixed(1));

  // 4. Pass/Fail count using .filter()
  const passedCount = withAverage.filter(s => s.passed).length;
  const failedCount = withAverage.length - passedCount;

  // 5. Low attendance using .filter()
  const lowAttendance = withAverage.filter(s => s.attendance < MIN_ATTENDANCE);

  // 6. Rank students using .sort()
  const ranked = [...withAverage].sort((a, b) => b.average - a.average);

  // Output
  console.log("========================================");
  console.log("    STUDENT PERFORMANCE ANALYSIS");
  console.log("========================================\\n");

  console.log("--- Ranked Students ---");
  ranked.forEach((s, i) => {
    const status = s.passed ? "PASS" : "FAIL";
    const elig = s.eligible ? "ELIGIBLE" : "NOT ELIGIBLE";
    console.log(\`#\${i + 1} \${s.name} | Avg: \${s.average}% | \${status} | Attendance: \${s.attendance}% | \${elig}\`);
  });

  console.log(\`\\n--- Class Topper ---\`);
  console.log(\`\${topper.name} with \${topper.average}% average\`);

  console.log(\`\\n--- Subject Averages ---\`);
  console.log(\`Math: \${mathAvg}% | Science: \${scienceAvg}% | English: \${englishAvg}%\`);

  console.log(\`\\n--- Pass/Fail Ratio ---\`);
  console.log(\`Passed: \${passedCount} | Failed: \${failedCount} | Pass Rate: \${((passedCount / students.length) * 100).toFixed(0)}%\`);

  console.log(\`\\n--- Low Attendance Warning (<\${MIN_ATTENDANCE}%) ---\`);
  if (lowAttendance.length === 0) {
    console.log("All students meet attendance requirements.");
  } else {
    lowAttendance.forEach(s => {
      console.log(\`Warning: \${s.name} - \${s.attendance}% attendance\`);
    });
  }
};

analyzeStudents();`,
    tests: [
      { id: "pa-1", description: "Should define a students array with objects", check: "code => /const\\s+students\\s*=\\s*\\[/.test(code)" },
      { id: "pa-2", description: "Should use .map() to add computed fields", check: "code => /\\.map\\s*\\(/.test(code)" },
      { id: "pa-3", description: "Should use .reduce() to find topper or calculate sums", check: "code => /\\.reduce\\s*\\(/.test(code)" },
      { id: "pa-4", description: "Should use .filter() for pass/fail or attendance", check: "code => /\\.filter\\s*\\(/.test(code)" },
      { id: "pa-5", description: "Should use .sort() to rank students", check: "code => /\\.sort\\s*\\(/.test(code)" },
      { id: "pa-6", description: "Should use spread operator to copy array before sort", check: "code => /\\[\\s*\\.\\.\\./.test(code)" },
      { id: "pa-7", description: "Should use template literals for output", check: "code => /console\\.log\\s*\\(\\s*\`/.test(code)" },
      { id: "pa-8", description: "Should use conditional logic (ternary or if)", check: "code => /\\?.*:/g.test(code) || /if\\s*\\(/g.test(code)" },
    ],
    steps: [],
  },
  {
    id: "proj-02",
    slug: "secure-password-generator",
    title: "Secure Password Generator",
    difficulty: "Intermediate",
    description: "Build a password generator that creates multiple passwords from different configurations (strong, medium, simple). It must use character sets, enforce constraints, guarantee at least one number/symbol when enabled, and shuffle using the Fisher-Yates algorithm. Learn string manipulation, Math.random, array splicing, and algorithm implementation.",
    tags: ["Math.random", "Fisher-Yates Shuffle", "String Manipulation", "Array Splice", "Validation"],
    hint: "Build charset by concatenating strings based on options. Pick required chars first, fill the rest, insert required chars at random positions with .splice(), then Fisher-Yates shuffle the entire array. Finally .join('') it.",
    starterCode: `// Task: Build a Secure Password Generator\n\n// 1. Define CHARSETS object: { lower, upper, numbers, symbols }\n\n// 2. Create generatePassword(length, options) function\n//    options: { useSymbols: true/false, useNumbers: true/false }\n\n// 3. Build charset string by concatenating based on options\n\n// 4. Pick 1 required char from each enabled type (number, symbol)\n\n// 5. Fill remaining length with random chars from charset\n\n// 6. Insert required chars at random positions using .splice()\n\n// 7. Implement Fisher-Yates shuffle on the full array\n\n// 8. Return .join('') result\n\n// 9. Create 3 configs (strong/medium/simple) and generate 3 passwords each`,
    solutionCode: `const initPasswordGenerator = () => {
  const configs = [
    { length: 16, useSymbols: true, useNumbers: true, count: 3, label: "Strong (16 chars, all types)" },
    { length: 12, useSymbols: false, useNumbers: true, count: 3, label: "Medium (12 chars, no symbols)" },
    { length: 8, useSymbols: false, useNumbers: false, count: 3, label: "Simple (8 chars, letters only)" }
  ];

  const CHARSETS = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~\`|}{[]:;?><,./-="
  };

  const generatePassword = (length, options) => {
    let charset = CHARSETS.lower + CHARSETS.upper;
    let requiredChars = [];

    if (options.useNumbers) {
      charset += CHARSETS.numbers;
      requiredChars.push(CHARSETS.numbers[Math.floor(Math.random() * CHARSETS.numbers.length)]);
    }
    if (options.useSymbols) {
      charset += CHARSETS.symbols;
      requiredChars.push(CHARSETS.symbols[Math.floor(Math.random() * CHARSETS.symbols.length)]);
    }

    if (length < requiredChars.length) {
      console.error("Error: Password length too short for required character types.");
      return null;
    }

    let passwordArray = [];
    for (let i = 0; i < length - requiredChars.length; i++) {
      passwordArray.push(charset[Math.floor(Math.random() * charset.length)]);
    }

    requiredChars.forEach(char => {
      const randomIndex = Math.floor(Math.random() * (passwordArray.length + 1));
      passwordArray.splice(randomIndex, 0, char);
    });

    // Fisher-Yates Shuffle
    for (let i = passwordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    return passwordArray.join("");
  };

  configs.forEach(config => {
    console.log(\`\\n[ \${config.label} ]\`);
    console.log("-".repeat(42));
    for (let i = 0; i < config.count; i++) {
      const pwd = generatePassword(config.length, config);
      if (pwd) {
        const strength = pwd.length >= 16 && config.useSymbols ? "STRONG" : pwd.length >= 12 ? "MEDIUM" : "WEAK";
        console.log(\`  [\${i + 1}] \${pwd}  (\${strength})\`);
      }
    }
  });

  const totalGenerated = configs.reduce((sum, c) => sum + c.count, 0);
  console.log("\\n" + "=".repeat(42));
  console.log(\`Generated \${totalGenerated} passwords across 3 configurations.\`);
};

initPasswordGenerator();`,
    tests: [
      { id: "pc-1", description: "Should define CHARSETS object with lower, upper, numbers, symbols", check: "code => /CHARSETS/.test(code) && /lower/.test(code) && /symbols/.test(code)" },
      { id: "pc-2", description: "Should use Math.random and Math.floor to pick chars", check: "code => /Math\\.random/.test(code) && /Math\\.floor/.test(code)" },
      { id: "pc-3", description: "Should implement Fisher-Yates shuffle algorithm", check: "code => /passwordArray\\.length\\s*-\\s*1/.test(code) && /\\[passwordArray\\[i\\],\\s*passwordArray\\[j\\]\\]\\s*=\\s*\\[passwordArray\\[j\\],\\s*passwordArray\\[i\\]\\]/.test(code)" },
      { id: "pc-4", description: "Should use .splice() to insert required characters", check: "code => /\\.splice\\s*\\(/.test(code)" },
      { id: "pc-5", description: "Should have input validation (length check)", check: "code => /length\\s*<\\s*requiredChars/.test(code) || /length\\s*<\\s*\\d/.test(code)" },
      { id: "pc-6", description: "Should join array into final string password", check: "code => /\\.join\\s*\\(\\s*['\"]['\"]\\s*\\)/.test(code)" },
      { id: "pc-7", description: "Should use .forEach() to iterate over configs", check: "code => /configs\\.forEach/.test(code) || /\\.forEach\\s*\\(\\s*config/.test(code)" },
      { id: "pc-8", description: "Should use .reduce() to count total passwords", check: "code => /\\.reduce\\s*\\(/.test(code)" },
    ],
    steps: [],
  },
  {
    id: "proj-03",
    slug: "library-management-system",
    title: "Library Management System",
    difficulty: "Advanced",
    description: "Build a full OOP-based library system with Book, Member, and Library classes. Support book issuance with validation (max limit per member type, duplicate issue prevention), returns, availability checks, genre filtering, and a transaction log. Demonstrate with 7 books and 3 members. Learn classes, encapsulation, method chaining, and complex state management.",
    tags: ["Classes", "OOP", "Encapsulation", "Method Chaining", "Array Methods", "State Management"],
    hint: "Book class tracks isIssued/issuedTo. Member class tracks issuedBooks array and maxBooks based on type. Library class holds all arrays and methods. In issueBook(), validate everything before mutating state. Use return this for chaining in addBook/registerMember.",
    starterCode: `// Task: Build a Library Management System\n\n// 1. Create Book class\n//    Props: id, title, author, genre, year, isIssued, issuedTo\n//    Method: getInfo() returns formatted string\n\n// 2. Create Member class\n//    Props: id, name, type ("student"/"faculty"), maxBooks, issuedBooks[]\n//    Method: canIssue() checks if under limit\n\n// 3. Create Library class\n//    Props: name, books[], members[], transactions[]\n//    Methods: addBook(), registerMember(), issueBook(), returnBook(),\n//            getAvailableBooks(), getBooksByGenre(), getStats()\n\n// 4. issueBook(bookId, memberId) must validate:\n//    - Book exists and is not already issued\n//    - Member exists and hasn't reached maxBooks\n//    - Then update book status, member's issuedBooks, and transactions log\n\n// 5. returnBook(bookId) must:\n//    - Remove bookId from member's issuedBooks using .filter()\n//    - Reset book's issued status\n//    - Add to transactions log\n\n// 6. Add 7 books, 3 members, run issue/return operations, log results`,
    solutionCode: `class Book {
  constructor(id, title, author, genre, year) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.year = year;
    this.isIssued = false;
    this.issuedTo = null;
  }

  getInfo() {
    const status = this.isIssued ? "Issued to " + this.issuedTo : "Available";
    return "[" + this.id + "] \\"" + this.title + "\\" by " + this.author + " (" + this.year + ") - " + status;
  }
}

class Member {
  constructor(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.maxBooks = type === "faculty" ? 5 : 3;
    this.issuedBooks = [];
  }

  canIssue() {
    return this.issuedBooks.length < this.maxBooks;
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
    this.members = [];
    this.transactions = [];
  }

  addBook(book) {
    this.books.push(book);
    return this;
  }

  registerMember(member) {
    this.members.push(member);
    return this;
  }

  findBookById(id) {
    return this.books.find(b => b.id === id);
  }

  findMemberById(id) {
    return this.members.find(m => m.id === id);
  }

  issueBook(bookId, memberId) {
    const book = this.findBookById(bookId);
    const member = this.findMemberById(memberId);

    if (!book) return { success: false, msg: "Book #" + bookId + " not found." };
    if (!member) return { success: false, msg: "Member #" + memberId + " not found." };
    if (book.isIssued) return { success: false, msg: "\\"" + book.title + "\\" is already issued." };
    if (!member.canIssue()) return { success: false, msg: member.name + " has reached max limit (" + member.maxBooks + ")." };

    book.isIssued = true;
    book.issuedTo = member.name;
    member.issuedBooks.push(book.id);
    this.transactions.push({ type: "issue", bookId: bookId, memberId: memberId, date: "2025-01-15" });

    return { success: true, msg: "Issued \\"" + book.title + "\\" to " + member.name };
  }

  returnBook(bookId) {
    const book = this.findBookById(bookId);
    if (!book) return { success: false, msg: "Book #" + bookId + " not found." };
    if (!book.isIssued) return { success: false, msg: "\\"" + book.title + "\\" is not issued." };

    const member = this.members.find(m => m.issuedBooks.includes(bookId));
    if (member) {
      member.issuedBooks = member.issuedBooks.filter(id => id !== bookId);
    }

    book.isIssued = false;
    book.issuedTo = null;
    this.transactions.push({ type: "return", bookId: bookId, date: "2025-01-15" });

    return { success: true, msg: "Returned \\"" + book.title + "\\"" };
  }

  getAvailableBooks() {
    return this.books.filter(b => !b.isIssued);
  }

  getBooksByGenre(genre) {
    return this.books.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
  }

  getStats() {
    const available = this.getAvailableBooks().length;
    const issued = this.books.length - available;
    const genres = [...new Set(this.books.map(b => b.genre))];
    return {
      total: this.books.length,
      available: available,
      issued: issued,
      genres: genres,
      members: this.members.length,
      transactions: this.transactions.length
    };
  }
}

// --- Demo ---
const runDemo = () => {
  const lib = new Library("Central JS Library");

  lib.addBook(new Book("B001", "Eloquent JavaScript", "Marijn Haverbeke", "Programming", 2018));
  lib.addBook(new Book("B002", "You Don't Know JS", "Kyle Simpson", "Programming", 2015));
  lib.addBook(new Book("B003", "Clean Code", "Robert C. Martin", "Engineering", 2008));
  lib.addBook(new Book("B004", "The Pragmatic Programmer", "Andrew Hunt", "Engineering", 2019));
  lib.addBook(new Book("B005", "Design Patterns", "Gang of Four", "Programming", 1994));
  lib.addBook(new Book("B006", "JS: The Good Parts", "Douglas Crockford", "Programming", 2008));
  lib.addBook(new Book("B007", "Refactoring", "Martin Fowler", "Engineering", 2018));

  lib.registerMember(new Member("M001", "Arjun", "student"));
  lib.registerMember(new Member("M002", "Dr. Sharma", "faculty"));
  lib.registerMember(new Member("M003", "Priya", "student"));

  console.log("=== ISSUING BOOKS ===\\n");
  const ops = [
    lib.issueBook("B001", "M001"),
    lib.issueBook("B002", "M001"),
    lib.issueBook("B003", "M001"),
    lib.issueBook("B004", "M002"),
    lib.issueBook("B005", "M002"),
    lib.issueBook("B001", "M003"),
    lib.issueBook("B006", "M001"),
  ];
  ops.forEach(op => {
    console.log("  [" + (op.success ? "OK" : "X") + "] " + op.msg);
  });

  console.log("\\n=== RETURNING BOOK ===\\n");
  const ret = lib.returnBook("B001");
  console.log("  [" + (ret.success ? "OK" : "X") + "] " + ret.msg);

  console.log("\\n=== RE-ISSUE AFTER RETURN ===\\n");
  const reissue = lib.issueBook("B001", "M003");
  console.log("  [" + (reissue.success ? "OK" : "X") + "] " + reissue.msg);

  console.log("\\n=== AVAILABLE BOOKS ===\\n");
  lib.getAvailableBooks().forEach(b => console.log("  " + b.getInfo()));

  console.log("\\n=== BOOKS: PROGRAMMING ===\\n");
  lib.getBooksByGenre("Programming").forEach(b => console.log("  " + b.getInfo()));

  console.log("\\n=== TRANSACTION LOG ===\\n");
  lib.transactions.forEach((t, i) => {
    console.log("  " + (i + 1) + ". " + t.type.toUpperCase() + " Book#" + t.bookId + " on " + t.date);
  });

  console.log("\\n=== LIBRARY STATS ===\\n");
  const s = lib.getStats();
  console.log("  Total Books: " + s.total);
  console.log("  Available: " + s.available + " | Issued: " + s.issued);
  console.log("  Genres: " + s.genres.join(", "));
  console.log("  Members: " + s.members);
  console.log("  Transactions: " + s.transactions);
};

runDemo();`,
    tests: [
      { id: "pl-1", description: "Should define a Book class", check: "code => /class\\s+Book\\s*\\{/.test(code)" },
      { id: "pl-2", description: "Should define a Member class", check: "code => /class\\s+Member\\s*\\{/.test(code)" },
      { id: "pl-3", description: "Should define a Library class", check: "code => /class\\s+Library\\s*\\{/.test(code)" },
      { id: "pl-4", description: "Book should have isIssued property initialized to false", check: "code => /this\\.isIssued\\s*=\\s*false/.test(code)" },
      { id: "pl-5", description: "Should use .find() to locate books or members by id", check: "code => /\\.find\\s*\\(\\s*\\w+\\s*=>/.test(code)" },
      { id: "pl-6", description: "Should use .filter() to get available books or remove from issuedBooks", check: "code => /\\.filter\\s*\\(/.test(code)" },
      { id: "pl-7", description: "Should use .push() to add items to arrays", check: "code => /\\.push\\s*\\(/.test(code)" },
      { id: "pl-8", description: "Should use .includes() to check if member has a book", check: "code => /\\.includes\\s*\\(/.test(code)" },
      { id: "pl-9", description: "Should use .map() with Set to get unique genres", check: "code => /new\\s+Set/.test(code) && /\\.map\\s*\\(/.test(code)" },
      { id: "pl-10", description: "Should return 'this' for method chaining", check: "code => /return\\s+this;/.test(code)" },
      { id: "pl-11", description: "Should have conditional validation in issueBook", check: "code => /if\\s*\\(!book\\)/.test(code) || /if\\s*\\(book\\.isIssued\\)/.test(code)" },
      { id: "pl-12", description: "Should use .forEach() to log operations or books", check: "code => /\\.forEach\\s*\\(/.test(code)" },
    ],
    steps: [],
  }
]