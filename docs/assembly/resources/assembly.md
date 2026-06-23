# Assembly Language Resources

## **How to execute an Assembly Language code?**

There are many ways to assemble, link, and execute an Assembly Language program. In this course, all labs have been
developed and tested using the NASM assembler on the Intel x86 (32-bit) architecture. The following video walks you
through the installation of the required tools and demonstrates how to assemble, link, and run your first Assembly
Language program.

[How to execute an Assembly Language code?](https://www.youtube.com/watch?v=4IZSh1WVyi8)

---

## **Creating and Using an Assembly Language Build Script**

This section demonstrates how to create a shell script that assembles, links, and executes an Intel x86 (32-bit) Assembly Language program using NASM and Linux.

### Step 1: Create the Build Script

Open a terminal and create a file named `build.sh` using Nano:

```bash
nano build.sh
```

Add the following content:

```bash
#!/bin/bash
nasm -f elf ./$1.asm
ld -m elf_i386 ./$1.o -o ./$1
./$1
```

Save the file:

1. Press `Ctrl + O`
2. Press `Enter`
3. Press `Ctrl + X`

### Step 2: Make the Script Executable

Run the following command:

```bash
chmod +x build.sh
```

This grants execute permission to the script.

### Step 3: Create a Simple Assembly Program

Create a file named `hello.asm`:

```bash
nano hello.asm
```

Add the following code:

```assembly
section .data
    msg db "Hello World!", 10
    len equ $ - msg

section .text
    global _start

_start:

    mov eax, 4
    mov ebx, 1
    mov ecx, msg
    mov edx, len
    int 0x80

    mov eax, 1
    mov ebx, 0
    int 0x80
```

Save the file and exit Nano.

---

### Step 4: Use the Script

Execute the script and provide the Assembly file name without the `.asm` extension:

```bash
./build.sh hello
```

The script will:

1. Assemble `hello.asm` into `hello.o`
2. Link `hello.o` into an executable named `hello`
3. Execute the program

Expected output:

```text
Hello World!
```

---

## How the Script Works

### Assemble

```bash
nasm -f elf ./hello.asm
```

Converts the Assembly source code into a 32-bit ELF object file.

### Link

```bash
ld -m elf_i386 ./hello.o -o ./hello
```

Creates a 32-bit Linux executable.

### Execute

```bash
./hello
```

Runs the program.

---

### Example

Suppose you have a file named `sum.asm`.

Run:

```bash
./build.sh sum
```

The script automatically assembles, links, and executes the program.

> **Please do not include a file extension when specifying the output filename in the command above. Doing so will delete the .asm file.**

---

### Notes

- This course uses the **Intel x86 (32-bit)** instruction set architecture.
- Programs are assembled using **NASM (Netwide Assembler)**.
- The linker creates **ELF (Executable and Linkable Format)** executables for Linux.
- The build script simplifies the process by combining assembling, linking, and execution into a single command.

## **Why Do I Need to Reinstall the Assembly Language Packages?**

After you configure the Linux environment and install the required Assembly Language packages, you may notice that they 
disappear at a later time. This occurs because the Linux environment on the NRP is periodically refreshed. When a refresh 
happens, the operating system is restored to its default configuration as provided by the system administrators.  

This refresh **does not affect your data or files**. Your work remains intact; however, software packages that you previously installed may be removed.  

Since the Assembly Language assembler and related tools used in this course are not part of the default installation, commands that previously worked may suddenly return errors such as “command not found”.  

When this happens, you will need to reinstall the required packages. To simplify this process, I have provided a small installation script that automatically installs all necessary course-related packages.

Create a file named install.sh, make it executable, and run it whenever you encounter this situation. The process for creating a file and assigning executable permissions is the same as described earlier in this guide.

```
#!/bin/bash
sudo apt update
sudo apt install nasm
sudo apt install gdb
```

To run, type ```./install.sh```  
If prompted for confirmation during the installation process, type **Y** and press Enter to continue.

You should see output similar to the following.
```
Hit:1 https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64  InRelease
Hit:2 http://archive.ubuntu.com/ubuntu jammy InRelease      
Hit:3 http://archive.ubuntu.com/ubuntu jammy-updates InRelease
Hit:4 http://archive.ubuntu.com/ubuntu jammy-backports InRelease
Hit:5 http://security.ubuntu.com/ubuntu jammy-security InRelease
Reading package lists... Done         
Building dependency tree... Done
Reading state information... Done
170 packages can be upgraded. Run 'apt list --upgradable' to see them.
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
nasm is already the newest version (2.15.05-1).
0 upgraded, 0 newly installed, 0 to remove and 170 not upgraded.
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
gdb is already the newest version (12.1-0ubuntu1~22.04.2).
0 upgraded, 0 newly installed, 0 to remove and 170 not upgraded.
```
## **What is GDB and why we use GDB here?**

GDB (GNU Debugger) is a tool used to debug programs while they are running. It allows you to see what your program is
doing, inspect registers and memory, and find errors in your code.

In an Assembly Language course, GDB is especially useful because there are no high-level language features to help you
understand program behavior.


Most Ubuntu installations do not come with GDB preinstalled, although some developer-focused distributions or images may
include it.
You can check whether it is installed:

```
gdb --version
```

If GDB is installed, you’ll see version information such as:

```
GNU gdb (Ubuntu) 16.x
```

If it is not installed, Ubuntu will typically show:

```
Command 'gdb' not found
```

If you have watched the video (mentioned above), you must have already installed necessary packages. If not, you can use
the following packages

```
sudo apt update
sudo apt install nasm gdb build-essential
```

Here is the cheat sheet for a quick reference. (No need to remember the commands)  
[GDB cheatsheet](https://csapp.cs.cmu.edu/3e/docs/gdbnotes-x86-64.pdf)
