# Loops in Java

## Overview

Many programming tasks require the same operation to be performed
repeatedly. Writing the same statement many times is inefficient and
difficult to maintain. **Loops** allow a program to repeat a block of
code while a condition remains true or for a specified number of
iterations.

Java provides three primary loop structures:

-   `while`
-   `do-while`
-   `for`

Although these loop structures can often solve the same problems, each
is especially useful in particular situations.

------------------------------------------------------------------------

## Learning Objectives

After completing this material, you should be able to:

-   Explain why loops are useful in programming.
-   Design and trace a `while` loop.
-   Identify initialization, continuation condition, loop body, and
    update operations.
-   Develop counter-controlled and condition-controlled loops.
-   Use sentinel values when the number of inputs is unknown.
-   Write `do-while` loops when the body must execute at least once.
-   Write `for` loops for controlled repetition.
-   Select an appropriate loop structure for a programming problem.
-   Create nested loops.
-   Use accumulators and counters to process repeated data.
-   Avoid common infinite-loop and off-by-one errors.
-   Reduce problems caused by floating-point values in loop control.
-   Use `break` and `continue` appropriately.
-   Apply loops to computational problems such as greatest common
    divisor, growth calculations, number conversion, palindrome
    checking, and prime-number generation.

------------------------------------------------------------------------

## 1. Why Use Loops?

Suppose a program must display the same message 100 times.

Without a loop, the program would require many repeated statements:

``` java
System.out.println("Learning Java");
System.out.println("Learning Java");
System.out.println("Learning Java");
// many more...
```

A loop expresses the repetition directly:

``` java
int count = 0;

while (count < 100) {
    System.out.println("Learning Java");
    count++;
}
```

This version is shorter, easier to modify, and clearly communicates that
the operation is repetitive.

------------------------------------------------------------------------

## 2. The Basic Loop Design

A typical loop contains four important components:

1.  **Initialization** --- establishes the starting state.
2.  **Continuation condition** --- determines whether another iteration
    should execute.
3.  **Loop body** --- contains the statements that repeat.
4.  **Update** --- changes a value so that the loop eventually reaches
    its stopping condition.

Example:

``` java
int count = 1;              // Initialization

while (count <= 5) {        // Continuation condition
    System.out.println(count); // Loop body
    count++;                // Update
}
```

Output:

``` text
1
2
3
4
5
```

An **iteration** is one execution of the loop body.

------------------------------------------------------------------------

## 3. The `while` Loop

General form:

``` java
while (condition) {
    // Statements
}
```

Java evaluates the condition **before** executing the body.

If the condition is `true`, the body executes. Java then returns to the
condition and tests it again. When the condition becomes `false`, the
loop terminates.

Example:

``` java
int number = 1;

while (number <= 5) {
    System.out.println(number);
    number++;
}
```

Because the condition is checked first, a `while` loop can execute
**zero times**.

``` java
int number = 10;

while (number < 5) {
    System.out.println(number);
}
```

The body never executes because `number < 5` is false initially.

------------------------------------------------------------------------

## 4. Tracing a `while` Loop

Consider:

``` java
int count = 0;

while (count < 3) {
    System.out.println("Java");
    count++;
}
```

Trace:

  Iteration     `count` Before Test  `count < 3`  Action
  ----------- --------------------- ------------- ---------------------
  1                               0     true      Print and increment
  2                               1     true      Print and increment
  3                               2     true      Print and increment
  ---                             3     false     Exit loop

Output:

``` text
Java
Java
Java
```

Tracing is an effective technique for understanding and debugging loop
behavior.

------------------------------------------------------------------------

## 5. Counter-Controlled Loops

A **counter-controlled loop** executes a known number of times.

Example:

``` java
int count = 1;

while (count <= 10) {
    System.out.println("Iteration " + count);
    count++;
}
```

The variable `count` acts as the loop counter.

A counter usually requires:

``` text
starting value
stopping condition
increment or decrement
```

Changing any of these can change the number of iterations.

------------------------------------------------------------------------

## 6. Accumulators

An **accumulator** stores a running result as a loop executes.

Example: sum the integers from 1 through 5.

``` java
int number = 1;
int sum = 0;

while (number <= 5) {
    sum += number;
    number++;
}

System.out.println("Sum: " + sum);
```

Output:

``` text
Sum: 15
```

Here:

-   `number` is the counter.
-   `sum` is the accumulator.

Counters and accumulators are frequently used together.

------------------------------------------------------------------------

## 7. Repeating Until a Condition Is Satisfied

The number of iterations is not always known in advance.

