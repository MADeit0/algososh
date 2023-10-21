/**
 *Функция меняющая местами символы в массиве
 *
 * @export
 * @param {string[]} arr массив символов
 * @param {number} firstIndex индекс первого елемента
 * @param {number} secondIndex индекс второго элемента
 */
export const swap = (
  arr: string[] | number[],
  firstIndex: number,
  secondIndex: number
) => {
  [arr[secondIndex], arr[firstIndex]] = [arr[firstIndex], arr[secondIndex]];
};

/**
 * Функция добавляющая зажержку в выполнении асинхронной функции использующие `async`
 *@param {number} [timer=0] Длительность задержки в миллисекундах, по умолчанию `0`
 */
export const delay = (timer: number = 0) =>
  new Promise((resolve) => setTimeout(resolve, timer));
