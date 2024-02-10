export class IDGenerator {
  _index = 0;
  set index(count: number) {
    this._index = count;
  }

  refresh(keyObjects: Array<EntityWithID>) {
    this._index = Math.max(...keyObjects.map(i => i.id)) + 1;
  }

  getNext() {
    return this._index++;
  }
}


export interface EntityWithID {
  id: number;
}
