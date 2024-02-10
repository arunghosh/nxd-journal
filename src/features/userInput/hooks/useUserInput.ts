import { userInputService } from "../services";
import { UserInput, UserInputStatus } from "../models";
import { useServiceSync } from "@/hooks";
import dayjs from "dayjs";

export function useUserInput() {
  const journalGroupedByDate: Record<string, UserInput[]> = {};

  const userInputs = useServiceSync(userInputService, () =>
    userInputService.getItems()
  );

  const pendingUserInputs = useServiceSync(userInputService, () =>
    userInputService.getItems({
      status: UserInputStatus.Pending,
    })
  );

  function addUserInput(text: string) {
    userInputService.addInput(text);
  }

  userInputs.forEach((ui) => {
    const date = dayjs(ui.time).format("ddd, MMM D YYYY");
    (journalGroupedByDate[date] ??= []).push(ui);
  });

  return {
    addUserInput,
    journalGroupedByDate,
    userInputs,
    pendingUserInputs,
  };
}
