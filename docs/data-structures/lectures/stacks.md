# Stacks

## Introduction

A **stack** is a linear abstract data type in which insertion, deletion, and access are restricted to one end of the structure, called the **top**. The defining behavior of a stack is **Last-In, First-Out (LIFO)**: the most recently inserted element is the first element removed.

For example, suppose the following values are inserted in order:

```text
push(15)
push(6)
push(2)
push(9)
```

The logical stack is:

```text
Top
 ↓
[9]
[2]
[6]
[15]
```

Therefore:

```text
pop() → 9
pop() → 2
pop() → 6
pop() → 15
```

LIFO is the defining property of the stack ADT.

---

## 1. Stack as an Abstract Data Type

A stack is best understood as an **Abstract Data Type (ADT)** rather than as an array, linked list, or C++ container.

An ADT specifies:

- what data logically exists,
- what operations are permitted,
- what those operations mean,
- but not necessarily how the data is physically stored.

We can mathematically describe a stack as an ordered finite sequence:

\[
S = \langle a_1,a_2,\ldots,a_k\rangle
\]

where:

- \(a_1\) is the bottom element,
- \(a_k\) is the top element,
- \(k\) is the current stack size.

The empty stack is:

\[
S=\langle\rangle
\]

with:

\[
|S|=0
\]

If:

\[
S=\langle a_1,a_2,\ldots,a_k\rangle
\]

then pushing a value \(x\) produces:

\[
\operatorname{push}(S,x)=\langle a_1,a_2,\ldots,a_k,x\rangle
\]

A subsequent pop removes that same \(x\):

\[
\operatorname{pop}(\langle a_1,a_2,\ldots,a_k,x\rangle)=x
\]

The resulting stack becomes:

\[
\langle a_1,a_2,\ldots,a_k\rangle
\]

This gives the central stack relationship:

\[
\operatorname{pop}(\operatorname{push}(S,x))=x
\]

---

## 2. Restricted Access

A normal array permits arbitrary indexed access:

```cpp
A[0];
A[7];
A[15];
```

A stack deliberately restricts this freedom. In a stack:

- insertion occurs only at the top,
- deletion occurs only at the top,
- direct access is normally limited to the top element.

Consequently, an abstract stack should not expose operations such as:

```cpp
stack.insertAt(3, value);
stack.removeAt(7);
stack[4];
```

Such operations violate the stack abstraction.

The fundamental interface is instead:

```text
push(x)
pop()
top()       // or peek()
empty()
size()
```

For a fixed-capacity implementation, we may additionally have:

```text
full()
```

---

## 3. Stack Operations

| Operation | Purpose | Typical Complexity |
|---|---|---:|
| `push(x)` | Insert `x` at the top | \(O(1)\) |
| `pop()` | Remove the top element | \(O(1)\) |
| `peek()` / `top()` | Inspect the top element | \(O(1)\) |
| `is_empty()` | Determine whether the stack is empty | \(O(1)\) |
| `is_full()` | Determine whether a fixed stack is full | \(O(1)\) |

The key reason these operations are constant time is that the stack maintains the location of its top element directly.

---

## 4. Array Representation of a Stack

Suppose a stack has capacity:

\[
N
\]

Let the underlying array be:

\[
A[0\ldots N-1]
\]

In C++, we naturally use zero-based indexing.

We maintain an integer:

```cpp
int topIndex;
```

with the invariant:

\[
-1 \leq topIndex < N
\]

The interpretation is:

\[
topIndex=-1
\]

means the stack is empty.

If:

\[
topIndex=0
\]

the stack contains one element.

More generally:

\[
\text{size}=topIndex+1
\]

For example:

```text
Index       0    1    2    3    4    5    6
          +----+----+----+----+----+----+----+
Array     | 15 |  6 |  2 |  9 |    |    |    |
          +----+----+----+----+----+----+----+
                            ↑
                       topIndex = 3
```

Therefore:

\[
|S|=4
\]

---

## 5. Stack Invariant

An **invariant** is a property that must remain true before and after every valid stack operation.

For an array-based stack:

\[
-1\leq topIndex<N
\]

All active stack elements occupy exactly:

\[
A[0],A[1],\ldots,A[topIndex]
\]

Thus:

\[
S=\langle A[0],A[1],\ldots,A[topIndex]\rangle
\]

Every implementation of `push()` and `pop()` must preserve this invariant.

---

## 6. Implementing `push()`

Suppose:

```text
topIndex = 2
```

and the stack contains:

```text
15  6  2
```

Calling:

```cpp
push(9);
```

requires:

\[
topIndex \leftarrow topIndex+1
\]

followed by:

\[
A[topIndex]\leftarrow 9
\]

The result is:

```text
Index       0    1    2    3
           15    6    2    9
                          ↑
                     topIndex
```

A basic implementation is:

```cpp
void push(int value) {
    ++topIndex;
    data[topIndex] = value;
}
```

However, this version does not check whether capacity has been exhausted.

A safer implementation is:

```cpp
void push(int value) {
    if (topIndex == capacity - 1) {
        throw std::overflow_error("Stack overflow");
    }

    ++topIndex;
    data[topIndex] = value;
}
```

---

## 7. Stack Overflow

For a fixed-size stack of capacity \(N\):

\[
\text{full} \iff topIndex=N-1
\]

If:

\[
N=5
\]

the valid indices are:

\[
0,1,2,3,4
\]

When:

\[
topIndex=4
\]

the stack is full.

Attempting another `push()` would exceed the allocated array boundary. This condition is called **stack overflow**.

This fixed-capacity overflow should be distinguished conceptually from a runtime call-stack overflow caused by excessive function nesting or recursion.

---

## 8. Implementing `pop()`

Suppose the stack is:

```text
15  6  2  9
          ↑
         top
```

Calling:

```cpp
pop();
```

removes `9`, leaving:

```text
15  6  2
       ↑
      top
```

Mathematically:

\[
S=\langle15,6,2,9\rangle
\]

becomes:

\[
S'=\langle15,6,2\rangle
\]

A basic implementation is:

```cpp
int pop() {
    int value = data[topIndex];
    --topIndex;
    return value;
}
```

A robust implementation must first detect underflow:

```cpp
int pop() {
    if (topIndex == -1) {
        throw std::underflow_error("Stack underflow");
    }

    int value = data[topIndex];
    --topIndex;
    return value;
}
```

---

## 9. Stack Underflow

If:

\[
|S|=0
\]

there is no top element.

Therefore, attempting:

\[
\operatorname{pop}(S)
\]

is invalid.

Likewise, attempting to inspect the top of an empty stack is invalid.

This condition is called **stack underflow**.

In C++, one strategy is to throw an exception:

```cpp
if (empty()) {
    throw std::underflow_error("Cannot pop an empty stack");
}
```

---

## 10. `peek()` or `top()`

`peek()` examines the newest element without changing the stack.

For:

\[
S=\langle15,6,2,9\rangle
\]

we have:

\[
\operatorname{peek}(S)=9
\]

After the operation, the stack remains:

\[
S=\langle15,6,2,9\rangle
\]

C++:

```cpp
int top() const {
    if (topIndex == -1) {
        throw std::underflow_error("Stack is empty");
    }

    return data[topIndex];
}
```

Since no traversal is required:

\[
T_{\text{top}}(n)=\Theta(1)
\]

---

## 11. Testing Whether the Stack Is Empty

For a zero-based implementation:

\[
S\text{ is empty}\iff topIndex=-1
\]

Therefore:

```cpp
bool empty() const {
    return topIndex == -1;
}
```

This is a constant-time comparison:

\[
T_{\text{empty}}(n)=\Theta(1)
\]

---

## 12. Complete Array-Based Stack in C++

```cpp
#include <iostream>
#include <stdexcept>

class Stack {
private:
    static const int CAPACITY = 100;

    int data[CAPACITY];
    int topIndex;

public:
    Stack() : topIndex(-1) {}

    bool empty() const {
        return topIndex == -1;
    }

    bool full() const {
        return topIndex == CAPACITY - 1;
    }

    int size() const {
        return topIndex + 1;
    }

    void push(int value) {
        if (full()) {
            throw std::overflow_error("Stack overflow");
        }

        data[++topIndex] = value;
    }

    int pop() {
        if (empty()) {
            throw std::underflow_error("Stack underflow");
        }

        return data[topIndex--];
    }

    int top() const {
        if (empty()) {
            throw std::underflow_error("Stack is empty");
        }

        return data[topIndex];
    }
};
```

