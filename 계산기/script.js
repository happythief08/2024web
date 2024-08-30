// 화면 초기화 필요 여부를 나타내는 플래그
let shouldResetScreen = false;

// 계산기 버튼을 클릭했을 때 발생하는 이벤트 처리
document.querySelector('.calculator-buttons').addEventListener('click', function(event) {
    const target = event.target; // 클릭된 버튼
    const screen = document.getElementById('screen'); // 화면 요소 선택
    const buttonValue = target.value; // 클릭된 버튼의 값

    // 클릭된 요소가 버튼이 아닌 경우 무시
    if (!target.matches('button')) return;

    // 화면 초기화가 필요하고 클릭된 버튼이 연산자가 아닌 경우 화면을 초기화
    if (shouldResetScreen && !target.classList.contains('operator')) {
        screen.value = '';
        shouldResetScreen = false;
    }

    switch (buttonValue) {
        case '=':
            try {
                const result = calculate(screen.value); // 계산 수행
                screen.value = result;
                shouldResetScreen = true; // 다음 입력 시 화면 초기화
            } catch {
                screen.value = 'Error'; // 오류 발생 시
                shouldResetScreen = true;
            }
            break;
        case 'AC':
            screen.value = ''; // 화면 초기화
            break;
        default:
            screen.value += buttonValue; // 버튼 값 화면에 추가
            break;
    }
});

// 계산식을 처리하는 함수
function calculate(expression) {
    // 공백 제거
    expression = expression.replace(/\s+/g, '');

    // 숫자와 연산자 분리
    const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/|\%)/g);

    // 잘못된 입력 처리
    if (!tokens) return 'Error';

    // 첫 번째 숫자를 초기값으로 설정
    let result = parseFloat(tokens[0]);

    // 나머지 연산을 순차적으로 처리
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNumber = parseFloat(tokens[i + 1]);

        // 다음 값이 숫자가 아닌 경우 에러 처리
        if (isNaN(nextNumber)) return 'Error';

        // 연산자에 따라 계산 수행
        switch (operator) {
            case '+':
                result += nextNumber;
                break;
            case '-':
                result -= nextNumber;
                break;
            case '*':
                result *= nextNumber;
                break;
            case '/':
                if (nextNumber === 0) return 'Error'; // 0으로 나누기 에러 처리
                result /= nextNumber;
                break;
            case '%':
                // % 연산: result * (nextNumber / 100)
                result = result * (nextNumber / 100);
                break;
            default:
                return 'Error';
        }
    }

    return result;
}
