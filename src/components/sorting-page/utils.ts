import { ElementStates } from "../../types/element-states";
import { delay, swap } from "../utils/utils";

/**
 * Функция генерации массива со значениями от 0 до 100
 *
 * @export
 * @param {number} max максимальное количество элементов в массиве
 * @param {number} min минимальное количкство элементов в массиве
 * @return {*}  {number[]}
 */
export const randomArr = (max: number, min: number): number[] => {
  const arr = [];
  const length = Math.floor(Math.random() * (max - min + 1)) + min;

  for (let i = 0; i < length; i++) {
    const randomValue = Math.floor(Math.random() * 101);
    arr.push(randomValue);
  }
  return arr;
};

/**
 *Алгоритм Сортировки выбором c пошаговой визуализацией процесса
 *
 * @param {number[]} arr Массив с числами
 * @param {React.Dispatch<React.SetStateAction<number[]>>} setArray Функция обновления состояния массива с числами
 * @param {React.Dispatch<React.SetStateAction<ElementStates[]>>} setColumnState функция обновления состояния массива с цветами колонок
 * @param {React.MutableRefObject<boolean>} isSorting Флаг для принудительной остановки сортировки
 * @param {boolean} [reverseSort=false] Флаг для установки сортировки по возрастанию или по убыванию
 * @return {*}
 */
export const selectionSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setColumnState: React.Dispatch<React.SetStateAction<ElementStates[]>>,
  isSorting: React.MutableRefObject<boolean>,
  reverseSort: boolean = false
): Promise<void> => {
  const { Changing, Modified, Default } = ElementStates;
  const newArray = [...arr];
  setColumnState([]);

  for (let i = 0; i < newArray.length; i++) {
    if (!isSorting.current) return;

    let maxInd = i;

    setColumnState((prevColumnStates: any) =>
      updateColumnState(prevColumnStates, maxInd, Changing)
    );
    await delay(300);

    for (let j = i + 1; j < newArray.length; j++) {
      if (!isSorting.current) return;

      setColumnState((prevColumnStates: any) =>
        updateColumnState(prevColumnStates, j, Changing)
      );
      await delay(300);

      setColumnState((prevColumnStates: any) =>
        updateColumnState(prevColumnStates, j, Default)
      );

      const sortingChanged = reverseSort
        ? newArray[j] > newArray[maxInd]
        : newArray[j] < newArray[maxInd];

      if (sortingChanged) {
        maxInd = j;
      }
    }

    swap(newArray, i, maxInd);
    setArray([...newArray]);

    setColumnState((prevColumnStates) =>
      updateColumnState(prevColumnStates, i, Modified)
    );
    await delay(300);
  }
};

/**
 *Функция обновления состояния цвета элемента у массива
 *
 * @param {ElementStates[]} prevColumnStates Текущий массив
 * @param {number} index индекс элемента
 * @param {ElementStates} state цвет состояния элемента
 * @return {*}
 */
const updateColumnState = (
  prevColumnStates: ElementStates[],
  index: number,
  state: ElementStates
) => {
  const newColumnStates = [...prevColumnStates];
  newColumnStates[index] = state;
  return newColumnStates;
};
