# Java Elementary Programming

## Overview

Java programs become more useful when they can store information, accept input, perform calculations, and display meaningful results. This material introduces the fundamental programming tools used to build simple computational programs.

You will work with variables, constants, numeric data types, console input, arithmetic expressions, type conversion, and other essential Java operations.

## Learning Objectives

After completing this material, you should be able to:

- Declare and initialize variables.
- Use meaningful identifiers and Java naming conventions.
- Define constants using `final`.
- Work with Java numeric primitive data types.
- Read numeric input from the keyboard using `Scanner`.
- Perform arithmetic using Java numeric operators.
- Distinguish between integer and floating-point division.
- Use the remainder operator.
- Write and evaluate numeric expressions.
- Use `Math.pow()` for exponent calculations.
- Use augmented assignment operators.
- Apply increment and decrement operators.
- Convert values between numeric types.
- Apply basic input-process-output thinking to simple programming problems.
- Recognize common errors involving numeric computations.

---

## 1. Variables and Computation

A variable is a named storage location whose value can change while a program executes.

For example:

```java
double length = 8.5;
double width = 4.0;
double area = length * width;

System.out.println("Area: " + area);
```

In this example:

- `length` stores `8.5`.
- `width` stores `4.0`.
- `area` stores the result of the multiplication.

The program follows a common pattern:

```text
Input → Process → Output
```

Here, the input values are the dimensions, the process is multiplication, and the output is the calculated area.

---

## 2. Declaring Variables

Before using a variable, Java must know its data type and name.

General form:

```java
dataType variableName;
```

Examples:

```java
int studentCount;
double temperature;
char grade;
```

A variable may also be declared and initialized in one statement:

```java
int studentCount = 25;
double temperature = 72.5;
char grade = 'A';
```

### Assignment

The assignment operator `=` places a value into a variable.

```java
int score;
score = 85;
```

The value can later be changed:

```java
score = 92;
```

---

## 3. Identifiers

An identifier is a name used for program elements such as variables, methods, classes, and constants.

Examples:

```java
age
totalScore
calculateAverage
StudentRecord
```

An identifier:

- May contain letters, digits, `_`, and `$`.
- Cannot begin with a digit.
- Cannot be a Java reserved word.
- Cannot be `true`, `false`, or `null`.
- Is case-sensitive.

For example:

```java
score
Score
SCORE
```

are three different identifiers.

### Meaningful Names

Prefer descriptive names:

```java
double hourlyRate;
double totalCost;
int numberOfStudents;
```

Avoid names that provide little information:

```java
double x;
double a;
int n;
```

unless the meaning is obvious from the context.

---

## 4. Java Naming Conventions

Consistent naming makes programs easier to read.

### Variables and Methods

Begin with a lowercase letter. For multiple words, capitalize the first letter of each additional word.

```java
radius
accountBalance
calculateTotal
```

### Classes

Capitalize the first letter of each word.

```java
StudentAccount
TemperatureConverter
LoanCalculator
```

### Constants

Use uppercase letters and underscores.

```java
PI
MAX_SIZE
SALES_TAX_RATE
```

---

## 5. Constants

A constant stores a value that should not change after it has been assigned.

Java uses the keyword `final`.

```java
final double TAX_RATE = 0.0775;
final int DAYS_IN_WEEK = 7;
```

Example:

```java
double price = 50.0;
final double TAX_RATE = 0.0775;

double tax = price * TAX_RATE;
```

Using named constants improves readability and avoids repeating unexplained values throughout a program.

---

## 6. Numeric Primitive Data Types

Java provides several primitive types for numeric values.

| Type | Typical Use |
|---|---|
| `byte` | Very small integers |
| `short` | Small integers |
| `int` | General-purpose integers |
| `long` | Large integers |
| `float` | Single-precision decimal values |
| `double` | Double-precision decimal values |

Examples:

```java
byte level = 5;
short year = 2026;
int population = 500000;
long distance = 9000000000L;
float rate = 4.5F;
double price = 19.95;
```

For most general integer calculations, `int` is commonly used. For decimal calculations, `double` is commonly used.

---

## 7. Reading Input with Scanner

Programs often need values from the user.

First import `Scanner`:

```java
import java.util.Scanner;
```

Then create a `Scanner` object:

```java
Scanner input = new Scanner(System.in);
```

Example:

```java
import java.util.Scanner;

public class AgeInput {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter your age: ");
        int age = input.nextInt();

        System.out.println("Your age is " + age);
    }
}
```

### Common Scanner Methods

| Method | Reads |
|---|---|
| `nextByte()` | `byte` |
| `nextShort()` | `short` |
| `nextInt()` | `int` |
| `nextLong()` | `long` |
| `nextFloat()` | `float` |
| `nextDouble()` | `double` |

Example:

```java
System.out.print("Enter a price: ");
double price = input.nextDouble();
```

---

## 8. A Complete Input-Process-Output Example

Consider a program that calculates the total cost of several items.

