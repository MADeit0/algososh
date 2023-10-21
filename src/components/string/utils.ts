import { ElementStates } from "../../types/element-states";
import { swap } from "../utils/utils";

/**
 *Алгоритм разворота строки
 *
 * @export
 * @param {string} str Входящая строка символов
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsSorting функция React хука указывающий флаг выполнения функции сортировки
 * @param {React.Dispatch<React.SetStateAction<string[]>>} setReversedStr функция React хука указывающий массив переворачиваемых символов
 * @param {React.Dispatch<React.SetStateAction<ElementStates[]>>} setCircleStates функция React хука указывающий массив состояния цвета кругов
 */

export const reverseString = (
  str: string,
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>,
  setReversedStr: React.Dispatch<React.SetStateAction<string[]>>,
  setCircleStates: React.Dispatch<React.SetStateAction<ElementStates[]>>,
  intervalRef: React.MutableRefObject<NodeJS.Timer | null>
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

  intervalRef.current = setInterval(() => {
    if (start >= end) {
      // Проверяем, если массив имеет нечетную длину
      if (start === end) {
        setCircleStates((prevCircleStates) => {
          const newCircleStates = [...prevCircleStates];
          newCircleStates[start] = ElementStates.Modified;
          return newCircleStates;
        });
      }
      setIsSorting(false);
      clearInterval(intervalRef.current as NodeJS.Timer);
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
