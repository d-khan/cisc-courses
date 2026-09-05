# __Installing Python for Windows, macOS and Linux OS__

## __Installing Python on Windows__

1. Go to [python.org/downloads](https://www.python.org/downloads/).

2. Select **Download Python install manager**.

3. Open the **Downloads** folder and double-click the file you just downloaded.

4. Follow the prompts to install Python.

5. If prompted to **update settings**, select **Yes**.

6. When the **User Account Control** window appears, select **Yes**.

7. If prompted to **add Python to PATH**, select **Yes**.

8. If prompted to install or add **Python help/documentation**, select **Yes**.

9. After the installation is complete, close any open Terminal windows. Type **Terminal** in the Windows search box and
   open a new Terminal.

10. Type the following command:
    ```bash
    python
    ```
    You should see the installed Python version and the Python prompt (`>>>`).

11. To exit Python, type:
    ```python
    exit()
    ```

> **Note:** On Windows, use `python` rather than `python3`. The `python3` command is more commonly used on macOS and
> Linux.

## __Installing Python on macOS__

1. Go to [python.org/downloads](https://www.python.org/downloads/).

2. Select **Download Python** for macOS.

3. Go to the **Downloads** folder and double-click the `.pkg` file you just downloaded.

4. Follow the installation instructions by selecting **Continue**.

5. Select **Install** when prompted.

6. Enter your Mac password or use **Touch ID** if prompted.

7. Once the installation is complete, select **Close**.

8. Open **Terminal**:
    - Press `Command + Space`.
    - Type **Terminal**.
    - Press `Enter`.

9. In the Terminal, type:

    ```bash
    python3
    ```

10. You should see the installed Python version followed by the Python prompt:

    ```text
    >>>
    ```

11. To exit Python, type:

    ```python
    exit()
    ```

> **Note:** On macOS, use `python3` to run Python from the Terminal.

## __Installing Python on Linux__

Most Linux distributions already have Python 3 installed. Check your Python installation before installing it.

1. Open the **Terminal**.

2. Check whether Python 3 is installed:

    ```bash
    python3 --version
    ```

3. If Python 3 is installed, you should see a version number similar to:

    ```text
    Python 3.x.x
    ```

   If you see a Python 3 version, you can skip to Step 6.

4. If Python 3 is not installed, update the package list:

    ```bash
    sudo apt update
    ```

5. Install Python 3, `pip`, and support for virtual environments:

    ```bash
    sudo apt install python3 python3-pip python3-venv
    ```

6. Verify that Python is working:

    ```bash
    python3 --version
    ```

7. Start Python:

    ```bash
    python3
    ```

   You should see the installed Python version followed by the Python prompt:

    ```text
    >>>
    ```

8. To exit Python, type:

    ```python
    exit()
    ```

> **Note:** The installation commands above are for Ubuntu and other Debian-based Linux distributions. Other Linux
> distributions may use a different package manager.

> **Note:** On Linux, use `python3` to run Python from the Terminal.

# __Integrated Development Environment (IDE) for Python__

For this course, you may use any **Integrated Development Environment (IDE)** that supports Python. There is no required
IDE; however, you should use a local development environment that allows you to write, run, test, and debug your
programs.

I use and recommend **PyCharm** for this course. You can download it from the JetBrains website:

<https://www.jetbrains.com/pycharm/>

PyCharm provides many useful features for Python development, including:

- Code editing and syntax highlighting
- Step-by-step debugging
- Variable inspection
- Package management
- Project organization
- Version control integration

When creating a project, PyCharm can be configured to use the Python interpreter installed on your computer.

__Other Options__

You may also use another development environment, such as **VS Code**, or a text editor such as **Sublime Text**.

If you use a text editor, you can write your Python code in the editor and run the program from the terminal or command
line. This approach is recommended only if you are comfortable working in a command-line environment.

Choose the development environment that works best for you. The important goal is to develop a consistent workflow for *
*writing, running, testing, and debugging Python programs**.
 
> **Do not use an online Python compiler as your primary development environment for this course.**  
> Online environments can be useful for quickly testing small pieces of code, but they do not always provide the complete
> development experience expected in this course.

You are expected to use a **local Python development environment** so that you become familiar with the tools and
practices commonly used in software development.

## __Installing and Configuring PyCharm on Windows__

1. Go to the [PyCharm website](https://www.jetbrains.com/pycharm/).

2. Download the version of PyCharm that matches your computer's processor architecture.

    - Type **About** in the Windows search box.
    - Select **About your PC**.
    - Under **Device specifications**, locate **System type**.
    - If it shows **x64-based processor**, download the **x64** version of PyCharm.
    - If it shows **ARM-based processor**, download the **ARM64** version of PyCharm.

3. Go to the **Downloads** folder and double-click the PyCharm installer you just downloaded.

4. If the **User Account Control** window appears, select **Yes**.

5. Select **Next** to continue with the installation.

6. Under **Installation Options**, select the following:

    - **PyCharm** — Creates a desktop shortcut.
    - **Add "bin" folder to the PATH** — Allows PyCharm to be launched from the command line.
    - **Add "Open Folder as Project"** — Allows you to open a folder directly as a PyCharm project.

   Under **Create Associations**, select:

    .py — Makes PyCharm the default application for Python files

   The other file associations can remain unchecked.

7. Select **Next**, and then select **Install**.

8. When the installation is complete, check **Run PyCharm** and select **Finish**.

9. When PyCharm starts for the first time, review and accept the **User Agreement**, and then select **Continue**.

10. If Windows displays a security or firewall prompt, select **Allow**.

### __Creating Your First Python Project__

11. From the PyCharm welcome screen, select **New Project**.

12. Make sure PyCharm detects your installed version of **Python** as the Python interpreter.

    > **Note:** PyCharm may automatically create a virtual environment (`.venv`) for your project. You can keep the default settings.

13. Select **Create**.

14. Create or open a Python file (`.py`) and enter:

    ```python
    print("Hi, PyCharm")
    ```

15. Select the green **Run ▶** button to execute the program.

16. You should see the following output:

    ```text
    Hi, PyCharm
    ```

If you see this output, **Python and PyCharm are installed and configured correctly**.

## __Installing and Configuring PyCharm on macOS__

1. Go to the [PyCharm website](https://www.jetbrains.com/pycharm/).

2. Download the version of PyCharm that matches your Mac's processor.

    To check your processor:

    * Select the **Apple menu ()** in the upper-left corner.    
    * Select **About This Mac**.  
    * Look for **Chip** or **Processor**.  
    * If you see **Apple M1, M2, M3, M4, or later**, download the **Apple Silicon** version.  
    * If you see **Intel**, download the **Intel** version.

3. Go to the **Downloads** folder and double-click the PyCharm `.dmg` file you just downloaded.

4. When the installation window appears, drag the **PyCharm** icon into the **Applications** folder.

5. Open the **Applications** folder and double-click **PyCharm**.

6. If macOS displays a message stating that PyCharm was downloaded from the Internet, select **Open**.

7. When PyCharm starts for the first time, review and accept the **User Agreement**, and then select **Continue**.

8. If macOS asks PyCharm for any necessary permissions, select **Allow**.

### __Creating Your First Python Project__

9. From the PyCharm welcome screen, select **New Project**.

10. Make sure PyCharm detects your installed version of **Python** as the Python interpreter.

    > **Note:** PyCharm may automatically create a virtual environment (`.venv`) for your project. You can keep the default settings.

11. Select **Create**.

12. Create or open a Python file (`.py`) and enter:

    ```python
    print("Hi, PyCharm")
    ```

13. Select the green **Run ▶** button to execute the program.

14. You should see the following output:

    ```text
    Hi, PyCharm
    ```

If you see this output, **Python and PyCharm are installed and configured correctly**.

## __Installing and Configuring PyCharm on Ubuntu__

1. Make sure Python 3 is installed:

    ```bash
    python3 --version
    ```

   You should see the installed Python version, such as:

    ```text
    Python 3.x.x
    ```

2. Open the **Terminal**.

3. Install PyCharm using the following command:

    ```bash
    sudo snap install pycharm --classic
    ```

4. Enter your Ubuntu password if prompted.

5. Wait for the installation to complete.

6. Open **Activities** and search for **PyCharm**.

7. Select **PyCharm** to start the application.

8. When PyCharm starts for the first time, review and accept the **User Agreement**, and then select **Continue**.

### __Creating Your First Python Project__

9. From the PyCharm welcome screen, select **New Project**.

10. Make sure PyCharm detects your installed version of **Python** as the Python interpreter.

    > **Note:** PyCharm may automatically create a virtual environment (`.venv`) for your project. You can keep the default settings.

11. Select **Create**.

12. Create or open a Python file (`.py`) and enter:

    ```python
    print("Hi, PyCharm")
    ```

13. Select the green **Run ▶** button to execute the program.

14. You should see:

    ```text
    Hi, PyCharm
    ```

If you see this output, **Python and PyCharm are installed and configured correctly**.