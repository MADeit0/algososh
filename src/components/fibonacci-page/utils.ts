/**
 * Алгоритм генерации последовательности чисел Фибоначчи и обновления состояния компонента React
 *
 * @export
 * @param {React.Dispatch<React.SetStateAction<number[]>>} setFibArray Функция React хука для обновления состояния с последовательностью Фибоначчи
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsLoader Функция React хука для установки состояния загрузки
 * @param {number} [number=0] Количество чисел в последовательности Фибоначчи
 * @param {React.MutableRefObject<NodeJS.Timer | null>} intervalRef Переменная хука useRef храняящая id интервала
 */
export const getFibonacci = (
  setFibArray: React.Dispatch<React.SetStateAction<number[]>>,
  setIsLoader: React.Dispatch<React.SetStateAction<boolean>>,
  number: number = 0,
  intervalRef: React.MutableRefObject<NodeJS.Timer | null>
) => {
  // Проверяем, что n положительное число
  if (number <= 0) {
    setIsLoader(false);
    return;
  }
  //Текущее число Фибоначчи.
  let previousNumber = 0;

  //Следующее число Фибоначчи.
  let currentNumber = 1;

  let index = 0;

  intervalRef.current = setInterval(() => {
    // Проверяем, достигнут ли заданный предел чисел Фибоначч
    if (index > number) {
      setIsLoader(false);
      clearInterval(intervalRef.current as NodeJS.Timer);
      return;
    }

    // Высчитываем следующее число Фибоначчи и обновляем текущее и предыдущее число
    [previousNumber, currentNumber] = [
      previousNumber + currentNumber,
      previousNumber,
    ];
    // Добавляем число Фибоначи в массив
    setFibArray((prev) => [...prev, previousNumber]);

    index++;
  }, 500);
};
