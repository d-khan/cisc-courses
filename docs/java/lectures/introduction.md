# Introduction to Computers, Programs, and Java

## Learning Objectives

After completing this lesson, you should be able to:

- Identify the major components of a computer system.
- Explain how data and program instructions are represented and stored.
- Distinguish among machine language, assembly language, and high-level programming languages.
- Explain the roles of compilers and interpreters.
- Describe the basic function of an operating system.
- Explain the purpose of Java, the Java Development Kit (JDK), the Java Virtual Machine (JVM), and the Java API.
- Write and analyze a simple Java program.
- Explain how Java source code is compiled and executed.
- Recognize important elements of Java syntax, including classes, methods, statements, comments, and blocks.
- Apply basic programming style and documentation practices.
- Distinguish among syntax, runtime, and logic errors.

---

## 1. Computers and Computing Systems

A **computer** is an electronic system that accepts data, processes it according to a set of instructions, stores information, and produces results. Although computers vary greatly in size and purpose, most computer systems contain the same fundamental components.

A simplified view of a computer system is:

```text
Input Devices
     |
     v
+-----------------------------+
|            CPU              |
|       <--> Memory           |
+-----------------------------+
     |              |
     v              v
Output Devices   Storage Devices
     |
Communication / Network Devices
```

The components communicate through hardware pathways that allow instructions and data to move throughout the system.

### 1.1 Central Processing Unit

The **Central Processing Unit (CPU)** executes the instructions that make a computer program work. It repeatedly retrieves instructions and data from memory, performs the requested operations, and stores or communicates the results.

CPU clock rates are commonly expressed in **hertz (Hz)**:

- 1 kilohertz (kHz) = 1,000 cycles per second
- 1 megahertz (MHz) = 1,000,000 cycles per second
- 1 gigahertz (GHz) = 1,000,000,000 cycles per second

Clock speed alone does not determine overall processor performance. Processor architecture, number of cores, cache organization, and workload also affect performance.

### 1.2 Memory

**Main memory**, commonly called **RAM**, temporarily stores programs and data that are actively being used.

Memory is organized as a sequence of storage locations. Each location has an address, allowing the processor to locate information.

A **bit** is the smallest unit of digital information and can have one of two values:

```text
0 or 1
```

Eight bits form one **byte**:

```text
1 byte = 8 bits
```

Programs, numbers, characters, images, and other forms of information are ultimately represented using patterns of bits.

RAM is normally **volatile**, meaning that its contents are lost when power is removed.

### 1.3 How Data Is Represented

Computers operate using binary information. For example, a character can be represented internally by a numeric code, which is ultimately stored as bits.

Conceptually:

```text
Character -> Numeric Encoding -> Binary Representation
```

You normally do not perform this conversion manually when programming in Java. The programming language and computer system manage the underlying representation.

### 1.4 Storage

Long-term information is maintained using **storage devices**. Unlike RAM, persistent storage retains information when power is removed.

Common examples include:

- solid-state drives (SSDs),
- hard disk drives (HDDs),
- USB flash storage, and
- network or cloud-based storage.

When a program is executed, relevant instructions and data are generally transferred from persistent storage into main memory so that the processor can work with them efficiently.

### 1.5 Input, Output, and Communication

**Input devices** provide information to a computer. Examples include keyboards, pointing devices, cameras, microphones, and sensors.

**Output devices** present results. Examples include displays, printers, speakers, and other devices controlled by a computer.

**Communication devices** allow computers to exchange information across networks. Modern computers typically communicate through wired Ethernet, Wi-Fi, cellular networks, or other networking technologies.

---

## 2. Computer Programs

Hardware by itself does not determine what tasks a computer performs. A **computer program** is an organized sequence of instructions that directs a computer to perform a particular task.

Programs are written using **programming languages**.

Programming languages allow programmers to express algorithms and operations in forms that are more understandable than the binary instructions directly executed by a processor.

### 2.1 Machine Language

**Machine language** consists of instructions represented in a form that a processor can execute directly.

A simplified machine instruction might appear as:

```text
1101101010011010
```

Machine code is difficult for humans to read, write, and maintain. It is also closely tied to a particular processor architecture.

### 2.2 Assembly Language

**Assembly language** provides symbolic names for low-level processor instructions.

For example, an assembly instruction may conceptually resemble:

```asm
ADD R1, R2, R3
```

An **assembler** translates assembly-language instructions into machine code.

```text
Assembly Source Code
        |
        v
     Assembler
        |
        v
    Machine Code
```

