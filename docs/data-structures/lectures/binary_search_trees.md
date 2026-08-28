# Chapter: Binary Search Trees

A binary search tree (BST) is an ordered, node-based data structure that organizes keys hierarchically. Unlike an ordinary binary tree, a BST imposes a relationship between each node and the keys stored in its left and right subtrees. This ordering allows a program to decide which part of the tree can contain a requested key and which part can be ignored.

Binary search trees are important because they combine dynamic storage with ordered access. Values can be inserted and removed without shifting a large block of elements, as may be necessary in an array, while the ordering of the keys supports searching, sorted traversal, minimum and maximum queries, and range-based operations. The actual efficiency of these operations depends on the shape of the tree. A relatively balanced BST can perform many common operations in `O(log N)` time, whereas a highly unbalanced tree can degrade to `O(N)`.

BSTs are also an important foundation for more advanced data structures. Self-balancing trees such as AVL trees and Red-Black trees address the performance problems caused by an unbalanced BST. The same general idea of maintaining ordered keys in a tree also helps students understand indexing structures such as B-trees and B+ trees.

This chapter develops the BST gradually, beginning with binary-tree structure and terminology before examining searching, insertion, traversal, deletion, performance, C++ implementation, and practical applications.

## Learning Objectives

By the end of this lecture, students should be able to:

- Explain what a **Binary Search Tree (BST)** is.
- Describe how a BST differs from a regular binary tree.
- Identify the root, parent, child, leaf, subtree, depth, and height of a tree.
- Explain the **BST ordering property**.
- Search for values in a BST.
- Insert new values into a BST.
- Delete values from a BST.
- Perform inorder, preorder, and postorder traversals.
- Analyze BST operations using **Big O notation**.
- Explain why a balanced BST is more efficient than a highly unbalanced BST.
- Identify practical applications of BSTs and explain when a BST is preferable to a hash table or linear structure.
- Explain how BSTs support ordered operations such as range search, predecessor, successor, minimum, and maximum.
- Implement basic BST operations in C++ using pointers and recursion.


## 1. Binary Trees: The Structural Foundation

A **binary tree** is a hierarchical data structure in which each node can have **at most two children**.

These children are normally called:

- **Left child**
- **Right child**

Example:

```text
        10
       /  \
      5    20
     / \
    2   8
```

Each value represents a **node**.

The node `10` has two children:

```text
Left child  = 5
Right child = 20
```

The node `5` also has two children:

```text
Left child  = 2
Right child = 8
```

Nodes `2`, `8`, and `20` have no children. They are called **leaf nodes**.


## 2. The Binary Search Tree

A **Binary Search Tree**, usually abbreviated as **BST**, is a binary tree that follows an ordering rule.

For every node:

```text
Values smaller than the node -> Left subtree
Values larger than the node  -> Right subtree
```

For this lecture, we will assume that duplicate values are not stored.

Consider:

```text
        50
       /  \
     30    70
    / \    / \
   20 40  60 80
```

Everything in the left subtree of `50` is smaller than `50`:

```text
20, 30, 40
```

Everything in the right subtree is larger than `50`:

```text
60, 70, 80
```

The same rule must be true for **every node and its entire subtrees**, not just its immediate children.

For node `30`:

```text
20 < 30 < 40
```

For node `70`:

```text
60 < 70 < 80
```

Therefore, this tree is a Binary Search Tree.

### The BST Invariant

The ordering rule is often called the **BST invariant**. For a node `x`:

```text
Every key in x's left subtree  < x's key
Every key in x's right subtree > x's key
```

This rule is **recursive**. It must hold for every node in the tree.

For example, this is **not** a valid BST:

```text
        50
       /  \
     30    70
       \
        60
```

Although `60` is greater than its parent `30`, it is inside the **left subtree of 50**. Every value in that subtree must be less than `50`, so the BST invariant is violated.

This invariant is what makes efficient searching possible: after one comparison, an entire subtree can be eliminated from consideration.


## 3. Binary Trees and Binary Search Trees

