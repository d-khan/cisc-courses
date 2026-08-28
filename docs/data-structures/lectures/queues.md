# Queues

## Introduction

A **queue** is a linear abstract data type in which elements are inserted at one end and removed from the other. A queue follows the **First-In, First-Out (FIFO)** policy: the element that has been in the queue the longest is removed first.

Suppose the following operations are performed:

```text
enqueue(15)
enqueue(6)
enqueue(2)
enqueue(9)
```

The logical queue becomes:

```text
front                         rear
  ↓                             ↓
+----+----+----+----+
| 15 |  6 |  2 |  9 |
+----+----+----+----+
```

Calling:

```text
dequeue()
```

removes `15`, not `9`.

The queue becomes:

```text
front                   rear
  ↓                       ↓
+----+----+----+
|  6 |  2 |  9 |
+----+----+----+
```

Thus:

\[
\boxed{\text{First In} \rightarrow \text{First Out}}
\]

---

## 1. Queue as an Abstract Data Type

Like a stack, a queue is an **Abstract Data Type (ADT)**. The queue ADT specifies its behavior without requiring a particular physical implementation.

A queue can be represented mathematically as:

\[
Q=\langle a_1,a_2,\ldots,a_k\rangle
\]

where:

- \(a_1\) is the **front** element,
- \(a_k\) is the **rear** element,
- \(k\) is the number of elements currently stored.

The empty queue is:

\[
Q=\langle\rangle
\]

and:

\[
|Q|=0
\]

Suppose:

\[
Q=\langle10,20,30\rangle
\]

Then:

```text
front             rear
  ↓                 ↓
 10      20        30
```

If we enqueue `40`:

\[
Q'=\langle10,20,30,40\rangle
\]

If we then dequeue:

