import { IDGenerator } from "@/utils/key";
import { Subscriber } from "@/utils/subscriber";

export interface LogItem {
  id: number;
  data: any;
  date: Date;
}

class LogService extends Subscriber {
  private _logs: Array<LogItem> = [];
  private _idGenerator = new IDGenerator();

  public getItems() {
    return this._logs
  }

  set items(items: Array<LogItem>) {
    if (!items?.length) return;
    this._logs = items;
    this._idGenerator.refresh(items);
    this.notify();
  }

  public addLog(data: any) {
    this._logs.push({
      id: this._idGenerator.getNext(),
      data,
      date: new Date(),
    });
    this.notify();
  }
}
export const promptLogger = new LogService();

