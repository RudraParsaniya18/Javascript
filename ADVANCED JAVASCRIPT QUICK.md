# ADVANCED JAVASCRIPT — QUICK REVISION NOTES

## 1. GARBAGE COLLECTION

Definition:
Garbage collection (GC) is the automatic process of freeing memory occupied by objects that are no longer reachable.

Important points:
- JavaScript automatically manages memory.
- Reachable objects are kept in memory.
- Unreachable objects become eligible for garbage collection.
- JavaScript mainly uses the Mark-and-Sweep technique.
- Assigning null does not guarantee immediate memory removal.
- Memory leak: Memory that is no longer needed remains reachable.

Example:
let user = { name: "Rudra" };
user = null;
// The object can be collected if no other references exist.


## 2. CONSTRUCTOR AND NEW OPERATOR

Definition:
A constructor function initializes objects with similar properties.

Example:
function User(name, age) {
    this.name = name;
    this.age = age;
}

const user1 = new User("Rudra", 21);

Important points:
- `new` creates a new object.
- It links the object's prototype to the constructor's prototype.
- The constructor executes with `this` referring to the new object.
- The new object is returned unless the constructor explicitly returns another object.
- Classes also use constructors to initialize instances.
- Always use `new` when calling a constructor function.

Modern syntax:
class User {
    constructor(name) {
        this.name = name;
    }
}

const user = new User("Rudra");


## 3. SYMBOL TYPE

Definition:
Symbol is a primitive data type used to create unique values.

Example:
const a = Symbol("id");
const b = Symbol("id");

console.log(a === b); // false

Important points:
- Every Symbol() call creates a unique symbol.
- Symbols can be used as object property keys.
- Symbol descriptions do not determine uniqueness.
- Symbol.for() uses a shared registry.

Example:
const a = Symbol.for("id");
const b = Symbol.for("id");

console.log(a === b); // true


## 4. OBJECT-TO-PRIMITIVE CONVERSION

Definition:
JavaScript sometimes converts objects into primitive values before performing operations.

Important mechanisms:
1. Symbol.toPrimitive
2. valueOf()
3. toString()

Example:
const obj = {
    [Symbol.toPrimitive](hint) {
        if (hint === "number") return 100;
        return "Hello";
    }
};

console.log(Number(obj)); // 100
console.log(String(obj)); // Hello

Important points:
- Symbol.toPrimitive is used first when available.
- Otherwise, ordinary conversion rules use valueOf() and toString().
- Conversion behavior depends on the operation.


## 5. TYPE CONVERSION

Definition:
Type conversion means changing a value from one data type to another.

A. Explicit conversion (manual)

String(100);       // "100"
Number("50");      // 50
Boolean(1);        // true

B. Implicit conversion (automatic / type coercion)

"5" + 2;  // "52"
"5" - 2;  // 3
"5" * 2;  // 10
5 == "5"; // true

Important conversions:
Number("hello");   // NaN
Number(null);      // 0
Number(undefined); // NaN
Boolean(0);        // false
Boolean("");       // false
Boolean("0");      // true

Important points:
- + can perform addition or string concatenation.
- -, *, and / generally perform numeric operations.
- Prefer === over == to avoid unintended type coercion.
- NaN means Not-a-Number.


## 6. ITERABLES

Definition:
An iterable provides a Symbol.iterator method that allows values to be accessed one at a time through the iteration protocol.

Common iterables:
- Arrays
- Strings
- Maps
- Sets

Example:
const fruits = ["Apple", "Mango"];

for (const fruit of fruits) {
    console.log(fruit);
}

Important points:
- for...of iterates over values.
- for...in enumerates enumerable property keys.
- Plain objects are not iterable by default.
- Symbol.iterator defines the default iteration behavior.


## 7. MAP AND SET

A. MAP

Definition:
Map stores key-value pairs. Keys can be values of different types, including objects.

Example:
const map = new Map();

map.set("name", "Rudra");
map.set("age", 21);

console.log(map.get("name")); // Rudra
console.log(map.has("age"));  // true

Important methods:
- set(key, value)
- get(key)
- has(key)
- delete(key)
- clear()
- size

B. SET

