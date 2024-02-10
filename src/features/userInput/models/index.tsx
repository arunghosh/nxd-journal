import { EntityWithID } from "@/utils/key";

export enum UserInputStatus {
  Pending = "pending",
  Processing = "processing",
  Success = "success",
  Failure = "failure",
}

export interface UserInput extends EntityWithID {
  text: string;
  time: Date;
  status: UserInputStatus;
}
