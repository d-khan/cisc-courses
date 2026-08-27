# Polymorphism in Java

## Beginner to Intermediate Lecture

## Learning Objectives

By the end of this lecture, you should be able to:

-   Explain polymorphism in your own words.
-   Explain **why** polymorphism is useful instead of only recognizing
    its syntax.
-   Explain why a superclass reference can refer to a subclass object.
-   Distinguish between the **reference type** and the **actual object
    type**.
-   Explain why Java executes an overridden subclass method at runtime.
-   Use polymorphism with method parameters, arrays, and `ArrayList`.
-   Explain why a superclass reference cannot directly access
    subclass-only methods.
-   Understand upcasting, downcasting, and `instanceof`.
-   Explain how abstract classes and interfaces support polymorphic
    design.
-   Recognize situations where polymorphism improves a program and
    situations where it may be unnecessary.

------------------------------------------------------------------------

## 1. The Problem Before Polymorphism

Before learning the syntax of polymorphism, we need to understand the
problem it is designed to solve.

Suppose we are developing a program for an animal shelter. At first, the
shelter only works with dogs.

``` java
class Dog {

    public void makeSound() {
        System.out.println("Woof!");
    }
}
```

We can create a dog and call its method:

``` java
Dog dog = new Dog();
dog.makeSound();
```

This is perfectly reasonable.

There is no reason to introduce polymorphism simply because we created
an object.

Now suppose the shelter begins accepting cats.

``` java
class Cat {

    public void makeSound() {
        System.out.println("Meow!");
    }
}
```

Our program might now contain:

``` java
Dog dog = new Dog();
Cat cat = new Cat();

dog.makeSound();
cat.makeSound();
```

This still works.

But what happens as the application grows?

We may eventually have:

``` text
Dog
Cat
Bird
Rabbit
Horse
Cow
```

Now imagine that we need a method that makes any animal produce its
sound.

Without a common parent type, we might start creating separate methods:

``` java
public static void makeDogSpeak(Dog dog) {
    dog.makeSound();
}

public static void makeCatSpeak(Cat cat) {
    cat.makeSound();
}
```

Then we add a bird:

``` java
public static void makeBirdSpeak(Bird bird) {
    bird.makeSound();
}
```

And later:

``` java
makeRabbitSpeak(...)
makeHorseSpeak(...)
makeCowSpeak(...)
```

The important question is:

> Why should we need a different method when all of these objects are
> performing the same general operation?

They are all animals, and they all make sounds.

This is one of the problems polymorphism helps us solve.

------------------------------------------------------------------------

## 2. Finding What the Objects Have in Common

Instead of treating every animal as completely unrelated, we can
represent their common characteristics using a superclass.

``` java
class Animal {

    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
}
```

Now `Dog` can extend `Animal`:

``` java
class Dog extends Animal {

    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}
```

And `Cat` can extend `Animal`:

``` java
class Cat extends Animal {

    @Override
    public void makeSound() {
        System.out.println("Meow!");
    }
}
```

The relationship is:

``` text
           Animal
          /      \
        Dog      Cat
```

This tells Java something important:

``` text
A Dog is an Animal.
A Cat is an Animal.
```

This is often called an **is-a relationship**.

Because a `Dog` is an `Animal`, Java allows us to write:

``` java
Animal animal = new Dog();
```

This statement is the foundation of runtime polymorphism.

------------------------------------------------------------------------

## 3. What Does Polymorphism Mean?

The word **polymorphism** comes from:

-   **poly** --- many
-   **morph** --- forms

Polymorphism means **many forms**.

In Java, a useful way to think about polymorphism is:

> A program can work with objects through a common type while each
> object can provide its own behavior.

For example:

``` java
Animal animal;

animal = new Dog();
animal.makeSound();

animal = new Cat();
animal.makeSound();
```

Output:

``` text
Woof!
Meow!
```

Notice that the statement:

``` java
animal.makeSound();
```

did not change.

What changed was the object referenced by `animal`.

When `animal` refers to a `Dog`, the dog behavior executes.

When `animal` refers to a `Cat`, the cat behavior executes.

This is the central idea of polymorphism.

------------------------------------------------------------------------

## 4. Why Not Just Write `Dog dog = new Dog()`?

This is one of the most important questions to answer.

There is absolutely nothing wrong with:

``` java
Dog dog = new Dog();
```

If a section of your program specifically requires a `Dog`, using a
`Dog` reference is appropriate.

