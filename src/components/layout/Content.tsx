import React from "react";

export function MainContent({ children }: { children: React.ReactNode }) {
  return <div className="p-2">{children}</div>;
}
