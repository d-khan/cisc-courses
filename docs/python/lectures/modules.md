# How to make use of a module?

So what is a module? The [Python Tutorial](https://docs.python.org/3/tutorial/modules.html) defines it as **a file containing Python definitions and statements**, which can be later imported and used when necessary.

The handling of modules consists of two different issues:

![The User vs. Supplier concept](https://raw.githubusercontent.com/d-khan/python/refs/heads/main/modules/Screen%20Shot%202025-03-08%20at%207.54.02%20AM.png)

- the first (probably the most common) happens when you want to use an already existing module, written by someone else, or created by yourself during your work on some complex project - in this case you are the module's **user**;
- the second occurs when you want to create a brand new module, either for your own use, or to make other programmers' lives easier - you are the module's **supplier**.

Let's discuss them separately.

First of all, a module is identified by its **name**. If you want to use any module, you need to know the name. A (rather large) number of modules is delivered together with Python itself. You can think of them as a kind of "Python extra equipment".

All these modules, along with the built-in functions, form the **Python standard library** - a special sort of library where modules play the roles of books (we can even say that folders play the roles of shelves). If you want to take a look at the full list of all "volumes" collected in that library, you can find it here: https://docs.python.org/3/library/index.html.

Each module consists of entities (like a book consists of chapters). These entities can be functions, variables, constants, classes, and objects. If you know how to access a particular module, you can make use of any of the entities it stores.

![Accessing modules: math](https://raw.githubusercontent.com/d-khan/python/refs/heads/main/modules/Screen%20Shot%202025-03-08%20at%207.57.06%20AM.png)

Let's start the discussion with one of the most frequently used modules, named `math`. Its name speaks for itself - the module contains a rich collection of entities (not only functions) which enable a programmer to effectively implement calculations demanding the use of mathematical functions, like *sin()* or *log()*.

# Importing a module

To make a module usable, you must **import** it (think of it like of taking a book off the shelf). Importing a module is done by an instruction named `import`. Note: `import` is also a keyword (with all the consequences of this fact).

![The import keyword](https://raw.githubusercontent.com/d-khan/python/refs/heads/main/modules/Screen%20Shot%202025-03-08%20at%207.59.46%20AM.png)

Let's assume that you want to use two entities provided by the `math` module:

- a symbol (constant) representing a precise (as precise as possible using double floating-point arithmetic) value of π (although using a Greek letter to name a variable is fully possible in Python, the symbol is named **pi** - it's a more convenient solution, especially for that part of the world which neither has nor is going to use a Greek keyboard)
- a function named `sin()` (the computer equivalent of the mathematical *sine* function)

Both these entities are available through the `math` module, but the way in which you can use them strongly depends on how the import has been done.

The simplest way to import a particular module is to use the import instruction as follows:

```
import math
```

The clause contains:

- the `import` keyword;
- the **name of the module** which is subject to import.

The instruction may be located anywhere in your code, but it must be placed **before the first use of any of the module's entities**.

If you want to (or have to) import more than one module, you can do it by repeating the `import` clause (preferred):

```
import math

import sys
```

or by listing the modules after the `import` keyword, like here:

```
import math, sys
```

The instruction imports two modules, first the one named `math` and then the second named `sys`.

The modules' list may be arbitrarily long.

# Importing a module: continued

To continue, you need to become familiar with an important term: **namespace**. Don't worry, we won't go into great detail - this explanation is going to be as short as possible.

A **namespace** is a space (understood in a non-physical context) in which some names exist and the names don't conflict with each other (i.e., there are not two different objects of the same name). We can say that each social group is a namespace - the group tends to name each of its members in a unique way (e.g., parents won't give their children the same first names).

![The namespace concept](https://raw.githubusercontent.com/d-khan/python/refs/heads/main/modules/Screen%20Shot%202025-03-08%20at%208.01.17%20AM.png)

This uniqueness may be achieved in many ways, e.g., by using nicknames along with the first names (it will work inside a small group like a class in a school) or by assigning special identifiers to all members of the group (the US Social Security Number is a good example of such practice).

**Inside a certain namespace, each name must remain unique**. This may mean that some names may disappear when any other entity of an already known name enters the namespace. We'll show you how it works and how to control it, but first, let's return to imports.

If the module of a specified name **exists and is accessible** (a module is in fact a **Python source file**), Python imports its contents, i.e., **all the names defined in the module become known**, but they don't enter your code's namespace.

This means that you can have your own entities named `sin` or `pi` and they won't be affected by the import in any way.

<img src="https://raw.githubusercontent.com/d-khan/python/refs/heads/main/modules/Screen%20Shot%202025-03-08%20at%208.05.01%20AM.png" alt="The namespace concept: math and pi" style="zoom:50%;" />

At this point, you may be wondering how to access the `pi` coming from the `math` module.

To do this, you have to qualify the `pi` with the name of its original module.

# Importing a module: continued

Look at the snippet below, this is the way in which you qualify the names of `pi` and `sin` with the name of its originating module:

```
math.pi

math.sin
```

It's simple, you put:

- the **name of the module** (e.g., `math`)
- a **dot** (i.e., `.`)
- the **name of the entity** (e.g., `pi`)

Such a form clearly indicates the namespace in which the name exists.

Note: using this qualification is **compulsory** if a module has been imported by the `import` module instruction. It doesn't matter if any of the names from your code and from the module's namespace are in conflict or not.

This first example won't be very advanced - we just want to print the value of **sin(½π)**.

Look at the code in the editor. This is how we test it.

The code outputs the expected value: `1.0`.

Note: removing any of the two qualifications will make the code erroneous. There is no other way to enter `math`'s namespace if you did the following:

```
import math
```

# Importing a module: continued

Now we're going to show you how the two namespaces (yours and the module's one) can coexist.

Take a look at the example in the editor window.

We've defined our own `pi` and `sin` here.

Run the program. The code should produce the following output:

```
0.99999999 1.0
```

**output**

As you can see, the entities don't affect each other.

# Importing a module: continued

In the second method, the `import`'s syntax precisely points out which module's entity (or entities) are acceptable in the code:

```
from math import pi
```

The instruction consists of the following elements:

- the `from` keyword;
- the **name of the module** to be (selectively) imported;
- the `import` keyword;
- the **name or list of names of the entity/entities** which are being imported into the namespace.

The instruction has this effect:

- the listed entities (and only those ones) are **imported from the indicated module**;
- the names of the imported entities are **accessible without qualification**.

Note: no other entities are imported. Moreover, you cannot import additional entities using a qualification - a line like this one:

```
print(math.e)
```

will cause an error (`e` is Euler's number: 2.71828...)

Let's rewrite the previous script to incorporate the new technique.

Here it is:

```
from math import sin, pi

print(sin(pi/2))
```

The output should be the same as previously, as in fact we've used the same entities as before: `1.0`. Copy the code, paste it in the editor, and run the program.

Does the code look simpler? Maybe, but the look is not the only effect of this kind of import. Let's show you that.

# Importing a module: continued

Look at the code in the editor. Analyze it carefully:

- line 1: carry out the selective import;
- line 3: make use of the imported entities and get the expected result (`1.0`)
- lines 5 through 12: redefine the meaning of `pi` and `sin` - in effect, they supersede the original (imported) definitions within the code's namespace;
- line 15: get `0.99999999`, which confirms our conclusions.

Let's do another test. Look at the code below:

```
pi = 3.14

def sin(x):
    if 2 * x == pi:
        return 0.99999999
    else:
        return None

print(sin(pi / 2))

from math import sin, pi

print(sin(pi / 2))
```

Here, we've reversed the sequence of the code's operations:

- lines 1 through 8: define our own `pi` and `sin`;
- line 11: make use of them (`0.99999999` appears on the screen)
- line 13: carry out the import - the imported symbols **supersede their previous definitions within the namespace**;
- line 15: get `1.0` as a result.

# Importing a module: *

In the third method, the `import`'s syntax is a more aggressive form of the previously presented one:

```
from module import *
```

As you can see, the name of an entity (or the list of entities' names) is replaced with a single asterisk (`*`).

Such an instruction **imports all entities from the indicated module**.

Is it convenient? Yes, it is, as it relieves you of the duty of enumerating all the names you need.

Is it unsafe? Yes, it is - unless you know all the names provided by the module, **you may not be able to avoid name conflicts**. Treat this as a temporary solution, and try not to use it in regular code.

## Importing a module: the as keyword

If you use the import module variant and you don't like a particular module's name (e.g., it's the same as one of your already defined entities, so qualification becomes troublesome) you can give it any name you like - this is called **aliasing**.

Aliasing causes the module to be identified under a different name than the original. This may shorten the qualified names, too.

Creating an alias is done together with importing the module, and demands the following form of the import instruction:

```
import module as alias
```

The "module" identifies the original module's name while the "alias" is the name you wish to use instead of the original.

Note: `as` is a keyword.

# Importing a module: continued

If you need to change the word `math`, you can introduce your own name, just like in the example:

```
import math as m

print(m.sin(m.pi/2))
```

Note: after successful execution of an aliased import, the **original module name becomes inaccessible** and must not be used.

In turn, when you use the `from module import name` variant and you need to change the entity's name, you make an alias for the entity. This will cause the name to be replaced by the alias you choose.

This is how it can be done:

```
from module import name as alias
```

As previously, the original (unaliased) name becomes inaccessible.

The phrase `name as alias` can be repeated - use commas to separate the multiplied phrases, like this:

```
from module import n as a, m as b, o as c
```

The example may look a bit weird, but it works:

```
from math import pi as PI, sin as sine

print(sine(PI/2))
```

# Key takeaways

1. If you want to import a module as a whole, you can do it using the `import module_name` statement. You are allowed to import more than one module at once using a comma-separated list. For example:

```
import mod1

import mod2, mod3, mod4
```

although the latter form is not recommended due to stylistic reasons, and it's better and prettier to express the same intention in more a verbose and explicit form, such as:

```
import mod2

import mod3

import mod4
```

2. If a module is imported in the above manner and you want to access any of its entities, you need to prefix the entity's name using **dot notation**. For example:

```
import my_module

result = my_module.my_function(my_module.my_data)
```

The snippet makes use of two entities coming from the `my_module` module: a function named `my_function()` and a variable named `my_data`. Both names **must be prefixed by** `my_module.` None of the imported entity names conflicts with the identical names existing in your code's namespace.

3. You are allowed not only to import a module as a whole, but to import only individual entities from it. In this case, the imported entities **must not be** prefixed when used. For example:

```
from module import my_function, my_data

result = my_function(my_data)
```

The above way - despite its attractiveness - is not recommended because of the danger of causing conflicts with names derived from importing the code's namespace.

4. The most general form of the above statement allows you to import **all entities** offered by a module:

```
from my_module import *

result = my_function(my_data)
```

**Note**: this import's variant is not recommended due to the same reasons as previously (the threat of a naming conflict is even more dangerous here).

5. You can change the name of the imported entity "on the fly" by using the `as` phrase of the `import`. For example:

```
from module import my_function as fun, my_data as dat

result = fun(dat)
```

**Exercise 1**

You want to invoke the function `make_money()` contained in the module named `mint`. Your code begins with the following line:

```
import mint 
```

What is the proper form of the function's invocation?

**Answer:** ```mint.make_money()```

**Exercise 2**

You want to invoke the function `make_money()` contained in the module named `mint`. Your code begins with the following line:

```
from mint import make_money  
```

What is the proper form of the function's invocation?

**Answer: **```make_money()```

**Exercise 3**

You've written a function named `make_money` on your own. You need to import a function of the same name from the `mint` module and don't want to rename any of your previously defined names. Which variant of the `import` statement may help you with the issue?

**Answer:**

```python
# sample solution
from mint import make_money as make_more_money
```

**Exercise 4**

What form of the `make_money` function invocation is valid if your code starts with the following line?

```
from mint import * 
```

**Answer:** ```make_money()```

# Working with standard modules

Before we start going through some standard Python modules, we want to introduce the `dir()` function to you. It has nothing to do with the `dir` command you know from Windows and Unix consoles, as `dir()` doesn't show the contents of a disk directory/folder, but there is no denying that it does something really similar - it is able to reveal all the names provided through a particular module.

There is one condition: the module has to have been previously imported as a whole (i.e., using the `import module` instruction - `from module` is not enough).

The function returns an **alphabetically sorted list** containing all entities' names available in the module identified by a name passed to the function as an argument:

```
dir(module)
```

Note: if the module's name has been aliased, you must use the alias, not the original name.

Using the function inside a regular script doesn't make much sense, but it is still possible.

For example, you can run the following code to print the names of all entities within the `math` module:

```
import math



for name in dir(math):

    print(name, end="\t")
```

The example code should produce the following output:

```
__doc__	__loader__	__name__	__package__	__spec__	acos	acosh	asin	asinh	atan	atan2	atanh	ceil	copysign	cos	cosh	degrees	e	erf	erfc	exp	expm1	fabs	factorial	floor	fmod	frexp	fsum	gamma	hypot	isfinite	isinf	isnan	ldexp	lgamma	log	log10	log1p	log2	modf	pi	pow	radians	sin	sinh	sqrt	tan	tanh	trunc	
```

Have you noticed these strange names beginning with `__` at the top of the list? We'll tell you more about them when we talk about the issues related to writing your own modules.

Some of the names might bring back memories from math lessons, and you probably won't have any problems guessing their meanings.

Using the `dir()` function inside a code may not seem very useful - usually you want to know a particular module's contents before you write and run the code.

Fortunately, you can execute the function **directly in the Python console** (IDLE), without needing to write and run a separate script.

This is how it can be done:

```
import math

dir(math)
```

You should see something similar to this:

![Python console window - the math module contents](https://raw.githubusercontent.com/d-khan/python/refs/heads/main/modules/Screen%20Shot%202025-03-08%20at%208.14.47%20AM.png)

# Selected functions from the math module

Let's start with a quick preview of some of the functions provided by the `math` module.

We've chosen them arbitrarily, but that doesn't mean that the functions we haven't mentioned here are any less significant. Dive into the modules' depths yourself - we don't have the space or the time to talk about everything in detail here.

The first group of the `math`'s functions are connected with **trigonometry**:

- `sin(x)` → the sine of x;
- `cos(x)` → the cosine of x;
- `tan(x)` → the tangent of x.

All these functions take one argument (an angle measurement expressed in radians) and return the appropriate result (be careful with `tan()` - not all arguments are accepted).

Of course, there are also their inversed versions:

- `asin(x)` → the arcsine of x;
- `acos(x)` → the arccosine of x;
- `atan(x)` → the arctangent of x.

These functions take one argument (mind the domains) and return a measure of an angle in radians.

To effectively operate on angle measurements, the `math` module provides you with the following entities:

- `pi` → a constant with a value that is an approximation of π;
- `radians(x)` → a function that converts x from degrees to radians;
- `degrees(x)` → acting in the other direction (from radians to degrees)

Now look at the code in the editor. The example program isn't very sophisticated, but can you predict its results?

Apart from the circular functions (listed above) the `math` module also contains a set of their **hyperbolic analogues**:

- `sinh(x)` → the hyperbolic sine;
- `cosh(x)` → the hyperbolic cosine;
- `tanh(x)` → the hyperbolic tangent;
- `asinh(x)` → the hyperbolic arcsine;
- `acosh(x)` → the hyperbolic arccosine;
- `atanh(x)` → the hyperbolic arctangent.

```python
from math import pi, radians, degrees, sin, cos, tan, asin

ad = 90
ar = radians(ad)
ad = degrees(ar)

print(ad == 90.)
print(ar == pi / 2.)
print(sin(ar) / cos(ar) == tan(ar))
print(asin(sin(ar)) == ar)
```

# Selected functions from the math module: continued

Another group of the `math`'s functions is formed by functions which are connected with **exponentiation**:

- `e` → a constant with a value that is an approximation of Euler's number (e)
- `exp(x)` → finding the value of ex;
- `log(x)` → the natural logarithm of x
- `log(x, b)` → the logarithm of x to base b
- `log10(x)` → the decimal logarithm of x (more precise than `log(x, 10)`)
- `log2(x)` → the binary logarithm of x (more precise than `log(x, 2)`)

Note: the `pow()` function:

- `pow(x, y)` → finding the value of xy (mind the domains)

This is a built-in function, and doesn't have to be imported.

Look at the code in the editor. Can you predict its output?

```python
from math import e, exp, log

print(pow(e, 1) == exp(log(e)))
print(pow(2, 2) == exp(2 * log(2)))
print(log(e, e) == exp(0))
```

# Selected functions from the math module: continued

The last group consists of some general-purpose functions like:

- `ceil(x)` → the ceiling of x (the smallest integer greater than or equal to x)
- `floor(x)` → the floor of x (the largest integer less than or equal to x)
- `trunc(x)` → the value of x truncated to an integer (be careful - it's not an equivalent either of ceil or floor)
- `factorial(x)` → returns x! (x has to be an integral and not a negative)
- `hypot(x, y)` → returns the length of the hypotenuse of a right-angle triangle with the leg lengths equal to x and y (the same as `sqrt(pow(x, 2) + pow(y, 2))` but more precise)

Look at the code in the editor. Analyze the program carefully.

It demonstrates the fundamental differences between `ceil()`, `floor()` and `trunc()`.

Run the program and check its output.

```python
from math import ceil, floor, trunc

x = 1.4
y = 2.6

print(floor(x), floor(y))
print(floor(-x), floor(-y))
print(ceil(x), ceil(y))
print(ceil(-x), ceil(-y))
print(trunc(x), trunc(y))
print(trunc(-x), trunc(-y))

```

# Is there real randomness in computers?

Another module worth mentioning is the one named `random`.

It delivers some mechanisms allowing you to operate with **pseudorandom numbers**.

Note the prefix **pseudo** - the numbers generated by the modules may look random in the sense that you cannot predict their subsequent values, but don't forget that they all are calculated using very refined algorithms.

The algorithms aren't random - they are deterministic and predictable. Only those physical processes which run completely out of our control (like the intensity of cosmic radiation) may be used as a source of actual random data. Data produced by deterministic computers cannot be random in any way.

A random number generator takes a value called a **seed**, treats it as an input value, calculates a "random" number based on it (the method depends on a chosen algorithm) and produces a **new seed value**.

The length of a cycle in which all seed values are unique may be very long, but it isn't infinite - sooner or later the seed values will start repeating, and the generating values will repeat, too. This is normal. It's a feature, not a mistake, or a bug.

The initial seed value, set during the program start, determines the order in which the generated values will appear.

The random factor of the process may be **augmented by setting the seed with a number taken from the current time** - this may ensure that each program launch will start from a different seed value (ergo, it will use different random numbers).

Fortunately, such an initialization is done by Python during module import.

# Selected functions from the random module

**The random function**

The most general function named `random()` (not to be confused with the module's name) **produces a float number `x` coming from the range `(0.0, 1.0)`** - in other words: (0.0 <= x < 1.0).

The example program below will produce five pseudorandom values - as their values are determined by the current (rather unpredictable) seed value, you can't guess them:

``

```
from random import random 
 
for i in range(5): 
    print(random()) 
 
```

``

Run the program. This is what we've got:

```
0.9535768927411208 0.5312710096244534 0.8737691983477731 0.5896799172452125 0.02116716297022092
```

**The seed function**

The `seed()` function is able to directly **set the generator's seed**. We'll show you two of its variants:

- `seed()` - sets the seed with the current time;
- `seed(int_value)` - sets the seed with the integer value `int_value`.

We've modified the previous program - in effect, we've removed any trace of randomness from the code:

```
from random import random, seed

seed(0)

for i in range(5):

    print(random())
```

Due to the fact that the seed is always set with the same value, the sequence of generated values always looks the same.

Run the program. This is what we've got:

```
0.844421851525 0.75795440294 0.420571580831 0.258916750293 0.511274721369
```

And you?

Note: your values may be slightly different than ours if your system uses more precise or less precise floating-point arithmetic, but the difference will be seen quite far from the decimal point.

# Selected functions from the random module: continued

**The randrange and randint functions**

If you want integer random values, one of the following functions would fit better:

- `randrange(end)`
- `randrange(beg, end)`
- `randrange(beg, end, step)`
- `randint(left, right)`

The first three invocations will generate an integer taken (pseudorandomly) from the range (respectively):

- `range(end)`
- `range(beg, end)`
- `range(beg, end, step)`

Note the implicit **right-sided exclusion**!

The last function is an equivalent of `randrange(left, right+1)` - it generates the integer value `i`, which falls in the range [left, right] (no exclusion on the right side).

Look at the code in the editor. This sample program will consequently output a line consisting of three zeros and either a zero or one at the fourth place.

```python
from random import randrange, randint

print(randrange(1), end=' ')
print(randrange(0, 1), end=' ')
print(randrange(0, 1, 1), end=' ')
print(randint(0, 1))
```

# Selected functions from the random module: continued

The previous functions have one important disadvantage - they may produce repeating values even if the number of subsequent invocations is not greater than the width of the specified range.

Look at the code below - the program very likely outputs a set of numbers in which some elements are not unique:

``

```
from random import randint 
 
for i in range(10): 
    print(randint(1, 10), end=',') 
 
```

``



This is what we got in one of the launches:

```
9,4,5,4,5,8,9,4,8,4,
```

**sample output**

**The choice and sample functions**

As you can see, this is not a good tool for generating numbers in a lottery. Fortunately, there is a better solution than writing your own code to check the uniqueness of the "drawn" numbers.

It's a function named in a very suggestive way - `choice`:

- `choice(sequence)`
- `sample(sequence, elements_to_choose)`

The first variant chooses a "random" element from the input sequence and returns it.

The second one builds a list (a sample) consisting of the `elements_to_choose` element "drawn" from the input sequence.

In other words, the function chooses some of the input elements, returning a list with the choice. The elements in the sample are placed in random order. Note: the `elements_to_choose` must not be greater than the length of the input sequence.

Look at the code below:

```
from random import choice, sample

my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

print(choice(my_list))

print(sample(my_list, 5))

print(sample(my_list, 10))
```

Again, the output of the program is not predictable. Our results looked like this:

```
4 [3, 1, 8, 9, 10] [10, 8, 5, 1, 6, 4, 3, 9, 7, 2]
```

Sometimes, it may be necessary to find out information unrelated to Python. For example, you may need to know the location of your program within the greater environment of the computer.

Imagine your program's environment as a pyramid consisting of a number of layers or platforms.

![Program's environment layers](https://raw.githubusercontent.com/d-khan/python/refs/heads/main/modules/Screen%20Shot%202025-03-08%20at%208.21.10%20AM.png)

The layers are:

- your (running) code is located at the top of it;
- Python, or more precisely, its runtime environment, lies directly below it;
- the next layer of the pyramid is filled with the OS (operating system) – Python's environment provides some of its functionalities using the operating system's services; Python, although very powerful, isn't omnipotent – it's forced to use many helpers if it's going to process files or communicate with physical devices;
- the bottom-most layer is hardware – the processor (or processors), network interfaces, human interface devices (mouse, keyboards, etc.) and all other machinery needed to make the computer run; the OS knows how to drive it, and uses lots of tricks to conduct all parts in a consistent rhythm.

- **your code** wants to create a file, so it invokes one of Python's functions;
- **Python** accepts the order, rearranges it to meet local OS requirements, which is like putting the stamp "approved" on your request, and sends it down (this may remind you of a chain of command)
- the **OS** checks if the request is reasonable and valid (e.g., whether the file name conforms to some syntax rules) and tries to create the file; such an operation, seemingly very simple, isn't atomic – it consists of many minor steps taken by...
- the **hardware**, which is responsible for activating storage devices (hard disk, solid state devices, etc.) to satisfy the OS's needs.

Usually, you're not aware of all that fuss – you want the file to be created and that's that.

But sometimes you want to know more – for example, the name of the OS which hosts Python, and some characteristics describing the hardware that hosts the OS.

There is a module providing some means to allow you to know where you are and what components work for you. The module is named **platform**. We'll show you some of the functions it provides to you.

# Selected functions from the platform module

**The platform function**

The `platform` module lets you access the underlying platform's data, i.e., hardware, operating system, and interpreter version information.

There is a function that can show you all the underlying layers in one glance, named `platform`, too. It just returns a string describing the environment; thus, its output is rather addressed to humans than to automated processing (you'll see it soon).

This is how you can invoke it:

``

```
platform(aliased = False, terse = False) 
 
```



And now:

- `aliased` → when set to `True` (or any non-zero value) it may cause the function to present the alternative underlying layer names instead of the common ones;
- `terse` → when set to `True` (or any non-zero value) it may convince the function to present a briefer form of the result (if possible)

We ran our sample program using three different platforms - this is what we got:

**Intel x86 + Windows ® Vista (32 bit)**:

```
Windows-Vista-6.0.6002-SP2 Windows-Vista-6.0.6002-SP2 Windows-Vista
```



**Intel x86 + Gentoo Linux (64 bit)**:

```
Linux-3.18.62-g6-x86_64-Intel-R-_Core-TM-_i3-2330M_CPU_@_2.20GHz-with-gentoo-2.3 Linux-3.18.62-g6-x86_64-Intel-R-_Core-TM-_i3-2330M_CPU_@_2.20GHz-with-gentoo-2.3 Linux-3.18.62-g6-x86_64-Intel-R-_Core-TM-_i3-2330M_CPU_@_2.20GHz-with-glibc2.3.4
```



**Raspberry PI2 + Raspbian Linux (32 bit)**:

```
Linux-4.4.0-1-rpi2-armv7l-with-debian-9.0 Linux-4.4.0-1-rpi2-armv7l-with-debian-9.0 Linux-4.4.0-1-rpi2-armv7l-with-glibc2.9
```

You can also run the sample program in IDLE on your local machine to check what output you will have.

```python
from platform import platform

print(platform())
print(platform(1))
print(platform(0, 1))
```

# Selected functions from the platform module: continued

**The machine function**

Sometimes, you may just want to know the generic name of the processor which runs your OS together with Python and your code - a function named `machine()` will tell you that. As previously, the function returns a string.

Again, we ran the sample program on three different platforms:

**Intel x86 + Windows ® Vista (32 bit)**:

```
x86
```

****

**Intel x86 + Gentoo Linux (64 bit)**:

```
x86_64
```



**Raspberry PI2 + Raspbian Linux (32 bit)**:

```
armv7l
```

```python
from platform import machine

print(machine())
```

# Selected functions from the platform module: continued

**The processor function**

The `processor()` function returns a string filled with the real processor name (if possible).

Once again, we ran the sample program on three different platforms:

**Intel x86 + Windows ® Vista (32 bit)**:

```
x86
```

**Intel x86 + Gentoo Linux (64 bit)**:

```
Intel(R) Core(TM) i3-2330M CPU @ 2.20GHz
```

**Raspberry PI2 + Raspbian Linux (32 bit)**:

```
armv7l
```

Test this on your local machine.

```python
from platform import processor

print(processor())
```

# Selected functions from the platform module: continued

**The system function**

A function named `system()` returns the generic OS name as a string.

```python
from platform import system

print(system())
```



Our example platforms presented themselves like this:

**Intel x86 + Windows ® Vista (32 bit)**:

```
Windows
```

**Intel x86 + Gentoo Linux (64 bit)**:

```
Linux
```

**Raspberry PI2 + Raspbian Linux (32 bit)**:

```
Linux
```

# Selected functions from the platform module: continued

**The version function**

The OS version is provided as a string by the `version()` function.

```python
from platform import version

print(version())

```



Run the code and check its output. This is what we got:

**Intel x86 + Windows ® Vista (32 bit)**:

```
6.0.6002
```

**Intel x86 + Gentoo Linux (64 bit)**:

```
#1 SMP PREEMPT Fri Jul 21 22:44:37 CEST 2017
```

**Raspberry PI2 + Raspbian Linux (32 bit)**:

```
#1 SMP Debian 4.4.6-1+rpi14 (2016-05-05)
```

# Selected functions from the platform module: continued

**The python_implementation and the python_version_tuple functions**

If you need to know what version of Python is running your code, you can check it using a number of dedicated functions - here are two of them:

- `python_implementation()` → returns a string denoting the Python implementation (expect `CPython` here, unless you decide to use any non-canonical Python branch)

- 

- ```
  python_version_tuple()
  ```

    returns a three-element tuple filled with:

  - the **major** part of Python's version;
  - the **minor** part;
  - the **patch** level number.

Our example program produced the following output:

```
CPython 3 7 7
```

**sample output**

It's very likely that your version of Python will be different.

```python
from platform import python_implementation, python_version_tuple

print(python_implementation())

for atr in python_version_tuple():
    print(atr)
```

# Python Module Index

We have only covered the basics of Python modules here. Python's modules make up their own universe, in which Python itself is only a galaxy, and we would venture to say that exploring the depths of these modules can take significantly more time than getting acquainted with "pure" Python.

Moreover, the Python community all over the world creates and maintains hundreds of additional modules used in very niche applications like genetics, psychology, or even astrology.

These modules aren't (and won't be) distributed along with Python, or through official channels, which makes the Python universe broader - almost infinite.

You can read about all standard Python modules here: https://docs.python.org/3/py-modindex.html.

Don't worry - you won't need all these modules. Many of them are very specific.

All you need to do is find the modules you want, and teach yourself how to use them. It's easy.

# Key takeaways

1. A function named `dir()` can show you a list of the entities contained inside an imported module. For example:

```
import os

dir(os)
```

prints out the list of all the `os` module's facilities you can use in your code.

2. The `math` module couples more than 50 symbols (functions and constants) that perform mathematical operations (like `sine()`, `pow()`, `factorial()`) or providing important values (like **π** and the Euler symbol **e**).
3. The `random` module groups more than 60 entities designed to help you use pseudo-random numbers. Don't forget the prefix "random", as there is no such thing as a real random number when it comes to generating them using the computer's algorithms.
4. The `platform` module contains about 70 functions which let you dive into the underlaying layers of the OS and hardware. Using them allows you to get to know more about the environment in which your code is executed.
5. **Python Module Index** (https://docs.python.org/3/py-modindex.html is a community-driven directory of modules available in the Python universe. If you want to find a module fitting your needs, start your search there.

**Exercise 1**

What is the expected value of the `result` variable after the following code is executed?

```
import math result = math.e == math.exp(1) 
```

**Answer: True**

**Exercise 2**

(Complete the sentence) Setting the generator's seed with the same value each time your program is run guarantees that...

**Answer:**.. the pseudo-random values emitted from the `random` module will be exactly the same.

**Exercise 3**

Which of the `platform` module's functions will you use to determine the name of the CPU running inside your computer?

**Answer:**The `processor()` function

**Exercise 4**

What is the expected output of the following snippet?

```
import platform print(len(platform.python_version_tuple())) 
```

**Answer:** 3
