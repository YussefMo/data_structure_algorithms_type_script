const MAX_SIZE = 9

class Stack {
  topLevel: number 
  length: number
  constructor() {
    this.topLevel = -1
  }
  push(value: number) {
    if (this.topLevel >= MAX_SIZE - 1) {
      console.error('stack overflow')
      return
    } else {
      this.topLevel++
      stack[this.topLevel] = value
    }
  }
  pop() {
    if (this.topLevel < 0) {
      console.error('stack underflow')
      return
    } else {
      const value = stack[this.topLevel]
      this.topLevel--
      return value
    }
  }
}

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
stack.push(5)
stack.push(6)
stack.push(7)
stack.push(8)
stack.push(9)
stack.push(10)

console.log('last element: ', stack[stack.topLevel])

console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
