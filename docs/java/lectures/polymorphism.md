# Polymorphism in Java

## Learning Objectives

By the end of this lecture, you should be able to:

-   Explain what **polymorphism** means in Java.
-   Explain **why polymorphism is useful** in object-oriented
    programming.
-   Understand the relationship between inheritance, method overriding,
    and polymorphism.
-   Distinguish between a **reference type** and an **object type**.
-   Use a superclass reference to refer to subclass objects.
-   Understand how Java determines which overridden method executes.
-   Use polymorphism with arrays and `ArrayList`.
-   Understand **upcasting** and **downcasting**.
-   Use polymorphism with abstract classes and interfaces.

------------------------------------------------------------------------

# 1. What is Polymorphism?

Polymorphism is one of the fundamental concepts of **Object-Oriented
Programming (OOP)**.

The word **polymorphism** comes from:

-   **Poly** → many
-   **Morph** → forms

Therefore, polymorphism means:

> **Many forms**

In Java, polymorphism allows a common reference type or method call to
work with objects that may have different behaviors.

Consider different animals:

``` text
Animal
  |
  +-- Dog
  |
  +-- Cat
  |
  +-- Cow
```

All of these are animals, and all of them can make a sound. However,
they do not make the same sound:

``` text
Dog  -> Bark
Cat  -> Meow
Cow  -> Moo
```

With polymorphism, we can write:

``` java
animal.makeSound();
```

The same statement can produce different results depending on the actual
object referenced by `animal`.

------------------------------------------------------------------------

# 2. Why Do We Use Polymorphism?

Before looking at the Java syntax, it is important to understand **why
we need polymorphism**.

Suppose we are developing a program containing different types of
employees:

``` text
Employee
   |
   +-- Programmer
   |
   +-- Manager
   |
   +-- Designer
```

Each employee performs work differently. A programmer may write code, a
manager may manage a team, and a designer may create user interfaces.

Without polymorphism, we might create separate code for every type:

``` java
Programmer programmer = new Programmer();
Manager manager = new Manager();
Designer designer = new Designer();

programmer.work();
manager.work();
designer.work();
```

For a small program, this may seem reasonable. But as more employee
types are added, our program becomes increasingly dependent on specific
classes.

Polymorphism allows us to treat all of these objects as `Employee`:

``` java
Employee employee1 = new Programmer();
Employee employee2 = new Manager();
Employee employee3 = new Designer();
```

Now we can use the same operation:

``` java
employee1.work();
employee2.work();
employee3.work();
```

Each object performs `work()` differently.

> **Polymorphism allows us to work with objects through a common type
> while allowing each object to provide its own behavior.**

## Benefits of Polymorphism

Polymorphism helps us:

-   reduce repetitive code,
-   avoid large type-checking `if` and `switch` statements,
-   process different objects through a common type,
-   create flexible arrays and collections,
-   add new subclasses with fewer changes to existing code,
-   reduce dependencies on specific implementations,
-   build software that is easier to maintain and extend.

------------------------------------------------------------------------

# 3. Polymorphism Requires a Common Relationship

Consider:

``` java
class Animal {

    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
}
```

Create subclasses:

``` java
class Dog extends Animal {

    @Override
    public void makeSound() {
        System.out.println("Dog barks");
    }
}
```

``` java
class Cat extends Animal {

    @Override
    public void makeSound() {
        System.out.println("Cat meows");
    }
}
```

The inheritance relationship is:

``` text
       Animal
       /    \
     Dog    Cat
```

Both `Dog` and `Cat` are types of `Animal`. This allows:

``` java
Animal animal1 = new Dog();
Animal animal2 = new Cat();
```

------------------------------------------------------------------------

# 4. Method Overriding

Method overriding occurs when a subclass provides its own implementation
of a method inherited from its superclass.

``` java
class Animal {

    public void makeSound() {
        System.out.println("Animal sound");
    }
}
```

``` java
class Dog extends Animal {

    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}
```

The `Dog` class replaces the inherited behavior of `makeSound()` with
its own behavior.

The `@Override` annotation tells Java that we intend to override an
inherited method. You should normally use it because the compiler can
detect mistakes.

------------------------------------------------------------------------

# 5. The Basic Idea of Polymorphism

Normally:

``` java
Dog dog = new Dog();
Cat cat = new Cat();

dog.makeSound();
cat.makeSound();
```

Java also allows:

