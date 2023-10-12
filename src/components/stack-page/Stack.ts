interface IStack<T> {
  push(item: T): void;
  pop(): void;
  peek(): T | undefined;
  clear(): void;
  toArray(): T[];
  size(): number;
}

export class Stack<T extends string | number> implements IStack<T> {
  private _arr: T[] = [];

  /**
   * Добавление элемента в стек
   *
   * @param item - Элемент, который нужно добавить в стек
   */
  push(item: T) {
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
  peek(): T | undefined {
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
