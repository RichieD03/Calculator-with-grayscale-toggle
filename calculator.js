// calculator js


//seting up calculator functions
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }
    
//clear the calculator diplay of both operands
  clear() {
  this.currentOperand = ''
  this.previousOperand = ''
  this.operation = undefined
  }

  //delete one number per click
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1)
  }

  appendNumber(number) {
    //only allows one decimal per operand
    if (number === '.' && this.currentOperand.includes('.')) 
    return //stops function
    this.currentOperand = this.currentOperand.toString() + number.toString()
    //converts current operand to string
  }

  chooseOperation(operation) {
    if (this.currentOperand == '') 
    return
    //if blank do nothing
    if (this.previousOperand !== '') {
      this.compute()
    } //if not blank run compute function
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  //assigns math to compute function
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current))
    return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷': 
        computation = prev / current
        break
    default:
      return  
    }
  this.currentOperand = computation
  this.operation = undefined
  this.previousOperand = ''  
  }

  //displays numbers to be calculated in a format that is understandable
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }  

  updateDisplay() {
    this.currentOperandTextElement.innerText = 
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
      `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll ('[data-number]')
const operationButtons = document.querySelectorAll ('[data-operation]')
const equalsButton = document.querySelector ('[data-equals]')
const deleteButton = document.querySelector ('[data-delete]')
const allClearButton = document.querySelector ('[data-all-clear]')
const previousOperandTextElement = document.querySelector ('[data-previous-operand]')
const currentOperandTextElement = document.querySelector ('[data-current-operand]')
const themeButtonSwitch = document.querySelector ('[theme-button]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//switch between color and Grayscale
themeButtonSwitch.addEventListener('click' , function() {
  document.body.classList.toggle('normal-theme')
})

//calling functions to operate
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber (button.innerText)
    calculator.updateDisplay()
  }) 
})

operationButtons.forEach(button => {
  button.addEventListener('click' , () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click' , button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click' , button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click' , button => {
  calculator.delete()
  calculator.updateDisplay()
})

