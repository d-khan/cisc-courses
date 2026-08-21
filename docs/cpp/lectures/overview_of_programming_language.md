# An Overview of Computers and Programming Languages


Upon completion of this unit, students will be able to:

- Summarize the history and evolution of programming languages
- Identify the elements of a computer-hardware, software, operating systems, and languages
- Distinguish the components of machine language
- Define the processes of a C++ program
- List the steps in problem analysis coding
- Differentiate programming methodologies
- Compare programming languages
- Define ANSI/ISO Standard C++

## Introduction
---
Terms such as “the Internet,” which were unfamiliar just 25 years ago are now common. Students in elementary school regularly “surf” the Internet and use computers to design and implement their classroom projects. Many people use the Internet to look for information and to communicate with others. This is all made possible by the use of various software, also known as computer programs. Without software, a computer cannot work. Software is developed by using programming languages. C++ is one of the programming languages, which is well suited for developing software to accomplish specific tasks. The main objective of this course is to help you learn C++ programming language to write programs. Before you begin programming, it is useful to understand some of the basic terminology and different components of a computer. We begin with an overview of the history of computers.

## A Brief Overview of the History of Computers
---
The first device known to carry out calculations was the abacus. The abacus was invented in Asia but was used in ancient Babylon, China, and throughout Europe until the late middle ages. The abacus uses a system of sliding beads in a rack for addition and subtraction. In 1642, the French philosopher and mathematician Blaise Pascal invented the calculating device called the Pascaline. It had eight movable dials on wheels and could calculate sums up to eight figures long. Both the abacus and Pascaline could perform only addition and subtraction operations. Later in the 17th century, Gottfried von Leibniz invented a device that was able to add, subtract, multiply, and divide. In 1819, Joseph Jacquard, a French weaver, discovered that the weaving instructions for his looms could be stored on cards with holes punched in them. While the cards moved through the loom in sequence, needles passed through the holes and picked up threads of the correct color and texture. A weaver could rearrange the cards and change the pattern being woven. In essence, the cards programmed a loom to produce patterns in cloth. The weaving industry may seem to have little in common with the computer industry. However, the idea of storing information by punching holes on a card proved to be of great importance in the later development of computers.