A binary tree only restricts the number of children. Each node can have at most two children.

It does **not** require the values to be ordered.

For example:

```text
        50
       /  \
      90   10
```

This is a valid binary tree, but it is **not** a BST because `90` is greater than `50` but appears in the left subtree.

A BST requires the ordering property:

```text
Left subtree values < Node < Right subtree values
```

So this is a BST:

```text
        50
       /  \
      30   70
```


## 4. Tree Terminology

Consider:

```text
           50
          /  \
        30    70
       / \    / \
     20  40  60  80
```

### Root

The top node in the tree.

```text
50
```

### Parent

A node that has one or more children.

For example, `30` is the parent of `20` and `40`.

### Child

A node directly connected below another node.

For example, `60` is a child of `70`.

### Leaf

A node with no children.

In our example:

```text
20, 40, 60, 80
```

are leaf nodes.

### Subtree

A node together with all of its descendants forms a subtree.

For example:

```text
       30
      /  \
    20    40
```

is the left subtree of `50`.

### Depth

The **depth** of a node is the number of edges from the root to that node.

Using a root depth of `0`:

```text
Depth of 50 = 0
Depth of 30 = 1
Depth of 20 = 2
```

### Height

In this lecture, the **height of a node** is the number of edges on the longest downward path from that node to a leaf.

A leaf therefore has height `0`.

The **height of the tree** is the height of its root.

For example:

```text
        50
       /  \
      30   70
```

has height `1`.

Height is especially important because the performance of many BST operations depends on it.


## 5. Why Binary Search Trees Are Useful

Suppose values are stored in an unsorted array:

```cpp
int numbers[] = {50, 20, 80, 30, 60, 40, 70};
```

Searching for a particular value may require examining every element.

In the worst case:

```text
O(N)
```

A BST organizes values so that each comparison tells us which direction to continue searching.

Consider:

```text
           50
          /  \
        30    70
       / \    / \
     20  40  60  80
```

Suppose we search for `60`.

Start at `50`:

```text
60 > 50
```

Go right to `70`:

```text
60 < 70
```

Go left to `60`.

The value has been found.

Search path:

```text
50 -> 70 -> 60
```

We did not have to examine every node.


## 6. Representing a BST Node in C++

A simple BST node can be represented using a `struct`:

```cpp
struct Node {
    int data;
    Node* left;
    Node* right;

    Node(int value) {
        data = value;
        left = nullptr;
        right = nullptr;
    }
};
```

Each node contains:

```text
data
left pointer
right pointer
```

For example:

```cpp
Node* root = new Node(50);
```

creates a node whose two child pointers initially contain `nullptr`:

```text
        50
       /  \
   nullptr nullptr
```


## 7. Constructing a Small Tree

We could manually connect nodes:

```cpp
Node* root = new Node(50);

root->left = new Node(30);
root->right = new Node(70);
```

Now we have:

```text
        50
       /  \
     30    70
```

We could continue:

```cpp
root->left->left = new Node(20);
root->left->right = new Node(40);

root->right->left = new Node(60);
root->right->right = new Node(80);
```

Result:

```text
           50
          /  \
        30    70
       / \    / \
     20  40  60  80
```

Manually connecting every node is not practical. Instead, BST implementations normally provide an **insert operation**.


## 8. Searching a Binary Search Tree

Suppose we want to find `40`:

```text
           50
          /  \
        30    70
       / \    / \
     20  40  60  80
```

Start at `50`:

```text
40 < 50
```

Move left to `30`:

```text
40 > 30
```

Move right to `40`.

The value has been found.

Search path:

```text
50 -> 30 -> 40
```

The search does not need to visit the other branches.


## 9. The Search Algorithm

The basic search algorithm is:

```text
Start at the root

while the current node exists:

    if target == current value
        found

    else if target < current value
        go left

    else
        go right

If nullptr is reached:
    not found
```


## 10. Iterative Search in C++

An iterative implementation:

