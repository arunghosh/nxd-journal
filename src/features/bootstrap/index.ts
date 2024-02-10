import { PubSub, PubSubEvent } from "@/utils/pubsub";
import { Logger } from "@/utils/logger";
import { UserInput, UserInputStatus, userInputService } from "@/features/userInput";
import { promptLogger } from "@/features/debug/services/log.service";
import {
  ReviewStatus,
  ReviewAction,
  reviewService,
  ReviewItem
} from "@/features/review";
import { todoService } from "@/features/todo";
import { TodoItemStatus } from "@/features/todo/models";
import * as llm from "@/features/todo/llm";

export interface Action {
  command: string;
}

async function processMessage(message: UserInput): Promise<void> {
  // TODO: There an issue of empty message. Till a solution this is a workaround.
  if (message.text.length < 4) return;
  try {
    const [newTodos, completedTodos] = await Promise.all([
      llm.getNewTodos(message.text, todoService.getTodoItems()),
      llm.getCompletedTodos(message.text, todoService.getTodoItems()),
    ]);
    reviewService.setReview(message, {
      newTodos,
      completedTodos,
    });
    userInputService.updateStatus(message.id, UserInputStatus.Success);
  } catch (err) {
    // TODO: Error handling (common error handling service)
    Logger.error(err);
    promptLogger.addLog("Failed to process: " + message.text);
    userInputService.updateStatus(message.id, UserInputStatus.Failure);
  }
}

function onNewMessages() {
  userInputService
    .getItems({ status: UserInputStatus.Pending })
    .forEach((message: UserInput) => {
      processMessage(message);
    });
}

function onReviewUpdate({ change }: { change: ReviewItem }) {
  if (change.status === ReviewStatus.REJECTED) return;
  if (change.action === ReviewAction.COMPLETE_TODO) {
    todoService.updateItemByText(change.text, TodoItemStatus.COMPLETED);
  }
  if (change.action === ReviewAction.NEW_TODO) {
    todoService.addItem(change.text, change.addInfo?.category);
  }
}

export function bootstrap(): () => void {
  userInputService.subscribe(onNewMessages);
  PubSub.subscribe(PubSubEvent.ReviewUpdate, onReviewUpdate);
  return () => {
    userInputService.unsubscribe(onNewMessages);
    PubSub.unsubscribe(PubSubEvent.ReviewUpdate, onReviewUpdate);
  };
}
