# Conditions Instructions

Conditional execution in assembly language is accomplished by several looping and branching instructions. These instructions can change the flow of control in a program. Conditional execution is observed in two scenarios

**Unconditional jump**

This is performed by the JMP instruction. Conditional execution often involves transferring control to the address of an instruction that does not follow the currently executing instruction. Transfer of control may be forward to execute a new set of instructions or backward to re-execute the same steps.

**Conditional jump**

This is performed by a set of jump instructions j<condition> depending upon the condition. The conditional instructions transfer the control by breaking the sequential flow, and they do it by changing the offset value in IP.

## CMP Instruction

CMP compares two numeric data fields. The destination operand could be either in register or in memory. The source operand could be a constant (immediate) data, register or memory.

### Example code

The following code compares two registers, jumps, and runs the instructions under the equal block.  The character 'y' is moved to the ECX register and then to the result variable in the memory. Run and debug the following code.

```assembly
section .text
        global _start

_start:
        mov eax,10
        mov ebx,10
        cmp eax,ebx
        je equal 		;jump when equal and run the equal block
        jmp exit		;unconditional jump

equal:
        mov ecx,'y'
        mov [result],ecx
        jmp exit

exit:
        mov eax,1
        int 0x80

segment .bss
        result resb 1
```

### Debug parameters

After successfully compiling and running the code, use gdb to debug the code.

```
layout asm
layout regs
watch (char) result
b _start
r
stepi
```

## Conditional jumps

| Instruction |             Description             | Flags tested |
| :---------: | :---------------------------------: | :----------: |
|    JE/JZ    |       Jump Equal or Jump Zero       |      ZF      |
|   JNE/JNZ   |   Jump not Equal or Jump Not Zero   |      ZF      |
|   JG/JNLE   | Jump Greater or Jump Not Less/Equal |  OF, SF, ZF  |
|   JGE/JNL   | Jump Greater/Equal or Jump Not Less |    OF, SF    |
|   JL/JNGE   | Jump Less or Jump Not Greater/Equal |    OF, SF    |
|   JLE/JNG   | Jump Less/Equal or Jump Not Greater |  OF, SF, ZF  |
|    JE/JZ    |       Jump Equal or Jump Zero       |      ZF      |
|   JNE/JNZ   |   Jump not Equal or Jump Not Zero   |      ZF      |
|   JA/JNBE   | Jump Above or Jump Not Below/Equal  |    CF, ZF    |
|   JAE/JNB   | Jump Above/Equal or Jump Not Below  |      CF      |
|   JB/JNAE   | Jump Below or Jump Not Above/Equal  |      CF      |
|   JBE/JNA   | Jump Below/Equal or Jump Not Above  |    AF, CF    |
|    JXCZ     |         Jump if CX is Zero          |     none     |
|     JC      |            Jump If Carry            |      CF      |
|     JNC     |          Jump If No Carry           |      CF      |
|     JO      |          Jump If Overflow           |      OF      |
|     JNO     |         Jump If No Overflow         |      OF      |
|   JP/JPE    |   Jump Parity or Jump Parity Even   |      PF      |
|   JNP/JPO   |  Jump No Parity or Jump Parity Odd  |      PF      |
|     JS      |     Jump Sign (negative value)      |      SF      |
|     JNS     |    Jump No Sign (positive value)    |      SF      |
|             |                                     |              |

### Example code - counter

The following code generates a counter 0 to 9. Use gdb to debug the code.

``` assembly
section .text
        global _start

_start:
        mov eax,0       ; reset eax to 0
label:
        inc eax
        cmp eax,10
        jl label        ;jump if less

        mov eax,1
        int 0x80
```

### Generate integer numbers using a condition instruction and print the corresponding ASCII character on the screen (from 0 - 127)
```assembly
section .text
        global _start

_start:
        mov eax, 0        ;starting from 0

increase:
        mov [tmp], eax
        push eax        ;push eax value

        mov eax, 4
        mov ebx, 1
        mov ecx, tmp
        mov edx, 1
        int 0x80

        ;the following code add extra line
        mov eax, 4
        mov ebx, 1
        mov ecx, space
        mov edx, 1
        int 0x80

        pop eax        ;restore eax value
        inc eax
        cmp eax, 127        ;end number
        jl increase

        mov eax, 1
        int 0x80

segment .bss
        tmp resb 1

section .data
        space dd 10        ;in ASCII, the new line is decimal 10
```


### Example code - largest number

The following code finds the largest number.

```assemly
section .text
        global _start

_start:
        mov eax,[num1]
        cmp eax,[num2]  ; compare the first operand with the second operand
        jg label1
        mov eax,[num2]
        jmp label1

label1:
        cmp eax,[num3]
        jg exit
        mov eax,[num3]

exit:
        mov [largest],eax
        mov eax,1
        int 0x80

section .data
        num1 dd 30
        num2 dd 20
        num3 dd 10

segment .bss
        largest resb 2
```

