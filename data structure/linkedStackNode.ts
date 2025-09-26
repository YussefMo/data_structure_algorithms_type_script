/**
 * LinkedStackNode - A node class for implementing a linked list-based stack
 * 
 * This class represents a single node in a linked stack data structure.
 * Each node contains a value of generic type T and a reference to the next node.
 * 
 * Key characteristics:
 * - Generic type T allows storing any data type
 * - Contains a value and a pointer to the next node
 * - Forms the building blocks of a linked stack
 * 
 * @template T The type of value stored in this node
 */
class LinkedStackNode<T> {
  /** The value stored in this node */
  value: T;
  
  /** Reference to the next node in the stack (null if this is the bottom node) */
  next: LinkedStackNode<T> | null;
  
  /**
   * Creates a new LinkedStackNode
   * 
   * @param value - The value to store in this node
   */
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

/**
 * LinkedStack - A generic stack implementation using linked nodes
 * 
 * This class implements a stack data structure using a linked list approach.
 * Unlike array-based stacks, linked stacks have dynamic size and don't have
 * a predefined maximum capacity (limited only by available memory).
 * 
 * Key advantages of linked stack:
 * - Dynamic size - grows and shrinks as needed
 * - No memory waste - allocates exactly what's needed
 * - No stack overflow (except memory exhaustion)
 * - Efficient push/pop operations - O(1) time complexity
 * 
 * Key characteristics:
 * - LIFO (Last In, First Out) principle
 * - Head points to the top of the stack
 * - Tail points to the bottom of the stack (optional for stack operations)
 * - Size tracks the number of elements
 * 
 * @template T The type of elements stored in the stack
 * 
 * @example
 * // Create a stack for numbers
 * const numberStack = new LinkedStack<number>()
 * numberStack.push(1)
 * numberStack.push(2)
 * console.log(numberStack.pop()) // Output: 2
 * 
 * @example
 * // Create a stack for strings
 * const stringStack = new LinkedStack<string>()
 * stringStack.push("hello")
 * stringStack.push("world")
 * console.log(stringStack.peek()) // Output: "world"
 */
class LinkedStack<T> {
  /** Reference to the top node of the stack (most recently added) */
  head: LinkedStackNode<T> | null;
  
  /** Reference to the bottom node of the stack (first added) */
  tail: LinkedStackNode<T> | null;
  
  /** Current number of elements in the stack */
  size: number;
  private _poppedHistory: T[];

