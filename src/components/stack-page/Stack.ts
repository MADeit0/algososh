interface IStack<typeItem> {
  push: (item: typeItem) => void;
  pop: () => void;
  clear: () => void;
  peek: () => typeItem | undefined;
  toArray: () => typeItem[] | [];
  size: () => number;
}

export class Stack<typeItem extends string | number>
  implements IStack<typeItem> {
  _arr: typeItem[] = [];

  /**
   * Добавление элемента в стек
   *
   * @param item - Элемент, который нужно добавить в стек
   */
  push(item: typeItem) {
    this._arr.push(item);
  }

  /**
   * Удаление верхнего элемента из стека
   */
  pop() {
    if (this._isEmpty()) {
      return;
    }
    this._arr.pop();
  }

  /**
   * Получение верхнего элемента стека
   *
   * @returns Верхний элемент стека или undefined, если стек пуст
   */
  peek(): typeItem | undefined {
    return this._arr[this.size()];
  }

  /**
   * Очищение всех элементов из стека
   */
  clear() {
    this._arr = [];
  }

  /**
   * Возвращает массив стека
   *
   * @returns Массив содержащий элементы стека
   */
  toArray() {
    return [...this._arr];
  }

  /**
   * Возвращает количество элементов в стеке
   *
   * @returns Количество элементов в стеке
   */
  size() {
    return this._arr.length - 1;
  }

  _isEmpty() {
    return this._arr.length === 0;
  }
}
