# Methods in Java

## Overview

As programs become larger, placing every statement inside `main` makes
the code difficult to understand, test, and maintain. **Methods** allow
a program to be divided into smaller units, where each unit performs a
specific operation.

A well-designed method has a clear purpose, accepts only the information
it needs, and may return a result to its caller. Methods also make it
possible to reuse logic instead of rewriting the same code in several
places.

------------------------------------------------------------------------

## Learning Objectives

After completing this material, you should be able to:

-   Define and invoke Java methods.
-   Distinguish between formal parameters and arguments.
-   Identify a method's name, parameter list, return type, body, and
    signature.
-   Write methods that return values.
-   Write `void` methods that perform an action.
-   Explain how primitive values are passed to methods.
-   Use methods to reduce repeated code and organize a program into
    modules.
-   Overload methods appropriately.
-   Recognize ambiguous method calls.
-   Determine the scope of local variables.
-   Apply method abstraction to program design.
-   Decompose a larger problem into smaller methods using stepwise
    refinement.

------------------------------------------------------------------------

## 1. Why Use Methods?

Suppose a program needs to calculate the sum of several different
integer ranges. One approach is to repeat nearly identical loops:

``` java
int sum = 0;

for (int i = 1; i <= 10; i++) {
    sum += i;
}

System.out.println(sum);

sum = 0;

for (int i = 20; i <= 30; i++) {
    sum += i;
}

System.out.println(sum);
```

The repeated logic can instead be placed in a method:

``` java
public static int sumRange(int start, int end) {
    int sum = 0;

    for (int i = start; i <= end; i++) {
        sum += i;
    }

    return sum;
}
```

The method can then be reused:

``` java
System.out.println(sumRange(1, 10));
System.out.println(sumRange(20, 30));
System.out.println(sumRange(35, 45));
```

The program becomes shorter and the purpose of the repeated operation
becomes clearer.

------------------------------------------------------------------------

## 2. What Is a Method?

A method is a named group of statements designed to perform an
operation.

Example:

``` java
public static int larger(int first, int second) {

    if (first > second) {
        return first;
    }

    return second;
}
```

This method receives two integers and returns the larger value.

A method normally contains several important components:

``` text
modifier  return type  method name  parameter list
   ↓           ↓            ↓            ↓
public static int        larger(int first, int second)
```

The statements inside the braces form the **method body**.

------------------------------------------------------------------------

## 3. Method Header and Method Body

Consider:

``` java
public static double calculateArea(double radius) {
    double area = Math.PI * radius * radius;
    return area;
}
```

The header is:

``` java
public static double calculateArea(double radius)
```

It identifies:

-   Modifiers: `public static`
-   Return type: `double`
-   Method name: `calculateArea`
-   Parameter: `double radius`

The body is:

``` java
{
    double area = Math.PI * radius * radius;
    return area;
}
```

The body contains the implementation of the operation.

------------------------------------------------------------------------

## 4. Method Signature

A method's **signature** consists of:

``` text
method name + parameter list
```

For example:

``` java
public static int multiply(int a, int b)
```

has the signature:

``` text
multiply(int, int)
```

The return type is not part of the method signature.

This becomes especially important when working with overloaded methods.

------------------------------------------------------------------------

## 5. Formal Parameters

Variables declared in a method's parameter list are called **formal
parameters**.

``` java
public static int subtract(int first, int second) {
    return first - second;
}
```

Here:

``` text
first
second
```

are formal parameters.

They receive values when the method is invoked.

------------------------------------------------------------------------

## 6. Arguments

Values supplied when a method is invoked are called **arguments**.

``` java
int result = subtract(20, 8);
```

Here:

``` text
20
8
```

are arguments.

They correspond to:

``` text
first = 20
second = 8
```

The arguments must be compatible with the method's parameter types and
must appear in the correct order.

------------------------------------------------------------------------

## 7. Defining and Invoking a Method

A method definition describes what the method does.

``` java
public static int square(int number) {
    return number * number;
}
```

