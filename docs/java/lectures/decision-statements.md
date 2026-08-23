# Decision Statements in Java

## Overview

Programs often need to make decisions rather than execute every statement in the same sequence. A decision is based on a condition that evaluates to either `true` or `false`.

Java provides several tools for controlling which statements execute:

- Boolean values and expressions
- Relational operators
- `if` statements
- `if-else` statements
- Nested and multi-way decisions
- Logical operators
- `switch` statements
- Conditional expressions

These constructs allow a program to respond differently to different input values and situations.

---

## Learning Objectives

After completing this material, you should be able to:

- Declare and use `boolean` variables.
- Construct Boolean expressions using relational operators.
- Write one-way `if` statements.
- Write two-way `if-else` statements.
- Create multi-way decisions using `else if`.
- Use nested decision statements.
- Combine conditions using logical operators.
- Generate simple random values with `Math.random()`.
- Use `switch` statements for discrete choices.
- Write simple conditional expressions using the ternary operator.
- Apply operator precedence when evaluating Boolean expressions.
- Recognize common errors in selection statements.
- Trace and debug programs containing decision logic.

---

## 1. Why Programs Need Decisions

Consider a program that calculates the area of a circle.

```java
double radius = -5.0;
double area = Math.PI * radius * radius;

System.out.println(area);
```

Mathematically, the calculation produces a number, but a negative radius is not valid input for this problem.

A better program should first ask:

```text
Is the radius valid?
```

Only then should it perform the calculation.

This introduces **selection**: choosing whether a statement or group of statements should execute.

---

## 2. The `boolean` Data Type

The Java `boolean` type has only two possible values:

```java
true
false
```

Example:

```java
boolean isRegistered = true;
boolean hasCompletedLab = false;
```

A Boolean value can also be produced by a comparison:

```java
int score = 85;

boolean passed = score >= 70;
```

Since `85 >= 70` is true, `passed` receives the value `true`.

---

## 3. Relational Operators

Relational operators compare two values and produce a Boolean result.

| Operator | Meaning | Example |
|---|---|---|
| `<` | Less than | `age < 18` |
| `<=` | Less than or equal to | `score <= 100` |
| `>` | Greater than | `temperature > 90` |
| `>=` | Greater than or equal to | `score >= 70` |
| `==` | Equal to | `choice == 1` |
| `!=` | Not equal to | `count != 0` |

Example:

```java
int temperature = 75;

System.out.println(temperature > 70);
System.out.println(temperature == 75);
System.out.println(temperature < 50);
```

Output:

```text
true
true
false
```

### Equality vs. Assignment

Do not confuse:

```java
=
```

with:

```java
==
```

The single equals sign assigns a value:

```java
int x = 5;
```

The double equals sign compares values:

```java
x == 5
```

---

## 4. One-Way `if` Statements

A one-way `if` statement executes code only when a condition is true.

General form:

```java
if (booleanExpression) {
    statement;
}
```

Example:

```java
int temperature = 95;

if (temperature > 90) {
    System.out.println("High temperature warning.");
}
```

If the condition is false, Java skips the body of the `if` statement.

### Example: Validating Input

```java
double radius = 6.0;

if (radius >= 0) {
    double area = Math.PI * radius * radius;
    System.out.println("Area: " + area);
}
```

The calculation occurs only when the radius is nonnegative.

---

## 5. Independent `if` Statements

More than one `if` statement can be tested independently.

```java
int number = 30;

if (number % 5 == 0) {
    System.out.println("The number is divisible by 5.");
}

if (number % 2 == 0) {
    System.out.println("The number is even.");
}
```

Both messages can appear because these are two separate decisions.

This is different from an `if-else` structure, where only one of two alternatives executes.

---

## 6. Two-Way `if-else` Statements

An `if-else` statement chooses between two alternatives.

General form:

```java
if (condition) {
    // Executes when condition is true
}
else {
    // Executes when condition is false
}
```

Example:

```java
int number = 17;

if (number % 2 == 0) {
    System.out.println("Even");
}
else {
    System.out.println("Odd");
}
```

Exactly one branch executes.

---

## 7. Input Validation with `if-else`

Selection statements are useful for rejecting invalid input.

```java
import java.util.Scanner;

public class CircleArea {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter radius: ");
        double radius = input.nextDouble();

        if (radius >= 0) {
            double area = Math.PI * radius * radius;
            System.out.println("Area: " + area);
        }
        else {
            System.out.println("Radius cannot be negative.");
        }
    }
}
```

This is safer than performing the calculation without first checking the input.

---

## 8. Multi-Way `if-else` Statements

Some problems have more than two possible outcomes.

For example, a program may classify a numeric score.

```java
double score = 84;

if (score >= 90) {
    System.out.println("A");
}
else if (score >= 80) {
    System.out.println("B");
}
else if (score >= 70) {
    System.out.println("C");
}
else if (score >= 60) {
    System.out.println("D");
}
else {
    System.out.println("F");
}
```

Java evaluates the conditions from top to bottom.

Once a true condition is found, its branch executes and the remaining branches are skipped.

### Order Matters

Consider:

```java
if (score >= 60) {
    System.out.println("D or better");
}
else if (score >= 90) {
    System.out.println("A");
}
```

A score of `95` satisfies the first condition, so the second condition is never reached.

When testing ranges, conditions should normally be arranged carefully from the most restrictive boundary to the broader alternatives.

---

## 9. Nested `if` Statements

An `if` statement can appear inside another `if` statement.

```java
int age = 22;
boolean hasTicket = true;

if (age >= 18) {

    if (hasTicket) {
        System.out.println("Entry permitted.");
    }
}
```

The inner condition is tested only if the outer condition is true.

Nested decisions are useful when one decision depends on another.

However, deeply nested code can become difficult to read. Use clear indentation and braces.

---

## 10. The Dangling `else`

An `else` is associated with the nearest unmatched `if` in the same block.

For example:

```java
if (x > 0)
    if (y > 0)
        System.out.println("Both are positive.");
    else
        System.out.println("y is not positive.");
```

The `else` belongs to:

```java
if (y > 0)
```

not:

```java
if (x > 0)
```

Braces make the intended structure clearer:

```java
if (x > 0) {
    if (y > 0) {
        System.out.println("Both are positive.");
    }
    else {
        System.out.println("y is not positive.");
    }
}
```

A good programming habit is to use braces consistently, even when Java allows them to be omitted.

---

## 11. A Common `if` Statement Error

Consider:

```java
if (score >= 70);
{
    System.out.println("Passing");
}
```

The semicolon ends the `if` statement.

The block that follows is therefore not controlled by the condition and executes regardless of the value of `score`.

Correct version:

```java
if (score >= 70) {
    System.out.println("Passing");
}
```

This can be particularly difficult to notice because the program may compile successfully.

---

## 12. Comparing Boolean Values

Suppose:

```java
boolean active = true;
```

You could write:

```java
if (active == true) {
    System.out.println("Account is active.");
}
```

However, the simpler form is:

```java
if (active) {
    System.out.println("Account is active.");
}
```

To test for false:

```java
if (!active) {
    System.out.println("Account is inactive.");
}
```

---

## 13. Logical Operators

Logical operators combine or modify Boolean expressions.

| Operator | Meaning |
|---|---|
| `!` | NOT |
| `&&` | AND |
| `||` | OR |
| `^` | Exclusive OR |

---

## 14. Logical NOT: `!`

The NOT operator reverses a Boolean value.

```java
boolean loggedIn = false;

if (!loggedIn) {
    System.out.println("Please log in.");
}
```

If `loggedIn` is false, `!loggedIn` is true.

Truth table:

| `p` | `!p` |
|---|---|
| `true` | `false` |
| `false` | `true` |

---

## 15. Logical AND: `&&`

The AND operator produces `true` only when both conditions are true.

