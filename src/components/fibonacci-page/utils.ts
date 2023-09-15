/**
 * Алгоритм генерации последовательности чисел Фибоначчи и обновления состояния компонента React
 *
 * @export
 * @param {React.Dispatch<React.SetStateAction<number[]>>} setFibArray Функция React хука для обновления состояния с последовательностью Фибоначчи
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsLoader Функция React хука для установки состояния загрузки
 * @param {number} [n=0] Количество чисел в последовательности Фибоначчи
 */
export const getFibonacci = (
  setFibArray: React.Dispatch<React.SetStateAction<number[]>>,
  setIsLoader: React.Dispatch<React.SetStateAction<boolean>>,
  n: number = 0,
  isLoader: boolean
) => {
  // Проверяем, что n положительное число
  if (n <= 0) {
    setIsLoader(false);
    return;
  }
  //Текущее число Фибоначчи.
  let previousNumber = 0;

  //Следующее число Фибоначчи.
  let currentNumber = 1;

  let index = 0;

  const interval = setInterval(() => {
    // Проверяем, достигнут ли заданный предел чисел Фибоначч
    if (index > n && !isLoader) {
      setIsLoader(false);
      clearInterval(interval);
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
