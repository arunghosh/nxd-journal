type Callback = (...args: any[]) => void;

export enum PubSubEvent {
  ReviewUpdate
}

export class PubSub {
  private static subscriptions: Record<PubSubEvent, Callback[]> = {} as Record<PubSubEvent, Callback[]>;

  static subscribe(event: PubSubEvent, callback: Callback) {
    if (!PubSub.subscriptions[event]) {
      PubSub.subscriptions[event] = [];
    }

    PubSub.subscriptions[event].push(callback);
  }

  static unsubscribe(event: PubSubEvent, callback: Callback) {
    const subscribers = PubSub.subscriptions[event];

    if (subscribers) {
      PubSub.subscriptions[event] = subscribers.filter(
        (subscriber) => subscriber !== callback
      );
    }
  }

  static publish(event: PubSubEvent, ...args: any[]) {
    const subscribers = PubSub.subscriptions[event];

    if (subscribers) {
      subscribers.forEach((subscriber) => subscriber(...args));
    }
  }
}