A method invocation requests that operation:

``` java
int answer = square(7);
```

Execution temporarily transfers to `square`. After the method finishes,
its return value is assigned to `answer`.

``` text
main
  |
  | square(7)
  v
square
  |
  | return 49
  v
main
```

------------------------------------------------------------------------

## 8. Value-Returning Methods

A **value-returning method** sends a result back to its caller.

Example:

``` java
public static double convertMilesToKilometers(double miles) {
    return miles * 1.60934;
}
```

Invocation:

``` java
double km = convertMilesToKilometers(10);
```

The method's declared return type must be compatible with the value
returned.

------------------------------------------------------------------------

## 9. The `return` Statement

The `return` statement ends a method and sends a value back to the
caller.

``` java
public static int cube(int number) {
    return number * number * number;
}
```

For a value-returning method, every possible execution path must return
an appropriate value.

A problematic method might be:

``` java
public static int absoluteValue(int number) {

    if (number < 0) {
        return -number;
    }
}
```

If `number` is not negative, no value is returned.

A correct version is:

``` java
public static int absoluteValue(int number) {

    if (number < 0) {
        return -number;
    }

    return number;
}
```

------------------------------------------------------------------------

## 10. Using a Returned Value

A returned value can be:

### Assigned to a variable

``` java
double area = calculateArea(5);
```

### Printed directly

``` java
System.out.println(calculateArea(5));
```

### Used in an expression

``` java
double totalArea = calculateArea(5) + calculateArea(3);
```

### Passed to another method

``` java
System.out.println(Math.round(calculateArea(5)));
```

This flexibility makes value-returning methods useful building blocks.

------------------------------------------------------------------------

## 11. `void` Methods

A method that does not return a value uses the return type `void`.

``` java
public static void displayWelcome() {
    System.out.println("Welcome to Java");
}
```

Invoke it with:

``` java
displayWelcome();
```

A `void` method performs an action rather than producing a value for use
in an expression.

------------------------------------------------------------------------

## 12. `void` Methods with Parameters

A `void` method can still receive information.

``` java
public static void printMessage(String message, int times) {

    for (int i = 0; i < times; i++) {
        System.out.println(message);
    }
}
```

Invocation:

``` java
printMessage("Java Methods", 3);
```

Output:

``` text
Java Methods
Java Methods
Java Methods
```

The order of the arguments matters because they correspond to the
parameters by position.

------------------------------------------------------------------------

## 13. Returning Early from a `void` Method

A `void` method can use:

``` java
return;
```

to terminate early.

Example:

``` java
public static void printPositive(int number) {

    if (number <= 0) {
        return;
    }

    System.out.println(number);
}
```

No value follows `return` because the method's return type is `void`.

------------------------------------------------------------------------

## 14. Parameter Type and Order

Suppose a method is defined as:

``` java
public static void repeat(String message, int count) {
    // ...
}
```

This invocation is valid:

``` java
repeat("Hello", 5);
```

This is not:

``` java
// repeat(5, "Hello");
```

The compiler compares the arguments with the method's parameter list.

Correct order and compatible data types are required.

------------------------------------------------------------------------

## 15. Pass by Value

Java passes argument values to method parameters.

For primitive types, the method receives a copy of the value.

Consider:

``` java
public static void changeValue(int number) {
    number = 100;
}
```

and:

``` java
int x = 10;

changeValue(x);

System.out.println(x);
```

Output:

``` text
10
```

Changing `number` does not change `x`.

Conceptually:

``` text
x in main:       10
                  |
                  | copy value
                  v
number in method: 10

number = 100

x in main:       10
number in method:100
```

The two variables are separate.

------------------------------------------------------------------------

## 16. Why a Primitive Swap Method Does Not Swap the Caller

Consider:

``` java
public static void swap(int first, int second) {

    int temp = first;
    first = second;
    second = temp;
}
```

Now:

``` java
int x = 4;
int y = 9;

swap(x, y);

System.out.println(x + " " + y);
```

Output:

``` text
4 9
```

