'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowDownUp,
  ArrowUpDown,
  Blocks,
  BookMarked,
  BookOpen,
  Box,
  Braces,
  Calculator,
  CircleDot,
  Clock,
  Code2,
  Cpu,
  Database,
  Eye,
  FileArchive,
  FileCode,
  FileJson,
  FileText,
  Filter,
  FolderTree,
  List,
  CheckCircle2,
  GitBranch,
  GitCompare,
  GitFork,
  Grid3X3,
  Hammer,
  HardDrive,
  Hash,
  Layers,
  LayoutGrid,
  Library,
  Link,
  Link2,
  Lock,
  Monitor,
  Network,
  Package,
  PaintBucket,
  Puzzle,
  Repeat,
  RotateCcw,
  Search,
  Shield,
  ShieldAlert,
  Shuffle,
  Sparkles,
  Table,
  Tag,
  Target,
  ToggleRight,
  Type,
  Variable,
  Workflow,
  Zap
} from "lucide-react";

// Structured React Native Data
const nextJsTopics = [
  {
    id: "01",
    title: "Python Syntax Fundamentals",
    icon: BookOpen,
    overview: "Understand Python's minimalistic syntax philosophy, print output, commenting styles, indentation rules, and reserved keywords.",
    learnings: [
      { title: "print() function", desc: "Outputting data to standard console using Python's built-in print utility with separators and end parameters." },
      { title: "Comments", desc: "Writing single-line (#) and multi-line (triple-quoted) inline documentation notes ignored by the interpreter." },
      { title: "Indentation", desc: "Understanding Python's whitespace-based block scoping system replacing traditional curly braces." },
      { title: "Keywords", desc: "Reviewing all 35+ reserved words like if, else, for, while, class, def that cannot be used as identifiers." }
    ]
  },
  {
    id: "02",
    title: "Variables & Data Types",
    icon: Variable,
    overview: "Master Python's dynamic typing system, variable assignment rules, and all core primitive data categories.",
    learnings: [
      { title: "int type", desc: "Storing whole number integers of arbitrary precision without overflow limitations." },
      { title: "float type", desc: "Handling double-precision floating-point decimal numbers and IEEE 754 representation quirks." },
      { title: "str type", desc: "Managing immutable sequences of Unicode characters enclosed in single, double, or triple quotes." },
      { title: "bool type", desc: "Working with True and False constants that subclass the integer type internally." },
      { title: "None type", desc: "Representing the absence of a value using Python's singular null-like sentinel object." }
    ]
  },
  {
    id: "03",
    title: "Type Conversion & Casting",
    icon: Shuffle,
    overview: "Explicitly transform values between incompatible data types using Python's constructor functions.",
    learnings: [
      { title: "int() conversion", desc: "Casting floats, strings with numeric content, and booleans into integer representations." },
      { title: "str() conversion", desc: "Converting any Python object into its human-readable string representation format." },
      { title: "float() conversion", desc: "Parsing numeric strings and integer values into decimal floating-point numbers." },
      { title: "bool() conversion", desc: "Evaluating truthiness of values—empty collections and zeros become False, others become True." }
    ]
  },
  {
    id: "04",
    title: "Operators & Expressions",
    icon: Calculator,
    overview: "Utilize arithmetic, logical, comparison, and Python-specific operator categories for data evaluation.",
    learnings: [
      { title: "Arithmetic Operators", desc: "Performing addition, subtraction, multiplication, division, floor division (//), modulus (%), and exponentiation (**)." },
      { title: "Comparison Operators", desc: "Evaluating equality (==), inequality (!=), greater-than, less-than, and chained comparisons." },
      { title: "Logical Operators", desc: "Combining conditions using and, or, and not keywords with short-circuit evaluation behavior." },
      { title: "Assignment Operators", desc: "Updating variables using +=, -=, *=, /=, //=, **=, and %= compound assignment shorthand." },
      { title: "Bitwise Operators", desc: "Manipulating binary digits using AND (&), OR (|), XOR (^), NOT (~), left shift (<<), and right shift (>>)." },
      { title: "Membership Operators", desc: "Testing containment within sequences using 'in' and 'not in' against strings, lists, and sets." },
      { title: "Identity Operators", desc: "Comparing memory addresses using 'is' and 'is not' to check if two references point to the same object." }
    ]
  },
  {
    id: "05",
    title: "Input & Output Operations",
    icon: Monitor,
    overview: "Capture user input at runtime and format output strings using modern Python techniques.",
    learnings: [
      { title: "input() function", desc: "Reading keyboard entries as strings from standard input with optional prompt messages." },
      { title: "f-strings", desc: "Embedding expressions directly inside string literals using curly brace syntax introduced in Python 3.6." },
      { title: "format() method", desc: "Using positional and named placeholders for advanced string template building." },
      { title: "% formatting", desc: "Legacy C-style string interpolation using %s, %d, and %f specifiers for backward compatibility." }
    ]
  },
  {
    id: "06",
    title: "Conditional Statements",
    icon: GitFork,
    overview: "Direct execution logic using if, else, elif branching structures and nested decision trees.",
    learnings: [
      { title: "if statement", desc: "Executing a code block only when a specified boolean condition evaluates to True." },
      { title: "else clause", desc: "Providing a fallback execution path when the preceding if condition fails." },
      { title: "elif ladder", desc: "Chaining multiple mutually exclusive conditional checks sequentially after an initial if." },
      { title: "Nested conditions", desc: "Placing conditional blocks inside other conditional blocks for multi-layered decision logic." }
    ]
  },
  {
    id: "07",
    title: "Loops & Iteration Control",
    icon: Repeat,
    overview: "Automate repetitive execution using for loops, while loops, and flow manipulation keywords.",
    learnings: [
      { title: "for loop", desc: "Iterating over sequences like lists, strings, tuples, and ranges using element-based traversal." },
      { title: "while loop", desc: "Repeating execution as long as a boolean condition remains True with manual counter management." },
      { title: "break keyword", desc: "Terminating the nearest enclosing loop immediately and exiting to the outer scope." },
      { title: "continue keyword", desc: "Skipping the remaining statements of the current iteration and jumping to the next cycle." },
      { title: "pass keyword", desc: "Inserting a null operation placeholder to prevent syntax errors in empty code blocks." }
    ]
  },
  {
    id: "08",
    title: "Pattern Printing Problems",
    icon: Grid3X3,
    overview: "Build logic skills by constructing star, number, and character patterns using nested loops.",
    learnings: [
      { title: "Star patterns", desc: "Printing pyramids, inverted triangles, diamonds, and hollow shapes using nested for loops." },
      { title: "Number patterns", desc: "Generating Floyd's triangle, Pascal's triangle, and sequential number grids." },
      { title: "Character patterns", desc: "Creating alphabetical pyramids and repeating letter sequences using chr() and ord() functions." },
      { title: "Complex patterns", desc: "Combining spaces and symbols to build advanced symmetric and asymmetric multi-line designs." }
    ]
  },
  {
    id: "09",
    title: "Strings Deep Dive",
    icon: Type,
    overview: "Master string indexing, slicing, built-in methods, formatting techniques, and common string algorithms.",
    learnings: [
      { title: "Indexing", desc: "Accessing individual characters using zero-based positive and negative index positions." },
      { title: "Slicing", desc: "Extracting substrings using start:stop:step syntax with positive and negative stride values." },
      { title: "String methods", desc: "Using upper(), lower(), strip(), split(), join(), replace(), find(), count(), and 40+ built-in methods." },
      { title: "String formatting", desc: "Building dynamic strings using f-strings, format(), and template string techniques." },
      { title: "String algorithms", desc: "Solving palindrome checks, anagram detection, reverse operations, and substring search problems." }
    ]
  },
  {
    id: "10",
    title: "Lists Comprehensive Guide",
    icon: List,
    overview: "Create, manipulate, and transform ordered mutable sequences using Python's most versatile data structure.",
    learnings: [
      { title: "Creating lists", desc: "Initializing lists using square brackets, list() constructor, and multiplication repetition." },
      { title: "append & extend", desc: "Adding single elements to the end or merging another iterable's contents into the list." },
      { title: "insert & remove", desc: "Placing elements at specific indices and deleting the first occurrence of a target value." },
      { title: "pop & del", desc: "Extracting elements by index or deleting slices and specific positions entirely." },
      { title: "sort & reverse", desc: "Reordering elements in-place using sort() with key parameters and reversing list direction." },
      { title: "Nested lists", desc: "Creating 2D and multi-dimensional lists for matrix and grid-based data representations." },
      { title: "List comprehension", desc: "Building new lists concisely using inline for loops with optional conditional filters." }
    ]
  },
  {
    id: "11",
    title: "Tuples & Immutability",
    icon: Lock,
    overview: "Work with ordered, immutable sequences ideal for fixed collections and hashable data requirements.",
    learnings: [
      { title: "Creating tuples", desc: "Instantiating tuples using parentheses, comma separation, and the tuple() constructor." },
      { title: "Tuple operations", desc: "Indexing, slicing, concatenation, repetition, and membership testing on tuple elements." },
      { title: "Immutability benefits", desc: "Understanding why tuples are faster, memory-efficient, and usable as dictionary keys." },
      { title: "Tuple unpacking", desc: "Assigning tuple elements to multiple variables in a single assignment statement." },
      { title: "Single element tuples", desc: "Creating one-item tuples correctly using trailing comma syntax to avoid type confusion." }
    ]
  },
  {
    id: "12",
    title: "Sets & Set Operations",
    icon: CircleDot,
    overview: "Leverage unordered collections of unique elements for mathematical set operations and duplicate removal.",
    learnings: [
      { title: "Creating sets", desc: "Initializing sets using curly braces with values and the set() constructor from iterables." },
      { title: "Set methods", desc: "Using add(), remove(), discard(), pop(), and clear() for element management." },
      { title: "Set operations", desc: "Performing union (|), intersection (&), difference (-), and symmetric difference (^)." },
      { title: "Subset & Superset", desc: "Checking containment relationships using issubset(), issuperset(), and isdisjoint()." },
      { title: "Frozen sets", desc: "Creating immutable hashable sets usable as dictionary keys and set elements." }
    ]
  },
  {
    id: "13",
    title: "Dictionaries Mastery",
    icon: BookMarked,
    overview: "Store and retrieve key-value pairs efficiently using Python's powerful hash-map implementation.",
    learnings: [
      { title: "Creating dictionaries", desc: "Building dicts using curly brace syntax, dict() constructor, and fromkeys() class method." },
      { title: "Accessing values", desc: "Retrieving data using square brackets, get() method with defaults, and setdefault()." },
      { title: "Modifying dictionaries", desc: "Adding, updating, and deleting key-value pairs using direct assignment and del/pop." },
      { title: "Dictionary methods", desc: "Using keys(), values(), items(), update(), copy(), and popitem() for data manipulation." },
      { title: "Dictionary comprehension", desc: "Building dictionaries concisely using inline key-value expression loops with conditions." },
      { title: "Nested dictionaries", desc: "Structuring complex hierarchical data using dictionaries containing other dictionaries." }
    ]
  },
  {
    id: "14",
    title: "Advanced Collections Module",
    icon: Layers,
    overview: "Utilize specialized data structures from the collections module for optimized real-world scenarios.",
    learnings: [
      { title: "Counter", desc: "Counting hashable object frequencies automatically and performing arithmetic on count results." },
      { title: "defaultdict", desc: "Creating dictionaries that auto-initialize missing keys with factory default values." },
      { title: "deque", desc: "Implementing double-ended queues with O(1) append and pop operations from both ends." },
      { title: "namedtuple", desc: "Building lightweight immutable tuple subclasses with named field access via dot notation." },
      { title: "OrderedDict", desc: "Maintaining explicit insertion order of keys for backward-compatible ordered dictionary needs." },
      { title: "ChainMap", desc: "Grouping multiple dictionaries into a single unified lookup context without merging." }
    ]
  },
  {
    id: "15",
    title: "Functions Basics",
    icon: Code2,
    overview: "Define reusable code blocks using def, manage parameters, and return computed values.",
    learnings: [
      { title: "def keyword", desc: "Declaring named function blocks with a signature, docstring, and indented body." },
      { title: "Parameters & Arguments", desc: "Defining input variables in signatures and passing actual values during function calls." },
      { title: "return statement", desc: "Sending computed results back to the caller and exiting the function execution." },
      { title: "Multiple return values", desc: "Returning tuples that can be unpacked into multiple variables at the call site." },
      { title: "Docstrings", desc: "Writing triple-quoted documentation strings accessible via __doc__ attribute." }
    ]
  },
  {
    id: "16",
    title: "Advanced Function Design",
    icon: Cpu,
    overview: "Master default arguments, keyword arguments, lambda expressions, recursion, closures, and scope mechanics.",
    learnings: [
      { title: "Default arguments", desc: "Pre-assigning parameter values that activate when no argument is provided during calls." },
      { title: "Keyword arguments", desc: "Passing arguments by parameter name regardless of positional order in the signature." },
      { title: "*args & **kwargs", desc: "Accepting arbitrary numbers of positional and keyword arguments using unpacking operators." },
      { title: "Lambda functions", desc: "Writing anonymous single-expression functions using the lambda keyword for inline use." },
      { title: "Recursion", desc: "Solving problems by having functions call themselves with reduced input until a base case is reached." },
      { title: "Scope (LEGB rule)", desc: "Understanding Local, Enclosing, Global, and Built-in name resolution order." },
      { title: "Closures", desc: "Creating inner functions that remember and access variables from their enclosing scope after it exits." }
    ]
  },
  {
    id: "17",
    title: "Functional Programming Tools",
    icon: Filter,
    overview: "Apply declarative transformation patterns using map, filter, and reduce higher-order functions.",
    learnings: [
      { title: "map() function", desc: "Applying a transformation function to every element in an iterable and collecting results." },
      { title: "filter() function", desc: "Selecting only elements that satisfy a predicate function's True condition from an iterable." },
      { title: "reduce() function", desc: "Collapsing an iterable into a single cumulative value using a rolling two-argument function." },
      { title: "Chaining operations", desc: "Composing map, filter, and reduce together for complex data pipeline transformations." }
    ]
  },
  {
    id: "18",
    title: "Text File Handling",
    icon: FileText,
    overview: "Read, write, and append text data to files on the local file system using Python's file API.",
    learnings: [
      { title: "Opening files", desc: "Using open() with mode strings 'r', 'w', 'a', and 'r+' to establish file handles." },
      { title: "Reading files", desc: "Consuming file content using read(), readline(), and readlines() methods." },
      { title: "Writing files", desc: "Outputting strings to files using write() and writelines() with proper newline handling." },
      { title: "Appending data", desc: "Opening files in append mode to add content without overwriting existing data." },
      { title: "with statement", desc: "Using context managers to guarantee files are properly closed after operations." },
      { title: "File cursor management", desc: "Controlling read/write positions using seek() and checking location with tell()." }
    ]
  },
  {
    id: "19",
    title: "CSV File Operations",
    icon: Table,
    overview: "Parse and generate comma-separated value files using Python's dedicated csv module.",
    learnings: [
      { title: "Reading CSV files", desc: "Loading CSV data using csv.reader() for row-by-row list-based parsing." },
      { title: "DictReader", desc: "Reading CSV rows as ordered dictionaries keyed by column header names." },
      { title: "Writing CSV files", desc: "Outputting row data using csv.writer() with proper delimiter and quoting configurations." },
      { title: "DictWriter", desc: "Writing dictionary records directly into CSV columns using fieldnames mapping." }
    ]
  },
  {
    id: "20",
    title: "JSON File Operations",
    icon: FileJson,
    overview: "Serialize Python objects to JSON strings and deserialize JSON data back into native Python structures.",
    learnings: [
      { title: "json.dumps()", desc: "Converting Python dictionaries and lists into formatted JSON string output." },
      { title: "json.loads()", desc: "Parsing JSON strings back into equivalent Python dict and list objects." },
      { title: "json.dump()", desc: "Writing Python objects directly to file handles as JSON text." },
      { title: "json.load()", desc: "Reading JSON text from file handles and converting to Python objects." },
      { title: "Indentation & sorting", desc: "Formatting JSON output with pretty-print indent levels and sorted key orders." }
    ]
  },
  {
    id: "21",
    title: "Binary File Handling",
    icon: FileArchive,
    overview: "Read and write raw binary data using bytes, bytearray, and the struct module.",
    learnings: [
      { title: "Binary mode flags", desc: "Opening files with 'rb', 'wb', and 'ab' modes for raw byte-level access." },
      { title: "bytes & bytearray", desc: "Working with immutable byte sequences and mutable byte arrays for binary data." },
      { title: "struct module", desc: "Packing and unpacking binary data using format strings for C-style struct layouts." },
      { title: "Pickle serialization", desc: "Converting complete Python object graphs to binary streams for storage and recovery." }
    ]
  },
  {
    id: "22",
    title: "Exception Handling Basics",
    icon: AlertTriangle,
    overview: "Catch, handle, and manage runtime errors gracefully using try/except/else/finally structures.",
    learnings: [
      { title: "try block", desc: "Wrapping potentially failing code inside monitored exception-catching zones." },
      { title: "except clause", desc: "Specifying exception types to catch and defining handler logic for each error category." },
      { title: "Multiple except blocks", desc: "Catching different exception types with separate handler blocks in priority order." },
      { title: "else clause", desc: "Executing code only when the try block succeeds without raising any exceptions." },
      { title: "finally clause", desc: "Running unconditional cleanup code regardless of whether an exception occurred or not." },
      { title: "Exception object", desc: "Capturing the exception instance using 'as' keyword to access error messages and attributes." }
    ]
  },
  {
    id: "23",
    title: "Custom Exceptions",
    icon: ShieldAlert,
    overview: "Design application-specific error classes for precise domain-level failure communication.",
    learnings: [
      { title: "Defining custom exceptions", desc: "Creating new exception classes by inheriting from Exception or its subclasses." },
      { title: "Custom error messages", desc: "Overriding __init__ to accept and store domain-specific error context data." },
      { title: "Exception hierarchies", desc: "Building structured exception class trees for categorized error handling." },
      { title: "Raising exceptions", desc: "Using the raise keyword to trigger custom exceptions with descriptive messages." }
    ]
  },
  {
    id: "24",
    title: "Python Import System",
    icon: Package,
    overview: "Understand how Python locates, loads, and manages module code across projects.",
    learnings: [
      { title: "import statement", desc: "Loading entire modules into the current namespace using the import keyword." },
      { title: "from import syntax", desc: "Importing specific functions, classes, or variables from a module directly." },
      { title: "Aliases (as keyword)", desc: "Renaming imported modules or attributes using the 'as' keyword for brevity." },
      { title: "Module search path", desc: "Understanding how Python resolves imports using sys.path and PYTHONPATH." },
      { title: "__name__ == '__main__'", desc: "Guarding module-level execution code to prevent running during imports." }
    ]
  },
  {
    id: "25",
    title: "Python Standard Library",
    icon: Library,
    overview: "Leverage built-in modules for math, randomness, datetime, OS operations, and system interactions.",
    learnings: [
      { title: "math module", desc: "Using sqrt(), ceil(), floor(), pi, e, factorial(), gcd(), and trigonometric functions." },
      { title: "random module", desc: "Generating pseudo-random numbers with randint(), choice(), shuffle(), and uniform()." },
      { title: "datetime module", desc: "Creating, formatting, and arithmetic on date, time, and datetime objects." },
      { title: "os module", desc: "Interacting with the operating system for path manipulation, directory listing, and environment variables." },
      { title: "sys module", desc: "Accessing interpreter variables, command-line arguments via sys.argv, and exit codes." }
    ]
  },
  {
    id: "26",
    title: "Creating Custom Modules",
    icon: FileCode,
    overview: "Organize Python code into reusable module files that can be imported across projects.",
    learnings: [
      { title: "Module structure", desc: "Writing Python files containing functions, classes, and variables for export." },
      { title: "__all__ variable", desc: "Defining the public API list that from module import * will expose." },
      { title: "Module attributes", desc: "Accessing __file__, __doc__, __name__, and __dict__ for introspection." },
      { title: "Relative vs absolute imports", desc: "Distinguishing between dot-prefixed relative imports and full path absolute imports." }
    ]
  },
  {
    id: "27",
    title: "Python Packages",
    icon: FolderTree,
    overview: "Structure multi-module projects into hierarchical packages using __init__.py and namespace organization.",
    learnings: [
      { title: "__init__.py file", desc: "Marking directories as Python packages and controlling package-level initialization." },
      { title: "Package imports", desc: "Importing modules from packages using dot notation paths like package.module." },
      { title: "Subpackages", desc: "Creating nested package hierarchies for large-scale project organization." },
      { title: "Namespace packages", desc: "Building split packages that can span multiple directories without __init__.py." },
      { title: "__init__.py configurations", desc: "Using __init__.py to re-export symbols, run setup code, and define package-level variables." }
    ]
  },
  {
    id: "28",
    title: "Classes & Objects",
    icon: Blocks,
    overview: "Create object-oriented blueprints using class definitions and instantiate concrete object instances.",
    learnings: [
      { title: "Class definition", desc: "Declaring classes using the class keyword with optional parent class inheritance." },
      { title: "Object instantiation", desc: "Creating instances by calling the class as a function to produce individual objects." },
      { title: "Instance attributes", desc: "Attaching data properties to individual objects via self.parameter assignments." },
      { title: "Instance methods", desc: "Defining functions inside classes that receive the instance reference as first parameter (self)." },
      { title: "Class attributes", desc: "Defining variables at the class level shared across all instances of the class." }
    ]
  },
  {
    id: "29",
    title: "Constructors & Initialization",
    icon: Hammer,
    overview: "Control object creation and initialization using __new__ and __init__ special methods.",
    learnings: [
      { title: "__init__ method", desc: "Defining the initializer that sets up instance attributes immediately after object creation." },
      { title: "__new__ method", desc: "Overriding the actual object allocator that creates the instance before __init__ runs." },
      { title: "Parameterized constructors", desc: "Accepting arguments during instantiation to customize initial object state." },
      { title: "Constructor chaining", desc: "Calling parent class constructors using super().__init__() during child initialization." }
    ]
  },
  {
    id: "30",
    title: "Instance vs Class Variables",
    icon: GitCompare,
    overview: "Differentiate between per-object data and shared class-level data with critical behavioral distinctions.",
    learnings: [
      { title: "Instance variables", desc: "Properties unique to each object, defined inside methods using self.prefix notation." },
      { title: "Class variables", desc: "Properties shared across all instances, defined directly inside the class body." },
      { title: "Attribute resolution order", desc: "Understanding how Python finds attributes—checking instance before falling back to class." },
      { title: "Mutation dangers", desc: "Recognizing pitfalls when mutable class variables like lists are modified through instances." },
      { title: "Static tracking patterns", desc: "Using class variables to count instances or share configuration across objects." }
    ]
  },
  {
    id: "31",
    title: "Inheritance & Code Reuse",
    icon: GitBranch,
    overview: "Establish parent-child class relationships to share and extend behavior through hierarchical derivation.",
    learnings: [
      { title: "Single inheritance", desc: "Deriving a child class from one parent class to inherit all its methods and attributes." },
      { title: "super() function", desc: "Accessing and calling parent class methods from within overridden child methods." },
      { title: "Method overriding", desc: "Redefining inherited methods in child classes to provide specialized behavior." },
      { title: "Multiple inheritance", desc: "Deriving from more than one parent class and understanding MRO resolution." },
      { title: "MRO (Method Resolution Order)", desc: "Understanding C3 linearization algorithm that determines attribute lookup sequence." },
      { title: "isinstance() & issubclass()", desc: "Checking object-type relationships and class hierarchy membership at runtime." }
    ]
  },
  {
    id: "32",
    title: "Polymorphism in Python",
    icon: Shuffle,
    overview: "Enable objects of different classes to be treated through a common interface with behavior variation.",
    learnings: [
      { title: "Duck typing", desc: "Python's approach of focusing on object behavior over explicit type relationships." },
      { title: "Method polymorphism", desc: "Calling the same method name on different objects and getting class-specific behavior." },
      { title: "Operator polymorphism", desc: "Built-in operators like + behaving differently for ints, strings, and lists." },
      { title: "Function polymorphism", desc: "Writing functions that operate on any object supporting the expected interface." },
      { title: "Abstract base classes", desc: "Using ABCs to formally define interfaces that subclasses must implement." }
    ]
  },
  {
    id: "33",
    title: "Encapsulation & Access Control",
    icon: Shield,
    overview: "Restrict direct access to internal object state using naming conventions and property management.",
    learnings: [
      { title: "Public members", desc: "Attributes and methods accessible from anywhere with no naming restrictions." },
      { title: "Protected members (_prefix)", desc: "Convention-based single-underscore prefix indicating internal use, not enforced by Python." },
      { title: "Private members (__prefix)", desc: "Name-mangled double-underscore attributes that prevent direct external access." },
      { title: "Name mangling", desc: "Understanding how Python transforms __attr into _ClassName__attr behind the scenes." },
      { title: "Getter & Setter methods", desc: "Creating controlled access points for reading and writing private attributes." }
    ]
  },
  {
    id: "34",
    title: "Abstraction & Interfaces",
    icon: Eye,
    overview: "Hide implementation complexity behind clean interfaces using abstract classes and abstract methods.",
    learnings: [
      { title: "Abstract classes", desc: "Defining classes that cannot be instantiated and serve as blueprints for subclasses." },
      { title: "Abstract methods", desc: "Declaring method signatures without implementation that subclasses must override." },
      { title: "ABC module", desc: "Using abc.ABC and @abstractmethod decorator to create formal abstract base classes." },
      { title: "Concrete implementations", desc: "Providing actual logic in subclasses that extend and fulfill abstract contracts." },
      { title: "Abstract properties", desc: "Defining @abstractproperty decorators for mandatory attribute implementations." }
    ]
  },
  {
    id: "35",
    title: "Magic / Dunder Methods",
    icon: Sparkles,
    overview: "Override Python's special double-underscore methods to integrate custom classes with built-in operations.",
    learnings: [
      { title: "__init__ & __new__", desc: "Controlling object initialization and actual memory allocation during creation." },
      { title: "__str__ & __repr__", desc: "Defining human-readable and developer-focused string representations of objects." },
      { title: "__len__ & __getitem__", desc: "Enabling len() function support and square-bracket indexing on custom objects." },
      { title: "__add__ & __sub__", desc: "Overloading arithmetic operators (+, -, *, /) for custom class instances." },
      { title: "__eq__ & __lt__", desc: "Implementing equality and comparison operators for custom sorting and matching." },
      { title: "__call__", desc: "Making instances callable like functions by implementing the __call__ method." },
      { title: "__iter__ & __next__", desc: "Turning custom objects into iterable sequences compatible with for loops." },
      { title: "__enter__ & __exit__", desc: "Enabling context manager protocol for use with the 'with' statement." }
    ]
  },
  {
    id: "36",
    title: "Property Decorators",
    icon: ToggleRight,
    overview: "Replace explicit getter/setter methods with Pythonic @property syntax for controlled attribute access.",
    learnings: [
      { title: "@property decorator", desc: "Converting a method into a read-only attribute accessor without parentheses." },
      { title: "@setter decorator", desc: "Defining write operations on a property with validation logic before assignment." },
      { title: "@deleter decorator", desc: "Specifying cleanup actions when a property attribute is deleted using del." },
      { title: "Computed properties", desc: "Creating dynamically calculated attributes that derive values from other internal state." },
      { title: "Read-only properties", desc: "Defining properties with no setter to create immutable computed attributes." }
    ]
  },
  {
    id: "37",
    title: "Iterators & Iterator Protocol",
    icon: Workflow,
    overview: "Implement the iterator protocol to create custom objects that support sequential element traversal.",
    learnings: [
      { title: "Iterator protocol", desc: "Implementing __iter__() returning self and __next__() returning successive elements." },
      { title: "StopIteration exception", desc: "Signaling the end of iteration by raising StopIteration from __next__()." },
      { title: "iter() built-in", desc: "Converting any iterable into an explicit iterator object using the iter() function." },
      { title: "next() built-in", desc: "Manually advancing an iterator and retrieving the next value from the sequence." },
      { title: "Custom iterator classes", desc: "Building classes that generate values on-demand like range, reverse, or countdown iterators." }
    ]
  },
  {
    id: "38",
    title: "Generators & Yield",
    icon: Zap,
    overview: "Create lazy-evaluated sequences using generator functions that pause and resume execution.",
    learnings: [
      { title: "Generator functions", desc: "Using yield instead of return to produce values one at a time without building full lists." },
      { title: "yield keyword", desc: "Pausing function execution, saving state, and resuming on the next next() call." },
      { title: "Generator expressions", desc: "Creating memory-efficient lazy iterators using parentheses syntax like list comprehensions." },
      { title: "yield from", desc: "Delegating to a sub-generator and yielding all its values transparently." },
      { title: "Infinite generators", desc: "Building unbounded sequences like Fibonacci or prime number generators that never exhaust." },
      { title: "send() method", desc: "Sending values back into a running generator to influence its output dynamically." }
    ]
  },
  {
    id: "39",
    title: "Decorators Deep Dive",
    icon: PaintBucket,
    overview: "Wrap and modify functions or classes dynamically using higher-order decorator patterns.",
    learnings: [
      { title: "Basic decorators", desc: "Creating functions that accept a function, add behavior, and return a wrapper function." },
      { title: "@syntax sugar", desc: "Applying decorators using the @decorator_name syntax above function definitions." },
      { title: "Decorators with arguments", desc: "Building decorator factories that accept configuration parameters and return actual decorators." },
      { title: "functools.wraps", desc: "Preserving the original function's metadata like __name__ and __doc__ through wrapping." },
      { title: "Class-based decorators", desc: "Implementing decorators as classes with __call__ methods for stateful decoration." },
      { title: "Stacking decorators", desc: "Applying multiple decorators to a single function and understanding execution order." },
      { title: "Common use cases", desc: "Building logging, timing, authentication, caching, and retry decorators." }
    ]
  },
  {
    id: "40",
    title: "Context Managers",
    icon: Box,
    overview: "Manage resource acquisition and cleanup automatically using the with statement protocol.",
    learnings: [
      { title: "Context manager protocol", desc: "Implementing __enter__() for setup and __exit__() for guaranteed cleanup." },
      { title: "with statement", desc: "Using context managers to ensure resources are properly released after use." },
      { title: "contextlib module", desc: "Simplifying context manager creation using @contextmanager generator decorator." },
      { title: "suppress() utility", desc: "Silently handling specified exceptions within a context block without try/except." },
      { title: "Real-world patterns", desc: "Managing database connections, file handles, locks, and network sessions safely." }
    ]
  },
  {
    id: "41",
    title: "Comprehensions Mastery",
    icon: Braces,
    overview: "Write concise, readable, and performant collection-building expressions for lists, dicts, and sets.",
    learnings: [
      { title: "List comprehensions", desc: "Building lists inline using [expression for item in iterable if condition] syntax." },
      { title: "Dict comprehensions", desc: "Creating dictionaries using {key_expr: val_expr for item in iterable} patterns." },
      { title: "Set comprehensions", desc: "Generating sets with {expression for item in iterable} eliminating duplicates automatically." },
      { title: "Nested comprehensions", desc: "Flattening matrices and building multi-level structures using nested for clauses." },
      { title: "Comprehension vs loops", desc: "Understanding performance benefits and readability trade-offs compared to traditional loops." },
      { title: "Walrus in comprehensions", desc: "Using assignment expressions inside comprehensions to avoid redundant computations." }
    ]
  },
  {
    id: "42",
    title: "Zip & Enumerate Utilities",
    icon: Link2,
    overview: "Combine parallel iterables and track indices elegantly using built-in zip and enumerate functions.",
    learnings: [
      { title: "zip() function", desc: "Pairing elements from multiple iterables into tuples on a position-by-position basis." },
      { title: "zip() with unequal lengths", desc: "Understanding how zip truncates to the shortest iterable and using itertools.zip_longest." },
      { title: "Unzipping", desc: "Separating zipped tuples back into individual sequences using the * unpacking operator." },
      { title: "enumerate() function", desc: "Wrapping any iterable to produce (index, element) pairs for indexed iteration." },
      { title: "Custom start index", desc: "Passing a start parameter to enumerate to begin counting from any integer." },
      { title: "Practical patterns", desc: "Building dictionaries from pairs, parallel iteration, and indexed data processing." }
    ]
  },
  {
    id: "43",
    title: "Walrus Operator (:=)",
    icon: Target,
    overview: "Assign values within expressions using the assignment expression operator introduced in Python 3.8.",
    learnings: [
      { title: "Basic syntax", desc: "Using := to assign a value to a variable while simultaneously evaluating an expression." },
      { title: "While loop patterns", desc: "Simplifying input loops by combining reading and checking in a single condition." },
      { title: "List comprehension reuse", desc: "Computing expensive values once inside a comprehension and referencing the variable." },
      { title: "if-else chains", desc: "Reducing redundant function calls by capturing results with walrus in conditional blocks." },
      { title: "Readability considerations", desc: "Understanding when walrus improves clarity versus when it obscures intent." }
    ]
  },
  {
    id: "44",
    title: "Type Hinting & Annotations",
    icon: Tag,
    overview: "Add static type metadata to function signatures and variables for improved tooling and documentation.",
    learnings: [
      { title: "Basic type hints", desc: "Annotating variables and parameters with types like int, str, float, and bool." },
      { title: "Function signatures", desc: "Adding parameter types and return type annotations using -> arrow syntax." },
      { title: "Complex types", desc: "Using List[], Dict[], Tuple[], Set[], and Optional[] from the typing module." },
      { title: "Union & Literal types", desc: "Specifying multiple allowed types with Union[] and exact values with Literal[]." },
      { title: "Type aliases", desc: "Creating readable names for complex type expressions using variable assignments." },
      { title: "mypy tool", desc: "Running static type checking with mypy to catch type errors before runtime." }
    ]
  },
  {
    id: "45",
    title: "Dataclasses",
    icon: Database,
    overview: "Reduce boilerplate in class definitions using the @dataclass decorator for data-heavy objects.",
    learnings: [
      { title: "@dataclass decorator", desc: "Automatically generating __init__, __repr__, and __eq__ from field definitions." },
      { title: "Field types & defaults", desc: "Defining typed fields with default values and understanding required vs optional fields." },
      { title: "field() function", desc: "Customizing individual field behavior with default_factory, repr, and compare parameters." },
      { title: "Frozen dataclasses", desc: "Making dataclass instances immutable by passing frozen=True to the decorator." },
      { title: "Post-init processing", desc: "Implementing __post_init__() for validation and computed fields after auto-initialization." },
      { title: "Dataclass inheritance", desc: "Extending dataclasses and understanding field ordering and override rules." }
    ]
  },
  {
    id: "46",
    title: "Memory Management & GC",
    icon: HardDrive,
    overview: "Understand Python's memory allocation, reference counting, and garbage collection mechanisms.",
    learnings: [
      { title: "Reference counting", desc: "How Python tracks object references and immediately reclaims memory when count reaches zero." },
      { title: "Garbage collector", desc: "Understanding the cyclic GC that detects and breaks reference cycles." },
      { title: "gc module", desc: "Controlling garbage collection manually using gc.enable(), gc.disable(), and gc.collect()." },
      { title: "Memory profiling", desc: "Using sys.getsizeof(), tracemalloc, and memory_profiler to inspect memory usage." },
      { title: "__del__ method", desc: "Implementing destructors that run when an object is about to be garbage collected." },
      { title: "Object interning", desc: "Understanding how Python caches small integers and short strings for memory efficiency." }
    ]
  },
  {
    id: "47",
    title: "Time & Space Complexity",
    icon: Clock,
    overview: "Analyze algorithm efficiency using Big-O notation to compare scaling behavior of solutions.",
    learnings: [
      { title: "Big-O notation", desc: "Expressing the upper bound of algorithm growth as input size approaches infinity." },
      { title: "Time complexity classes", desc: "Categorizing algorithms into O(1), O(log n), O(n), O(n log n), O(n²), and O(2ⁿ)." },
      { title: "Space complexity", desc: "Measuring additional memory consumption relative to input size during execution." },
      { title: "Best/Average/Worst case", desc: "Analyzing algorithm performance across different input distributions and edge cases." },
      { title: "Amortized analysis", desc: "Understanding operations like list.append() that are O(1) on average despite occasional O(n) resizes." },
      { title: "Practical measurement", desc: "Using timeit module and time.perf_counter() for empirical performance benchmarking." }
    ]
  },
  {
    id: "48",
    title: "Arrays & Dynamic Arrays",
    icon: LayoutGrid,
    overview: "Implement and work with contiguous memory structures including static arrays and dynamic arrays.",
    learnings: [
      { title: "Static arrays", desc: "Understanding fixed-size contiguous memory blocks with constant-time index access." },
      { title: "Python list internals", desc: "How CPython's list uses a dynamic array with over-allocation strategy." },
      { title: "Array module", desc: "Using Python's array module for typed homogeneous sequences with compact storage." },
      { title: "NumPy arrays", desc: "Leveraging NumPy's ndarray for high-performance multi-dimensional numerical computing." },
      { title: "Common operations", desc: "Implementing insertion, deletion, search, and rotation on array structures." },
      { title: "Two-pointer technique", desc: "Solving array problems efficiently using left and right pointer patterns." }
    ]
  },
  {
    id: "49",
    title: "Linked Lists",
    icon: Link,
    overview: "Build and manipulate node-based sequential data structures with dynamic memory allocation.",
    learnings: [
      { title: "Singly linked list", desc: "Creating nodes with data and next pointer, building traversal, insertion, and deletion operations." },
      { title: "Doubly linked list", desc: "Adding prev pointers for bidirectional traversal and O(1) tail operations." },
      { title: "Circular linked list", desc: "Connecting the last node back to the head for round-robin and circular buffer patterns." },
      { title: "Fast & slow pointers", desc: "Detecting cycles and finding middle elements using the tortoise-hare algorithm." },
      { title: "Dummy head technique", desc: "Simplifying edge cases in insertion and deletion by using a sentinel node." },
      { title: "Common problems", desc: "Solving reverse, merge, partition, and palindrome linked list challenges." }
    ]
  },
  {
    id: "50",
    title: "Stacks & Queues",
    icon: ArrowDownUp,
    overview: "Implement LIFO and FIFO abstract data types using arrays, linked lists, and collections.",
    learnings: [
      { title: "Stack (LIFO)", desc: "Implementing last-in-first-out structure with push and pop operations." },
      { title: "Stack using list", desc: "Using Python list's append() and pop() as a built-in stack implementation." },
      { title: "Stack using linked list", desc: "Building stacks with O(1) push/pop using head-insertion linked list pattern." },
      { title: "Queue (FIFO)", desc: "Implementing first-in-first-out structure with enqueue and dequeue operations." },
      { title: "collections.deque as queue", desc: "Using deque's append() and popleft() for O(1) queue operations." },
      { title: "Priority queue", desc: "Implementing queue with priority-based ordering using heapq module." },
      { title: "Monotonic stack", desc: "Solving next greater element and temperature problems using monotonic stack pattern." },
      { title: "Applications", desc: "Expression evaluation, bracket matching, BFS traversal, and task scheduling." }
    ]
  },
  {
    id: "51",
    title: "Trees & Tree Algorithms",
    icon: GitFork,
    overview: "Master hierarchical data structures including binary trees, BSTs, and advanced tree types.",
    learnings: [
      { title: "Tree terminology", desc: "Understanding root, leaf, depth, height, level, subtree, and degree concepts." },
      { title: "Binary tree implementation", desc: "Building tree nodes with left/right children and constructing tree structures." },
      { title: "Tree traversals", desc: "Implementing inorder, preorder, postorder, and level-order (BFS) traversal algorithms." },
      { title: "Binary Search Tree", desc: "Building BSTs with ordered insertion and O(log n) average search performance." },
      { title: "BST operations", desc: "Implementing search, insert, delete, and finding min/max in BST structures." },
      { title: "Balanced trees", desc: "Understanding AVL trees and Red-Black trees with self-balancing rotation mechanisms." },
      { title: "Trie (Prefix Tree)", desc: "Implementing trie nodes for efficient string prefix search and autocomplete." },
      { title: "Common problems", desc: "Solving max depth, path sum, lowest common ancestor, and tree serialization." }
    ]
  },
  {
    id: "52",
    title: "Graphs & Graph Algorithms",
    icon: Network,
    overview: "Model and traverse interconnected data using adjacency structures and graph algorithms.",
    learnings: [
      { title: "Graph representations", desc: "Implementing graphs using adjacency matrix, adjacency list, and edge list formats." },
      { title: "Directed vs Undirected", desc: "Distinguishing between graphs with one-way edges and bidirectional connections." },
      { title: "Weighted graphs", desc: "Storing cost/distance values on edges for shortest path and minimum spanning tree problems." },
      { title: "BFS traversal", desc: "Exploring graphs level-by-level using queues for shortest unweighted path discovery." },
      { title: "DFS traversal", desc: "Exploring graphs depth-first using recursion or explicit stacks for path finding." },
      { title: "Dijkstra's algorithm", desc: "Finding shortest paths from a source to all nodes in weighted graphs with non-negative edges." },
      { title: "Topological sort", desc: "Ordering directed acyclic graph nodes respecting dependency constraints." },
      { title: "Cycle detection", desc: "Identifying cycles using DFS with visited/recursion stacks or Union-Find." }
    ]
  },
  {
    id: "53",
    title: "Hashing & Hash Tables",
    icon: Hash,
    overview: "Understand hash function design, collision resolution, and Python's dictionary internals.",
    learnings: [
      { title: "Hash functions", desc: "Mapping arbitrary data to fixed-size integer indices for constant-time lookup." },
      { title: "Collision resolution", desc: "Handling index conflicts using chaining (linked lists) and open addressing (probing)." },
      { title: "Python dict internals", desc: "Understanding CPython's hash table implementation with sparse and compact arrays." },
      { title: "Load factor & resizing", desc: "How dictionaries grow their backing array when the load factor threshold is reached." },
      { title: "Hashable requirements", desc: "Understanding why objects need __hash__ and __eq__ to be used as dictionary keys." },
      { title: "Applications", desc: "Two-sum problem, frequency counting, caching, and deduplication patterns." }
    ]
  },
  {
    id: "54",
    title: "Searching Algorithms",
    icon: Search,
    overview: "Implement and analyze algorithms for finding target elements within data collections.",
    learnings: [
      { title: "Linear search", desc: "Scanning through elements sequentially with O(n) time complexity for unsorted data." },
      { title: "Binary search", desc: "Dividing sorted arrays in half repeatedly for O(log n) target location." },
      { title: "Binary search variants", desc: "Implementing lower bound, upper bound, and first/last occurrence finding." },
      { title: "Recursive binary search", desc: "Writing binary search using recursive divide-and-conquer approach." },
      { title: "Search in rotated array", desc: "Finding targets in circularly shifted sorted arrays using modified binary search." },
      { title: "Jump search", desc: "Jumping ahead by fixed steps then linear searching backwards in sorted arrays." },
      { title: "Interpolation search", desc: "Estimating target position based on value distribution for uniformly sorted data." }
    ]
  },
  {
    id: "55",
    title: "Sorting Algorithms",
    icon: ArrowUpDown,
    overview: "Implement, analyze, and compare fundamental sorting algorithms by time and space complexity.",
    learnings: [
      { title: "Bubble sort", desc: "Repeatedly swapping adjacent out-of-order elements with O(n²) worst-case performance." },
      { title: "Selection sort", desc: "Finding minimum elements and placing them in position with O(n²) comparisons." },
      { title: "Insertion sort", desc: "Building sorted array one element at a time, efficient for nearly-sorted data." },
      { title: "Merge sort", desc: "Divide-and-conquer O(n log n) algorithm with stable sorting and O(n) space." },
      { title: "Quick sort", desc: "Partitioning around a pivot element with O(n log n) average and O(n²) worst case." },
      { title: "Heap sort", desc: "Building a max-heap and extracting elements for O(n log n) in-place sorting." },
      { title: "Counting sort", desc: "Non-comparison integer sorting achieving O(n+k) time for bounded value ranges." },
      { title: "Radix sort", desc: "Sorting integers digit-by-digit from least to most significant position." },
      { title: "Python's sorted() & .sort()", desc: "Understanding Timsort—Python's hybrid merge+insertion sort with O(n log n) guarantee." }
    ]
  },
  {
    id: "56",
    title: "Recursion & Backtracking",
    icon: RotateCcw,
    overview: "Solve complex problems by decomposing them into self-similar subproblems with systematic exploration.",
    learnings: [
      { title: "Recursion fundamentals", desc: "Understanding base cases, recursive cases, and the call stack mechanism." },
      { title: "Recursion tree analysis", desc: "Drawing recursion trees to calculate time complexity and identify redundant work." },
      { title: "Tail recursion", desc: "Optimizing recursive calls at the end of functions—note Python's lack of TCO." },
      { title: "Backtracking pattern", desc: "Exploring all possibilities by making choices, recursing, and undoing choices." },
      { title: "N-Queens problem", desc: "Placing N queens on an NxN board without mutual attacks using backtracking." },
      { title: "Subset & permutation generation", desc: "Generating all subsets, permutations, and combinations using backtracking." },
      { title: "Sudoku solver", desc: "Filling a 9x9 grid satisfying row, column, and 3x3 box constraints." },
      { title: "Maze solving", desc: "Finding paths through grids with obstacles using recursive backtracking." }
    ]
  },
  {
    id: "57",
    title: "Dynamic Programming",
    icon: Puzzle,
    overview: "Optimize recursive solutions by caching overlapping subproblems using memoization and tabulation.",
    learnings: [
      { title: "Overlapping subproblems", desc: "Identifying when a recursive solution re-computes the same subproblems repeatedly." },
      { title: "Optimal substructure", desc: "Recognizing when an optimal solution contains optimal solutions to subproblems." },
      { title: "Memoization (Top-Down)", desc: "Caching computed results in a dictionary/array to avoid redundant recursive calls." },
      { title: "Tabulation (Bottom-Up)", desc: "Building solutions iteratively from smallest subproblems up to the target." },
      { title: "Fibonacci DP", desc: "Solving the classic Fibonacci sequence in O(n) time and O(1) space." },
      { title: "0/1 Knapsack", desc: "Maximizing value within weight capacity using 2D and 1D DP table approaches." },
      { title: "Longest Common Subsequence", desc: "Finding the longest shared subsequence between two strings using DP matrix." },
      { title: "Coin Change", desc: "Finding minimum coins to make a target amount using bottom-up DP table filling." },
      { title: "DP on strings", desc: "Solving edit distance, palindrome subsequence, and string matching with DP." },
      { title: "State space optimization", desc: "Reducing 2D DP tables to 1D arrays by recognizing dependency patterns." }
    ]
  }
];

