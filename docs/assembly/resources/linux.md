# Linux Basic Commands Overview

Linux is an operating system commonly used on servers, cloud platforms, cybersecurity environments, embedded systems,
and software development. Most Linux interaction is performed through the **command-line interface (CLI)** using a
terminal.

---

## Getting Help

| Command          | Description                                  |
|------------------|----------------------------------------------|
| `man command`    | Display the manual page for a command        |
| `command --help` | Show command usage and options               |
| `info command`   | Display detailed information about a command |

### Examples

```bash
man ls
ls --help
```

---

## Navigation Commands

| Command        | Description                |
|----------------|----------------------------|
| `pwd`          | Display current directory  |
| `ls`           | List files and directories |
| `ls -l`        | Detailed file listing      |
| `ls -a`        | Show hidden files          |
| `cd directory` | Change directory           |
| `cd ..`        | Move to parent directory   |
| `cd ~`         | Go to home directory       |

### Examples

```bash
pwd
ls -la
cd Documents
```

---

## File and Directory Management

| Command                 | Description                     |
|-------------------------|---------------------------------|
| `mkdir directory`       | Create a directory              |
| `rmdir directory`       | Remove an empty directory       |
| `touch file.txt`        | Create an empty file            |
| `cp source destination` | Copy files                      |
| `mv source destination` | Move or rename files            |
| `rm file.txt`           | Delete a file                   |
| `rm -r directory`       | Delete a directory and contents |

### Examples

```bash
mkdir projects
touch notes.txt
cp notes.txt backup.txt
mv backup.txt old_notes.txt
rm old_notes.txt
```

---

## Viewing File Contents

| Command        | Description            |
|----------------|------------------------|
| `cat file`     | Display entire file    |
| `less file`    | View file page by page |
| `head file`    | Show first 10 lines    |
| `tail file`    | Show last 10 lines     |
| `tail -f file` | Monitor file changes   |

### Examples

```bash
cat data.txt
head data.txt
tail -f logfile.log
```

---

## Searching

| Command  | Description              |
|----------|--------------------------|
| `find`   | Search for files         |
| `grep`   | Search for text patterns |
| `locate` | Quickly locate files     |

### Examples

```bash
find . -name "*.txt"
grep "error" logfile.log
locate python
```

---

## File Permissions

| Command | Description           |
|---------|-----------------------|
| `chmod` | Change permissions    |
| `chown` | Change file ownership |
| `ls -l` | View permissions      |

### Examples

```bash
chmod 755 script.sh
chmod +x script.sh
chown user:filegroup file.txt
```

Permission Numbers:

| Value | Permission  |
|-------|-------------|
| 4     | Read (r)    |
| 2     | Write (w)   |
| 1     | Execute (x) |

Example:

```bash
chmod 755 script.sh
```

Equivalent to:

```text
rwxr-xr-x
```

---

## User Management

| Command        | Description              |
|----------------|--------------------------|
| `whoami`       | Display current user     |
| `id`           | Display user information |
| `passwd`       | Change password          |
| `sudo command` | Execute as administrator |

### Examples

```bash
whoami
id
sudo apt update
```

---

## Process Management

| Command         | Description                |
|-----------------|----------------------------|
| `ps`            | Show running processes     |
| `top`           | Real-time process monitor  |
| `htop`          | Interactive process viewer |
| `kill PID`      | Terminate a process        |
| `pkill process` | Kill process by name       |

### Examples

```bash
ps aux
top
kill 1234
```

---

## Disk Usage

| Command            | Description              |
|--------------------|--------------------------|
| `df -h`            | Display disk space usage |
| `du -sh directory` | Display directory size   |
| `free -h`          | Display memory usage     |

### Examples

```bash
df -h
du -sh Downloads
free -h
```

---

## Networking Commands

| Command     | Description             |
|-------------|-------------------------|
| `ping host` | Test connectivity       |
| `ip addr`   | Display IP addresses    |
| `hostname`  | Show system hostname    |
| `curl URL`  | Transfer data from URLs |
| `wget URL`  | Download files          |

### Examples

```bash
ping google.com
ip addr
curl https://example.com
wget https://example.com/file.zip
```

---

## Package Management

### Ubuntu / Debian

```bash
sudo apt update
sudo apt upgrade
sudo apt install package-name
sudo apt remove package-name
```

### Red Hat / Fedora

```bash
sudo dnf install package-name
sudo dnf update
```

---

## Compression and Archives

| Command                      | Description     |
|------------------------------|-----------------|
| `tar -cvf archive.tar files` | Create archive  |
| `tar -xvf archive.tar`       | Extract archive |
| `gzip file`                  | Compress file   |
| `gunzip file.gz`             | Decompress file |

### Examples

```bash
tar -cvf backup.tar Documents
tar -xvf backup.tar
gzip report.txt
```

---

## System Information

| Command       | Description                |
|---------------|----------------------------|
| `uname -a`    | Display kernel information |
| `hostnamectl` | Display system information |
| `date`        | Show current date and time |
| `uptime`      | Show system uptime         |

### Examples

```bash
uname -a
hostnamectl
date
uptime
```

---

## Keyboard Shortcuts

| Shortcut   | Description                      |
|------------|----------------------------------|
| `Ctrl + C` | Stop current command             |
| `Ctrl + Z` | Suspend process                  |
| `Ctrl + L` | Clear terminal                   |
| `Ctrl + R` | Search command history           |
| `Tab`      | Auto-complete command/file names |
| `↑` / `↓`  | Browse command history           |

---

## Useful Command Examples

```bash
# Create a directory
mkdir myproject

# Enter the directory
cd myproject

# Create a file
touch hello.txt

# View directory contents
ls -la

# Display file content
cat hello.txt

# Check current location
pwd

# Remove file
rm hello.txt
```