Definition:
Set stores unique values and ignores duplicates.

Example:
const numbers = new Set([1, 2, 2, 3]);

console.log(numbers); // Set(3) {1, 2, 3}

Important methods:
- add(value)
- has(value)
- delete(value)
- clear()
- size

Removing array duplicates:
const numbers = [1, 2, 2, 3];
const unique = [...new Set(numbers)];

console.log(unique); // [1, 2, 3]

Difference:
- Map = key-value pairs.
- Set = unique values.
- Both preserve insertion order and are iterable.


## 8. WEAKMAP AND WEAKSET

A. WEAKMAP

Definition:
WeakMap stores key-value pairs and holds object keys weakly.

Example:
let user = { name: "Rudra" };
const weakMap = new WeakMap();

weakMap.set(user, "Employee");
console.log(weakMap.get(user)); // Employee

B. WEAKSET

Definition:
WeakSet stores objects without keeping them alive solely through the collection.

Example:
const weakSet = new WeakSet();
const user = { name: "Rudra" };

weakSet.add(user);
console.log(weakSet.has(user)); // true

Important points:
- WeakMap keys must be objects or non-registered symbols in modern JavaScript.
- WeakSet stores objects only.
- WeakMap and WeakSet are not iterable.
- They do not have a size property or clear() method.
- Useful for object-associated data and tracking objects without keeping them alive solely through the collection.


## 9. OBJECT.KEYS(), OBJECT.VALUES(), OBJECT.ENTRIES()

Example:
const user = {
    name: "Rudra",
    age: 21
};

A. Object.keys(user)
Returns property names.

Output:
["name", "age"]

B. Object.values(user)
Returns property values.

Output:
["Rudra", 21]

C. Object.entries(user)
Returns key-value pairs as nested arrays.

Output:
[["name", "Rudra"], ["age", 21]]

Using entries:
for (const [key, value] of Object.entries(user)) {
    console.log(key, value);
}

Important points:
- These methods return arrays.
- They work with own enumerable string-keyed properties.
- Symbol-keyed properties are excluded.


## 10. DESTRUCTURING ASSIGNMENT

Definition:
Destructuring extracts values from arrays or properties from objects into variables.

A. Array destructuring

const numbers = [10, 20, 30];
const [a, b, c] = numbers;

console.log(a); // 10
console.log(b); // 20

- Values are extracted by position.
- You can skip values using empty spaces.

B. Object destructuring

const user = { name: "Rudra", age: 21 };
const { name, age } = user;

console.log(name); // Rudra
console.log(age);  // 21

- Values are extracted by property name.

Renaming:
const { name: userName } = user;

Default value:
const { role = "Intern" } = user;

Important point:
A default value is used when the extracted value is undefined, not null.


## 11. JSON METHODS AND toJSON()

Definition:
JSON is a text format used to exchange and store data.

A. JSON.stringify()
Converts a JavaScript value into a JSON string.

const user = { name: "Rudra", age: 21 };
const json = JSON.stringify(user);

B. JSON.parse()
Converts valid JSON text into a JavaScript value.

const json = '{"name":"Rudra","age":21}';
const user = JSON.parse(json);

console.log(user.name); // Rudra

C. toJSON()
A method that customizes how an object is serialized by JSON.stringify().

Example:
const user = {
    name: "Rudra",
    age: 21,

    toJSON() {
        return { name: this.name };
    }
};

console.log(JSON.stringify(user));
// {"name":"Rudra"}

Important points:
- stringify = JavaScript value to JSON text.
- parse = JSON text to JavaScript value.
- toJSON = customizes serialization.


## 12. RECURSION AND CALL STACK

A. RECURSION

Definition:
A function calling itself to solve a problem.

Example:
function countDown(n) {
    if (n === 0) return;

    console.log(n);
    countDown(n - 1);
}

countDown(3);
// 3, 2, 1

Important points:
- Base case stops recursion.
- Without a proper stopping condition, recursion may continue until a stack overflow occurs.

B. CALL STACK

Definition:
The call stack tracks active function calls.

Important points:
- It follows LIFO: Last In, First Out.
- A called function normally finishes before its caller continues.
- Recursive calls create multiple active stack frames.
- Deep recursion can cause RangeError: Maximum call stack size exceeded.


