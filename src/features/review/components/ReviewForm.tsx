import { FaCheck as AcceptIcon, FaTimes as RejectIcon } from "react-icons/fa";
import { ReviewAction } from "../models";
import { If } from "@/components";
import { useReview } from "../hooks/useReview";
import { reviewService } from "..";

const reviewActionText = {
  [ReviewAction.COMPLETE_TODO]: {
    text: "Complete",
    color: "green",
  },
  [ReviewAction.NEW_TODO]: { text: "Add", color: "blue" },
};

export function ReviewForm() {
  const { pendingReviews } = useReview();

  return (
    <div className="p-1 bg-slate-200 rounded-md">
      <div className="text-sm text-slate-800 text-center pt-2">Please review following suggestions</div>
      <div className="text-green-500"></div>
      <div className="text-blue-500"></div>
      {pendingReviews.map((item) => (
        <div
          key={item.id}
          className="text-sm flex text-slate-800 bg-slate-100 p-4 rounded-md mt-1 shadow border-white"
        >
          <div className="mb-3 flex-grow flex flex-col">
            <div>
              <div
                className={`inline-block flex-grow-0 px-2 py-1 bg-white rounded border text-xs text-${
                  reviewActionText[item.action].color
                }-500`}
              >
                {reviewActionText[item.action].text}
                <If condition={item.addInfo?.category}>
                  <span className="text-black text-xs">
                    &nbsp; to {item.addInfo?.category}
                  </span>
                </If>
              </div>
            </div>
            <div className="text-slate-700 mt-0.5">{item.text}</div>
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => reviewService.acceptChange(item)}
              className="btn bg-white text-green-700 p-1.5 px-3 shadow mb-2"
            >
              <AcceptIcon />
            </button>
            <button
              onClick={() => reviewService.rejectChange(item)}
              className="btn p-1.5 px-3 text-red-700 shadow bg-white"
            >
              <RejectIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
