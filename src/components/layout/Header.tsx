import React from "react";

export function Header({ children }: { children: React.ReactNode }) {
  return <div className="bg-slate-20 text-slate-600 text-base p-2 text-center pt-3 shadow">{children}</div>;
}
