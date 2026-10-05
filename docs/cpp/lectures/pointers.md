# C++ Pointers

Pointers are an important feature of C++. They allow programs to work with **memory addresses** and provide the foundation for understanding:

- Arrays
- Dynamic memory
- Passing data efficiently to functions
- Objects and data structures
- Linked lists, trees, and graphs
- Many low-level programming concepts

We will study pointers in two stages:

1. **Beginner:** Memory addresses, pointer variables, `&`, `*`, `nullptr`, and basic functions.
2. **Intermediate:** Arrays and pointers, pointer arithmetic, dynamic memory, dynamic arrays, and pointers to objects.

---

# Lecture 1 — Beginner Pointers

## Learning Objectives

By the end of this lecture, you should be able to:

- Explain what a memory address is.
- Explain what a pointer stores.
- Use the address-of operator `&`.
- Declare and initialize a pointer.
- Use the dereference operator `*`.
- Modify a variable through a pointer.
- Use `nullptr` safely.
- Pass an address to a function.

## 1. Variables and Memory

```cpp
int x = 10;
```

The computer stores the value `10` somewhere in memory.

```text
Memory
Address       Value
-------       -----
0x1000          10
```

Normally:

```cpp
cout << x;
```

prints the value. C++ also lets us find where `x` is stored.

## 2. The Address-of Operator `&`

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 10;

    cout << "Value: " << x << endl;
    cout << "Address: " << &x << endl;

    return 0;
}
```

The important distinction is:

```text
x     -> value of x
&x    -> address of x
```

## 3. What Is a Pointer?

A **pointer is a variable that stores a memory address**.

```cpp
int x = 10;
int* ptr = &x;
```

Conceptually:

```text
ptr
+--------+
| 0x1000 |
+--------+
     |
     v
x
+--------+
|   10   |
+--------+
```

`ptr` does not store `10`. It stores the address of `x`.

## 4. Declaring a Pointer

```cpp
dataType* pointerName;
```

Examples:

```cpp
int* ptr;
double* pricePtr;
char* letterPtr;
```

A pointer should point to an object of a compatible type.

```cpp
int age = 25;
int* ptr = &age;
```

## 5. Understanding `&` and `*`

`&x` means:

> Give me the address of `x`.

`*ptr` means:

> Go to the address stored in `ptr` and access the value there.

```cpp
int x = 10;
int* ptr = &x;

cout << x << endl;
cout << &x << endl;
cout << ptr << endl;
cout << *ptr << endl;
```

| Expression | Meaning |
|---|---|
| `x` | Value stored in `x` |
| `&x` | Address of `x` |
| `ptr` | Address stored in `ptr` |
| `*ptr` | Value at the address stored in `ptr` |

Therefore:

```text
ptr == &x
*ptr == x
```

## 6. Modifying a Variable Through a Pointer

```cpp
int x = 10;
int* ptr = &x;

*ptr = 50;

cout << x;
```

Output:

```text
50
```

Dereferencing the pointer gives access to the original object.

## 7. Complete Example

```cpp
#include <iostream>
using namespace std;

int main() {
    int number = 25;
    int* ptr = &number;

    cout << "Value of number: " << number << endl;
    cout << "Address of number: " << &number << endl;
    cout << "Address stored in ptr: " << ptr << endl;
    cout << "Value pointed to by ptr: " << *ptr << endl;

    return 0;
}
```

## 8. Pointer Types

```cpp
int x = 5;
int* p1 = &x;

double y = 4.5;
double* p2 = &y;

char letter = 'A';
char* p3 = &letter;
```

The pointer type tells C++ what type of object the pointer refers to.

## 9. Null Pointers

Modern C++ uses `nullptr` for a pointer that does not currently point to a valid object.

```cpp
int* ptr = nullptr;
```

Later:

```cpp
int x = 10;
ptr = &x;
```

Never dereference `nullptr`:

```cpp
int* ptr = nullptr;
cout << *ptr;   // Undefined behavior
```

A safety check:

```cpp
if (ptr != nullptr) {
    cout << *ptr;
}
```

## 10. Uninitialized Pointers

This is unsafe:

```cpp
int* ptr;
*ptr = 10;
```

A safer starting point is:

```cpp
int* ptr = nullptr;
```

Give it a valid address before dereferencing it.

## 11. Pointers and Functions

Pointers allow a function to modify an object created elsewhere.

```cpp
#include <iostream>
using namespace std;

void changeValue(int* ptr) {
    *ptr = 100;
}

