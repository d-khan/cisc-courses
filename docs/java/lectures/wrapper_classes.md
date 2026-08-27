# Wrapper Classes --- Are They Really "Just Objects"?

## Motivation: Why Wrapper Classes Exist

Java has two categories of types.

### Primitive Types

`int`, `double`, `char`, `boolean`, `byte`, `short`, `long`, `float`

Primitive types:

-   Store raw values
-   Are not objects
-   Have no methods
-   Cannot be used directly as generic type arguments

### Reference Types

Classes, interfaces, arrays, and enums are reference types.

Reference types:

-   Refer to objects
-   Can have methods
-   Work with generics and collections

### The Problem

Collections such as `ArrayList` work with reference types, not primitive
types.

``` java
ArrayList<int> list = new ArrayList<>(); // Illegal
```

``` java
ArrayList<Integer> list = new ArrayList<>(); // Legal
```

Wrapper classes provide object representations for primitive values.

------------------------------------------------------------------------

## What Is a Wrapper Class?

A wrapper class encapsulates a primitive value inside an immutable
object.

  Primitive   Wrapper
  ----------- -------------
  `int`       `Integer`
  `double`    `Double`
  `char`      `Character`
  `boolean`   `Boolean`
  `long`      `Long`
  `float`     `Float`
  `byte`      `Byte`
  `short`     `Short`

Example:

``` java
Integer x = Integer.valueOf(10);
```

Conceptually:

``` java
public final class Integer {
    private final int value;
}
```

This is a simplified conceptual representation, not the complete Java
implementation.

------------------------------------------------------------------------

## Are Wrapper Classes Objects?

### Yes --- Technically

Wrapper classes:

-   Are classes
-   Extend `Object`
-   Have methods and fields
-   Produce object references
-   Can be `null`

``` java
Integer a = 5;
System.out.println(a.getClass());
```

### But They Are Not "Just Objects"

Wrapper classes are specialized immutable classes representing primitive
values. Java also provides special language support for them through
boxing and unboxing.

------------------------------------------------------------------------

## Special Behaviors of Wrapper Classes

### Autoboxing

``` java
Integer obj = 10;
```

Conceptually:

``` java
Integer obj = Integer.valueOf(10);
```

Autoboxing lets Java automatically convert a primitive value to its
corresponding wrapper type.

### Why Is Autoboxing Useful?

Without it, programmers would repeatedly write:

``` java
Integer x = Integer.valueOf(10);
```

Instead, Java permits:

``` java
Integer x = 10;
```

This is especially convenient with collections.

### Auto-Unboxing

``` java
Integer obj = 20;
int num = obj;
```

Conceptually:

``` java
int num = obj.intValue();
```

Java automatically extracts the primitive value.

------------------------------------------------------------------------

## Immutability

Wrapper objects are immutable: their represented value cannot be changed
after creation.

``` java
Integer a = 10;
a = a + 5;
```

Conceptually:

1.  `a` is unboxed to `10`.
2.  Java performs `10 + 5`.
3.  The result `15` is boxed.
4.  `a` is reassigned to the resulting `Integer`.

The original wrapper object is not modified.

------------------------------------------------------------------------

## Why Wrapper Classes Are Necessary

### Generics Require Reference Types

Illegal:

``` java
ArrayList<int> list = new ArrayList<>();
```

Legal:

``` java
ArrayList<Integer> list = new ArrayList<>();
```

Autoboxing makes this convenient:

``` java
ArrayList<Integer> numbers = new ArrayList<>();

numbers.add(10);
numbers.add(20);
numbers.add(30);
```

### Nullability

Primitive:

``` java
int x = null; // Error
```

Wrapper:

``` java
Integer x = null; // Allowed
```

This can represent an absent value, but it also introduces additional
risk.

------------------------------------------------------------------------

## NullPointerException Risk

``` java
Integer x = null;
int y = x;
```

This compiles but throws `NullPointerException`.

### Why?