\[
dequeue(Q')=10
\]

leaving:

\[
Q''=\langle20,30,40\rangle
\]

The oldest element is always removed first.

---

## 2. Restricted Access

A queue restricts how elements can be inserted and removed.

Insertion occurs at the:

\[
\boxed{\text{rear}}
\]

Removal occurs at the:

\[
\boxed{\text{front}}
\]

The fundamental queue interface normally includes:

```text
enqueue(x)
dequeue()
front()
empty()
size()
```

For a fixed-capacity implementation, it may also include:

```text
full()
```

Operations such as arbitrary insertion or removal would violate the queue abstraction.

---

## 3. Fundamental Queue Operations

| Operation | Description | Typical Complexity |
|---|---|---:|
| `enqueue(x)` | Insert `x` at the rear | \(O(1)\) |
| `dequeue()` | Remove the front element | \(O(1)\) |
| `front()` | Examine the front element | \(O(1)\) |
| `empty()` | Determine whether the queue is empty | \(O(1)\) |
| `full()` | Test whether a fixed queue is full | \(O(1)\) |
| `size()` | Return the number of elements | \(O(1)\) |

---

## 4. Why a Simple Array Implementation Is Problematic

Suppose a queue is stored in an array:

```text
Index     0    1    2    3    4    5
        +----+----+----+----+----+----+
        | 10 | 20 | 30 | 40 |    |    |
        +----+----+----+----+----+----+
          ↑              ↑
        front           rear
```

After removing `10`, a naive implementation might shift every remaining element left:

```text
Before:
10 20 30 40

After:
20 30 40
```

For \(n\) elements, this can require approximately:

\[
n-1
\]

assignments. Therefore:

\[
T_{\text{dequeue}}(n)=O(n)
\]

A better approach is to avoid moving the elements and instead move the front and rear indices. This leads to the **circular queue**.

---

## 5. Circular Array Queue

A circular queue treats the array as though the final position is followed by the first position.

Suppose:

\[
N=8
\]

The physical indices are:

```text
0 1 2 3 4 5 6 7
```

Logically, they form a circle:

```text
0 → 1 → 2 → 3 → 4 → 5 → 6 → 7
↑                               ↓
+-------------------------------+
```

After index `7`, the next index is `0`. This is called **wraparound**.

---

## 6. Mathematical Wraparound

For capacity \(N\), the next circular index can be calculated as:

\[
next(i)=(i+1)\bmod N
\]

For example, if:

\[
N=8
\]

then:

\[
next(3)=(3+1)\bmod8=4
\]

and:

\[
next(7)=(7+1)\bmod8=0
\]

In C++:

```cpp
index = (index + 1) % capacity;
```

The modulo operation provides the circular behavior.

---

## 7. Queue State

A practical circular queue can maintain:

```cpp
int frontIndex;
int rearIndex;
int count;
```

where:

- `frontIndex` identifies the element that will be removed next,
- `rearIndex` identifies the next available insertion position,
- `count` stores the number of elements currently in the queue.

For capacity \(N\):

\[
0\leq frontIndex<N
\]

\[
0\leq rearIndex<N
\]

and:

\[
0\leq count\leq N
\]

The queue is empty when:

\[
count=0
\]

and full when:

\[
count=N
\]

---

## 8. Queue Invariant

An **invariant** is a property that must remain true after every valid operation.

For a circular queue:

\[
0\leq count\leq N
\]

When the queue is nonempty, `frontIndex` identifies the oldest element. `rearIndex` identifies the location where the next element will be inserted.

Every `enqueue()` and `dequeue()` operation must preserve these properties.

---

## 9. Implementing `enqueue()`

Suppose `rearIndex` identifies the next free location. Calling:

```cpp
enqueue(40);
```

performs:

\[
A[rearIndex]\leftarrow40
\]

Then the rear advances:

\[
rearIndex\leftarrow(rearIndex+1)\bmod N
\]

and the number of stored elements increases:

\[
count\leftarrow count+1
\]

C++:

```cpp
void enqueue(int value) {
    if (full()) {
        throw std::overflow_error("Queue overflow");
    }

    data[rearIndex] = value;
    rearIndex = (rearIndex + 1) % CAPACITY;
    ++count;
}
```

---

## 10. Implementing `dequeue()`

Suppose the queue is:

```text
front
  ↓
+----+----+----+----+
| 10 | 20 | 30 | 40 |
+----+----+----+----+
```

A dequeue removes `10`.

First:

\[
value=A[frontIndex]
\]

Then advance the front:

\[
frontIndex\leftarrow(frontIndex+1)\bmod N
\]

Finally:

\[
count\leftarrow count-1
\]

C++:

```cpp
int dequeue() {
    if (empty()) {
        throw std::underflow_error("Queue underflow");
    }

    int value = data[frontIndex];
    frontIndex = (frontIndex + 1) % CAPACITY;
    --count;

    return value;
}
```

---

## 11. Queue Underflow

A queue underflows when a dequeue operation is attempted while the queue is empty.

Mathematically:

\[
|Q|=0
\]

makes:

\[
dequeue(Q)
\]

undefined.

In C++:

```cpp
if (empty()) {
    throw std::underflow_error("Queue underflow");
}
```

---

## 12. Queue Overflow

For a fixed-capacity queue:

\[
|Q|=N
\]

means all available positions are occupied.

Attempting another enqueue operation causes **queue overflow**.

Using `count`:

```cpp
bool full() const {
    return count == CAPACITY;
}
```

---

## 13. Complete Circular Queue in C++

```cpp
#include <iostream>
#include <stdexcept>

class Queue {
private:
    static const int CAPACITY = 100;

    int data[CAPACITY];
    int frontIndex;
    int rearIndex;
    int count;

public:
    Queue()
        : frontIndex(0),
          rearIndex(0),
          count(0) {}

    bool empty() const {
        return count == 0;
    }

    bool full() const {
        return count == CAPACITY;
    }

    int size() const {
        return count;
    }

    void enqueue(int value) {
        if (full()) {
            throw std::overflow_error("Queue overflow");
        }

        data[rearIndex] = value;
        rearIndex = (rearIndex + 1) % CAPACITY;
        ++count;
    }

    int dequeue() {
        if (empty()) {
            throw std::underflow_error("Queue underflow");
        }

        int value = data[frontIndex];
        frontIndex = (frontIndex + 1) % CAPACITY;
        --count;

        return value;
    }

    int front() const {
        if (empty()) {
            throw std::underflow_error("Queue is empty");
        }

        return data[frontIndex];
    }
};
```

Example:

```cpp
int main() {
    Queue q;

    q.enqueue(15);
    q.enqueue(6);
    q.enqueue(2);
    q.enqueue(9);

    std::cout << "Front: " << q.front() << '\n';
    std::cout << "Size: " << q.size() << '\n';

    std::cout << "Removed: " << q.dequeue() << '\n';
    std::cout << "New front: " << q.front() << '\n';

    return 0;
}
```

Output:

```text
Front: 15
Size: 4
Removed: 15
New front: 6
```

---

## 14. Tracing a Circular Queue

Consider a queue with:

\[
N=5
\]

Initially:

```text
frontIndex = 0
rearIndex  = 0
count      = 0
```

Perform:

```text
enqueue(10)
enqueue(20)
enqueue(30)
enqueue(40)
```

The physical representation is:

```text
Index      0    1    2    3    4
         +----+----+----+----+----+
         | 10 | 20 | 30 | 40 |    |
         +----+----+----+----+----+
           ↑                   ↑
         front               rear
```

Now perform:

```text
dequeue()
dequeue()
```

which removes `10` and `20`.

The array may physically still contain the old values, but logically the queue contains only:

```text
30 40
```

No elements need to be shifted.

---

## 15. Circular Wraparound Example

Suppose:

```text
frontIndex = 2
rearIndex  = 4
```

and the capacity is:

\[
N=5
\]

Calling:

```cpp
enqueue(50);
```

stores `50` at index `4`.

Then:

\[
rearIndex=(4+1)\bmod5=0
\]

The next insertion wraps to the beginning.

Calling:

```cpp
enqueue(60);
```

stores `60` at index `0`.

Physical memory may appear as:

```text
Index      0    1    2    3    4
         +----+----+----+----+----+
         | 60 |    | 30 | 40 | 50 |
         +----+----+----+----+----+
                ↑    ↑
              rear front
```

The logical queue order is:

```text
30 → 40 → 50 → 60
```

Physical array order and logical queue order are therefore not always the same.

---

## 16. Logical Position Versus Physical Position

Suppose the front is at physical index \(f\).

The logical element at queue position \(i\) is located at:

\[
(f+i)\bmod N
\]

where:

\[
0\leq i<count
\]

For example, if:

\[
N=8
\]

and:

\[
f=6
\]

then:

\[
i=0\Rightarrow(6+0)\bmod8=6
\]

\[
i=1\Rightarrow(6+1)\bmod8=7
\]

\[
i=2\Rightarrow(6+2)\bmod8=0
\]

\[
i=3\Rightarrow(6+3)\bmod8=1
\]

Thus the logical queue can cross the physical end of the array without moving existing elements.

---

## 17. Why Circular Queues Matter

Without circular reuse, repeated dequeue operations can leave unused positions at the beginning of the array.

Circular indexing allows those positions to be reused after the rear reaches the physical end of the array.

This provides:

- efficient memory reuse,
- no element shifting,
- constant-time enqueue,
- constant-time dequeue.

---

## 18. Complexity Analysis

Let \(n\) be the current number of elements.

### Enqueue

The operation performs a constant number of actions:

- capacity check,
- array assignment,
- modulo calculation,
- index update,
- count update.

Therefore:

\[
T_{\text{enqueue}}(n)=\Theta(1)
\]

### Dequeue

The operation performs:

- empty check,
- array access,
- modulo calculation,
- index update,
- count update.

Therefore:

\[
T_{\text{dequeue}}(n)=\Theta(1)
\]

### Front

The front element is already identified:

\[
T_{\text{front}}(n)=\Theta(1)
\]

### Empty and Size

Both use stored metadata:

\[
T_{\text{empty}}(n)=\Theta(1)
\]

\[
T_{\text{size}}(n)=\Theta(1)
\]

Thus:

\[
\boxed{
enqueue,\ dequeue,\ front,\ empty,\ size = O(1)
}
\]

---

## 19. Why Dequeue Should Not Shift Elements

If every dequeue shifts the remaining elements left, removing all \(n\) elements can require:

\[
(n-1)+(n-2)+\cdots+1
\]

Using the arithmetic-series formula:

\[
1+2+\cdots+(n-1)=\frac{n(n-1)}{2}
\]

Therefore:

\[
T(n)=\Theta(n^2)
\]

for repeatedly emptying such a poorly implemented queue.

With circular indexing, \(n\) dequeues require only:

\[
\Theta(n)
\]

total time.

---

## 20. Generic Circular Queue Using Templates

```cpp
#include <cstddef>
#include <stdexcept>

template <typename T, std::size_t Capacity>
class CircularQueue {
private:
    T data[Capacity];

    std::size_t frontIndex;
    std::size_t rearIndex;
    std::size_t count;

public:
    CircularQueue()
        : frontIndex(0),
          rearIndex(0),
          count(0) {}

    bool empty() const {
        return count == 0;
    }

    bool full() const {
        return count == Capacity;
    }

    std::size_t size() const {
        return count;
    }

    void enqueue(const T& value) {
        if (full()) {
            throw std::overflow_error("Queue overflow");
        }

        data[rearIndex] = value;
        rearIndex = (rearIndex + 1) % Capacity;
        ++count;
    }

    T dequeue() {
        if (empty()) {
            throw std::underflow_error("Queue underflow");
        }

        T value = data[frontIndex];
        frontIndex = (frontIndex + 1) % Capacity;
        --count;

        return value;
    }

    const T& front() const {
        if (empty()) {
            throw std::underflow_error("Queue is empty");
        }

        return data[frontIndex];
    }
};
```

Examples:

```cpp
CircularQueue<int, 100> numbers;
CircularQueue<double, 50> measurements;
CircularQueue<std::string, 25> requests;
```

---

## 21. Linked-List Queue

A queue can also be implemented using a linked list.

To support constant-time insertion and removal, maintain pointers to both the front and rear:

```text
front                           rear
  ↓                               ↓
+----+-----+    +----+-----+    +----+------+
| 10 |  *--+--->| 20 |  *--+--->| 30 | null |
+----+-----+    +----+-----+    +----+------+
```

Enqueue inserts after the rear.

Dequeue removes from the front.

Therefore:

\[
T_{\text{enqueue}}(n)=O(1)
\]

and:

\[
T_{\text{dequeue}}(n)=O(1)
\]

---

## 22. Why Both Front and Rear Pointers Matter

If a linked queue maintained only the front pointer, inserting at the rear could require traversing the entire list:

```text
front
 ↓
10 → 20 → 30 → 40 → null
```

This would require:

\[
O(n)
\]

time.

Maintaining a rear pointer avoids the traversal:

```cpp
rear->next = newNode;
rear = newNode;
```

Therefore:

\[
O(n)\rightarrow O(1)
\]

A small amount of additional state improves the asymptotic performance.

---

## 23. Linked Queue in C++

```cpp
#include <cstddef>
#include <stdexcept>

template <typename T>
class LinkedQueue {
private:
    struct Node {
        T data;
        Node* next;

        explicit Node(const T& value)
            : data(value), next(nullptr) {}
    };

    Node* frontNode;
    Node* rearNode;
    std::size_t count;

public:
    LinkedQueue()
        : frontNode(nullptr),
          rearNode(nullptr),
          count(0) {}

    ~LinkedQueue() {
        while (!empty()) {
            dequeue();
        }
    }

    bool empty() const {
        return frontNode == nullptr;
    }

    std::size_t size() const {
        return count;
    }

    void enqueue(const T& value) {
        Node* newNode = new Node(value);

        if (empty()) {
            frontNode = newNode;
            rearNode = newNode;
        }
        else {
            rearNode->next = newNode;
            rearNode = newNode;
        }

        ++count;
    }

    T dequeue() {
        if (empty()) {
            throw std::underflow_error("Queue underflow");
        }

        Node* temp = frontNode;
        T value = temp->data;

        frontNode = frontNode->next;

        if (frontNode == nullptr) {
            rearNode = nullptr;
        }

        delete temp;
        --count;

        return value;
    }

    const T& front() const {
        if (empty()) {
            throw std::underflow_error("Queue is empty");
        }

        return frontNode->data;
    }
};
```

For an empty linked queue:

\[
frontNode=nullptr
\iff
rearNode=nullptr
\]

When the last node is removed, both pointers must be reset.

---

## 24. Circular Array Queue vs. Linked Queue

| Property | Circular Array | Linked List |
|---|---:|---:|
| Enqueue | \(O(1)\) | \(O(1)\) |
| Dequeue | \(O(1)\) | \(O(1)\) |
| Front | \(O(1)\) | \(O(1)\) |
| Contiguous memory | Yes | No |
| Pointer overhead | No | Yes |
| Fixed capacity | Usually | No fixed array capacity |
| Cache locality | Strong | Usually weaker |
| Dynamic allocation per enqueue | No | Usually yes |

The asymptotic performance is similar, but the memory behavior differs.

---

## 25. `std::queue` in C++

The C++ Standard Library provides:

```cpp
#include <queue>
```

Example:

```cpp
#include <iostream>
#include <queue>

int main() {
    std::queue<int> q;

    q.push(15);
    q.push(6);
    q.push(2);
    q.push(9);

    std::cout << "Front: " << q.front() << '\n';
    std::cout << "Back: " << q.back() << '\n';

    q.pop();

    std::cout << "New front: " << q.front() << '\n';
    std::cout << "Size: " << q.size() << '\n';

    return 0;
}
```

Output:

```text
Front: 15
Back: 9
New front: 6
Size: 3
```

The Standard Library uses:

```cpp
q.push(value);
q.pop();
q.front();
q.back();
```

rather than the names `enqueue()` and `dequeue()`, but the behavior remains FIFO.

---

## 26. Important C++ Detail: `pop()` Does Not Return the Element

`std::queue::pop()` removes the front element but does not return it.

This is incorrect:

```cpp
int value = q.pop();
```

Instead:

```cpp
int value = q.front();
q.pop();
```

The two operations are separate:

```text
front() → inspect
pop()   → remove
```

---

## 27. `std::queue` as a Container Adapter

`std::queue` is a **container adapter**. It exposes queue behavior over an underlying sequence container.

Conceptually:

```text
Underlying container
         ↓
+-----------------------+
| sequence storage      |
+-----------------------+
         ↓
      std::queue
         ↓
 push / pop / front
```

The queue abstraction determines the access pattern, while the underlying container determines the physical representation.

---

## 28. Processing Requests in Arrival Order

Queues naturally model systems where requests should be processed in arrival order.

Suppose jobs arrive:

```text
Job A
Job B
Job C
Job D
```

They enter:

```text
front                       rear
  ↓                           ↓
+-----+-----+-----+-----+
|  A  |  B  |  C  |  D  |
+-----+-----+-----+-----+
```

The processing order is:

\[
A\rightarrow B\rightarrow C\rightarrow D
\]

This preserves arrival order.

---

## 29. Print Queue

A print server is a common queue application.

Suppose print jobs arrive:

```text
Report.pdf
Lecture.pdf
Assignment.pdf
```

The queue becomes:

```text
front                                 rear
  ↓                                     ↓
Report.pdf → Lecture.pdf → Assignment.pdf
```

When the printer becomes available, the oldest waiting job is processed first.

After printing `Report.pdf`:

```text
front                     rear
  ↓                         ↓
Lecture.pdf → Assignment.pdf
```

---

## 30. Hardware and Real-Time Systems

Queues can also be used to hold pending hardware or real-time system events.

Events may arrive faster than they can immediately be processed:

```text
Incoming events
      ↓
+----------------------+
| Event 1              | ← front
| Event 2              |
| Event 3              | ← rear
+----------------------+
      ↓
Processor
```

The queue separates event arrival from event processing.

---

## 31. Producer-Consumer Model

A common queue pattern is:

```text
Producer → Queue → Consumer
```

The producer creates work:

```cpp
queue.push(task);
```

The consumer retrieves work:

```cpp
Task task = queue.front();
queue.pop();
```

Examples include:

- server requests,
- background jobs,
- logging systems,
- event processing,
- message processing,
- task scheduling.

The queue acts as a buffer between components that may operate at different rates.

---

## 32. Breadth-First Search

A major algorithmic application of queues is **Breadth-First Search (BFS)**.

Consider:

```text
        A
      /   \
     B     C
    / \     \
   D   E     F
```

Starting at `A`, BFS visits vertices level by level:

```text
A
B C
D E F
```

FIFO ordering is what produces this behavior.

---

## 33. BFS Using `std::queue`

```cpp
#include <iostream>
#include <queue>
#include <vector>

void bfs(const std::vector<std::vector<int>>& graph, int start) {
    std::vector<bool> visited(graph.size(), false);
    std::queue<int> q;

    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int vertex = q.front();
        q.pop();

        std::cout << vertex << ' ';

        for (int neighbor : graph[vertex]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}
```

When a vertex is discovered, it joins the rear of the queue. Vertices discovered earlier are processed earlier.

---

## 34. BFS Complexity

For a graph represented with adjacency lists:

\[
G=(V,E)
\]

BFS processes each vertex at most once and examines each edge a constant number of times.

Therefore:

\[
\boxed{T(V,E)=O(V+E)}
\]

The queue can contain up to:

\[
O(V)
\]

vertices, so its auxiliary space is:

\[
O(V)
\]

---

## 35. Queue State After Operations

Suppose we start with:

\[
Q=\langle\rangle
\]

and perform:

```text
enqueue(5)
enqueue(10)
enqueue(15)
dequeue()
enqueue(20)
dequeue()
```

After the first three operations:

\[
Q=\langle5,10,15\rangle
\]

The first dequeue returns:

\[
5
\]

leaving:

\[
Q=\langle10,15\rangle
\]

Then:

\[
Q=\langle10,15,20\rangle
\]

after `enqueue(20)`.

The next dequeue returns:

\[
10
\]

leaving:

\[
\boxed{Q=\langle15,20\rangle}
\]

The current front is therefore:

\[
15
\]

---

## 36. Mathematical Queue Size

Suppose a queue begins empty.

Let:

\[
E(i)
\]

be the number of enqueue operations through operation \(i\), and:

\[
D(i)
\]

be the number of dequeue operations.

Then:

\[
|Q_i|=E(i)-D(i)
\]

For a valid operation sequence:

\[
E(i)-D(i)\geq0
\]

for every prefix.

For a fixed-capacity queue:

\[
E(i)-D(i)\leq N
\]

must also hold.

Therefore:

\[
\boxed{0\leq E(i)-D(i)\leq N}
\]

is a useful invariant for a bounded queue.

---

## 37. Queue Preconditions and Postconditions

### `enqueue(x)`

For a fixed-capacity queue, the precondition is:

\[
|Q|<N
\]

If:

\[
Q=\langle a_1,\ldots,a_k\rangle
\]

then after enqueue:

\[
Q'=\langle a_1,\ldots,a_k,x\rangle
\]

and:

\[
|Q'|=|Q|+1
\]

### `dequeue()`

The precondition is:

\[
|Q|>0
\]

If:

\[
Q=\langle a_1,a_2,\ldots,a_k\rangle
\]

then:

\[
dequeue(Q)=a_1
\]

and:

\[
Q'=\langle a_2,\ldots,a_k\rangle
\]

Therefore:

\[
|Q'|=|Q|-1
\]

---

## 38. FIFO Correctness Property

Suppose:

\[
Q_0=\langle\rangle
\]

and we perform:

\[
enqueue(x_1),
enqueue(x_2),
\ldots,
enqueue(x_n)
\]

Successive dequeue operations must return:

\[
x_1,x_2,\ldots,x_n
\]

Therefore:

\[
\boxed{
enqueue(x_1),\ldots,enqueue(x_n)
\Rightarrow
dequeue()=x_1,\ldots,dequeue()=x_n
}
\]

This expresses the fundamental correctness property of a queue.

---

## 39. Common Circular Queue Mistakes

### Forgetting Wraparound

Incorrect:

```cpp
++rearIndex;
```

Correct:

```cpp
rearIndex = (rearIndex + 1) % CAPACITY;
```

### Shifting Elements During Dequeue

Avoid:

```cpp
for (int i = 1; i < count; ++i) {
    data[i - 1] = data[i];
}
```

This changes dequeue from:

\[
O(1)
\]

to:

\[
O(n)
\]

### Failing to Detect Underflow

```cpp
if (empty()) {
    throw std::underflow_error("Queue underflow");
}
```

### Failing to Detect Overflow

```cpp
if (full()) {
    throw std::overflow_error("Queue overflow");
}
```

---

## 40. Empty-versus-Full Ambiguity

A circular queue that stores only:

```cpp
frontIndex
rearIndex
```

can encounter an ambiguity when:

\[
frontIndex=rearIndex
\]

That condition could represent either an empty or a full queue depending on the chosen representation.

One straightforward solution is to maintain:

```cpp
count
```

Then:

\[
count=0\Rightarrow empty
\]

and:

\[
count=N\Rightarrow full
\]

This removes the ambiguity.

---

## 41. Alternative: Reserve One Empty Slot

Another circular-buffer representation deliberately leaves one array position unused.

Then:

\[
front=rear
\]

can uniquely represent an empty queue.

The queue is full when:

\[
(rear+1)\bmod N=front
\]

However, an array with \(N\) physical positions can then hold only:

\[
N-1
\]

queue elements.

This representation trades one storage position for simpler state detection.

---

## 42. Stack Versus Queue

For insertion order:

```text
A B C D
```

a stack removes:

```text
D C B A
```

because it follows:

\[
LIFO
\]

A queue removes:

```text
A B C D
```

because it follows:

\[
FIFO
\]

| Property | Stack | Queue |
|---|---|---|
| Policy | LIFO | FIFO |
| Insert | Top | Rear |
| Remove | Top | Front |
| Common operations | `push`, `pop`, `top` | `enqueue`, `dequeue`, `front` |
| C++ adapter | `std::stack` | `std::queue` |
| Typical traversal | DFS | BFS |

---

## 43. When Should You Think "Queue"?

A queue is a strong candidate when a problem involves:

- processing requests in arrival order,
- waiting lines,
- buffering,
- task scheduling,
- breadth-first traversal,
- event processing,
- producer-consumer systems,
- print jobs,
- pending requests,
- hardware or system events.

A useful question is:

> **Should the item that has waited the longest be processed next?**

If yes, a queue is often an appropriate data structure.

---

## Conclusion

A queue is a linear **First-In, First-Out (FIFO)** abstract data type. Elements enter at the **rear** and leave from the **front**.

A circular-array implementation allows array positions to be reused by advancing the front and rear indices with modular arithmetic rather than shifting existing elements.

For a properly implemented queue:

\[
enqueue=O(1)
\]

\[
dequeue=O(1)
\]

\[
front=O(1)
\]

\[
empty=O(1)
\]

A circular array provides efficient memory reuse and constant-time operations. A linked-list queue can achieve the same asymptotic bounds by maintaining both front and rear pointers. In C++, `std::queue` provides the standard queue abstraction.

The defining ordering rule is:

\[
\boxed{\text{First In} \rightarrow \text{First Out}}
\]

This makes queues useful for print servers, hardware and real-time event handling, waiting-line systems, buffering, and other applications in which older requests should be processed before newer ones.
