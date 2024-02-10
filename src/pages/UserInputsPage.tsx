import { FaBook } from "react-icons/fa";
import { BottomFixed, Header, MainContent } from "@/components/layout";
import { NonHomeNav } from "@/components/layout/NonHomeNav";
import { MessageList } from "@/features/userInput";

export function UserInputsPage() {
  return (
    <div>
      <Header>
        <FaBook  className="inline text-blue-600" /> My Journals
      </Header>
      <MainContent>
        <MessageList />
      </MainContent>
      <BottomFixed>
        <NonHomeNav />
      </BottomFixed>
    </div>
  );
}
