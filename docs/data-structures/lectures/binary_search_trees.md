# Binary Search Trees (BST)

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
- Identify practical applications of BSTs.
- Implement basic BST operations in C++.

---

## 1. What is a Binary Tree?

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

---

## 2. What is a Binary Search Tree?

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

---

## 3. Binary Tree vs. Binary Search Tree

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

---

## 4. Important BST Terminology

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

---

## 5. Why Do We Need a BST?

Suppose values are stored in an unsorted array:

```cpp
int numbers[] = {50, 20, 80, 30, 60, 40, 70};
```

Searching for a particular value may require examining every element.

In the worst case:

```text
O(n)
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

---

## 6. Creating a BST Node in C++

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

---

## 7. Manually Creating a Small BST

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

---

## 8. Searching a BST

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

---

## 9. BST Search Algorithm

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

---

## 10. Searching a BST in C++

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

---

## 11. Recursive BST Search

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

---

## 12. Inserting into a BST

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

---

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

---

## 14. Recursive BST Insertion in C++

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

---

## 15. What About Duplicate Values?

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

---

## 16. Tree Traversal

A tree is not organized sequentially like an array. Therefore, we need systematic ways of visiting its nodes.

These are called **tree traversals**.

Three important depth-first traversals are:

- **Inorder**
- **Preorder**
- **Postorder**

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

## 25. BST Performance

BST performance depends primarily on the **height of the tree**.

For search, insertion, deletion, minimum, and maximum operations, a useful general bound is:

```text
O(h)
```

where `h` is the height of the tree.

For a reasonably balanced BST:

```text
h = O(log n)
```

so these operations are:

```text
O(log n)
```

Traversal must visit every node, so it takes:

```text
O(n)
```

| Operation | Balanced BST | Worst-case skewed BST |
|---|---:|---:|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| Find minimum | O(log n) | O(n) |
| Find maximum | O(log n) | O(n) |
| Traversal | O(n) | O(n) |

---

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

---

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
O(n)
```

---

## 28. Best, Average, and Worst-Case Complexity

A useful way to describe BST operations is:

```text
Search = O(h)
Insert = O(h)
Delete = O(h)
```

where `h` is the tree height.

For a balanced tree:

```text
h = O(log n)
```

Therefore:

```text
Search = O(log n)
Insert = O(log n)
Delete = O(log n)
```

For a completely skewed tree:

```text
h = O(n)
```

Therefore:

```text
Search = O(n)
Insert = O(n)
Delete = O(n)
```

So the statement:

> BST search is always `O(log n)`.

is incorrect for a basic, unbalanced BST.

---

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

---

## 30. Where Are Binary Search Trees Used?

BSTs are useful when data needs to remain **ordered** while also supporting searching, insertion, and deletion.

### Ordered Collections

A BST naturally maintains an ordering relationship among its values.

An inorder traversal produces:

```text
smallest -> largest
```

### Maps and Sets

Search trees can be used to associate keys with values or maintain collections of unique ordered keys.

Examples:

```text
Student ID -> Student information
Username   -> Account information
```

Balanced search trees are commonly used to implement ordered maps and sets.

### Range Queries

Suppose values represent prices:

```text
10, 20, 25, 30, 40, 50
```

An ordered search tree can efficiently help locate values within a range such as:

```text
20 <= price <= 40
```

### Predecessor and Successor Queries

Ordered trees can support operations such as:

```text
Find the largest value smaller than x
Find the smallest value larger than x
```

These are known as **predecessor** and **successor** queries.

### Foundation for Other Tree Structures

BST concepts are important for understanding more advanced search trees such as:

- AVL Trees
- Red-Black Trees
- B-Trees
- B+ Trees

Database systems and file systems commonly use B-tree-family structures rather than simple BSTs because those structures are designed for efficient storage access.

---

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

---

## 32. BST vs. Hash Table

BSTs and hash tables can both provide efficient searching, but they have different strengths.

| Feature | Balanced BST | Hash Table |
|---|---|---|
| Typical search | O(log n) | O(1) average |
| Maintains sorted order | Yes | No inherent ordering |
| Range queries | Efficient | Poor fit |
| Minimum/maximum | Efficient | Usually requires scanning |
| Sorted traversal | Yes | No inherent sorted traversal |
| Worst-case search | O(log n) for common self-balancing BSTs | O(n) in the general case |

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

---

## 33. BST vs. Linked List

Consider searching for `80`.

A linked list might require visiting:

```text
20 -> 30 -> 40 -> 50 -> 60 -> 70 -> 80
```

Search is generally:

```text
O(n)
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
O(log n)
```

The tradeoff is that the BST has more structural complexity and must maintain its ordering property.

---

## 34. Complete Short C++ Example

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

---

## 35. Visualizing the Example

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

---

## 36. An Important Limitation of a Basic BST

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

These structures automatically reorganize themselves so their height remains `O(log n)`.

---

## 37. Summary

A **Binary Search Tree** is a binary tree with an ordering property:

```text
Left subtree values < Node < Right subtree values
```

Major BST operations include:

- Search
- Insert
- Delete
- Traversal
- Find minimum
- Find maximum

The running time of search, insertion, and deletion depends on tree height:

```text
O(h)
```

For a balanced BST:

```text
h = O(log n)
```

so these operations take:

```text
O(log n)
```

For a highly unbalanced BST:

```text
h = O(n)
```

so operations may take:

```text
O(n)
```

Inorder traversal follows:

```text
Left -> Root -> Right
```

and, for a BST, visits values in sorted order.

The central idea to remember is:

> **A Binary Search Tree organizes data so that each comparison determines whether the search should continue to the left or to the right.**

BSTs also provide the conceptual foundation for more advanced ordered tree structures such as AVL Trees, Red-Black Trees, B-Trees, and B+ Trees.