Polymorphism becomes useful when the code does **not need to care about
the exact subclass**.

Suppose we write:

``` java
public static void makeAnimalSpeak(Animal animal) {
    animal.makeSound();
}
```

Because the parameter is `Animal`, we can call:

``` java
makeAnimalSpeak(new Dog());
makeAnimalSpeak(new Cat());
```

If we later create:

``` java
class Cow extends Animal {

    @Override
    public void makeSound() {
        System.out.println("Moo!");
    }
}
```

we can immediately write:

``` java
makeAnimalSpeak(new Cow());
```

The `makeAnimalSpeak()` method does not need to change.

That is the important reason for using the superclass type.

We are saying:

> "I do not care whether you give me a Dog, Cat, or Cow. Give me any
> Animal that knows how to make a sound."

This makes the code more general and reusable.

------------------------------------------------------------------------

## 5. Why Does Java Allow `Animal animal = new Dog()`?

Consider:

``` java
Animal animal = new Dog();
```

At first, this may look strange.

Why are `Animal` and `Dog` both present in the same statement?

The answer comes from inheritance.

If:

``` java
class Dog extends Animal
```

then every `Dog` is also an `Animal`.

Therefore, a variable designed to refer to an `Animal` can safely refer
to a `Dog`.

Think about a real-world example.

If someone asks:

> "Bring me a vehicle."

You could bring:

-   a car,
-   a truck,
-   a motorcycle.

A car is more specific than a vehicle, but it is still a vehicle.

Likewise:

``` text
Dog -> Animal
Car -> Vehicle
Programmer -> Employee
Circle -> Shape
```

This allows Java programs to operate using general types while still
creating specialized objects.

------------------------------------------------------------------------

## 6. Reference Type vs. Actual Object Type

Consider again:

``` java
Animal animal = new Dog();
```

There are two important types involved.

## Reference Type

The variable is declared as:

``` java
Animal animal
```

Therefore, its **reference type** is `Animal`.

## Actual Object Type

The object is created with:

``` java
new Dog()
```

Therefore, the actual object is a `Dog`.

We can visualize this as:

``` text
Reference variable              Object

Animal animal  ------------->  Dog object
```

A precise way to describe the statement is:

> `animal` is an `Animal` reference that currently refers to a `Dog`
> object.

The object has not stopped being a `Dog`.

The reference simply views that object through the more general `Animal`
type.

------------------------------------------------------------------------

## 7. Why Do We Need Method Overriding?

Suppose `Animal` contains:

``` java
class Animal {

    public void makeSound() {
        System.out.println("Animal sound");
    }
}
```

A dog should behave differently:

``` java
class Dog extends Animal {

    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}
```

This is **method overriding**.

The subclass provides its own implementation of a method inherited from
its superclass.

Why is overriding important for polymorphism?

Because different subclasses often need different implementations of the
same general operation.

For example:

``` text
Animal.makeSound()

Dog -> Woof
Cat -> Meow
Cow -> Moo
```

The operation is conceptually the same:

``` java
makeSound()
```

but the behavior differs depending on the object.

That is exactly the kind of problem runtime polymorphism is designed to
handle.

------------------------------------------------------------------------

## 8. Why Use `@Override`?

You should normally write:

``` java
@Override
public void makeSound() {
    System.out.println("Woof!");
}
```

The annotation tells the compiler:

> "I intend this method to override a method inherited from a parent
> class."

Suppose you accidentally write:

``` java
@Override
public void makesound() {
    System.out.println("Woof!");
}
```

Java is case-sensitive. `makesound()` and `makeSound()` are different
method names.

Because `@Override` is present, the compiler can warn you that the
method does not actually override the parent method.

Therefore, `@Override` helps catch programming mistakes.

------------------------------------------------------------------------

## 9. Why Does the `Dog` Method Execute?

Consider:

``` java
Animal animal = new Dog();
animal.makeSound();
```

Assume both `Animal` and `Dog` define `makeSound()`.

Which version should execute?

The output is:

``` text
Woof!
```

To understand why, separate what happens at **compile time** from what
happens at **runtime**.

## Compile Time

The compiler sees:

``` java
Animal animal
```

It asks:

> Does `Animal` have a `makeSound()` method?

Yes.

Therefore:

``` java
animal.makeSound();
```

is a valid statement.

## Runtime

When the program runs, Java looks at the actual object referenced by
`animal`.

The object is:

``` java
new Dog()
```

`Dog` overrides `makeSound()`, so Java executes:

``` java
Dog.makeSound()
```

This process is called **dynamic method dispatch**.

It is also known as **runtime polymorphism**.

------------------------------------------------------------------------

## 10. The Most Important Rule

For overridden instance methods, remember:

> **The reference type determines what you are allowed to access. The
> actual object type determines which overridden implementation
> executes.**

Consider:

``` java
Animal animal = new Dog();
```

The reference type is:

``` text
Animal
```

The actual object type is:

``` text
Dog
```

This distinction explains many questions students have about
polymorphism.

------------------------------------------------------------------------

## 11. Why Can't an `Animal` Reference Call a Dog-Only Method?

Suppose:

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

But this does not:

``` java
animal.fetch();
```

Why?

Students often say:

> "But the object is a Dog!"

That is true at runtime.

However, the compiler only knows that the variable has been declared as:

``` java
Animal animal
```

The `Animal` class does not promise that every animal can `fetch()`.

A `Dog` may fetch, but a `Cat`, `Cow`, or `Bird` may not.

Therefore, Java does not allow:

``` java
animal.fetch();
```

through an `Animal` reference.

This restriction makes sense because an `Animal` reference could later
refer to:

``` java
animal = new Cat();
```

and a `Cat` may not have a `fetch()` method.

------------------------------------------------------------------------

## 12. Why Is Polymorphism Useful with Arrays?

Suppose we have:

``` java
Dog dog1 = new Dog();
Dog dog2 = new Dog();

Cat cat1 = new Cat();
Cat cat2 = new Cat();
```

We could maintain separate arrays:

``` java
Dog[] dogs = {
    dog1,
    dog2
};

Cat[] cats = {
    cat1,
    cat2
};
```

But what if we want to process **all animals together**?

Because every `Dog` and `Cat` is an `Animal`, we can create:

``` java
Animal[] animals = {
    new Dog(),
    new Cat(),
    new Dog(),
    new Cat()
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
Woof!
Meow!
```

Why is this useful?

The loop does not need to ask:

``` text
Is this a Dog?
Is this a Cat?
Is this a Cow?
```

It simply says:

``` java
animal.makeSound();
```

Each object determines the appropriate behavior.

------------------------------------------------------------------------

## 13. What Would the Code Look Like Without Polymorphism?

Imagine code such as:

``` java
if (animalType.equals("dog")) {

    System.out.println("Woof!");

} else if (animalType.equals("cat")) {

    System.out.println("Meow!");

} else if (animalType.equals("cow")) {

    System.out.println("Moo!");
}
```

Now imagine adding:

``` text
Horse
Bird
Lion
Tiger
Elephant
```

The conditional continues growing.

With polymorphism, each class contains its own behavior:

``` java
class Dog extends Animal {

    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}
```

and:

``` java
class Cat extends Animal {

    @Override
    public void makeSound() {
        System.out.println("Meow!");
    }
}
```

The caller only needs:

``` java
animal.makeSound();
```

This keeps behavior associated with the object responsible for that
behavior.

------------------------------------------------------------------------

## 14. Polymorphism with Method Parameters

Consider:

``` java
public static void makeAnimalSpeak(Animal animal) {
    animal.makeSound();
}
```

Why declare the parameter as `Animal` rather than `Dog`?

If we wrote:

``` java
public static void makeAnimalSpeak(Dog dog) {
    dog.makeSound();
}
```

the method could only accept dogs.

We would need another method for cats:

``` java
public static void makeAnimalSpeak(Cat cat) {
    cat.makeSound();
}
```

Using:

``` java
Animal animal
```

allows the same method to accept any subclass of `Animal`.

``` java
makeAnimalSpeak(new Dog());
makeAnimalSpeak(new Cat());
makeAnimalSpeak(new Cow());
```

This is a major practical reason for using polymorphism.

------------------------------------------------------------------------

## 15. Adding a New Subclass

Suppose our program currently supports:

``` text
Dog
Cat
Cow
```

Later we add:

``` java
class Horse extends Animal {

    @Override
    public void makeSound() {
        System.out.println("Neigh!");
    }
}
```

Do we need to modify this method?

``` java
public static void makeAnimalSpeak(Animal animal) {
    animal.makeSound();
}
```

No.

We can immediately write:

``` java
makeAnimalSpeak(new Horse());
```

This demonstrates an important software-design benefit:

> Polymorphic code can often work with future subclasses without being
> rewritten.

This makes programs easier to extend and maintain.

------------------------------------------------------------------------