  /**
   * Creates a new empty LinkedStack
   */
  constructor() {
    this.head = null;    // No elements initially
    this.tail = null;    // No elements initially
    this.size = 0;       // Start with zero elements
    this._poppedHistory = []; // Initialize history for undo functionality
  }
  /**
   * Push operation - Add an element to the top of the stack
   * 
   * Creates a new node with the given value and adds it to the top of the stack.
   * The new node becomes the new head, and its next pointer points to the
   * previous head (if any).
   * 
   * Time Complexity: O(1) - constant time operation
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param value - The value of type T to be added to the stack
   * 
   * @example
   * const stack = new LinkedStack<number>()
   * stack.push(1)  // Stack: [1]
   * stack.push(2)  // Stack: [2, 1] (2 is now on top)
   */
  push(value: T): void {
    const node = new LinkedStackNode(value)  // Create new node
    
    if (this.head === null) {
      // Stack is empty - new node becomes both head and tail
      this.head = node
      this.tail = node
    } else {
      // Stack has elements - add new node to the top
      node.next = this.head  // Point new node to current head
      this.head = node       // Make new node the head
    }
    this.size++  // Increment the size counter
  }
  /**
   * Pop operation - Remove and return the top element from the stack
   * 
   * Removes the top node (head) from the stack and returns its value.
   * The next node becomes the new head. If the stack becomes empty,
   * both head and tail are set to null.
   * 
   * Time Complexity: O(1) - constant time operation
   * Space Complexity: O(1) - no additional space needed
   * 
   * @returns The value of the removed top element, or null if stack is empty
   * 
   * @example
   * const stack = new LinkedStack<number>()
   * stack.push(1)
   * stack.push(2)
   * console.log(stack.pop()) // Output: 2 (removes and returns top element)
   * console.log(stack.pop()) // Output: 1
   * console.log(stack.pop()) // Output: null (stack is empty)
   */
  pop(): T | null {
    if (this.head === null) {
      // Stack is empty - cannot pop
      console.error('stack underflow')
      return null
    }
    
    const node = this.head           // Get the top node
    this.head = node.next            // Move head to next node
    node.next = null                 // Detach the node completely (good practice)
    this.size--                      // Decrement the size counter
    this._poppedHistory.push(node.value); // Store popped element for undo

    // If stack becomes empty after pop, update tail to null
    if (this.head === null) {
      this.tail = null
    }
    
    return node.value                // Return the value from the removed node
  }
  /**
   * Peek operation - View the top element without removing it
   * 
   * Returns the value of the top element (head) without modifying the stack.
   * This is useful when you want to check what's on top of the stack
   * without actually removing it.
   * 
   * Time Complexity: O(1) - constant time operation
   * Space Complexity: O(1) - no additional space needed
   * 
   * @returns The value of the top element, or null if stack is empty
   * 
   * @example
   * const stack = new LinkedStack<string>()
   * stack.push("first")
   * stack.push("second")
   * console.log(stack.peek())  // Output: "second" (stack unchanged)
   * console.log(stack.size)    // Output: 2 (size remains the same)
   */
  peek(): T | null {
    if (this.head === null) {
      // Stack is empty - nothing to peek at
      console.error('stack underflow')
      return null
    } else {
      // Return the value of the top element without removing it
      return this.head.value
    }
  }
  /**
   * @method undo
   * @description
   *   Reverts the last `pop` operation by pushing the last popped element back onto the stack.
   *   This method provides a true undo functionality for the `pop` operation.
   *   If there are no elements in the undo history (i.e., no `pop` operations have occurred or all have been undone),
   *   this method will do nothing.
   *
   * @returns {T | undefined} The element that was undone (re-pushed onto the stack), or `undefined` if no undo operation was performed.
   * @complexity
   *   Time: O(1) - Constant time operation, as it involves array manipulation (pop from history) and a stack push.
   *   Space: O(1) - Constant space operation, as it only manipulates existing data structures.
   * @example
   *   const stack = new LinkedStack<number>();
   *   stack.push(10);
   *   stack.push(20);
   *   console.log(stack.pop()); // Output: 20
   *   console.log(stack.peek()); // Output: 10
   *   stack.undo(); // Undoes the last pop, 20 is pushed back
   *   console.log(stack.peek()); // Output: 20
   *   console.log(stack.size);   // Output: 2
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
 * Demonstration of LinkedStack Usage
 * 
 * This section demonstrates the practical usage of the LinkedStack data structure.
 * It shows how elements are added (pushed) and removed (popped) following the
 * LIFO (Last In, First Out) principle.
 * 
 * The demonstration includes:
 * 1. Creating a new LinkedStack instance
 * 2. Pushing multiple elements onto the stack
 * 3. Displaying the stack state
 * 4. Popping all elements and observing the order
 * 5. Attempting to pop from an empty stack (underflow scenario)
 */

// Create a new LinkedStack instance for numbers
const linkedStack = new LinkedStack<number>()

// Push elements onto the stack (1 through 10)
// Each new element becomes the new top of the stack
linkedStack.push(1)   // Stack: [1] (bottom to top)
linkedStack.push(2)   // Stack: [1, 2]
linkedStack.push(3)   // Stack: [1, 2, 3]
linkedStack.push(4)   // Stack: [1, 2, 3, 4]
linkedStack.push(5)   // Stack: [1, 2, 3, 4, 5]
linkedStack.push(6)   // Stack: [1, 2, 3, 4, 5, 6]
linkedStack.push(7)   // Stack: [1, 2, 3, 4, 5, 6, 7]
linkedStack.push(8)   // Stack: [1, 2, 3, 4, 5, 6, 7, 8]
linkedStack.push(9)   // Stack: [1, 2, 3, 4, 5, 6, 7, 8, 9]
linkedStack.push(10)  // Stack: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Display the current state of the stack
console.log(linkedStack)  // Shows the entire stack structure

// Pop elements from the stack - they come out in reverse order (LIFO)
// Expected output: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
console.log(linkedStack.pop())  // Output: 10 (most recently added)
console.log(linkedStack.pop())  // Output: 9
console.log(linkedStack.pop())  // Output: 8
console.log(linkedStack.pop())  // Output: 7
console.log(linkedStack.pop())  // Output: 6
linkedStack.undo()              // will undo the last pop
console.log(linkedStack.pop())  // Output: 6
console.log(linkedStack.pop())  // Output: 5
console.log(linkedStack.pop())  // Output: 4
console.log(linkedStack.pop())  // Output: 3
console.log(linkedStack.pop())  // Output: 2
console.log(linkedStack.pop())  // Output: 1 (first element added, last to be removed)
console.log(linkedStack.pop())  // Output: null + "stack underflow" error (stack is empty)

// Display the final state of the stack (should be empty)
console.log(linkedStack)  // Shows empty stack: head=null, tail=null, size=0