```cpp
bool search(Node* root, int target) {
    Node* current = root;

    while (current != nullptr) {
        if (target == current->data)
            return true;

        if (target < current->data)
            current = current->left;
        else
            current = current->right;
    }

    return false;
}
```

Usage:

```cpp
if (search(root, 60))
    cout << "Found\n";
else
    cout << "Not found\n";
```


## 11. Recursive Search

BSTs naturally support recursion because every subtree is itself a binary search tree.

```cpp
bool search(Node* root, int target) {
    if (root == nullptr)
        return false;

    if (root->data == target)
        return true;

    if (target < root->data)
        return search(root->left, target);

    return search(root->right, target);
}
```

The recursive idea is:

```text
Check current node

If target is smaller:
    search left subtree

If target is larger:
    search right subtree
```


### Why the Search Works

Suppose the current node contains key `k` and the target is `t`.

If:

```text
t < k
```

then the BST invariant guarantees that every key in the right subtree is greater than `k`, and therefore cannot equal `t`. The right subtree can be discarded.

Similarly, if:

```text
t > k
```

the entire left subtree can be discarded.

Because a search follows only one path through the tree, its cost depends on the height of the tree. In a reasonably balanced BST, the height grows approximately with `log N`, so search is typically described as `O(log N)`. In a severely unbalanced tree, the search path may contain nearly every node, giving a worst-case cost of `O(N)`.

### Search Space Reduction

A common misconception is that a BST always removes exactly half of the remaining keys, as binary search does on a sorted array. That is not guaranteed. A BST chooses one **subtree**, and the sizes of the two subtrees may be very different. This is why tree balance matters.


## 12. Inserting a New Key

Suppose our BST is:

```text
        50
       /  \
     30    70
```

Now insert `40`.

Compare with `50`:

```text
40 < 50
```

Move left.

Compare with `30`:

```text
40 > 30
```

Move right.

The right child of `30` is empty, so insert `40` there:

```text
        50
       /  \
     30    70
       \
        40
```


## 13. Insertion Order Matters

Insert these values in order:

```text
50, 30, 70, 20, 40, 60, 80
```

The resulting BST is:

```text
           50
          /  \
        30    70
       / \    / \
     20  40  60  80
```

The **order of insertion affects the shape of the BST**.

This becomes important when we discuss performance.


## 14. Recursive Insertion in C++

```cpp
Node* insert(Node* root, int value) {
    if (root == nullptr)
        return new Node(value);

    if (value < root->data)
        root->left = insert(root->left, value);
    else if (value > root->data)
        root->right = insert(root->right, value);

    return root;
}
```

Usage:

```cpp
Node* root = nullptr;

root = insert(root, 50);
root = insert(root, 30);
root = insert(root, 70);
root = insert(root, 20);
root = insert(root, 40);
```

Result:

```text
        50
       /  \
     30    70
    / \
   20 40
```

Notice that the function returns a `Node*`. This is important because inserting into an empty tree creates a new root, and recursive calls may create new subtree roots.


## 15. Handling Duplicate Keys

Suppose we have:

```text
        50
       /  \
     30    70
```

What happens if we insert another `50`?

There is no universal rule. An implementation may:

- Reject or ignore duplicates.
- Store duplicates consistently on one side.
- Keep a count inside each node.

For this lecture, duplicates are ignored.

The insertion function does this because it handles only:

```cpp
value < root->data
```

and:

```cpp
value > root->data
```

No insertion occurs when the values are equal.


## 16. Traversing a Tree

A tree is not organized sequentially like an array. Therefore, we need systematic ways of visiting its nodes.

These are called **tree traversals**.

Three important depth-first traversals are:

- **Inorder**
- **Preorder**
- **Postorder**


## 17. Inorder Traversal

Inorder traversal follows:

```text
Left -> Root -> Right
```

Consider:

```text
           50
          /  \
        30    70
       / \    / \
     20  40  60  80
```

The traversal produces:

```text
20 30 40 50 60 70 80
```

An important property is:

> **Inorder traversal of a BST visits the values in sorted order.**

### C++ Example

```cpp
void inorder(Node* root) {
    if (root == nullptr)
        return;

    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}
```