In the early and mid-1800s, Charles Babbage, an English mathematician and physical scientist, designed two calculating machines: the difference engine and the analytical engine. The difference engine could perform complex operations such as squaring numbers automatically. Babbage built a prototype of the difference engine, but did not build the actual device. The first complete difference engine was completed in London in 2002, 153 years after it was designed. It consists of 8,000 parts, weighs five tons, and measures 11 feet long. A replica of the difference engine was completed in 2008 and is on display at the Computer History Museum in Mountain View, California (http://www.computerhistory.org/babbage/). Most of Babbage’s work is known through the writings of his colleague Ada Augusta, Countess of Lovelace. Augusta is considered the first computer programmer.

At the end of the 19th century, U.S. Census officials needed help in accurately tabulating the census data. Herman Hollerith invented a calculating machine that ran on electricity and used punched cards to store data. Hollerith’s machine was immensely successful. Hollerith founded the Tabulating Machine Company, which later became the computer and technology corporation known as IBM.

The first computer-like machine was the Mark I. It was built, in 1944, jointly by IBM and Harvard University under the leadership of Howard Aiken. Punched cards were used to feed data into the machine. The Mark I was 52 feet long, weighed 50 tons, and had 750,000 parts. In 1946, the Electronic Numerical Integrator and Calculator (ENIAC) was built at the University of Pennsylvania. It contained 18,000 vacuum tubes and weighed some 30 tons.

The computers that we know today use the design rules given by John von Neumann in the late 1940s. His design included components such as an arithmetic logic unit, a control unit, memory, and input/output devices. These components are described in the next section. Von Neumann’s computer design makes it possible to store the programming instructions and the data in the same memory space. In 1951, the Universal Automatic Computer (UNIVAC) was built and sold to the U.S. Census Bureau.

In 1956, the invention of transistors resulted in smaller, faster, more reliable, and more energy-efficient computers. This era also saw the emergence of the software development industry, with the introduction of FORTRAN and COBOL, two early programming languages. In the next major technological advancement, transistors were replaced by small-sized integrated circuits, or “chips.” Chips are much smaller and more efficient than transistors, and with today’s new technology a single chip can contain thousands of circuits. They give computers tremendous processing speed.

In 1970, the microprocessor, an entire central processing unit (CPU) on a single chip, was invented. In 1977, Stephen Wozniak and Steven Jobs designed and built the first Apple computer in their garage. In 1981, IBM introduced its personal computer (PC). In the 1980s, clones of the IBM PC made the personal computer even more affordable. By the mid-1990s, people from many walks of life were able to afford them. Computers continue to become faster and less expensive as technology advances.

Modern-day computers are powerful, reliable, and easy to use. They can accept spoken-word instructions and imitate human reasoning through artificial intelligence. Expert systems assist doctors in making diagnoses. Mobile computing applications are growing significantly. Using hand-held devices, delivery drivers can access global positioning satellites (GPS) to verify customer locations for pickups and deliveries. Cell phones permit you to check your e-mail, make airline reservations, see how stocks are performing, access your bank accounts, and communicate with family and friends via social media.

Although there are several categories of computers, such as mainframe, midsize, and micro, all computers share some basic elements, described in the next section.

## Elements of a Computer System
---
A computer is an electronic device capable of performing commands. The basic commands that a computer performs are input (get data), output (display result), storage, and performance of arithmetic and logical operations. There are two main components of a computer system: hardware and software. In the next few sections, you will learn a brief overview of these components. Let’s look at hardware first.

### Hardware
Major hardware components include the central processing unit (CPU); main memory (MM), also called random access memory (RAM); input/output devices; and secondary storage. Some examples of input devices are the keyboard, mouse, and secondary storage. Examples of output devices are the screen, printer, and secondary storage. Let’s look at each of these components in greater detail.

### Central Processing Unit and Main Memory
The central processing unit is the “brain” of a computer and the most expensive piece of hardware in a computer. The more powerful the CPU, the faster the computer. Arithmetic and logical operations are carried out inside the CPU. Figure 1-1(a) shows some hardware components.

<img width="783" height="443" alt="Screen Shot 2025-08-23 at 1 29 21 PM" src="https://github.com/user-attachments/assets/9de712fe-b070-41a8-9918-d70e8c20d096" />

Figure 1-1 Hardware components of a computer and main memory

Main memory, or random access memory, is connected directly to the CPU. All programs must be loaded into main memory before they can be executed. Similarly, all data must be brought into main memory before a program can manipulate it. When the computer is turned off, everything in main memory is lost.

Main memory is an ordered sequence of cells, called memory cells. Each cell has a unique location in main memory, called the address of the cell. These addresses help you access the information stored in the cell. Figure 1-1(b) shows main memory with some data.

Today’s computers come with main memory consisting of millions to billions of cells. Although Figure 1-1(b) shows data stored in cells, the content of a cell can be either a programming instruction or data. Moreover, this figure shows the data as numbers and letters. However, as explained later in this chapter, main memory stores everything as sequences of 0s and 1s. The memory addresses are also expressed as sequences of 0s and 1s.

### Secondary Storage

Because programs and data must be loaded into the main memory before processing and because everything in main memory is lost when the computer is turned off, information stored in the main memory must be saved in some other device for permanent storage. The device that stores information permanently (unless the device becomes unusable or you change the information by rewriting it) is called secondary storage. To be able to transfer information from main memory to secondary storage, these components must be directly connected to each other. Examples of secondary storage are hard disks, flash drives, and CD-ROMs.

### Input/Output Devices
For a computer to perform a useful task, it must be able to take in data and programs and display the results of calculations. The devices that feed data and programs into computers are called input devices. The keyboard, mouse, scanner, camera, and secondary storage are examples of input devices. The devices that the computer uses to display results are called output devices. A monitor, printer, and secondary storage are examples of output devices.

### Software
Software are programs written to perform specific tasks. For example, word processors are programs that you use to write letters, papers, and even books. All software is written in programming languages. There are two types of programs: system programs and application programs.

System programs control the computer. The system program that loads first when you turn on your computer is called the operating system. Without an operating system, the computer is useless. The operating system handles the overall activity of the computer and provides services. Some of these services include memory management, input/output activities, and storage management. The operating system has a special program that organizes secondary storage so that you can conveniently access information. Some well-known operating systems are Windows 10, Mac OS X, Linux, and Android.

Application programs perform a specific task. Word processors, spreadsheets, and games are examples of application programs. The operating system is the program that runs application programs.

### The Language of a Computer
When you press A on your keyboard, the computer displays A on the screen. But what is actually stored inside the computer’s main memory? What is the language of the computer? How does it store whatever you type on the keyboard?

Remember that a computer is an electronic device. Electrical signals are used inside the computer to process information. There are two types of electrical signals: analog and digital. Analog signals are continuously varying continuous wave forms used to represent such things as sound. Audio tapes, for example, store data in analog signals. Digital signals represent information with a sequence of 0s and 1s. A 0 represents a low voltage, and a 1 represents a high voltage. Digital signals are more reliable carriers of information than analog signals and can be copied from one device to another with exact precision. You might have noticed that when you make a copy of an audio tape, the sound quality of the copy is not as good as the original tape. On the other hand, when you copy a CD, the copy is the same as the original. Computers use digital signals.

Because digital signals are processed inside a computer, the language of a computer, called machine language, is a sequence of 0s and 1s. The digit 0 or 1 is called a binary digit, or bit. Sometimes a sequence of 0s and 1s is referred to as a binary code or a binary number.

A sequence of eight bits is called a byte. Moreover, $2^{10}$ bytes = 1024 bytes is called a kilobyte (KB). Table 1-1 summarizes the terms used to describe various numbers of bytes.

**Table: Binary Units of Data**

| Unit       | Symbol | Equivalent in Bytes      | Equivalent in Bits       |
|------------|--------|--------------------------|--------------------------|
| Bit        | b      | 1/8 byte                | 1 bit                    |
| Byte       | B      | 1 byte                  | 8 bits                   |
| Kilobyte   | KB     | 1,024 bytes             | 8,192 bits               |
| Megabyte   | MB     | 1,024 KB = 1,048,576 B  | 8,388,608 bits           |
| Gigabyte   | GB     | 1,024 MB                | 8,589,934,592 bits       |
| Terabyte   | TB     | 1,024 GB                | 8,796,093,022,208 bits   |
| Petabyte   | PB     | 1,024 TB                | 9,007,199,254,740,992 bits |
| Exabyte    | EB     | 1,024 PB                | ~9.22 × 10^18 bits       |

---

**Notes**
- **1 Byte (B) = 8 bits (b)**  
- Prefixes in computing (KB, MB, GB, etc.) are based on powers of 2, not 10.  
  - 1 KB = $2^{10}$ bytes = 1,024 bytes (not 1,000).  
- This is why storage manufacturers (who use decimal, e.g., 1 GB = 1,000,000,000 bytes) often show **slightly less space** on your computer.  


Every letter, number, or special symbol (such as * or {) on your keyboard is encoded as a sequence of bits, each having a unique representation. The most commonly used encoding scheme on personal computers is the seven-bit American Standard Code for Information Interchange (ASCII). The ASCII data set consists of 128 characters numbered 0 through 127. That is, in the ASCII data set, the position of the first character is 0, the position of the second character is 1, and so on. In this scheme, A is encoded as the binary number 1000001. In fact, A is the 66th character in the ASCII character code, but its position is 65 because the position of the first character is 0. Furthermore, the binary number 1000001 is the binary representation of 65. The character 3 is encoded as 0110011. Note that in the ASCII character set, the position of the character 3 is 51, so the character 3 is the 52nd character in the ASCII set. It also follows that 0110011 is the binary representation of 51. For a complete list of the printable ASCII character set, refer to Appendix C.

**Note**
> The number system that we use in our daily life is called the decimal system, or base 10. Because everything inside a computer is represented as a sequence of 0s and 1s, that is, binary numbers, the number system that a computer uses is called binary, or base 2. We indicated in the preceding paragraph that the number 1000001 is the binary representation of 65. Appendix E describes how to convert a number from base 10 to base 2 and vice versa.

Inside the computer, every character is represented as a sequence of eight bits, that is, as a byte. Now the eight-bit binary representation of 65 is 01000001. Note that we added 0 to the left of the seven-bit representation of 65 to convert it to an eight-bit representation. Similarly, we add one 0 to the binary value of 51 to get its eight-bit binary representation 00110011.

ASCII is a seven-bit code. Therefore, to represent each ASCII character inside the computer, you must convert the seven-bit binary representation of an ASCII character to an eight-bit binary representation. This is accomplished by adding 0 to the left of the seven-bit ASCII encoding of a character. Hence, inside the computer, the character A is represented as 01000001, and the character 3 is represented as 00110011.

There are other encoding schemes, such as Unicode. Unicode consists of 65,536 characters. To store a character belonging to Unicode, you need 16 bits or two bytes. Unicode was created to represent a variety of characters and is continuously expanding. It consists of characters from languages other than English.

## Evolution of Programming Languages

---

Programming languages have evolved for more than **eight decades**.  
The journey began with **machine instructions** and has advanced toward **AI-driven, high-level, and domain-specific languages**.  

The goal of this evolution:  
- Make programming easier for humans  
- Increase productivity  
- Reduce hardware dependence  
- Open new application domains (business, web, mobile, AI, data science)  

---

### Generations of Programming Languages

#### First Generation (1GL) – Machine Language
- Written directly in **binary (0s and 1s)**.  
- Executes fast but extremely difficult for humans to read/write.  
- Machine-specific.  

**Example:**  

```10110000 01100001```

---

#### Second Generation (2GL) – Assembly Language
- Uses **mnemonics (symbols)** instead of raw binary.  
- Still low-level and hardware dependent.  
- Requires an **assembler** to convert into machine code.  

**Example (x86 Assembly):**
```asm
MOV AL, 61h
```

#### Third Generation (3GL) – High-Level Languages

- Closer to **human language**.
- Portable across machines.
- Requires **compiler or interpreter**.
- Includes **C, Fortran, BASIC, Pascal, Java, Python**.

**Example (C):**

```c
#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}

```

#### Fourth Generation (4GL) – Domain-Specific Languages

- Designed for **productivity** and **specialized domains**.
- Often declarative: describe *what* you want, not *how*.
- Examples: **SQL** (databases), **R** (statistics), **MATLAB** (scientific computing).

**Example (SQL):**

```sql
SELECT name, age FROM Students WHERE gpa > 3.5;
```

#### Fifth Generation (5GL) – Logic & AI Languages

- Focuses on **problem-solving using constraints and logic**.
- Used in **AI, machine learning, natural language processing**.
- Examples: **Prolog, Lisp**, and modern frameworks like **TensorFlow (Python APIs)**.

**Example (Prolog):**

```prolog
likes(mary, pizza).
likes(john, pasta).

```

### Timeline Highlights

- **1950s** → FORTRAN (scientific), COBOL (business)
- **1970s** → C (system programming, portable)
- **1980s** → C++ (object-oriented, system-level)
- **1990s** → Java (platform-independent), Python (easy to learn/use)
- **2000s–2020s** → JavaScript (web), Swift (iOS), Rust & Go (modern system languages), and languages/frameworks for **AI & Data Science**

### Why Evolution Was Needed

- **Readability**: From binary to human-like syntax
- **Portability**: Code works across machines
- **Abstraction**: Programmers focus on logic, not hardware
- **Productivity**: Faster development, fewer errors
- **Domain Specialization**: Tools for business, science, AI, web, and mobile

Moving from machine language to assembly language made programming easier, but a programmer was still forced to think in terms of individual machine instructions. The next step toward making programming easier was to devise high-level languages that were closer to natural languages, such as English, French, German, and Spanish. Basic, FORTRAN, COBOL, C, C++, C#, Java, and Python are all high-level languages. You will learn the high-level language C++ in this course.

## Processing a C++ Program

In the previous sections, we discussed machine language and high-level languages and showed a C++ statement. Because a computer can understand only machine language, you are ready to review the steps required to process a program written in C++.

Consider the following C++ program:

```c++
#include <iostream>
using namespace std;
int main()
{
  cout << "My first C++ program. "" << endl;
  return 0;
}
```

At this point, you need not be too concerned with the details of this program. However, if you run (execute) this program, it will display the following line on the screen:

```My first ++ program.```

Recall that a computer can understand only machine language. Therefore, in order to run this program successfully, the code must first be translated into machine language. In this section, we review the steps required to execute programs written in C++.

The following steps, as shown in Figure 1-2, are necessary to process a C++ program.

<img width="704" height="360" alt="Screen Shot 2025-08-23 at 2 10 46 PM" src="https://github.com/user-attachments/assets/6461b2a9-f5c9-4d50-bff5-345f1508ef66" />

1. You use a text editor to create a C++ program following the rules, or syntax, of the high-level language. This program is called the source code, or source program. The program must be saved in a text file that has the extension .cpp. For example, if you saved the preceding program in the file named FirstCPPProgram, then its complete name is FirstCPPProgram.cpp.

2. The C++ program given in the preceding section contains the statement #include <iostream>. In a C++ program, statements that begin with the symbol # are called preprocessor directives. These statements are processed by a program called preprocessor.

3. After processing preprocessor directives, the next step is to verify that the program obeys the rules of the programming language—that is, the program is syntactically correct—and translate the program into the equivalent machine language. The compiler checks the source program for syntax errors and, if no error is found, translates the program into the equivalent machine language. The equivalent machine language program is called an object program.

4. The programs that you write in a high-level language are developed using an integrated development environment (IDE). The IDE contains many programs that are useful in creating your program. For example, it contains the necessary code (program) to display the results of the program and several mathematical functions to make the programmer’s job somewhat easier. Therefore, if certain code is already available, you can use this code rather than writing your own code. Once the program is developed and successfully compiled, you must still bring the code for the resources used from the IDE into your program to produce a final program that the computer can execute. This prewritten code (program) resides in a place called the library. A program called a linker combines the object program with the programs from libraries.

5. You must next load the executable program into main memory for execution. A program called a loader accomplishes this task.

6. The final step is to execute the program.

Figure 1-2 shows how a typical C++ program is processed.

As a programmer, you mainly need to be concerned with Step 1. That is, you must learn, understand, and master the rules of the programming language to create source programs.

As noted earlier, programs are developed using an IDE. Well-known IDEs used to create programs in the high-level language C++ include Visual C++ Express (2013 or 2016) and Visual Studio 2015 (from Microsoft), and C++ Builder (from Borland). You can also use Dev-C++ IDE from Bloodshed Software to create and test C++ programs. These IDEs contain a text editor to create the source program, a compiler to check the source program for syntax errors, a program to link the object code with the IDE resources, and a program to execute the program.

These IDEs are quite user friendly. When you compile your program, the compiler not only identifies the syntax errors, but also typically suggests how to correct them. Moreover, with just a simple command, the object code is linked with the resources used from the IDE. For example, the command that does the linking on Visual C++ Express (2013 or 2016) and Visual Studio 2015 is Build or Rebuild. (For further clarification regarding the use of these commands, check the documentation of these IDEs.) If the program is not yet compiled, each of these commands first compiles the program and then links and produces the executable code.

The website http://msdn.microsoft.com/en-us/library/vstudio/ms235629.aspx explains how to use Visual C++ Express and Visual Studio 2015 to create a C++ program.

## Programming with the Problem Analysis-Coding-Execution Cycle

Programming is a process of problem solving. Different people use different techniques to solve problems. Some techniques are nicely outlined and easy to follow. They not only solve the problem, but also give insight into how the solution is reached. These problem-solving techniques can be easily modified if the domain of the problem changes.

To be a good problem solver and a good programmer, you must follow good problem-solving techniques. One common problem-solving technique includes analyzing a problem, outlining the problem requirements, and designing steps, called an algorithm, to solve the problem.

In a programming environment, the problem-solving process requires the following three steps:

1. Analyze and outline the problem and its solution requirements, and design an algorithm to solve the problem.

2. Implement the algorithm in a programming language, such as C++, and verify that the algorithm works.

3. Maintain the program by using and modifying it if the problem domain changes.

<img width="697" height="712" alt="Screen Shot 2025-08-23 at 2 23 37 PM" src="https://github.com/user-attachments/assets/42917241-4a3e-4529-b147-9a4dddeea0bc" />

To develop a program to solve a problem, you start by analyzing the problem. You then design the algorithm; write the program instructions in a high-level language, or code the program; and enter the program into a computer system. Analyzing the problem is the first and most important step. This step requires you to do the following:

1. Thoroughly understand the problem.

2. Understand the problem requirements. Requirements can include whether the program requires interaction with the user, whether it manipulates data, whether it produces output, and what the output looks like. If the program manipulates data, the programmer must know what the data is and how it is represented. That is, you need to look at sample data. If the program produces output, you should know how the results should be generated and formatted.

3. If the problem is complex, divide the problem into subproblems and repeat Steps 1 and 2. That is, for complex problems, you need to analyze each subproblem and understand each subproblem’s requirements.

After you carefully analyze the problem, the next step is to design an algorithm to solve the problem. If you break the problem into subproblems, you need to design an algorithm for each subproblem. Once you design an algorithm, you need to check it for correctness. You can sometimes test an algorithm’s correctness by using sample data. At other times, you might need to perform some mathematical analysis to test the algorithm’s correctness.

Once you have designed the algorithm and verified its correctness, the next step is to convert it into an equivalent programming code. You then use a text editor to enter the programming code or the program into a computer. Next, you must make sure that the program follows the language’s syntax. To verify the correctness of the syntax, you run the code through a compiler. If the compiler generates error messages, you must identify the errors in the code, remove them, and then run the code through the compiler again. When all the syntax errors are removed, the compiler generates the equivalent machine code, the linker links the machine code with the system’s resources, and the loader places the program into main memory so that it can be executed.

The final step is to execute the program. The compiler guarantees only that the program follows the language’s syntax. It does not guarantee that the program will run correctly. During execution, the program might terminate abnormally due to logical errors, such as division by zero. Even if the program terminates normally, it may still generate erroneous results. Under these circumstances, you may have to reexamine the code, the algorithm, or even the problem analysis.

**Your overall programming experience will be successful if you spend enough time to complete the problem analysis before attempting to write the programming instructions. Usually, you do this work on paper using a pen or a pencil. Taking this careful approach to programming has a number of advantages. It is much easier to find errors in a program that is well analyzed and well designed. Furthermore, a carefully analyzed and designed program is much easier to follow and modify. Even the most experienced programmers spend a considerable amount of time analyzing a problem and designing an algorithm.**

## ANSI/ISO Standard C++
The programming language C++ evolved from C and was designed by Bjarne Stroustrup at Bell Laboratories in the early 1980s. From the early 1980s through the early 1990s, several C++ compilers were available. Even though the fundamental features of C++ in all compilers were mostly the same, the C++ language was evolving in slightly different ways in different compilers. As a consequence, C++ programs were not always portable from one compiler to another.

To address this problem, in the early 1990s, a joint committee of the American National Standards Institute (ANSI) and International Organization for Standardization (ISO) was established to standardize the syntax of C++. In mid-1998, ANSI/ISO C++ language standards were approved. Most of today’s compilers comply with these new standards. Over the last several years, the C++ committee met several times to further standardize the syntax of C++. In 2011, the second standard of C++ was approved. The main objective of this standard, referred to as C++11, is to make the C++ code cleaner and more effective. For example, the new standard introduces the data type long long to deal with large integers, auto declaration of variables using initialization statements, enhancing the functionality of for loops to effectively work with arrays and containers, and new algorithms. Some of these new C++ features are introduced in this course. C++14, which is an update over C++11 was approved in 2014.

This course focuses on the latest syntax of C++ as approved by ANSI/ISO, referred to as ANSI/ISO Standard C++.

## Quick Review
- A computer is an electronic device capable of performing arithmetic and logical operations.

- A computer system has two components: hardware and software.

- The central processing unit (CPU) and the main memory are examples of hardware components.

- All programs must be brought into main memory before they can be executed.

- When the power is switched off, everything in the main memory is lost.

- Secondary storage provides permanent storage for information. Hard disks, flash drives, and CD-ROMs are examples of secondary storage.

- Input to the computer is done via an input device. Two common input devices are the keyboard and the mouse.

- The computer sends its output to an output device, such as the computer screen or a printer.

- Software are programs run by the computer.

- The operating system handles the overall activity of the computer and provides services.

- The most basic language of a computer is a sequence of 0s and 1s called machine language. Every computer directly understands its own machine language.

- A bit is a binary digit, 0 or 1.

- A byte is a sequence of eight bits.

- A sequence of 0s and 1s is referred to as a binary code or a binary number.

- Assembly language uses easy-to-remember instructions called mnemonics.

- Assemblers are programs that translate a program written in assembly language into machine language.

- Compilers are programs that translate a program written in a high-level language into machine code, called object code.

- A linker links the object code with other programs provided by the integrated development environment (IDE) and used in the program to produce executable code.

- Typically, six steps are needed to execute a C++ program: edit, preprocess, compile, link, load, and execute.

- A loader transfers executable code into main memory.

- An algorithm is a step-by-step problem-solving process in which a solution is arrived at in a finite amount of time.

- The problem-solving process has three steps: analyze the problem and design an algorithm, implement the algorithm in a programming language, and maintain the program.

- In structured design, a problem is divided into smaller subproblems. Each subproblem is solved, and the solutions to all of the subproblems are then combined to solve the problem.

- In object-oriented design (OOD), a program is a collection of interacting objects.

- An object consists of data and operations on that data.

- The ANSI/ISO Standard C++ syntax was approved in mid-1998.

- The second standard of C++, C++11, was approved in 2011. C++14 was approved in 2014.

