class Node<T> {
  public value: T;
  public next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  prepend(element: T) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
    return this;
  }

  append(element: T) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    this.size++;
    return this; // Возвращаем this для возможности последовательных вызовов
  }

  shift() {
    if (this.head !== null) {
      this.head = this.head.next;
      this.size--;
    } else {
      throw new Error("Невозможно удалить элемент из пустого связного списка");
    }
    return this;
  }

  pop() {
    if (this.head !== null) {
      if (!this.head.next) {
        this.head = null;
      } else {
        let current = this.head;

        while (!!current.next && !!current.next.next) {
          current = current.next;
        }
        current.next = null;
      }

      this.size--;
    } else {
      throw new Error("Невозможно удалить элемент из пустого связного списка");
    }
  }

  insertElement(element: T, position: number) {
    if (position < 0 || position > this.size - 1) {
      throw new Error("Неверный индекс");
    }

    const node = new Node(element);

    if (position === 0) {
      this.prepend(element);
    } else {
      const { current, previous } = this._getNodeAtPosition(position);

      if (previous) {
        previous.next = node;
        node.next = current;
        this.size++;
      }
    }
    return this;
  }

  removeElement(position: number) {
    if (position < 0 || position > this.size - 1) {
      throw new Error("Неверный индекс");
    }

    if (position === 0) {
      this.shift();
    } else {
      const { current, previous } = this._getNodeAtPosition(position);

      if (previous && current) {
        previous.next = current.next;
        this.size--;
      }
    }
    return this;
  }

  fromArray(arr: Array<T>) {
    arr.forEach((item) => this.append(item));
    return this;
  }

  ToArray(): T[] {
    let curr = this.head;
    let res: T[] = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  }

  getSize() {
    return this.size;
  }

  private _getNodeAtPosition(
    position: number
  ): { current: Node<T> | null; previous: Node<T> | null } {
    let index = 0;
    let current = this.head;
    let previous: Node<T> | null = null;

    while (index < position && current) {
      previous = current;
      current = current.next;
      index++;
    }

    return { current, previous };
  }
}
