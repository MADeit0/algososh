import { ElementStates } from "../../../types/element-states";
import { delay, swap } from "../../utils/utils";

/**
 *Алгоритм Сортировки пузырьком c пошаговой визуализацией процесса
 *
 * @param {number[]} arr Массив с числами
 * @param {React.Dispatch<React.SetStateAction<number[]>>} setArray Функция обновления состояния массива с числами
 * @param {React.Dispatch<React.SetStateAction<ElementStates[]>>} setColumnState функция обновления состояния массива с цветами колонок
 * @param {React.MutableRefObject<boolean>} isSorting Флаг для принудительной остановки сортировки
 * @param {boolean} [reverseSort=false] Флаг для установки сортировки по возрастанию или по убыванию
 * @return {*}
 */
export const bubbleSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setColumnState: React.Dispatch<React.SetStateAction<ElementStates[]>>,
  isSorting: React.MutableRefObject<boolean>,
  reverseSort: boolean = false
): Promise<void> => {
  const { Changing, Modified, Default } = ElementStates;
  const newArray = [...arr];

  for (let i = 0; i < newArray.length - 1; i++) {
    if (!isSorting.current) return;

    const step = newArray.length - i - 1;
    for (let j = 0; j < newArray.length - i - 1; j++) {
      if (!isSorting.current) return;

      const sortingChanged = reverseSort
        ? newArray[j] < newArray[j + 1]
        : newArray[j] > newArray[j + 1];

      if (sortingChanged) {
        swap(newArray, j, j + 1);
        setArray([...newArray]);
      }
      setColumnState((prevColumnStates: any) =>
        updateColumnState(prevColumnStates, j, Changing)
      );
      await delay(300);
      setColumnState((prevColumnStates: any) =>
        updateColumnState(prevColumnStates, j, Default)
      );
    }
    setColumnState((prevColumnStates: any) =>
      updateColumnState(prevColumnStates, step, Modified)
    );
    await delay(300);

    if (step === 1) {
      setColumnState((prevColumnStates: any) =>
        updateColumnState(prevColumnStates, 0, Modified)
      );
    }
  }
};

/**
 *Функция обновления состояния цвета элементов у массива
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
): any => {
  const newColumnStates = [...prevColumnStates];
  newColumnStates[index] = state;

  if (state !== ElementStates.Modified) {
    newColumnStates[index + 1] = state;
  }

  return newColumnStates;
};