Suppose a program asks the user to solve a problem until the answer is
correct.

``` java
import java.util.Scanner;

public class RepeatUntilCorrect {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        int answer = -1;

        while (answer != 12) {
            System.out.print("What is 7 + 5? ");
            answer = input.nextInt();

            if (answer != 12) {
                System.out.println("Try again.");
            }
        }

        System.out.println("Correct!");
    }
}
```

The loop continues based on a condition rather than a predetermined
number of repetitions.

------------------------------------------------------------------------

## 8. Sentinel-Controlled Loops

Sometimes a program must process an unknown number of values.

A **sentinel value** is a special input value that signals the end of
input.

Suppose `0` is used as the sentinel:

``` java
import java.util.Scanner;

public class SumValues {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        int sum = 0;

        System.out.print("Enter an integer (0 to stop): ");
        int number = input.nextInt();

        while (number != 0) {
            sum += number;

            System.out.print("Enter an integer (0 to stop): ");
            number = input.nextInt();
        }

        System.out.println("Sum: " + sum);
    }
}
```

The sentinel should normally be a value that is not intended to be
processed as ordinary data.

------------------------------------------------------------------------

## 9. Input Redirection

Programs that require large amounts of input can be inconvenient to test
by manually entering every value.

One approach is to store test data in a file and redirect that file to
the program's standard input from the command line.

Conceptually:

``` text
java ProgramName < input.txt
```

If the program reads from `System.in`, the values can be supplied from
the file instead of typed one at a time.

This can make repeated testing with large datasets more efficient.

------------------------------------------------------------------------

## 10. Avoid Floating-Point Equality for Loop Control

Floating-point numbers are represented approximately in a computer.

Therefore, a loop such as:

``` java
double value = 1.0;

while (value != 0.0) {
    value -= 0.1;
}
```

is risky. Repeated subtraction may not produce exactly `0.0`.

A safer design is often to use an integer counter:

``` java
for (int i = 10; i >= 1; i--) {
    double value = i / 10.0;
    System.out.println(value);
}
```

When possible, use integer-controlled iteration rather than relying on
exact equality between repeatedly modified floating-point values.

------------------------------------------------------------------------

## 11. The `do-while` Loop

General form:

``` java
do {
    // Loop body
} while (condition);
```

Unlike a `while` loop, a `do-while` loop checks its condition **after**
executing the body.

Therefore, the body executes at least once.

Example:

``` java
int number = 1;

do {
    System.out.println(number);
    number++;
} while (number <= 5);
```

Output:

``` text
1
2
3
4
5
```

Notice the semicolon after:

``` java
while (condition);
```

It is required in a `do-while` statement.

------------------------------------------------------------------------

## 12. When `do-while` Is Useful

A `do-while` loop is appropriate when an action should occur before
deciding whether to repeat it.

A menu is a common example:

``` java
import java.util.Scanner;

public class MenuExample {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);
        int choice;

        do {
            System.out.println("1. View Profile");
            System.out.println("2. Settings");
            System.out.println("0. Exit");
            System.out.print("Choice: ");

            choice = input.nextInt();

        } while (choice != 0);

        System.out.println("Program ended.");
    }
}
```

The menu appears at least once.

------------------------------------------------------------------------

## 13. The `for` Loop

A `for` loop combines initialization, continuation condition, and update
into one statement.

General form:

``` java
for (initialization; condition; update) {
    // Loop body
}
```

Example:

``` java
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
```

Output:

``` text
1
2
3
4
5
```

The execution sequence is:

``` text
Initialization
      ↓
Condition
      ↓ true
Loop body
      ↓
Update
      ↓
Condition again
```

The initialization executes only once.

------------------------------------------------------------------------

## 14. Tracing a `for` Loop

Consider:

``` java
for (int i = 0; i < 3; i++) {
    System.out.println(i);
}
```

Trace:

  Step            `i`  Condition  Action
  ------------- ----- ----------- -----------------
  Initialize        0     ---     Set `i` to 0
  Iteration 1       0    true     Print 0
  Update            1     ---     `i++`
  Iteration 2       1    true     Print 1
  Update            2     ---     `i++`
  Iteration 3       2    true     Print 2
  Update            3     ---     `i++`
  Exit              3    false    Loop terminates

------------------------------------------------------------------------

## 15. Counting Backward

A `for` loop can decrement instead of increment.

``` java
for (int i = 5; i >= 1; i--) {
    System.out.println(i);
}
```

Output:

``` text
5
4
3
2
1
```

The update does not have to be `i++`. It can use another appropriate
expression.

------------------------------------------------------------------------

## 16. Changing the Step Size