## Concept Check Questions

### Question 1
What is the primary difference between an unconditional jump (`JMP`) and a conditional jump (`JE`, `JL`, `JG`, etc.)?

<details>
<summary>Show Answer</summary>

An unconditional jump (`JMP`) always transfers program control to the specified label regardless of any condition.

A conditional jump transfers control only if a specific condition based on processor flags is true.

`JMP` always jumps, while conditional jumps only occur when their condition is satisfied.

</details>

---

### Question 2
Given the following code:

```assembly
mov eax,15
mov ebx,15
cmp eax,ebx
je equal
```

Will execution jump to the label `equal`? Why?

<details>
<summary>Show Answer</summary>

The `CMP` instruction compares the values in `EAX` and `EBX`.

Since both registers contain 15, the comparison result is zero and the Zero Flag (ZF) is set.

The `JE` instruction jumps when ZF = 1.

<br>
<b>Answer:</b> Yes. The jump occurs because the values are equal and the Zero Flag is set.

</details>

---

### Question 3
What is the final value of `EAX` after the following code executes?

```assembly
mov eax,0

label:
    inc eax
    cmp eax,10
    jl label
```

<details>
<summary>Show Answer</summary>

The loop continues while `EAX < 10`.

Values of EAX:

```text
1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

When EAX becomes 10, the condition `EAX < 10` is false.

<br>
<b>Answer:</b> EAX = 10

</details>

---

### Question 4
Which conditional jump instruction should be used to execute a block of code only when two values are not equal?

A. JE  
B. JG  
C. JNE  
D. JL

<details>
<summary>Show Answer</summary>

`JNE` stands for Jump if Not Equal.

It executes when the Zero Flag is clear (ZF = 0).
<br>
<b>Answer:</b> C. JNE

</details>

---

### Question 5
What is the purpose of the `CMP` instruction?

<details>
<summary>Show Answer</summary>

The `CMP` instruction subtracts the source operand from the destination operand without storing the result.

It updates processor flags such as:

- Zero Flag (ZF)
- Carry Flag (CF)
- Sign Flag (SF)
- Overflow Flag (OF)

These flags are then used by conditional jump instructions.

<br>
<b>Answer:</b> It compares two operands and updates processor flags for conditional branching.

</details>

---

### Question 6
Consider the following code:

```assembly
mov eax,25
mov ebx,15

cmp eax,ebx
jg larger
```

Will execution jump to the label `larger`? Explain which flags are involved.

<details>
<summary>Show Answer</summary>

The comparison evaluates:

```text
25 > 15
```

For signed numbers, `JG` checks:

- ZF = 0
- SF = OF

Since 25 is greater than 15, the condition is true.

<br>
<b>Answer:</b> Yes. Execution jumps to `larger` because 25 is greater than 15.

</details>

---

### Question 7
Why does the ASCII-printing example use both `push eax` and `pop eax`?

```assembly
push eax
...
int 0x80
...
pop eax
```

<details>
<summary>Show Answer</summary>

The loop counter is stored in `EAX`.

Before the system call, `EAX` must contain the syscall number (`4` for `sys_write`).

`push eax` saves the current counter value on the stack.

`pop eax` restores the counter value after the system call.

<br>
<b>Answer:</b> To preserve the loop counter while using EAX for system calls.

</details>

---

### Question 8
Using the "largest number" example, determine the value stored in `largest`.

```assembly
num1 dd 12
num2 dd 45
num3 dd 30
```

<details>
<summary>Show Answer</summary>

Step 1:

```text
12 compared with 45
```

Since 12 is not greater than 45:

```assembly
mov eax,[num2]
```

EAX becomes 45.

Step 2:

```text
45 compared with 30
```

Since 45 is greater than 30, execution jumps to `exit`.

The value stored in `largest` is:

```text
45
```
<br>
<b>Answer:</b> largest = 45

</details>

---

### Question 9
What is the difference between signed conditional jumps (`JG`, `JL`, `JGE`, `JLE`) and unsigned conditional jumps (`JA`, `JB`, `JAE`, `JBE`)?

<details>
<summary>Show Answer</summary>

Signed jumps interpret values as signed integers and use:

- Sign Flag (SF)
- Overflow Flag (OF)
- Zero Flag (ZF)

Unsigned jumps interpret values as unsigned integers and use:

- Carry Flag (CF)
- Zero Flag (ZF)

For example:

```text
11111111₂
```

represents:

- -1 (signed)
- 255 (unsigned)

The same bit pattern may produce different jump results depending on whether signed or unsigned comparisons are used.

<br>
<b>Answer:</b> Signed jumps use SF and OF to compare signed numbers, while unsigned jumps use CF to compare unsigned numbers.

</details>