## 18. Preorder Traversal

Preorder follows:

```text
Root -> Left -> Right
```

For our tree:

```text
50 30 20 40 70 60 80
```

C++:

```cpp
void preorder(Node* root) {
    if (root == nullptr)
        return;

    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}
```

Preorder is useful when a node needs to be processed before its descendants.


## 19. Postorder Traversal

Postorder follows:

```text
Left -> Right -> Root
```

For our tree:

```text
20 40 30 60 80 70 50
```

C++:

```cpp
void postorder(Node* root) {
    if (root == nullptr)
        return;

    postorder(root->left);
    postorder(root->right);
    cout << root->data << " ";
}
```

Postorder is useful when descendants need to be processed before their parent. One example is deleting an entire tree.


## 20. Remembering the Traversals

Look at where **Root** appears.

### Preorder

```text
Root Left Right
```

Root comes **before** the subtrees.

### Inorder

```text
Left Root Right
```

Root comes **in between** the subtrees.

### Postorder

```text
Left Right Root
```

Root comes **after** the subtrees.


## 21. Finding the Minimum Value

Because smaller values are stored to the left, the minimum value in a BST is found by following left pointers until no further left child exists.

Example:

```text
           50
          /
        30
       /
     20
     /
   10
```

Minimum value:

```text
10
```

C++:

```cpp
Node* findMin(Node* root) {
    if (root == nullptr)
        return nullptr;

    while (root->left != nullptr)
        root = root->left;

    return root;
}
```


## 22. Finding the Maximum Value

The maximum value is found by following right pointers until no further right child exists.

```text
50
  \
   70
     \
      80
        \
         90
```

Maximum value:

```text
90
```

C++:

```cpp
Node* findMax(Node* root) {
    if (root == nullptr)
        return nullptr;

    while (root->right != nullptr)
        root = root->right;

    return root;
}
```


## 23. Deleting from a BST

Deletion is more complicated than insertion or searching because removing a node must preserve the BST ordering property.

There are **three cases**.

### Case 1: Node Has No Children

Consider:

```text
        50
       /  \
     30    70
```

Delete `30`.

Because `30` is a leaf, it can simply be removed:

```text
        50
          \
           70
```

### Case 2: Node Has One Child

Consider:

```text
        50
       /
      30
     /
    20
```

Delete `30`.

Connect its child directly to its parent:

```text
        50
       /
      20
```

### Case 3: Node Has Two Children

Consider:

```text
           50
          /  \
        30    70
       / \    / \
     20  40  60  80
```

Suppose we delete `50`.

A common approach is to use the node's **inorder successor**, which is the smallest value in its right subtree.

The right subtree is:

```text
        70
       /  \
      60   80
```

Its minimum is `60`.

Replace `50` with `60`, and then remove the original `60` node:

```text
           60
          /  \
        30    70
       / \      \
     20  40      80
```

The BST ordering property remains valid.

Another valid strategy is to use the **inorder predecessor**, the largest value in the left subtree.


## 24. BST Deletion in C++

```cpp
Node* remove(Node* root, int value) {
    if (root == nullptr)
        return nullptr;

    if (value < root->data) {
        root->left = remove(root->left, value);
    }
    else if (value > root->data) {
        root->right = remove(root->right, value);
    }
    else {
        // Case 1 or Case 2: no left child
        if (root->left == nullptr) {
            Node* temp = root->right;
            delete root;
            return temp;
        }

        // Case 2: no right child
        if (root->right == nullptr) {
            Node* temp = root->left;
            delete root;
            return temp;
        }

        // Case 3: two children
        Node* temp = findMin(root->right);
        root->data = temp->data;
        root->right = remove(root->right, temp->data);
    }

    return root;
}
```

The function first searches for the value and then handles the appropriate deletion case.


## 25. BST Performance

BST performance depends primarily on the **height of the tree**.

For search, insertion, deletion, minimum, and maximum operations, a useful general bound is:

```text
O(H)
```

where `h` is the height of the tree.