Example:

```cpp
int main() {
    Stack s;

    s.push(15);
    s.push(6);
    s.push(2);
    s.push(9);

    std::cout << "Top: " << s.top() << '\n';
    std::cout << "Size: " << s.size() << '\n';

    std::cout << "Removed: " << s.pop() << '\n';
    std::cout << "New top: " << s.top() << '\n';

    return 0;
}
```

Output:

```text
Top: 9
Size: 4
Removed: 9
New top: 2
```

---

## 13. Complexity Analysis

Let \(n\) denote the number of elements currently stored.

### Push

A push performs a constant number of operations:

1. bounds check,
2. increment,
3. array assignment.

Therefore:

\[
T_{\text{push}}(n)=\Theta(1)
\]

and consequently:

\[
T_{\text{push}}(n)=O(1)
\]

### Pop

A pop performs:

1. an emptiness test,
2. one array access,
3. one decrement.

Therefore:

\[
T_{\text{pop}}(n)=\Theta(1)
\]

### Top

Only one indexed access is required:

\[
T_{\text{top}}(n)=\Theta(1)
\]

### Space Complexity

For \(n\) stored elements, the logical storage requirement is:

\[
\Theta(n)
\]

For a preallocated fixed-capacity array of size \(N\), the allocated storage is:

\[
\Theta(N)
\]

---

## 14. Why No Traversal Is Required

Suppose the stack contains one million elements.

To remove the top element, the implementation does not traverse the previous 999,999 elements.

The top position is already known:

```cpp
return data[topIndex--];
```

Therefore, the operation remains constant time regardless of the number of elements:

\[
T_{\text{pop}}(n)=\Theta(1)
\]

Maintaining the top index is what makes this possible.

---

## 15. Tracing a Sequence of Stack Operations

Consider:

```cpp
push(10);
push(20);
push(30);
pop();
push(40);
push(50);
pop();
```

Initially:

\[
S=\langle\rangle
\]

After `push(10)`:

\[
S=\langle10\rangle
\]

After `push(20)`:

\[
S=\langle10,20\rangle
\]

After `push(30)`:

\[
S=\langle10,20,30\rangle
\]

After `pop()`:

\[
30
\]

is returned and:

\[
S=\langle10,20\rangle
\]

After `push(40)`:

\[
S=\langle10,20,40\rangle
\]

After `push(50)`:

\[
S=\langle10,20,40,50\rangle
\]

After the final `pop()`:

\[
50
\]

is returned, leaving:

\[
S=\langle10,20,40\rangle
\]

Therefore the current top is:

\[
40
\]

---

## 16. Generic Stack Using C++ Templates

A stack should normally support more than integers. C++ templates allow the same implementation to work with different types.

```cpp
#include <cstddef>
#include <stdexcept>

template <typename T, int Capacity>
class Stack {
private:
    T data[Capacity];
    int topIndex;

public:
    Stack() : topIndex(-1) {}

    bool empty() const {
        return topIndex == -1;
    }

    bool full() const {
        return topIndex == Capacity - 1;
    }

    std::size_t size() const {
        return static_cast<std::size_t>(topIndex + 1);
    }

    void push(const T& value) {
        if (full()) {
            throw std::overflow_error("Stack overflow");
        }

        data[++topIndex] = value;
    }

    T pop() {
        if (empty()) {
            throw std::underflow_error("Stack underflow");
        }

        return data[topIndex--];
    }

    const T& top() const {
        if (empty()) {
            throw std::underflow_error("Stack is empty");
        }

        return data[topIndex];
    }
};
```

Examples:

```cpp
Stack<int, 100> numbers;
Stack<double, 50> measurements;
Stack<std::string, 20> names;
```

---

## 17. Dynamic Array Stack

A fixed-size array introduces a maximum capacity. A dynamically growing structure can instead use `std::vector`.

