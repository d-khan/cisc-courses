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

## Installing g++ on Windows

This guide explains how to install the **g++ C++ compiler** on Windows
using **MSYS2**.

### Step 1: Download and Install MSYS2

1.  Visit the [MSYS2 website](https://www.msys2.org/).
2.  Download the MSYS2 installer.
3.  Run the installer and complete the installation using the default
    settings.

### Step 2: Open the MSYS2 UCRT64 Terminal

After installation:

1.  Open the **Start menu**.
2.  Search for **MSYS2 UCRT64**.
3.  Open the **MSYS2 UCRT64** terminal.

> Make sure you open **UCRT64**, not one of the other MSYS2 terminals.

### Step 3: Update MSYS2

In the **MSYS2 UCRT64** terminal, run:

``` bash
pacman -Syu
```

If MSYS2 asks you to close the terminal:

1.  Close the terminal.
2.  Open **MSYS2 UCRT64** again.
3.  Run the update command again. If prompted to continue, enter **Y** and press **Enter**.

``` bash
pacman -Syu
```

### Step 4: Install GCC and g++

Run the following command in the **MSYS2 UCRT64** terminal:

``` bash
pacman -S mingw-w64-ucrt-x86_64-gcc
```

When prompted to continue, press **Y** and then **Enter**.

This installs GCC, including the **g++ C++ compiler**.

### Step 5: Verify the Installation

In the MSYS2 UCRT64 terminal, run:

``` bash
g++ --version
```

If the installation was successful, you should see the installed version
of g++.

### Step 6: Add g++ to the Windows PATH

To use `g++` from Windows Command Prompt, PowerShell, VS Code, or other
development tools, add the following folder to the Windows PATH:

``` text
C:\msys64\ucrt64\bin
```

### Add the Folder to PATH

1.  Open the **Start menu**.

2.  Type **Environment Variables** in the search bar

3.  Select **edit the system environment variables**.

4.  Click **Environment Variables**.

5.  Under **System variables** -->**Variables**, select **Path**.

6.  Click **Edit**.

7.  Click **New**.

8.  Enter:

    ``` text
    C:\msys64\ucrt64\bin
    ```

9.  Click **OK** several times to save the changes.

10. Close and reopen Command Prompt, PowerShell, VS Code, or your IDE.

### Step 7: Verify g++ from Windows

Open **Command Prompt** or **PowerShell** and run:

``` bash
g++ --version
```

You should now see the installed g++ version.

### Installation Complete

You now have the **g++ compiler** installed on Windows and can use it to
compile C++ programs.


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

1. Create a file named **hello.cpp** using any with the following code:

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
