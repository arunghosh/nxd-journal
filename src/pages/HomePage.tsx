import { FaClipboardList } from "react-icons/fa";
import { TodoCategorySwitcher, TodoList } from "@/features/todo";
import {
  ProcessingUserInput,
  UserInputForm,
  useUserInput,
} from "@/features/userInput";
import { useReview } from "@/features/review/hooks/useReview";
import { ReviewForm } from "@/features/review";
import {
  BottomFixed,
  Header,
  MainContent,
  ShortCuts,
} from "../components/layout";
import { useQuery, useSettingsGuard } from "@/hooks";

export function HomePage() {
  const { pendingUserInputs } = useUserInput();
  const { pendingReviews } = useReview();
  const category = useQuery().get("category") as string;

  useSettingsGuard();

  return (
    <>
      <Header>
        <FaClipboardList className="inline mb-1 text-blue-600" /> Todo List
        <TodoCategorySwitcher />
      </Header>
      <MainContent>
        <div className="mt-1 mb-48">
          <TodoList category={category} />
        </div>
        <BottomFixed>
          <div className="p-2 shadow border-t bg-white">
            <div className="clear-both">
              {pendingReviews?.length ? (
                <ReviewForm />
              ) : pendingUserInputs.length ? (
                <ProcessingUserInput />
              ) : (
                <div className="flex flex-col">
                  <ShortCuts />
                  <UserInputForm />
                </div>
              )}
            </div>
          </div>
        </BottomFixed>
      </MainContent>
    </>
  );
}
