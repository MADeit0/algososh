import { ElementStates } from "../../types/element-states";

/**
 *Алгоритм разворота строки
 *
 * @export
 * @param {string} str Входящая строка символов
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsSorting функция React хука указывающий флаг выполнения функции сортировки
 * @param {React.Dispatch<React.SetStateAction<string[]>>} setReversedStr функция React хука указывающий массив переворачиваемых символов
 * @param {React.Dispatch<React.SetStateAction<ElementStates[]>>} setCircleStates функция React хука указывающий массив состояния цвета кругов
 * @param {boolean} isSorting Аргумент хранящий флаг выполнения функции сортировки
 */

export const reverseString = (
  str: string,
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>,
  setReversedStr: React.Dispatch<React.SetStateAction<string[]>>,
  setCircleStates: React.Dispatch<React.SetStateAction<ElementStates[]>>,
  isSorting: boolean
) => {
  // Преобразуем строку в массив символов
  let arr = str.split("");
  // Инициализируем переменные для индексов начала и конца подстроки
  let start = 0;
  let end = arr.length - 1;

  setReversedStr([...arr]);

  // Указываем начальное состояние первого и последнего круга
  setCircleStates((prevCircleStates) => {
    const newCircleStates = [...prevCircleStates];
    newCircleStates[start] = newCircleStates[end] = ElementStates.Changing;
    return newCircleStates;
  });

  const interval = setInterval(() => {
    if (start >= end || !isSorting) {
      // Проверяем, если массив имеет нечетную длину
      if (start === end) {
        setCircleStates((prevCircleStates) => {
          const newCircleStates = [...prevCircleStates];
          newCircleStates[start] = ElementStates.Modified;
          return newCircleStates;
        });
      }
      setIsSorting(false);
      clearInterval(interval);
      return;
    }
    // Обновляем состояния кругов
    setCircleStates((prevCircleStates) => {
      const newCircleStates = [...prevCircleStates];
      newCircleStates[start + 1] = newCircleStates[end - 1] =
        ElementStates.Changing;
      newCircleStates[start] = newCircleStates[end] = ElementStates.Modified;
      return newCircleStates;
    });

    // Меняем местами символы
    swap(arr, start, end);

    // Обновляем состояние массива символов
    setReversedStr([...arr]);

    // Увеличиваем индекс начала и уменьшаем индекс конца
    start++;
    end--;
  }, 1000);
};

/**
 *Функция меняющая местами символы в массиве
 *
 * @param {string[]} arr массив символов
 * @param {number} firstIndex индекс первого елемента
 * @param {number} secondIndex индекс второго элемента
 */
const swap = (arr: string[], firstIndex: number, secondIndex: number) => {
  [arr[secondIndex], arr[firstIndex]] = [arr[firstIndex], arr[secondIndex]];
};
