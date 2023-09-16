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
