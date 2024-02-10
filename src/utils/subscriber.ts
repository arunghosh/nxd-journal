export type Listner = () => void;

export abstract class Subscriber {
  listeners: Listner[] = [];

  subscribe(listner: Listner): () => void {
    this.listeners = Array.from(new Set([...this.listeners, listner]));
    return () => this.unsubscribe(listner);
  }

  unsubscribe(listner: Listner) {
    this.listeners = this.listeners.filter((l) => l !== listner);
  }

  notify() {
    this.listeners.forEach((cb) => cb());
  }
}