```cpp
#include <cstddef>
#include <stdexcept>
#include <vector>

template <typename T>
class DynamicStack {
private:
    std::vector<T> data;

public:
    bool empty() const {
        return data.empty();
    }

    std::size_t size() const {
        return data.size();
    }

    void push(const T& value) {
        data.push_back(value);
    }

    void pop() {
        if (empty()) {
            throw std::underflow_error("Stack underflow");
        }

        data.pop_back();
    }

    const T& top() const {
        if (empty()) {
            throw std::underflow_error("Stack is empty");
        }

        return data.back();
    }
};
```

The correspondence is:

| Stack operation | `std::vector` operation |
|---|---|
| `push(x)` | `push_back(x)` |
| `pop()` | `pop_back()` |
| `top()` | `back()` |
| `empty()` | `empty()` |
| `size()` | `size()` |

The end of the vector naturally represents the top of the stack.

---

## 18. Amortized Complexity of a Vector-Based Stack

Most pushes into a vector take:

\[
\Theta(1)
\]

Occasionally, the vector exhausts its current capacity and must allocate a larger block and move or copy its elements.

That particular operation may require:

\[
\Theta(n)
\]

time.

If capacity grows geometrically, such as:

\[
1,2,4,8,16,\ldots
\]

the total relocation work across \(n\) pushes forms a geometric series:

\[
1+2+4+\cdots+\frac{n}{2}
\]

which is:

\[
O(n)
\]

Across \(n\) push operations, the average cost is therefore:

\[
\frac{O(n)}{n}=O(1)
\]

Thus, vector insertion at the end is described as:

\[
\boxed{\text{amortized }O(1)}
\]

---

## 19. Stack Using a Linked List

A stack ADT does not require an array. It can also be implemented using a linked list.

If the head node represents the top:

```text
top
 ↓
+----+-----+    +----+-----+    +----+------+
| 30 |  *--+--->| 20 |  *--+--->| 10 | null |
+----+-----+    +----+-----+    +----+------+
```

To push:

1. allocate a new node,
2. point the new node to the old top,
3. make the new node the top.

Conceptually:

```cpp
newNode->next = top;
top = newNode;
```

To pop:

1. save the current top,
2. move `top` to the next node,
3. delete the old top node.

Neither operation requires traversal.

Therefore:

\[
T_{\text{push}}(n)=O(1)
\]

and:

\[
T_{\text{pop}}(n)=O(1)
\]

---

## 20. C++ Linked-List Stack

```cpp
#include <cstddef>
#include <stdexcept>

template <typename T>
class LinkedStack {
private:
    struct Node {
        T data;
        Node* next;

        Node(const T& value, Node* nextNode)
            : data(value), next(nextNode) {}
    };

    Node* topNode;
    std::size_t count;

public:
    LinkedStack()
        : topNode(nullptr), count(0) {}

    ~LinkedStack() {
        while (!empty()) {
            pop();
        }
    }

    bool empty() const {
        return topNode == nullptr;
    }

    std::size_t size() const {
        return count;
    }

    void push(const T& value) {
        topNode = new Node(value, topNode);
        ++count;
    }

    void pop() {
        if (empty()) {
            throw std::underflow_error("Stack underflow");
        }

        Node* temp = topNode;
        topNode = topNode->next;
        delete temp;

        --count;
    }

    const T& top() const {
        if (empty()) {
            throw std::underflow_error("Stack is empty");
        }

        return topNode->data;
    }
};
```

---

## 21. Array Stack vs. Linked Stack

| Property | Array Stack | Linked Stack |
|---|---:|---:|
| `push()` | \(O(1)\) | \(O(1)\) |
| `pop()` | \(O(1)\) | \(O(1)\) |
| `top()` | \(O(1)\) | \(O(1)\) |
| Contiguous memory | Yes | No |
| Per-element pointer overhead | No | Yes |
| Fixed capacity | Possibly | No fixed array capacity |
| Cache locality | Usually strong | Usually weaker |
| Dynamic allocation per push | Usually no | Usually yes |

The asymptotic complexities are similar, but their memory behavior and implementation costs differ.

---

## 22. `std::stack` in C++

The C++ Standard Library provides a stack container adapter:

```cpp
#include <stack>
```

Example:

```cpp
#include <iostream>
#include <stack>

int main() {
    std::stack<int> s;

    s.push(15);
    s.push(6);
    s.push(2);
    s.push(9);

    std::cout << "Top: " << s.top() << '\n';

    s.pop();

    std::cout << "New top: " << s.top() << '\n';
    std::cout << "Size: " << s.size() << '\n';

    return 0;
}
```

Output:

```text
Top: 9
New top: 2
Size: 3
```

An important C++ detail is that `std::stack::pop()` does **not** return the removed value.

This is incorrect:

```cpp
int x = s.pop();
```

Instead:

```cpp
int x = s.top();
s.pop();
```

---

## 23. `std::stack` as a Container Adapter

`std::stack` is a **container adapter**. It provides stack behavior by restricting the interface of an underlying sequence container.

Conceptually:

```text
Underlying container
        ↓
+------------------------+
| sequence storage       |
+------------------------+
        ↓
   std::stack
        ↓
 push / pop / top
```

By default, `std::stack` uses `std::deque` as its underlying container.

For example:

```cpp
std::stack<int> s;
```

is conceptually equivalent to:

```cpp
std::stack<int, std::deque<int>> s;
```

A vector can also be used:

```cpp
std::stack<int, std::vector<int>> s;
```

This illustrates an important distinction:

> A stack describes **behavior**, while an array, vector, deque, or linked list describes **representation**.

---

## 24. Why Stacks Appear in Computer Science

Stacks are useful whenever the most recently created unfinished task should be processed first.

Common applications include:

- nested function calls,
- recursion,
- expression evaluation,
- delimiter matching,
- parsing,
- undo operations,
- browser history,
- depth-first search,
- tree traversal,
- backtracking.

The common pattern is:

> **Return to the most recent unfinished state first.**

---

## 25. The Runtime Call Stack

Consider:

```cpp
void c() {
    std::cout << "C\n";
}

void b() {
    c();
}

void a() {
    b();
}

int main() {
    a();
}
```

Execution conceptually creates stack frames.

Initially:

```text
main()
```

Then:

```text
a()
main()
```

Then:

```text
b()
a()
main()
```

Then:

```text
c()
b()
a()
main()
```

When `c()` completes, its frame is removed first. Then `b()`, then `a()`, and finally `main()`.

This is LIFO behavior.

---

## 26. Recursion and Stacks

Consider:

```cpp
int factorial(int n) {
    if (n <= 1) {
        return 1;
    }

    return n * factorial(n - 1);
}
```

Calling:

```cpp
factorial(4);
```

produces nested calls:

```text
factorial(4)
factorial(3)
factorial(2)
factorial(1)
```

Conceptually, the call stack becomes:

```text
top
 ↓
factorial(1)
factorial(2)
factorial(3)
factorial(4)
main()
```

The calls complete in reverse order:

```text
factorial(1) → 1
factorial(2) → 2
factorial(3) → 6
factorial(4) → 24
```

Recursion therefore naturally relies on stack behavior.

---

## 27. Parenthesis and Delimiter Matching

Consider:

```text
((a + b) * (c - d))
```

Whenever an opening delimiter is encountered, push it.

Whenever a closing delimiter is encountered, compare it with the current top.

For the sequence:

```text
(
(
)
(
)
)
```

the stack evolves as:

```text
Read '(' → (
Read '(' → ((
Read ')' → (
Read '(' → ((
Read ')' → (
Read ')' → empty
```

At the end:

\[
S=\emptyset
\]

so the parentheses are balanced.

---

## 28. C++ Balanced-Delimiter Algorithm

```cpp
#include <iostream>
#include <stack>
#include <string>

bool matching(char open, char close) {
    return (open == '(' && close == ')') ||
           (open == '[' && close == ']') ||
           (open == '{' && close == '}');
}

bool balanced(const std::string& expression) {
    std::stack<char> s;

    for (char c : expression) {
        if (c == '(' || c == '[' || c == '{') {
            s.push(c);
        }
        else if (c == ')' || c == ']' || c == '}') {
            if (s.empty()) {
                return false;
            }

            if (!matching(s.top(), c)) {
                return false;
            }

            s.pop();
        }
    }

    return s.empty();
}

int main() {
    std::cout << std::boolalpha;

    std::cout << balanced("{(a+b)*[c-d]}") << '\n';
    std::cout << balanced("{(a+b]*c}") << '\n';
}
```