For a reasonably balanced BST:

```text
h = O(log N)
```

so these operations are:

```text
O(log N)
```

Traversal must visit every node, so it takes:

```text
O(N)
```

| Operation | Balanced BST | Worst-case skewed BST |
|---|---:|---:|
| Search | O(log N) | O(N) |
| Insert | O(log N) | O(N) |
| Delete | O(log N) | O(N) |
| Find minimum | O(log N) | O(N) |
| Find maximum | O(log N) | O(N) |
| Traversal | O(N) | O(N) |


## 26. Balanced BST

Consider:

```text
           50
          /  \
        30    70
       / \    / \
     20  40  60  80
```

The values are distributed relatively evenly between the left and right subtrees.

Searching for `80` requires visiting only:

```text
50 -> 70 -> 80
```

As the number of nodes grows, a balanced tree keeps its height relatively small.


## 27. Unbalanced or Skewed BST

Suppose we insert:

```text
10, 20, 30, 40, 50
```

in that exact order.

The resulting BST is:

```text
10
  \
   20
     \
      30
        \
         40
           \
            50
```

This is still a valid BST, but structurally it behaves almost like a linked list.

Searching for `50` requires:

```text
10 -> 20 -> 30 -> 40 -> 50
```

The height is proportional to the number of nodes, so operations can degrade to:

```text
O(N)
```


## 28. Best, Average, and Worst-Case Complexity

A useful way to describe BST operations is:

```text
Search = O(H)
Insert = O(H)
Delete = O(H)
```

where `h` is the tree height.

For a balanced tree:

```text
h = O(log N)
```

Therefore:

```text
Search = O(log N)
Insert = O(log N)
Delete = O(log N)
```

For a completely skewed tree:

```text
h = O(N)
```

Therefore:

```text
Search = O(N)
Insert = O(N)
Delete = O(N)
```

So the statement:

> BST search is always `O(log N)`.

is incorrect for a basic, unbalanced BST.


## 29. BST vs. Binary Search

Students sometimes confuse **Binary Search** with a **Binary Search Tree**.

They are related ideas, but they are not the same thing.

### Binary Search

Binary search is an algorithm commonly applied to sorted, random-access data such as an array or vector.

```cpp
int numbers[] = {10, 20, 30, 40, 50};
```

It repeatedly examines a middle position and reduces the search interval.

### Binary Search Tree

A BST is a linked hierarchical data structure:

```text
        30
       /  \
     20    40
    /        \
   10         50
```

Both use comparisons to reduce the search space, but the data is organized differently.


## 30. Where Are Binary Search Trees Used?

A BST is most useful when an application needs a collection that changes over time while still preserving the ordering relationship among its keys. This requirement is different from simply asking whether a particular key exists. A hash table is often an excellent choice for exact-key lookup, but it does not naturally maintain keys in sorted order. An ordered search tree is more appropriate when the application also needs operations such as finding the next larger key, the previous smaller key, the minimum or maximum key, or all keys within a particular range.

### 30.1 Ordered Sets

Suppose an application maintains unique IDs:

```text
42, 17, 65, 10, 31, 50, 90
```

A search tree can support operations such as:

```text
insert(31)
search(50)
remove(17)
findMin()
findMax()
```

while keeping the keys logically ordered.

In C++, this type of behavior is provided by `std::set`.

Practical examples include maintaining an ordered collection of unique event IDs, reservation numbers, scores, or numeric records.

### 30.2 Ordered Key-Value Maps

Instead of storing only a key, a node can store a key together with associated data.

For example:

```cpp
struct Student {
    int id;
    string name;
};
```

Conceptually:

```text
Student ID -> Student record
```

The tree can be ordered using the student ID:

```text
             1050
            /    \
         1020    1090
```

This allows the application to search by ID while retaining key order.

In C++, the corresponding ordered key-value abstraction is `std::map`.

### 30.3 Range Queries

One major advantage of an ordered search tree is the ability to search for a **range** of values.

Suppose a system stores prices:

```text
10, 18, 25, 32, 40, 55, 70
```

