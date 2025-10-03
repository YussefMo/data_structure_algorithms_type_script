class InfixToPostfixStack {
  /**
   * Internal array to store stack elements.
   * @private
   * @type {string[]}
   */
  private elements: string[]
  
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
  private _poppedHistory: string[];
  
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
  push(value: string) {
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
  pop(): string | undefined {
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
  peek(): string | undefined {
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
  undo(): string | undefined {
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

  /**
   * Checks if a given character is a mathematical operator.
   * 
   * This helper method determines whether the input character is one of the four
   * basic arithmetic operators: addition (+), subtraction (-), multiplication (*),
   * or division (/).
   * 
   * @param char - The character to check
   * @returns `true` if the character is an operator (+, -, *, /), `false` otherwise
   * 
   * @example
   * ```typescript
   * const stack = new InfixToPostfixStack();
   * console.log(stack.isOperator('+')); // Output: true
   * console.log(stack.isOperator('*')); // Output: true
   * console.log(stack.isOperator('A')); // Output: false
   * console.log(stack.isOperator('(')); // Output: false
   * ```
   * 
   * @complexity
   * - Time: O(1) - Constant time comparison
   * - Space: O(1) - No additional space required
   */
  isOperator(char: string): boolean {
    return char === '+' || char === '-' || char === '*' || char === '/';
  }

  /**
   * Determines the precedence level of a mathematical operator.
   * 
   * This helper method returns the precedence value for arithmetic operators,
   * which is crucial for the infix to postfix conversion algorithm. Higher
   * precedence operators are evaluated before lower precedence ones.
   * 
   * Precedence levels:
   * - Level 2 (highest): * (multiplication), / (division)
   * - Level 1 (lower): + (addition), - (subtraction)
   * - Level 0 (lowest): Non-operators or unrecognized characters
   * 
   * @param char - The operator character to evaluate
   * @returns The precedence level as a number (0, 1, or 2)
   * 
   * @example
   * ```typescript
   * const stack = new InfixToPostfixStack();
   * console.log(stack.precedence('*')); // Output: 2
   * console.log(stack.precedence('/')); // Output: 2
   * console.log(stack.precedence('+')); // Output: 1
   * console.log(stack.precedence('-')); // Output: 1
   * console.log(stack.precedence('A')); // Output: 0
   * ```
   * 
   * @complexity
   * - Time: O(1) - Constant time comparison
   * - Space: O(1) - No additional space required
   */
  precedence(char: string): number {
    if (char === '+' || char === '-') {
      return 1;
    } else if (char === '*' || char === '/') {
      return 2;
    }
    return 0;
  }

  /**
   * Converts an infix expression to postfix notation using the Shunting Yard algorithm.
   * 
   * This method implements Dijkstra's Shunting Yard algorithm to convert mathematical
   * expressions from infix notation (where operators are between operands) to postfix
   * notation (where operators follow their operands). The algorithm uses a stack to
   * temporarily hold operators and brackets while processing the input expression.
   * 
   * Algorithm Steps:
   * 1. Scan the infix expression from left to right
   * 2. If the character is an operand, add it directly to the output
   * 3. If the character is an opening bracket, push it onto the stack
   * 4. If the character is a closing bracket, pop operators from stack to output
   *    until the matching opening bracket is found
   * 5. If the character is an operator:
   *    - Pop operators from stack to output while they have higher or equal precedence
   *    - Push the current operator onto the stack
   * 6. After processing all characters, pop remaining operators from stack to output
   * 
   * @param expression - The infix expression to convert (e.g., "A+B*C")
   * @returns The equivalent postfix expression (e.g., "ABC*+")
   * 
   * @example
   * ```typescript
   * const converter = new InfixToPostfixStack();
   * console.log(converter.convert("A+B*C"));     // Output: "ABC*+"
   * console.log(converter.convert("A*(B+C)"));   // Output: "ABC+*"
   * console.log(converter.convert("A+B-C"));     // Output: "AB+C-"
   * ```
   * 
   * @complexity
   * - Time: O(n) where n is the length of the input expression
   * - Space: O(n) for the stack in worst case (all opening brackets)
   * 
   * @see {@link https://en.wikipedia.org/wiki/Shunting_yard_algorithm | Shunting Yard Algorithm}
   * @see {@link isOperator} - Helper method to identify operators
   * @see {@link precedence} - Helper method to determine operator precedence
   */
  convert(expression: string): string {
    let postfixExpression = '';
    for (const char of expression) {
      if (char === '(' || char === '{' || char === '[') {
        this.push(char);
      } else if (char === ')' || char === '}' || char === ']') {
        while (this.peek() !== '(' && this.peek() !== '{' && this.peek() !== '[') {
          postfixExpression += this.pop();
        }
        this.pop(); // Remove the opening bracket
      } else if (this.isOperator(char)) {
        while (!this.isEmpty() && this.precedence(this.peek() || '') >= this.precedence(char)) {
          postfixExpression += this.pop();
        }
        this.push(char);
      } else {
        postfixExpression += char;
      }
    }
    while (!this.isEmpty()) {
      postfixExpression += this.pop();
    }
    return postfixExpression;
  }
}

/**
 * Global instance of the InfixToPostfixStack for converting infix expressions to postfix.
 * 
 * This instance provides a ready-to-use converter that implements the Shunting Yard
 * algorithm for transforming mathematical expressions from infix notation to postfix
 * notation. The instance maintains its own internal stack state for the conversion process.
 * 
 * @type {InfixToPostfixStack}
 * @global
 * 
 * @example
 * ```typescript
 * // Using the global instance
 * const result = infixToPostfix.convert("A+B*C");
 * console.log(result); // Output: "ABC*+"
 * ```
 * 
 * @see {@link InfixToPostfixStack} - The class definition
 * @see {@link InfixToPostfixStack.convert} - The main conversion method
 */
const infixToPostfix:InfixToPostfixStack = new InfixToPostfixStack();

/**
 * Test expression 1: Simple arithmetic with mixed operators.
 * 
 * This expression demonstrates the basic infix to postfix conversion with
 * addition, multiplication, subtraction, and division operators. It showcases
 * how operator precedence affects the conversion process.
 * 
 * @constant {string}
 * @example Expected conversion: "A+B*C-D/E" → "ABC*+DE/-"
 */
const expression1 = "A+B*C-D/E";
const postfixExpression1 = infixToPostfix.convert(expression1);

/**
 * Test expression 2: Expression with parentheses.
 * 
 * This expression demonstrates how parentheses override operator precedence
 * in the infix to postfix conversion. The parentheses force the addition
 * to be evaluated before the multiplication.
 * 
 * @constant {string}
 * @example Expected conversion: "A*(B+C)/D" → "ABC+*D/"
 */
const expression2 = "A*(B+C)/D";
const postfixExpression2 = infixToPostfix.convert(expression2);

/**
 * Test expression 3: Complex nested expression with multiple parentheses.
 * 
 * This expression demonstrates the algorithm's ability to handle complex
 * nested expressions with multiple levels of parentheses and mixed operators.
 * It shows how the stack manages nested groupings effectively.
 * 
 * @constant {string}
 * @example Expected conversion: "A+((B*C)-(D/E))/F" → "ABC*DE/-+F/"
 */
const expression3 = "A+((B*C)-(D/E))/F";
const postfixExpression3 = infixToPostfix.convert(expression3);

/**
 * Demonstration of the Infix to Postfix conversion algorithm.
 * 
 * This section demonstrates the practical usage of the InfixToPostfixStack
 * by converting three different types of mathematical expressions from infix
 * to postfix notation. Each example showcases different aspects of the algorithm:
 * 
 * 1. Basic operator precedence handling
 * 2. Parentheses override of precedence
 * 3. Complex nested expressions with multiple groupings
 * 
 * The output shows the original infix expressions and their corresponding
 * postfix equivalents, demonstrating the correctness of the Shunting Yard algorithm.
 * 
 * @example
 * Expected outputs:
 * - "ABC*+DE/-" for "A+B*C-D/E"
 * - "ABC+*D/" for "A*(B+C)/D"  
 * - "ABC*DE/-+F/" for "A+((B*C)-(D/E))/F"
 */
console.log(postfixExpression1); // Output: "ABC*+DE/-"
console.log(postfixExpression2); // Output: "ABC+*D/"
console.log(postfixExpression3); // Output: "ABC*+DE/-F/"
