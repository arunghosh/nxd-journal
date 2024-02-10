import dayjs from "dayjs";
import { useUserInput } from "../hooks/useUserInput";

export function MessageList() {
  const { journalGroupedByDate, userInputs } = useUserInput();
  if (!userInputs.length)
    return (
      <div className="text-lg text-slate-300">
        No message from you. Please to go the home page to add messages.
      </div>
    );

  const reversedDates = Object.keys(journalGroupedByDate).reverse();

  return (
    <div className="mt-1">
      {reversedDates.map((date) => (
        <div className="mb-4 mt-1 border-b border-slate-300 border-dashed pb-1" key={date}>
          <h2 className="font-bold handwritten text-lg sub-heading mb-1">
            {date}
          </h2>
          {journalGroupedByDate[date].map((input) => (
            <div
              key={input.id}
              className="mb-3 font-bold handwritten leading-6"
            >
              <div className="text-slate-800 text-xs inline mr-1 border-b bg-slate-200 rounded px-1">
                {dayjs(input.time).format("hh:mm A")}
              </div>
              <div className="inline handwritten text-slate-700">
                {input.text}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
