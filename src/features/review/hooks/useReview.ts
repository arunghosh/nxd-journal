import { reviewService } from "../services/review.service";
import { useServiceSync } from "@/hooks";
import { ReviewStatus } from "..";
import { ReviewItem } from "../models";

export function useReview() {
  const pendingReviews = useServiceSync<ReviewItem>(reviewService, () =>
    reviewService.getChanges({
      status: ReviewStatus.PENDING,
    })
  );

  return {
    pendingReviews,
    message: reviewService.userInput?.text,
  };
}
