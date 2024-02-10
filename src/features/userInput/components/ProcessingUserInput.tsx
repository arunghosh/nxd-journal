import { useUserInput } from "..";

export function ProcessingUserInput() {
  const { pendingUserInputs } = useUserInput();
  if (!pendingUserInputs.length) return;
  return (
    <div className="p-5 bg-slate-400 rounded-md animate-pulse">
      <span className="font-bold">Processing</span> -{" "}
      <em>{`"${pendingUserInputs?.[0]?.text}"`}</em>
    </div>
  );
}
