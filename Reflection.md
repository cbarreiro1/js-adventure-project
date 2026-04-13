# JS Adventure Project: OOP Refactoring Analysis

## 1. Why can't db.json store actual class instances directly?

JSON can only store primitive values (strings, numbers, booleans, null), plain objects (collections of key-value pairs), and arrays

---

## 2. Why is it useful to create all objects first and connect them afterward?

It separates logic that should be separated. Each object now exists individually so that instances of an object don't depend on other objects. There would be much more mapping that would have to occur because it would require more instances of each object. It's better for objects to exist on their own rather than be dependent on another.

---

## 3. Why does Player make sense as a subclass of Container?

The player is a container because the main goal of the player is to hold the state of the inventory. The player can dynamically add and remove items from their inventory so it makes the most sense for the player to be a container because container's role is to handle holding objects.

---

## 4. What behavior did you move out of the controller and into your classes?


### Summary of Behavior Moved

- Taking items
- Dropping items
- Examining items
- Getting available actions
- Managing inventory
- Managing room contents

---

## 5. What was the hardest part of converting from plain objects to class instances?

The hardest part of refactoring was figuring out how to map all of the objects together and just figuring out where certain logic should go. I was a little confused when working to figure out the encapsulation while also working with the controller, but in the end, I was able to determine that the controller could act as a "middle man" to call the class methods.