Assembly language is easier for humans to understand than raw machine code, but it remains closely related to the underlying hardware.

### 2.3 High-Level Languages

A **high-level programming language** allows programmers to describe computations using more expressive and human-readable notation.

For example:

```java
double area = radius * radius * Math.PI;
```

High-level languages allow programmers to focus more on solving problems and less on individual processor instructions.

Java is a high-level, general-purpose programming language.

---

## 3. Translating Programs

A processor does not directly execute Java source code. Source code must be translated into a representation that the computer's runtime environment can execute.

Two important translation approaches are **compilation** and **interpretation**.

### 3.1 Compiler

A **compiler** translates program code before execution.

A simplified traditional compilation model is:

```text
Source Code
    |
    v
 Compiler
    |
    v
Executable / Machine Code
    |
    v
 Execution
```

Compilation can detect many problems before the program begins executing.

### 3.2 Interpreter

An **interpreter** processes program instructions through a runtime system rather than producing a conventional native executable as the only execution mechanism.

Conceptually:

```text
Source Code
    |
    v
Interpreter
    |
    v
Execution
```

Modern programming environments often combine compilation, interpretation, and runtime optimization. Java is an important example of this hybrid approach.

---

## 4. Operating Systems

An **operating system (OS)** manages the computer's hardware resources and provides services used by application programs.

Examples include Windows, macOS, and Linux.

A simplified software hierarchy is:

```text
+-----------------------+
|         User          |
+-----------------------+
            |
+-----------------------+
| Application Programs  |
+-----------------------+
            |
+-----------------------+
|   Operating System    |
+-----------------------+
            |
+-----------------------+
|       Hardware        |
+-----------------------+
```

The operating system is responsible for activities such as:

- managing processor time,
- managing memory,
- organizing files and storage,
- controlling input and output devices,
- supporting networking,
- providing security mechanisms, and
- coordinating multiple running applications.

As Java programmers, we normally interact with hardware through Java libraries and the operating system rather than controlling hardware directly.

---

## 5. Introduction to Java

Java is a **general-purpose programming language** designed to support the development of reliable and portable software.

Java has been used in many areas of software development, including server applications, desktop software, enterprise systems, distributed applications, and software running on a wide range of computing devices.

### 5.1 Brief History

Java originated at **Sun Microsystems** in the early 1990s. James Gosling was one of the principal designers of the language. The project initially used the name **Oak** and was later renamed **Java**.

Java was publicly introduced in 1995. Its ability to execute programs across different computing platforms became one of its defining characteristics.

Sun Microsystems was later acquired by Oracle, which continues to maintain and develop the Java platform.

### 5.2 Important Characteristics of Java

Java was designed around several important software-development goals.

#### Simple

Java provides a comparatively clean programming model and removes several low-level mechanisms that make some other languages more difficult to use safely.

#### Object-Oriented

Java is fundamentally based on **objects and classes**. Object-oriented programming helps organize large programs into reusable and maintainable software components.

Later lessons will examine important object-oriented concepts such as:

- encapsulation,
- inheritance, and
- polymorphism.

#### Distributed

Java includes extensive networking libraries, making it suitable for programs that communicate across computer networks.

#### Robust

Java provides mechanisms for detecting programming problems and handling exceptional conditions. Features such as type checking, automatic memory management, and exception handling contribute to program reliability.

#### Secure

The Java platform includes mechanisms intended to provide controlled program execution and protect system resources.

#### Architecture-Neutral and Portable

Java source code is normally compiled into **bytecode** rather than directly into processor-specific machine code.

The bytecode can execute on systems that provide an appropriate **Java Virtual Machine (JVM)**.

This idea is commonly summarized as:

> **Write once, run anywhere.**

#### Multithreaded

Java provides built-in support for **multithreading**, allowing multiple activities to make progress within the same application.

#### Dynamic

Java programs can load classes and other program components during execution, supporting flexible and extensible software architectures.

---

## 6. The Java Development Environment

Several related technologies form the Java development environment.

### 6.1 Java Development Kit (JDK)

The **Java Development Kit (JDK)** contains tools required to develop Java programs.

Important tools include:

- the Java compiler,
- the Java runtime environment and supporting components,
- debugging and diagnostic utilities, and
- other development tools.

The Java compiler is invoked from the command line using:

```bash
javac
```

### 6.2 Java Virtual Machine (JVM)

The **Java Virtual Machine (JVM)** provides the execution environment for Java bytecode.

