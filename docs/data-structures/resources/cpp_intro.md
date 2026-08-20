# C++ recap

If you’re looking for a quick recap, you can watch the following videos that I created. Alternatively, there are plenty
of other resources available online.

1. [C++ basic](https://youtu.be/xJH_UHZmmcw)
2. [Input and Output in C++](https://youtu.be/797pXmL1qcM)
3. [Decision and Switch Statements](https://youtu.be/Of7LR_AJmCk)
4. [Loops in C++](https://youtu.be/Pzzudvx_Z9o)
5. Functions
    - [Functions-1](https://youtu.be/0LzYAKss-yA)
    - [Functions-2](https://youtu.be/CXWeTzpHuTc)
    - [Functions-3](https://youtu.be/YasirZZgDzk)
    - [Functions-4](https://youtu.be/ukEQwFIwADc)
    - [Functions-5](https://youtu.be/VtStrvwrZgs)
    - [Functions-6](https://youtu.be/MuAQT_BUgMA)
6. [Enum and Namespaces](https://youtu.be/KDBfRYmUQ2I)
7. [Strings in C++](https://youtu.be/lPWS2jfZmmE)
8. Arrays
    - [Arrays-1](https://youtu.be/ppFvK_SKQVY)
    - [Arrays-2](https://youtu.be/PNbsdJ4qHsg)
9. [Structures in C++](https://youtu.be/iBFID_PcrWI)
10. Classes
    - [Classes-1](https://youtu.be/wytzyX4SFHw)
    - [Classes-2](https://youtu.be/VzDwDSryaEk)
    - [Classes-3](https://youtu.be/O_ZEOoynoFM)
    - [Classes-4](https://youtu.be/HjPdYeVmybg)
    - [Classes-5](https://youtu.be/Q2yjmoTMZgc)
11. [Inheritance](https://youtu.be/OFQgaJix3dE)
12. Pointers
    - [Pointers-1](https://youtu.be/WPPkS3QXQwc)
    - [Pointers-2](https://youtu.be/Wk4WGorihN0)
    - [Pointers-3](https://youtu.be/17V8jcSjf8U)
    - [Pointers-4](https://youtu.be/o-U3Tp4QZzk)
    - [Pointers-5](https://youtu.be/pBt96yt-WaM)
    - [Pointers-6](https://youtu.be/iEiiY7WwpD0)
    - [Review of pointers](https://youtu.be/6Y88V3yLGoE)
    - [Practice pointers-1](https://youtu.be/KQ281Y_P9a4)
    - [Practice pointers-2](https://youtu.be/YYzHAi0RAPI)
    - [Practice pointers-3](https://youtu.be/T0MQslEhe44)
    - [Practice pointers-4](https://youtu.be/HfO-bK_-RKI)

# Installing a C++ Compiler

This section will help you install a C++ compiler on **Windows, macOS, or Linux**.  
Follow the steps for your operating system. At the end, you’ll test your compiler with a simple program.

---

## Windows (MSYS2)

1. Go to the [MSYS2](https://www.msys2.org/) and follow the installation steps (1-7) posted on the website.
2. Add ```C:\msys64\mingw64\bin``` path in Windows
    - Go to Windows search and type "System Variables". Select "Edit the system environment variables" -> Environment
      Variables -> System variables -> Highlight Path -> Edit -> New -> Then paste ```C:\msys64\mingw64\bin``` -> select OK
      several times -> Restart your computer
3. After restart -> Go to command prompt -> type ```g++ --version``` -> the following output will display

```txt
g++ (Rev8, Built by MSYS2 project) 15.2.0
Copyright (C) 2025 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

If you see the above output, you’re done!

## macOS

1. Open **Terminal**.

2. Run:

   ```
   xcode-select --install
   ```

3. Verify installation with:

   ```
   clang++ --version
   ```

You should see Apple Clang listed.

## Linux (Ubuntu/Debian)

1. Update packages:

   ```
   sudo apt update
   ```

2. Install compiler:

   ```
   sudo apt install g++
   ```

3. Verify installation:

   ```
   g++ --version
   ```

You should see GNU C++ version.

------

## Test Your Compiler

1. Create a file named **hello.cpp** with the following code:

   ```
   #include <iostream>
   using namespace std;
   
   int main() {
       cout << "Hello, C++!" << endl;
       return 0;
   }
   ```

2. Compile and run:

   ```
   g++ hello.cpp -o hello
   ./hello     # On Windows use: hello.exe
   ```

Expected output:

```
Hello, C++!
```
