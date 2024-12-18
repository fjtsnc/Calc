document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');
    const buttons = document.querySelector('.buttons');

    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    buttons.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const value = target.value;

            if (!isNaN(value)) {
                // 数字が押された場合
                currentInput += value;
                display.value = currentInput;
            } else if (value === 'C') {
                // クリアボタンが押された場合
                currentInput = '';
                operator = '';
                firstOperand = null;
                display.value = '';
            } else if (value === '=') {
                // イコールが押された場合
                if (firstOperand !== null && operator && currentInput) {
                    const secondOperand = parseFloat(currentInput);
                    const result = calculate(firstOperand, secondOperand, operator);
                    display.value = result;
                    currentInput = '';
                    operator = '';
                    firstOperand = null;
                }
            } else {
                // 演算子が押された場合
                if (currentInput) {
                    firstOperand = parseFloat(currentInput);
                    operator = value;
                    currentInput = '';
                }
            }
        }
    });

    function calculate(a, b, op) {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '×':
                return a * b;
            case '÷':
                return a / b;
            default:
                return 0;
        }
    }
});