```java
int age = 20;
boolean hasID = true;

if (age >= 18 && hasID) {
    System.out.println("Requirements satisfied.");
}
```

Truth table:

| `p` | `q` | `p && q` |
|---|---|---|
| false | false | false |
| false | true | false |
| true | false | false |
| true | true | true |

### Checking a Range

Java does not support mathematical chained comparisons such as:

```text
0 <= score <= 100
```

Instead, write:

```java
score >= 0 && score <= 100
```

Example:

```java
if (score >= 0 && score <= 100) {
    System.out.println("Valid score.");
}
```

---

## 16. Logical OR: `||`

The OR operator produces `true` when at least one condition is true.

```java
if (day == 6 || day == 7) {
    System.out.println("Weekend");
}
```

Truth table:

| `p` | `q` | `p || q` |
|---|---|---|
| false | false | false |
| false | true | true |
| true | false | true |
| true | true | true |

---

## 17. Exclusive OR: `^`

Exclusive OR is true when exactly one of the two conditions is true.

Truth table:

| `p` | `q` | `p ^ q` |
|---|---|---|
| false | false | false |
| false | true | true |
| true | false | true |
| true | true | false |

Example:

```java
boolean online = true;
boolean inPerson = false;

if (online ^ inPerson) {
    System.out.println("Exactly one delivery mode was selected.");
}
```

---

## 18. Combining Conditions

Logical operators allow programs to express more realistic rules.

Example:

```java
int age = 21;
double balance = 150.0;

if (age >= 18 && balance >= 100) {
    System.out.println("Requirement satisfied.");
}
```

Another example:

```java
int number = 18;

if (number % 2 == 0 && number % 3 == 0) {
    System.out.println("Divisible by both 2 and 3.");
}
```

To test whether it is divisible by either:

```java
if (number % 2 == 0 || number % 3 == 0) {
    System.out.println("Divisible by 2 or 3.");
}
```

---

## 19. Short-Circuit Evaluation

Java's `&&` and `||` operators use short-circuit evaluation.

For:

```java
condition1 && condition2
```

if `condition1` is false, the entire expression must be false, so Java does not need to evaluate `condition2`.

For:

```java
condition1 || condition2
```

if `condition1` is true, the entire expression must be true, so Java does not need to evaluate `condition2`.

This behavior can also prevent unsafe operations.

Example:

```java
int denominator = 0;
int numerator = 10;

if (denominator != 0 && numerator / denominator > 2) {
    System.out.println("Condition satisfied.");
}
```

Because `denominator != 0` is false, Java does not evaluate the division expression.

---

## 20. Generating Random Numbers

`Math.random()` produces a `double` value in the range:

```text
0.0 <= value < 1.0
```

Example:

```java
double value = Math.random();
```

To generate an integer from `0` through `9`:

```java
int number = (int) (Math.random() * 10);
```

To generate an integer from `1` through `6`:

```java
int die = (int) (Math.random() * 6) + 1;
```

Random values can be combined with selection statements to create quizzes, games, simulations, and testing activities.

---

## 21. Example: Random Arithmetic Practice

```java
import java.util.Scanner;

public class MathPractice {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        int number1 = (int) (Math.random() * 10);
        int number2 = (int) (Math.random() * 10);

        System.out.print(
            "What is " + number1 + " + " + number2 + "? "
        );

        int answer = input.nextInt();

        if (answer == number1 + number2) {
            System.out.println("Correct.");
        }
        else {
            System.out.println(
                "Incorrect. The answer is " +
                (number1 + number2)
            );
        }
    }
}
```

This example combines:

- Random numbers
- Console input
- Arithmetic
- Relational operators
- `if-else`

---

## 22. Example: Leap Year Decision

Some decisions require several conditions.

A year is a leap year when:

- It is divisible by 4 but not divisible by 100, **or**
- It is divisible by 400.

This can be represented as:

```java
boolean leapYear =
    (year % 4 == 0 && year % 100 != 0)
    || year % 400 == 0;
```

Example:

```java
int year = 2028;

if ((year % 4 == 0 && year % 100 != 0)
        || year % 400 == 0) {
    System.out.println(year + " is a leap year.");
}
else {
    System.out.println(year + " is not a leap year.");
}
```

This demonstrates how logical operators can express a rule containing multiple requirements.

---

## 23. `switch` Statements

A `switch` statement is useful when one expression can have several discrete values.

General form:

```java
switch (expression) {

    case value1:
        statements;
        break;

    case value2:
        statements;
        break;

    default:
        statements;
}
```

Example:

```java
int menuChoice = 2;

switch (menuChoice) {

    case 1:
        System.out.println("Create record");
        break;

    case 2:
        System.out.println("View record");
        break;

    case 3:
        System.out.println("Delete record");
        break;

    default:
        System.out.println("Invalid selection");
}
```

---

## 24. The Role of `break`

The `break` statement terminates the current `switch` branch.

Without `break`, execution continues into the next case.

Example:

```java
int choice = 1;

switch (choice) {

    case 1:
        System.out.println("One");

    case 2:
        System.out.println("Two");
        break;
}
```

Output:

```text
One
Two
```

This behavior is called **fall-through**.

Fall-through can occasionally be intentional, but accidental omission of `break` is a common source of logic errors.

---

## 25. The `default` Case

The `default` case executes when none of the listed cases matches.

```java
switch (choice) {

    case 1:
        System.out.println("Option A");
        break;

    case 2:
        System.out.println("Option B");
        break;

    default:
        System.out.println("Invalid option");
}
```

The `default` branch is useful for handling unexpected input.

---

## 26. `if-else` or `switch`?

Both structures perform selection, but they are useful in different situations.

Use `if-else` when conditions involve:

- Ranges
- Relational comparisons
- Multiple variables
- Compound Boolean expressions

Example:

```java
if (temperature >= 70 && temperature <= 85) {
    System.out.println("Comfortable");
}
```

A `switch` is often convenient when comparing one expression against several discrete values.

Example:

```java
switch (menuChoice) {
    case 1:
        // ...
        break;
    case 2:
        // ...
        break;
}
```

Choose the structure that makes the program easiest to understand.

---

## 27. The Conditional Operator

Java provides a compact conditional expression using:

```text
? :
```

General form:

```java
condition ? valueIfTrue : valueIfFalse
```

Example:

```java
int number = 8;

String result = (number % 2 == 0) ? "Even" : "Odd";

System.out.println(result);
```

This is similar to:

```java
String result;

if (number % 2 == 0) {
    result = "Even";
}
else {
    result = "Odd";
}
```

The conditional operator is most useful for short, simple choices.

For complicated logic, an `if-else` statement is usually easier to read.

---

## 28. Operator Precedence in Boolean Expressions

Expressions containing several operators are evaluated according to Java's precedence rules.

A simplified order for operators commonly used in decision statements is:

1. Parentheses
2. Unary operators such as `!`
3. Multiplication, division, and remainder: `*`, `/`, `%`
4. Addition and subtraction: `+`, `-`
5. Relational operators: `<`, `<=`, `>`, `>=`
6. Equality operators: `==`, `!=`
7. Exclusive OR: `^`
8. Logical AND: `&&`
9. Logical OR: `||`
10. Assignment operators

Example:

```java
int x = 8;
int y = 3;

boolean result = x > 5 && y < 10;
```

The relational comparisons are evaluated before `&&`.

Even when precedence rules make parentheses unnecessary, parentheses can improve readability:

```java
boolean result = (x > 5) && (y < 10);
```

---

## 29. Common Errors and Pitfalls

### Using `=` Instead of `==`

Incorrect:

```java
if (choice = 1) {
```

For numeric comparison, use:

```java
if (choice == 1) {
```

### Adding a Semicolon After `if`

Incorrect:

```java
if (temperature > 90);
{
    System.out.println("Warning");
}
```

Correct:

```java
if (temperature > 90) {
    System.out.println("Warning");
}
```