``` java
Animal animal1 = new Dog();
Animal animal2 = new Cat();

animal1.makeSound();
animal2.makeSound();
```

Output:

``` text
Dog barks
Cat meows
```

Even though both variables have the reference type `Animal`, Java
executes the overridden method belonging to the actual object.

This is **runtime polymorphism**.

------------------------------------------------------------------------

# 6. Reference Type vs. Object Type

Consider:

``` java
Animal animal = new Dog();
```

The **reference type** is:

``` java
Animal
```

The **actual object type** is:

``` java
Dog
```

Visualized:

``` text
Reference Type          Object Type

   Animal      ------->     Dog
```

A precise description is:

> `animal` is an `Animal` reference that refers to a `Dog` object.

------------------------------------------------------------------------

# 7. Which Method Does Java Execute?

Consider:

``` java
Animal animal = new Dog();
animal.makeSound();
```

If `Dog` overrides `makeSound()`, the output comes from `Dog`.

For overridden instance methods, Java determines which implementation to
execute based on the **actual object at runtime**.

This is known as **dynamic method dispatch** or **runtime
polymorphism**.

------------------------------------------------------------------------

# 8. One Reference, Different Objects

The same reference variable can refer to different subclass objects:

``` java
Animal animal;

animal = new Dog();
animal.makeSound();

animal = new Cat();
animal.makeSound();
```

Output:

``` text
Dog barks
Cat meows
```

The variable remains an `Animal` reference, but the object it references
changes.

------------------------------------------------------------------------

# 9. Polymorphism with Arrays

``` java
class Cow extends Animal {

    @Override
    public void makeSound() {
        System.out.println("Moo!");
    }
}
```

We can create:

``` java
Animal[] animals = {
    new Dog(),
    new Cat(),
    new Cow()
};
```

Then:

``` java
for (Animal animal : animals) {
    animal.makeSound();
}
```

Output:

``` text
Woof!
Meow!
Moo!
```

We do not need separate `if` statements to determine the animal type.
The actual object determines which overridden method executes.

------------------------------------------------------------------------

# 10. Polymorphic Method Parameters

Polymorphism becomes especially useful when passing objects to methods.

``` java
public static void performWork(Employee employee) {
    employee.work();
}
```

We can pass different subclasses:

``` java
performWork(new Programmer());
performWork(new Manager());
performWork(new Designer());
```

The method does not need to know the exact subclass. The actual object
determines which `work()` implementation executes.

------------------------------------------------------------------------

# 11. Adding New Classes

Suppose later we introduce:

``` java
class Designer extends Employee {

    @Override
    public void work() {
        System.out.println(
            "Designer is creating a user interface"
        );
    }
}
```

Our existing method:

``` java
public static void performWork(Employee employee) {
    employee.work();
}
```

does not need to change.

``` java
performWork(new Designer());
```

> **New subclasses can often be added without changing code that already
> works with the superclass.**

------------------------------------------------------------------------

# 12. Polymorphism with `ArrayList`

``` java
import java.util.ArrayList;
```

Create:

``` java
ArrayList<Employee> employees = new ArrayList<>();
```

Add different objects:

``` java
employees.add(new Programmer());
employees.add(new Manager());
employees.add(new Designer());
```

Process them:

``` java
for (Employee employee : employees) {
    employee.work();
}
```

The collection contains `Employee` references, but the actual objects
can belong to different subclasses.

------------------------------------------------------------------------

# 13. Upcasting

Consider:

``` java
Dog dog = new Dog();
Animal animal = dog;
```

A `Dog` reference is being assigned to an `Animal` reference. This is
called **upcasting**.

``` text
Animal
  ^
  |
 Dog
```

Java normally performs upcasting automatically:

``` java
Animal animal = new Dog();
```

------------------------------------------------------------------------

# 14. What Can the Reference Access?

Consider:

``` java
class Dog extends Animal {

    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }

    public void fetch() {
        System.out.println("Dog is fetching");
    }
}
```

Now:

``` java
Animal animal = new Dog();
```

This works:

``` java
animal.makeSound();
```

But this does not compile:

``` java
animal.fetch();
```

Why? Because the reference type is `Animal`, and `Animal` does not
declare `fetch()`.

> **The reference type determines what you can access; the actual object
> determines which overridden instance method executes.**

------------------------------------------------------------------------

# 15. Compile Time vs. Runtime

Consider:

``` java
Animal animal = new Dog();
animal.makeSound();
```

At **compile time**, Java checks whether `Animal` has a `makeSound()`
method.