int main() {
    int x = 10;

    changeValue(&x);

    cout << x << endl;
    return 0;
}
```

Output:

```text
100
```

## Beginner Summary

```cpp
int x = 10;
int* ptr = &x;
```

```text
x       -> value of x
&x      -> address of x
ptr     -> address stored in the pointer
*ptr    -> value at that address
```

> **A pointer stores an address. Dereferencing the pointer accesses the object at that address.**

## Beginner Practice

### Question 1

```cpp
int x = 20;
int* ptr = &x;
cout << *ptr;
```

**Answer:** `20`

### Question 2

```cpp
int x = 10;
int* ptr = &x;
*ptr = 30;
```

What is `x`?

**Answer:** `30`

### Question 3

Complete:

```cpp
int score = 95;

_____ ptr = _____;

cout << *ptr;
```

**Answer:**

```cpp
int* ptr = &score;
```

---

# Lecture 2 — Intermediate Pointers

## Learning Objectives

By the end of this lecture, you should be able to:

- Explain the relationship between arrays and pointers.
- Perform basic pointer arithmetic.
- Traverse arrays using pointers.
- Pass arrays to functions.
- Allocate memory using `new`.
- Release memory using `delete`.
- Create dynamic arrays.
- Explain memory leaks and dangling pointers.
- Use pointers with objects.

## 12. Pointers and Arrays

```cpp
int numbers[5] = {10, 20, 30, 40, 50};
```

Array elements are stored contiguously in memory. In most expressions, an array name is converted to a pointer to its first element.

```cpp
int* ptr = numbers;
```

is equivalent to:

```cpp
int* ptr = &numbers[0];
```

Therefore:

```cpp
cout << *ptr;
```

outputs `10`.

## 13. Pointer Arithmetic

```cpp
int numbers[5] = {10, 20, 30, 40, 50};
int* ptr = numbers;

cout << *ptr << endl;
cout << *(ptr + 1) << endl;
cout << *(ptr + 2) << endl;
```

Output:

```text
10
20
30
```

C++ automatically moves according to the size of the pointed-to type.

```cpp
ptr++;
```

moves to the next object of that type.

## 14. Array Indexing and Pointer Arithmetic

These access the same element:

```cpp
numbers[2]
```

```cpp
*(numbers + 2)
```

In general:

```text
array[i] == *(array + i)
```

## 15. Traversing an Array Using a Pointer

```cpp
int numbers[5] = {10, 20, 30, 40, 50};
int* ptr = numbers;

for (int i = 0; i < 5; i++) {
    cout << *ptr << endl;
    ptr++;
}
```

## 16. Passing an Array to a Function

```cpp
void display(int* numbers, int size) {
    for (int i = 0; i < size; i++) {
        cout << numbers[i] << endl;
    }
}
```

Usage:

```cpp
int values[] = {10, 20, 30};
display(values, 3);
```

A raw pointer alone does not tell the function how many array elements are available, so the size is passed separately.

## 17. Modifying an Array Through a Pointer

```cpp
void doubleValues(int* numbers, int size) {
    for (int i = 0; i < size; i++) {
        numbers[i] *= 2;
    }
}
```

## 18. Dynamic Memory

C++ can explicitly allocate an object dynamically:

```cpp
int* ptr = new int;
```

Initialize it:

```cpp
*ptr = 50;
```

or:

```cpp
int* ptr = new int(50);
```

Dynamic storage is often informally called the **heap**.

## 19. Releasing Dynamic Memory

Memory allocated using `new` should be released when no longer needed:

```cpp
int* ptr = new int(50);

cout << *ptr << endl;

delete ptr;
ptr = nullptr;
```

## 20. Dangling Pointers

After:

```cpp
delete ptr;
```

the dynamically allocated object no longer exists. If `ptr` still contains the old address, it is a **dangling pointer**.

Avoid using it:

```cpp
delete ptr;
ptr = nullptr;
```

## 21. Memory Leaks

```cpp
int* ptr = new int(50);
ptr = new int(100);
```

The address of the first allocation has been lost without releasing it. This is a **memory leak**.

## 22. Dynamic Arrays

When an array size is determined at runtime:

```cpp
int size;

cout << "How many students? ";
cin >> size;

int* scores = new int[size];
```

Use it like an array:

```cpp
for (int i = 0; i < size; i++) {
    cin >> scores[i];
}
```

Release it with:

```cpp
delete[] scores;
scores = nullptr;
```

Remember:

```text
new       -> delete
new[]     -> delete[]
```

## 23. Complete Dynamic Array Example

```cpp
#include <iostream>
using namespace std;