## 13. REST PARAMETERS AND SPREAD SYNTAX

Both use the same ... syntax, but their purpose depends on where they are used.

A. REST PARAMETERS

Collect multiple function arguments into an array.

Example:
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(10, 20, 30)); // 60

Important point:
A rest parameter must be the last parameter.

B. SPREAD SYNTAX

Expands iterable values or object properties in supported contexts.

Example 1: Function call
const numbers = [10, 20, 30];
console.log(Math.max(...numbers)); // 30

Example 2: Array copy
const copy = [...numbers];

Example 3: Combine arrays
const result = [...[1, 2], ...[3, 4]];
// [1, 2, 3, 4]

Example 4: Object copy/update
const user = { name: "Rudra", age: 21 };
const updatedUser = { ...user, age: 22 };

Important points:
- Rest collects values.
- Spread expands values or properties.
- Array/object spread creates a shallow copy, not a deep copy.


## 14. GLOBAL OBJECT

Definition:
The global object provides access to built-in values and functions in a JavaScript environment.

Examples:
- Browser: window
- Node.js: global
- Cross-environment access: globalThis

Example:
console.log(globalThis.Math);
console.log(globalThis.JSON);

Important points:
- globalThis is the standard cross-environment way to access the global object.
- Avoid unnecessary global variables.
- In classic browser scripts, top-level var declarations create window properties, but top-level let and const do not.
- Module and Node.js behavior differs from classic browser scripts.


## 15. FUNCTION OBJECTS

Definition:
Functions are callable objects in JavaScript and are first-class citizens.

Example 1: Function property

function greet() {
    return "Hello";
}

greet.language = "English";

console.log(greet.language); // English

Example 2: Assigning a function

const anotherGreet = greet;
console.log(anotherGreet()); // Hello

Example 3: Passing a function as an argument

function execute(fn) {
    console.log(fn());
}

execute(greet); // Hello

Useful properties:
- function.name = function's name
- function.length = number of declared parameters before the first rest parameter

Important points:
- Functions can be stored in variables.
- Functions can be passed as arguments.
- Functions can be returned from other functions.
- These features enable callbacks and higher-order functions.


# FINAL QUICK REVISION

Garbage Collection  = Frees memory of unreachable objects.
Constructor + new   = Creates and initializes object instances.
Symbol              = Creates unique primitive values.
Object Conversion   = Converts objects into primitive values when needed.
Type Conversion     = Changes values between data types.
Iterable            = Supports iteration through Symbol.iterator.
Map                 = Stores key-value pairs.
Set                 = Stores unique values.
WeakMap             = Stores values against weakly held keys.
WeakSet             = Tracks objects using weak references.
Object.keys()       = Returns keys.
Object.values()     = Returns values.
Object.entries()    = Returns key-value pairs.
Destructuring       = Extracts values/properties into variables.
JSON.stringify()    = Converts values into JSON text.
JSON.parse()        = Converts JSON text into values.
toJSON()            = Customizes JSON serialization.
Recursion           = A function calls itself.
Call Stack          = Tracks active function calls (LIFO).
Rest (...)          = Collects values.
Spread (...)        = Expands values or properties.
Global Object       = Provides environment-wide built-ins.
Function Object     = Functions can be called, stored, passed, and returned.

END OF QUICK REVISION NOTES

##Day-2

ADVANCED JAVASCRIPT — QUICK REVISION NOTES
==========================================

##1. NEW FUNCTION() SYNTAX
-----------------------

- Creates a function dynamically using strings.
- Usually avoided when a normal function can do the job.

Example:

const sum = new Function("a", "b", "return a + b");

console.log(sum(10, 20));  // 30

Important:
- Arguments and function body are passed as strings.
- It cannot access local variables from the scope where it was created.
- Avoid using untrusted input because of security risks.


##2. DECORATORS
-------------

- A decorator adds extra behavior around an existing function or class without directly changing its original implementation.
- Wrappers are a common way to understand the decorator pattern.

Example:

function decorate(func) {
    return function () {
        console.log("Before");
        func();
        console.log("After");
    };
}

