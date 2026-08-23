# Multidimensional Arrays in Java

## Overview

A one-dimensional array represents a linear sequence of values. A multidimensional array extends that idea by organizing data using more than one index. In Java, two-dimensional arrays are commonly used to model tables, grids, matrices, coordinate data, game boards, test responses, and other row-and-column structures.

Java also supports arrays with three or more dimensions when a problem naturally contains additional levels of organization.

## Learning Objectives

After completing this material, you should be able to:

- Explain when a two-dimensional array is appropriate.
- Declare, create, and initialize two-dimensional arrays.
- Access elements using row and column indexes.
- Use `array.length` and `array[row].length`.
- Process rectangular and ragged arrays.
- Traverse a matrix using nested loops.
- Compute totals, row totals, column totals, minimums, and maximums.
- Pass two-dimensional arrays to methods.
- Model structured problems using two-dimensional arrays.
- Apply two-dimensional arrays to grading, coordinate, and grid-validation problems.
- Describe how three-dimensional arrays can represent additional levels of data.

## 1. Why Use Two-Dimensional Arrays?

Suppose a program stores scores for several students across several assessments.

```java
double[][] scores = {
    {85, 92, 78, 88},
    {76, 81, 90, 84},
    {95, 89, 93, 91}
};
```

The first index identifies a row. The second index identifies a column.

```java
scores[1][2]
```

refers to the value in row `1`, column `2`.

## 2. Declaring and Creating Two-Dimensional Arrays

```java
int[][] matrix = new int[4][5];
```

This creates four rows, each containing five integer elements.

## 3. Accessing Elements

```java
matrix[0][0] = 10;
matrix[2][3] = 25;
```

The first element is `matrix[0][0]`.

## 4. Array Lengths

For:

```java
int[][] matrix = new int[3][4];
```

`matrix.length` is `3`, and `matrix[0].length` is `4`.

A safe traversal pattern is:

```java
for (int row = 0; row < matrix.length; row++) {
    for (int column = 0; column < matrix[row].length; column++) {
        System.out.println(matrix[row][column]);
    }
}
```

## 5. Initializing a Two-Dimensional Array

```java
int[][] values = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
```

## 6. Ragged Arrays

Rows can have different lengths:

```java
int[][] triangle = {
    {1, 2, 3, 4},
    {5, 6, 7},
    {8, 9},
    {10}
};
```

Use `matrix[row].length` when traversing each row.

## 7. Reading Values into a Matrix

```java
Scanner input = new Scanner(System.in);
int[][] matrix = new int[3][4];

for (int row = 0; row < matrix.length; row++) {
    for (int column = 0; column < matrix[row].length; column++) {
        matrix[row][column] = input.nextInt();
    }
}
```

## 8. Filling a Matrix with Random Values

```java
for (int row = 0; row < matrix.length; row++) {
    for (int column = 0; column < matrix[row].length; column++) {
        matrix[row][column] = (int) (Math.random() * 100);
    }
}
```

## 9. Printing a Matrix

```java
for (int row = 0; row < matrix.length; row++) {
    for (int column = 0; column < matrix[row].length; column++) {
        System.out.print(matrix[row][column] + " ");
    }
    System.out.println();
}
```

## 10. Summing All Elements

```java
int total = 0;

for (int row = 0; row < matrix.length; row++) {
    for (int column = 0; column < matrix[row].length; column++) {
        total += matrix[row][column];
    }
}
```

## 11. Computing Row Totals

```java
for (int row = 0; row < matrix.length; row++) {
    int rowTotal = 0;

    for (int value : matrix[row]) {
        rowTotal += value;
    }

    System.out.println("Row " + row + ": " + rowTotal);
}
```

## 12. Computing Column Totals

For a rectangular matrix:

```java
for (int column = 0; column < matrix[0].length; column++) {
    int columnTotal = 0;

    for (int row = 0; row < matrix.length; row++) {
        columnTotal += matrix[row][column];
    }

    System.out.println("Column " + column + ": " + columnTotal);
}
```

## 13. Finding a Minimum or Maximum

```java
int largest = matrix[0][0];

for (int row = 0; row < matrix.length; row++) {
    for (int column = 0; column < matrix[row].length; column++) {
        if (matrix[row][column] > largest) {
            largest = matrix[row][column];
        }
    }
}
```

