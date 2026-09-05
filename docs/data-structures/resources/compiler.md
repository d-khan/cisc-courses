# Installing a C++ Compiler

This section will help you install a C++ compiler on **Windows, macOS, or Linux**.  
Follow the steps for your operating system. At the end, you’ll test your compiler with a simple program.

## __Installing g++ on Windows__

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


## __Installing g++ on macOS__

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

## __Installing g++ on Linux (Ubuntu/Debian)__

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
