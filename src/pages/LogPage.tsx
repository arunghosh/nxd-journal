import {
  BottomFixed,
  Header,
  MainContent,
  NonHomeNav,
} from "@/components/layout";
import Logs from "@/features/debug/components/Logs";

export function LogPage() {
  return (
    <div>
      <Header>LLM Logs</Header>
      <MainContent>
        <Logs />
      </MainContent>
      <BottomFixed>
        <NonHomeNav />
      </BottomFixed>
    </div>
  );
}
