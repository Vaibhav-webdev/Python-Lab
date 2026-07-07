// ─── 10 Next.js / React Fix-the-Bug Questions ────────────────────────────────
// Difficulties: 3 EASY · 4 MEDIUM · 3 HARD
// Each question's buggyCode is shown in the editor on start.
// check() functions test the user's edited code as a string.

export const ALL_QUESTIONS = [
  {
    "id": 1,
    "title": "The None Sort",
    "difficulty": "EASY",
    "timeLimit": 180,
    "tags": ["Lists", "Methods"],
    "bugReport": "getSortedNumbers always returns None instead of the sorted array. The function runs without errors but the result variable becomes unusable.",
    "description": "The .sort() method sorts a list in-place and returns None. Assigning the result of my_list.sort() to a variable overwrites the list with None. Use the sorted() built-in function instead, which returns a new sorted list.",
    "buggyCode": "def getSortedNumbers(arr):\n    result = arr.sort()\n    return result\n\nnumbers = [5, 2, 8, 1, 9]\nprint(getSortedNumbers(numbers)) # Expected: [1, 2, 5, 8, 9], Actual: None",
    "fixedCode": "def getSortedNumbers(arr):\n    result = sorted(arr)\n    return result\n\nnumbers = [5, 2, 8, 1, 9]\nprint(getSortedNumbers(numbers)) # [1, 2, 5, 8, 9]",
    tests: [
      { label: "Uses sorted() instead of .sort()", "check": code => /sorted\\s*\\()/.test(code) && !/\\.sort\\s*\\(\\s*\\)/.test(code) },
      { label: "Passes the array to the sorting function", "check": code => /sorted\\s*\\(\\s*arr\\s*\\)/.test(code) },
      { label: "The result is returned from the function", "check": code => /return\\s+result/.test(code) }
    ]
  },
  {
    "id": 2,
    "title": "The Mutable Default",
    "difficulty": "EASY",
    "timeLimit": 180,
    "tags": ["Functions", "Mutable Defaults"],
    "bugReport": "Calling addToCart for different users keeps accumulating items from previous calls. The second user gets the first user's items too.",
    "description": "In Python, default arguments are evaluated only once when the function is defined, not each time it's called. Using a mutable default like [] means all calls share the exact same list. Fix it by setting the default to None and initializing an empty list inside the function.",
    "buggyCode": "def addToCart(item, cart=[]):\n    cart.append(item)\n    return cart\n\nprint(addToCart(\"Apple\"))   # Expected: ['Apple']\nprint(addToCart(\"Banana\"))  # Expected: ['Banana'], Actual: ['Apple', 'Banana']",
    "fixedCode": "def addToCart(item, cart=None):\n    if cart is None:\n        cart = []\n    cart.append(item)\n    return cart\n\nprint(addToCart(\"Apple\"))   # ['Apple']\nprint(addToCart(\"Banana\"))  # ['Banana']",
    tests: [
      {
        label: "Default argument is set to None",
        check: code => /cart\s*=\s*None/.test(code)
      },
      {
        label: "Initializes empty list inside the function body",
        // [^]* इस्तेमाल करने से यह मल्टीपल लाइन्स को भी मैच कर लेगा
        check: code => /if\s+cart\s+is\s+None[^]*cart\s*=\s*\[\s*\]/.test(code)
      }, {
        label: "Does not use a mutable literal as the default parameter",
        check: code => !/def\s+addToCart.*cart\s*=\s*\[/.test(code)
      },
    ]
  },
  {
    "id": 3,
    "title": "The Identity Crisis",
    "difficulty": "EASY",
    "timeLimit": 180,
    "tags": ["Identity", "Equality"],
    "bugReport": "isSameNumber returns False for two variables holding the exact same large number. The check fails even though the values are identical.",
    "description": "The 'is' operator checks for object identity (same memory location), not value equality. While Python caches small integers (-5 to 256), larger integers are created as separate objects. Use '==' to compare values instead of 'is'.",
    "buggyCode": "def isSameNumber(a, b):\n    return a is b\n\nx = 1000\ny = 1000\nprint(isSameNumber(x, y)) # Expected: True, Actual: False",
    "fixedCode": "def isSameNumber(a, b):\n    return a == b\n\nx = 1000\ny = 1000\nprint(isSameNumber(x, y)) # True",
    tests: [
      {
        label: "Uses equality operator (==) instead of identity (is)",
        check: code => /return\s+a\s*==\s*b/.test(code)
      },
      {
        label: "Does not use 'is' to compare the numbers",
        check: code => !/return\s+a\s+is\s+b/.test(code)
      },
      {
        label: "Function takes two arguments",
        check: code => /def\s+isSameNumber\s*\(\s*a\s*,\s*b\s*\)/.test(code)
      }
    ]
  },
  {
    "id": 4,
    "title": "The Late Binding Lambda",
    "difficulty": "MEDIUM",
    "timeLimit": 300,
    "tags": ["Closures", "Lambda"],
    "bugReport": "All functions in the created list print 2 instead of 0, 1, and 2 respectively. Each lambda captures the exact same variable reference, which ends at its final value.",
    "description": "Lambda functions in Python capture variables by reference, not by value. When the loop finishes, the variable `i` is 2, and all lambdas see that final value. Fix it by binding the current value of `i` as a default argument.",
    "buggyCode": "def createCounters():\n    return [lambda: i for i in range(3)]\n\ncounters = createCounters()\nprint(counters[0]()) # Expected: 0, Actual: 2\nprint(counters[1]()) # Expected: 1, Actual: 2\nprint(counters[2]()) # Expected: 2, Actual: 2",
    "fixedCode": "def createCounters():\n    return [lambda i=i: i for i in range(3)]\n\ncounters = createCounters()\nprint(counters[0]()) # 0\nprint(counters[1]()) # 1\nprint(counters[2]()) # 2",
    tests: [
      { label: "Uses default argument trick to bind loop variable (i=i)", "check": code => /lambda\\s+i\\s*=\\s*i\\s*:/.test(code) },
      { label: "Still uses a list comprehension to generate lambdas", "check": code => /\\[\\s*lambda.*for\\s+i\\s+in\\s+range\\s*\\(\\s*3\\s*\\)\\s*\\]/.test(code) },
      { label: "Lambdas return the captured variable", "check": code => /lambda.*:\\s*i/.test(code) }
    ]
  },
  {
    "id": 5,
    "title": "The Shadowed Class Variable",
    "difficulty": "MEDIUM",
    "timeLimit": 300,
    "tags": ["OOP", "Scoping"],
    "bugReport": "After creating multiple instances and incrementing their counts, the class-level reported total remains 0. The instances aren't updating the class state.",
    "description": "Doing `self.count += 1` inside a method creates a NEW instance attribute that shadows the class attribute. It never actually modifies `MyClass.count`. To update the class variable, you must reference it via the class name: `MyClass.count += 1`.",
    "buggyCode": "class Counter:\n    count = 0\n\n    def increment(self):\n        self.count += 1\n\nc1 = Counter()\nc2 = Counter()\nc1.increment()\nc1.increment()\nc2.increment()\n\nprint(Counter.count) # Expected: 3, Actual: 0\nprint(c1.count)      # 2 (instance var)",
    "fixedCode": "class Counter:\n    count = 0\n\n    def increment(self):\n        Counter.count += 1\n\nc1 = Counter()\nc2 = Counter()\nc1.increment()\nc1.increment()\nc2.increment()\n\nprint(Counter.count) # 3\nprint(c1.count)      # 3 (reads class var since no instance var exists)",
    tests: [
      {
        label: "Uses class name to modify the variable (Counter.count)",
        // \\. की जगह \. का इस्तेमाल करें
        check: code => /Counter\.count\s*\+=\s*1/.test(code)
      },
      {
        label: "Does not use self.count for the increment assignment",
        // \\. की जगह \. का इस्तेमाल करें
        check: code => !/self\.count\s*\+=/.test(code)
      },
      {
        label: "Class variable is initialized to 0",
        check: code => /count\s*=\s*0/.test(code)
      }
    ]
  },
  {
    "id": 6,
    "title": "The Shallow Copy Trap",
    "difficulty": "MEDIUM",
    "timeLimit": 300,
    "tags": ["Lists", "References", "Copy"],
    "bugReport": "After updating the copied nested list, the original list's nested data also changes. The deep modification leaks across copies.",
    "description": "Using .copy() or list() only creates a shallow copy. The outer list is new, but the inner lists are still shared references. Use the copy module's deepcopy() function to recursively duplicate all nested objects.",
    "buggyCode": "def updateNested(data):\n    copy = data.copy()\n    copy[0]['status'] = 'done'\n    return copy\n\noriginal = [{'task': 'A', 'status': 'pending'}, {'task': 'B', 'status': 'pending'}]\nupdated = updateNested(original)\n\nprint(original[0]['status']) # Expected: 'pending', Actual: 'done'\nprint(updated[0]['status'])  # 'done'",
    "fixedCode": "import copy\n\ndef updateNested(data):\n    dup = copy.deepcopy(data)\n    dup[0]['status'] = 'done'\n    return dup\n\noriginal = [{'task': 'A', 'status': 'pending'}, {'task': 'B', 'status': 'pending'}]\nupdated = updateNested(original)\n\nprint(original[0]['status']) # 'pending'\nprint(updated[0]['status'])  # 'done'",
    tests: [
      {
        label: "Imports the copy module",
        check: code => /import\s+copy/.test(code)
      },
      {
        label: "Uses copy.deepcopy() instead of .copy()",
        // यहाँ आखिरी ब्रैकेट को भी सही किया गया है और सिर्फ सिंगल बैकस्लैश का यूज़ किया है
        check: code => /copy\.deepcopy\s*\(/.test(code) && !/\.copy\s*\(\s*\)/.test(code)
      },
      {
        label: "Modifies the deepcopied variable, not the original",
        check: code => /dup\[0\]\['status'\]/.test(code) && !/original\[0\]\['status'\]\s*=/.test(code)
      }
    ]
  },
  {
    "id": 7,
    "title": "The Missing Await",
    "difficulty": "MEDIUM",
    "timeLimit": 300,
    "tags": ["Async", "Asyncio", "Coroutines"],
    "bugReport": "fetchUserNames returns a list of coroutine objects instead of resolved data. The console shows [<coroutine object>, ...] instead of actual dictionaries.",
    "description": "Calling an async function without 'await' simply returns a coroutine object, it does not execute it. Each fetch_user(id) must be awaited inside the async loop to pause execution and collect the actual resolved data.",
    "buggyCode": "import asyncio\n\nasync def fetch_user(id):\n    await asyncio.sleep(0.1)\n    return {\"id\": id, \"name\": f\"User_{id}\"}\n\nasync def fetch_user_names(ids):\n    users = []\n    for id in ids:\n        user = fetch_user(id) # Missing await\n        users.append(user)\n    return users\n\nresult = asyncio.run(fetch_user_names([1, 2, 3]))\nprint(result) # Expected: [{'id': 1, 'name': 'User_1'}, ...], Actual: [<coroutine...>, ...]",
    "fixedCode": "import asyncio\n\nasync def fetch_user(id):\n    await asyncio.sleep(0.1)\n    return {\"id\": id, \"name\": f\"User_{id}\"}\n\nasync def fetch_user_names(ids):\n    users = []\n    for id in ids:\n        user = await fetch_user(id)\n        users.append(user)\n    return users\n\nresult = asyncio.run(fetch_user_names([1, 2, 3]))\nprint(result) # [{'id': 1, 'name': 'User_1'}, {'id': 2, 'name': 'User_2'}, {'id': 3, 'name': 'User_3'}]",
    tests: [
      { label: "fetch_user call is prefixed with await", "check": code => /await\\s+fetch_user/.test(code) },
      { label: "fetch_user_names remains an async function", "check": code => /async\\s+def\\s+fetch_user_names/.test(code) },
      { label: "Results are still appended to the users list", "check": code => /users\\.append\\s*\\(\\s*user\\s*\\)/.test(code) }
    ]
  },
  {
    "id": 8,
    "title": "The Async Race",
    "difficulty": "HARD",
    "timeLimit": 480,
    "tags": ["Async", "Race Condition", "State"],
    "bugReport": "Calling search('apple') then quickly search('banana') sometimes shows apple's results under banana's label. The slower response overwrites the faster one.",
    "description": "Both async tasks run concurrently. If 'apple' takes longer than 'banana', its assignment executes last and overwrites the correct result. Use a version counter — increment it on each call, and only update global state if the current version matches the task's version.",
    "buggyCode": "import asyncio\nimport random\n\nDB = {'apple': ['iPhone', 'MacBook'], 'banana': ['Bread', 'Smoothie']}\ncurrent_query = ''\ncurrent_results = []\n\nasync def simulate_fetch(q):\n    await asyncio.sleep(random.uniform(0.05, 0.2))\n    return DB.get(q, [])\n\nasync def search(query):\n    global current_query, current_results\n    current_query = query\n    current_results = []\n    results = await simulate_fetch(query)\n    current_results = results # Slower task overwrites!\n\nasync def main():\n    await asyncio.gather(search('apple'), search('banana'))\n    print(f'Query: {current_query}, Results: {current_results}') # Sometimes shows apple results for banana query!\n\nasyncio.run(main())",
    "fixedCode": "import asyncio\nimport random\n\nDB = {'apple': ['iPhone', 'MacBook'], 'banana': ['Bread', 'Smoothie']}\ncurrent_query = ''\ncurrent_results = []\nversion = 0\n\nasync def simulate_fetch(q):\n    await asyncio.sleep(random.uniform(0.05, 0.2))\n    return DB.get(q, [])\n\nasync def search(query):\n    global current_query, current_results, version\n    my_version = version + 1\n    version = my_version\n    current_query = query\n    current_results = []\n    results = await simulate_fetch(query)\n    if my_version == version: # Only update if we are the latest request\n        current_results = results\n\nasync def main():\n    await asyncio.gather(search('apple'), search('banana'))\n    print(f'Query: {current_query}, Results: {current_results}')\n\nasyncio.run(main())",
    tests: [
      { label: "A version counter variable is declared globally", "check": code => /version\\s*=\\s*0/.test(code) },
      { label: "Version is incremented and captured locally before await", "check": code => /my_version\\s*=\\s*version\\s*\\+\\s*1/.test(code) },
      { label: "Results are only updated if version matches (my_version == version)", "check": code => /if\\s+my_version\\s*==\\s*version/.test(code) }
    ]
  },
  {
    "id": 9,
    "title": "The Exhausted Generator",
    "difficulty": "HARD",
    "timeLimit": 480,
    "tags": ["Generators", "Iteration", "Memory"],
    "bugReport": "The second function receiving the generator gets an empty list even though the generator should yield 5 items. It works fine for the first consumer but fails for the second.",
    "description": "Generators are single-use iterators. Once iterated through (or partially consumed) by the first function, they are exhausted. Passing the same generator object to a second function yields nothing. Fix it by converting the generator to a list first, or creating a fresh generator for each consumer using itertools.tee.",
    "fixedCode": "def get_items():\n    for i in range(1, 6):\n        yield i\n\ndef process_first(items):\n    return [x * 2 for x in items]\n\ndef process_second(items):\n    return [x + 10 for x in items]\n\ngen = get_items()\nitems_list = list(gen) # Materialize once\n\nprint(process_first(items_list)) # [2, 4, 6, 8, 10]\nprint(process_second(items_list)) # [11, 12, 13, 14, 15]",
    "buggyCode": "def get_items():\n    for i in range(1, 6):\n        yield i\n\ndef process_first(items):\n    return [x * 2 for x in items]\n\ndef process_second(items):\n    return [x + 10 for x in items]\n\ngen = get_items()\nprint(process_first(gen)) # [2, 4, 6, 8, 10]\nprint(process_second(gen)) # Expected: [11, 12, 13, 14, 15], Actual: []",
    tests: [
      {
        label: "Converts generator to list before passing to functions",
        check: code => /list\s*\(\s*gen\s*\)/.test(code)
      },
      {
        label: "Passes the materialized list to both process functions",
        check: code => /process_first\s*\(\s*items_list\s*\)/.test(code) && /process_second\s*\(\s*items_list\s*\)/.test(code)
      },
      {
        label: "Does not use the raw generator object to multiple consumers",
        check: code => !/process_first\s*\(\s*gen\s*\)/.test(code)
      }
    ]
  },
  {
    "id": 10,
    "title": "The Shared Cache Leak",
    "difficulty": "HARD",
    "timeLimit": 600,
    "tags": ["Dicts", "References", "Immutability"],
    "bugReport": "After fetching user 'alice' and adding a temporary internal flag, fetching user 'bob' throws a KeyError or shows corrupted data because the cache dictionary itself is being mutated.",
    "description": "The get_user function retrieves a dict from the cache and mutates it by adding an '_internal' key. Since dicts are mutable and returned by reference, this permanently modifies the global cache object for future calls. Return a shallow copy of the cached dict to prevent external mutation of the cache.",
    "buggyCode": "CACHE = {\n    'alice': {'name': 'Alice', 'role': 'admin'},\n    'bob': {'name': 'Bob', 'role': 'user'}\n}\n\ndef get_user(username):\n    user = CACHE[username]\n    user['_internal'] = True # Leaks into cache!\n    return user\n\nalice = get_user('alice')\nprint(CACHE['alice']) # Expected: {'name': 'Alice', 'role': 'admin'}, Actual: {'name': 'Alice', 'role': 'admin', '_internal': True}\n\n# If another system expects exact cache keys, it breaks\nif '_internal' in CACHE['alice']:\n    raise ValueError('Cache corrupted!')",
    "fixedCode": "CACHE = {\n    'alice': {'name': 'Alice', 'role': 'admin'},\n    'bob': {'name': 'Bob', 'role': 'user'}\n}\n\ndef get_user(username):\n    user = CACHE[username]\n    user_copy = user.copy() # Return a copy, don't mutate cache\n    user_copy['_internal'] = True\n    return user_copy\n\nalice = get_user('alice')\nprint(CACHE['alice']) # {'name': 'Alice', 'role': 'admin'} (Unchanged)\nprint(alice) # {'name': 'Alice', 'role': 'admin', '_internal': True} (Copy has flag)",
    tests: [
      {
        label: "Creates a copy of the dictionary before returning",
        check: code => /\.copy\s*\(\s*\)/.test(code)
      },
      {
        label: "Mutations are applied to the copy, not the CACHE directly",
        check: code => /user_copy\[.*\]\s*=/.test(code) && !/CACHE\[.*\]\s*=/.test(code)
      },
      {
        label: "Function still retrieves the user from the CACHE dict",
        check: code => /user\s*=\s*CACHE\[/.test(code)
      }
    ]
  }
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