Inside `swap`, the copies are exchanged. The original variables in the
caller remain unchanged.

------------------------------------------------------------------------

## 17. Method Calls and the Call Stack

Each active method call needs its own execution information, including
parameters and local variables.

Suppose:

``` java
public static void main(String[] args) {

    int x = 8;
    int y = 3;

    int result = larger(x, y);

    System.out.println(result);
}
```

When `larger(x, y)` is invoked, the caller pauses while the called
method executes.

Conceptually:

``` text
larger
----------------
first = 8
second = 3

main
----------------
x = 8
y = 3
result = ?
```

After `larger` returns, its method-call information is removed and
execution continues in `main`.

Understanding this process helps explain why local variables in separate
method calls are independent.

------------------------------------------------------------------------

## 18. Reusing Methods from Another Class

A reusable `static` method can be called from another class by
qualifying the method name with the class name.

Suppose:

``` java
public class NumberTools {

    public static int larger(int a, int b) {
        return a > b ? a : b;
    }
}
```

Another class can call:

``` java
int result = NumberTools.larger(12, 7);
```

This allows related reusable operations to be organized into utility
classes.

------------------------------------------------------------------------

## 19. Modularizing a Program

Methods can divide a larger problem into smaller responsibilities.

Instead of:

``` java
public static void main(String[] args) {
    // read data
    // validate data
    // calculate results
    // determine status
    // print report
}
```

use:

``` java
public static void main(String[] args) {

    double score = readScore();
    boolean valid = isValidScore(score);

    if (valid) {
        String grade = determineGrade(score);
        printReport(score, grade);
    }
}
```

Each method represents one meaningful operation.

This makes the program easier to read, test, debug, and modify.

------------------------------------------------------------------------

## 20. Example: Greatest Common Divisor Method

A mathematical operation can be encapsulated in a reusable method.

``` java
public static int gcd(int first, int second) {

    int gcd = 1;

    for (int divisor = 1;
         divisor <= first && divisor <= second;
         divisor++) {

        if (first % divisor == 0 &&
            second % divisor == 0) {

            gcd = divisor;
        }
    }

    return gcd;
}
```

Invocation:

``` java
System.out.println(gcd(24, 36));
```

Output:

``` text
12
```

The caller does not need to know how the divisor search is implemented.

------------------------------------------------------------------------

## 21. Example: Prime Number Method

A method can answer a focused yes/no question by returning a `boolean`.

``` java
public static boolean isPrime(int number) {

    if (number < 2) {
        return false;
    }

    for (int divisor = 2;
         divisor <= Math.sqrt(number);
         divisor++) {

        if (number % divisor == 0) {
            return false;
        }
    }

    return true;
}
```

Usage:

``` java
if (isPrime(29)) {
    System.out.println("29 is prime.");
}
```

The method name makes the condition easy to understand.

------------------------------------------------------------------------

## 22. Example: Hexadecimal Digit Conversion

Methods can separate a conversion problem into smaller operations.

For example, one method can convert a hexadecimal digit to its decimal
value:

``` java
public static int hexDigitToDecimal(char digit) {

    if (digit >= '0' && digit <= '9') {
        return digit - '0';
    }

    if (digit >= 'A' && digit <= 'F') {
        return digit - 'A' + 10;
    }

    return -1;
}
```

Another method can use it repeatedly:

``` java
public static int hexToDecimal(String hex) {

    int decimal = 0;

    for (int i = 0; i < hex.length(); i++) {

        int value = hexDigitToDecimal(
            Character.toUpperCase(hex.charAt(i))
        );

        if (value == -1) {
            return -1;
        }

        decimal = decimal * 16 + value;
    }

    return decimal;
}
```

This illustrates decomposition: one method solves the digit-level
problem while another solves the complete conversion.

------------------------------------------------------------------------

## 23. Method Overloading

Java permits multiple methods to have the same name when their parameter
lists are different.

Example:

``` java
public static int larger(int a, int b) {
    return a > b ? a : b;
}

public static double larger(double a, double b) {
    return a > b ? a : b;
}
```