Unboxing conceptually requires:

``` java
int y = x.intValue();
```

But `x` is `null`, so there is no object on which `intValue()` can be
called.

------------------------------------------------------------------------

## Memory Model Discussion

Primitive:

``` java
int x = 5;
```

Wrapper:

``` java
Integer x = 5;
```

Conceptually:

``` text
Integer reference
       |
       v
Integer object representing 5
```

The exact memory location and representation are JVM implementation
details. It is therefore better not to teach a strict rule that every
primitive is always on the stack and every wrapper is always represented
in exactly the same way on the heap.

The important distinction is:

> A primitive directly represents a primitive value, while a wrapper
> variable is a reference to an object representation of that value.

------------------------------------------------------------------------

## Performance Considerations

Wrappers may introduce costs associated with:

-   Boxing
-   Unboxing
-   Object representation
-   Additional memory use
-   Garbage collection when objects are allocated

For arithmetic-intensive code, primitives are generally preferable when
an object representation is unnecessary.

``` java
for (int i = 0; i < 1_000_000; i++) {
    // work
}
```

------------------------------------------------------------------------

## When to Use Wrapper Classes

Use wrappers when:

-   Working with collections
-   Working with generics
-   An API requires a reference type
-   A value may need to be `null`
-   Using wrapper utility methods

Use primitives when:

-   You only need the value
-   `null` is unnecessary
-   Performing large amounts of arithmetic
-   Avoiding unnecessary boxing/unboxing is desirable

------------------------------------------------------------------------

## Summary: Are Wrapper Classes "Just Objects"?

Instead of saying:

> "Wrapper classes are just objects."

A more useful description is:

> **Wrapper classes are immutable classes that represent primitive
> values and allow those values to interact with object-based and
> generic APIs.**

------------------------------------------------------------------------

## Advanced Section --- Deep Dive

### Integer Caching

``` java
Integer a = 127;
Integer b = 127;

System.out.println(a == b); // true
```

``` java
Integer x = 128;
Integer y = 128;

System.out.println(x == y); // typically false
```

Java requires `Integer.valueOf()` to cache at least the values from
`-128` through `127`. Autoboxing uses `Integer.valueOf()`.

For value comparison, use:

``` java
a.equals(b)
```

rather than relying on object identity.

------------------------------------------------------------------------

## What Is the Purpose of Caching in Wrapper Classes?

When we say Java caches certain small `Integer` objects, the natural
question is:

> Why reuse them?

### Primary Purpose: Reduce Unnecessary Object Creation

Without reuse:

``` java
Integer a = 10;
Integer b = 10;
```

could require separate equivalent objects.

With caching, references can reuse an existing immutable object:

``` text
a ----\
       ---> [ Integer: 10 ]
b ----/
```

This can reduce object allocation and memory use.

### Why Cache Small Values?

Small integers are frequently used as:

-   Counters
-   Indexes
-   Status values
-   Common numeric constants

Caching a limited common range provides useful reuse without attempting
to retain every possible `int` value.

### Why Not Cache Every Integer?

There are billions of possible `int` values.

Caching every possible value would require enormous memory and would
provide little benefit for values that are rarely used.

The limited cache is therefore an engineering tradeoff.

------------------------------------------------------------------------

## Why Immutability Enables Caching

The key idea is:

> **Caching is safe because wrapper objects are immutable.**

### What Caching Really Means

``` java
Integer a = 100;
Integer b = 100;
```

Both references may refer to the same cached object:

``` text
a ----\
       ---> [ Integer object: value = 100 ]
b ----/
```

### Why Is Sharing Safe?

An `Integer` representing `100` cannot later be changed to represent
`200`.

Therefore, one reference cannot modify the shared object and
unexpectedly affect another reference.

### What If Integer Were Mutable?

Imagine a hypothetical mutable object:

``` java
MutableInteger x = new MutableInteger(10);
MutableInteger y = x;
```

If:

``` java
x.setValue(20);
```

