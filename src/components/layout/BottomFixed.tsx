export function BottomFixed({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-x-0 bottom-0 max-w-lg">{children}</div>;
}
