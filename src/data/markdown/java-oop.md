# Java OOP Concepts

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data and code.

## Four Pillars of OOP
1. **Encapsulation**: Wrapping data and methods into a single unit (class).
2. **Inheritance**: Mechanism where one class acquires properties of another.
3. **Polymorphism**: Ability to perform a single action in different ways.
4. **Abstraction**: Hiding internal details and showing only functionality.

### Example: Inheritance
```java
class Animal {
  void eat() { System.out.println("eating..."); }
}
class Dog extends Animal {
  void bark() { System.out.println("barking..."); }
}
```
