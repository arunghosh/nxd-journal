export class EntityList<T> {
  private _version: number = 0;
  private _items: Array<T> = [];

  public addItem(item: T) {
    this._version++;
    this._items.push(item);
  }

  // public updateItem(id, item: T) {

  // }

  get version() {
    return this._version;
  }

  get entityHash() {
    return JSON.stringify(this._items);
  }
}
