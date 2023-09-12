import { ElementStates } from "../../types/element-states";

/**
 *Алгоритм разворота строки
 *
 * @export
 * @param {string} str Входящая строка символов
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsSorting функция React хука хронящая флаг выполнения функции сортировки
 * @param {React.Dispatch<React.SetStateAction<string[]>>} setReversedStr функция React хука хранящая массив переворачиваемых символов
 * @param {React.Dispatch<React.SetStateAction<ElementStates[]>>} setCircleStates функция React хука хранящая массив состояния цвета кругов
 */

export function reverseString(
  str: string,
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>,
  setReversedStr: React.Dispatch<React.SetStateAction<string[]>>,
  setCircleStates: React.Dispatch<React.SetStateAction<ElementStates[]>>
) {
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
      clearInterval(interval);
      return;
    }

    // Меняем местами символы
    swap(arr, start, end);

    // Обновляем состояние массива символов
    setReversedStr([...arr]);

    // Обновляем состояния кругов
    setCircleStates((prevState) => [
      ...prevState.map((_, index) => updateCircleStates(index, start, end)),
    ]);
    // Увеличиваем индекс начала и уменьшаем индекс конца
    start++;
    end--;
  }, 1000);
}

/**
 *Функция обновления состояния цвета круга
 *
 * @param {number} index индекс текущего элемента
 * @param {number} start индекс элемента справа
 * @param {number} end индекс элемента слева
 */
const updateCircleStates = (
  index: number,
  start: number,
  end: number
): ElementStates =>
  index === start || index === end
    ? ElementStates.Modified // Измененные символы
    : index === start + 1 || index === end - 1
    ? ElementStates.Changing // Символы, которые будут переворачиваться на следующем шаге
    : index < start + 1 || index > end - 1
    ? ElementStates.Modified // Измененные символы
    : ElementStates.Default;

/**
 *Функция меняющая местами символы в массиве
 *
 * @param {string[]} arr массив символов
 * @param {number} firstIndex индекс первого елемента
 * @param {number} secondIndex индекс второго элемента
 */
const swap = (arr: string[], firstIndex: number, secondIndex: number) => {

  [arr[secondIndex], arr[firstIndex]] = [arr[firstIndex],arr[secondIndex]];
};