Output:

```text
true
false
```

---

## 29. Complexity of Delimiter Matching

For an expression containing \(n\) characters, every character is examined once.

Therefore:

\[
T(n)=\Theta(n)
\]

In the worst case, all characters may be opening delimiters, so the stack may contain \(n\) elements.

Thus:

\[
S(n)=O(n)
\]

---

## 30. Postfix Expression Evaluation

Stacks are useful for evaluating postfix expressions.

Consider:

```text
5 2 + 3 *
```

This represents:

\[
(5+2)\times3
\]

Processing left to right:

1. Push `5`.
2. Push `2`.
3. Encounter `+`.
4. Pop `2` and `5`.
5. Compute \(5+2=7\).
6. Push `7`.
7. Push `3`.
8. Encounter `*`.
9. Compute \(7\times3=21\).

The final result is:

\[
21
\]

---

## 31. Operand Ordering Matters

For a binary operator:

```cpp
int right = s.top();
s.pop();

int left = s.top();
s.pop();
```

The operation must be:

```cpp
left op right
```

For example:

```text
8 2 -
```

must produce:

\[
8-2=6
\]

Reversing the operands would incorrectly produce:

\[
2-8=-6
\]

This is a common error in stack-based expression evaluation.

---

## 32. Depth-First Search

A stack can be used to implement **Depth-First Search (DFS)**.

A simplified iterative form is:

```cpp
std::stack<int> s;
s.push(start);

while (!s.empty()) {
    int v = s.top();
    s.pop();

    if (!visited[v]) {
        visited[v] = true;

        for (int neighbor : graph[v]) {
            if (!visited[neighbor]) {
                s.push(neighbor);
            }
        }
    }
}
```

Because the most recently discovered vertex is processed first, the search tends to continue deeper along the current path before returning to earlier alternatives.

---

## 33. Undo Systems

Suppose a text editor records:

```text
Type "A"
Type "B"
Delete "B"
Insert "C"
```

The undo stack conceptually contains:

```text
top
 ↓
Insert C
Delete B
Type B
Type A
```

The newest action is undone first.

More sophisticated applications commonly use two stacks:

```text
Undo Stack
Redo Stack
```

An undone action can be transferred to the redo stack, allowing it to be restored later.

---

## 34. Browser Back Navigation

Suppose pages are visited in this order:

```text
A → B → C → D
```

Previous pages can be stored as:

```text
top
 ↓
C
B
A
```

Pressing Back returns to `C`. Pressing Back again returns to `B`.

The most recently visited previous page is therefore retrieved first.

---

## 35. Reversing Data Using a Stack

A stack naturally reverses access order.

Suppose the input is:

```text
A B C D
```

After pushing each character:

```text
bottom → A B C D ← top
```

Repeated pops produce:

```text
D C B A
```

C++:

```cpp
#include <stack>
#include <string>

std::string reverseString(const std::string& input) {
    std::stack<char> s;

    for (char c : input) {
        s.push(c);
    }

    std::string result;

    while (!s.empty()) {
        result += s.top();
        s.pop();
    }

    return result;
}
```

For an input of length \(n\):

\[
T(n)=\Theta(n)
\]

and:

\[
S(n)=\Theta(n)
\]

---

## 36. Mathematical Properties of Stack Operations

Suppose \(p\) pushes and \(q\) pops are performed starting from an empty stack.

For the operation sequence to remain valid, at every prefix:

\[
\#\text{pops}\leq\#\text{pushes}
\]

Otherwise, the algorithm attempts to pop an empty stack.

At the end:

\[
|S|=p-q
\]

For example:

```text
push
push
push
pop
push
pop
```

Here:

\[
p=4
\]

and:

\[
q=2
\]

Therefore:

\[
|S|=4-2=2
\]

---

## 37. Formal Stack Invariant During an Algorithm

Suppose a program performs operations:

\[
o_1,o_2,\ldots,o_m
\]

Let \(P(i)\) be the number of pushes during the first \(i\) operations and \(Q(i)\) the number of pops.