function greet() {
    console.log("Hello");
}

const newGreet = decorate(greet);
newGreet();

Output:
Before
Hello
After

Remember:
- func = original function.
- decorate() = adds extra behavior.
- newGreet() = decorated function.

Note: This is the decorator pattern using a wrapper. Modern JavaScript also supports formal decorator syntax for classes and methods.


##3. FORWARDING
-------------

- Forwarding means passing a function call, its arguments, or its result onward to another function.
- It is commonly used inside wrappers and decorators.

Example:

function add(a, b) {
    return a + b;
}

function wrapper(...args) {
    return add(...args);
}

console.log(wrapper(10, 20));  // 30

Remember:
- ...args in parameters collects arguments into an array (rest).
- ...args in a function call expands the array into arguments (spread).
- Use return to forward the result back to the caller.


##4. CALL() AND APPLY()
---------------------

Both methods call a function immediately and let us specify the value of this.

Example:

const person = { name: "Rudra" };

function introduce(city, country) {
    console.log(this.name, city, country);
}

Using call():

introduce.call(person, "Surat", "India");

Output:
Rudra Surat India

Using apply():

introduce.apply(person, ["Surat", "India"]);

Output:
Rudra Surat India

Difference:
- call() → arguments are passed separately.
- apply() → arguments are passed as an array.
- Both execute the function immediately.


##5. FUNCTION BINDING — bind()
----------------------------

- bind() creates a new function with a fixed this value.
- It does NOT execute the function immediately.
- It can also pre-fill arguments.

Example:

const person = { name: "Amit" };

function greet() {
    console.log("Hello " + this.name);
}

const newGreet = greet.bind(person);

newGreet();

Output:
Hello Amit

Remember:
- call() → execute now, separate arguments.
- apply() → execute now, arguments in an array.
- bind() → create a new bound function for later use.


##6. PROPERTY FLAGS AND DESCRIPTORS
---------------------------------

Property flags control how an object's properties behave.

Three important flags:

1. writable
   - true: property value can be changed.
   - false: property value cannot be changed by ordinary assignment.

2. enumerable
##   - true: property appears in Object.keys() and normal enumeration.
   - false: property is hidden from these enumeration methods.

3. configurable
   - true: property can generally be deleted and its descriptor changed.
   - false: deletion and changes to the descriptor are restricted.

Example:

const user = {};

Object.defineProperty(user, "name", {
    value: "Rudra",
    writable: false,
    enumerable: true,
    configurable: false
});

Important methods:

Object.getOwnPropertyDescriptor(user, "name");
// Reads a property's descriptor.

Object.defineProperty(user, "name", {
    enumerable: false
});
// Modifies the existing descriptor.

Remember:
- Object literals normally create properties with all three flags true.
- Object.defineProperty() defaults omitted flags to false for a newly created property.


##7. PROPERTY GETTERS AND SETTERS
-------------------------------

GETTER:
- Runs when a property is read.
- Uses the get keyword.
- Accessed like a property, without parentheses.

SETTER:
- Runs when a value is assigned to a property.
- Uses the set keyword.
- Can validate values before storing them.

Example:

const user = {
    _age: 20,

    get age() {
        return this._age;
    },

    set age(value) {
        if (value >= 0) {
            this._age = value;
        }
    }
};

user.age = 25;
console.log(user.age);  // 25

user.age = -5;
console.log(user.age);  // 25

Remember:
- Reading user.age calls the getter.
- Assigning user.age = 25 calls the setter.
- _age is a naming convention, not a truly private property.


##8. PROTOTYPE INHERITANCE
------------------------

- Prototype inheritance allows an object to access properties and methods from another object through a prototype link.
- If a property is not found on the object itself, JavaScript searches its prototype.

Example:

const parent = {
    city: "Ahmedabad"
};

const child = {};

Object.setPrototypeOf(child, parent);

console.log(child.city);  // Ahmedabad

Lookup process:
1. JavaScript checks child.
2. city is not found on child.
3. JavaScript checks its prototype, parent.
4. city is found, so "Ahmedabad" is returned.

Important:
- Inherited properties are not copied into the child.
- The prototype chain is searched until the property is found or the chain ends.

Useful checks:

