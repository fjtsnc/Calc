document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');
    const buttonsContainer = document.querySelector('.buttons');

    let currentInput = '';
    let operator = '';
    let firstOperand = null;
    let shouldResetDisplay = false;

    buttonsContainer.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const value = target.value;

            if (target.classList.contains('operator')) {
                handleOperator(value);
            } else if (target.classList.contains('equal')) {
                handleEqual();
            } else if (target.classList.contains('decimal')) {
                inputDecimal();
            } else if (target.classList.contains('zero')) {
                inputDigit(value);
            } else {
                inputDigit(value);
            }
        }
    });

    function inputDigit(digit) {
        if (shouldResetDisplay) {
            display.value = digit;
            shouldResetDisplay = false;
        } else {
            display.value = display.value === '0' ? digit : display.value + digit;
        }
        currentInput = display.value;
    }

    function inputDecimal() {
        if (shouldResetDisplay) {
            display.value = '0.';
            shouldResetDisplay = false;
        } else if (!display.value.includes('.')) {
            display.value += '.';
        }
        currentInput = display.value;
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && shouldResetDisplay) {
            operator = nextOperator;
            return;
        }

        if (firstOperand == null && !isNaN(inputValue)) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            display.value = `${parseFloat(result.toFixed(7))}`;
            firstOperand = result;
        }

        operator = nextOperator;
        shouldResetDisplay = true;
    }

    function handleEqual() {
        const inputValue = parseFloat(currentInput);

        if (operator && !shouldResetDisplay) {
            const result = calculate(firstOperand, inputValue, operator);
            display.value = `${parseFloat(result.toFixed(7))}`;
            firstOperand = result;
            operator = '';
        }
        shouldResetDisplay = true;
    }

    function calculate(a, b, op) {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '×':
                return a * b;
            case '÷':
                return b !== 0 ? a / b : 'エラー';
            default:
                return b;
        }
    }
});
