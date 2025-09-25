// Maximum capacity of the stack - prevents memory overflow
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
  // Internal array to store stack elements of type T
  private elements: T[]
  
  // Index of the top element (-1 means empty stack)
  topLevel: number 
  
  // Current number of elements in the stack
  length: number
  
  // Stores the last popped element for undo functionality
  private element: T | undefined
  
  /**
   * Constructor - Initialize an empty stack
   */
  constructor() {
    this.elements = []      // Initialize empty array to store elements
    this.topLevel = -1      // -1 indicates empty stack
    this.length = 0         // Start with 0 elements
    this.element = undefined // No element has been popped yet
  }
  
  /**
   * Push operation - Add an element to the top of the stack
   * @param value - The element of type T to be added to the stack
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
   * Pop operation - Remove and return the top element from the stack
   * @returns The removed element of type T, or undefined if stack is empty
   */
  pop(): T | undefined {
    // Check for stack underflow (when stack is empty)
    if (this.topLevel < 0) {
      console.error('stack underflow')
      return undefined
    } else {
      const value = this.elements[this.topLevel]  // Get the top element
      this.element = value                        // Save the last deleted element for undo
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
   * @returns The top element of type T, or undefined if stack is empty
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
   * Undo operation - Restore the last popped element to the stack
   * 
   * This method pushes back the last element that was removed by pop().
   * Can only undo the most recent pop operation.
   * 
   * @returns void
   */
  undo(): void {
    if (this.element !== undefined) {
      this.push(this.element)
      this.element = undefined  // Clear the saved element after restoring
    } else {
      console.error('no element was deleted')
    }
  }
}

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
 * Demonstration of Stack usage with strings
 * 
 * This example creates a stack of strings and shows basic operations:
 * - Pushing three string elements ('a', 'b', 'c')
 * - Logging the stack state
 * - Popping all elements in LIFO order
 * 
 * Expected output:
 * - Stack will contain ['a', 'b', 'c'] (with 'c' on top)
 * - Pop operations will return: 'c', 'b', 'a'
 */
const stack2 = new Stack<string>()

stack2.push('a')
stack2.push('b')
stack2.push('c')

console.log(stack2)

console.log(stack2.pop())
console.log(stack2.pop())
console.log(stack2.pop())
