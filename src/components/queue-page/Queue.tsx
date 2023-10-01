interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

class Queue<T> {
  private _arr: T[] = [];

  // Добавить элемент в конец очереди
  enqueue(item: T) {
    this._arr.push(item);
  }

  // Удалить элемент из начала очереди
  dequeue() {
    if (this._isEmpty()) {
      return;
    }
    this._arr.shift();
  }

  /**
   * Получение первого не пустого элемента очереди
   *
   * @returns Первый элемент очереди или undefined, если массив очереди пуст
   */
  peek(): T | undefined {
    for (let i = 0; i < this.size(); i++) {
      if (!!this._arr[i]) {
        return this._arr[i];
      }
    }
  }

  /**
   * Возвращает количество элементов в очереди
   *
   * @returns Количество элементов в очереди
   */
  size() {
    return this._arr.length - 1;
  }

  // Проверить массив на пустоту
  _isEmpty() {
    return this._arr.length === 0;
  }
}