A query might ask:

```text
Find all prices from $20 through $50.
```

Because the tree is ordered, branches that cannot contain values in the requested range can be skipped.

```cpp
void printRange(Node* root, int low, int high) {
    if (root == nullptr)
        return;

    if (root->data > low)
        printRange(root->left, low, high);

    if (root->data >= low && root->data <= high)
        cout << root->data << " ";

    if (root->data < high)
        printRange(root->right, low, high);
}
```

This type of operation is less natural with a hash table because hashing does not preserve key order.

### 30.4 Minimum and Maximum

A BST provides structural access to extreme values:

```text
Minimum -> leftmost node
Maximum -> rightmost node
```

Applications may use this to find:

- The earliest or latest timestamp.
- The lowest or highest stored score.
- The smallest or largest key currently present.

For a tree of height `h`, finding an extreme value takes `O(H)`.

### 30.5 Predecessor and Successor

BSTs can answer questions about neighboring keys.

For a key `x`:

```text
Predecessor = largest key smaller than x
Successor   = smallest key larger than x
```

Suppose the stored values are:

```text
10, 20, 30, 40, 50
```

For `x = 30`:

```text
Predecessor = 20
Successor   = 40
```

These operations are useful in ordered scheduling, nearest-key lookup, and navigation through sorted records.

### 30.6 Scheduling and Time-Ordered Data

Suppose a program stores events using timestamps as keys:

```text
09:00
10:30
13:00
15:45
```

An ordered search tree naturally supports questions such as:

```text
What is the next event after 11:00?
What was the most recent event before 14:00?
What events occur between 10:00 and 14:00?
```

These correspond to:

```text
successor
predecessor
range query
```

### 30.7 Symbol Tables and Ordered Dictionaries

Compilers, interpreters, and other software systems often need **symbol tables** that associate identifiers with information.

Conceptually:

```text
identifier -> metadata
```

For example:

```text
count   -> variable information
display -> function information
Student -> class information
```

Symbol tables can be implemented using different structures, including hash tables and balanced search trees. A search tree is useful when ordered traversal or ordered-key operations are required.

### 30.8 Database and File-System Indexing: Related Structures

Database indexes must support both exact-key searches and ordered operations. For example, a database may need to find the record associated with key `500`, retrieve all records whose keys fall between `500` and `900`, insert a new key, or remove an existing one. The idea of organizing keys in an ordered tree is therefore fundamental to database indexing.

Production databases generally do **not** use a simple in-memory BST for their main indexes. They commonly use structures such as:

```text
B-Tree
B+ Tree
```

These trees allow many children per node and are designed to reduce storage-page or disk accesses.

A BST is an important conceptual stepping stone toward understanding these more advanced indexing structures.

### 30.9 Why Not Just Use a Sorted Array?

A sorted array supports efficient binary search:

```text
Search -> O(log N)
```

However, inserting or deleting in the middle may require shifting many elements:

```text
Insert -> O(N)
Delete -> O(N)
```

A balanced search tree can provide:

```text
Search -> O(log N)
Insert -> O(log N)
Delete -> O(log N)
```

This makes balanced search trees useful for **dynamic ordered collections** where values change frequently.

### 30.10 When Is a BST a Good Choice?

A BST—or more commonly a **self-balancing BST**—is a strong choice when an application needs several of these operations together:

```text
Exact-key search
Insertion
Deletion
Sorted traversal
Minimum / maximum
Predecessor / successor
Range queries
```

If an application only needs very fast exact-key lookup and does not care about ordering, a hash table may be a better choice.


## 31. BSTs and the C++ Standard Library

In real C++ applications, programmers often use standard containers rather than implementing their own search tree.

Examples include:

```cpp
std::set
std::map
std::multiset
std::multimap
```

Example:

```cpp
#include <iostream>
#include <set>
using namespace std;

int main() {
    set<int> numbers;

    numbers.insert(50);
    numbers.insert(20);
    numbers.insert(70);
    numbers.insert(30);

    for (int value : numbers)
        cout << value << " ";

    return 0;
}
```