Object.hasOwn(child, "city");  // false
"city" in child;               // true


##9. F.PROTOTYPE
--------------

- F.prototype is the prototype object used by instances created with new F().
- It is commonly used to share methods between instances created by a constructor function.

Example:

function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function () {
    console.log(this.name + " makes a sound");
};

const dog = new Animal("Tommy");

dog.speak();

Output:
Tommy makes a sound

Execution:
1. Animal is defined as a constructor function.
2. speak() is added to Animal.prototype.
3. new Animal("Tommy") creates a new object.
4. The object's prototype is linked to Animal.prototype.
5. dog.speak() finds speak() through the prototype chain.

Verification:

Object.getPrototypeOf(dog) === Animal.prototype;
// true

Remember the difference:
- Animal.prototype → a property on the constructor function.
- Object.getPrototypeOf(dog) → returns dog object's actual prototype.


## QUICK COMPARISON — IMPORTANT
-------------------------------

Decorators:
Add extra behavior around an existing function or class.

Forwarding:
Passes a function call, arguments, or result onward.

call():
Calls a function immediately with a specified this value and separate arguments.

apply():
Calls a function immediately with a specified this value and an array of arguments.

bind():
Returns a new function with a specified this value; does not execute it immediately.

Getter:
Runs when a property is read.

Setter:
Runs when a property is assigned.

Property descriptors:
Control a property's value and behavior through flags.

Prototype inheritance:
Allows an object to access properties and methods through its prototype chain.

F.prototype:
The prototype object used by instances created with new F().


FINAL REVISION TIP
------------------

Remember these key points:

1. call() and apply() execute immediately; bind() does not.
2. Decorators add behavior; forwarding passes calls or results onward.
3. Getters run on property access; setters run on assignment.
4. writable, enumerable, and configurable control property behavior.
5. JavaScript searches the prototype chain when a property is not found directly on an object.
6. F.prototype is especially important when using constructor functions with new.


ADVANCED JAVASCRIPT — QUICK REVISION NOTES
Topics: Classes & Inheritance to Regular Expressions

==================================================
1. CLASSES AND INHERITANCE
==================================================

Class:
- A class is a blueprint for creating objects.
- constructor() initializes object properties.
- Methods define object behavior.

Example:
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(this.name + " makes a sound");
    }
}

const dog = new Animal("Tommy");
dog.speak();

Inheritance:
- extends allows one class to inherit from another class.
- The child class can use parent methods and properties.
- super() calls the parent constructor.
- super.method() calls a parent method.
- A child method with the same name overrides the parent method.

Example:
class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    bark() {
        console.log("Woof!");
    }
}

Key points:
- Call super() before using this in a derived constructor.
- Method overriding allows child classes to provide their own behavior.


==================================================
2. ERROR HANDLING — try...catch
==================================================

try:
- Contains code that might throw an error.

catch:
- Handles an error thrown inside the try block.

finally:
- Runs whether an error occurs or not.

throw:
- Throws an error manually.

Example:
try {
    throw new Error("Something went wrong");
} catch (error) {
    console.log(error.message);
} finally {
    console.log("Finished");
}

Error object properties:
- error.name: Type of error.
- error.message: Error description.
- error.stack: Stack trace, when available.

Important:
- try...catch handles synchronous errors in its scope.
- Use try...catch with await to handle rejected Promises.
- It does not automatically catch errors from unrelated asynchronous callbacks.


==================================================
3. CUSTOM ERRORS AND EXTENDING ERROR
==================================================

- new Error("message") creates a standard Error with a custom message.
- extends Error creates a custom error class.
- super(message) initializes the parent Error.
- this.name sets the custom error name.
- instanceof checks an object's class or inheritance.

Example:
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

try {
    throw new ValidationError("Invalid input");
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(error.message);
    }
}

Common custom error types:
- ValidationError
- AuthenticationError
- NotFoundError

Use custom errors when different errors need different handling.


==================================================
4. SYNCHRONOUS VS ASYNCHRONOUS
==================================================

Synchronous:
- Executes code in sequence.
- The next statement waits for the current statement to finish.
- Example: normal calculations and console.log().