then `y` would also observe `20`, because both references point to the
same object.

Shared global numeric caches would be dangerous if cached values could
be modified.

### Why Immutability Matters

Immutability ensures:

1.  The represented value never changes.
2.  Sharing does not change program behavior.
3.  Cached objects can safely be reused.

Therefore:

> **Immutability makes safe object sharing and caching possible.**

------------------------------------------------------------------------

## Autoboxing Performance Cost

``` java
for (Integer i = 0; i < 1_000_000; i++) {
}
```

This can involve repeated boxing and unboxing.

Better:

``` java
for (int i = 0; i < 1_000_000; i++) {
}
```

### Why?

The loop counter is only needed for arithmetic and comparison. There is
no need for an object representation.

------------------------------------------------------------------------

## Memory Footprint Comparison

A primitive `int` represents a 32-bit integer value.

An `Integer` object generally requires more memory because object
representation includes additional runtime information beyond the
underlying integer value.

Exact wrapper-object size depends on the JVM, object alignment,
compressed references, and runtime configuration.

The important principle is:

> Wrapper objects generally require more memory than corresponding
> primitive values.

------------------------------------------------------------------------

## Immutability and Thread Safety

Wrapper classes such as `Integer` are immutable.

Because their represented values cannot change after creation, sharing
wrapper objects does not introduce the same state-mutation concerns
associated with mutable objects.

This also makes caching safe and behavior predictable.

------------------------------------------------------------------------

## `equals()` vs. `==`

### `==`

For object references, `==` checks whether two references refer to the
same object.

``` java
Integer a = 200;
Integer b = 200;

System.out.println(a == b);
```

Do not use this as a general wrapper value-comparison technique.

### `.equals()`

`.equals()` compares the logical value represented by compatible wrapper
objects.

``` java
Integer a = 200;
Integer b = 200;

System.out.println(a.equals(b));
```

Output:

``` text
true
```

### Why Can `==` Be Confusing?

Caching can make this appear to work:

``` java
Integer a = 100;
Integer b = 100;

System.out.println(a == b);
```

It can be `true` because both references may point to the same cached
object.

That does **not** mean `==` performs logical value comparison.

For wrapper value comparison, use `.equals()` when the reference is
known to be non-null, or use an appropriate null-safe comparison when
nulls are possible.

------------------------------------------------------------------------

## Concept Check Questions

1.  Why does `ArrayList<int>` not compile?
2.  Why does `ArrayList<Integer>` compile?
3.  What is autoboxing?
4.  What is unboxing?
5.  Why can `Integer` be `null` while `int` cannot?
6.  Why can `Integer x = null; int y = x;` throw a
    `NullPointerException`?
7.  Why can `==` produce confusing results with `Integer` references?
8.  Why should `.equals()` normally be used for wrapper value
    comparison?
9.  Why are wrapper classes immutable?
10. How does immutability make caching safe?
11. Why does Java cache commonly used small `Integer` values?
12. Why would caching every possible `Integer` value be impractical?
13. Why are primitives generally preferable for arithmetic-intensive
    code?
14. When would using a wrapper class be necessary or useful?

------------------------------------------------------------------------

## Key Takeaways

-   Wrapper classes provide object representations of primitive values.
-   `Integer` wraps `int`, `Double` wraps `double`, and so on.
-   Wrapper objects are immutable.
-   Java provides autoboxing and unboxing for convenient conversions.
-   Generics require reference types, which is why `ArrayList<Integer>`
    is valid while `ArrayList<int>` is not.
-   Wrapper references can be `null`, so unboxing can cause a
    `NullPointerException`.
-   Small `Integer` values are cached.
-   `==` compares object identity for wrapper references; `.equals()` is
    normally used for value comparison.
-   Immutability makes wrapper-object sharing and caching safe.
-   Prefer primitives when an object representation is unnecessary,
    especially for arithmetic-heavy operations.

------------------------------------------------------------------------

End of Lecture