Instead of requiring a Java program to be compiled directly for every processor and operating system combination, the JVM provides an abstraction between the compiled Java program and the underlying system.

```text
        Java Program
             |
             v
          Bytecode
             |
             v
+---------------------------+
|            JVM            |
+---------------------------+
             |
             v
   Operating System / CPU
```

Different platforms provide their own JVM implementations while executing the same general form of Java bytecode.

### 6.3 Java API

The **Java Application Programming Interface (API)** is a large collection of predefined classes and methods available to Java programs.

Instead of implementing every operation yourself, you can use library functionality for tasks such as:

- text processing,
- mathematics,
- collections,
- files,
- networking,
- concurrency, and
- graphical applications.

### 6.4 Integrated Development Environment

An **Integrated Development Environment (IDE)** combines common programming tools in a single application.

An IDE typically provides:

- source-code editing,
- syntax highlighting,
- code completion,
- compilation,
- execution,
- debugging,
- project management, and
- integration with version-control systems.

The underlying Java concepts remain the same regardless of the IDE used.

---

## 7. Your First Java Program

Consider the following program:

```java
public class HelloJava {

    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

When executed, the program displays:

```text
Hello, Java!
```

Although the program is small, it contains several important Java concepts.

### 7.1 Class Declaration

```java
public class HelloJava
```

Java programs are organized around **classes**. Here, the class is named `HelloJava`.

By convention, Java class names begin with an uppercase letter. When a class name contains multiple words, each word commonly begins with an uppercase letter.

Examples:

```text
HelloJava
StudentRecord
TemperatureConverter
BankAccount
```

### 7.2 The `main` Method

```java
public static void main(String[] args)
```

The `main` method is the conventional entry point for a basic standalone Java application.

When the program starts, the JVM invokes this method.

For now, treat the entire method header as required syntax. The meaning of `public`, `static`, `void`, parameters, and arrays will become clearer as you study later topics.

### 7.3 Displaying Output

The following statement sends text to the console:

```java
System.out.println("Hello, Java!");
```

The text inside quotation marks is a **string literal**.

`println` displays the information and then moves the cursor to the next line.

For example:

```java
System.out.println("Java Programming");
System.out.println("First Program");
```

produces:

```text
Java Programming
First Program
```

---

## 8. How a Java Program Executes

Java uses an execution model that separates source code from the underlying computer architecture.

Suppose the source file is:

```text
HelloJava.java
```

The overall process is:

```text
HelloJava.java
      |
      | javac
      v
HelloJava.class
      |
      | JVM
      v
Program Executes
```

### Step 1: Write the Source Code

Java source code is stored in a file with the `.java` extension.

```text
HelloJava.java
```

### Step 2: Compile the Program

The Java compiler translates the source code:

```bash
javac HelloJava.java
```

If compilation succeeds, a bytecode file is produced:

```text
HelloJava.class
```

### Step 3: Execute the Program

The program can then be started with:

```bash
java HelloJava
```

Notice that `.class` is not included in the `java` command.

### Source Code vs. Bytecode

```text
.java file
   |
   | Java compiler
   v
.class file
   |
   | JVM
   v