int main() {
    int size;

    cout << "How many scores? ";
    cin >> size;

    int* scores = new int[size];

    for (int i = 0; i < size; i++) {
        cout << "Enter score " << i + 1 << ": ";
        cin >> scores[i];
    }

    double total = 0;

    for (int i = 0; i < size; i++) {
        total += scores[i];
    }

    cout << "Average: " << total / size << endl;

    delete[] scores;
    scores = nullptr;

    return 0;
}
```

## 24. Returning Dynamically Allocated Memory

```cpp
int* createArray(int size) {
    int* arr = new int[size];
    return arr;
}
```

Usage:

```cpp
int* numbers = createArray(10);

// Use numbers

delete[] numbers;
numbers = nullptr;
```

Ownership matters: the programmer must know who is responsible for releasing dynamically allocated memory.

## 25. Pointers to Objects

```cpp
class Student {
public:
    string name;

    void display() {
        cout << name << endl;
    }
};
```

```cpp
Student s;
Student* ptr = &s;

ptr->name = "Alice";
ptr->display();
```

The following are equivalent:

```cpp
(*ptr).name
```

```cpp
ptr->name
```

## 26. Pointer vs. Reference

```cpp
int x = 10;

int& ref = x;
int* ptr = &x;
```

| Pointer | Reference |
|---|---|
| Stores an address | Acts as an alias |
| Can be `nullptr` | Must be initialized to refer to an object |
| Can later point elsewhere | Cannot normally be reseated |
| Uses `*` to dereference | Used like the original variable |
| Supports pointer arithmetic | Does not support pointer arithmetic |

## 27. Common Pointer Mistakes

### Uninitialized Pointer

```cpp
int* ptr;
*ptr = 10;
```

### Dereferencing `nullptr`

```cpp
int* ptr = nullptr;
cout << *ptr;
```

### Using Memory After `delete`

```cpp
int* ptr = new int(50);
delete ptr;
cout << *ptr;
```

### Memory Leak

```cpp
int* ptr = new int(50);
ptr = nullptr;
```

### Going Outside an Array

```cpp
int numbers[5] = {1, 2, 3, 4, 5};
int* ptr = numbers;

cout << *(ptr + 10);
```

All of these can lead to undefined behavior or incorrect memory management.

## 28. Modern C++ Perspective

Raw pointers are important for understanding how C++ works, but modern C++ generally avoids using raw pointers to manually manage ownership when safer alternatives exist.

Instead of:

```cpp
int* numbers = new int[size];

// ...

delete[] numbers;
```

we often use:

```cpp
vector<int> numbers(size);
```

Modern C++ also provides smart pointers:

```cpp
std::unique_ptr
std::shared_ptr
```

A useful learning progression is:

```text
Raw pointers
     |
Dynamic memory
     |
Understand ownership
     |
RAII
     |
Smart pointers
```

## Intermediate Practice

### Exercise 1 — Pointer Arithmetic

```cpp
int values[] = {5, 10, 15, 20};

int* ptr = values;

cout << *(ptr + 2);
```

**Answer:** `15`

### Exercise 2 — Modify an Array

Double every element:

```cpp
int values[] = {1, 2, 3, 4, 5};
int* ptr = values;

for (int i = 0; i < 5; i++) {
    *(ptr + i) = *(ptr + i) * 2;
}
```

Result:

```text
2 4 6 8 10
```

### Exercise 3 — Function Using a Pointer

Write a function that adds 10 to the pointed-to value.

```cpp
void addTen(int* ptr) {
    *ptr += 10;
}
```

### Exercise 4 — Dynamic Array

Write a program that:

1. Asks how many numbers the user wants to enter.
2. Dynamically creates an array.
3. Reads the numbers.
4. Finds the largest number.
5. Displays the largest number.
6. Releases the dynamically allocated memory.

---

# Final Concept Map

```text
Variable
   |
   | &
   v
Memory Address
   |
   | stored inside
   v
Pointer
   |
   | *
   v
Value
```

For:

```cpp
int x = 10;
int* ptr = &x;
```

remember:

```text
x       -> value
&x      -> address of x
ptr     -> address stored in the pointer
*ptr    -> value at that address
```

## Key Takeaway

> **A pointer is a variable that stores the address of another object.**

> **Dereferencing a pointer means accessing the object located at the address stored in that pointer.**
