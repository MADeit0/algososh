interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  isEmpty: () => void;
  getArray: () => (T | null)[];
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private _arr: (T | null)[] = [];
  public readonly size: number = 0;

  public head = 0;
  public tail = 0;

  private _length = 0;
  private _step = 0;

  constructor(size: number) {
    this._arr = new Array(size);
    this.size = size;
  }

  /**
   * Добавление элемента в конец очереди
   *
   * @param {T} item элемент добавляемый в массив
   * @memberof Queue
   */
  enqueue(item: T) {
    if (this.tail < this.size - 1 && item) {
      this.tail = this._step;
      this._arr[this.tail] = item;
      this._step++;
      this._length++;
    }
  }

  /**
   * Удаление элемента из начала очереди
   *
   * @memberof Queue
   */
  dequeue() {

    if (this.head < this.size - 1 && !this.isEmpty()) {
      this._arr[this.head] = null;
      this.head++;
      this._length--;
      console.log(this._length);
    } else {
      this._arr[this.head] = null;
      this._length = 0;
      console.log(this._length);
    }
  }

  /**
   * Получение первого не пустого элемента очереди
   *
   * @return {*}  {((T | null)[])}
   * @memberof Queue
   */
  peak(): T | null {
    return this.isEmpty() ? null : this._arr[this.head];
  }

  /**
   * Проверка, является ли массив пустым.
   *
   * @memberof Queue
   */
  isEmpty = () => this._length === 0;

  /**
   * Получение массива очереди
   *
   * @return {*}  {((T | null)[])}
   * @memberof Queue
   */
  getArray(): (T | null)[] {
    return this._arr;
  }

  /**
   * Очищение всех элементов из очереди
   */
  clear() {
    this._arr = new Array(this.size);
    this.head = 0;
    this.tail = 0;

    this._length = 0;
    this._step = 0;
  }
}