Now:

``` java
larger(4, 7);
```

uses the `int` version, while:

``` java
larger(4.5, 7.2);
```

uses the `double` version.

This is called **method overloading**.

------------------------------------------------------------------------

## 24. What Makes Overloaded Methods Different?

Overloaded methods must have different parameter lists.

Differences may involve:

-   Number of parameters
-   Parameter data types
-   Order of parameter types

Example:

``` java
public static void display(int value) { }

public static void display(double value) { }

public static void display(String value) { }

public static void display(String text, int count) { }
```

Changing only the return type is not sufficient.

This is invalid:

``` java
// public static int calculate(int x) { ... }
// public static double calculate(int x) { ... }
```

Both methods would have the same signature.

------------------------------------------------------------------------

## 25. Ambiguous Method Invocation

Overloading must be designed carefully.

Suppose:

``` java
public static double calculate(int x, double y) {
    return x + y;
}

public static double calculate(double x, int y) {
    return x + y;
}
```

A call such as:

``` java
// calculate(5, 5);
```

can be ambiguous because either overloaded version appears applicable
through numeric conversion.

If the compiler cannot determine the most specific method, compilation
fails.

------------------------------------------------------------------------

## 26. Local Variables

A variable declared inside a method is a **local variable**.

``` java
public static double calculateTax(double amount) {

    double taxRate = 0.08;
    double tax = amount * taxRate;

    return tax;
}
```

Here:

``` text
amount
taxRate
tax
```

are available only within the region where their declarations are in
scope.

------------------------------------------------------------------------

## 27. Variable Scope

**Scope** is the portion of a program in which a variable can be
referenced.

Example:

``` java
public static void example() {

    int x = 10;

    if (x > 0) {
        int y = 20;

        System.out.println(x);
        System.out.println(y);
    }

    System.out.println(x);

    // System.out.println(y); // Error
}
```

`x` is available through the method block after its declaration.

`y` exists only inside the `if` block.

------------------------------------------------------------------------

## 28. Scope in `for` Loops

A variable declared in the initialization section of a `for` loop
belongs to that loop.

``` java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// i cannot be referenced here
```

Two separate, non-nested loops can each declare their own `i`:

``` java
for (int i = 0; i < 5; i++) {
    // ...
}

for (int i = 0; i < 10; i++) {
    // ...
}
```

The scopes do not overlap.

------------------------------------------------------------------------

## 29. Avoid Redeclaring Variables in Nested Scope

Consider:

``` java
public static void example() {

    int value = 10;

    if (value > 0) {
        // int value = 20; // Not allowed
    }
}
```

The inner block is nested within the scope of the existing local
variable.

Choose distinct names instead:

``` java
int value = 10;

if (value > 0) {
    int adjustedValue = 20;
}
```

------------------------------------------------------------------------

## 30. Method Abstraction

A caller should be able to use a method based on its purpose and
interface without needing to understand every implementation detail.

For example:

``` java
double distance = calculateDistance(x1, y1, x2, y2);
```

The caller needs to know:

-   What the method does
-   What arguments it requires
-   What it returns

The detailed formula can remain inside the method.

This is **method abstraction**.

You can think of the method as a black box:

``` text
        input
          |
          v
+--------------------+
| calculateDistance  |
| implementation     |
| hidden inside      |
+--------------------+
          |
          v
        result
```

------------------------------------------------------------------------

## 31. Benefits of Method Abstraction

Method abstraction helps a programmer:

-   Reuse operations.
-   Hide implementation details.
-   Reduce complexity.
-   Focus on one level of a problem at a time.
-   Test individual operations independently.
-   Change an implementation without rewriting every caller.

A descriptive method name also makes code more self-explanatory.

------------------------------------------------------------------------

## 32. Example: Random Character Method

A general-purpose method can generate a random character between two
character values:

``` java
public static char randomCharacter(char first, char last) {

    return (char) (
        first +
        Math.random() * (last - first + 1)
    );
}
```