A loop can change its counter by more than one.

Print even numbers from 2 through 10:

``` java
for (int i = 2; i <= 10; i += 2) {
    System.out.println(i);
}
```

Output:

``` text
2
4
6
8
10
```

------------------------------------------------------------------------

## 17. Multiple Expressions in a `for` Loop

The initialization and update portions of a `for` loop can contain
multiple comma-separated expressions.

Example:

``` java
for (int left = 1, right = 10;
     left < right;
     left++, right--) {

    System.out.println(left + " " + right);
}
```

Although Java permits this form, simple loop headers are generally
easier to read.

------------------------------------------------------------------------

## 18. Choosing a Loop Structure

The three loop structures can often be converted from one form to
another, but one form may express the intent more clearly.

### Use a `for` loop when:

-   The number of repetitions is known or naturally counter-controlled.
-   Initialization and update belong naturally in the loop header.

Example:

``` java
for (int i = 0; i < 100; i++) {
    // Repeat 100 times
}
```

### Use a `while` loop when:

-   The number of repetitions is not known in advance.
-   Repetition depends on input or another changing condition.

Example:

``` java
while (number != 0) {
    // Continue until sentinel
}
```

### Use a `do-while` loop when:

-   The body must execute at least once before the condition is tested.

------------------------------------------------------------------------

## 19. Equivalent Loop Forms

This `while` loop:

``` java
int i = 0;

while (i < 5) {
    System.out.println(i);
    i++;
}
```

can be expressed as:

``` java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

The behavior is equivalent, but the `for` version groups the
loop-control components together.

------------------------------------------------------------------------

## 20. Nested Loops

A loop can appear inside another loop.

Example:

``` java
for (int row = 1; row <= 3; row++) {

    for (int column = 1; column <= 4; column++) {
        System.out.print("* ");
    }

    System.out.println();
}
```

Output:

``` text
* * * *
* * * *
* * * *
```

For every one iteration of the outer loop, the inner loop executes all
of its iterations.

------------------------------------------------------------------------

## 21. Multiplication Table with Nested Loops

Nested loops are useful for tables.

``` java
for (int row = 1; row <= 5; row++) {

    for (int column = 1; column <= 5; column++) {
        System.out.printf("%4d", row * column);
    }

    System.out.println();
}
```

The outer loop controls the rows, while the inner loop controls the
columns.

------------------------------------------------------------------------

## 22. Understanding Nested Loop Counts

Consider:

``` java
for (int i = 1; i <= 4; i++) {

    for (int j = 1; j <= 3; j++) {
        System.out.println(i + ", " + j);
    }
}
```

The outer loop executes 4 times.

For each outer iteration, the inner loop executes 3 times.

Therefore, the `println` statement executes:

``` text
4 × 3 = 12 times
```

Understanding this multiplication effect is important when analyzing
nested-loop performance.

------------------------------------------------------------------------

## 23. Minimizing Numerical Errors

Repeated floating-point calculations can accumulate rounding errors.

For example, repeatedly adding `0.01` may not produce the exact
mathematical value expected because many decimal fractions cannot be
represented exactly in binary floating-point format.

When appropriate, perform repeated calculations using integer units and
convert at the end.

Instead of relying on:

``` java
double amount = 0.0;

for (int i = 0; i < 100; i++) {
    amount += 0.01;
}
```

a program could represent cents as integers:

``` java
int cents = 0;

for (int i = 0; i < 100; i++) {
    cents += 1;
}

double dollars = cents / 100.0;
```

The best approach depends on the problem, but loop design should account
for numerical precision.

------------------------------------------------------------------------

## 24. Example: Greatest Common Divisor

Loops can solve mathematical search problems.

The following program finds the greatest common divisor of two positive
integers by testing possible divisors:

``` java
int n1 = 24;
int n2 = 36;
int gcd = 1;

for (int k = 2; k <= n1 && k <= n2; k++) {

    if (n1 % k == 0 && n2 % k == 0) {
        gcd = k;
    }
}

System.out.println("GCD: " + gcd);
```

Output:

``` text
GCD: 12
```

The loop repeatedly tests candidate divisors and remembers the greatest
one found.

------------------------------------------------------------------------

## 25. Example: Repeated Growth

Loops are useful when a quantity changes repeatedly over time.

Suppose an amount begins at `$10,000` and grows by 7% each year. The
following loop determines how many years it takes to double:

``` java
double amount = 10000;
double target = amount * 2;
int years = 0;

while (amount < target) {
    amount *= 1.07;
    years++;
}

