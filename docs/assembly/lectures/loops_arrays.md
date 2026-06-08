# Loops

Previously I wrote a code that generates a number from 0 to 9. The code uses several instructions to perform the task.

```assembly
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

Now I am going to write the same above command but this time using less number of instructions.

## Example code - counter (optimized version)

The ECX is a counter register, and when the loop instruction is executed, the ECX register is decremented, and the control jumps to the target label until the ECX register value, i.e., the counter reaches the value zero. The ECX register decrements by itself, and you don't have to decrement it. The line 7, "inc eac" increments the EAX register to check whether the code inside the label block is working.

```assembly
section .text
        global _start

_start:
        mov ecx,10	;ecx is a counter register
        label:
        loop label

        mov eax,1
        int 0x80
```

# Arrays

The arrays use consecutive memory space with the same data type. The arrays can be declared as:

__number DD 1,2,3,4,5,6__

The number array has 6 elements, each 4 bytes long. Each element in the array has an address that holds the element's content. Lets explore this further using the example code.

## Example code - adding arrays

```assembly
section .text
        global _start

_start:
        mov eax,3       ;array length (0-2)
        mov ebx,0       ;initializing  ebx 0
        mov ecx,array   ;move array's address from the memory to the register
        								;the array address is equal to the address of 
        								;the first element

top:
        add ebx,[ecx]   ;add content of the array's first element with the ebx
        add ecx,4       ;fetch the next element in the array which is 4 bytes away
        dec eax         ;eax will work as a counter which is equal to the 
                        ;array length
        jnz top         ;jump not zero to the label top

        mov eax,1       
        int 0x80

section .data
        array dd 5,10,15        ;size double data 4 bytes
```

<img width="883" alt="image" src="https://user-images.githubusercontent.com/11669149/226088015-01ea0938-0dd8-4653-ba1e-99a2bfdc13df.png">

The above figure shows the debugging information of the 'counting arrays' code. The arrays are defined with three elements (5,10,15). The memory address of the variable `array` in the code is the same as the memory address of the first element (0x804a000). The second element is 4 bytes away, because the size of each element is declared as DD (define double - 4 bytes). The data in the register is saved in hexadecimal format. Declaring an array means getting consecutive space in the memory. The array is originally declared in the memory.


<h2>Concept Check</h2>

<h3>Question 1</h3>

<p><strong>What is the purpose of the ECX register when using the <code>LOOP</code> instruction?</strong></p>

<details>
<summary>Show Answer</summary>

<p>
The ECX register acts as a counter. Each time the <code>LOOP</code> instruction executes,
ECX is automatically decremented by 1. If ECX is not zero, execution jumps back to the target label.
</p>

<p><strong>Answer:</strong> ECX serves as the loop counter and is automatically decremented by the LOOP instruction.</p>

</details>

<hr>

<h3>Question 2</h3>

<p>How many times will the following loop execute?</p>

<pre><code>mov ecx,5

label:
    loop label
</code></pre>

<details>
<summary>Show Answer</summary>

<p>
The LOOP instruction decrements ECX each iteration:
</p>

<pre><code>
5 → 4 → 3 → 2 → 1 → 0
</code></pre>

<p>
When ECX becomes 0, the loop terminates.
</p>

<p><strong>Answer:</strong> The loop executes 5 times.</p>

</details>

<hr>

<h3>Question 3</h3>

<p>
Given the declaration below, how many bytes are occupied by the array?
</p>

<pre><code>array dd 5,10,15</code></pre>

<details>
<summary>Show Answer</summary>

<p>
Each <code>DD</code> (Define Doubleword) occupies 4 bytes.
</p>

<p>
There are 3 elements:
</p>

<pre><code>
3 × 4 = 12 bytes
</code></pre>

<p><strong>Answer:</strong> The array occupies 12 bytes.</p>

</details>

<hr>

<h3>Question 4</h3>

<p>
Assume the array starts at memory address <code>0x804A000</code>.
What is the address of the third element in the following array?
</p>

<pre><code>array dd 5,10,15</code></pre>

<details>
<summary>Show Answer</summary>

<p>
Each element occupies 4 bytes.
</p>

<pre><code>
Element 1 → 0x804A000
Element 2 → 0x804A004
Element 3 → 0x804A008
</code></pre>

<p><strong>Answer:</strong> The third element is located at address <code>0x804A008</code>.</p>

</details>

<hr>

<h3>Question 5</h3>

<p>
What value will be stored in <code>EBX</code> after the following code executes?
</p>

<pre><code>array dd 5,10,15

mov eax,3
mov ebx,0
mov ecx,array

top:
    add ebx,[ecx]
    add ecx,4
    dec eax
    jnz top
</code></pre>

<details>
<summary>Show Answer</summary>

<p>
The loop adds all three array elements:
</p>

<pre><code>
EBX = 0 + 5 = 5
EBX = 5 + 10 = 15
EBX = 15 + 15 = 30
</code></pre>

<p>
After three iterations, EAX becomes zero and the loop stops.
</p>

<p><strong>Answer:</strong> EBX = 30</p>

</details>