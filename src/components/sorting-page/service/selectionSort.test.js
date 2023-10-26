import { selectionSort } from "./selectionSort";

describe("selectionSort function", () => {
  const setArray = jest.fn();
  const setColumnState = jest.fn();
  const isSorting = { current: true };
  let reverseSort = false;

  it("корректно сортирует массив из нескольких элементов", async () => {
    let arr = [0, 12, 65, 30, 40, 40, 3];

    await selectionSort(arr, setArray, setColumnState, isSorting, reverseSort);

    expect(setArray).toHaveBeenCalledWith([0, 3, 12, 30, 40, 40, 65]);
  });

  it("корректно сортирует массив по убыванию", async () => {
    let reverseSort = true;
    let arr = [0, 12, 65, 30, 40, 40, 3];

    await selectionSort(arr, setArray, setColumnState, isSorting, reverseSort);

    expect(setArray).toHaveBeenCalledWith([65, 40, 40, 30, 12, 3, 0]);
  });

  it("корректно сортирует массив из одного элемента", async () => {
    let arr = [65];

    await selectionSort(arr, setArray, setColumnState, isSorting, reverseSort);

    expect(setArray).toHaveBeenCalledWith([65]);
  });

  it("корректно сортирует пустой массив", async () => {
    let arr = [];

    await selectionSort(arr, setArray, setColumnState, isSorting, reverseSort);

    expect(setArray).toHaveBeenCalledWith([]);
  });
});
