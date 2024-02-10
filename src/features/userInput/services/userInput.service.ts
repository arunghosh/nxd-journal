import { IDGenerator } from "@/utils/key";
import { Subscriber } from "@/utils/subscriber";
import { UserInput, UserInputStatus } from "../models";

interface Filter {
  status: UserInputStatus;
}
export class UserInputService extends Subscriber {
  private _messages: Array<UserInput> = [];
  private _idGenerator = new IDGenerator();

  set items(items: Array<UserInput>) {
    if (!items?.length) return;
    this._messages = items;
    this._idGenerator.refresh(items);
    this.notify();
  }

  getItems(filter?: Filter) {
    let result = this._messages;
    if (filter) {
      if (filter.status !== undefined)
        result = result.filter((i) => i.status === filter.status);
    }
    return result;
  }

  updateStatus(id: number, status: UserInputStatus) {
    const message = this._messages.find((message) => message.id === id);
    if (message) message.status = status;
    this.notify();
  }

  addInput(text: string) {
    this._messages.push({
      id: this._idGenerator.getNext(),
      text: text.trim(),
      time: new Date(),
      status: UserInputStatus.Pending,
    });
    this.notify();
  }
}

export const userInputService = new UserInputService();