Specialized methods can reuse it:

``` java
public static char randomLowercaseLetter() {
    return randomCharacter('a', 'z');
}

public static char randomUppercaseLetter() {
    return randomCharacter('A', 'Z');
}

public static char randomDigit() {
    return randomCharacter('0', '9');
}
```

This design places the general calculation in one reusable method and
gives meaningful names to common specialized operations.

------------------------------------------------------------------------

## 33. Stepwise Refinement

Large programming problems are easier to manage when divided into
smaller problems.

This process is often called **stepwise refinement** or **divide and
conquer**.

Suppose the task is:

``` text
Produce a monthly calendar
```

A first decomposition might be:

``` text
produceCalendar
├── readInput
└── printMonth
```

Then:

``` text
printMonth
├── printMonthTitle
└── printMonthBody
```

The smaller operations can be refined further:

``` text
printMonthTitle
└── getMonthName

printMonthBody
├── getStartDay
└── getNumberOfDaysInMonth
```

Eventually, each method represents a manageable task.

------------------------------------------------------------------------

## 34. Structure Charts

A structure chart can show the relationship among methods before
implementation begins.

Example:

``` text
main
├── readInput
├── validateInput
├── calculateResult
│   ├── calculateSubtotal
│   └── calculateAdjustment
└── displayReport
```

This helps identify:

-   Major tasks
-   Subtasks
-   Method responsibilities
-   Opportunities for reuse
-   Dependencies between operations

Designing the method structure before coding can simplify
implementation.

------------------------------------------------------------------------

## 35. Top-Down Development

A **top-down** approach begins with the highest-level method and works
toward lower-level details.

A programmer might first write:

``` java
public static void main(String[] args) {

    readInput();
    processData();
    displayResults();
}
```

The detailed methods can initially be represented by **stubs**.

Example:

``` java
public static void processData() {
    System.out.println("processData called");
}
```

The stub is intentionally incomplete but allows the program's overall
structure to be compiled and tested while development continues.

------------------------------------------------------------------------

## 36. Bottom-Up Development

A **bottom-up** approach begins with smaller supporting methods.

For example, a programmer may implement and test:

``` text
isValidDate
isLeapYear
daysInMonth
```

before implementing a larger method that depends on them.

Each method can be tested independently before being integrated into the
larger program.

Both top-down and bottom-up approaches can be useful, and a project may
combine them.

------------------------------------------------------------------------

## 37. Designing Good Methods

A useful method should normally perform one clear task.

Prefer:

``` java
public static boolean isValidScore(double score)
```

``` java
public static double calculateAverage(double total, int count)
```

``` java
public static void displayReport(double average)
```

over one very large method containing unrelated responsibilities.

Good method names should communicate intent.

Prefer:

``` java
calculateTuition()
```

instead of:

``` java
doStuff()
```

------------------------------------------------------------------------

## 38. Methods and Repeated Logic

Repeated code often indicates an opportunity for a method.

Instead of:

``` java
double area1 = Math.PI * 4 * 4;
double area2 = Math.PI * 8 * 8;
double area3 = Math.PI * 12 * 12;
```

write:

``` java
public static double circleArea(double radius) {
    return Math.PI * radius * radius;
}
```

Then:

``` java
double area1 = circleArea(4);
double area2 = circleArea(8);
double area3 = circleArea(12);
```

If the formula changes, only one implementation needs to be updated.

------------------------------------------------------------------------

## 39. Common Error: Forgetting to Return a Value

Incorrect:

``` java
public static int larger(int a, int b) {

    if (a > b) {
        return a;
    }
}
```

There is no return value when `a <= b`.

Correct:

``` java
public static int larger(int a, int b) {

    if (a > b) {
        return a;
    }
    else {
        return b;
    }
}
```

------------------------------------------------------------------------

## 40. Common Error: Incorrect Argument Order

Suppose:

``` java
public static double divide(double numerator,
                            double denominator) {
    return numerator / denominator;
}
```

These calls produce different results:

``` java
divide(10, 2);
divide(2, 10);
```

Arguments are matched to parameters by position.

------------------------------------------------------------------------

## 41. Common Error: Expecting Primitive Arguments to Change

Incorrect assumption:

``` java
public static void doubleValue(int value) {
    value *= 2;
}
```

Calling:

``` java
int number = 5;
doubleValue(number);
```

does not change `number`.

If the transformed value is needed, return it:

``` java
public static int doubleValue(int value) {
    return value * 2;
}
```

Then:

``` java
number = doubleValue(number);
```

------------------------------------------------------------------------

## 42. Common Error: Confusing `void` and Value-Returning Methods

A `void` method cannot be used as though it produces a value.

Given:

``` java
public static void displayMessage() {
    System.out.println("Hello");
}
```

this is invalid:

``` java
// String message = displayMessage();
```

If a result is needed, define a value-returning method instead.

------------------------------------------------------------------------

## 43. Common Error: Scope Violations

Incorrect:

``` java
if (true) {
    int score = 90;
}

System.out.println(score);
```

`score` is no longer in scope outside the block.

Declare the variable in a wider scope when it must be used later:

``` java
int score;

if (true) {
    score = 90;
}

System.out.println(score);
```

------------------------------------------------------------------------

## 44. Testing Methods Independently

Small methods are easier to test than one large program.

Suppose:

``` java
public static boolean isEven(int number) {
    return number % 2 == 0;
}
```

Test several categories:

``` java
System.out.println(isEven(4));   // true
System.out.println(isEven(7));   // false
System.out.println(isEven(0));   // true
System.out.println(isEven(-2));  // true
```

Testing boundary and unusual values can reveal errors before the method
is integrated into a larger application.

------------------------------------------------------------------------

## 45. Putting the Concepts Together

The following example separates a simple student-result application into
focused methods.

``` java
import java.util.Scanner;

public class StudentResult {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter score: ");
        double score = input.nextDouble();

        if (isValidScore(score)) {

            char grade = determineGrade(score);
            displayResult(score, grade);

        }
        else {
            System.out.println("Invalid score.");
        }
    }

    public static boolean isValidScore(double score) {
        return score >= 0 && score <= 100;
    }

    public static char determineGrade(double score) {

        if (score >= 90)
            return 'A';
        else if (score >= 80)
            return 'B';
        else if (score >= 70)
            return 'C';
        else if (score >= 60)
            return 'D';
        else
            return 'F';
    }

    public static void displayResult(double score, char grade) {

        System.out.printf(
            "Score: %.1f%nGrade: %c%n",
            score,
            grade
        );
    }
}
```

This program demonstrates:

-   Method definitions
-   Method invocation
-   Formal parameters
-   Arguments
-   `boolean` return values
-   `char` return values
-   A `void` method
-   Method abstraction
-   Modular program organization

------------------------------------------------------------------------

## Check Your Understanding

1.  What problem do methods help solve in a large program?
2.  What is a method header?
3.  What is a method body?
4.  What is a method signature?
5.  Are return types part of method signatures?
6.  What is a formal parameter?
7.  What is an argument?
8.  How are arguments associated with parameters?
9.  What does the `return` statement do?
10. What is the difference between a value-returning method and a `void`
    method?
11. Why must every possible execution path of a value-returning method
    produce a value?
12. What happens when a primitive value is passed to a method?
13. Why does swapping two primitive parameters inside a method not swap
    the caller's variables?
14. What role does the call stack play during method invocation?
15. How can a `static` method in another class be invoked?
16. What is method overloading?
17. Can two methods be overloaded by changing only their return types?
18. What is an ambiguous method invocation?
19. What is the scope of a local variable?
20. Why can two separate, non-nested `for` loops each declare a variable
    named `i`?
21. What is method abstraction?
22. Why is a method sometimes described as a black box?
23. What is stepwise refinement?
24. What is a method stub?
25. How do top-down and bottom-up development differ?
26. Why does modular code generally make testing and debugging easier?
