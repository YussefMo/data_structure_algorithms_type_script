// Maximum capacity of the stack - prevents memory overflow
const MAX_SIZE = 9

/**
 * Stack Data Structure Implementation
 * 
 * A stack is a linear data structure that follows the Last In, First Out (LIFO) principle.
 * Elements are added and removed from the same end, called the "top" of the stack.
 * 
 * Common operations:
 * - push(): Add an element to the top
 * - pop(): Remove and return the top element
 */
class Stack {
  // Internal array to store stack elements
  private elements: number[]
  
  // Index of the top element (-1 means empty stack)
  topLevel: number 
  
  // Current number of elements in the stack
  length: number
  
  // to save last element for undo method
  element: number
  
  /**
   * Constructor - Initialize an empty stack
   */
  constructor() {
    this.elements = []      // Initialize empty array to store elements
    this.topLevel = -1      // -1 indicates empty stack
    this.length = 0         // Start with 0 elements
  }
  
  /**
   * Push operation - Add an element to the top of the stack
   * @param value - The number to be added to the stack
   */
  push(value: number) {
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
   * Pop operation - Remove and return the top element from the stack
   * @returns The removed element, or undefined if stack is empty
   */
  pop() {
    // Check for stack underflow (when stack is empty)
    if (this.topLevel < 0) {
      console.error('stack underflow')
      return
    } else {
      const value = this.elements[this.topLevel]  // Get the top element
      this.element = value                        // save the last deleted element
      this.topLevel--                             // Move pointer down
      this.length--                               // Decrement count
      return value                                // Return the removed element
    }
  }
  /**
   * Peek operation - View the top element without removing it
   * 
   * This method allows you to see what's on top of the stack without
   * modifying the stack structure. Useful for checking the next element
   * that would be returned by pop() without actually removing it.
   * 
   * @returns The top element of the stack, or undefined if stack is empty
   */
  peek() {
    // Check if stack is empty
    if (this.topLevel < 0) {
      console.error('stack underflow')
      return
    } else {
      // Return the top element without removing it
      return this.elements[this.topLevel]
    }
  }
  /**
   * undo operation - Restore the last deleted element to the stack
   * @returns The restored element, or undefined if no element was deleted
   */
  undo() {
    if (this.element) {
      this.push(this.element)
    } else {
      console.error('no element was deleted')
    }
  }
}

// Create a new instance of the Stack class
const stack = new Stack()

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