System.out.println("Years: " + years);
System.out.printf("Amount: $%.2f%n", amount);
```

This is a condition-controlled loop because the required number of years
is determined during execution.

------------------------------------------------------------------------

## 26. Example: Decimal to Hexadecimal Conversion

Repeated division can be used to convert a nonnegative decimal integer
to hexadecimal.

``` java
int decimal = 254;
String hex = "";

do {
    int remainder = decimal % 16;

    char digit;

    if (remainder < 10) {
        digit = (char) ('0' + remainder);
    }
    else {
        digit = (char) ('A' + remainder - 10);
    }

    hex = digit + hex;
    decimal /= 16;

} while (decimal != 0);

System.out.println(hex);
```

Output:

``` text
FE
```

Each iteration obtains one hexadecimal digit from the remainder.

------------------------------------------------------------------------

## 27. Simulation with Loops

Loops can repeat randomized experiments.

Example:

``` java
int heads = 0;
int tails = 0;

for (int trial = 0; trial < 1000; trial++) {

    if (Math.random() < 0.5) {
        heads++;
    }
    else {
        tails++;
    }
}

System.out.println("Heads: " + heads);
System.out.println("Tails: " + tails);
```

This illustrates the basic idea behind computational simulation: repeat
an experiment many times and summarize the outcomes.

------------------------------------------------------------------------

## 28. The `break` Statement

The `break` statement immediately terminates the nearest loop.

Example:

``` java
for (int i = 1; i <= 100; i++) {

    if (i == 10) {
        break;
    }

    System.out.println(i);
}
```

When `i` becomes `10`, the loop terminates.

The next statement after the loop executes.

------------------------------------------------------------------------

## 29. The `continue` Statement

The `continue` statement skips the remainder of the current iteration
and proceeds with the next iteration.

Example:

``` java
for (int i = 1; i <= 10; i++) {

    if (i == 5) {
        continue;
    }

    System.out.println(i);
}
```

Output:

``` text
1
2
3
4
6
7
8
9
10
```

The value `5` is not printed.

------------------------------------------------------------------------

## 30. `break` vs. `continue`

These statements have different effects:

  Statement    Effect
  ------------ ----------------------------------------------
  `break`      Terminates the loop completely
  `continue`   Skips the remainder of the current iteration

Use them carefully. Excessive use can make loop logic more difficult to
follow.

------------------------------------------------------------------------

## 31. Example: Palindrome Checking

A palindrome reads the same forward and backward.

Examples include:

``` text
level
radar
noon
```

A loop can compare characters from opposite ends of a string:

``` java
String text = "level";

int left = 0;
int right = text.length() - 1;
boolean palindrome = true;

while (left < right) {

    if (text.charAt(left) != text.charAt(right)) {
        palindrome = false;
        break;
    }

    left++;
    right--;
}

System.out.println("Palindrome: " + palindrome);
```

The loop stops when a mismatch is found or when all necessary character
pairs have been checked.

------------------------------------------------------------------------

## 32. Example: Testing for a Prime Number

A prime number is an integer greater than 1 whose only positive divisors
are 1 and itself.

``` java
int number = 29;
boolean prime = number > 1;

for (int divisor = 2;
     divisor <= Math.sqrt(number) && prime;
     divisor++) {

    if (number % divisor == 0) {
        prime = false;
    }
}

System.out.println("Prime: " + prime);
```

This demonstrates how loops and selection statements work together.

------------------------------------------------------------------------

## 33. Common Error: Infinite Loops

An **infinite loop** never reaches a false continuation condition.

Example:

``` java
int count = 1;

while (count <= 10) {
    System.out.println(count);
}
```

The value of `count` never changes.

Correct version:

``` java
int count = 1;

while (count <= 10) {
    System.out.println(count);
    count++;
}
```

When a loop does not terminate as expected, check whether the variables
used by its condition are being updated correctly.

------------------------------------------------------------------------

## 34. Intentional Infinite Loops

Some programs intentionally create a loop that runs until an event
causes it to stop.

Examples:

``` java
while (true) {
    // Repeat until a break or other termination mechanism
}
```

or:

``` java
for (;;) {
    // Infinite loop
}
```

Although both are legal Java, `while (true)` often communicates the
intention more clearly.

------------------------------------------------------------------------

## 35. Common Error: Semicolon After a Loop Header

Incorrect:

``` java
for (int i = 0; i < 5; i++);
{
    System.out.println("Java");
}
```

The semicolon terminates the `for` statement. The block is not the loop
body.

Correct:

``` java
for (int i = 0; i < 5; i++) {
    System.out.println("Java");
}
```

A similar mistake can occur with `while`.

Incorrect:

``` java
while (count < 5);
{
    count++;
}
```

Always inspect loop headers carefully when behavior does not match
expectations.

------------------------------------------------------------------------

## 36. Common Error: Off-by-One Errors

An off-by-one error occurs when a loop executes one time too many or one
time too few.

Compare:

``` java
for (int i = 1; i < 5; i++)
```

with:

``` java
for (int i = 1; i <= 5; i++)
```

The first executes for:

``` text
1, 2, 3, 4
```

The second executes for:

``` text
1, 2, 3, 4, 5
```

Pay close attention to:

-   Initial values
-   `<` versus `<=`
-   `>` versus `>=`
-   Increment and decrement operations

------------------------------------------------------------------------

## 37. Variable Scope in Loops

A variable declared inside a `for` loop header is normally available
only within that loop.

``` java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

