/**
 * Defines the maximum capacity of the stack.
 * This constant prevents stack overflow by limiting the number of elements that can be pushed onto the stack.
 * @type {number}
 */
const MAX_SIZE = 9

/**
 * Generic Stack Data Structure Implementation
 * 
 * A stack is a linear data structure that follows the Last In, First Out (LIFO) principle.
 * Elements are added and removed from the same end, called the "top" of the stack.
 * 
 * This implementation uses TypeScript generics (<T>) to allow flexibility in data types.
 * You can create stacks for any type: numbers, strings, objects, etc.
 * 
 * **Time Complexity:**
 * - Push: O(1) - Amortized constant time (due to array resizing, but typically constant)
 * - Pop: O(1) - Constant time
 * - Peek: O(1) - Constant time
 * - Undo: O(1) - Constant time
 * 
 * **Space Complexity:**
 * - O(n) - Where n is the number of elements in the stack.
 * 
 * The stack has a maximum capacity defined by the `MAX_SIZE` constant to prevent memory overflow.
 * 
 * Common operations:
 * - push(): Add an element to the top
 * - pop(): Remove and return the top element
 * - peek(): View the top element without removing it
 * - undo(): Restore the last popped element
 * 
 * @template T The type of elements stored in the stack
 * 
 * @example
 * // Create a stack for numbers
 * const numberStack = new Stack<number>()
 * numberStack.push(1)
 * numberStack.push(2)
 * 
 * @example
 * // Create a stack for strings
 * const stringStack = new Stack<string>()
 * stringStack.push("hello")
 * stringStack.push("world")
 */
class Stack<T> {
  /**
   * Internal array to store stack elements.
   * @private
   * @type {T[]}
   */
  private elements: T[]
  
  /**
   * Index of the top element in the stack.
   * A value of -1 indicates an empty stack.
   * @type {number}
   */
  topLevel: number 
  
  /**
   * Current number of elements in the stack.
   * @type {number}
   */
  length: number
  
  // Stores the last popped element for undo functionality
  private _poppedHistory: T[];
  
  /**
   * Constructor - Initialize an empty stack
   */
  constructor() {
    this.elements = []      // Initialize empty array to store elements
    this.topLevel = -1      // -1 indicates empty stack
    this.length = 0         // Start with 0 elements
    this._poppedHistory = [] // Initialize history for undo functionality
  }
  
  /**
   * Pushes an element onto the top of the stack.
   * 
   * This method adds a new element to the stack, adhering to the LIFO principle.
   * It checks for stack overflow before adding the element. If the stack is full
   * (i.e., `topLevel` reaches `MAX_SIZE - 1`), an error is logged to the console,
   * and the operation is aborted.
   * 
   * **Time Complexity:** O(1) - Constant time, as it involves a fixed number of operations
   * (incrementing `topLevel`, assigning value, incrementing `length`).
   * **Space Complexity:** O(1) - Constant space, as it only modifies existing properties.
   * 
   * @param {T} value - The element of type T to be added to the stack.
   * @returns {void}
   * 
   * @example
   * const myStack = new Stack<number>();
   * myStack.push(10); // Stack: [10]
   * myStack.push(20); // Stack: [10, 20]
   */
  push(value: T) {
    // Check for stack overflow (when stack is full)
    if (this.topLevel >= MAX_SIZE - 1) {
      console.error('stack overflow')
      return
    } else {
      this.topLevel++                        // Move to next position
      this.elements[this.topLevel] = value   // Store the value
      this.length++                          // Increment count
    }
  }
  
  /**
   * Removes and returns the top element from the stack.
   * 
   * This method retrieves the element currently at the `topLevel` of the stack,
   * effectively removing it. The `topLevel` pointer is then decremented, and the
   * `length` of the stack is reduced. The removed element is also stored in the
   * `_poppedHistory` for potential undo operations.
   * If the stack is empty (stack underflow), an error is logged, and `undefined` is returned.
   * 
   * **Time Complexity:** O(1) - Constant time, as it involves a fixed number of operations
   * (decrementing `topLevel`, retrieving value, decrementing `length`, pushing to history).
   * **Space Complexity:** O(1) - Constant space, as it only modifies existing properties.
   * 
   * @returns {T | undefined} The removed element of type T, or `undefined` if the stack is empty.
   * 
   * @example
   * const myStack = new Stack<number>();
   * myStack.push(10); // Stack: [10]
   * myStack.push(20); // Stack: [10, 20]
   * const poppedElement = myStack.pop(); // poppedElement is 20, Stack: [10]
   */
  pop(): T | undefined {
    // Check for stack underflow (when stack is empty)
    if (this.topLevel < 0) {
      console.error('stack underflow')
      return undefined
    } else {
      const value = this.elements[this.topLevel]  // Get the top element
      this._poppedHistory.push(value);              // Save the last deleted element for undo
      this.topLevel--                             // Move pointer down
      this.length--                               // Decrement count
      return value                                // Return the removed element
    }
  }
  
