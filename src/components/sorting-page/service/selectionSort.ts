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
 * @param {number} time Необязательный аргумент, устанавливает задержку при выполнении анимации
 * @return {*}
 */
export const selectionSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setColumnState: React.Dispatch<React.SetStateAction<ElementStates[]>>,
  isSorting: React.MutableRefObject<boolean>,
  reverseSort: boolean = false,
  time: number = 0
): Promise<void> => {
  const { Changing, Modified, Default } = ElementStates;
  const newArray = [...arr];

  if (newArray.length - 1 <= 0) {
    setArray([...newArray]);
    return;
  }

  for (let i = 0; i < newArray.length; i++) {
    if (!isSorting.current) return;

    let maxInd = i;

    setColumnState((prevColumnStates) =>
      updateColumnState(prevColumnStates, maxInd, Changing)
    );
    time && (await delay(time));

    for (let j = i + 1; j < newArray.length; j++) {
      if (!isSorting.current) return;

      setColumnState((prevColumnStates) =>
        updateColumnState(prevColumnStates, j, Changing)
      );
      time && (await delay(time));

      setColumnState((prevColumnStates) =>
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
    time && (await delay(time));
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