After the loop:

``` java
// System.out.println(i); // Error: i is out of scope
```

If the value is needed after the loop, declare it outside:

``` java
int i;

for (i = 0; i < 5; i++) {
    System.out.println(i);
}

System.out.println("Final i: " + i);
```

------------------------------------------------------------------------

## 38. Debugging Loops

When a loop behaves incorrectly, examine its execution systematically.

Check:

1.  What is the initial value?
2.  What condition controls repetition?
3.  When is the condition evaluated?
4.  Which values change inside the loop?
5.  Does the update move the loop toward termination?
6.  How many iterations should occur?
7.  Are boundary values handled correctly?
8.  Is a semicolon accidentally terminating the loop header?
9.  Could `break` or `continue` alter the expected flow?
10. Is floating-point equality being used as a stopping condition?

IDE debugging tools can also help by allowing you to set a breakpoint,
execute one statement at a time, and inspect variable values after each
iteration.

------------------------------------------------------------------------

## 39. Loop Testing Strategy

Test loops with small inputs before using large values.

For example, instead of first testing:

``` java
for (int i = 0; i < 1000; i++)
```

temporarily test:

``` java
for (int i = 0; i < 3; i++)
```

This makes the execution easier to trace manually.

Also test boundary conditions.

For:

``` java
while (number <= 10)
```

consider values such as:

``` text
9
10
11
```

Boundary testing helps identify incorrect continuation conditions.

------------------------------------------------------------------------

## 40. Putting the Concepts Together

The following program accepts an unknown number of positive scores, uses
`-1` as a sentinel, and calculates summary information.

``` java
import java.util.Scanner;

public class ScoreSummary {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        int count = 0;
        double total = 0;
        double highest = 0;

        System.out.print("Enter a score (-1 to finish): ");
        double score = input.nextDouble();

        while (score != -1) {

            if (score >= 0 && score <= 100) {

                total += score;
                count++;

                if (score > highest) {
                    highest = score;
                }
            }
            else {
                System.out.println("Invalid score.");
            }

            System.out.print("Enter a score (-1 to finish): ");
            score = input.nextDouble();
        }

        if (count > 0) {
            double average = total / count;

            System.out.println("Scores entered: " + count);
            System.out.printf("Average: %.2f%n", average);
            System.out.printf("Highest: %.2f%n", highest);
        }
        else {
            System.out.println("No valid scores were entered.");
        }
    }
}
```

This program combines:

-   A sentinel-controlled `while` loop
-   Input validation
-   A counter
-   An accumulator
-   Selection statements
-   Repeated input
-   Summary calculations

------------------------------------------------------------------------

## Check Your Understanding

1.  What are the four basic components commonly involved in loop design?
2.  What is an iteration?
3.  Why can a `while` loop execute zero times?
4.  What is the purpose of a loop counter?
5.  What is an accumulator?
6.  What is a sentinel value?
7.  When is a sentinel-controlled loop useful?
8.  What is the main difference between `while` and `do-while`?
9.  Why does a `do-while` loop execute at least once?
10. What are the three components in a typical `for` loop header?
11. When is a `for` loop generally preferable to a `while` loop?
12. When is a `while` loop generally preferable to a `for` loop?
13. What happens when one loop is nested inside another?
14. Why should floating-point equality generally be avoided as a
    loop-continuation test?
15. What does `break` do inside a loop?
16. What does `continue` do inside a loop?
17. What is an infinite loop?
18. What can cause an off-by-one error?
19. What happens if a semicolon is accidentally placed immediately after
    a `for` or `while` header?
20. Why is tracing a loop with small input values useful for debugging?
21. How can loops be used to solve search problems such as finding a
    greatest common divisor?
22. How can a loop be used to determine whether a number is prime?