At **runtime**, Java checks the actual object. Since it is a `Dog`, Java
executes the overridden `Dog.makeSound()` method.

------------------------------------------------------------------------

# 16. Downcasting

Sometimes we need to access behavior that exists only in a subclass.

``` java
Animal animal = new Dog();
```

We cannot directly write:

``` java
animal.fetch();
```

But we can downcast:

``` java
Dog dog = (Dog) animal;
dog.fetch();
```

This is called **downcasting**.

``` text
Animal
  |
  v
 Dog
```

Unlike upcasting, downcasting requires an explicit cast.

------------------------------------------------------------------------

# 17. The Danger of Downcasting

Consider:

``` java
Animal animal = new Cat();
Dog dog = (Dog) animal;
```

The code may compile, but the actual object is a `Cat`, not a `Dog`.

At runtime Java throws:

``` text
ClassCastException
```

Therefore, downcasting must be performed carefully.

------------------------------------------------------------------------

# 18. Using `instanceof`

Before downcasting, we can check the object's type:

``` java
if (animal instanceof Dog) {

    Dog dog = (Dog) animal;
    dog.fetch();
}
```

Modern Java also supports pattern matching:

``` java
if (animal instanceof Dog dog) {
    dog.fetch();
}
```

------------------------------------------------------------------------

# 19. Polymorphism with Abstract Classes

Consider:

``` java
abstract class Shape {

    public abstract double area();
}
```

Create:

``` java
class Circle extends Shape {

    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}
```

``` java
class Rectangle extends Shape {

    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }
}
```

Now:

``` java
Shape[] shapes = {
    new Circle(5),
    new Rectangle(4, 6)
};

for (Shape shape : shapes) {
    System.out.println(shape.area());
}
```

The loop does not need to know how each shape calculates its area. Each
object provides the appropriate implementation.

------------------------------------------------------------------------

# 20. Polymorphism with Interfaces

Polymorphism is also heavily used with interfaces.

``` java
interface Payment {

    void pay(double amount);
}
```

Different classes can implement the interface:

``` java
class CreditCardPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "Paid $" + amount + " using credit card"
        );
    }
}
```

``` java
class PayPalPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "Paid $" + amount + " using PayPal"
        );
    }
}
```

Now:

``` java
Payment payment;

payment = new CreditCardPayment();
payment.pay(100);

payment = new PayPalPayment();
payment.pay(100);
```

The same call produces different behavior depending on the actual
object.

------------------------------------------------------------------------

# 21. Real-World Example: Payment System

Imagine an online store:

``` java
public static void checkout(
        Payment payment,
        double amount) {

    payment.pay(amount);
}
```

We can use:

``` java
checkout(new CreditCardPayment(), 150);
checkout(new PayPalPayment(), 200);
```

Later we introduce:

``` java
class ApplePayPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println(
            "Paid $" + amount + " using Apple Pay"
        );
    }
}
```

Then:

``` java
checkout(new ApplePayPayment(), 75);
```

works without modifying `checkout()`.

This is an important reason polymorphism matters: the checkout system
depends on the common `Payment` abstraction rather than every specific
payment implementation.

------------------------------------------------------------------------

# 22. Method Overloading vs. Method Overriding

## Method Overloading

Same method name but different parameter lists:

``` java
void print(int value) {
}

void print(String value) {
}
```

The compiler determines which method to use based on the arguments.

This is commonly described as **compile-time polymorphism**.

## Method Overriding

A subclass provides a different implementation of an inherited method:

``` java
class Animal {

    public void sound() {
        System.out.println("Animal sound");
    }
}
```

``` java
class Dog extends Animal {

    @Override
    public void sound() {
        System.out.println("Woof");
    }
}
```

The actual object determines which overridden method executes. This is
**runtime polymorphism**.

------------------------------------------------------------------------

# 23. Common Mistakes

Consider:

``` java
Animal animal = new Dog();
```

A common misconception is:

> `animal` is an `Animal` object.

More precisely:

> `animal` is an `Animal` reference that currently refers to a `Dog`
> object.

Another common mistake is expecting this to work:

``` java
animal.fetch();
```

when `fetch()` exists only in `Dog`.

Remember:

``` text
Reference type
      |
      v
Determines what members are accessible
```

while:

``` text
Actual object
      |
      v
Determines which overridden instance method executes
```

------------------------------------------------------------------------

# 24. Complete Example