## 16. Polymorphism with `ArrayList`

The same idea works with collections.

``` java
import java.util.ArrayList;
```

We can create:

``` java
ArrayList<Animal> animals = new ArrayList<>();
```

Then:

``` java
animals.add(new Dog());
animals.add(new Cat());
animals.add(new Cow());
```

Why is Java allowing different objects into the same collection?

Because all of them satisfy the requirement:

``` text
They are Animals.
```

Now:

``` java
for (Animal animal : animals) {
    animal.makeSound();
}
```

can process the entire collection.

This is extremely useful in larger applications where many related
object types must be processed together.

------------------------------------------------------------------------

## 17. Another Example: Employees

Consider:

``` java
class Employee {

    public void work() {
        System.out.println("Employee is working");
    }
}
```

Then:

``` java
class Programmer extends Employee {

    @Override
    public void work() {
        System.out.println("Programmer is writing code");
    }
}
```

And:

``` java
class Manager extends Employee {

    @Override
    public void work() {
        System.out.println("Manager is managing the team");
    }
}
```

Now:

``` java
Employee employee1 = new Programmer();
Employee employee2 = new Manager();

employee1.work();
employee2.work();
```

Output:

``` text
Programmer is writing code
Manager is managing the team
```

Why use `Employee` references?

Because another part of the application may only care that these objects
are employees.

For example, a method could be:

``` java
public static void startWork(Employee employee) {
    employee.work();
}
```

It does not need to know whether the employee is a programmer, manager,
or some future employee type.

------------------------------------------------------------------------

## 18. Upcasting

Consider:

``` java
Dog dog = new Dog();
Animal animal = dog;
```

The conversion from a more specific type (`Dog`) to a more general type
(`Animal`) is called **upcasting**.

``` text
Animal
  ^
  |
 Dog
```

We can usually write it directly:

``` java
Animal animal = new Dog();
```

Java performs this conversion automatically.

## Why Is Upcasting Safe?

Because every `Dog` is guaranteed to be an `Animal`.

If `Dog extends Animal`, then a `Dog` object has the characteristics
required to be treated as an `Animal`.

Therefore, Java does not require an explicit cast.

------------------------------------------------------------------------

## 19. Downcasting

Now consider:

``` java
Animal animal = new Dog();
```

Suppose we specifically need the `Dog` method:

``` java
fetch()
```

We cannot call:

``` java
animal.fetch();
```

because `fetch()` is not part of `Animal`.

We could cast the reference:

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

------------------------------------------------------------------------

## 20. Why Isn't Downcasting Automatic?

Consider:

``` java
Animal animal = new Cat();
```

Would this be safe?

``` java
Dog dog = (Dog) animal;
```

No.

The reference variable is an `Animal`, but the actual object is a `Cat`.

Not every `Animal` is a `Dog`.

That is the key difference:

``` text
Every Dog is an Animal.       -> Safe assumption
Every Animal is a Dog.        -> False
```

Therefore:

-   upcasting is normally automatic,
-   downcasting requires an explicit cast.

By writing:

``` java
(Dog) animal
```

the programmer is telling Java:

> "I believe this Animal actually refers to a Dog."

If that assumption is wrong, the program fails at runtime with:

``` text
ClassCastException
```

------------------------------------------------------------------------

## 21. Why Use `instanceof`?

Because downcasting can fail, we may first check the actual object type.

``` java
if (animal instanceof Dog) {

    Dog dog = (Dog) animal;
    dog.fetch();
}
```

Modern Java allows:

``` java
if (animal instanceof Dog dog) {
    dog.fetch();
}
```

Why use `instanceof`?

It protects us from attempting a cast that is not valid for the actual
object.

However, if your program contains large numbers of `instanceof` checks,
you should also consider whether the design could make better use of
polymorphic methods.

------------------------------------------------------------------------

## 22. Polymorphism with Abstract Classes

Sometimes a general superclass represents a concept, but creating a
generic object of that type does not make sense.

For example:

``` text
Shape
```

is a useful general concept.

But what would the area of a generic `Shape` be?

There is not enough information.

A circle calculates area differently from a rectangle.

Therefore, we can create an abstract class:

``` java
abstract class Shape {

    public abstract double area();
}
```

Then:

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