Example:
console.log("A");
console.log("B");
console.log("C");

Output:
A
B
C

Asynchronous:
- Allows certain operations to finish later.
- JavaScript can continue other work while waiting.
- Common examples: timers, API requests, file operations.

Example:
console.log("A");

setTimeout(() => {
    console.log("B");
}, 1000);

console.log("C");

Output:
A
C
B

Important:
- JavaScript runs synchronous code first.
- Promise callbacks (microtasks) run after the current synchronous code finishes.
- Timer callbacks run later through the event loop.
- setTimeout(callback, 0) does not run the callback immediately.


==================================================
5. ASYNC / AWAIT
==================================================

async:
- Makes a function return a Promise.
- Allows await to be used inside the function.

await:
- Waits for a Promise to settle.
- Gives the fulfilled value or throws the rejection reason.
- Pauses the current async function, not the entire program.

Example:
async function getData() {
    const result = await Promise.resolve("Data received");
    console.log(result);
}

getData();

Important:
- An async function always returns a Promise.
- await can be used inside async functions and at the top level of JavaScript modules.
- Use try...catch to handle rejected Promises.

API example:
async function getUsers() {
    try {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}

Note:
fetch() does not reject automatically for HTTP errors such as 404.
Check response.ok to detect unsuccessful HTTP responses.


==================================================
6. CALLBACKS
==================================================

- A callback is a function passed as an argument to another function.
- The receiving function decides when to call it.
- Callbacks can be synchronous or asynchronous.

Example:
function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}

greet("Rudra", () => console.log("Welcome!"));

Output:
Hello Rudra
Welcome!

Callback hell:
- Deeply nested callbacks that become difficult to read and maintain.
- Promises and async/await can make dependent asynchronous operations easier to organize.

Remember:
Passing a function: greet("Rudra", sayBye)
Calling a function: sayBye()


==================================================
7. PROMISES
==================================================

A Promise represents the eventual success or failure of an operation.

Promise states:
- Pending: Not yet settled.
- Fulfilled: Completed successfully.
- Rejected: Failed.

Example:
const promise = new Promise((resolve, reject) => {
    const success = true;

    if (success) {
        resolve("Success");
    } else {
        reject(new Error("Failed"));
    }
});

promise
    .then(result => console.log(result))
    .catch(error => console.log(error.message))
    .finally(() => console.log("Finished"));

Promise methods:
- then(): Handles fulfillment; can transform or pass along a result.
- catch(): Handles rejection.
- finally(): Runs after settlement, regardless of outcome.
- Promise.all(): Fulfills when all input Promises fulfill; rejects if one rejects.
- Promise.allSettled(): Waits for all input Promises to settle.
- Promise.race(): Settles with the first input Promise to settle.
- Promise.any(): Fulfills with the first fulfilled input Promise; rejects if all reject.

Promise.resolve(value):
- Creates a fulfilled Promise with the given value.

Promise.reject(reason):
- Creates a rejected Promise.

Remember:
- Callbacks are functions.
- A Promise represents an eventual result.
- async/await is syntax for working conveniently with Promises.


==================================================
8. REGULAR EXPRESSIONS (REGEX / RegExp)
==================================================

Definition:
A regular expression is a pattern used to search, match, validate, or replace text.

Creation:
const pattern = /hello/i;
const pattern2 = new RegExp("hello", "i");

A. CHARACTER CLASSES

\d      Any digit (0–9)
\D      Any non-digit
\w      ASCII letters, digits, underscore
\W      Any character outside \w
\s      Whitespace (space, tab, newline, etc.)
\S      Any non-whitespace character
.       Any character except line terminators by default

B. CHARACTER SETS

[abc]           Any one of a, b, c
[^abc]          Any character except a, b, c
[a-z]           Lowercase ASCII letter
[A-Z]           Uppercase ASCII letter
[0-9]           Digit
[a-zA-Z]        ASCII letter
[a-zA-Z0-9]     ASCII letter or digit
[a-zA-Z0-9_]    ASCII letter, digit, or underscore

C. QUANTIFIERS

