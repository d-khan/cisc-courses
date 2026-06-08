# Procedures

Procedures or subroutines are very important in assembly language, as the assembly language programs tend to be large. Procedures are identified by name. Following this name, the procedure's body is described, which performs a well-defined job. A return statement indicates the end of the procedure.

**Syntax**

``` assembly
proc_name:
	procedure body
	...
	ret
```

## Difference between a procedure and a function
A function that returns no value or returns a null value is sometimes called a procedure. On the contrary, functions return some values.

## Example code 1

``` assembly
section .text
	global _start

_start:
	mov eax,10
	mov ebx,20
	call sum		;calling sum procedure
	mov eax,1
	int 0x80

sum:
	add eax,ebx
	ret
```

Run the above code and use gdb to debug the code. Assume the filename is `example.asm`. Use `run.sh` script to run the code. [Click here to get the details of how to run the code](https://sdccd-edu.zoom.us/rec/share/Heesw_hE-h9W58AAEX5HiNeiK4EsemWVhI5Vo7bCgeaG_ZrgPhmz-fUk2-tOmvFS.KVW8wyIHQqL2A2dd?startTime=1678767400000)

```
gdb example
layout asm
layout regs
run _start
stepi
```

**Move the subprocedure below the _start: and verify if the code runs. Discuss the outcome with your classmates**

### Critical analysis of the code in the context of memory allocations
See provided sheet

## Example code 2

In this example, two procedures are defined. The eax register takes an integer number and displays the result on the terminal. The eax register takes integer 65, save the result in the memory, move the res variable memory address to the ecx register, and then sends the output to the screen. Before sending the output to the screen, the ecx register contains the memory address of the res variable. Since eax, ebx, and edx registers are reserved for displaying data, only the ecx register contains the data to be displayed. As discussed before, when the numbers are displayed on the screen or entered from the keyboard, they are in ASCII form. The following example will print **A** on the terminal.

``` assembly
section .text
        global _start

_start:
        mov eax,65
        mov [res],eax
        mov ecx,res
        call output
        call exit

output:
        mov edx,1       ;output length
        mov ebx,1       ;stdout
        mov eax,4       ;system call (sys_write)
        int 0x80        ;interrupt kernel
        ret

exit:
        mov eax,1
        int 0x80

segment .bss
        res resb 1
```

**Note: Run the code and see the results on the terminal. No need to run gdb**  
**Draw an under-the-hood memory allocation table of the above code, similar to the provided sheet. Use gdb to get the memory address**


# Stacks

A stack is an array-like data structure in the memory in which data can be stored and removed from a location called the 'top' of the stack. The data that needs to be stored is 'pushed' into the stack and data to be retrieved is 'popped' out from the stack. Stack is a LIFO data structure, i.e., the data stored first is retrieved last.

Assembly language provides two instructions for stack operations: PUSH and POP. These instructions have syntaxes like −

```assembly
push	operand
pop	address/register
```

The memory space reserved in the stack segment is used for implementing stack. The registers SS and ESP (or SP) are used for implementing the stack. The top of the stack, which points to the last data item inserted into the stack is pointed to by the SS:ESP register, where the SS register points to the beginning of the stack segment and the SP (or ESP) gives the offset into the stack segment.

The stack implementation has the following characteristics −

- Only **words** or **doublewords** could be saved into the stack, not a byte.
- The stack grows in the reverse direction, i.e., toward the lower memory address
- The top of the stack points to the last item inserted in the stack; it points to the lower byte of the last word inserted.

## Example code 1

Run the code below and observe the results. Use gdb to debug.

``` assembly
section .text
        global _start

_start:
	mov eax,10
	push eax		;10 is saved in the stack
	mov eax,20
	pop eax			;10 is removed from the stack and saved in the eax

	mov eax,1
	int 0x80
```
Run the above code and use gdb to debug the code. Assume the filename is `example.asm`. Use `run.sh` script to run the code. [Click here to get the details of how to run the code](https://sdccd-edu.zoom.us/rec/share/Heesw_hE-h9W58AAEX5HiNeiK4EsemWVhI5Vo7bCgeaG_ZrgPhmz-fUk2-tOmvFS.KVW8wyIHQqL2A2dd?startTime=1678767400000)
```
gdb example
layout asm
layout regs
run _start
stepi
```

<h2>Concept Check</h2>

<h3>Q1. Procedures and CALL Instruction</h3>

<p>
Examine the following code:
</p>

<pre><code>
mov eax,10
mov ebx,20
call sum

sum:
    add eax,ebx
    ret
</code></pre>

<p>
What value will be stored in the EAX register after the procedure <code>sum</code> executes?
</p>

<details>
<summary>Show Answer</summary>

<p>
The procedure adds EAX (10) and EBX (20).
</p>

<p>
10 + 20 = 30
</p>

<p><strong>Answer:</strong> EAX will contain 30.</p>

</details>

<hr>

<h3>Q2. Understanding RET</h3>

<p>
What is the purpose of the <code>RET</code> instruction in a procedure?
</p>

<details>
<summary>Show Answer</summary>

<p>
The RET instruction returns program execution to the instruction immediately following the CALL instruction.
</p>

<p>
The return address is automatically stored on the stack when CALL is executed.
</p>

<p><strong>Answer:</strong> RET returns control back to the calling location.</p>

</details>

<hr>

<h3>Q3. PUSH and POP Operations</h3>

<p>
What value will be stored in EAX after the following code executes?
</p>

<pre><code>
mov eax,10
push eax
mov eax,20
pop eax
</code></pre>

<details>
<summary>Show Answer</summary>

<p>
The value 10 is pushed onto the stack.
</p>

<p>
EAX is then changed to 20.
</p>

<p>
The POP instruction removes 10 from the stack and places it back into EAX.
</p>

<p><strong>Answer:</strong> EAX will contain 10.</p>

</details>

<hr>

<h3>Q4. Stack Characteristics</h3>

<p>
Why is a stack called a LIFO (Last In, First Out) data structure?
</p>

<details>
<summary>Show Answer</summary>

<p>
The last item pushed onto the stack is the first item removed by a POP operation.
</p>

<p>
Example:
</p>

<pre><code>
push 10
push 20
pop eax
</code></pre>

<p>
The value 20 is removed first.
</p>

<p><strong>Answer:</strong> The most recently stored item is retrieved first.</p>

</details>

<hr>

<h3>Q5. Procedure Output Example</h3>

<p>
In Example Code 2, the value 65 is stored in memory and displayed using the <code>output</code> procedure.
What character appears on the screen?
</p>

<pre><code>
mov eax,65
mov [res],eax
mov ecx,res
call output
</code></pre>

<details>
<summary>Show Answer</summary>

<p>
ASCII value 65 corresponds to the capital letter A.
</p>

<p><strong>Answer:</strong> The character <strong>A</strong> is displayed.</p>

</details>