``` java
class Employee {

    public void work() {
        System.out.println("Employee is working");
    }
}
```

``` java
class Programmer extends Employee {

    @Override
    public void work() {
        System.out.println(
            "Programmer is writing Java code"
        );
    }

    public void debug() {
        System.out.println(
            "Programmer is debugging"
        );
    }
}
```

``` java
class Manager extends Employee {

    @Override
    public void work() {
        System.out.println(
            "Manager is managing the project"
        );
    }
}
```

Main program:

``` java
public class Main {

    public static void main(String[] args) {

        Employee[] employees = {
            new Programmer(),
            new Manager()
        };

        for (Employee employee : employees) {

            employee.work();

            if (employee instanceof Programmer programmer) {
                programmer.debug();
            }
        }
    }
}
```

Output:

``` text
Programmer is writing Java code
Programmer is debugging
Manager is managing the project
```

------------------------------------------------------------------------

# 25. Check Your Understanding

## Question 1

What is the output?

``` java
class Vehicle {

    public void move() {
        System.out.println("Vehicle moves");
    }
}

class Car extends Vehicle {

    @Override
    public void move() {
        System.out.println("Car drives");
    }
}

Vehicle vehicle = new Car();
vehicle.move();
```

## Question 2

Will this compile?

``` java
Animal animal = new Dog();
animal.fetch();
```

Assume `fetch()` exists only in `Dog`. Explain why or why not.

## Question 3

Identify the reference type and object type:

``` java
Employee employee = new Programmer();
```

## Question 4

What happens here?

``` java
Animal animal = new Cat();
Dog dog = (Dog) animal;
```

Choose one:

1.  The code fails to compile.
2.  The code compiles but fails at runtime.
3.  The code runs successfully.

Explain your answer.

## Question 5

What will be printed?

``` java
Animal[] animals = {
    new Dog(),
    new Cat(),
    new Dog()
};

for (Animal animal : animals) {
    animal.makeSound();
}
```

------------------------------------------------------------------------

# 26. Beginner Practice Exercise

Create the following hierarchy:

``` text
          Vehicle
         /       \
       Car       Bike
```

The `Vehicle` class should contain:

``` java
public void move()
```

The `Car` class should override the method and print:

``` text
Car is driving
```

The `Bike` class should override the method and print:

``` text
Bike is moving
```

Create:

``` java
Vehicle[] vehicles = {
    new Car(),
    new Bike(),
    new Car()
};
```

Use a loop to call `move()` for every object.

Expected output:

``` text
Car is driving
Bike is moving
Car is driving
```

------------------------------------------------------------------------

# 27. Intermediate Challenge

Create an abstract class:

``` java
Employee
```

with an abstract method:

``` java
public abstract double calculatePay();
```

Create:

``` text
Employee
   |
   +-- SalariedEmployee
   |
   +-- HourlyEmployee
```

A `SalariedEmployee` should calculate pay using a fixed salary.

An `HourlyEmployee` should calculate pay using:

``` text
hours worked × hourly rate
```

Create an:

``` java
ArrayList<Employee>
```

containing several employees.

Use **one loop** to calculate and display the pay for every employee.

Your solution should demonstrate:

-   inheritance,
-   method overriding,
-   polymorphism,
-   abstract classes,
-   an `ArrayList` of superclass references.

------------------------------------------------------------------------

# 28. Key Takeaways

Polymorphism means **many forms**.

It allows different objects to be treated through a common superclass or
interface while still providing their own behavior.

For example:

``` java
Animal animal = new Dog();
```

Here:

``` text
Reference type: Animal
Object type:    Dog
```

For overridden instance methods:

``` java
animal.makeSound();
```

the actual object determines which implementation executes.

> **The reference type determines what you can access; the actual object
> determines which overridden instance method runs.**

We use polymorphism because it helps us:

-   reduce repetitive code,
-   avoid large type-checking `if` and `switch` statements,
-   process different objects through a common type,
-   create flexible arrays and collections,
-   add new subclasses with fewer changes to existing code,
-   reduce dependencies on specific implementations,
-   build software that is easier to maintain and extend.

Instead of asking:

``` text
What specific type of object is this?
```

and writing different code for every type, polymorphism allows us to
say:

``` text
You are an Employee -> work()
You are an Animal   -> makeSound()
You are a Shape     -> area()
You are a Payment   -> pay()
```

The individual object decides **how** that operation should be
performed.

That is the practical purpose and power of polymorphism in
object-oriented programming.