a*          Zero or more occurrences of a
a+          One or more occurrences of a
a?          Zero or one occurrence of a
a{3}        Exactly 3 occurrences of a
a{2,}       At least 2 occurrences of a
a{2,5}      Between 2 and 5 occurrences of a
a{0,1}      Zero or one occurrence of a; same as a?

Greedy vs lazy:
a+      Greedy: matches as much as possible
a+?     Lazy: matches as little as possible

D. ANCHORS AND BOUNDARIES

^abc        abc at the start of input
abc$        abc at the end of input
^abc$       Entire input must match abc
\b          Word boundary
\B          Not a word boundary

With the m flag, ^ and $ also match individual line boundaries.

E. GROUPS AND ALTERNATION

(abc)       Capturing group
(?:abc)     Non-capturing group
(cat|dog)   Matches cat or dog
(a)(b)      Two capturing groups
\1          Backreference to first capturing group
\2          Backreference to second capturing group

F. LOOKAHEAD AND LOOKBEHIND

a(?=b)      a followed by b
a(?!b)      a not followed by b
(?<=a)b     b preceded by a
(?<!a)b     b not preceded by a

These check surrounding text without including it in the match.

G. ESCAPING SPECIAL CHARACTERS

\.      Literal dot
\*      Literal asterisk
\+      Literal plus
\?      Literal question mark
\\      Literal backslash
\(      Literal opening parenthesis
\)      Literal closing parenthesis
\[      Literal opening square bracket
\]      Literal closing square bracket
\{      Literal opening curly brace
\}      Literal closing curly brace
\|      Literal pipe
\/      Literal slash, useful in regex literals

H. REGEX FLAGS

g       Global: find all matches
i       Case-insensitive matching
m       Multiline anchors
s       Dot also matches line terminators
u       Unicode-aware matching
y       Sticky matching at lastIndex
d       Include match indices
v       Unicode sets and properties of strings

Example:
/hello/gi

Matches all occurrences of hello regardless of case.

I. COMMON REGEX METHODS

regex.test(string)
- Returns true or false.

string.match(regex)
- Returns match information or null.

string.matchAll(regex)
- Iterates over all matches; requires g.

string.search(regex)
- Returns the first match index or -1.

string.replace(regex, replacement)
- Replaces matching text.

string.replaceAll(regex, replacement)
- Replaces all matches; a regex must have g.

regex.exec(string)
- Returns match information or null.

J. PRACTICAL REGEX EXAMPLES

/^\d{4}$/ 
- Exactly four digits.

/^\d+$/
- One or more digits only.

/^[a-z]+$/
- One or more lowercase ASCII letters.

/^[A-Z]+$/
- One or more uppercase ASCII letters.

/^[a-zA-Z]+$/
- One or more ASCII letters.

/^[a-zA-Z0-9]+$/
- One or more ASCII letters or digits.

/^\w{3,12}$/
- 3–12 ASCII word characters.

/^[^\s@]+@[^\s@]+\.[^\s@]+$/
- Basic email-like format; not a complete email validator.

/^\s+|\s+$/
- Whitespace at the start or end.

/\s+/g
- One or more whitespace characters.

/\d/g
- Every digit.

/^Hello/
- Starts with Hello.

/\.js$/
- Ends with .js.

/(\d)\1/
- Two identical consecutive digits, such as 11 or 55.

/cat|dog/
- Matches cat or dog.

Note:
- Regex is useful for basic validation, searching, and replacing.
- Real-world formats such as email addresses may require more complete validation.
- Validate important user input on the server as well as the client.


==================================================
9. MOST IMPORTANT POINTS TO REMEMBER
==================================================

1. extends creates inheritance between classes.
2. super() calls the parent constructor.
3. throw raises an error; catch handles it.
4. Custom errors can extend the built-in Error class.
5. Synchronous code executes in sequence.
6. Asynchronous work can finish later without blocking other JavaScript work.
7. async functions always return Promises.
8. await pauses the current async function until the awaited Promise settles.
9. Callbacks are functions passed to other functions.
10. Promises represent eventual success or failure.
11. then() handles fulfillment; catch() handles rejection.
12. Regex patterns match text using character classes, quantifiers, groups, and flags.
13. test() checks for a match; match() retrieves match information; replace() changes matching text.

END OF REVISION NOTES