Execution
```

The `.java` file is written and maintained by the programmer. The `.class` file contains Java bytecode generated by the compiler.

---

## 9. Anatomy of a Java Program

Consider the program again:

```java
// Displays a greeting on the console
public class HelloJava {

    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

Several fundamental Java language elements appear here.

### 9.1 Comments

A comment beginning with `//` continues to the end of the line:

```java
// Displays a greeting on the console
```

Comments are written for people reading the program. They are ignored as executable instructions.

Java also supports multi-line comments:

```java
/*
 * This program demonstrates
 * basic console output.
 */
```

### 9.2 Reserved Words

Words such as:

```java
public
class
static
void
```

have predefined meanings in Java. Such words are called **reserved words** or **keywords** and cannot normally be used as programmer-defined names.

### 9.3 Statements

A **statement** represents an action.

For example:

```java
System.out.println("Hello, Java!");
```

requests that information be displayed on the console.

### 9.4 Statement Terminator

Many Java statements end with a semicolon:

```java
;
```

For example:

```java
System.out.println("Computer Science");
```

Forgetting a required semicolon generally results in a compilation error.

### 9.5 Blocks

A pair of braces creates a **block**:

```java
{
    // statements
}
```

Blocks group related program elements.

In the example program, one block defines the class and another defines the body of the `main` method.

### 9.6 Common Special Symbols

| Symbol | Purpose |
|---|---|
| `{ }` | Defines a block |
| `( )` | Used in method declarations and method calls |
| `[ ]` | Used with arrays |
| `//` | Begins a single-line comment |
| `" "` | Encloses a string literal |
| `;` | Terminates many Java statements |

---

## 10. Programming Style and Documentation

A program can compile successfully and still be difficult to understand. Good programming style makes code easier to read, test, debug, and maintain.

### 10.1 Use Meaningful Names

Prefer names that communicate purpose.

Less descriptive:

```java
double x;
```

More descriptive:

```java
double accountBalance;
```

For class names, use names such as:

```java
StudentRecord
ComputeAverage
TemperatureConverter
```

rather than vague names such as:

```java
Test
Thing
Program1
```

when the class has a specific purpose.

### 10.2 Use Consistent Indentation

Indent code inside blocks consistently:

```java
public class Greeting {

    public static void main(String[] args) {
        System.out.println("Welcome!");
    }
}
```

Indentation does not replace Java's braces, but it makes program structure visually clear.

### 10.3 Use Whitespace Effectively

Whitespace can separate logical sections and improve readability.

Compare:

```java
public class Demo {
public static void main(String[] args) {
System.out.println("Hello");
}
}
```

with:

```java
public class Demo {

    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

Both may represent the same structure to the compiler, but the second version is much easier for a person to read.

### 10.4 Write Useful Comments

Comments should explain information that is useful to a reader.

Good comments often explain:

- the purpose of a program,
- the reason for a non-obvious decision,
- assumptions made by an algorithm, or
- important constraints.

Avoid comments that merely repeat obvious code.

```java
// Calculate the final price after applying the discount.
double finalPrice = price - discount;
```

---

## 11. Programming Errors

Errors are a normal part of programming. Learning to identify the type of error helps you debug programs systematically.

Three important categories are:

```text
Programming Errors
    |
    +-- Syntax / Compilation Errors
    |
    +-- Runtime Errors
    |
    +-- Logic Errors
```

### 11.1 Syntax Errors

A **syntax error** occurs when source code violates the grammatical rules of Java.

Example:

```java
public class SyntaxExample {

    public static void main(String[] args) {
        System.out.println("Hello Java")
    }
}
```

The semicolon is missing.

The compiler detects the problem and the program cannot be successfully compiled until the error is corrected.

Another example is an unterminated string:

```java
System.out.println("Hello Java);
```

### 11.2 Runtime Errors

A **runtime error** occurs while a program is executing.

For example:

```java
public class RuntimeExample {

    public static void main(String[] args) {
        System.out.println(10 / 0);
    }
}
```

The source code is syntactically valid, but integer division by zero causes an error during execution.

### 11.3 Logic Errors

A **logic error** occurs when a program executes but produces an incorrect result.

Consider a Celsius-to-Fahrenheit calculation:

```java
public class TemperatureExample {

    public static void main(String[] args) {
        double celsius = 35;
        double fahrenheit = (9.0 / 5.0) * celsius + 32;

        System.out.println(fahrenheit);
    }
}
```

The formula is:

```text
F = (9 / 5)C + 32
```

If integer arithmetic were used carelessly, the calculation could produce an incorrect result even though the program compiles and runs.

Logic errors are often more difficult to detect because the computer may not report an error message. Testing and careful reasoning are required to discover them.

## 12. Summary

A computer system combines hardware and software to process information. The CPU executes instructions, memory holds active programs and data, storage preserves information, and input/output and communication devices allow the system to interact with users and other systems.

Programs are written using programming languages. Machine language operates at the processor level, assembly language provides symbolic low-level instructions, and high-level languages allow programmers to express solutions in a more understandable form.

Java is a high-level, general-purpose, object-oriented programming language. Java source files use the `.java` extension. The Java compiler translates source code into **bytecode**, typically stored in `.class` files. The **Java Virtual Machine (JVM)** executes this bytecode, providing an important layer of portability between Java programs and different computing platforms.

A basic Java application contains a class and usually a `main` method that serves as the starting point for execution. Statements perform actions, semicolons terminate many statements, braces organize code into blocks, and comments document programs.

Finally, programmers should distinguish among three common categories of errors:

- **Syntax errors** are detected during compilation.
- **Runtime errors** occur during program execution.
- **Logic errors** allow the program to run but produce incorrect results.

Understanding these foundations provides the basis for writing, compiling, executing, and debugging increasingly sophisticated Java programs.