The stack size after operation \(i\) is:

\[
|S_i|=P(i)-Q(i)
\]

For a valid sequence:

\[
P(i)-Q(i)\geq0
\]

for every:

\[
1\leq i\leq m
\]

This provides a formal condition for avoiding stack underflow.

---

## 38. Common Implementation Mistakes

### Incorrect Initialization

If `topIndex` represents the last occupied zero-based index, this is incorrect:

```cpp
int topIndex = 0;
```

It incorrectly suggests that position zero already contains an active stack element.

Correct:

```cpp
int topIndex = -1;
```

### Writing Before Incrementing

Incorrect:

```cpp
data[topIndex] = value;
++topIndex;
```

when `topIndex` represents the current top.

Correct:

```cpp
data[++topIndex] = value;
```

### Failing to Detect Overflow

Writing:

```cpp
data[++topIndex] = value;
```

without checking capacity may access memory outside the valid array.

### Failing to Detect Underflow

Writing:

```cpp
return data[topIndex--];
```

without checking whether the stack is empty can access an invalid position.

---

## 39. Preconditions and Postconditions

Stack operations can be specified formally.

### `push(x)`

For a fixed-capacity stack, the precondition is:

\[
|S|<N
\]

After a successful push:

\[
|S'|=|S|+1
\]

and:

\[
top(S')=x
\]

### `pop()`

The precondition is:

\[
|S|>0
\]

After a successful pop:

\[
|S'|=|S|-1
\]

The returned value is the previous top:

\[
return=top(S)
\]

These specifications describe the ADT independently of its physical implementation.

---

## 40. Stack Correctness Property

Suppose:

\[
S_0=\langle\rangle
\]

and we perform:

\[
push(x_1),push(x_2),\ldots,push(x_n)
\]

Successive pops must return:

\[
x_n,x_{n-1},\ldots,x_1
\]

Thus:

\[
\boxed{
push(x_1),\ldots,push(x_n)
\Rightarrow
pop()=x_n,\ldots,pop()=x_1
}
\]

This reverse relationship expresses the fundamental correctness requirement of a stack.

---

## 41. Stack Versus Queue

Stacks and queues are both restricted linear data structures, but their removal policies differ.

A stack follows:

\[
\text{LIFO}
\]

A queue follows:

\[
\text{FIFO}
\]

For insertion order:

\[
A,B,C,D
\]

a stack removes:

\[
D,C,B,A
\]

while a queue removes:

\[
A,B,C,D
\]

The appropriate structure therefore depends on the ordering semantics required by the problem.

---

## 42. When Should You Think "Stack"?

A stack is a strong candidate when a problem contains one or more of these patterns:

- the most recent item must be processed first,
- nested structures must be matched,
- computation must return to a previous state,
- actions must be reversed,
- an algorithm explores deeply before returning,
- function calls are nested,
- operands or operators must be temporarily stored,
- backtracking is required.

A useful question is:

> **Do I need to return to the most recent unfinished state?**

If the answer is yes, a stack is often an appropriate data structure.

---

## Conclusion

A stack is a linear **Last-In, First-Out (LIFO)** abstract data type. Elements are inserted, removed, and inspected from one end called the **top**.

For an array-based implementation, a top index identifies the most recently inserted element. Attempting to remove an element from an empty stack causes **underflow**, while inserting into a full fixed-capacity stack causes **overflow**.

The fundamental operations have constant-time complexity:

\[
push=O(1)
\]

\[
pop=O(1)
\]

\[
top=O(1)
\]

\[
empty=O(1)
\]

An array implementation offers simple constant-time operations and strong memory locality. A dynamically growing vector provides amortized \(O(1)\) insertion at the end, while a linked-list implementation supports constant-time push and pop without a fixed array capacity.

In C++, `std::stack` provides the stack abstraction directly through a container adapter.

Most importantly, a stack represents an ordering rule:

\[
\boxed{\text{Last In} \rightarrow \text{First Out}}
\]

This rule makes stacks fundamental to recursion, runtime call stacks, parsing, delimiter matching, expression evaluation, undo systems, depth-first search, backtracking, and many other algorithms.