  /**
   * Returns the top element of the stack without removing it.
   * 
   * This method allows inspection of the element at the `topLevel` of the stack
   * without modifying the stack's structure. It's useful for checking the next
   * element that would be returned by `pop()` without actually performing the pop operation.
   * If the stack is empty (stack underflow), an error is logged, and `undefined` is returned.
   * 
   * **Time Complexity:** O(1) - Constant time, as it involves a single access to an array element.
   * **Space Complexity:** O(1) - Constant space, as it does not allocate new memory.
   * 
   * @returns {T | undefined} The top element of type T, or `undefined` if the stack is empty.
   * 
   * @example
   * const myStack = new Stack<string>();
   * myStack.push("apple");
   * myStack.push("banana");
   * console.log(myStack.peek()); // Output: "banana"
   * console.log(myStack.length); // Output: 2 (stack remains unchanged)
   */
  peek(): T | undefined {
    // Check if stack is empty
    if (this.topLevel < 0) {
      console.error('stack underflow')
      return undefined
    } else {
      // Return the top element without removing it
      return this.elements[this.topLevel]
    }
  }
  
  /**
   * Restores the last popped element back onto the stack.
   * 
   * This method reverses the effect of the most recent `pop()` operation by
   * retrieving the last element from the `_poppedHistory` and pushing it back
   * onto the stack. This effectively "undoes" the last removal.
   * If there are no elements in the `_poppedHistory` (meaning no `pop()` operations
   * have occurred or all have been undone), the method does nothing and returns `undefined`.
   * 
   * **Time Complexity:** O(1) - Constant time, as it involves a fixed number of operations
   * (popping from history, pushing to stack).
   * **Space Complexity:** O(1) - Constant space, as it only modifies existing properties.
   * 
   * @returns {T | undefined} The element that was restored to the stack, or `undefined` if no element could be undone.
   * 
   * @example
   * const myStack = new Stack<number>();
   * myStack.push(10); // Stack: [10]
   * myStack.push(20); // Stack: [10, 20]
   * myStack.pop();    // Stack: [10], returns 20
   * myStack.undo();   // Stack: [10, 20], returns 20
   * console.log(myStack.peek()); // Output: 20
   */
  undo(): T | undefined {
    const lastPopped = this._poppedHistory.pop();
    if (lastPopped !== undefined) {
      this.push(lastPopped);
      return lastPopped;
    }
    return undefined;
  }
}

/**
 * Demonstration of Stack usage with numbers.
 * 
 * This example showcases the basic operations of the `Stack` class using number elements.
 * It demonstrates:
 * 1. Pushing elements onto the stack, illustrating the LIFO principle and stack overflow handling.
 * 2. Peeking at the top element without removing it.
 * 3. Popping elements from the stack, showing the LIFO removal order and stack underflow handling.
 * 4. Utilizing the `undo` method to restore a previously popped element.
 * 
 * Expected output will show the stack's state after various operations, including:
 * - Stack overflow message when pushing beyond `MAX_SIZE`.
 * - The last element (9) when peeking.
 * - Elements being popped in reverse order of insertion (9, 8, then 8 again due to undo, 7, 6, 5, 4, 3, 2, 1).
 * - Stack underflow message when popping from an empty stack.
 */
// Create a new instance of the Stack class
const stack = new Stack<number>()

// Demonstrate pushing elements onto the stack
// Elements will be stored in LIFO (Last In, First Out) order
stack.push(1)   // Bottom of stack
stack.push(2)
stack.push(3)
stack.push(4)
stack.push(5)
stack.push(6)
stack.push(7)
stack.push(8)
stack.push(9)   // This will be the last element that fits (MAX_SIZE = 9)
stack.push(10)  // This will cause a "stack overflow" error

// log the whole stack
console.log(stack)
// log the last element in the stack
console.log('last element: ', stack.peek())

// Demonstrate popping elements from the stack
// Elements will be removed in reverse order (LIFO): 9, 8, 7, 6, 5, 4, 3, 2, 1
console.log(stack.pop())  // Should print: 9
console.log(stack.pop())  // Should print: 8
stack.undo()              // will undo the last pop
console.log(stack.pop())  // Should print: 8
console.log(stack.pop())  // Should print: 7
console.log(stack.pop())  // Should print: 6
console.log(stack.pop())  // Should print: 5
console.log(stack.pop())  // Should print: 4
console.log(stack.pop())  // Should print: 3
console.log(stack.pop())  // Should print: 2
console.log(stack.pop())  // Should print: 1
console.log(stack.pop())  // This will cause a "stack underflow" error (stack is empty)

/**
 * Demonstration of Stack usage with strings.
 * 
 * This example illustrates the `Stack` class operations using string elements.
 * It demonstrates:
 * 1. Pushing three string elements ('a', 'b', 'c') onto the stack.
 * 2. Logging the entire stack's state after pushing.
 * 3. Popping all elements in LIFO order.
 * 
 * Expected output:
 * - The stack will contain ['a', 'b', 'c'] with 'c' being the top element after pushes.
 * - Pop operations will return: 'c', then 'b', then 'a'.
 */
const stack2 = new Stack<string>()

stack2.push('a')
stack2.push('b')
stack2.push('c')

console.log(stack2)

console.log(stack2.pop())
console.log(stack2.pop())
console.log(stack2.pop())