---

## Summary

The most commonly used Linux commands for beginners are:

```bash
pwd
ls
cd
mkdir
touch
cp
mv
rm
cat
grep
find
chmod
ps
top
df
ping
sudo
```

Mastering these commands provides a solid foundation for system administration, software development, cloud computing,
and cybersecurity.

# GNU Nano Editor Overview

**GNU Nano** is a simple, lightweight, terminal-based text editor commonly installed by default on many Linux
distributions. It is beginner-friendly and widely used for editing configuration files, scripts, source code, and text
documents directly from the command line.

---

## Starting Nano

Open a file with Nano:

```bash

nano filename.txt

```

Create a new file:

```bash

nano newfile.txt

```

Open a file with line numbers:

```bash

nano -l filename.txt

```

Open a file at a specific line:

```bash

nano +25 filename.txt

```

This opens `filename.txt` at line 25.

---

## Nano Interface

When Nano starts, you will see:

- File contents in the editor window

- Shortcut commands displayed at the bottom

- Cursor position information

Example:

```text

GNU nano 8.0                     notes.txt

Welcome to Linux!

^G Help      ^O Write Out  ^W Where Is

^K Cut Text  ^X Exit

```

**Note:** `^` means the **Ctrl** key.

For example:

```text

^X = Ctrl + X

^O = Ctrl + O

```

---

## Basic Navigation

| Key | Action |

|------|---------|

| Arrow Keys | Move cursor |

| Home | Beginning of line |

| End | End of line |

| Page Up | Previous page |

| Page Down | Next page |

| Ctrl + Y | Previous page |

| Ctrl + V | Next page |

---

## Saving a File

Save the current file:

```text

Ctrl + O

```

Nano will display:

```text

File Name to Write:

```

Press:

```text

Enter

```

to confirm.

---

## Exiting Nano

Exit Nano:

```text

Ctrl + X

```

If changes were made, Nano asks:

```text

Save modified buffer?

```

Options:

```text

Y = Yes

N = No

Ctrl + C = Cancel

```

---

## Editing Text

Simply start typing to insert text.

Use:

| Key | Action |

|------|---------|

| Backspace | Delete previous character |

| Delete | Delete current character |

| Enter | New line |

---

## Cut, Copy, and Paste

### Cut a Line

```text

Ctrl + K

```

Cuts the current line.

---

### Paste

```text

Ctrl + U

```

Pastes the most recently cut text.

---

### Copy a Line

Nano does not have a dedicated copy command like graphical editors.

A common method:

1. Mark text

2. Copy to buffer

3. Paste where needed

---

## Selecting Text

Start selection:

```text

Alt + A

```

or

```text

Ctrl + ^

```

Move the cursor using arrow keys.

Selected text becomes highlighted.

---

## Searching Text

Search within a file:

```text

Ctrl + W

```

Enter the search term and press:

```text

Enter

```

Example:

```text

error

```

---

## Search and Replace

Press:

```text

Ctrl + \

```

Enter:

```text

oldtext

```

Then:

```text

newtext

```

Nano will ask whether to replace each occurrence.

---

## Display Line Numbers

Launch Nano with:

```bash

nano -l filename.txt

```

or inside Nano:

```text

Alt + Shift + 3

```

(Depending on terminal support.)

---

## Go to a Specific Line

Press:

```text

Ctrl + _

```

Enter:

```text

50

```

Nano jumps to line 50.

---

## Viewing Cursor Position

Press:

```text

Ctrl + C

```

Displays:

```text

line number

column number

character position

```

---

## Working with Multiple Files

Open multiple files:

```bash

nano file1.txt file2.txt

```

Switch between files:

```text

Alt + <

Alt + >

```

---

## Useful Command-Line Options

| Command | Description |

|----------|-------------|

| `nano file.txt` | Open file |

| `nano -l file.txt` | Show line numbers |

| `nano +25 file.txt` | Open at line 25 |

| `nano -B file.txt` | Create backup file |

| `nano -m file.txt` | Enable mouse support |

| `nano --help` | Show help |

---

## Nano Shortcut Reference

| Shortcut | Action |

|-----------|---------|

| Ctrl + G | Help |

| Ctrl + O | Save file |

| Ctrl + X | Exit |

| Ctrl + K | Cut line |

| Ctrl + U | Paste |

| Ctrl + W | Search |

| Ctrl + \\ | Search and replace |

| Ctrl + C | Cursor position |

| Ctrl + _ | Go to line |

| Ctrl + Y | Previous page |

| Ctrl + V | Next page |

| Ctrl + L | Refresh screen |

| Ctrl + J | Justify paragraph |

---

## Example Workflow

Create and edit a file:

```bash

nano notes.txt

```

Type:

```text

Linux is awesome.

Nano is easy to learn.

```

Save:

```text

Ctrl + O

Enter

```

Exit:

```text

Ctrl + X

```

Verify contents:

```bash

cat notes.txt

```

Output:

```text

Linux is awesome.

Nano is easy to learn.

```

---

## Why Use Nano?

- Beginner-friendly

- Installed on most Linux systems

- Easy keyboard shortcuts

- Lightweight and fast

- Ideal for editing configuration files

- Perfect for remote servers via SSH

---

## Summary

The most important Nano shortcuts are:

```text

Ctrl + O    Save

Ctrl + X    Exit

Ctrl + K    Cut Line

Ctrl + U    Paste

Ctrl + W    Search

Ctrl + \    Replace

Ctrl + _    Go To Line

Ctrl + G    Help

```

Nano is an excellent first text editor for Linux users and system administrators because it is simple, reliable, and
available on nearly every Linux system.