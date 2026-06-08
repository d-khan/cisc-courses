# File management

The system considers any input or output data as stream of bytes. There are three standard file streams −

- Standard input (stdin),
- Standard output (stdout), and
- Standard error (stderr).

A **file descriptor** is a 16-bit integer assigned to a file as a file id. When a new file is created, or an existing file is opened, the file descriptor is used for accessing the file.

The file descriptor of the standard file streams - **stdin, stdout,** and **stderr** are 0, 1, and 2, respectively.

A **file pointer** specifies the location for a subsequent read/write operation in the file in terms of bytes. Each file is considered a sequence of bytes. Each open file is associated with a file pointer that specifies an offset in bytes relative to the beginning of the file. When a file is opened, the file pointer is set to zero.

## File handling system calls

The following table briefly describes the system calls related to file handling −

| %eax |   Name    |      %ebx      |     %ecx     |     %edx     |
| :--: | :-------: | :------------: | :----------: | :----------: |
|  2   | sys_fork  | struct pt_regs |      -       |      -       |
|  3   | sys_read  |  unsigned int  |    char *    |    size_t    |
|  4   | sys_write |  unsigned int  | const char * |    size_t    |
|  5   | sys_open  |  const char *  |     int      |     int      |
|  6   | sys_close |  unsigned int  |      -       |      -       |
|  8   | sys_creat |  const char *  |     int      |      -       |
|  19  | sys_lseek |  unsigned int  |    off_t     | unsigned int |

## Creating a file

To create a file, perform the following tasks −

- eax register = 8. This is to call `sys_creat()`
- ebx register = filename
- ecx register = file permissions

Read about [file permissions here](https://www.redhat.com/sysadmin/linux-file-permissions-explained)

The system call returns the file descriptor of the created file in the EAX register; in case of an error, the error code is in the EAX register.

### Example - creating a new file

``` assembly
SECTION .text
global  _start
 
_start:
 
        mov     ecx, 0711o ; set all permissions to read, write, execute (octal format)
        mov     ebx, filename       ; filename we will create
        mov     eax, 8              ; invoke SYS_CREAT (kernel opcode 8)
        int     0x80                ; call the kernel

        mov     eax,1
        int     0x80

SECTION .data
filename db 'readme.txt', 0h    ; the filename to create
```

Compile and run. You should be able to see the `readme.txt` file. Use `ls -l read*` command to check the file with permission.

## Opening a file
For opening an existing file, perform the following tasks
- eax register = 5. This is to call `sys_open()`
- ebx register = file name
- ecx register = file access mode
- edx register = file permissions

The system call returns the file descriptor of the created file in the EAX register, in case of error, the error code is in the EAX register.

Among the file access modes, most commonly used are: read-only (0), write-only (1), and read-write (2).

## Writing a file

For writing to a file, perform the following tasks

- eax register = 4. This is to call `sys_write()`
- ebx register = file descriptor
- ecx register = pointer to the output buffer
- edx register = buffer size (the number of bytes to write)

The system call returns the actual number of bytes written in the EAX register, in case of error, the error code is in the EAX register.

### Example - open and write to a file

``` assembly
SECTION .data
        filename db 'readme.txt', 0h    ; the filename to create
        contents db 'Hello world!', 0h  ; the contents to write
 
SECTION .text
        global  _start
 
_start:
        ;file open operation
        ;assuming that the file has already been created.
        ;If the readme.txt file is not created, then crrate a file
        ;using the example above.
        mov eax, 5					;file handling system call
        mov ebx, filename
        mov ecx, 1
        mov edx, 0777o
        int 0x80

        mov [fd_out],eax

        ;file write operation
        mov eax, 4					;file handling system call
        mov ebx, [fd_out]   ;file descriptor
        mov ecx, contents
        mov edx, 12         ;number of bytes written
        int 0x80

        mov eax, 1
        int 0x80

section .bss
        fd_out resb 1
```

## Closing a file
- eax register = 6. This is to call `sys_close()`
- ebx register = file descriptor
  In case of an error, the system call returns the error code in the EAX register.

### Example - open, write, and close

```assembly
SECTION .data
        filename db 'readme.txt', 0h    ; the filename to create
        contents db 'Hello world!', 0h  ; the contents to write
 
SECTION .text
        global  _start
 
_start:

        ;file open operation
        mov eax, 5					;file handling system call
        mov ebx, filename
        mov ecx, 1
        mov edx, 0777o
        int 0x80

        mov [fd_out],eax

        ;file write operation
        mov eax, 4					;file handling system call
        mov ebx, [fd_out]   ;file descriptor
        mov ecx, contents
        mov edx, 12         ;number of bytes written
        int 0x80

        ;file close operation
        mov eax, 6					;file handling system call
        mov ebx, [fd_out]
        int 0x80

        mov eax, 1
        int 0x80

section .bss
        fd_out resb 1
```

<h2>Concept Check</h2>

<h3>Q1. Standard File Streams</h3>

<p>
What are the file descriptor values associated with the three standard file streams:
<code>stdin</code>, <code>stdout</code>, and <code>stderr</code>?
</p>

<details>
<summary>Show Answer</summary>

<p>
Linux assigns predefined file descriptors to the standard streams:
</p>

<ul>
<li>stdin = 0</li>
<li>stdout = 1</li>
<li>stderr = 2</li>
</ul>

<p><strong>Answer:</strong> stdin = 0, stdout = 1, stderr = 2.</p>

</details>

<hr>

<h3>Q2. Creating a File</h3>

<p>
Which system call number should be loaded into the EAX register to create a new file?
</p>

<details>
<summary>Show Answer</summary>

<p>
The <code>sys_creat()</code> system call is used to create a file.
</p>

<pre><code>
mov eax,8
</code></pre>

<p><strong>Answer:</strong> EAX must contain 8.</p>

</details>

<hr>

<h3>Q3. Opening a File</h3>

<p>
In the following code, what access mode is being requested?
</p>

<pre><code>
mov eax,5
mov ebx,filename
mov ecx,1
mov edx,0777o
int 0x80
</code></pre>

<details>
<summary>Show Answer</summary>

<p>
The value stored in ECX specifies the file access mode.
</p>

<ul>
<li>0 = Read-only</li>
<li>1 = Write-only</li>
<li>2 = Read-write</li>
</ul>

<p>
Since ECX contains 1, the file is opened for writing only.
</p>

<p><strong>Answer:</strong> Write-only access mode.</p>

</details>

<hr>

<h3>Q4. Writing to a File</h3>

<p>
What is the purpose of the EDX register in the <code>sys_write()</code> system call?
</p>

<details>
<summary>Show Answer</summary>

<p>
The EDX register specifies the number of bytes to write from the buffer.
</p>

<pre><code>
mov edx,12
</code></pre>

<p>
This means 12 bytes will be written to the file.
</p>

<p><strong>Answer:</strong> EDX contains the size of the output buffer (number of bytes to write).</p>

</details>

<hr>

<h3>Q5. File Descriptor Storage</h3>

<p>
After a successful <code>sys_open()</code> call, why is the value in EAX copied into the variable <code>fd_out</code>?
</p>

<pre><code>
mov [fd_out],eax
</code></pre>

<details>
<summary>Show Answer</summary>

<p>
The system call returns the file descriptor in EAX.
</p>

<p>
The program saves the descriptor so it can be used later for writing to or closing the file.
</p>

<p><strong>Answer:</strong> The file descriptor is stored for future file operations such as write and close.</p>

</details>

