import React from "react";

type Props = {
  condition: any;
  children: React.ReactNode;
};

export function If({ condition, children }: Props) {
  if (condition) return children;
  return null;
}