### Incorrect Range Expression

Incorrect Java:

```java
if (0 <= score <= 100) {
```

Correct:

```java
if (score >= 0 && score <= 100) {
```

### Incorrect `else if` Ordering

Check broader and narrower ranges carefully. A true earlier branch prevents later branches from being tested.

### Missing `break` in `switch`

An omitted `break` may cause unintended fall-through.

### Confusing Independent Decisions with Alternatives

These are independent:

```java
if (condition1) {
    // ...
}

if (condition2) {
    // ...
}
```

These are alternatives:

```java
if (condition1) {
    // ...
}
else if (condition2) {
    // ...
}
```

---

## 30. Tracing Decision Statements

Tracing means following a program manually to determine which statements execute.

Consider:

```java
int score = 76;

if (score >= 90) {
    System.out.println("A");
}
else if (score >= 80) {
    System.out.println("B");
}
else if (score >= 70) {
    System.out.println("C");
}
else {
    System.out.println("Below C");
}
```

Trace:

```text
score >= 90 → false
score >= 80 → false
score >= 70 → true
```

Output:

```text
C
```

The remaining branch is skipped after the true condition is found.

---

## 31. Debugging Selection Logic

A program can compile successfully and still contain incorrect decision logic.

For example:

```java
int score = 85;

if (score >= 70) {
    System.out.println("C");
}
else if (score >= 80) {
    System.out.println("B");
}
else if (score >= 90) {
    System.out.println("A");
}
```

The program compiles, but its ordering is logically incorrect.

Useful debugging techniques include:

- Hand-tracing conditions
- Testing boundary values
- Printing intermediate variable values
- Checking which branch executes
- Using breakpoints in an IDE
- Stepping through the program one statement at a time

---

## 32. Testing Boundary Values

Decision statements should be tested near their boundaries.

Suppose:

```java
if (score >= 70) {
    System.out.println("Pass");
}
else {
    System.out.println("Not Pass");
}
```

Useful test values include:

```text
69
70
71
```

These values test:

- Just below the boundary
- Exactly at the boundary
- Just above the boundary

For a range:

```java
score >= 0 && score <= 100
```

use tests such as:

```text
-1
0
1
99
100
101
```

Boundary testing helps reveal incorrect relational operators and missing cases.

---

## 33. Putting the Concepts Together

The following program combines input, relational operators, logical operators, and multi-way selection.

```java
import java.util.Scanner;

public class CourseResult {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter score (0-100): ");
        double score = input.nextDouble();

        if (score < 0 || score > 100) {
            System.out.println("Invalid score.");
        }
        else if (score >= 90) {
            System.out.println("Grade: A");
        }
        else if (score >= 80) {
            System.out.println("Grade: B");
        }
        else if (score >= 70) {
            System.out.println("Grade: C");
        }
        else if (score >= 60) {
            System.out.println("Grade: D");
        }
        else {
            System.out.println("Grade: F");
        }
    }
}
```

Notice that the program first validates the input before classifying it.

---

## Check Your Understanding

1. What values can a `boolean` variable contain?
2. What is the difference between `=` and `==`?
3. What does the expression `x != 10` mean?
4. When is the body of a one-way `if` statement executed?
5. How does an `if-else` statement differ from two independent `if` statements?
6. Why does the order of conditions matter in a multi-way `if-else` statement?
7. Which `if` receives an `else` when braces are omitted?
8. What is the difference between `&&` and `||`?
9. When does `^` evaluate to true?
10. Why are `&&` and `||` described as short-circuit operators?
11. How would you test whether `age` is between 18 and 65 inclusive?
12. What range of values can `Math.random()` produce?
13. What is the purpose of `break` in a `switch` statement?
14. What can happen if a `break` statement is omitted?
15. When might `switch` be clearer than a multi-way `if-else` statement?
16. What does the conditional operator `? :` do?
17. Why are boundary values useful when testing decision statements?
18. How can a selection statement contain a logic error even when the program compiles successfully?
