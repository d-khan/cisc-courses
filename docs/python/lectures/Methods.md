# Methods in detail

Let's summarize all the facts regarding the use of methods in Python classes.

As you already know, a **method is a function embedded inside a class**.

There is one fundamental requirement - a **method is obliged to have at least one parameter** (there are no such thing as parameterless methods - a method may be invoked without an argument, but not declared without parameters).

The first (or only) parameter is usually named `self`. We suggest that you follow the convention - it's commonly used, and you'll cause a few surprises by using other names for it.

The name self suggests the parameter's purpose - **it identifies the object for which the method is invoked**.

If you're going to invoke a method, you mustn't pass the argument for the `self` parameter - Python will set it for you.

The following example shows the difference.

```python
class Classy:
    def method(self):
        print("method")


obj = Classy()
obj.method()
```

The code outputs:

```
method
```

Note the way we've created the object - we've **treated the class name like a function**, returning a newly instantiated object of the class.

If you want the method to accept parameters other than `self`, you should:

- place them after `self` in the method's definition;
- deliver them during invocation without specifying `self` (as previously)

Just like here:

```python
class Classy:
    def method(self, par):
        print("method:", par)

obj = Classy()
obj.method(1)
obj.method(2)
obj.method(3)
```

The code outputs:

```python
method: 1
method: 2
method: 3
```

```python
class Classy:
    def method(self):
        print("method")

obj = Classy()
obj.method()
```

The `self` parameter is used **to obtain access to the object's instance and class variables**.

The example shows both ways of utilizing `self`:

```python
class Classy:
    varia = 2
    def method(self):
        print(self.varia, self.var)

obj = Classy()
obj.var = 3
obj.method()
```

The code outputs:

```
2 3
```

The `self` parameter is also used **to invoke other object/class methods from inside the class**.

Just like here:

```python
class Classy:
    def other(self):
        print("other")

    def method(self):
        print("method")
        self.other()


obj = Classy()
obj.method()

```

The code outputs:

```python
method
other
```

If you name a method like this: `__init__`, it won't be a regular method - it will be a **constructor**.

If a class has a constructor, it is invoked automatically and implicitly when the object of the class is instantiated.

The constructor:

- is **obliged to have the `self` parameter** (it's set automatically, as usual);
- **may (but doesn't need to) have more parameters** than just `self`; if this happens, the way in which the class name is used to create the object must reflect the `__init__` definition;
- **can be used to set up the object**, i.e., properly initialize its internal state, create instance variables, instantiate any other objects if their existence is needed, etc.

Look at the code below. The example shows a very simple constructor at work.

```python
class Classy:
    def __init__(self, value):
        self.var = value

obj_1 = Classy("object")

print(obj_1.var)
```

Run it. The code outputs:

```
object
```

Note that the constructor:

- **cannot return a value**, as it is designed to return a newly created object and nothing else;
- **cannot be invoked directly either from the object or from inside the class** (you can invoke a constructor from any of the object's subclasses, but we'll discuss this issue later.)

As `__init__` is a method, and a method is a function, you can do the same tricks with constructors/methods as you do with ordinary functions.

The example below shows how to define a constructor with a default argument value. Test it.

```python
class Classy:
    def __init__(self, value = None):
        self.var = value


obj_1 = Classy("object")
obj_2 = Classy()

print(obj_1.var)
print(obj_2.var)
```

The code outputs:

```python
object
None
```

Everything we've said about **property name mangling** applies to method names, too - a method whose name starts with `__` is (partially) hidden.

The example shows this effect:

```python
class Classy:
    def visible(self):
        print("visible")
    
    def __hidden(self):
        print("hidden")

obj = Classy()
obj.visible()

try:
    obj.__hidden()
except:
    print("failed")

obj._Classy__hidden()

```

The code outputs:

```python
visible
failed
hidden
```

# The inner life of classes and objects

Each Python class and each Python object is pre-equipped with a set of useful attributes which can be used to examine its capabilities.

You already know one of these - it's the `__dict__` property.

Let's observe how it deals with methods - look at the code in the given below.

Run it to see what it outputs. Check the output carefully.

Find all the defined methods and attributes. Locate the context in which they exist: inside the object or inside the class.

```python
class Classy:
    varia = 1
    def __init__(self):
        self.var = 2

    def method(self):
        pass

    def __hidden(self):
        pass

obj = Classy()

print(obj.__dict__)
print(Classy.__dict__)

```

`__dict__` is a dictionary. Another built-in property worth mentioning is `__name__`, which is a string.

The property contains **the name of the class**. It's nothing exciting, just a string.

Note: the `__name__` attribute is absent from the object - **it exists only inside classes**.

If you want to **find the class of a particular object**, you can use a function named `type()`, which is able (among other things) to find a class which has been used to instantiate any object.

Look at the code below, run it, and see for yourself.

```python
class Classy:
    pass

print(Classy.__name__)
obj = Classy()
print(type(obj).__name__)
```

The code outputs:

```
Classy
Classy
```

Note that a statement like this one:

```python
print(obj.__name__)
```

will cause an error.


```__module__``` is a string, too - it **stores the name of the module which contains the definition of the class**.

Let's check it - run the following code.

```python
class Classy:
    pass


print(Classy.__module__)
obj = Classy()
print(obj.__module__)
```

The code outputs:

```
__main__ __main__
```

As you know, any module named `__main__` is actually not a module, but the **file currently being run**.

`__bases__` is a tuple. The **tuple contains classes** (not class names) which are direct superclasses for the class.

The order is the same as that used inside the class definition.

We'll show you only a very basic example, as we want to highlight **how inheritance works**.

Moreover, we're going to show you how to use this attribute when we discuss the objective aspects of exceptions.

Note: **only classes have this attribute** - objects don't.

We've defined a function named `printbases()`, designed to present the tuple's contents clearly.

Look at the code below. Analyze it and run it. It will output:

```python
class SuperOne:
    pass


class SuperTwo:
    pass


class Sub(SuperOne, SuperTwo):
    pass


def printBases(cls):
    print('( ', end='')

    for x in cls.__bases__:
        print(x.__name__, end=' ')
    print(')')


printBases(SuperOne)
printBases(SuperTwo)
printBases(Sub)

```

```python
( object )
( object )
( SuperOne SuperTwo )
```

Note: **a class without explicit superclasses points to object** (a predefined Python class) as its direct ancestor.

# Investigating classes

What can you find out about classes in Python? The answer is simple – everything.

Both reflection and introspection enable a programmer to do anything with any object, no matter where it comes from.

Analyze the following code.

```python
class MyClass:        # line 1
    pass


obj = MyClass()        # line 5
obj.a = 1              # line 6
obj.b = 2              # line 7
obj.i = 3              # line 8
obj.ireal = 3.5        # line 9
obj.integer = 4        # line 10
obj.z = 5              # line 11


def incIntsI(obj):    # line 14
    for name in obj.__dict__.keys():    # line 15
        if name.startswith('i'):        # line 16
            val = getattr(obj, name)    # line 17
            if isinstance(val, int):    # line 18
                setattr(obj, name, val + 1) # line 19


print(obj.__dict__)
incIntsI(obj)
print(obj.__dict__)

```

The function named `incIntsI()` gets an object of any class, scans its contents in order to find all integer attributes with names starting with i, and increments them by one.

Impossible? Not at all!

This is how it works:

- line 1: define a very simple class...
- lines 5 through 11: ... and fill it with some attributes;
- line 14: this is our function!
- line 15: scan the `__dict__` attribute, looking for all attribute names;
- line 16: if a name starts with i...
- line 17: ... use the `getattr()` function to get its current value; note: `getattr()` takes two arguments: an object, and its property name (as a string), and returns the current attribute's value;
- line 18: check if the value is of type integer, and use the function `isinstance()` for this purpose (we'll discuss this later);
- line 19: if the check goes well, increment the property's value by making use of the `setattr()` function; the function takes three arguments: an object, the property name (as a string), and the property's new value.

The code outputs:


```python
{'a': 1, 'integer': 4, 'b': 2, 'i': 3, 'z': 5, 'ireal': 3.5}
{'a': 1, 'integer': 5, 'b': 2, 'i': 4, 'z': 5, 'ireal': 3.5}
```

# Key takeaways

1. A method is a function embedded inside a class. The first (or only) parameter of each method is usually named `self`, which is designed to identify the object for which the method is invoked in order to access the object's properties or invoke its methods.
2. If a class contains a **constructor** (a method named `__init__`) it cannot return any value and cannot be invoked directly.
3. All classes (but not objects) contain a property named `__name__`, which stores the name of the class. Additionally, a property named `__module__` stores the name of the module in which the class has been declared, while the property named `__bases__` is a tuple containing a class's superclasses.

For example:

```python
class Sample:
    def __init__(self):
        self.name = Sample.__name__
    def myself(self):
        print("My name is " + self.name + " living in a " + Sample.__module__)

obj = Sample()
obj.myself()
```

The code outputs:

```python
My name is Sample living in a __main__
```

**Exercise 1**

The declaration of the `Snake` class is given below. Enrich the class with a method named `increment()`, adding `1` to the `victims` property.

```python
class Snake:
    def __init__(self):
        self.victims = 0
```

Solution

```python
class Snake:
    def __init__(self):
        self.victims = 0

    def increment(self):
        self.victims += 1
```

**Exercise 2**

Redefine the `Snake` class constructor so that is has a parameter to initialize the `victims` field with a value passed to the object during construction.

Solution

```python
class Snake:
    def __init__(self, victims):
        self.victims = victims	
```

**Exercise 3**

Can you predict the output of the following code?

```python
class Snake:
    pass


class Python(Snake):
    pass


print(Python.__name__, 'is a', Snake.__name__)
print(Python.__bases__[0].__name__, 'can be a', Python.__name__)
```

```
Python is a Snake
Snake can be a Python
```

