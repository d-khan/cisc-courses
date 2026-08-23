# Single-Dimensional Arrays in Java

## Overview

A single-dimensional array stores a fixed-size collection of values of
the same type. Arrays are useful when a program must process a group of
related values using indexes and loops.

## Learning Objectives

After completing this material, you should be able to: - Declare,
create, and initialize arrays. - Use `length` and zero-based indexes
safely. - Process arrays using indexed and enhanced `for` loops. -
Compute totals, averages, minimums, and maximums. - Copy, shift,
shuffle, and reverse array data. - Pass arrays to methods and return
arrays from methods. - Explain how array references behave when passed
to methods. - Search arrays using linear and binary search. - Sort
arrays using selection sort. - Use common methods from
`java.util.Arrays`. - Work with variable-length arguments and
command-line arguments.

## 1. Declaring and Creating Arrays

``` java
int[] scores = new int[10];
double[] temperatures = new double[7];
```

An array has a fixed length after it is created.

``` java
System.out.println(scores.length);
```

## 2. Array Indexes

Indexes begin at `0` and end at `array.length - 1`.

``` java
scores[0] = 88;
scores[1] = 92;
System.out.println(scores[0]);
```

A common safe traversal pattern is:

``` java
for (int i = 0; i < scores.length; i++) {
    System.out.println(scores[i]);
}
```

## 3. Array Initializers

When the values are already known:

``` java
int[] values = {12, 7, 19, 4, 11};
```

Java determines the length from the initializer.

## 4. Processing Arrays

### Reading Values

``` java
for (int i = 0; i < scores.length; i++) {
    scores[i] = input.nextInt();
}
```

### Computing a Total

``` java
int total = 0;

for (int value : scores) {
    total += value;
}
```

### Computing an Average

``` java
double average = (double) total / scores.length;
```

### Finding the Largest Value

``` java
int largest = scores[0];

for (int i = 1; i < scores.length; i++) {
    if (scores[i] > largest) {
        largest = scores[i];
    }
}
```

### Finding the Index of the Largest Value

``` java
int largestIndex = 0;

for (int i = 1; i < scores.length; i++) {
    if (scores[i] > scores[largestIndex]) {
        largestIndex = i;
    }
}
```

## 5. Enhanced `for` Loop

Use an enhanced loop when you need each value sequentially and do not
need its index.

``` java
for (int score : scores) {
    System.out.println(score);
}
```

Use an indexed loop when you need to change elements, access positions,
or traverse in a special order.

## 6. Counting Values Above the Average

``` java
int count = 0;

for (double value : values) {
    if (value > average) {
        count++;
    }
}
```

This pattern combines array traversal with accumulation and conditional
processing.

## 7. Copying Arrays

This statement does not duplicate the elements:

``` java
int[] copy = original;
```

Both variables refer to the same array.

To make a separate copy:

``` java
int[] copy = new int[original.length];

for (int i = 0; i < original.length; i++) {
    copy[i] = original[i];
}
```

Java also provides:

``` java
System.arraycopy(original, 0, copy, 0, original.length);
```

## 8. Passing Arrays to Methods

Arrays can be passed to methods:

``` java
public static int sum(int[] values) {
    int total = 0;

    for (int value : values) {
        total += value;
    }

    return total;
}
```

Invocation:

``` java
int total = sum(scores);
```

Java passes the value of the array reference. Therefore, a method that
changes an element through that reference changes the same underlying
array.

``` java
public static void doubleFirst(int[] values) {
    values[0] *= 2;
}
```

## 9. Returning Arrays from Methods

A method can create and return an array.

``` java
public static int[] reverse(int[] values) {
    int[] result = new int[values.length];

    for (int i = 0; i < values.length; i++) {
        result[values.length - 1 - i] = values[i];
    }

    return result;
}
```

## 10. Anonymous Arrays

An array can be created directly as a method argument:

``` java
printArray(new int[]{4, 8, 2, 9});
```

No separate reference variable is required.

## 11. Shifting Elements

A left shift moves each later element one position toward the beginning.

``` java
int first = values[0];

for (int i = 1; i < values.length; i++) {
    values[i - 1] = values[i];
}

values[values.length - 1] = first;
```

## 12. Random Shuffling

A shuffle repeatedly exchanges elements with randomly selected
positions.

``` java
for (int i = values.length - 1; i > 0; i--) {
    int j = (int) (Math.random() * (i + 1));

    int temp = values[i];
    values[i] = values[j];
    values[j] = temp;
}
```

## 13. Linear Search

Linear search checks elements sequentially.

``` java
public static int linearSearch(int[] values, int key) {
    for (int i = 0; i < values.length; i++) {
        if (values[i] == key) {
            return i;
        }
    }

    return -1;
}
```

It works whether or not the array is sorted.

## 14. Binary Search

Binary search repeatedly reduces the search range by half. The array
must already be sorted.

``` java
public static int binarySearch(int[] values, int key) {
    int low = 0;
    int high = values.length - 1;

    while (low <= high) {
        int mid = (low + high) / 2;

        if (key < values[mid]) {
            high = mid - 1;
        } else if (key > values[mid]) {
            low = mid + 1;
        } else {
            return mid;
        }
    }

    return -1;
}
```

## 15. Selection Sort

Selection sort repeatedly finds the smallest value in the unsorted
portion and moves it to the next sorted position.

``` java
public static void selectionSort(int[] values) {
    for (int i = 0; i < values.length - 1; i++) {
        int minIndex = i;

        for (int j = i + 1; j < values.length; j++) {
            if (values[j] < values[minIndex]) {
                minIndex = j;
            }
        }

        int temp = values[i];
        values[i] = values[minIndex];
        values[minIndex] = temp;
    }
}
```

## 16. `java.util.Arrays`

Java provides useful array utilities:

``` java
import java.util.Arrays;

Arrays.sort(values);
System.out.println(Arrays.toString(values));
int position = Arrays.binarySearch(values, key);
```

Remember that binary search requires sorted data.

## 17. Variable-Length Arguments

A method can accept a variable number of arguments of the same type.

``` java
public static int total(int... values) {
    int sum = 0;

    for (int value : values) {
        sum += value;
    }

    return sum;
}
```

Usage:

``` java
System.out.println(total(4, 7, 2));
System.out.println(total(10, 20, 30, 40));
```

## 18. Command-Line Arguments

The `main` method receives command-line arguments through its
`String[] args` parameter.

``` java
public static void main(String[] args) {
    for (String argument : args) {
        System.out.println(argument);
    }
}
```

## Common Errors

-   Using an index equal to `array.length`.
-   Assuming array indexes begin at 1.
-   Using an enhanced `for` loop when an index is required.
-   Assuming `array2 = array1` creates an independent copy.
-   Performing binary search on unsorted data.
-   Forgetting to handle an empty array before using element `0`.
-   Confusing an element value with the array reference.

## Check Your Understanding

1.  Why are arrays useful?
2.  What are the valid indexes for an array of length 10?
3.  What does the `length` field represent?
4.  When is an enhanced `for` loop appropriate?
5.  Why does assigning one array variable to another not copy the
    elements?
6.  What happens when a method changes an element of an array passed to
    it?
7.  How does linear search differ from binary search?
8.  Why must binary search receive sorted data?
9.  How does selection sort organize an array?
10. What is the purpose of `Arrays.toString()`?
11. What is a variable-length argument list?
12. How are command-line arguments accessed in Java?