export default function LearningPathSection() {
  // State to manage which topic is currently selected
  const [activeTopicId, setActiveTopicId] = useState(nextJsTopics[0].id);

  // Find the full details of the active topic
  const activeTopic = nextJsTopics.find(topic => topic.id === activeTopicId);

  return (
    <section id='roadmap' aria-labelledby="roadmap-heading" className="w-full bg-black py-20 px-4 sm:px-6 lg:px-8 flex justify-center">
      {/* Main Container */}
      <div className="w-full max-w-6xl bg-zinc-900/60 border border-white/[0.04] rounded-3xl p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row gap-12 lg:gap-16 backdrop-blur-md">
        
        {/* Left Column: Learning Path Info & Scrollable List */}
        <div className="flex-1 flex flex-col h-full lg:max-h-[600px]">
          <div>
            <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase block mb-3">
              Learning Path
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight"> 
              <span className="text-white">
               Master&nbsp;
              </span>
              <span className="bg-gradient-to-r from-neutral-200 to-neutral-600 bg-clip-text text-transparent">
               Python
              </span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg mb-8 max-w-md leading-relaxed">
              Build high-performance full-stack web apps using pure Python.
            </p>
          </div>

          {/* Scrollable Steps List */}
          <nav aria-label="Learning path steps" className="flex-1 overflow-hidden relative mb-8">
            {/* Added custom scrollbar styling via tailwind arbitrary values */}
            <ul className="space-y-2.5 h-full overflow-y-auto pr-2 pb-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {nextJsTopics.map((step) => {
                const Icon = step.icon;
                const isActive = step.id === activeTopicId;
                
                return (
                  <li 
                    key={step.id}
                    onClick={() => setActiveTopicId(step.id)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? "bg-white/10 border border-white/20 text-white" 
                        : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200 border border-transparent"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-zinc-500/20' : 'bg-white/[0.03]'}`}>
                      <Icon size={18} className={isActive ? "text-white" : "text-zinc-500"} />
                    </div>
                    <span>{step.id}. {step.title}</span>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Right Column: Dynamic Overview Section */}
        <div className="flex-1 w-full flex flex-col justify-start lg:max-h-[600px]">
          
          {/* Active Topic Header Info */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gradient-to-r from-neutral-200 to-neutral-600 bg-clip-text text-transparent font-black text-2xl">
                {activeTopic.id}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {activeTopic.title}
              </h3>
            </div>
            <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
              {activeTopic.overview}
            </p>
          </div>

          <div className="text-xs font-bold tracking-widest text-zinc-500 uppercase block mb-4">
            What you will learn
          </div>
          
          {/* Detailed Subtopics (Reusing your card design) */}
          <div className="space-y-3 overflow-y-auto pr-2 pb-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            {activeTopic.learnings.map((learning, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-4 border border-white/[0.03] bg-[#18181b]/60 hover:bg-[#18181b]/90 hover:border-white/[0.08] shadow-sm rounded-2xl p-5 transition-all duration-300"
              >
                <div className="mt-0.5">
                  <CheckCircle2 size={20} className="text-gray-500" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-base text-white mb-1">
                    {learning.title}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {learning.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
        
      </div>
    </section>
  );
}