Output:

```text
20 30 50 70
```

The C++ standard specifies the behavior and complexity requirements of these containers, not a particular internal tree implementation. In practice, implementations commonly use a self-balancing search tree such as a Red-Black Tree.


## 32. BST vs. Hash Table

BSTs and hash tables can both provide efficient searching, but they have different strengths.

| Feature | Balanced BST | Hash Table |
|---|---|---|
| Typical search | O(log N) | O(1) average |
| Maintains sorted order | Yes | No inherent ordering |
| Range queries | Efficient | Poor fit |
| Minimum/maximum | Efficient | Usually requires scanning |
| Sorted traversal | Yes | No inherent sorted traversal |
| Worst-case search | O(log N) for common self-balancing BSTs | O(N) in the general case |

A hash table is particularly useful when the main requirement is:

```text
Find this exact key quickly.
```

An ordered search tree is especially useful when we also need:

```text
ordering
minimum
maximum
ranges
predecessor
successor
```


## 33. BST vs. Linked List

Consider searching for `80`.

A linked list might require visiting:

```text
20 -> 30 -> 40 -> 50 -> 60 -> 70 -> 80
```

Search is generally:

```text
O(N)
```

A balanced BST might look like:

```text
           50
          /  \
        30    70
       / \    / \
     20  40  60  80
```

Search path:

```text
50 -> 70 -> 80
```

This takes approximately:

```text
O(log N)
```

The tradeoff is that the BST has more structural complexity and must maintain its ordering property.


## 32. Implementation Considerations: Pointers, Recursion, and Memory

A node-based BST is a **dynamic data structure**. Nodes are typically allocated as they are inserted, and pointers connect the nodes.

```cpp
Node* left;
Node* right;
```

represent the roots of the two subtrees.

Recursive operations work naturally because each subtree has the same structure as the complete tree:

```text
Tree
 |
 +-- Left subtree  -> also a tree
 |
 +-- Right subtree -> also a tree
```

The recursive call stack has depth proportional to tree height:

```text
O(H)
```

For a balanced tree, the recursion depth is generally `O(log N)`. For a highly skewed tree, it can grow to `O(N)`.

This matters because a skewed BST not only slows search, insertion, and deletion; deep recursive operations also use more call-stack space.

The examples in this lecture use raw pointers to expose the underlying data-structure mechanics. In production C++, ownership can instead be managed with smart pointers or standard-library containers.


## 33. A Complete C++ Example

The following program brings together the central ideas developed in the chapter. It defines a node, inserts keys recursively, searches for a key, and performs an inorder traversal. The example intentionally uses raw pointers so that the relationships between nodes remain visible to students.

The following example combines insertion, searching, and inorder traversal:

```cpp
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;

    Node(int value) {
        data = value;
        left = nullptr;
        right = nullptr;
    }
};

Node* insert(Node* root, int value) {
    if (root == nullptr)
        return new Node(value);

    if (value < root->data)
        root->left = insert(root->left, value);
    else if (value > root->data)
        root->right = insert(root->right, value);

    return root;
}

bool search(Node* root, int target) {
    if (root == nullptr)
        return false;

    if (root->data == target)
        return true;

    if (target < root->data)
        return search(root->left, target);

    return search(root->right, target);
}

void inorder(Node* root) {
    if (root == nullptr)
        return;

    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

void deleteTree(Node* root) {
    if (root == nullptr)
        return;

    deleteTree(root->left);
    deleteTree(root->right);
    delete root;
}

int main() {
    Node* root = nullptr;

    root = insert(root, 50);
    root = insert(root, 30);
    root = insert(root, 70);
    root = insert(root, 20);
    root = insert(root, 40);
    root = insert(root, 60);
    root = insert(root, 80);

    cout << "Inorder: ";
    inorder(root);

    cout << "\n";

    if (search(root, 60))
        cout << "60 was found\n";
    else
        cout << "60 was not found\n";

    deleteTree(root);
    root = nullptr;

    return 0;
}
```

