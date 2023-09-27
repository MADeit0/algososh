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

  push(item: typeItem) {
    this._arr.push(item);
  }
  pop() {
    this._arr.pop();
  }
  peek(): typeItem | undefined {
    return this._arr[this.size()];
  }
  clear() {
    this._arr = [];
  }
  toArray() {
    return [...this._arr];
  }
  size() {
    return this._arr.length - 1;
  }
}