You can also track the row and column of the largest value.

## 14. Finding the Row with the Largest Sum

```java
int bestRow = 0;
int bestTotal = Integer.MIN_VALUE;

for (int row = 0; row < matrix.length; row++) {
    int total = 0;

    for (int value : matrix[row]) {
        total += value;
    }

    if (total > bestTotal) {
        bestTotal = total;
        bestRow = row;
    }
}
```

## 15. Passing Two-Dimensional Arrays to Methods

```java
public static int sum(int[][] matrix) {
    int total = 0;

    for (int[] row : matrix) {
        for (int value : row) {
            total += value;
        }
    }

    return total;
}
```

## 16. A Method for Printing a Matrix

```java
public static void printMatrix(int[][] matrix) {
    for (int[] row : matrix) {
        for (int value : row) {
            System.out.printf("%5d", value);
        }
        System.out.println();
    }
}
```

## 17. Randomly Shuffling Matrix Values

```java
for (int row = 0; row < matrix.length; row++) {
    for (int column = 0; column < matrix[row].length; column++) {
        int otherRow = (int) (Math.random() * matrix.length);
        int otherColumn =
            (int) (Math.random() * matrix[otherRow].length);

        int temp = matrix[row][column];
        matrix[row][column] = matrix[otherRow][otherColumn];
        matrix[otherRow][otherColumn] = temp;
    }
}
```

## 18. Modeling a Distance Table

```java
int[][] distance = {
    {0,   120, 250},
    {120,   0, 175},
    {250, 175,   0}
};
```

`distance[0][2]` can represent the distance from location `0` to location `2`.

## 19. Grading Multiple-Choice Responses

Rows can represent students and columns can represent questions.

```java
char[][] answers = {
    {'A', 'B', 'C', 'D'},
    {'A', 'C', 'C', 'D'},
    {'B', 'B', 'C', 'A'}
};

char[] key = {'A', 'B', 'C', 'D'};
```

Nested loops can compare each student's responses with the answer key.

## 20. Representing Coordinate Points

```java
double[][] points = {
    {-1.0, 3.0},
    {1.0, 1.0},
    {2.0, 0.5},
    {4.0, 2.0}
};
```

Each row represents one point, with column `0` for x and column `1` for y.

## 21. Closest-Pair Strategy

```java
for (int i = 0; i < points.length; i++) {
    for (int j = i + 1; j < points.length; j++) {
        // Compare points i and j
    }
}
```

Starting `j` at `i + 1` avoids duplicate pair comparisons.

## 22. Grid Validation

Two-dimensional arrays are useful for validating row, column, and subregion rules in grid-based problems. Complex validation is easier to manage when separated into focused methods.

## 23. Three-Dimensional Arrays

```java
double[][][] scores = new double[7][5][2];
```

This might represent:

```text
first index  → student
second index → exam
third index  → exam component
```

## 24. Processing a Three-Dimensional Array

```java
for (int student = 0; student < scores.length; student++) {
    for (int exam = 0; exam < scores[student].length; exam++) {
        for (int part = 0;
             part < scores[student][exam].length;
             part++) {

            System.out.println(scores[student][exam][part]);
        }
    }
}
```

## 25. Common Errors and Pitfalls

- Using the wrong row length.
- Accessing `matrix[matrix.length]`.
- Assuming every matrix is rectangular.
- Reversing row and column meaning.
- Placing too much unrelated logic inside nested loops.
- Failing to define what each dimension represents.

## Check Your Understanding

1. What does the first index of a two-dimensional array normally identify?
2. What does `matrix.length` return?
3. What does `matrix[row].length` return?
4. Why are nested loops commonly used with two-dimensional arrays?
5. What is a ragged array?
6. Why is `matrix[row].length` safer than always using `matrix[0].length`?
7. How would you calculate the total of one row?
8. How would you calculate the total of one column in a rectangular array?
9. What happens when a two-dimensional array is passed to a method?
10. How can a two-dimensional array represent coordinate points?
11. Why does a closest-pair algorithm normally start the inner loop at `i + 1`?
12. What kinds of rules can be checked in a grid-validation problem?
13. What could the three indexes of a three-dimensional array represent?
