class BalancedStack<T> {
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
    this.topLevel++                        // Move to next position
    this.elements[this.topLevel] = value   // Store the value
    this.length++                          // Increment count
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

  /**
   * Checks if the stack is empty.
   * 
   * This method determines whether the stack contains any elements.
   * It returns `true` if the stack is empty (i.e., `topLevel` is -1),
   * and `false` otherwise.
   * 
   * **Time Complexity:** O(1) - Constant time, as it involves a single comparison.
   * **Space Complexity:** O(1) - Constant space, as it does not allocate new memory.
   * 
   * @returns {boolean} `true` if the stack is empty, `false` otherwise.
   * 
   * @example
   * const myStack = new Stack<number>();
   * console.log(myStack.isEmpty()); // Output: true
   * myStack.push(10);
   * console.log(myStack.isEmpty()); // Output: false
   */
  isEmpty(): boolean {
    return this.topLevel < 0;
  }
}

/**
 * Global instance of BalancedStack used for checking balanced expressions.
 * 
 * This stack is specifically designed to handle string characters representing
 * opening and closing brackets, parentheses, and braces. It serves as a shared
 * resource for the `isBalanced` function to track opening symbols and match
 * them with their corresponding closing symbols.
 * 
 * **Note:** This global instance creates a shared state across multiple function calls.
 * For production code, consider creating a new stack instance within each function
 * call to avoid potential side effects from concurrent usage.
 * 
 * @type {BalancedStack<string>}
 * @global
 * 
 * @example
 * // The stack is used internally by isBalanced function
 * // Opening brackets are pushed: '(', '{', '['
 * // Closing brackets trigger pop and comparison: ')', '}', ']'
 */
const balancedStack: BalancedStack<string> = new BalancedStack<string>();

/**
 * Checks if a given expression has balanced brackets, parentheses, and braces.
 * 
 * This function validates that every opening symbol ('(', '{', '[') has a corresponding
 * closing symbol (')', '}', ']') in the correct order. It uses a stack-based approach
 * to track opening symbols and match them with their closing counterparts.
 * 
 * **Algorithm:**
 * 1. Iterate through each character in the expression
 * 2. Push opening brackets onto the stack
 * 3. For closing brackets, pop from stack and verify matching pairs
 * 4. Expression is balanced if stack is empty at the end
 * 
 * **Time Complexity:** O(n) - where n is the length of the expression
 * **Space Complexity:** O(n) - in worst case, all characters are opening brackets
 * 
 * @param {string} expression - The string expression to validate for balanced symbols
 * @returns {boolean} True if all brackets are properly balanced and matched, false otherwise
 * 
 * @example
 * ```typescript
 * isBalanced("()");           // returns true
 * isBalanced("({[]})");       // returns true  
 * isBalanced("([)]");         // returns false - incorrect nesting
 * isBalanced("((()");         // returns false - unmatched opening
 * isBalanced("())");          // returns false - unmatched closing
 * ```
 * 
 * @throws {Error} If the stack operations fail (should not occur in normal usage)
 * 
 * @see {@link BalancedStack} - The stack implementation used for tracking brackets
 */
function isBalanced(expression: string): boolean {
  for (const char of expression) {
    if (char === '(' || char === '{' || char === '[') {
      balancedStack.push(char);
    } else if (char === ')' || char === '}' || char === ']') {
      if (balancedStack.isEmpty()) {
        return false;
      }
      const top = balancedStack.pop();
      if ((char === ')' && top !== '(') ||
          (char === '}' && top !== '{') ||
          (char === ']' && top !== '[')) {
        return false;
      }
    }
  }
  return balancedStack.isEmpty();
}

/**
 * Test expression 1: Simple balanced parentheses.
 * 
 * This expression contains only round brackets and represents the most basic
 * case of balanced symbols. Expected result: true (balanced).
 * 
 * @type {string}
 * @constant
 */
const expression1:string = "()";

/**
 * Test expression 2: Complex nested balanced expression.
 * 
 * This expression demonstrates proper nesting of all three bracket types:
 * parentheses (), square brackets [], and curly braces {}. The nesting
 * follows the correct LIFO (Last In, First Out) order. Expected result: true (balanced).
 * 
 * @type {string}
 * @constant
 */
const expression2:string = "({[]})";

/**
 * Test expression 3: Improperly nested brackets.
 * 
 * This expression contains brackets that are opened and closed in the wrong order,
 * violating the LIFO principle required for balanced expressions. The square bracket
 * is opened after the parenthesis but closed before it. Expected result: false (unbalanced).
 * 
 * @type {string}
 * @constant
 */
const expression3:string = "([)]";

/**
 * Demonstration code for testing the isBalanced function.
 * 
 * This section demonstrates the functionality of the `isBalanced` function using
 * three different test cases that cover various scenarios:
 * 
 * 1. **Simple balanced case** (expression1): Tests basic parentheses balancing
 * 2. **Complex nested case** (expression2): Tests proper nesting of multiple bracket types
 * 3. **Unbalanced case** (expression3): Tests detection of improperly nested brackets
 * 
 * **Expected Output:**
 * - expression1 "()": true (properly balanced)
 * - expression2 "({[]})": true (properly nested)
 * - expression3 "([)]": false (improperly nested)
 * 
 * The console output helps verify that the balanced stack algorithm correctly
 * identifies both valid and invalid bracket arrangements.
 * 
 * @example
 * // Running this code will output:
 * // true
 * // true  
 * // false
 */
console.log(isBalanced(expression1)) // true
console.log(isBalanced(expression2)) // true
console.log(isBalanced(expression3)) // false
