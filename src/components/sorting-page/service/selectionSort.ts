import { ElementStates } from "../../../types/element-states";
import { delay, swap } from "../../utils/utils";

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

    setColumnState((prevColumnStates: ElementStates[]) =>
      updateColumnState(prevColumnStates, maxInd, Changing)
    );
    await delay(300);

    for (let j = i + 1; j < newArray.length; j++) {
      if (!isSorting.current) return;

      setColumnState((prevColumnStates: ElementStates[]) =>
        updateColumnState(prevColumnStates, j, Changing)
      );
      await delay(300);

      setColumnState((prevColumnStates: ElementStates[]) =>
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
 * @return {ElementStates[]}
 */
const updateColumnState = (
  prevColumnStates: ElementStates[],
  index: number,
  state: ElementStates
): ElementStates[] => {
  const newColumnStates = [...prevColumnStates];
  newColumnStates[index] = state;
  return newColumnStates;
};
