import { BottomFixed, Header, NonHomeNav } from "@/components/layout";
import { SettingsForm } from "@/features/settings";

export function SettingsPage() {
  return (
    <div>
      <Header>Settings</Header>
      <SettingsForm />
      <BottomFixed>
        <NonHomeNav />
      </BottomFixed>
    </div>
  );
}
