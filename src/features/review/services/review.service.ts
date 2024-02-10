import { Subscriber } from "@/utils/subscriber";
import { IDGenerator } from "@/utils/key";
import { UserInput } from "@/features/userInput";
import { PubSub, PubSubEvent } from "@/utils/pubsub";
import {
  ReviewItem,
  ReviewStatus,
  ReviewAction,
  ChangeParams,
} from "../models";

interface ReviewItemFilter {
  status: ReviewStatus;
}

class ReviewService extends Subscriber {
  private _changeKey = new IDGenerator();
  private _changes: Array<ReviewItem> = [];
  public userInput?: UserInput | null = null;

  get isPending() {
    return this._changes.some((c) => c.status === ReviewStatus.PENDING);
  }

  getChanges(filter: ReviewItemFilter) {
    let result = this._changes;
    if (filter) {
      if (filter.status)
        result = result.filter((i) => i.status === filter.status);
    }
    return result;
  }

  _addChangeItem(text: string, action: ReviewAction, addInfo?: object) {
    this._changes.push({
      text,
      action,
      status: ReviewStatus.PENDING,
      id: this._changeKey.getNext(),
      addInfo,
    });
  }

  _updateStatus(changeId: number, status: ReviewStatus) {
    const change = this._changes.find((c) => c.id === changeId);
    if (change) {
      change.status = status;
      this.notify();
      PubSub.publish(PubSubEvent.ReviewUpdate, {
        change,
      });
    }
  }

  acceptChange(changeItem: ReviewItem) {
    this._updateStatus(changeItem.id, ReviewStatus.ACCEPTED);
  }

  rejectChange(changeItem: ReviewItem) {
    this._updateStatus(changeItem.id, ReviewStatus.REJECTED);
  }

  setReview(userInput: UserInput, changes: ChangeParams) {
    this.userInput = userInput;
    this._changes = [];
    changes.newTodos?.forEach((newTodo) =>
      this._addChangeItem(newTodo.text, ReviewAction.NEW_TODO, {
        category: newTodo.category,
      })
    );
    changes.completedTodos?.forEach((text) =>
      this._addChangeItem(text, ReviewAction.COMPLETE_TODO)
    );
    this.notify();
  }
}

export const reviewService = new ReviewService();