```java
import java.util.Scanner;

public class PurchaseTotal {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter item price: ");
        double price = input.nextDouble();

        System.out.print("Enter quantity: ");
        int quantity = input.nextInt();

        double total = price * quantity;

        System.out.println("Total cost: $" + total);
    }
}
```

The program can be analyzed as:

```text
Input:
    price
    quantity

Process:
    total = price * quantity

Output:
    total
```

This approach is useful when planning a program before writing the code.

---

## 9. Numeric Operators

Java provides five basic arithmetic operators.

| Operator | Operation | Example |
|---|---|---|
| `+` | Addition | `8 + 3` |
| `-` | Subtraction | `8 - 3` |
| `*` | Multiplication | `8 * 3` |
| `/` | Division | `8 / 3` |
| `%` | Remainder | `8 % 3` |

Example:

```java
int a = 10;
int b = 3;

System.out.println(a + b);
System.out.println(a - b);
System.out.println(a * b);
System.out.println(a / b);
System.out.println(a % b);
```

---

## 10. Integer Division

Division behaves differently depending on the operand types.

```java
System.out.println(5 / 2);
```

Output:

```text
2
```

Both operands are integers, so Java performs integer division and discards the fractional portion.

Compare:

```java
System.out.println(5.0 / 2.0);
```

Output:

```text
2.5
```

If a decimal result is required, make sure at least one operand is a floating-point value.

```java
double average = (score1 + score2) / 2.0;
```

---

## 11. The Remainder Operator

The `%` operator returns the remainder after division.

```java
System.out.println(17 % 5);
```

Output:

```text
2
```

A common use is determining whether an integer is even or odd.

```java
int number = 24;

System.out.println(number % 2);
```

If the result is `0`, the number is even.

The remainder operator is also useful for converting quantities into smaller units, cycling through repeated ranges, and working with time.

---

## 12. Converting Seconds

Suppose a program receives a total number of seconds and needs to display minutes and remaining seconds.

```java
int totalSeconds = 145;

int minutes = totalSeconds / 60;
int seconds = totalSeconds % 60;

System.out.println(minutes + " minutes");
System.out.println(seconds + " seconds");
```

Output:

```text
2 minutes
25 seconds
```

Integer division determines the complete minutes, while `%` determines what remains.

---

## 13. Numeric Literals

A literal is a value written directly in source code.

```java
int count = 25;
double price = 12.75;
long population = 9000000000L;
float rate = 3.5F;
```

Examples of integer literals:

```java
10
250
1000000
```

Examples of floating-point literals:

```java
5.0
12.75
0.125
```

A floating-point literal is treated as a `double` by default.

Use `F` or `f` for a `float`:

```java
float value = 10.5F;
```

Use `L` or `l` for a `long` literal when needed. Uppercase `L` is easier to distinguish from the digit `1`.

```java
long value = 5000000000L;
```

---

## 14. Scientific Notation

Java supports scientific notation for floating-point values.

```java
double largeValue = 1.25e6;
double smallValue = 3.5e-4;
```

These represent:

```text
1.25 × 10^6
3.5 × 10^-4
```

Both uppercase `E` and lowercase `e` may be used.

---

## 15. Floating-Point Precision

Floating-point values are approximations in computer memory. Some decimal calculations may therefore produce results with small precision differences.

For example:

```java
System.out.println(1.0 - 0.9);
```

The displayed result may not be represented internally as exactly `0.1`.

This is an important consideration when working with decimal calculations.

---

## 16. Exponent Operations

Java provides `Math.pow()` for exponentiation.

General form:

```java
Math.pow(base, exponent)
```

Examples:

```java
System.out.println(Math.pow(3, 2));
System.out.println(Math.pow(2, 5));
System.out.println(Math.pow(9, 0.5));
```

`Math.pow()` returns a `double`.

Example:

```java
double side = 4.0;
double squareArea = Math.pow(side, 2);

System.out.println(squareArea);
```

---

## 17. Arithmetic Expressions

Java expressions follow standard arithmetic precedence.

For example:

```java
double result = 5 + 3 * 4;
```

Multiplication occurs before addition, so the result is:

```text
17
```

Parentheses can change the order:

```java
double result = (5 + 3) * 4;
```

Now the result is:

```text
32
```

Use parentheses when they improve clarity, even when they are not strictly required.

---

## 18. Temperature Conversion Example

A practical program can combine input, arithmetic expressions, and output.

```java
import java.util.Scanner;

public class TemperatureConverter {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter Fahrenheit temperature: ");
        double fahrenheit = input.nextDouble();

        double celsius = (fahrenheit - 32) * 5.0 / 9.0;

        System.out.println("Celsius: " + celsius);
    }
}
```

Notice the use of `5.0` and `9.0` to ensure floating-point division.

---

## 19. Augmented Assignment Operators

An augmented assignment operator combines an arithmetic operation with assignment.

Instead of:

```java
score = score + 5;
```

you can write:

```java
score += 5;
```

Common forms:

| Operator | Example | Equivalent |
|---|---|---|
| `+=` | `x += 5` | `x = x + 5` |
| `-=` | `x -= 5` | `x = x - 5` |
| `*=` | `x *= 5` | `x = x * 5` |
| `/=` | `x /= 5` | `x = x / 5` |
| `%=` | `x %= 5` | `x = x % 5` |

These operators make simple updates more concise.

---

## 20. Increment and Decrement Operators

Java provides shorthand operators for increasing or decreasing a variable by one.

```java
count++;
count--;
```

These are equivalent to:

```java
count = count + 1;
count = count - 1;
```

Java also provides prefix forms:

```java
++count;
--count;
```

When used by themselves as statements, the prefix and postfix forms have the same final effect on the variable.

When used inside a larger expression, their behavior differs.

### Postincrement

```java
int x = 5;
int y = x++;
```

After execution:

```text
y = 5
x = 6
```

### Preincrement

```java
int x = 5;
int y = ++x;
```

After execution:

```text
x = 6
y = 6
```

Avoid overly complicated expressions involving several increment or decrement operations. Clear code is usually preferable to shorter code.

---

## 21. Numeric Type Conversion

Java sometimes converts numeric values automatically.

For example:

```java
int count = 10;
double result = count;
```

The integer value can be widened to a `double`.

When an expression contains different numeric types, Java promotes values as needed for the calculation.

For example:

```java
int quantity = 4;
double price = 2.5;

double total = quantity * price;
```

The result is a `double`.

---

## 22. Explicit Type Casting

Sometimes you need to explicitly convert a value.

General form:

```java
(type) value
```

Example:

```java
double value = 9.8;
int wholeNumber = (int) value;
```

After the cast:

```text
wholeNumber = 9
```

The fractional portion is truncated, not rounded.

Another example:

```java
int total = 7;
int count = 2;

double average = (double) total / count;
```

Casting `total` to `double` causes floating-point division.

---

## 23. A Simple Program Development Process

Before writing code, identify what the program needs to accomplish.

A useful workflow is:

```text
Requirements
    ↓
Analyze the problem
    ↓
Identify input, process, and output
    ↓
Design the solution
    ↓
Implement the program
    ↓
Test the program
    ↓
Improve and maintain the program
```

For small introductory programs, the Input-Process-Output model is especially useful.

### Example: Trip Cost

**Input**

```text
distance
fuel efficiency
fuel price
```

**Process**

```text
gallonsNeeded = distance / fuelEfficiency
tripCost = gallonsNeeded * fuelPrice
```

**Output**

```text
tripCost
```

This planning can be completed before writing Java code.

---

## 24. Common Errors and Pitfalls

### Using a Variable Before It Has a Value

```java
double total;
System.out.println(total);
```

A local variable must be initialized before it is used.

### Integer Overflow

Numeric types have finite ranges. A calculation that exceeds the range of an integer type can produce an unexpected value.

Choose a type appropriate for the expected data.

### Floating-Point Round-Off

Decimal values may not always be represented exactly.

Do not assume every floating-point calculation will produce an exact decimal representation.

### Unintended Integer Division

```java
int score1 = 7;
int score2 = 8;

double average = (score1 + score2) / 2;
```

The division is performed using integers before the result is assigned to `double`.

A better expression is:

```java
double average = (score1 + score2) / 2.0;
```

### Creating Unnecessary Scanner Objects

A program normally needs only one `Scanner` object for reading from `System.in`.

Prefer:

```java
Scanner input = new Scanner(System.in);

int age = input.nextInt();
double salary = input.nextDouble();
```

rather than creating a new `Scanner` for every input value.

---

## 25. Putting the Concepts Together

The following program combines several elementary programming concepts.

```java
import java.util.Scanner;

public class FuelCostCalculator {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter trip distance in miles: ");
        double distance = input.nextDouble();

        System.out.print("Enter vehicle miles per gallon: ");
        double milesPerGallon = input.nextDouble();

        System.out.print("Enter fuel price per gallon: ");
        double pricePerGallon = input.nextDouble();

        double gallonsNeeded = distance / milesPerGallon;
        double totalCost = gallonsNeeded * pricePerGallon;

        System.out.println("Estimated gallons needed: " + gallonsNeeded);
        System.out.println("Estimated fuel cost: $" + totalCost);
    }
}
```

This program demonstrates:

- Variables
- `double` values
- Console input
- Arithmetic expressions
- Assignment
- Input-process-output design
- Console output

---

## Check Your Understanding

1. What is the difference between declaring and initializing a variable?
2. Why should variable names be meaningful?
3. What is the purpose of the `final` keyword?
4. What is the difference between `int` and `double`?
5. What does `Scanner` allow a Java program to do?
6. What is the result of `11 / 4` when both values are integers?
7. What is the result of `11 % 4`?
8. Why would you use `Math.pow()`?
9. What is the difference between `x++` and `++x` when they appear inside a larger expression?
10. What happens when a `double` is explicitly cast to an `int`?
11. Why can floating-point calculations sometimes display unexpected decimal digits?
12. What are the three parts of the Input-Process-Output model?
13. Why can a program compile successfully and still produce an incorrect numeric result?