And:

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
```

And:

``` java
for (Shape shape : shapes) {
    System.out.println(shape.area());
}
```

## Why Is This Good Design?

The code processing the shapes does not need to know the formula for
every shape.

It simply asks each object:

``` java
shape.area();
```

Each subclass is responsible for knowing how to calculate its own area.

------------------------------------------------------------------------

## 23. Polymorphism with Interfaces

Polymorphism is also commonly used with interfaces.

Imagine an online store that supports multiple payment methods.

We might have:

``` text
Credit Card
PayPal
Apple Pay
```

The checkout system should not need completely different checkout logic
for every payment provider.

All payment methods share one operation:

``` text
pay
```

We can represent this using an interface:

``` java
interface Payment {

    void pay(double amount);
}
```

Then:

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

And:

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

Now our checkout method can be:

``` java
public static void checkout(
        Payment payment,
        double amount) {

    payment.pay(amount);
}
```

We can call:

``` java
checkout(new CreditCardPayment(), 100);
checkout(new PayPalPayment(), 100);
```

------------------------------------------------------------------------

## 24. Why Use the `Payment` Interface?

Why not write:

``` java
public static void checkout(
        CreditCardPayment payment,
        double amount)
```

Because then the checkout method is specifically tied to credit cards.

It cannot naturally accept PayPal.

We could create another method for PayPal, but then the checkout logic
becomes dependent on individual payment implementations.

By accepting:

``` java
Payment payment
```

the method says:

> "I do not care which payment provider you use. Give me something that
> satisfies the Payment contract."

Later we could add:

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

The existing checkout method does not need to change:

``` java
checkout(new ApplePayPayment(), 100);
```

This is one of the strongest real-world reasons for polymorphism.

------------------------------------------------------------------------

## 25. Method Overloading vs. Method Overriding

These two concepts sound similar but solve different problems.

## Method Overloading

``` java
void print(int value) {
}

void print(String value) {
}
```

The method name is the same, but the parameter lists are different.

The compiler determines which method to use from the arguments.

This is commonly described as **compile-time polymorphism**.

## Method Overriding

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

The subclass provides a different implementation of an inherited method.

With:

``` java
Animal animal = new Dog();
animal.makeSound();
```

the actual object determines which overridden method executes.

This is **runtime polymorphism**.

------------------------------------------------------------------------

## 26. Common Misconception: Does a `Dog` Become an `Animal`?

Consider:

``` java
Animal animal = new Dog();
```

The `Dog` object does not transform into a generic `Animal`.

The actual object remains a `Dog`.

Only the type of reference being used to access the object is `Animal`.

Think of it as viewing a specialized object through a more general
reference.

``` text
Animal reference
      |
      v
   Dog object
```

------------------------------------------------------------------------

## 27. Common Misconception: Does Polymorphism Mean We Should Always Use the Parent Type?

No.

Consider:

``` java
Dog dog = new Dog();
```

If your code specifically needs dog behavior such as:

``` java
dog.fetch();
dog.guardHouse();
```

then using a `Dog` reference may be appropriate.

Polymorphism is most valuable when code needs to work with **multiple
related object types through a common abstraction**.

Do not introduce polymorphism merely to make a small program look more
complicated.

------------------------------------------------------------------------

## 28. When Should We Use Polymorphism?

Polymorphism is particularly useful when:

-   several classes represent related concepts,
-   the classes perform a common operation differently,
-   a method should work with several subclasses,
-   a collection should contain several related object types,
-   new subclasses may be added later,
-   the calling code should not need to know every concrete
    implementation.

Examples include:

``` text
Animal -> Dog, Cat, Cow

Employee -> Programmer, Manager, Designer

Shape -> Circle, Rectangle, Triangle

Payment -> CreditCard, PayPal, ApplePay

Notification -> Email, SMS, PushNotification
```

------------------------------------------------------------------------

## 29. When Might Polymorphism Be Unnecessary?

Suppose a program only has:

``` java
class Calculator
```

and there is no meaningful family of related object types.

Creating an inheritance hierarchy merely to demonstrate polymorphism may
make the program harder to understand.

Likewise, if code genuinely needs behavior unique to a specific class,
using that specific class may be clearer.

The goal is not:

> "Use polymorphism everywhere."

The goal is:

> "Use polymorphism when several related objects should be handled
> through a common abstraction."

------------------------------------------------------------------------

## 30. Complete Example

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
        }
    }
}
```

Output:

``` text
Programmer is writing Java code
Manager is managing the project
```

## What Is Happening?

The array is declared as:

``` java
Employee[]
```

so it can contain references to `Employee` objects and objects belonging
to subclasses of `Employee`.

The first actual object is a:

``` java
Programmer
```

The second is a:

``` java
Manager
```

Inside the loop:

``` java
Employee employee
```

is the reference type.

When Java executes:

``` java
employee.work();
```

it chooses the overridden implementation based on the actual object.

For the first iteration:

``` text
Employee reference -> Programmer object -> Programmer.work()
```

For the second:

``` text
Employee reference -> Manager object -> Manager.work()
```

The loop does not need separate logic for programmers and managers.

That is polymorphism in practice.

------------------------------------------------------------------------

## 31. Check Your Understanding

## Question 1

Why might we prefer:

``` java
public static void processAnimal(Animal animal)
```

over:

``` java
public static void processAnimal(Dog dog)
```

when the method should work with dogs, cats, cows, and other animals?

------------------------------------------------------------------------

## Question 2

Consider:

``` java
Animal animal = new Dog();
```

What is the:

1.  reference type?
2.  actual object type?

------------------------------------------------------------------------

## Question 3

Why does this execute the `Dog` implementation?

``` java
Animal animal = new Dog();
animal.makeSound();
```

Explain both the compile-time check and runtime decision.

------------------------------------------------------------------------

## Question 4

Why does this fail to compile if `fetch()` only exists in `Dog`?

``` java
Animal animal = new Dog();
animal.fetch();
```

------------------------------------------------------------------------

## Question 5

Why is this safe?

``` java
Animal animal = new Dog();
```

But this may be unsafe?

``` java
Dog dog = (Dog) animal;
```

------------------------------------------------------------------------

## Question 6

What problem does this solve?

``` java
Animal[] animals = {
    new Dog(),
    new Cat(),
    new Cow()
};

for (Animal animal : animals) {
    animal.makeSound();
}
```

Why is this better than writing separate processing logic for each
animal type?

------------------------------------------------------------------------

## 32. Beginner Practice Exercise

Create the following hierarchy:

``` text
          Vehicle
         /       \
       Car       Bike
```

Create a `Vehicle` class containing:

``` java
public void move()
```

Create a `Car` class that overrides `move()` and displays:

``` text
Car is driving
```

Create a `Bike` class that overrides `move()` and displays:

``` text
Bike is moving
```

Then create:

``` java
Vehicle[] vehicles = {
    new Car(),
    new Bike(),
    new Car()
};
```

Use one loop:

``` java
for (Vehicle vehicle : vehicles) {
    vehicle.move();
}
```

Expected output:

``` text
Car is driving
Bike is moving
Car is driving
```

After completing the program, answer:

1.  Why can a `Vehicle[]` contain `Car` and `Bike` objects?
2.  What is the reference type of `vehicle` inside the loop?
3.  How does Java know whether to execute `Car.move()` or `Bike.move()`?
4.  What would be less convenient about maintaining separate `Car[]` and
    `Bike[]` arrays?

------------------------------------------------------------------------

## 33. Intermediate Challenge

Create an abstract class:

``` java
Employee
```

with:

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

Create:

``` java
ArrayList<Employee> employees
```

and add several salaried and hourly employees.

Use **one loop** to calculate the pay for every employee.

After completing the program, explain:

1.  Why is `Employee` an appropriate common type?
2.  Why should `calculatePay()` be overridden?
3.  Why can one `ArrayList<Employee>` contain both employee types?
4.  Why does the loop not need to know which type of employee it is
    processing?
5.  What would happen to the processing loop if another subclass such as
    `CommissionEmployee` were added?

------------------------------------------------------------------------

## 34. Key Takeaways

Polymorphism is not primarily about writing:

``` java
Animal animal = new Dog();
```

That is only the syntax.

The more important idea is **why** we do it.

Polymorphism allows us to write code in terms of a general concept:

``` text
Animal
Employee
Shape
Payment
```

while allowing specific objects to provide their own behavior:

``` text
Dog
Programmer
Circle
PayPalPayment
```

This means one piece of code can work with many related object types.

For example:

``` java
for (Animal animal : animals) {
    animal.makeSound();
}
```

The loop does not need to know whether each object is a `Dog`, `Cat`, or
`Cow`.

Each object knows how to respond to:

``` java
makeSound()
```

Remember the central rule:

> **The reference type determines what you are allowed to access; the
> actual object type determines which overridden instance method
> executes at runtime.**

And remember the central reason for using polymorphism:

> **Polymorphism allows us to program using common abstractions instead
> of writing separate processing logic for every specific object type.**

This can make object-oriented programs more reusable, extensible, and
easier to maintain.