Output:

```text
Inorder: 20 30 40 50 60 70 80
60 was found
```


## 34. Tracing the Complete Example

The insertion sequence:

```text
50, 30, 70, 20, 40, 60, 80
```

creates:

```text
                 50
              /      \
            30        70
           /  \      /  \
         20   40    60   80
```

Calling:

```cpp
search(root, 60);
```

follows:

```text
50 -> 70 -> 60
```

Calling:

```cpp
inorder(root);
```

uses:

```text
Left -> Root -> Right
```

and produces:

```text
20 30 40 50 60 70 80
```


## 35. The Limitation of an Unbalanced BST

A basic BST does **not** automatically remain balanced.

For example:

```text
Insert: 10, 20, 30, 40, 50
```

can produce:

```text
10
  \
   20
     \
      30
        \
         40
           \
            50
```

This is a valid BST but a poor search structure because its height is large.

This limitation motivates **self-balancing Binary Search Trees**, including:

- **AVL Trees**
- **Red-Black Trees**

These structures automatically reorganize themselves so their height remains `O(log N)`.


## 35.1 Complexity Summary

The performance of a BST depends strongly on its shape. For classroom analysis, it is useful to compare a reasonably balanced BST with a highly unbalanced BST.

| Operation | Balanced BST | Highly Unbalanced BST |
|---|---:|---:|
| Search | `O(log N)` | `O(N)` |
| Insert | `O(log N)` | `O(N)` |
| Delete | `O(log N)` | `O(N)` |
| Find minimum | `O(log N)` | `O(N)` |
| Find maximum | `O(log N)` | `O(N)` |
| Predecessor / successor | `O(log N)` | `O(N)` |
| Full traversal | `O(N)` | `O(N)` |
| BST validation | `O(N)` | `O(N)` |

A traversal remains `O(N)` even when the tree is balanced because every node must be visited. Balancing primarily improves operations that follow a path from the root toward a particular location in the tree.


## 36. Chapter Summary

A binary search tree is a binary tree whose keys are maintained according to an ordering rule. For each node, smaller keys belong in the left subtree and larger keys belong in the right subtree. The rule applies to entire subtrees, not merely to immediate children.

This ordering makes directed searching possible. At each node, a comparison determines whether the search should continue to the left or to the right. Insertion uses the same decision process to locate an appropriate null child position. Deletion is more involved because the tree must remain connected and ordered after a node is removed. A leaf can be removed directly, a node with one child can be replaced by that child, and a node with two children can be replaced using an inorder successor or predecessor.

Tree traversal provides a systematic way to visit all nodes. Inorder traversal is particularly important for BSTs because it visits the keys in sorted order. Preorder and postorder traversals use different processing orders and are useful for other tree-processing tasks.

BST performance depends on tree height. In a reasonably balanced tree, search, insertion, and deletion are generally `O(log N)`. In a highly skewed tree, these operations can degrade to `O(N)`. A full traversal remains `O(N)` because every node must be visited. This dependence on tree shape motivates self-balancing structures such as AVL and Red-Black trees.

The practical strength of an ordered search tree is that it supports more than exact-key lookup. It can maintain dynamically changing data while supporting sorted traversal, minimum and maximum queries, predecessor and successor operations, and range searches. These capabilities explain why balanced search trees are useful for ordered sets and maps and why related tree structures play an important role in indexing systems.

## Review Questions

1. What condition must be true for every node in a binary search tree?
2. Why is checking only a node and its immediate children insufficient when validating a BST?
3. Why does inorder traversal of a BST produce keys in sorted order?
4. What is the running time of search in terms of tree height `H`?
5. How can insertion order cause a BST to become skewed?
6. Describe the three structural cases that must be considered when deleting a node.
7. Why are range queries more natural in an ordered search tree than in a hash table?
8. When might `std::map` or `std::set` be preferable to an unordered container?
9. Why do database systems commonly use B-trees or B+ trees rather than a basic binary search tree for disk-based indexes?
10. What problem do AVL and Red-Black trees solve?
