class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const node = new this.Node({element, next: this._head(), prev: this._sentinel});
    // let newNode = new DLLNode({});
    this._head().prev = node;
    // newNode.next = this._head;
    // this._head.prev = newNode;
    this._sentinel.next = node;
    // this._head = newNode;
    return node;
  }

  insertTail(element) {
    const node = new this.Node({element, next: this._sentinel, prev: this._tail()});
    // let newNode = new DLLNode({});
    this._tail().next = node;
    // newNode.prev = this._tail;
    this._sentinel.prev = node;
    // this._tail.next = newNode;
   return node;
  }

  removeHead() {
    return this._head().remove();
  }

  removeTail() {
    return this._tail().remove();
  }

  remove(node) {
    if (node.remove) {
      return node.remove(node);
    } 
  }

  forEach(callback, container = this) {
    // let skip = 0;
    // for (let i = this.head; i < this.tail, i++;) {
    //     if (i === undefined) {
    //       skip++
    //       continue;
    //     }
    //     const index = i - this.head - skip;
    //     callback(i, index, this);
    // }
    let i = 0;
    let node = this._head();
    while (node !== this._sentinel) {
      callback(node.element, i, container);
      i += 1;
      node = node.next;
    }
  }

  count() {
  //   let count = 0;
  //   while (Node._head < Node._tail) {
  //     count ++;
  //   }
  //   return this.count;
  // }
    let count = 0;
    this.forEach(() => count += 1);
    return count;
  }
}

export default DoublyLinkedList;